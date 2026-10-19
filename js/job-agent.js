/* Job Application Agent: parse a posting, match the profile, tailor and export a CV. */
// ---- Job Application Agent ----
const FACTS = `- Name: Shuvam Shrestha
- Dual-degree master's student (DANI): MSc Data Science & Network Intelligence at Télécom SudParis (Sep 2026 to present) and M.S. Information Management, Data Science & AI at the Asian Institute of Technology (Aug 2025 to present)
- MBA in Finance, Purbanchal University, Nepal (2020 to 2024)
- Work: Associate Project Manager at Webpoint Solutions (2024-2025): led delivery of 7 projects, 5 shipped to production, translated business requirements into engineering tasks, ran Agile/Scrum ceremonies. Senior Marketing Officer at Mid-Valley International College (2021-2022): lifted lead conversion by 30%, built 46+ partnerships. Bancassurance Officer at National Life Insurance Company (2018-2019): Rs. 25M semi-annual premium revenue across 10 partner bank branches (84% of targets), 30+ training sessions, 3 bank-insurer MOUs
- Target: AI Product Owner / AI Product Management internship, data analytics internship; available from 1 Feb 2027
- Projects: GLOF early warning system for IoT and digital twins (MQTT, InfluxDB, n8n, Docker, Next.js, C4); BNPL credit risk decision-support dashboards in Tableau; Air Quality Alert System with PM2.5 forecasting and MLOps; Cold Lead Conversion Prediction with scikit-learn; AI Voice Portfolio and Job Application Agent on n8n and Ollama; LLM workflow automation with Ollama, Gemini, Supabase and Google Sheets
- Skills: Agile/Scrum, sprint planning, backlog and requirements translation, stakeholder management, Jira, Trello, Python, SQL, Scikit-learn, machine learning, predictive analytics, time-series forecasting, MLOps, Tableau, Power BI, n8n, Ollama, Docker
- Languages: English (fluent), French (A1), Nepali (native)
- Based in Évry, France`;
const SK = [
  ["product management", "Product management"],
  ["product owner", "Product ownership"],
  ["fintech", "Fintech"],
  ["financial services", "Financial services"],
  ["credit risk", "Credit risk"],
  ["bnpl", "BNPL"],
  ["buy now", "BNPL"],
  ["tableau", "Tableau"],
  ["power bi", "Power BI"],
  ["dashboard", "Dashboards and analytics"],
  ["analytics", "Dashboards and analytics"],
  ["n8n", "n8n automation"],
  ["automation", "Workflow automation"],
  ["ollama", "Local LLMs (Ollama)"],
  ["llm", "LLM applications"],
  ["ai agent", "AI agents"],
  ["machine learning", "Machine learning"],
  ["data science", "Data science and AI"],
  ["python", "Python"],
  ["sql", "SQL"],
  ["scikit", "Scikit-learn"],
  ["mlops", "MLOps"],
  ["forecast", "Time-series forecasting"],
  ["agile", "Agile/Scrum"],
  ["scrum", "Agile/Scrum"],
  ["jira", "Jira"],
  ["stakeholder", "Stakeholder management"],
  ["requirements", "Requirements translation"],
  ["docker", "Docker"],
  ["project management", "Project management"],
  ["marketing", "Marketing"],
  ["insurance", "Insurance and bancassurance"],
  ["iot", "IoT systems"],
  ["mba", "Finance (MBA)"],
];
const GAPS = [
  "java",
  "kubernetes",
  "aws",
  "azure",
  "a/b test",
  "roadmap",
  "figma",
  "pytorch",
  "tensorflow",
  "spark",
];
const PB = [
  [
    "Led end-to-end delivery of 7 projects (5 shipped to production) as Associate Project Manager at Webpoint Solutions, turning business requirements into engineering tasks",
    ["project", "delivery", "agile", "scrum", "requirements", "stakeholder", "product", "jira", "sprint"],
  ],
  [
    "Lifted lead conversion by 30% and built 46+ strategic partnerships as Senior Marketing Officer at Mid-Valley International College",
    ["marketing", "growth", "lead", "conversion", "partnership", "campaign", "acquisition"],
  ],
  [
    "Drove Rs. 25M semi-annual premium revenue across 10 partner bank branches (84% of targets) as Bancassurance Officer at National Life Insurance",
    ["sales", "insurance", "bancassurance", "revenue", "bank", "partner", "financial services", "training"],
  ],
  [
    "BNPL credit risk decision-support dashboards in Tableau, shown as a locally run prototype",
    ["credit", "risk", "bnpl", "lending", "tableau", "dashboard", "analytics", "fintech", "kpi"],
  ],
  [
    "GLOF early warning system: MQTT to InfluxDB, hazard engine and operator-reviewed alerts, documented in C4 diagrams",
    ["iot", "sensor", "architecture", "early warning", "risk", "mqtt", "real-time", "alert"],
  ],
  [
    "Air Quality Alert System: ingestion, PM2.5 forecasting, model training and automated alerting",
    ["forecast", "time-series", "mlops", "pipeline", "python", "data engineering", "alert"],
  ],
  [
    "Cold lead conversion prediction: compared classification models and linked outputs to sales prioritisation",
    ["machine learning", "classification", "scikit", "lead", "sales", "predictive", "go-to-market"],
  ],
  [
    "n8n workflows with local Ollama and Gemini models, from YouTube trend analysis to RSS summaries in Supabase",
    ["n8n", "automation", "workflow", "llm", "ai agent", "integration", "ollama", "gemini", "supabase"],
  ],
  [
    "Job Application Agent that tailors a CV from any job link",
    ["agent", "llm", "automation", "ai"],
  ],
  [
    "AI Voice Portfolio: speech-to-text agent on n8n and Ollama with Telegram approval for private content",
    ["voice", "speech", "genai", "agent", "n8n", "ollama", "product"],
  ],
];
function tailor(text) {
  const t = text.toLowerCase(),
    hit = [...new Set(SK.filter((s) => t.includes(s[0])).map((s) => s[1]))],
    gaps = GAPS.filter((g) => t.includes(g));
  const role = (text.match(
    /(?:job title|position|role)\s*[:\-]\s*([^\n.]{4,60})/i,
  ) || [])[1];
  return {
    headline:
      "AI Product Management candidate" + (role ? " for " + role.trim() : ""),
    summary:
      "Dual-degree master’s student (Télécom SudParis and AIT) with an MBA in Finance and 1.5+ years of cross-functional product delivery across IT project management, marketing and bancassurance, moving into AI product management." +
      (hit.length
        ? " Relevant to this role: " + hit.slice(0, 5).join(", ") + "."
        : ""),
    bullets: PB.map(([b, k]) => [b, k.filter((w) => t.includes(w)).length])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map((x) => x[0]),
    matched: hit,
    gaps,
  };
}
async function claudeTailor(text) {
  const s = window.claude && (await claude.use("sample"));
  if (!s) return null;
  const r = await s.json(
    `You tailor a CV for Shuvam using ONLY the facts below. Never invent employers, years, skills or achievements. If the job asks for something the facts do not cover, list it under gaps.\n\nFACTS:\n${FACTS}\n\nJOB POSTING:\n${text.slice(0, 6000)}\n\nReturn only JSON: {"headline":string,"summary":string (2-3 sentences, first person),"bullets":string[] (4 to 6 items drawn from the facts, most relevant first),"matched":string[],"gaps":string[]}`,
  );
  return r && r.headline ? r : null;
}
async function saveHtml(name, html) {
  try {
    const d = window.claude && (await claude.use("downloads"));
    if (d) {
      await d.save({ filename: name, data: html });
      return;
    }
  } catch (e) {
    if (e && e.code === "declined") return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
function cvHtml(r) {
  return `<!doctype html><meta charset='utf-8'><title>Shuvam Shrestha CV</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#12203a}h1{margin:0}h2{border-bottom:2px solid #e8a317;padding-bottom:4px;margin-top:26px}</style><h1>Shuvam Shrestha</h1><p><b>${esc(r.headline)}</b><br>Évry, France · ${esc(CONFIG.email)} · Available from 1 Feb 2027</p><h2>Summary</h2><p>${esc(r.summary)}</p><h2>Relevant experience and projects</h2><ul>${(r.bullets || []).map((b) => `<li>${esc(b)}</li>`).join("")}</ul><h2>Education</h2><p>MSc Data Science &amp; Network Intelligence, Télécom SudParis, Institut Polytechnique de Paris (Sep 2026 to present)<br>M.S. Information Management, Data Science &amp; AI, Asian Institute of Technology (Aug 2025 to present)<br>MBA in Finance, Purbanchal University (2020 to 2024)</p><h2>Experience</h2><p>Associate Project Manager, Webpoint Solutions (2024-2025)<br>Senior Marketing Officer, Mid-Valley International College (2021-2022)<br>Bancassurance Officer, National Life Insurance Company (2018-2019)</p><h2>Languages</h2><p>English (fluent), French (A1), Nepali (native)</p>`;
}
function showCV(r) {
  $("jOut").innerHTML =
    `<div class='cvout'><small>TAILORED CV</small><h4>${esc(r.headline)}</h4><p>${esc(r.summary)}</p><ul>${(r.bullets || []).map((b) => `<li>${esc(b)}</li>`).join("")}</ul><p><b>Matched:</b> ${esc((r.matched || []).join(", ") || "none found")}</p><p><b>Gaps to address before applying:</b> ${esc((r.gaps || []).join(", ") || "none found")}</p><button class='send go' id='jDl' type='button'>Download tailored CV</button></div>`;
  $("jDl").onclick = () =>
    saveHtml("Shuvam_Shrestha_CV_tailored.html", cvHtml(r));
}
const agentHTML = `<div class='agent'><b class='t'>LIVE AGENT</b><div class='arow'><input id='jUrl' type='text' placeholder='https://company.com/jobs/ai-product-manager' aria-label='Job link'><button class='send go' id='jRun' type='button'>Run agent</button></div><details><summary>Demo mode: paste the job description</summary><textarea id='jTxt' rows='5' placeholder='Paste the job description here' aria-label='Job description'></textarea></details><ol class='steps' id='jSteps'><li>Read job link</li><li>Extract requirements</li><li>Match my profile</li><li>Tailor the CV</li><li>Review and export</li></ol><pre id='jLog'>Waiting for a job link.</pre><div id='jOut'></div></div>`;
let busy = false,
  timer = null;
function wireAgent() {
  const log = $("jLog"),
    steps = [...$("jSteps").children],
    L = (m) => {
      log.textContent += m + "\n";
      log.scrollTop = log.scrollHeight;
    },
    wait = (ms) => new Promise((r) => setTimeout(r, ms));
  $("jRun").onclick = async () => {
    if (busy) return;
    const url = $("jUrl").value.trim(),
      txt = $("jTxt").value.trim();
    if (!url && !txt) {
      log.textContent =
        "Add a job link, or paste the job description in demo mode.";
      return;
    }
    busy = true;
    clearTimeout(timer);
    $("jOut").innerHTML = "";
    log.textContent = "";
    steps.forEach((s) => (s.className = ""));
    const st = (i, m) => {
      steps.forEach(
        (s, k) => (s.className = k < i ? "ok" : k === i ? "on" : ""),
      );
      L("> " + m);
    };
    try {
      st(0, "Reading job link: " + (url || "(pasted description)"));
      await wait(500);
      let res = null;
      if (CONFIG.jobAgentUrl) {
        const r = await fetch(CONFIG.jobAgentUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, text: txt }),
        });
        if (!r.ok) throw new Error("agent returned " + r.status);
        res = await r.json();
        st(3, "Agent workflow finished");
      } else {
        if (!txt) {
          L(
            "! Demo mode cannot open links from this page. Paste the job description to continue, or connect the n8n agent.",
          );
          steps.forEach((s) => (s.className = ""));
          busy = false;
          sched();
          return;
        }
        st(1, "Extracting requirements from " + txt.length + " characters");
        await wait(600);
        st(2, "Matching against my profile");
        await wait(600);
        st(3, "Tailoring the CV");
        try {
          res = await claudeTailor(txt);
        } catch (e) {
          res = null;
        }
        if (res) L("  (tailored with Claude)");
        else {
          res = tailor(txt);
          L("  (used the built-in matcher)");
        }
      }
      st(4, "Preparing the export");
      await wait(400);
      steps.forEach((s) => (s.className = "ok"));
      L("> Done. Review the CV below.");
      showCV(res);
    } catch (e) {
      L("! " + e.message);
    }
    busy = false;
    sched();
  };
}
