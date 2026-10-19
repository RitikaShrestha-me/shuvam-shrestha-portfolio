/* Hero robot (follows the pointer), scroll-driven headline reveal, live session dashboard. */
/** Wires the robot, hero reveal and live dashboard. */
function initHeroAndDashboard() {
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches,
    sticky = matchMedia("(min-width:821px) and (min-height:700px)");
  const bot = $("bot"),
    head = $("head"),
    body = $("body"),
    pL = $("pL"),
    pR = $("pR"),
    bub = $("bubble"),
    wrap = $("heroWrap");
  const ws = [...document.querySelectorAll(".w")],
    rv = [...document.querySelectorAll(".rv")];
  const cl = (v) => Math.max(0, Math.min(1, v));
  // robot follows the pointer
  let tx = 0,
    ty = 0,
    cx = 0,
    cy = 0,
    listening = false;
  addEventListener("pointermove", (e) => {
    const r = bot.getBoundingClientRect();
    tx = Math.max(
      -1,
      Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)),
    );
    ty = Math.max(
      -1,
      Math.min(1, (e.clientY - (r.top + r.height * 0.4)) / (innerHeight / 2)),
    );
  });
  (function f() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    head.style.transform = `translate(${cx * 5}px,${cy * 3}px) rotate(${cx * 9}deg)`;
    body.style.transform = `translate(${cx * 2}px,0)`;
    pL.setAttribute("transform", `translate(${cx * 5} ${cy * 4})`);
    pR.setAttribute("transform", `translate(${cx * 5} ${cy * 4})`);
    requestAnimationFrame(f);
  })();
  // scroll-driven hero reveal
  const msgs = [
    [
      0,
      "Hi, I'm Shuvam's portfolio agent. Scroll down and I'll introduce him.",
    ],
    [0.35, "Shuvam is moving from finance into AI product management."],
    [0.75, "Now tap the mic and ask me anything."],
  ];
  let last = "";
  function hero() {
    let p = 1;
    if (sticky.matches && !rm) {
      p = cl(
        -wrap.getBoundingClientRect().top / (wrap.offsetHeight - innerHeight),
      );
    }
    ws.forEach((w, i) => {
      const t = cl((p - i * 0.07) / 0.1);
      w.style.opacity = t;
      w.style.transform = `translateY(${(1 - t) * 28}px)`;
    });
    rv.forEach((e, i) => {
      const t = cl((p - 0.5 - i * 0.15) / 0.15);
      e.style.opacity = t;
      e.style.transform = `translateY(${(1 - t) * 20}px)`;
    });
    if (!listening) {
      const m = msgs.filter((x) => p >= x[0]).pop()[1];
      if (m !== last) {
        last = m;
        bub.textContent = m;
      }
    }
  }
  // live dashboard
  const t0 = Date.now(),
    pts = [],
    sec = ["about", "experience", "projects", "skills", "contact"],
    dw = { about: 0, experience: 0, projects: 0, skills: 0, contact: 0 },
    vis = new Set();
  sec.forEach((s) =>
    $("att").insertAdjacentHTML(
      "beforeend",
      `<div class="row"><span>${s[0].toUpperCase() + s.slice(1)}</span><div class="meter"><i id="a_${s}"></i></div><span id="t_${s}">0s</span></div>`,
    ),
  );
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) =>
        e.isIntersecting &&
        (e.intersectionRatio >= 0.4 ||
          e.intersectionRect.height >= innerHeight * 0.4)
          ? vis.add(e.target.id)
          : vis.delete(e.target.id),
      ),
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  sec.forEach((s) => io.observe($(s)));
  const zones = [
    ["Kathmandu", "Asia/Kathmandu"],
    ["Bangkok", "Asia/Bangkok"],
    ["Paris", "Europe/Paris"],
  ];
  $("clk").innerHTML = zones
    .map(
      (z) =>
        `<div><span class="l">${z[0]}</span><strong data-z="${z[1]}"></strong></div>`,
    )
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
    $("mTime").textContent =
      Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    setDepth();
    pts.push(depth());
    if (pts.length > 60) pts.shift();
    $("line").setAttribute(
      "points",
      pts.map((v, i) => `${i * 5},${86 - v * 0.82}`).join(" "),
    );
    vis.forEach((id) => {
      if (id in dw) dw[id]++;
    });
    const mx = Math.max(5, ...Object.values(dw));
    sec.forEach((k) => {
      $("a_" + k).style.width = (dw[k] / mx) * 100 + "%";
      $("t_" + k).textContent = dw[k] + "s";
    });
    document
      .querySelectorAll("[data-z]")
      .forEach(
        (e) =>
          (e.textContent = new Date().toLocaleTimeString("en-GB", {
            timeZone: e.dataset.z,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })),
      );
  }
  setInterval(tick, 1000);
  tick();
  addEventListener(
    "scroll",
    () => {
      hero();
      setDepth();
    },
    { passive: true },
  );
  addEventListener("resize", hero);
  hero();
  // agent hooks
  let nq = 0,
    qt = 0,
    tm,
    first = true;
  $("vs").textContent =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? "Mic ready"
      : "Typing only";
  window.setWelcome = (t) => {
    msgs[0][1] = t;
    last = "";
    hero();
  };
  window.onQuery = () => {
    qt = performance.now();
    nq++;
    $("mQ").textContent = nq;
  };
  window.botState = (v) => {
    listening = v;
    bot.classList.toggle("listen", v);
    $("vs").textContent = v ? "Listening now" : "Mic ready";
    if (v) bub.textContent = "I'm listening…";
  };
  window.onAnswer = (r, q) => {
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
    bot.classList.add("talk");
    bub.textContent = "Answering — see the panel on the right.";
    clearTimeout(tm);
    tm = setTimeout(
      () => {
        bot.classList.remove("talk");
        last = "";
        hero();
      },
      Math.min(6000, 800 + r.text.length * 45),
    );
  };
}
