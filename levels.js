// levels.js
// 50 Levels of Visual Resolution Training
// Logic: Increasing stroke count + high-similarity "rival" clusters
const HANZI_LIBRARY = [
  // --- STAGE 1: FUNDAMENTAL SLANTS (1-4 STROKES) ---
  { level: 1, name: "The 'People' Slant", pool: ['人', '入', '八', '乂', '义', '父', '仗', '仅', '仓', '仑'] },
  { level: 2, name: "The 'Cross' Pillar", pool: ['十', '千', '干', '于', '平', '午', '牛', '丰', '半', '手'] },
  { level: 3, name: "The 'Knife' Hook", pool: ['刀', '力', '乃', '九', '几', '凡', '丸', '办', '边', '加'] },
  { level: 4, name: "The 'Nail' Hook", pool: ['丁', '七', '寸', '才', '于', '下', '不', '与', '万', '方'] },
  { level: 5, name: "The 'Cliff' Frame", pool: ['厂', '广', '尸', '户', '尺', '厄', '尼', '左', '右', '石'] },
  { level: 6, name: "The 'Enclosure' Box", pool: ['口', '日', '曰', '旦', '旧', '白', '百', '目', '且', '冉'] },
  { level: 7, name: "The 'Water' Drop", pool: ['小', '少', '水', '氺', '永', '求', '泉', '尔', '赤', '亦'] },
  { level: 8, name: "The 'Mountain' Peak", pool: ['山', '出', '岁', '屹', '屺', '屿', '岌', '岁', '击', '幽'] },
  { level: 9, name: "The 'Child' Curve", pool: ['子', '孑', '孓', '孞', '孖', '字', '学', '存', '孙', '孢'] },
  { level: 10, name: "The 'King's' Horizontal", pool: ['王', '玉', '主', '土', '士', '工', '五', '正', '豆', '亚'] },

  // --- STAGE 2: MEASURING STROKE LENGTHS (5-8 STROKES) ---
  { level: 11, name: "The 'Serpent' Curve", pool: ['己', '已', '巳', '巴', '巵', '巶', '巸', '巷', '卷', '巽'] },
  { level: 12, name: "The 'Tree' Extension", pool: ['未', '末', '本', '术', '朱', '失', '矢', '天', '夫', '先'] },
  { level: 13, name: "The 'Field' Grid", pool: ['田', '由', '甲', '申', '亩', '苗', '备', '奋', '男', '虽'] },
  { level: 14, name: "The 'Internal' Enclosure", pool: ['内', '肉', '冉', '冈', '网', '同', '问', '周', '用', '凡'] },
  { level: 15, name: "The 'Shell' Base", pool: ['贝', '见', '页', '负', '贞', '员', '贯', '货', '质', '购'] },
  { level: 16, name: "The 'West' Grid", pool: ['西', '酉', '洒', '酒', '晒', '栖', '要', '票', '栗', '贾'] },
  { level: 17, name: "The 'Stone' Corner", pool: ['石', '右', '后', '司', '同', '网', '向', '局', '名', '各'] },
  { level: 18, name: "The 'Self' Eye", pool: ['自', '白', '目', '且', '面', '而', '耍', '页', '首', '直'] },
  { level: 19, name: "The 'Vehicle' Frame", pool: ['车', '东', '阵', '连', '库', '斩', '辉', '辅', '转', '轮'] },
  { level: 20, name: "The 'Walking' Radical", pool: ['边', '进', '远', '运', '这', '还', '道', '通', '透', '逐'] },

  // --- STAGE 3: THE SPEAR GAUNTLET (9-12 STROKES) ---
  { level: 21, name: "Spear: Simple Lines", pool: ['戈', '戋', '戉', '戊', '戌', '戍', '戎', '戒', '我', '戕'] },
  { level: 22, name: "Spear: The 'All' Frame", pool: ['咸', '喊', '缄', '减', '碱', '箴', '感', '憾', '撼', '越'] },
  { level: 23, name: "Spear: The 'Success' Frame", pool: ['成', '诚', '城', '盛', '晟', '铖', '荿', '珹', '窚', '武'] },
  { level: 24, name: "Spear: The 'Region' Frame", pool: ['或', '惑', '域', '戚', '贼', '阈', '馘', '戛', '赋', '戗'] },
  { level: 25, name: "Spear: The 'Hide' Frame", pool: ['臧', '藏', '盛', '越', '威', '戚', '咸', '成', '贼', '戴'] },
  { level: 26, name: "Radical Swap: Speech", pool: ['说', '语', '词', '讯', '设', '访', '许', '论', '证', '识'] },
  { level: 27, name: "Radical Swap: Hand", pool: ['打', '拉', '提', '持', '抱', '折', '抬', '扫', '排', '推'] },
  { level: 28, name: "Radical Swap: Water", pool: ['江', '河', '湖', '海', '没', '法', '活', '洗', '泥', '沙'] },
  { level: 29, name: "Radical Swap: Heart", pool: ['情', '性', '快', '忙', '怕', '怀', '恨', '悦', '惜', '悟'] },
  { level: 30, name: "Radical Swap: Person", pool: ['位', '住', '件', '体', '信', '使', '传', '值', '借', '做'] },

  // --- STAGE 4: COMPONENT DISCRIMINATION (13-16 STROKES) ---
  { level: 31, name: "Component: The Rain Top", pool: ['震', '露', '霜', '霞', '雾', '雷', '需', '霸', '雳', '霁'] },
  { level: 32, name: "Component: The Fire Base", pool: ['照', '熙', '烈', '热', '然', '煮', '蒸', '熬', '熟', '熊'] },
  { level: 33, name: "Component: The Eye Side", pool: ['睡', '睛', '睁', '眨', '眯', '瞎', '瞧', '瞪', '瞒', '瞩'] },
  { level: 34, name: "Component: The Ghost Base", pool: ['鬼', '魂', '魄', '魅', '魁', '魔', '魇', '魉', '魏', '魈'] },
  { level: 35, name: "Component: The Bird Side", pool: ['鸟', '岛', '乌', '鸣', '鸥', '鸭', '鸯', '鸳', '鸩', '鸨'] },
  { level: 36, name: "Confusion: 曷 (Request)", pool: ['渴', '喝', '竭', '揭', '歇', '褐', '葛', '遏', '谒', '蔼'] },
  { level: 37, name: "Confusion: 既 (Already)", pool: ['既', '即', '慨', '概', '退', '艰', '限', '哏', '眼', '跟'] },
  { level: 38, name: "Confusion: 寺 (Temple)", pool: ['待', '持', '特', '侍', '诗', '峙', '等', '寺', '时', '付'] },
  { level: 39, name: "Confusion: 翟 (Pheasant)", pool: ['耀', '曜', '翟', '戮', '戳', '瞿', '栽', '裁', '载', '濯'] },
  { level: 40, name: "Confusion: 莫 (None)", pool: ['莫', '摸', '漠', '模', '寞', '墓', '幕', '幕', '募', '慕'] },

  // --- STAGE 5: VISUAL NOISE & DENSITY (17-30 STROKES) ---
  { level: 41, name: "Density: The Silk Base", pool: ['繁', '紫', '紧', '絮', '系', '累', '素', '索', '紊', '絜'] },
  { level: 42, name: "Density: The Heart High", pool: ['德', '听', '稳', '慰', '憋', '憨', '愿', '慈', '慕', '慝'] },
  { level: 43, name: "Density: The Spear High", pool: ['藏', '截', '戴', '栽', '裁', '载', '戳', '戮', '戡', '戢'] },
  { level: 44, name: "Density: The Winner", pool: ['赢', '嬴', '羸', '蠃', '禀', '嚷', '嚼', '曦', '噪', '譬'] },
  { level: 45, name: "Density: The Manner", pool: ['微', '徽', '德', '律', '循', '彻', '征', '径', '衍', '街'] },
  { level: 46, name: "Master: The 'True' Delta", pool: ['真', '具', '直', '值', '置', '植', '查', '査', '德', '慧'] },
  { level: 47, name: "Master: The 'Xin' Frame", pool: ['辨', '辩', '瓣', '辫', '掰', '辧', '斑', '班', '辬', '辜'] },
  { level: 48, name: "Master: The 'Spear' Box", pool: ['戊', '戌', '戍', '戎', '戒', '成', '咸', '越', '戚', '喊'] },
  { level: 49, name: "Master: The 'Musk' Deer", pool: ['麟', '麒', '麝', '麓', '巍', '蘸', '囊', '囔', '馕', '瓤'] },
  { level: 50, name: "Master: The Ultimate Nang", pool: ['齉', '馕', '囔', '攮', '曩', '瀼', '纕', '蠰', '饢', '瓤'] }
];
