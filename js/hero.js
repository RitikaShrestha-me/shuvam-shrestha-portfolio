/* Hero: the robot greeter (eyes and head follow the pointer), its speech bubble,
   and one-click questions that open the floating assistant. */

function initHero() {
  const bot = $("bot"),
    head = $("head"),
    body = $("body"),
    pL = $("pL"),
    pR = $("pR"),
    bub = $("bubble");
  let base =
      "Hi, I'm Shuvam's portfolio agent. Ask me anything, or pick a question below.",
    listening = false,
    tm,
    tx = 0,
    ty = 0,
    cx = 0,
    cy = 0;
  bub.textContent = base;

  // the robot follows the pointer
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

  // reacts to the assistant
  Bus.on("welcome", (t) => {
    base = t;
    if (!listening) bub.textContent = t;
  });
  Bus.on("listen", (v) => {
    listening = v;
    bot.classList.toggle("listen", v);
    bub.textContent = v ? "I'm listening…" : base;
  });
  Bus.on("answer", ({ r }) => {
    bot.classList.add("talk");
    bub.textContent = "Answer is in the assistant panel.";
    clearTimeout(tm);
    tm = setTimeout(
      () => {
        bot.classList.remove("talk");
        bub.textContent = base;
      },
      Math.min(6000, 800 + r.text.length * 45),
    );
  });

  // one-click questions
  [
    "Who are you?",
    "Show me your projects",
    "What is your goal?",
    "When are you available?",
  ].forEach((t) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t;
    b.onclick = () => Assistant.ask(t);
    $("heroChips").appendChild(b);
  });
  $("heroMic").onclick = () => Assistant.open({ listen: true });
}
