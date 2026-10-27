/* "Explore more of my past work": every project and role in one filterable list. Each row opens a detail page. */

const WORK_KINDS = {
  company: "Company roles",
  freelance: "Freelance projects",
  academic: "Academic projects",
  personal: "Personal projects",
};
const WORK_KIND_LABEL = {
  company: "COMPANY ROLE",
  freelance: "FREELANCE",
  academic: "ACADEMIC PROJECT",
  personal: "PERSONAL PROJECT",
};

/** Everything that can be explored, projects and past work together. */
function allWork() {
  return [
    ...WORKS.map((w) => ({ ...w, _k: "work" })),
    ...PROJECTS.map((p) => ({ ...p, _k: "project" })),
  ];
}
function initWorkExplorer() {
  const list = $("wkList"),
    bar = $("wkFilters"),
    count = $("wkCount");
  if (!list) return;
  const items = allWork();
  const kinds = Object.keys(WORK_KINDS).filter((k) =>
    items.some((x) => x.kind === k),
  );
  let active = kinds[0];

  function row(x) {
    const when = x.period || (x.detail && x.detail.period) || "";
    const who = [x.org, x.role].filter(Boolean).join(" · ");
    return `<article class='wk'>
      <div class='wk-when'>${esc(when)}</div>
      <div class='wk-main'>${who ? `<small>${esc(who)}</small>` : ""}
        <h3><button type='button' class='wk-open' data-k='${x._k}' data-id='${esc(x.id)}'>${esc(x.title)}</button></h3>
        <p>${esc(x.summary || "")}</p></div>
      <div class='wk-go'><button type='button' class='send wk-open' data-k='${x._k}' data-id='${esc(x.id)}'>Read details →</button></div>
    </article>`;
  }
  function render() {
    const shown = items.filter((x) => x.kind === active);
    list.innerHTML =
      shown.map(row).join("") || "<p class='mut'>Nothing here yet.</p>";
    count.textContent = `Showing ${shown.length} of ${items.length}`;
    [...bar.children].forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.f === active),
    );
  }
  bar.innerHTML = kinds
    .map(
      (k) =>
        `<button type='button' data-f='${k}' aria-pressed='false'>${WORK_KINDS[k]}</button>`,
    )
    .join("");
  bar.onclick = (e) => {
    const b = e.target.closest("button");
    if (b) {
      active = b.dataset.f;
      render();
    }
  };
  list.onclick = (e) => {
    const b = e.target.closest(".wk-open");
    if (b) openDetail(b.dataset.k, b.dataset.id);
  };
  render();
}
