/* ==========================================================================
   数据层：先放在本地 JS 里，第 12 周改成从 FastAPI 接口 fetch
   ========================================================================== */

const ENV_ITEMS = [
  { name: "VS Code", value: "1.136.2", ok: true },
  { name: "Node.js", value: "v24.20.0", ok: true },
  { name: "npm", value: "11.19.0", ok: true },
  { name: "Python", value: "3.13.5", ok: true },
  { name: "conda", value: "25.5.1", ok: true },
  { name: "Git", value: "今天安装", ok: false },
];

const PHASES = [
  {
    id: 1,
    name: "阶段一 · 地图前端入门",
    range: "第 1–6 周",
    topic: "Leaflet / GeoJSON / 交互 / 部署",
    goal: "上线第一个可展示的 Web 地图作品（项目 1 v0.2）",
  },
  {
    id: 2,
    name: "阶段二 · 引擎升级 + Vue3 + 空间分析",
    range: "第 7–15 周",
    topic: "MapLibre GL / Vue3 / GeoPandas / PostGIS / FastAPI",
    goal: "把项目 1 升级为前后端全栈应用（项目 1 v0.4）",
  },
  {
    id: 3,
    name: "CNN 并行线",
    range: "第 1–15 周（每周 3h）",
    topic: "U-Net / DeepLabv3+ / MMSegmentation / LoveDA",
    goal: "复现一个遥感分割模型并写出实验记录",
  },
];

const WEEKS = [
  // 阶段一
  { week: 1,  phase: 1, topic: "前端复习 + Git 环境",      detail: "HTML5 语义化、Grid 布局、数组方法、async/await、Git 提交" },
  { week: 2,  phase: 1, topic: "GIS 基础概念",             detail: "WGS84 / Web Mercator / CGCS2000、瓦片金字塔、QGIS 投影转换" },
  { week: 3,  phase: 1, topic: "Leaflet 入门",             detail: "地图初始化、底图切换、Marker / Popup、点击取坐标" },
  { week: 4,  phase: 1, topic: "GeoJSON 与样式",           detail: "L.geoJSON、分级设色、图例、数据简化" },
  { week: 5,  phase: 1, topic: "交互与筛选",               detail: "图层控制、属性筛选、地图与侧栏联动、ECharts" },
  { week: 6,  phase: 1, topic: "项目 1 收尾与部署",        detail: "代码清理、README、Vercel 部署、90 秒演示视频" },
  // 阶段二
  { week: 7,  phase: 2, topic: "MapLibre GL 入门",         detail: "style JSON、矢量瓦片源、fill / line / circle 图层" },
  { week: 8,  phase: 2, topic: "样式表达式与热力图",       detail: "interpolate / match / case、heatmap、fill-extrusion" },
  { week: 9,  phase: 2, topic: "Vue 3 + Vite 基础",        detail: "模板语法、ref / reactive / computed、组件化、Pinia、Router" },
  { week: 10, phase: 2, topic: "Vue 3 集成地图",           detail: "shallowRef / markRaw、onUnmounted 销毁、Vue3 版项目 1 上线" },
  { week: 11, phase: 2, topic: "坐标系转换与数据坑",       detail: "proj4js / pyproj、GCJ02 偏移、脏数据清洗脚本" },
  { week: 12, phase: 2, topic: "GeoPandas 空间分析（上）", detail: "to_crs、sjoin、buffer、overlay" },
  { week: 13, phase: 2, topic: "GeoPandas 空间分析（下）", detail: "rasterio 栅格裁剪、分区统计、osmnx 路网可达性" },
  { week: 14, phase: 2, topic: "PostGIS 与空间服务",       detail: "建库、导入、GIST 索引、ST_DWithin、GeoServer 发布" },
  { week: 15, phase: 2, topic: "FastAPI 全栈打通",         detail: "接口设计、连接池、前端接口取数、部署" },
  // CNN 并行线
  { week: 1,  phase: 3, topic: "CNN 理论打底（1/3）",      detail: "读 U-Net 原文，重点 skip connection" },
  { week: 2,  phase: 3, topic: "CNN 理论打底（2/3）",      detail: "读 DeepLabv3+，重点空洞卷积与 ASPP" },
  { week: 3,  phase: 3, topic: "CNN 理论打底（3/3）",      detail: "读 SegFormer，画出三个模型的结构图" },
  { week: 4,  phase: 3, topic: "环境与第一个 demo",        detail: "conda 建环境、装 mmsegmentation、跑通官方推理" },
  { week: 5,  phase: 3, topic: "LoveDA 数据集",            detail: "下载数据、改配置、训练 5 epoch 看 loss" },
  { week: 6,  phase: 3, topic: "第一次评估",               detail: "算出 mIoU 并记录基线" },
  { week: 7,  phase: 3, topic: "数据集与预处理（上）",     detail: "WHU Building 建筑物提取" },
  { week: 8,  phase: 3, topic: "数据集与预处理（下）",     detail: "LEVIR-CD 变化检测、自写 Dataset 类" },
  { week: 9,  phase: 3, topic: "数据增强的合理性",         detail: "翻转 / 旋转 / 色彩抖动在遥感上的适用性分析" },
  { week: 10, phase: 3, topic: "复现分割模型",             detail: "U-Net 在 WHU Building 上复现，记录曲线与 mIoU" },
  { week: 11, phase: 3, topic: "改一处并对比",             detail: "换 loss / 加增强 / 改 backbone，做消融对比" },
  { week: 12, phase: 3, topic: "实验记录整理",             detail: "写成 Markdown 表格放进 GitHub" },
];

// 当前进度：第 1 周进行中，其余未开始
const CURRENT_WEEK = 1;
