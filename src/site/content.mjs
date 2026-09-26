/* 内容装载（站点层）
 *
 * 读取内容库、套上本站的分类与筛选规则，并把结果缓存起来——
 * 构建时每个页面模块都会调用，缓存保证内容只读一次。
 *
 * 通用的装载与解析在 lishui-kit：来源层与成果层读取、front-matter 解析、
 * Markdown 渲染、来源与关联解析。这里只做本分站特有的三件事：
 * 七个类别的归属、街镇筛选值、按门类取用。
 */

import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent, forLang } from 'lishui-kit';
import { entryPath } from 'lishui-kit/i18n/paths.mjs';
import { SITE, CATEGORIES } from './config.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
export const SITE_ROOT = resolve(HERE, '..', '..');

/** 内容库位置：环境变量优先，其次站点库内的 content/ 子模块，最后同级目录。
    探测标志是内容库的站点登记 schema/sites.json——合库后它才是内容库的标志文件。 */
export function resolveContentDir() {
  const candidates = [
    process.env.LISHUI_CONTENT_DIR,
    join(SITE_ROOT, 'content'),
    resolve(SITE_ROOT, '..', 'lishui'),
  ].filter(Boolean);
  for (const dir of candidates) {
    if (existsSync(join(dir, 'schema', 'sites.json'))) return dir;
  }
  throw new Error(
    '找不到内容库。请设置 LISHUI_CONTENT_DIR，或在站点库内放置 content/ 子模块，'
    + '或把 lishui 内容库放在同级目录。',
  );
}

/* ---------- 本站分类规则 ---------- */

/* 七个类别由实体类型与 item_type 推出，规则固定，不额外维护字段。
   非遗项目按门类归并：传统舞蹈归「龙舞灯彩」，其余门类各归其类，
   传统医药、传统音乐、民间文学三条合入「医药、乐歌与传说」。 */
function deriveCategory(entry) {
  if (entry.type === 'place') return 'kongjian';
  if (entry.type === 'article') return 'wenxian';
  switch (entry.item_type) {
    case '传统舞蹈': return 'wudao';
    case '传统技艺': return 'jiyi';
    case '传统美术': return 'meishu';
    case '民俗': return 'minsu';
    default: return 'yiyao';
  }
}

/** 街镇筛选值：从 address 里匹配行政区划专名，只作筛选用，不写回内容。 */
function deriveTown(entry, glossary) {
  const address = entry.address;
  if (!address) return null;
  for (const g of glossary) {
    if (g.category !== '行政区划') continue;
    if (!/(镇|街道)$/.test(g.zh)) continue;
    if (address.includes(g.zh)) return g.zh;
  }
  return null;
}

/* ---------- 装载与缓存 ---------- */

let cached = null;

export function siteContent() {
  if (cached) return cached;

  const content = loadContent({ contentDir: resolveContentDir(), siteId: SITE.id });
  for (const entry of content.entries) {
    entry.category = deriveCategory(entry);
    entry.path = entryPath(entry);
    entry.town = deriveTown(entry, content.glossary);
  }

  const updated = content.entries.map((e) => e.updated).filter(Boolean).sort().pop() || '';
  SITE.contentUpdated = updated;
  cached = { ...content, updated };
  return cached;
}

/* ---------- 取用 ---------- */

export const ofSection = (entries, lang, dirName) =>
  entries.filter((e) => e.lang === lang && e.dirName === dirName);

export const ofCategory = (entries, lang, key) =>
  entries.filter((e) => e.lang === lang && e.category === key);

/** 条目按标题排；同类之内中文按拼音、英文按字母。 */
export const byTitle = (a, b) => String(a.title).localeCompare(String(b.title), 'zh');

export const byUpdated = (a, b) =>
  String(b.updated || '').localeCompare(String(a.updated || ''))
  || byTitle(a, b);

/** 筛选取值排序：类别按本站七类顺序，门类与级别按取值表顺序，其余按字面。 */
export function sortFilterValues(values, group, content) {
  const table = { itemType: content.enums.itemType, level: content.enums.level }[group];
  if (group === 'category') {
    const order = CATEGORIES.map((c) => c.key);
    return values.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
  if (table) return values.sort((a, b) => table.indexOf(a) - table.indexOf(b));
  return values.sort((a, b) => String(a).localeCompare(String(b), 'zh'));
}

/** 站点规模：条目数、类别数、覆盖门类、来源记录数。 */
export function statsOf(content, lang) {
  const list = forLang(content.entries, lang);
  const itemTypes = new Set(list.map((e) => e.item_type).filter(Boolean));
  return {
    entries: list.length,
    categories: CATEGORIES.length,
    itemTypes: itemTypes.size,
    sources: content.sourcesAll.length,
  };
}
