/* About section: a book you read by turning pages. Each page holds one heading and its text. */
/** Wires the page-turn buttons, dots, arrow keys and swipe gestures. */
function initAboutBook() {
  const book = $("book");
  if (!book) return;
  const pages = [...book.querySelectorAll(".bpage")],
    prev = $("bPrev"),
    next = $("bNext"),
    count = $("bCount"),
    dotsEl = $("bDots");
  let cur = 0;

  const dots = pages.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Go to page " + (i + 1));
    b.onclick = () => show(i);
    dotsEl.appendChild(b);
    return b;
  });

  function render() {
    pages.forEach((p, i) => {
      p.classList.toggle("flipped", i < cur); // pages already read are turned over
      p.style.zIndex = pages.length - i; // page 1 on top, like a real stack
      p.toggleAttribute("inert", i !== cur); // only the open page can be focused or read
      p.setAttribute("aria-hidden", i === cur ? "false" : "true");
    });
    dots.forEach((d, i) => d.setAttribute("aria-current", i === cur ? "true" : "false"));
    prev.disabled = cur === 0;
    next.disabled = cur === pages.length - 1;
    count.textContent = "Page " + (cur + 1) + " of " + pages.length;
  }

  function show(n) {
    n = Math.max(0, Math.min(pages.length - 1, n));
    if (n === cur) return;
    cur = n;
    render();
  }

  prev.onclick = () => show(cur - 1);
  next.onclick = () => show(cur + 1);

  // arrow keys while the book (or its buttons) has focus
  [book, prev, next].forEach((el) =>
    el.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        show(cur + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        show(cur - 1);
      }
    }),
  );

  // swipe: left turns forward, right turns back
  let sx = 0,
    sy = 0;
  book.addEventListener("touchstart", (e) => {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });
  book.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0],
      dx = t.clientX - sx,
      dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });

  render();
}
