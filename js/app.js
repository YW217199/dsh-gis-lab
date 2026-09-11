/* ==========================================================================
   逻辑层 · 第 1 周练习重点
   1. DOM 操作：createElement / textContent / appendChild
   2. 数组方法：filter（筛选）+ sort（排序）+ map（转换）
   3. async/await：renderAll 写成异步函数，为第 15 周接 FastAPI 做准备
   4. 事件监听：input / change 触发重新渲染
   ========================================================================== */

/* ---------- 工具函数 ---------- */

/** 根据周次与当前进度，返回状态对象 */
function getStatus(week) {
  if (week < CURRENT_WEEK) return { key: "done", label: "已完成" };
  if (week === CURRENT_WEEK) return { key: "doing", label: "进行中" };
  return { key: "todo", label: "未开始" };
}

/** 创建一个元素并设置 class / 文本，减少重复代码 */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** 空值保护：容器不存在时给出明确报错，而不是静默失败 */
function mustGet(id) {
  const node = document.getElementById(id);
  if (!node) throw new Error(`找不到元素 #${id}，请检查 index.html`);
  return node;
}

/* ---------- 渲染：日期 ---------- */

function renderToday() {
  const now = new Date();
  const text = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  mustGet("today").textContent = text;
}

/* ---------- 渲染：环境状态卡片 ---------- */

function renderEnv() {
  const grid = mustGet("env-grid");
  grid.textContent = ""; // 清空后重建

  ENV_ITEMS.forEach((item) => {
    const card = el("div", `card ${item.ok ? "is-ok" : "is-todo"}`);
    card.appendChild(el("h3", null, item.name));
    card.appendChild(el("p", "value", item.value));
    card.appendChild(el("p", null, item.ok ? "已就绪" : "待安装"));
    grid.appendChild(card);
  });
}

/* ---------- 渲染：阶段进度卡片 ---------- */

/** 阶段 id → 该阶段内的所有周次，用于判断阶段是否已开始 / 完成 */
const PHASE_WEEKS = {};
WEEKS.forEach((row) => {
  (PHASE_WEEKS[row.phase] ||= []).push(row.week);
});

function renderPhases() {
  const grid = mustGet("phase-grid");
  grid.textContent = "";

  PHASES.forEach((phase) => {
    const weeks = PHASE_WEEKS[phase.id] || [];
    const minWeek = Math.min(...weeks);
    const maxWeek = Math.max(...weeks);

    // 当前周在阶段范围内 → 进行中；全部周次都早于当前周 → 已完成
    let statusKey = "todo";
    let statusLabel = "未开始";
    if (CURRENT_WEEK > maxWeek) {
      statusKey = "done";
      statusLabel = "已完成";
    } else if (CURRENT_WEEK >= minWeek) {
      statusKey = "doing";
      statusLabel = "进行中";
    }

    const card = el("div", "card");
    card.appendChild(el("h3", null, phase.name));
    card.appendChild(el("p", "card-meta", `${phase.range} · ${phase.topic}`));
    card.appendChild(el("span", `badge ${statusKey}`, statusLabel));
    card.appendChild(el("p", null, `目标：${phase.goal}`));
    grid.appendChild(card);
  });
}

/* ---------- 渲染：周计划表（筛选 + 排序的核心练习） ---------- */

function getFilteredWeeks() {
  const keyword = mustGet("search-input").value.trim().toLowerCase();
  const phaseValue = mustGet("phase-select").value;
  const sortOrder = mustGet("sort-select").value;

  let rows = WEEKS.filter((row) => {
    // 1. 按阶段筛选
    if (phaseValue !== "all" && String(row.phase) !== phaseValue) return false;

    // 2. 按关键词搜索：周次、主题、内容任一命中即可
    if (!keyword) return true;
    const haystack = `${row.topic} ${row.detail} 第${row.week}周`.toLowerCase();
    return haystack.includes(keyword);
  });

  // 3. 排序：先按周次，再按阶段，保证同周内顺序稳定
  rows = rows.sort((a, b) => {
    const diff = a.week - b.week || a.phase - b.phase;
    return sortOrder === "asc" ? diff : -diff;
  });

  return rows;
}

function renderTable() {
  const tbody = mustGet("roadmap-body");
  const rows = getFilteredWeeks();

  tbody.textContent = ""; // 清空旧行

  if (rows.length === 0) {
    const tr = el("tr", "empty-row");
    const td = el("td", null, "没有匹配的结果，试试换个关键词。");
    td.colSpan = 4;
    tr.appendChild(td);
    tbody.appendChild(tr);
  } else {
    rows.forEach((row) => {
      const status = getStatus(row.week);
      const tr = document.createElement("tr");

      tr.appendChild(el("td", "week-cell", `第 ${row.week} 周`));
      tr.appendChild(el("td", null, row.topic));
      tr.appendChild(el("td", null, row.detail));

      const tdStatus = document.createElement("td");
      tdStatus.appendChild(el("span", `badge ${status.key}`, status.label));
      tr.appendChild(tdStatus);

      tbody.appendChild(tr);
    });
  }

  mustGet("result-count").textContent = `共 ${rows.length} 条`;
}

/* ---------- 渲染：总入口 ---------- */

async function renderAll() {
  renderToday();
  renderEnv();
  renderPhases();
  renderTable();
}

/* ---------- 事件绑定 ---------- */

function bindEvents() {
  const search = mustGet("search-input");
  const phase = mustGet("phase-select");
  const sort = mustGet("sort-select");

  // input 事件：每敲一个字符就重新筛选
  search.addEventListener("input", renderTable);
  phase.addEventListener("change", renderTable);
  sort.addEventListener("change", renderTable);
}

/* ---------- 启动 ---------- */

// 用 try/catch 包住启动逻辑，报错时直接显示在页面上，方便排查
(async function init() {
  try {
    bindEvents();
    await renderAll();
    console.log("看板初始化完成");
  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<pre style="color:#f87171;padding:16px;white-space:pre-wrap">启动失败：${err.message}</pre>`
    );
  }
})();
