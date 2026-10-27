/* Recruiter pack: CV download, social links and tabs. */
/** Wires the CV button, social links and tabs. */
function initCvPack() {
  // CV download
  async function getCV() {
    if (CONFIG.cvUrl) {
      const a = document.createElement("a");
      a.href = CONFIG.cvUrl;
      a.download = "Shuvam_Shrestha_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    const html = `<!doctype html><meta charset='utf-8'><title>Shuvam Shrestha CV</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#12203a}h1{margin:0}h2{border-bottom:2px solid #e8a317;padding-bottom:4px;margin-top:28px}</style><h1>Shuvam Shrestha</h1><p>AI Product Management &amp; Data Analytics internship, available from 1 Feb 2027. ${CONFIG.email}</p><h2>Education</h2><p>MSc Data Science &amp; Network Intelligence, Télécom SudParis, Institut Polytechnique de Paris.<br>M.S. Information Management (Data Science &amp; AI), Asian Institute of Technology.<br>MBA in Finance, Purbanchal University.</p><h2>Experience</h2><p>Associate Project Manager, Webpoint Solutions (2024-2025). Senior Marketing Officer, Mid-Valley International College (2021-2022). Bancassurance Officer, National Life Insurance Company (2018-2019).</p><h2>Projects</h2><ul><li>BNPL credit risk dashboards (Tableau)</li><li>GLOF early warning system (IoT, C4 architecture)</li><li>Air Quality Alert System (PM2.5 forecasting, MLOps)</li><li>Cold Lead Conversion Prediction (scikit-learn)</li><li>LLM workflow automation with n8n, Ollama and Gemini</li></ul><h2>Goal</h2><p>AI Product Owner / AI Product Management internship, growing into an AI Product Owner.</p>`;
    try {
      const d = window.claude && (await claude.use("downloads"));
      if (d) {
        await d.save({ filename: "Shuvam_Shrestha_CV.html", data: html });
        return;
      }
    } catch (e) {
      if (e && e.code === "declined") return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    a.download = "Shuvam_Shrestha_CV.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  $("cvTop").onclick = getCV;
  $("cvBtn").onclick = getCV;
  if ($("cvHero")) $("cvHero").onclick = getCV;
  $("sLi").href = CONFIG.linkedin;
  $("sIg").href = CONFIG.instagram;
  $("sWa").href = CONFIG.whatsapp;
  // tabs
  function tab(k) {
    const cv = k === "cv";
    $("tabCv").hidden = !cv;
    $("tabPh").hidden = cv;
    $("tCv").setAttribute("aria-selected", cv);
    $("tPh").setAttribute("aria-selected", !cv);
  }
  $("tCv").onclick = () => tab("cv");
  $("tPh").onclick = () => tab("ph");
}
