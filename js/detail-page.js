/* Detail pages for projects and past work, laid out like a research profile page.
   Routes: #/project/<id> and #/work/<id>. Content comes from data/projects.js and data/works.js. */

const Detail = { opened: false, opener: null, title: document.title };

function findItem(kind, id) {
  return (kind === "project" ? PROJECTS : WORKS).find((x) => x.id === id);
}
function parseRoute(h) {
  const m = (h || location.hash).match(/^#\/(project|work)\/([\w-]+)$/);
  return m ? { kind: m[1], id: m[2] } : null;
}
/** Opens a detail page (adds one browser history entry, so Back closes it). */
function openDetail(kind, id) {
  Detail.opener = document.activeElement;
  Detail.opened = true;
  location.hash = "/" + kind + "/" + id;
}
/** Used by the assistant: openRoute("#/project/job-agent"). */
function openRoute(h) {
  const r = parseRoute(h);
  if (r) openDetail(r.kind, r.id);
}
/** Replaces the address without adding a history entry (falls back where replaceState is blocked, e.g. some file:// setups). */
function replaceRoute(h) {
  try {
    history.replaceState(null, "", h || location.pathname + location.search);
  } catch (e) {
    location.replace(h || "#");
  }
}
function closeDetail() {
  if ($("detail").hidden) return;
  if (Detail.opened) {
    Detail.opened = false;
    history.back();
  } else {
    replaceRoute(null);
    syncDetail();
  }
}
/** Moves to another detail page without adding a history entry. */
function swapDetail(kind, id) {
  replaceRoute("#/" + kind + "/" + id);
  syncDetail();
}

const paras = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

function sectionHtml(s, n) {
  const body = paras(s.body).map((p) => `<p>${esc(p)}</p>`).join("");
  const list = (s.bullets || []).length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
  return `<section class='dp-sec' id='dp-s${n}' data-toc='${esc(s.title)}'><h2><span>${n}</span>${esc(s.title)}</h2>${body}${list}</section>`;
}

function renderDetail(kind, it) {
  const d = it.detail || {};
  const collection = kind === "project" ? PROJECTS : WORKS;
  const label = kind === "project" ? "Projects" : "Past work";
  const meta = [
    ["Type", d.type || it.tag],
    ["Status", d.status],
    ["Period", it.period || d.period],
    ["Organisation", it.org || d.affiliation],
    ["Role", it.role || d.role],
    ["Team", d.team],
  ].filter((r) => r[1]);
  const secs = (d.sections || []).filter((s) => paras(s.body).length || (s.bullets || []).length);
  const stack = (it.stack || []).length;
  const links = (d.links || []).filter((l) => l && l.url);
  const toc = [[d.abstractLabel || "Abstract", "dp-abs"]];
  let n = 0,
    html = "";
  secs.forEach((s) => {
    n++;
    html += sectionHtml(s, n);
    toc.push([s.title, "dp-s" + n]);
  });
  if (stack) {
    n++;
    html += `<section class='dp-sec' id='dp-s${n}'><h2><span>${n}</span>Tools and technologies</h2><div class='chips'>${it.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></section>`;
    toc.push(["Tools and technologies", "dp-s" + n]);
  }
  if (links.length) {
    n++;
    html += `<section class='dp-sec dp-links' id='dp-s${n}'><h2><span>${n}</span>Further reading and resources</h2><ul>${links
      .map(
        (l) =>
          `<li><a href='${esc(l.url)}' target='_blank' rel='noopener'>${esc(l.label || l.url)}</a>${l.note ? `<small> ${esc(l.note)}</small>` : ""}</li>`,
      )
      .join("")}</ul></section>`;
    toc.push(["Further reading and resources", "dp-s" + n]);
  }
  const fig = (it.nodes || []).length
    ? `<figure class='dp-fig'><div class='pjflow'>${flow(it.nodes)}</div><figcaption><b>Figure 1.</b> ${esc(d.figureCaption || "System flow of " + it.title + ".")}</figcaption></figure>`
    : "";
  const cite =
    d.cite && d.cite.year
      ? `<section class='dp-cite' id='dp-cite'><h2>Cite this work</h2><pre id='dpCiteText'>Shrestha, S. (${esc(d.cite.year)}). ${esc(it.title)}. ${esc(d.cite.venue || "Project page")}. ${esc(location.href.split("#")[0])}#/${kind}/${esc(it.id)}</pre><button class='send' id='dpCopyCite' type='button'>Copy citation</button></section>`
      : "";
  const i = collection.indexOf(it),
    prev = collection[i - 1],
    next = collection[i + 1];
  const nav = (x, dir) =>
    x ? `<button type='button' class='dp-pn' data-go='${kind}/${x.id}'><small>${dir}</small><b>${esc(x.title)}</b></button>` : "<span></span>";
  $("detail").innerHTML = `
<div class='dp-bar'><button class='send' id='dpBack' type='button'>← Back to portfolio</button><span class='dp-crumb'>${label} / ${esc(it.title)}</span><button class='send' id='dpShare' type='button'>Copy link</button></div>
<article class='dp'>
  <header class='dp-head'>
    <p class='dp-kicker'>${esc(d.type || it.tag || label)}</p>
    <h1 id='dTitle' tabindex='-1'>${esc(it.title)}</h1>
    ${d.subtitle ? `<p class='dp-sub'>${esc(d.subtitle)}</p>` : ""}
    <p class='dp-authors'>Shuvam Shrestha${it.org || d.affiliation ? "<sup>1</sup>" : ""}</p>
    ${it.org || d.affiliation ? `<p class='dp-aff'><sup>1</sup> ${esc(d.affiliation || it.org)}</p>` : ""}
    ${meta.length ? `<dl class='dp-meta'>${meta.map((m) => `<div><dt>${m[0]}</dt><dd>${esc(m[1])}</dd></div>`).join("")}</dl>` : ""}
  </header>
  <div class='dp-grid'>
    <nav class='dp-toc' aria-label='Contents'><ol>${toc.map((t) => `<li><a href='#${t[1]}' data-sec='${t[1]}'>${esc(t[0])}</a></li>`).join("")}</ol></nav>
    <div class='dp-body'>
      <section class='dp-abstract' id='dp-abs'><h2>${esc(d.abstractLabel || "Abstract")}</h2><p>${esc(d.abstract || it.summary || "")}</p>${(d.keywords || []).length ? `<p class='dp-kw'><b>Keywords:</b> ${d.keywords.map(esc).join(" · ")}</p>` : ""}</section>
      ${fig}
      ${html}
      ${cite}
      <div class='dp-more'>${nav(prev, "← Previous")}${nav(next, "Next →")}</div>
    </div>
  </div>
</article>`;
  document.title = it.title + " · Shuvam Shrestha";
  // behaviour
  $("dpBack").onclick = closeDetail;
  $("dpShare").onclick = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      $("dpShare").textContent = "Link copied";
    } catch (e) {
      $("dpShare").textContent = "Copy from the address bar";
    }
    setTimeout(() => ($("dpShare").textContent = "Copy link"), 2000);
  };
  const cc = $("dpCopyCite");
  if (cc)
    cc.onclick = async () => {
      try {
        await navigator.clipboard.writeText($("dpCiteText").textContent);
        cc.textContent = "Copied";
      } catch (e) {}
    };
  $("detail")
    .querySelectorAll("[data-go]")
    .forEach((b) => (b.onclick = () => swapDetail(...b.dataset.go.split("/"))));
  $("detail")
    .querySelectorAll("[data-sec]")
    .forEach(
      (a) =>
        (a.onclick = (e) => {
          e.preventDefault();
          const t = $(a.dataset.sec);
          if (t) t.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
        }),
    );
  // highlight the section being read
  const links2 = [...$("detail").querySelectorAll("[data-sec]")];
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) links2.forEach((a) => a.setAttribute("aria-current", a.dataset.sec === e.target.id));
      }),
    { root: $("detail"), rootMargin: "-20% 0px -70% 0px" },
  );
  $("detail").querySelectorAll(".dp-abstract,.dp-sec").forEach((s) => io.observe(s));
}

/** Shows or hides the detail page to match the address (#/project/<id>). */
function syncDetail() {
  const box = $("detail");
  if (!$("cover").hidden) return; // the intro is still showing
  const r = parseRoute(),
    it = r && findItem(r.kind, r.id);
  if (it) {
    renderDetail(r.kind, it);
    box.hidden = false;
    $("app").setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    box.scrollTop = 0;
    $("dTitle").focus({ preventScroll: true });
  } else if (!box.hidden) {
    box.hidden = true;
    box.innerHTML = "";
    $("app").removeAttribute("inert");
    document.body.style.overflow = "";
    document.title = Detail.title;
    if (Detail.opener && Detail.opener.focus) Detail.opener.focus({ preventScroll: true });
  }
}

/** Wires browser Back, Escape and the first load. */
function initDetailPage() {
  addEventListener("hashchange", syncDetail);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("detail").hidden && !(window.Assistant && Assistant.isOpen())) closeDetail();
  });
  syncDetail();
}
