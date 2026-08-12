/* =========================================================================
   設定區 — 只需要在這裡填一次
   -------------------------------------------------------------------------
   1) GoatCounter（訪客人次）
      去 https://www.goatcounter.com 註冊，取得你的代號（例如註冊成
      myblog.goatcounter.com，代號就是 "myblog"）。填在下面 goatcounterCode。
      並到 GoatCounter 設定裡勾選 "Allow adding visitor counts on your website"。

   2) Giscus（留言，用 GitHub Discussions 當後端）
      先到你的 repo：Settings > General > Features 勾選 Discussions；
      到 https://github.com/apps/giscus 安裝 giscus app 並授權這個 repo；
      再到 https://giscus.app 產生設定，把 data-repo-id 與 data-category-id
      複製到下面。repo 填 "你的帳號/你的repo名"，category 建議用 "Comments"。
      在你完成設定前，留言區會顯示一段提示，不影響其他功能。
   ========================================================================= */
const CONFIG = {
  goatcounterCode: "", // 例如 "myblog"（留空 = 人次顯示為 —）
  giscus: {
    repo: "",          // 例如 "andywang/neuro-blog"
    repoId: "",        // 例如 "R_kgD..."
    category: "Comments",
    categoryId: "",    // 例如 "DIC_kwD..."
    theme: "transparent_dark",
    lang: "zh-TW"
  }
};

/* ========================================================================= */

const CATS = ["Paper Review", "Neuroimaging", "Clinical Notes"];
const NAV = ["Feed", ...CATS];
const POSTS = (window.POSTS || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

let state = { nav: "Feed", post: null };

/* ---- 小工具 ---- */
const $ = (id) => document.getElementById(id);
const esc = (s) => (s || "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};
const excerpt = (b, n = 96) => {
  const t = (b || "").replace(/\n+/g, " ").trim();
  return t.length > n ? t.slice(0, n) + "…" : t;
};
const bodyToHtml = (body) =>
  body.split(/\n{2,}/).map((p) => "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>").join("");

const markSvg = (on) =>
  on
    ? `<svg class="mn-mark" viewBox="0 0 12 12"><path d="M6 1 L11 6 L6 11 L1 6 Z" fill="#909DEA"/></svg>`
    : `<svg class="mn-mark" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.4" fill="none" stroke="#4a4a50" stroke-width="1.3"/></svg>`;

/* ---- 側欄 ---- */
function renderNav() {
  $("nav").innerHTML = NAV.map((n) => {
    const on = state.nav === n && !state.post;
    return `<button class="mn-navitem${on ? " on" : ""}" data-nav="${esc(n)}">${markSvg(on)}${esc(n)}</button>`;
  }).join("");
  document.querySelectorAll("[data-nav]").forEach((b) =>
    b.addEventListener("click", () => goFeed(b.dataset.nav)));
}

/* ---- Feed ---- */
function renderFeed() {
  const list = state.nav === "Feed" ? POSTS : POSTS.filter((p) => p.category === state.nav);
  $("catlabel").textContent = state.nav === "Feed" ? "All" : state.nav;

  if (!list.length) {
    $("panel").innerHTML = `<div class="mn-empty">此分類還沒有文章。</div>`;
    return;
  }
  $("panel").innerHTML = list.map((p) => `
    <div class="mn-feeditem" data-id="${esc(p.id)}">
      <div class="mn-eyebrow">${esc(p.category)}</div>
      <div class="mn-feedtitle">${esc(p.title)}</div>
      <div class="mn-feedex">${esc(excerpt(p.body))}</div>
      ${p.image ? `<img class="mn-thumb" src="${esc(p.image)}" alt="">` : ""}
      <div class="mn-feeddate">${fmtDate(p.date)}</div>
    </div>`).join("");
  document.querySelectorAll("[data-id]").forEach((el) =>
    el.addEventListener("click", () => openPost(el.dataset.id)));
}

/* ---- 文章內頁 ---- */
function renderDetail(p) {
  $("catlabel").textContent = p.category;
  $("panel").innerHTML = `
    <button class="mn-back" id="back">← Back to Feed</button>
    <div class="mn-eyebrow">${esc(p.category)}</div>
    <h2 class="mn-arttitle">${esc(p.title)}</h2>
    ${p.image ? `<img class="mn-artimg" src="${esc(p.image)}" alt="${esc(p.title)}">` : ""}
    <div class="mn-prose">${bodyToHtml(p.body)}</div>
    <div class="mn-artmeta"><span>${fmtDate(p.date)}</span></div>
    <div class="mn-cmts">
      <h4>Comments</h4>
      <div id="giscus-slot"></div>
    </div>`;
  $("back").addEventListener("click", () => goFeed(state.nav));
  loadGiscus(p.id);
}

/* ---- Giscus 留言（每篇獨立 thread，用 data-term = 文章 id） ---- */
function loadGiscus(term) {
  const slot = $("giscus-slot");
  const g = CONFIG.giscus;
  if (!g.repo || !g.repoId || !g.categoryId) {
    slot.innerHTML = `<div class="notice">留言功能尚未啟用。到 <code>app.js</code> 的 CONFIG 填入 Giscus 的 repo、repoId、categoryId 後即可開啟（設定步驟見 README）。</div>`;
    return;
  }
  slot.innerHTML = "";
  const s = document.createElement("script");
  s.src = "https://giscus.app/client.js";
  s.async = true;
  s.crossOrigin = "anonymous";
  s.setAttribute("data-repo", g.repo);
  s.setAttribute("data-repo-id", g.repoId);
  s.setAttribute("data-category", g.category);
  s.setAttribute("data-category-id", g.categoryId);
  s.setAttribute("data-mapping", "specific");
  s.setAttribute("data-term", term);
  s.setAttribute("data-strict", "1");
  s.setAttribute("data-reactions-enabled", "1");
  s.setAttribute("data-emit-metadata", "0");
  s.setAttribute("data-input-position", "bottom");
  s.setAttribute("data-theme", g.theme);
  s.setAttribute("data-lang", g.lang);
  s.setAttribute("data-loading", "lazy");
  slot.appendChild(s);
}

/* ---- 導覽 ---- */
function goFeed(nav) {
  state.nav = nav;
  state.post = null;
  location.hash = nav === "Feed" ? "" : "cat=" + encodeURIComponent(nav);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openPost(id) {
  const p = POSTS.find((x) => x.id === id);
  if (!p) return;
  state.post = p;
  location.hash = "post=" + encodeURIComponent(id);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function render() {
  renderNav();
  if (state.post) renderDetail(state.post);
  else renderFeed();
}

/* ---- 從網址 hash 還原狀態（可分享單篇連結） ---- */
function restoreFromHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (h.startsWith("post=")) {
    const p = POSTS.find((x) => x.id === h.slice(5));
    if (p) { state.post = p; state.nav = p.category; return; }
  }
  if (h.startsWith("cat=")) {
    const c = h.slice(4);
    if (NAV.includes(c)) { state.nav = c; state.post = null; return; }
  }
  state.nav = "Feed"; state.post = null;
}

/* ---- GoatCounter：載入追蹤 + 顯示總人次 ---- */
function setupGoatCounter() {
  const code = CONFIG.goatcounterCode;
  if (!code) return;
  // 追蹤這次造訪
  const t = document.createElement("script");
  t.async = true;
  t.src = "//gc.zgo.at/count.js";
  t.setAttribute("data-goatcounter", `https://${code}.goatcounter.com/count`);
  document.body.appendChild(t);
  // 顯示總人次（用根路徑作為全站計數）
  fetch(`https://${code}.goatcounter.com/counter/${encodeURIComponent("/")}.json`)
    .then((r) => r.json())
    .then((d) => {
      const n = d && d.count ? d.count : "0";
      $("views").textContent = n;
      $("foot-views").textContent = "累計參訪 " + n + " 人次";
    })
    .catch(() => {});
}

/* ---- 啟動 ---- */
restoreFromHash();
render();
setupGoatCounter();
window.addEventListener("hashchange", () => { restoreFromHash(); render(); });
