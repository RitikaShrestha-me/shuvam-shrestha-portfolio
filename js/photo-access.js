/* Private photo collection unlocked by Telegram approval via n8n. */
/** Wires the photo request flow. */
function initPhotoAccess() {
  const st = $("phSt");
  // photo access via Telegram approval
  function show(urls) {
    $("phLock").hidden = true;
    $("phDemo").hidden = true;
    st.textContent = "Access approved.";
    const g = $("gal");
    g.innerHTML = "";
    (urls && urls.length ? urls : Array(6).fill(null)).forEach((u) => {
      let n;
      if (u) {
        n = document.createElement("img");
        n.src = u;
        n.alt = "Professional photo of Shuvam";
        n.loading = "lazy";
      } else n = document.createElement("div");
      g.appendChild(n);
    });
  }
  $("phReq").onclick = async () => {
    const btn = $("phReq");
    btn.disabled = true;
    if (!CONFIG.photoRequestUrl) {
      st.textContent =
        "Demo mode: Telegram is not connected yet. Waiting for approval...";
      $("phDemo").hidden = false;
      return;
    }
    st.textContent = "Sending your request to Shuvam on Telegram...";
    try {
      const r = await fetch(CONFIG.photoRequestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(window.visitor),
      });
      const j = await r.json();
      if (!r.ok || !j.id) throw 0;
      st.textContent = "Waiting for Shuvam to approve on Telegram...";
      const poll = setInterval(async () => {
        try {
          const s = await (
            await fetch(
              CONFIG.photoStatusUrl + "?id=" + encodeURIComponent(j.id),
            )
          ).json();
          if (s.status === "approved") {
            clearInterval(poll);
            show(s.photos);
          } else if (s.status === "denied") {
            clearInterval(poll);
            st.textContent =
              "Access was not granted this time. You can still reach Shuvam from the CV and links tab.";
          }
        } catch (e) {}
      }, 3000);
    } catch (e) {
      st.textContent =
        "Could not reach the approval service. Try again shortly.";
      btn.disabled = false;
    }
  };
  $("phDemo").onclick = () => show(CONFIG.photos);
}
