/* Intro cover: guest and recruiter entry, email check, enterPortfolio(). */
/** Wires the cover gate. Sets window.visitor for recruiters. */
function initGate() {
  const cover = $("cover"),
    app = $("app"),
    form = $("recForm"),
    pick = $("pick"),
    err = $("rErr");
  const EMAIL =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  document.body.style.overflow = "hidden";
  function enter(mode, who) {
    cover.hidden = true;
    app.removeAttribute("inert");
    document.body.style.overflow = "";
    scrollTo(0, 0);
    if (mode === "recruiter") {
      window.visitor = who;
      document.body.classList.add("rec");
      window.setWelcome &&
        setWelcome(
          "Welcome, " +
            who.name.split(" ")[0] +
            " from " +
            who.company +
            ". Scroll down and I will introduce Shuvam.",
        );
    }
  }
  $("bGuest").onclick = () => enter("guest");
  window.enterPortfolio = enter;
  $("bRec").onclick = () => {
    pick.hidden = true;
    form.hidden = false;
    $("rName").focus();
  };
  $("rBack").onclick = () => {
    form.hidden = true;
    pick.hidden = false;
    err.textContent = "";
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const name = $("rName").value.trim(),
      company = $("rCo").value.trim(),
      email = $("rMail").value.trim();
    if (!name || !company) {
      err.textContent = "Enter your name and company.";
      return;
    }
    if (!EMAIL.test(email)) {
      err.textContent =
        "Enter a valid email address. Personal addresses such as Gmail are fine.";
      return;
    }
    const b = form.querySelector(".go");
    b.disabled = true;
    err.textContent = "Checking your email...";
    try {
      if (CONFIG.entryUrl) {
        const r = await fetch(CONFIG.entryUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, company, email }),
        });
        const j = await r.json();
        if (!r.ok || !j.ok) throw new Error(j.message || "email not accepted");
      }
      err.textContent = "";
      enter("recruiter", { name, company, email });
    } catch (x) {
      err.textContent =
        "Could not verify your email (" + x.message + "). Try again.";
    }
    b.disabled = false;
  };
}
