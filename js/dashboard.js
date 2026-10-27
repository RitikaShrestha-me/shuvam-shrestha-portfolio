/* "Your visit at a glance": a small dashboard that updates every second from the visit itself. */

function initDashboard() {
  const t0 = Date.now(),
    pts = [],
    sec = ["projects", "work", "about", "experience", "skills", "contact"],
    dw = Object.fromEntries(sec.map((s) => [s, 0])),
    vis = new Set(),
    name = { projects: "Projects", work: "Past work", about: "About", experience: "Experience", skills: "Skills", contact: "Contact" };
  sec.forEach((s) =>
    $("att").insertAdjacentHTML(
      "beforeend",
      `<div class="row"><span>${name[s]}</span><div class="meter"><i id="a_${s}"></i></div><span id="t_${s}">0s</span></div>`,
    ),
  );
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) =>
        e.isIntersecting && (e.intersectionRatio >= 0.4 || e.intersectionRect.height >= innerHeight * 0.4)
          ? vis.add(e.target.id)
          : vis.delete(e.target.id),
      ),
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  sec.forEach((s) => $(s) && io.observe($(s)));
  const zones = [
    ["Kathmandu", "Asia/Kathmandu"],
    ["Bangkok", "Asia/Bangkok"],
    ["Paris", "Europe/Paris"],
  ];
  $("clk").innerHTML = zones
    .map((z) => `<div><span class="l">${z[0]}</span><strong data-z="${z[1]}"></strong></div>`)
    .join("");
  const depth = () => {
    const m = document.documentElement.scrollHeight - innerHeight;
    return m > 0 ? Math.round(Math.min(1, scrollY / m) * 100) : 0;
  };
  function setDepth() {
    const d = depth();
    $("mScroll").textContent = d + "%";
    $("mBar").style.width = d + "%";
  }
  function tick() {
    const s = Math.floor((Date.now() - t0) / 1000);
    $("mTime").textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    setDepth();
    pts.push(depth());
    if (pts.length > 60) pts.shift();
    $("line").setAttribute("points", pts.map((v, i) => `${i * 5},${86 - v * 0.82}`).join(" "));
    vis.forEach((id) => {
      if (id in dw) dw[id]++;
    });
    const mx = Math.max(5, ...Object.values(dw));
    sec.forEach((k) => {
      $("a_" + k).style.width = (dw[k] / mx) * 100 + "%";
      $("t_" + k).textContent = dw[k] + "s";
    });
    document.querySelectorAll("[data-z]").forEach((e) => {
      e.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: e.dataset.z, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    });
  }
  setInterval(tick, 1000);
  tick();
  addEventListener("scroll", setDepth, { passive: true });

  // assistant activity
  let nq = 0,
    qt = 0,
    first = true;
  $("vs").textContent = window.SpeechRecognition || window.webkitSpeechRecognition ? "Mic ready" : "Typing only";
  Bus.on("query", () => {
    qt = performance.now();
    nq++;
    $("mQ").textContent = nq;
  });
  Bus.on("listen", (v) => ($("vs").textContent = v ? "Listening now" : "Mic ready"));
  Bus.on("answer", ({ r, q }) => {
    const ms = Math.round(performance.now() - qt);
    $("mLat").textContent = ms + " ms";
    if (first) {
      $("log").innerHTML = "";
      first = false;
    }
    const li = document.createElement("li");
    li.textContent = q + " → " + (r.target || "answer") + " (" + ms + " ms)";
    $("log").prepend(li);
    while ($("log").children.length > 4) $("log").lastChild.remove();
  });
}
