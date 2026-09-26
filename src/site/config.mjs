/* 站点常量与本站分类体系
 *
 * 三类内容、七个类别、三个板块的说明文字都只属于文化，放在站点层；
 * kit 只提供通用的设计系统、组件与译法，不认这套分类。
 */

export const SITE = {
  id: 'lishui-culture',
  name: '溧水文化',
  nameEn: 'Lishui Culture',
  host: 'wenhua.lishui.org',
  origin: 'https://wenhua.lishui.org',
  portal: 'https://lishui.org',
  portalName: '溧水一方',
  portalNameEn: 'A Place Called Lishui',
  contentUpdated: '',
};

/** 实体目录 → 实体类型；与内容库的目录名一致。 */
export const TYPE_DIRS = { items: 'item', places: 'place', articles: 'article' };

/** 列表页每页条数：卡片网格按 300px 起排，24 条正好是 4 列 × 6 行。 */
export const LIST_PAGE_SIZE = 24;

/* ---------- 七个类别 ---------- */

/* 非遗项目按门类归并，文化空间与文章各成一类。
   归类规则见 content.mjs 的 deriveCategory，不额外维护字段。 */

export const CATEGORIES = [
  {
    key: 'wudao',
    zh: '龙舞灯彩',
    en: 'Dragon and Lantern Dance',
    glyph: 'm2',
    dirName: 'items',
    desc: {
      zh: '龙灯、马灯、划龙船一类传统舞蹈项目，多见于春节与庙会。',
      en: 'Dragon lanterns, horse lanterns and dragon boats — traditional dance items, mostly seen at the New Year and at temple fairs.',
    },
  },
  {
    key: 'jiyi',
    zh: '传统技艺',
    en: 'Traditional Crafts',
    glyph: 'm3',
    dirName: 'items',
    desc: {
      zh: '食品制作、竹编、铁画一类以手艺相传的项目。',
      en: 'Food making, bamboo weaving, iron painting and other crafts transmitted by hand.',
    },
  },
  {
    key: 'meishu',
    zh: '传统美术',
    en: 'Traditional Fine Arts',
    glyph: 'm4',
    dirName: 'items',
    desc: {
      zh: '剪纸、木雕、插花、珐琅一类以造型与纹样见长的项目。',
      en: 'Paper-cutting, wood carving, flower arrangement and enamel work — items known for form and pattern.',
    },
  },
  {
    key: 'minsu',
    zh: '民俗与庙会',
    en: 'Folk Customs and Temple Fairs',
    glyph: 'm6',
    dirName: 'items',
    desc: {
      zh: '庙会、社火、岁时节令一类在固定日子举行的民俗活动。',
      en: 'Temple fairs, shehuo and seasonal observances — customs held on fixed days of the year.',
    },
  },
  {
    key: 'yiyao',
    zh: '医药、乐歌与传说',
    en: 'Medicine, Songs and Legends',
    glyph: 'm5',
    dirName: 'items',
    desc: {
      zh: '传统医药、民歌与民间文学类项目，条目数量较少。',
      en: 'Traditional medicine, folk songs and folk literature — the smaller categories.',
    },
  },
  {
    key: 'kongjian',
    zh: '文化空间',
    en: 'Cultural Spaces',
    glyph: 'm1',
    dirName: 'places',
    desc: {
      zh: '村落、山体、水系、书院与石刻，非遗所依附的场所。',
      en: 'Villages, mountains, waterways, academies and inscriptions — the places heritage attaches to.',
    },
  },
  {
    key: 'wenxian',
    zh: '诗文与文献',
    en: 'Poetry and Documents',
    glyph: 'm7',
    dirName: 'articles',
    desc: {
      zh: '自行撰写的条目：方言、诗文、旧志与非遗名录的整理。',
      en: 'Entries written here: dialect, poetry, old gazetteers and the heritage lists.',
    },
  },
];

/* ---------- 板块说明 ---------- */

export const SECTIONS = {
  items: {
    zh: {
      title: '非遗项目',
      lede: '溧水区的非物质文化遗产代表性项目。每条标明门类、级别、公布批次与保护单位；级别与批次以官方名录为准，名录未给的细节一律留待补充。',
      note: '区级第四批为 2024 年 1 月公示稿，正文写明「据公示稿」，不径称已公布。',
    },
    en: {
      title: 'Intangible Heritage',
      lede: 'Representative items of intangible cultural heritage in Lishui District. Each states its category, level, listing batch and guardian unit; level and batch follow the official lists, and anything the lists do not give is left to be filled in.',
      note: 'The district fourth batch is the January 2024 public-notice draft; entries say so and do not call it issued.',
    },
  },
  places: {
    zh: {
      title: '文化空间',
      lede: '非遗所依附的村落、山体、水系与旧时文教场所。填了文保级别的条目同时标明公布批次；批次未能核实的，条目里写明待核。',
      note: '时代未见于所据名录的，era 字段填「年代未详」，并在正文说明。',
    },
    en: {
      title: 'Cultural Spaces',
      lede: 'The villages, mountains, waterways and old seats of learning that heritage attaches to. Where a protection level is given, its listing is given with it; where the listing is unverified, the entry says so.',
      note: 'Where the cited listing gives no date, the era field reads "Date undetermined" and the body says why.',
    },
  },
  articles: {
    zh: {
      title: '文章',
      lede: '自行撰写的条目：方言分区的两说、诗文的文献依据、旧志的点校与非遗名录的综述。引文标卷次，传说与史实分段呈现。',
      note: '成果层文字一律自撰，不整段转录受版权保护的来源。',
    },
    en: {
      title: 'Articles',
      lede: 'Entries written here: the two accounts of the dialect boundary, the documentary basis of poems, the punctuation of an old gazetteer, and a survey of the heritage lists. Quotations carry juan and page; tradition and record are kept apart.',
      note: 'Entry text is written here, never transcribed wholesale from copyrighted sources.',
    },
  },
};

/* ---------- 来源层归档方式 ---------- */

export const ARCHIVE = {
  zh: {
    fulltext: '全文或影印本归档',
    'link-registered': '登记链接（有在线版本）',
    'catalogued-only': '仅著录（未见在线版本）',
    excerpt: '摘录卡（只记必要片段）',
    link: '链接档案（政府页与名录）',
  },
  en: {
    fulltext: 'Full text or scan archived',
    'link-registered': 'Link registered (online copy exists)',
    'catalogued-only': 'Catalogued only (no online copy seen)',
    excerpt: 'Excerpt card (essential passages only)',
    link: 'Link record (government pages and lists)',
  },
};

/* ---------- 编纂凡例（首页） ---------- */

export const RULES = {
  zh: [
    ['一', '无来源不入库', '每条条目引用的来源都必须在来源层存在对应卡片，且 <code>rights</code> 字段填明授权状态。无来源的事实不进入已发布状态。'],
    ['二', '成果层自撰', '成果层文字一律自行撰写，不整段转录受版权保护的来源；旧志原文属公有领域，引用也标卷次页码。'],
    ['三', '矛盾并列', '来源互相矛盾时并列呈现、各自标注，不做单方面取舍；传说保留「相传」字样，与史实分段。'],
    ['四', '双语成对', '中英共用同一个条目 ID，英文稿放在 <code>content/en/</code> 的对称路径下。缺任一份，两份都不得发布。'],
  ],
  en: [
    ['I', 'No source, no entry', 'Every source cited by an entry must exist as a card in the source layer with its <code>rights</code> status stated. Nothing without a source is published.'],
    ['II', 'Written, not copied', 'Entry text is written here, not transcribed wholesale from copyrighted sources. Public-domain gazetteer passages are quoted by juan and page.'],
    ['III', 'Disagreement shown', 'Where sources disagree they are set side by side, each attributed; tradition keeps its original wording and is kept apart from record.'],
    ['IV', 'Paired languages', 'Chinese and English share one entry ID, with the English draft at the mirrored path under <code>content/en/</code>. If either is missing, neither may be published.'],
  ],
};
