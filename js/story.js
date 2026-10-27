/* Interest selection and contextual project previews for the intro.
   The previews come from the `themes` and `story` fields in data/projects.js and data/works.js. */

const THEMES = { ai: "AI & intelligent systems", data: "Data & experimentation", product: "Products & innovation" };
const DEFAULT_MIX = ["job-agent", "glof-early-warning", "bnpl-dashboard"]; // shown until a visitor picks an interest
const state = { interest: null },
  cover = $("cover"),
  sps = $("sps");

const storyItems = () =>
  [...PROJECTS.map((p) => ({ ...p, _k: "project" })), ...WORKS.map((w) => ({ ...w, _k: "work" }))].filter((x) => x.story);
const featured = () => {
  const all = storyItems();
  return (state.interest ? all.filter((x) => (x.themes || []).includes(state.interest)) : DEFAULT_MIX.map((id) => all.find((x) => x.id === id)))
    .filter(Boolean)
    .slice(0, 3);
};

function renderSP() {
  const top = cover.scrollTop,
    list = featured();
  sps.style.minHeight = sps.offsetHeight + "px";
  sps.innerHTML = list
    .map((x, k) => {
      const f = x.story;
      return `<article class='sp' style='animation-delay:${k * 70}ms'><small>${esc(x.tag || "")}</small><h3>${esc(x.title)}</h3><dl><dt>Problem</dt><dd>${esc(f.prob || x.summary)}</dd><dt>Approach</dt><dd>${esc(f.how || x.summary)}</dd><dt>Status</dt><dd>${esc(f.status || "Project")}</dd></dl><button type='button' class='sp-go' data-k='${x._k}' data-id='${esc(x.id)}' data-act='${x._k === "project" ? "show" : "page"}'>${x._k === "project" ? "View " + esc(x.title) + " in the portfolio" : "Open " + esc(x.title)}</button>${x._k === "project" ? `<button type='button' class='sp-go sp-alt' data-k='project' data-id='${esc(x.id)}' data-act='page'>Read the project page</button>` : ""}</article>`;
    })
    .join("");
  requestAnimationFrame(() => {
    sps.style.minHeight = "";
    if (cover.scrollTop !== top) cover.scrollTop = top;
  });
  $("iStatus").textContent = state.interest ? "Showing " + list.length + " projects for " + THEMES[state.interest] + "." : "";
  $("pLead").textContent = state.interest
    ? "Selected for you: " + THEMES[state.interest] + "."
    : "Choose an interest above to focus this selection. Here is a mix to start.";
}

/** Leaves the intro and goes to a project in the showcase, or to its detail page. */
function goItem(k, id, act) {
  window.enterPortfolio("guest");
  if (act === "page" || k === "work") openDetail(k, id);
  else {
    pinned = true;
    show(PROJECTS.findIndex((p) => p.id === id));
    setTimeout(() => $("projects").scrollIntoView({ behavior: rm ? "auto" : "smooth" }), 60);
  }
}

/** Wires interest radios, preview links and renders the first set. */
function initStory() {
  document.querySelectorAll("input[name=interest]").forEach((r) => (r.onchange = () => {
    state.interest = r.value;
    renderSP();
  }));
  sps.addEventListener("click", (e) => {
    const b = e.target.closest(".sp-go");
    if (b) goItem(b.dataset.k, b.dataset.id, b.dataset.act);
  });
  renderSP();
}
