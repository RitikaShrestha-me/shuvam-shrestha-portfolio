/* Floating assistant: a launcher in the bottom-right corner that opens the voice and text console
   from anywhere on the page. The console itself (mic, answers, chips) is wired in voice-agent.js. */

const Assistant = {
  handle: () => {}, // set by voice-agent.js
  open() {},
  close() {},
  isOpen: () => false,
  ask(q) {
    this.open();
    this.handle(q);
  },
};

function initAssistantDock() {
  const dock = $("dock"),
    btn = $("dockBtn"),
    panel = $("dockPanel");
  function open(o = {}) {
    panel.hidden = false;
    dock.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    if (o.listen && !$("mic").disabled && $("mic").getAttribute("aria-pressed") !== "true") $("mic").click();
    else if (!o.silent) setTimeout(() => $("typed").focus({ preventScroll: true }), 40);
  }
  function close() {
    if (panel.hidden) return;
    panel.hidden = true;
    dock.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    if (document.activeElement && panel.contains(document.activeElement)) btn.focus({ preventScroll: true });
  }
  Assistant.open = open;
  Assistant.close = close;
  Assistant.isOpen = () => !panel.hidden;
  btn.onclick = () => (panel.hidden ? open() : close());
  $("dockClose").onclick = close;
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      e.stopPropagation();
      close();
    }
  });
}
