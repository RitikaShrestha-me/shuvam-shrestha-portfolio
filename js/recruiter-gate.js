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

    const name = $("rName").value.trim();
    const company = $("rCo").value.trim();
    const email = $("rMail").value.trim();

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
    err.textContent = "Submitting your details...";

    try {
      const response = await fetch(CONFIG.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
          company: company,
          email: email,
        }),
      });

      // With no-cors, the response is opaque:
      // we cannot confirm whether Google Sheets saved the row.
      void response;

      err.textContent = "";
      enter("recruiter", { name, company, email });
    } catch (x) {
      err.textContent =
        "Could not submit your details. Please check your connection and try again.";
    } finally {
      b.disabled = false;
    }
  };
}
