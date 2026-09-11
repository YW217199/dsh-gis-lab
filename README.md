# dsh-gis-lab

研一 WebGIS 学习仓库。所有练习都挂在这个项目上，一路从静态页面长成前后端全栈应用。

**在线预览**：https://yw217199.github.io/dsh-gis-lab/

## 当前进度

- [x] 第 1 周：环境搭建 + 前端骨架
- [ ] 第 2 周：GIS 基础概念（坐标系、瓦片、QGIS）
- [ ] 第 3 周：接入 Leaflet，替换首页地图占位区
- [ ] 第 4 周：GeoJSON 分级设色 + 图例
- [ ] 第 5 周：图层控制 + 属性筛选 + 双向联动
- [ ] 第 6 周：部署上线 + 演示视频

## 技术栈

- 第 1–6 周：原生 HTML / CSS / JavaScript
- 第 7–8 周：MapLibre GL JS
- 第 9–10 周：Vue 3 + Vite
- 第 12–15 周：Python（GeoPandas / osmnx）+ PostGIS + FastAPI

## 目录结构

```
dsh-gis-lab/
├── index.html          # 看板页面
├── css/
│   └── style.css       # 样式与 Grid 布局
├── js/
│   ├── data.js         # 数据层（第 15 周改为 fetch 接口）
│   └── app.js          # 逻辑层：渲染、筛选、排序
└── README.md
```

## 运行方式

不需要构建工具，直接用浏览器打开 `index.html` 即可。

如需本地服务器（端口 8080）：

```bash
# 方式一：Python
python -m http.server 8080

# 方式二：Node
npx serve .
```

然后访问 http://localhost:8080

## 数据来源

本仓库当前所有数据均为**本地自建**（`js/data.js`），用于练习 DOM 操作与筛选逻辑。

后续阶段将接入的真实数据来源会在对应周次补充说明，包括：

- 行政区划边界：阿里云 DataV.GeoAtlas
- POI 与设施点位：高德开放平台（个人开发者配额）
- 路网数据：OpenStreetMap（经 osmnx 获取）

数据仅用于个人学习与作品展示。

## 学习计划

完整周计划见同目录的 `研一15周学习计划.md` 与 `项目1-技术方案.md`。
