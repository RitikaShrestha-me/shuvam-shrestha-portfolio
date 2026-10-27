/* Voice and text assistant: speech recognition, local knowledge base, optional n8n webhook. */
/** Wires the assistant console (inside the floating dock): speech, answers, navigation. */
function initVoiceAgent() {
  const KB = [
    {
      k: "who name about yourself introduce Shuvam shuvam hello hi",
      t: "#about",
      a: "I'm Shuvam Shrestha, a dual-degree master's student moving from IT project management, marketing and bancassurance into AI product management. I'm open to internships from 1 February 2027.",
    },
    {
      k: "education study degree university school ait telecom sudparis dani master masters mba purbanchal",
      t: "#experience",
      a: "I'm in the DANI dual-degree programme: an MSc in Data Science and Network Intelligence at Télécom SudParis since September 2026, and an M.S. in Information Management, Data Science and AI at the Asian Institute of Technology since August 2025. I also hold an MBA in Finance from Purbanchal University in Nepal.",
    },
    {
      k: "goal target career future role want job hire hiring position product manager owner internship intern",
      t: "#about",
      a: "I'm looking for an AI Product Owner or AI Product Management internship, with data analytics as a close second. The long-term goal is to become an AI Product Owner.",
    },
    {
      k: "available availability start when begin february 2027 internship intern",
      t: "#contact",
      a: "I'm available from 1 February 2027 for an internship.",
    },
    {
      k: "background experience work history career past employer employers company companies jobs",
      t: "#experience",
      a: "I've been an Associate Project Manager at Webpoint Solutions, a Senior Marketing Officer at Mid-Valley International College, and a Bancassurance Officer at National Life Insurance Company. That's about a year and a half of cross-functional product delivery.",
    },
    {
      k: "webpoint project manager management agile scrum sprint delivery jira trello",
      t: "#experience",
      a: "At Webpoint Solutions I led end-to-end delivery of 7 projects, 5 of which shipped to production, and I was the main link between business and technical stakeholders, running Agile and Scrum ceremonies.",
    },
    {
      k: "mid-valley midvalley marketing lead conversion admission partnerships college",
      t: "#experience",
      a: "At Mid-Valley International College I lifted lead conversion by 30 percent through digital admission campaigns and built over 46 strategic partnerships.",
    },
    {
      k: "bancassurance insurance national life premium bank banks sales",
      t: "#experience",
      a: "As a Bancassurance Officer at National Life Insurance Company I drove 25 million rupees of semi-annual premium revenue across 10 partner bank branches, ran over 30 training sessions and facilitated 3 bank-insurer MOUs.",
    },
    {
      k: "job application agent cv resume apply automate tailor",
      t: "#projects",
      route: "#/project/job-agent",
      a: "My Job Application Agent takes a job link, matches it to my profile and returns a tailored CV. You can try it live in the projects section.",
    },
    {
      k: "journey map globe travel path route countries satellite satellites world",
      t: "#journey",
      a: "Here is my educational journey on the globe: Nepal, then Thailand at the Asian Institute of Technology, then France at Télécom SudParis.",
    },
    {
      k: "projects project portfolio built work show examples",
      t: "#projects",
      a: "I've built a BNPL credit risk dashboard in Tableau, an IoT glacial flood early warning system, an air quality alert pipeline, a cold lead conversion model, LLM workflow automations in n8n, this voice portfolio and a Job Application Agent. Ask about any of them.",
    },
    {
      k: "bnpl credit risk tableau dashboard lending",
      t: "#projects",
      route: "#/project/bnpl-dashboard",
      a: "The BNPL project is a set of interactive Tableau dashboards for a buy-now-pay-later credit risk decision-support platform, shown as a locally run prototype.",
    },
    {
      k: "glof glacial flood iot himalayan lake early warning digital twin mqtt influxdb",
      t: "#projects",
      route: "#/project/glof-early-warning",
      a: "It's a group project at Télécom SudParis: an early warning system for glacial lake outburst floods. Sensor data goes through MQTT into InfluxDB, a hazard engine scores the risk, and operators review alerts before the ministry is notified on Telegram. I documented it in C4 diagrams and built a real-time Next.js dashboard.",
    },
    {
      k: "air quality pm2.5 pm25 forecasting mlops alert pollution",
      t: "#projects",
      route: "#/project/air-quality-alerts",
      a: "The Air Quality Alert System is an end-to-end pipeline: data ingestion, PM2.5 forecasting, model training and automated alerting.",
    },
    {
      k: "cold lead conversion prediction classification scikit machine learning sales",
      t: "#projects",
      route: "#/work/cold-lead-conversion",
      a: "I built and compared classification models to predict lead conversion, and linked the outputs to sales prioritisation and go-to-market decisions.",
    },
    {
      k: "n8n automation workflow pipeline ollama gemini supabase llm youtube rss",
      t: "#projects",
      route: "#/project/llm-workflow-automation",
      a: "I build n8n workflows with local Ollama and Gemini models: YouTube trend analysis into Google Sheets, and RSS feeds summarised by AI into Supabase. This voice agent is designed to plug into one: your speech becomes text, n8n passes it to an Ollama model, and the answer comes back here.",
    },
    {
      k: "voice portfolio website speech agent site",
      t: "#projects",
      route: "#/work/ai-voice-portfolio",
      a: "This portfolio is itself a project: recruiters talk to a speech-to-text agent backed by n8n and a local Ollama model, with separate guest and recruiter flows and Telegram approval for private content.",
    },
    {
      k: "skills skill strengths tools tech stack good python sql power",
      t: "#skills",
      a: "I combine product delivery with Agile and Scrum, data and AI work in Python and SQL with Tableau and Power BI, automation with n8n, Ollama and Docker, and finance knowledge from my MBA.",
    },
    {
      k: "contact email reach linkedin github connect message talk whatsapp qr scan chat",
      t: "#contact",
      a: "You can reach me from the contact section, on LinkedIn, or by scanning the  QR code there to chat with me directly. I'm scrolling you there now.",
    },
    {
      k: "nepal thailand france country location where from based live evry paris",
      t: "#about",
      a: "I'm based in Évry, France, studying across France and Thailand, and I stay connected to Nepal, where I'm from.",
    },
    {
      k: "language languages speak english french nepali",
      t: "#skills",
      a: "I speak English fluently, Nepali as my native language, and I'm at A1 level in French.",
    },
    {
      k: "iot ranger netpie aws monitoring device management platform fastapi sveltekit emqx mqtt telemetry",
      t: "#work",
      route: "#/work/iot-ranger",
      a: "IoT Ranger is a team project from my first year at AIT: an IoT monitoring and device management platform inspired by NETPIE and AWS IoT. I was responsible for the backend, connected it with the frontend and other parts, worked on Firebase and helped shape the architecture.",
    },
    {
      k: "past work previous earlier archive explore more freelance company roles history list everything",
      t: "#work",
      a: "The Past work section lists my company roles and my academic and personal projects in one place. You can filter it, and every entry opens its own detail page.",
    },
  ];
  const NAV = {
    work: "#work",
    journey: "#journey",
    about: "#about",
    experience: "#experience",
    projects: "#projects",
    skills: "#skills",
    contact: "#contact",
  };
  const stop = new Set(
    "the a an is are of to me my you your do does what who how can tell about show please i it in on and for with".split(
      " ",
    ),
  );
  function localAgent(q) {
    const w = q
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((x) => x && !stop.has(x));
    let best = null,
      score = 0;
    for (const e of KB) {
      const ks = e.k.split(" ");
      let s = 0;
      w.forEach((x) => {
        if (ks.includes(x)) s += 2;
        else if (x.length > 3 && ks.some((k) => k.startsWith(x.slice(0, 4))))
          s += 1;
      });
      if (s > score) {
        score = s;
        best = e;
      }
    }
    if (/^(go to|scroll to|open|take me to|show)\s/.test(q.toLowerCase())) {
      for (const n in NAV) {
        if (q.toLowerCase().includes(n))
          return {
            action: "navigate",
            target: NAV[n],
            text: "Taking you to " + n + ".",
          };
      }
    }
    if (
      best &&
      best.route &&
      /\b(details?|page|read|case study|more about|in depth|full)\b/i.test(q)
    )
      return {
        action: "navigate",
        target: best.route,
        text: best.a + " Opening its page.",
      };
    if (best) return { action: "navigate", target: best.t, text: best.a };
    return {
      action: "answer",
      text: "I can talk about Shuvam's education, goal, work experience, projects, skills and contact details. Try asking about one of those.",
    };
  }
  async function ask(q) {
    if (CONFIG.n8nUrl) {
      try {
        const r = await fetch(CONFIG.n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: q }),
        });
        if (r.ok) {
          $("status").textContent = "n8n + Ollama";
          return await r.json();
        }
      } catch (e) {}
      $("status").textContent = "Local agent (n8n unreachable)";
    }
    return localAgent(q);
  }
  function say(t) {
    if (!$("speak").checked || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US";
    speechSynthesis.speak(u);
  }
  async function handle(q) {
    Bus.emit("query", q);
    $("said").textContent = "“" + q + "”";
    $("reply").textContent = "Thinking…";
    const r = await ask(q);
    Bus.emit("answer", { r, q });
    $("reply").textContent = r.text;
    say(r.text);
    if (r.action === "navigate" && r.target) {
      if (r.target.startsWith("#/")) {
        openRoute(r.target); // a project or past-work page
        return;
      }
      const el = document.querySelector(r.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        el.classList.remove("hit");
        void el.offsetWidth;
        el.classList.add("hit");
      }
    }
  }
  Assistant.handle = handle;
  [
    "Who are you?",
    "Show me your projects",
    "What is your goal?",
    "How do I contact you?",
  ].forEach((t) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t;
    b.onclick = () => handle(t);
    $("chips").appendChild(b);
  });
  $("form").onsubmit = (e) => {
    e.preventDefault();
    const v = $("typed").value.trim();
    if (v) {
      handle(v);
      $("typed").value = "";
    }
  };
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec,
    on = false;
  if (!SR) {
    $("mic").disabled = true;
    $("said").textContent =
      "Voice input isn't supported in this browser. Use Chrome, Edge or Safari, or type below.";
  } else {
    rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    const set = (v) => {
      on = v;
      Bus.emit("listen", v);
      $("mic").setAttribute("aria-pressed", v);
      $("micRow").classList.toggle("live", v);
      $("mic").setAttribute(
        "aria-label",
        v ? "Stop listening" : "Start listening",
      );
    };
    let final = "";
    rec.onstart = () => {
      set(true);
      final = "";
      $("said").textContent = "Listening…";
    };
    rec.onresult = (e) => {
      let t = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        t += e.results[i][0].transcript;
        if (e.results[i].isFinal) final = t;
      }
      $("said").textContent = "“" + t + "”";
    };
    rec.onend = () => {
      set(false);
      if (final) handle(final);
    };
    rec.onerror = (e) => {
      set(false);
      $("said").textContent =
        e.error === "not-allowed"
          ? "Microphone blocked. Allow mic access in your browser, or type below."
          : e.error === "no-speech"
            ? "I didn't hear anything. Tap the mic and try again."
            : "Voice error (" + e.error + "). You can type instead.";
    };
    $("mic").onclick = () => {
      if (on) {
        rec.stop();
      } else {
        speechSynthesis && speechSynthesis.cancel();
        try {
          rec.start();
        } catch (_) {}
      }
    };
  }
}
