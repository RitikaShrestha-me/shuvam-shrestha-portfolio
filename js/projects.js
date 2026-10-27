/* Projects on watch: an auto-rotating showcase driven by data/projects.js.
   Recruiters see the demo video; guests can try the live agent on the Job Application Agent. */

function flow(nodes) {
  const n = nodes.length,
    gap = 480 / (n - 1),
    y = 50;
  let s = `<svg viewBox='0 0 600 120' role='img' aria-label='Flow: ${nodes.map(esc).join(", ")}'>`;
  for (let i = 0; i < n - 1; i++) s += `<line class='ln' x1='${60 + i * gap}' y1='${y}' x2='${60 + (i + 1) * gap}' y2='${y}'/>`;
  nodes.forEach((t, i) => {
    const x = 60 + i * gap;
    s += `<circle class='nd' cx='${x}' cy='${y}' r='15' style='animation-delay:${((i / (n - 1)) * 3.2).toFixed(2)}s'/><text x='${x}' y='${y + 42}'>${esc(t)}</text>`;
  });
  return s + `<circle r='5' fill='#f2b840'><animateMotion dur='4s' repeatCount='indefinite' path='M60 ${y} L540 ${y}'/></circle></svg>`;
}

let cur = 0,
  pinned = rm;
const pjq = $("pjq"),
  pjs = $("pjs");

/** Turns a YouTube or Google Drive link into an embeddable address. */
function embedUrl(u) {
  u = String(u).trim();
  let m;
  if ((m = u.match(/youtu\.be\/([\w-]{6,})/)) || (m = u.match(/[?&]v=([\w-]{6,})/)) || (m = u.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/)))
    return "https://www.youtube-nocookie.com/embed/" + m[1];
  if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return "https://drive.google.com/file/d/" + m[1] + "/preview";
  return u;
}
const isVideoFile = (u) => /\.(mp4|webm|ogg)(\?|$)/i.test(u);

function videoBlock(p) {
  if (!p.video)
    return `<div class='vph'><b>Demo video coming soon</b><span>Meanwhile, the project page explains the idea, the approach and the stack.</span></div>`;
  return `<div class='vframe' id='vframe'><button class='vplay' type='button' data-play='${esc(p.id)}'><span aria-hidden='true'>▶</span> Watch the demo video</button></div>`;
}
function playVideo(p) {
  pinned = true;
  clearTimeout(timer);
  const bd = $("pjBadge");
  if (bd) bd.lastChild.textContent = "PINNED · click to resume";
  const box = $("vframe"),
    u = p.video;
  box.innerHTML = isVideoFile(u)
    ? `<video controls autoplay playsinline src='${esc(u)}'></video>`
    : `<iframe src='${esc(embedUrl(u))}' title='${esc(p.title)} demo video' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen loading='lazy'></iframe><p class='mut'><a href='${esc(u)}' target='_blank' rel='noopener'>Open the video in a new tab</a> if it does not load.</p>`;
}

function sched() {
  clearTimeout(timer);
  if (pinned || busy) return;
  timer = setTimeout(() => {
    if (pjs.matches(":hover") || pjs.contains(document.activeElement)) sched();
    else show((cur + 1) % PROJECTS.length);
  }, 9000);
}

function show(i) {
  cur = i;
  [...pjq.children].forEach((b, k) => b.setAttribute("aria-selected", k === i));
  const p = PROJECTS[i],
    rec = isRec();
  // recruiters see the demo video; guests can try the live agent
  const media = rec ? `<div class='pjmedia'>${videoBlock(p)}</div>` : p.agent ? agentHTML : "";
  pjs.innerHTML = `<div class='pjbar ${pinned ? "" : "run"}'></div><button class='pjbadge' type='button' id='pjBadge'><i></i>${pinned ? "PINNED · click to resume" : "ON WATCH"}</button><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div class='pjflow'>${flow(p.nodes)}</div><div class='chips'>${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div><div class='pjactions'><button class='send go' type='button' data-open='${esc(p.id)}'>Read the project page →</button></div>${media}`;
  $("pjBadge").onclick = () => {
    pinned = !pinned;
    show(cur);
  };
  const play = pjs.querySelector("[data-play]");
  if (play) play.onclick = () => playVideo(p);
  if (p.agent && !rec) wireAgent();
  sched();
}

/** Registers the project list and shows the first project. */
function initProjects() {
  PROJECTS.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.innerHTML = `<i></i><span><small>${esc(p.tag)}</small><b>${esc(p.title)}</b></span>`;
    b.onclick = () => {
      pinned = true;
      show(i);
    };
    pjq.appendChild(b);
  });
  pjs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) {
      pinned = true;
      openDetail("project", b.dataset.open);
    }
  });
  Bus.on("visitor", () => show(cur)); // recruiters swap the live agent for the demo video
  show(0);
}
