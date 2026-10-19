/* Experience: roles hang from a rope. Scrolling swings the next role in, one at a time. */
/** Pins the rope stage and picks the active role from scroll progress. */
function initRopeExperience() {
  const track = $("ropeTrack");
  if (!track) return;
  const stage = $("ropeStage"),
    cards = [...track.querySelectorAll(".rcard")],
    dotsEl = $("rDots"),
    hint = $("rHint"),
    n = cards.length;
  track.style.setProperty("--n", n);
  track.classList.add("rope-on"); // without this class the roles stay a plain list
  let cur = -1,
    queued = false;

  const dots = cards.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Show role " + (i + 1));
    b.onclick = () => goTo(i);
    dotsEl.appendChild(b);
    return b;
  });

  const span = () => track.offsetHeight - innerHeight;
  function active() {
    const d = span(),
      p = d > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / d)) : 0;
    return Math.min(n - 1, Math.floor(p * n));
  }
  function paint(i) {
    if (i === cur) return;
    cur = i;
    cards.forEach((c, k) => {
      c.classList.toggle("on", k === i);
      c.toggleAttribute("inert", k !== i);
      c.setAttribute("aria-hidden", k === i ? "false" : "true");
    });
    dots.forEach((d, k) => d.setAttribute("aria-current", k === i ? "true" : "false"));
    hint.textContent = i === n - 1 ? "Keep scrolling for education" : "Scroll to swing in the next role";
  }
  function goTo(i) {
    const top = track.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + span() * ((i + 0.5) / n), behavior: rm ? "auto" : "smooth" });
  }
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      paint(active());
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  // the swing replays each time the stage comes into view
  new IntersectionObserver(
    (es) => es.forEach((e) => stage.classList.toggle("live", e.isIntersecting && e.intersectionRatio > 0.5)),
    { threshold: [0, 0.5, 1] },
  ).observe(stage);

  paint(active());
}
