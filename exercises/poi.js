/* ==========================================================================
   数组方法练习 · 8 道题
   ---------------------------------------------------------------------------
   使用方法：
     1. 把下面 8 个函数里的占位返回值换成你的实现
     2. 保存文件，刷新 poi.html，页面会实时显示每道题的判定结果
     3. 全绿之后 commit 一次

   可用工具：filter / map / sort / reduce / includes / find
   注意：不要修改 poi-data.js，也不要修改函数名
   ========================================================================== */

/* ---------- Q1 基础：filter + map ---------- */
// 返回所有「公园」类型 POI 的名称，组成数组（顺序不限）
function q1_parkNames() {
  // 提示：先 filter 出 type === "公园" 的，再用 map 取出 name
  return null;
}

/* ---------- Q2 排序：sort + slice ---------- */
// 返回年访问量最高的 3 个 POI 名称，按访问量从高到低
function q2_top3ByVisitors() {
  // 提示：sort((a, b) => b.visitors - a.visitors) 是降序
  //       注意 sort 会改变原数组，先 [...POIS] 复制一份
  return null;
}

/* ---------- Q3 归约：reduce 计数 ---------- */
// 返回一个对象，统计每个区有多少个 POI
// 形如 { 武昌区: 8, 汉阳区: 1, ... }
function q3_countByDistrict() {
  // 提示：POIS.reduce((acc, p) => {...}, {})
  return null;
}

/* ---------- Q4 归约：求平均值 ---------- */
// 返回所有公园的年平均访问量，保留 1 位小数
function q4_avgVisitorsOfParks() {
  // 提示：先 filter 出公园，再用 reduce 求和，最后除以个数
  //       保留 1 位小数：Math.round(x * 10) / 10
  return null;
}

/* ---------- Q5 组合：filter + sort + map ---------- */
// 返回占地面积大于 100 公顷的公园名称，按面积从大到小
function q5_largeParks() {
  // 提示：三个方法串起来写
  return null;
}

/* ---------- Q6 字符串匹配：includes ---------- */
// 返回名称中包含「武汉」两个字的 POI 名称，保持原顺序
function q6_containsWuhan() {
  // 提示：p.name.includes("武汉")
  return null;
}

/* ---------- Q7 分组：reduce 分组 ---------- */
// 按类型分组，返回 { 公园: [名称...], 商场: [名称...], ... }
// 每组内保持 POIS 中的原始顺序
function q7_groupByType() {
  // 提示：acc[p.type] = acc[p.type] || []; 然后 push
  return null;
}

/* ---------- Q8 综合题 ---------- */
// 返回「年访问量总和最高」的区名（字符串）
function q8_busiestDistrict() {
  // 提示：先按区把 visitors 累加成一个对象，再找出值最大的那个键
  //       找最大值可用 Object.entries(...).sort((a, b) => b[1] - a[1])[0][0]
  return null;
}

/* ==========================================================================
   以下为自动判分逻辑，不需要修改
   ========================================================================== */

const TESTS = [
  {
    id: "Q1", title: "所有公园的名称",
    call: q1_parkNames,
    expect: ["东湖听涛景区", "中山公园", "武汉动物园", "沙湖公园", "解放公园", "马鞍山森林公园"],
    ignoreOrder: true,
    hint: "filter 出 type 为「公园」的，再 map 取 name",
  },
  {
    id: "Q2", title: "访问量最高的 3 个 POI",
    call: q2_top3ByVisitors,
    expect: ["汉口火车站", "武昌火车站", "光谷步行街"],
    hint: "降序排序后取前 3 个名称",
  },
  {
    id: "Q3", title: "各区 POI 数量统计",
    call: q3_countByDistrict,
    expect: { 武昌区: 8, 汉阳区: 1, 江岸区: 1, 江汉区: 5, 洪山区: 5 },
    hint: "reduce 累加计数",
  },
  {
    id: "Q4", title: "公园年平均访问量",
    call: q4_avgVisitorsOfParks,
    expect: 202.5,
    hint: "求和后除以公园数量，保留 1 位小数",
  },
  {
    id: "Q5", title: "面积大于 100 公顷的公园",
    call: q5_largeParks,
    expect: ["马鞍山森林公园"],
    hint: "filter 面积 > 100，再按面积降序",
  },
  {
    id: "Q6", title: "名称含「武汉」的 POI",
    call: q6_containsWuhan,
    expect: ["武汉动物园", "武汉广场", "武汉大学", "武汉火车站"],
    hint: "用 includes(\"武汉\") 判断",
  },
  {
    id: "Q7", title: "按类型分组",
    call: q7_groupByType,
    expect: {
      公园: ["东湖听涛景区", "武汉动物园", "解放公园", "中山公园", "沙湖公园", "马鞍山森林公园"],
      商场: ["武汉广场", "楚河汉街", "光谷步行街", "汉街万达"],
      医院: ["同济医院", "协和医院", "中南医院"],
      学校: ["武汉大学", "华中科技大学", "华中师范大学", "湖北大学"],
      地铁站: ["汉口火车站", "武昌火车站", "武汉火车站"],
    },
    hint: "reduce 到一个对象，每个键对应一个数组",
  },
  {
    id: "Q8", title: "访问量总和最高的区",
    call: q8_busiestDistrict,
    expect: "武昌区",
    hint: "先按区求和，再取出最大值对应的键",
  },
];

/* ---------- 比较工具 ---------- */

// 把对象键排序后序列化，避免键顺序不同导致误判
function normalize(v) {
  if (Array.isArray(v)) return v.map(normalize);
  if (v && typeof v === "object") {
    return Object.keys(v).sort().reduce((acc, k) => {
      acc[k] = normalize(v[k]);
      return acc;
    }, {});
  }
  return v;
}

function isEqual(actual, expected, ignoreOrder) {
  let a = actual;
  let e = expected;
  if (ignoreOrder && Array.isArray(a) && Array.isArray(e)) {
    a = [...a].sort();
    e = [...e].sort();
  }
  return JSON.stringify(normalize(a)) === JSON.stringify(normalize(e));
}

function show(v) {
  if (v === null) return "null（还没做）";
  if (v === undefined) return "undefined（函数没有 return）";
  const s = JSON.stringify(v);
  return s && s.length > 160 ? s.slice(0, 160) + " …" : s;
}

/* ---------- 渲染结果 ---------- */

function runTests() {
  const results = document.getElementById("results");
  const summary = document.getElementById("summary");
  if (!results) return;

  let passed = 0;
  results.textContent = "";

  TESTS.forEach((t) => {
    let actual;
    let error = null;
    try {
      actual = t.call();
    } catch (err) {
      error = err.message;
    }

    const ok = !error && isEqual(actual, t.expect, t.ignoreOrder);
    if (ok) passed++;

    const card = document.createElement("div");
    card.className = "q " + (ok ? "pass" : "fail");

    const head = document.createElement("div");
    head.className = "q-head";
    head.textContent = `${ok ? "✅" : "❌"} ${t.id} · ${t.title}`;
    card.appendChild(head);

    if (error) {
      const e = document.createElement("div");
      e.className = "q-detail err";
      e.textContent = "运行报错：" + error;
      card.appendChild(e);
    } else if (!ok) {
      const a = document.createElement("div");
      a.className = "q-detail";
      a.textContent = "你的结果：" + show(actual);
      card.appendChild(a);

      const b = document.createElement("div");
      b.className = "q-detail exp";
      b.textContent = "正确答案：" + show(t.expect);
      card.appendChild(b);

      const h = document.createElement("div");
      h.className = "q-hint";
      h.textContent = "提示：" + t.hint;
      card.appendChild(h);
    }

    results.appendChild(card);
  });

  summary.textContent = `通过 ${passed} / ${TESTS.length}`;
  summary.className = passed === TESTS.length ? "done" : "doing";
}

runTests();
