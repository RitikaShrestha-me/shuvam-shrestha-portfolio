/*
  PROJECTS ON WATCH: one object per project. Edit this file to change the showcase,
  the story previews in the intro AND each project's detail page.

  Required: id (letters, digits, dashes), title, summary. Everything else is optional:
  empty or missing fields are simply not shown.

    tag                      short label shown above the title
    kind                     'academic' | 'personal' | 'freelance' | 'company'  (Past work filters)
    org, period              e.g. 'Télécom SudParis', '2026'
    summary                  one short paragraph for the showcase card
    nodes[]                  3-5 steps of the flow animation (also Figure 1 on the detail page)
    stack[]                  tools and technologies
    video                    demo video for recruiters: YouTube link, Google Drive link or .mp4 path
    agent                    true = guests can try the live Job Application Agent here
    themes[], story{}        used by the intro's "What are you curious about?" cards
    detail{}                 the project page:
        subtitle, type, status, role, team, affiliation, abstractLabel
        abstract             the summary paragraph at the top
        keywords[]
        figureCaption        caption under Figure 1 (the flow of `nodes`)
        sections[]           { title, body:[paragraphs], bullets:[...] } in the order you want
        links[]              OPTIONAL { label, url, note }: shown as "Further reading and resources"
        cite                 OPTIONAL { year, venue }: adds a "Cite this work" box
*/
const PROJECTS = [
  // {
  //   id: "job-agent",
  //   title: "Job Application Agent",
  //   tag: "NEW · AI AGENT",
  //   kind: "personal",
  //   summary:
  //     "Give it a job link and it reads the posting, matches it against the profile and returns a CV tailored to the role, ready to apply with.",
  //   nodes: [
  //     "Job link",
  //     "Parse posting",
  //     "Match profile",
  //     "Tailor CV",
  //     "Export",
  //   ],
  //   stack: ["n8n", "Ollama", "LLM agent", "Automation"],
  //   agent: true,
  //   video: "", // add a demo video link here, e.g. "https://www.youtube.com/watch?v=..."
  //   themes: ["ai", "product"],
  //   story: {
  //     prob: "Tailoring a CV for every job posting by hand takes time.",
  //     how: "An agent reads the posting, matches it against my profile and drafts a tailored CV.",
  //     status: "Live demo in the portfolio",
  //   },
  //   detail: {
  //     subtitle: "An AI agent that turns a job link into a tailored CV",
  //     type: "Personal project · AI agent",
  //     status: "Working demo",
  //     abstract:
  //       "Applying for roles means re-reading every posting and reshaping the CV to fit it. This agent takes a job link, extracts the requirements, matches them against my profile and returns a CV tailored to the role, together with the skills it matched and the gaps to address before applying.",
  //     keywords: [
  //       "AI agent",
  //       "n8n",
  //       "Ollama",
  //       "LLM",
  //       "Automation",
  //       "CV tailoring",
  //     ],
  //     figureCaption:
  //       "From job link to tailored CV: the five steps the agent follows.",
  //     sections: [
  //       {
  //         title: "Motivation",
  //         body: [
  //           "Tailoring a CV for each posting by hand is slow and repetitive, and it is easy to miss what a role really asks for.",
  //           "The aim is to automate the loop up to the point where a person decides: the agent prepares, the person applies.",
  //         ],
  //       },
  //       {
  //         title: "Approach",
  //         bullets: [
  //           "Read the job link, or a pasted job description.",
  //           "Extract the requirements of the role.",
  //           "Match them against the facts in my profile.",
  //           "Tailor the CV: a role-specific headline and summary, with the most relevant projects first.",
  //           "Review the matched skills and the gaps, then export the CV.",
  //         ],
  //       },
  //       {
  //         title: "Design decisions",
  //         bullets: [
  //           "The tailoring only uses facts from my profile, so it never invents experience.",
  //           "Gaps are reported instead of hidden, so I know what to address before applying.",
  //           "Without the n8n connection, the page works from a pasted job description with a built-in keyword matcher.",
  //         ],
  //       },
  //       {
  //         title: "Limitations and next steps",
  //         bullets: [
  //           "Opening a job link needs the n8n connection; in demo mode the description is pasted.",
  //           "The built-in matcher is simple keyword matching, so it is less nuanced than the language model.",
  //         ],
  //       },
  //     ],
  //     links: [
  //       // OPTIONAL: add resources for readers who want to know more, for example:
  //       // { label: "Source code", url: "https://github.com/...", note: "Repository" },
  //     ],
  //   },
  // },
  {
    id: "glof-early-warning",
    title: "GLOF early warning system",
    tag: "IOT · DIGITAL TWINS",
    kind: "academic",
    org: "Télécom SudParis",
    summary:
      "A group project at Télécom SudParis: an early-warning system for glacial lake outburst floods in Himalayan lakes. Sensor data flows through MQTT into InfluxDB, a hazard engine scores the risk, and operators review each alert before the ministry is notified on Telegram. Built to survive sensor disruption and documented in C4 diagrams revised after professor feedback.",
    nodes: [
      "Lake sensors",
      "MQTT + InfluxDB",
      "Hazard engine",
      "Operator review",
      "Telegram alert",
    ],
    stack: [
      "MQTT",
      "InfluxDB",
      "Eclipse Mosquitto",
      "n8n",
      "Docker",
      "Next.js",
      "C4",
    ],
    video:
      "https://drive.google.com/file/d/1lwzqLHtnU2FKISg2zGB-vkR5Q1Kf7w6r/preview",
    themes: ["data"],
    story: {
      prob: "Glacial lake outburst floods in the Himalaya need early warning.",
      how: "MQTT and InfluxDB feed a hazard engine, with operator review before alerts, documented in C4.",
      status: "Group project, Télécom SudParis",
    },
    detail: {
      subtitle:
        "Early warning for glacial lake outburst floods, with a human in the loop",
      type: "Group project · IoT and digital twins",
      status: "Course project",
      affiliation: "Télécom SudParis, Institut Polytechnique de Paris",
      team: "Group project",
      abstract:
        "This group project designs an early-warning system for glacial lake outburst floods (GLOF) in Himalayan lakes. Sensor data flows through MQTT into InfluxDB, a hazard engine scores the risk, and human operators review each alert before the ministry is notified on Telegram. The system is designed to keep working when sensor data is disrupted.",
      keywords: [
        "IoT",
        "Digital twins",
        "MQTT",
        "InfluxDB",
        "n8n",
        "C4 model",
        "Early warning",
      ],
      figureCaption: "Data path from lake sensors to the ministry alert.",
      sections: [
        {
          title: "Problem",
          body: [
            "Glacial lakes in the Himalaya can release sudden floods downstream. An early warning depends on trustworthy sensor data and on a fast, accountable decision to alert.",
          ],
        },
        {
          title: "Approach",
          bullets: [
            "Lake sensors publish telemetry over MQTT.",
            "Telemetry is stored as time series in InfluxDB.",
            "A hazard engine scores the risk from the incoming data.",
            "Operators review each alert before it goes out.",
            "The ministry is notified on Telegram.",
          ],
        },
        {
          title: "Resilience to sensor disruption",
          bullets: [
            "A queue policy after MQTT protects the data flow when sensors drop out.",
            "A sensor watchdog notices when a sensor's heartbeat goes silent.",
            "Human operators validate the data flow and can respond immediately.",
          ],
        },
        {
          title: "Implementation",
          body: [
            "The flow runs as n8n workflows: telemetry ingestion from MQTT into InfluxDB, scheduled sensor simulators, and a main pipeline with a sensor watchdog, validator, hazard engine, risk analysis, alert orchestration, human review and ministry notification. Eclipse Mosquitto, InfluxDB and n8n run in Docker.",
          ],
        },
        {
          title: "Documentation",
          body: [
            "The architecture is documented with C4 container diagrams. After professor feedback the diagram was revised to show the queue policy after MQTT, the processing components, operator validation and the detailed backend logic from ingestion to alerts.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "bnpl-dashboard",
    title: "BNPL credit risk dashboard",
    tag: "BUSINESS INTELLIGENCE · ANALYTICS",
    kind: "academic",
    org: "Asian Institute of Technology",
    summary:
      "Interactive Tableau dashboards for a buy-now-pay-later credit risk decision-support platform, built to surface key business metrics and actionable insights, and demonstrated as a locally run prototype.",
    nodes: ["Data", "Risk metrics", "Dashboards", "Decision support"],
    stack: ["Tableau", "Dashboard design", "KPI analysis", "Credit risk"],
    // recruiter demo video (Google Drive preview link)
    video: "",
    themes: ["data"],
    story: {
      prob: "Buy-now-pay-later credit risk needs to be visible at a glance.",
      how: "Interactive Tableau dashboards that support credit decisions, shown as a local prototype.",
      status: "Prototype built",
    },
    detail: {
      subtitle: "Dashboards that make credit risk visible for decision makers",
      type: "Course project · Business intelligence · Analytics",
      status: "Prototype built",
      affiliation: "Asian Institute of Technology",
      abstract:
        "Interactive Tableau dashboards for a buy-now-pay-later (BNPL) credit risk decision-support platform. The dashboards surface key business metrics and actionable insights, and are demonstrated as a locally run prototype.",
      keywords: [
        "BNPL",
        "Credit risk",
        "Tableau",
        "KPI analysis",
        "Decision support",
      ],
      figureCaption: "From data to decision support.",
      sections: [
        {
          title: "Problem",
          body: [
            "Buy-now-pay-later lending needs credit risk to be visible at a glance, so that decisions about approvals and exposure rest on clear metrics.",
          ],
        },
        {
          title: "Approach",
          bullets: [
            "Define the key credit risk metrics and KPIs a decision maker needs.",
            "Design interactive dashboards that surface those metrics and the insights behind them.",
            "Demonstrate the platform as a locally run prototype.",
          ],
        },
        {
          title: "Perspective",
          body: [
            "The framing draws on credit risk and financial analysis from my MBA in Finance.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "air-quality-alerts",
    title: "Air Quality Alert System",
    tag: "DATA ENGINEERING · MLOPS",
    kind: "academic",
    org: "Asian Institute of Technology",
    summary:
      "An end-to-end pipeline covering data ingestion, PM2.5 forecasting, model training and automated alerting.",
    nodes: ["Ingest data", "Forecast PM2.5", "Train model", "Send alert"],
    stack: ["Python", "MLOps", "Time-series forecasting"],
    video: "https://www.youtube.com/embed/bKIyRBS0cFE",
    themes: ["data"],
    story: {
      prob: "Poor air quality needs to be flagged before it hurts.",
      how: "A pipeline ingests data, forecasts PM2.5, retrains the model and sends alerts.",
      status: "Pipeline built",
    },
    detail: {
      subtitle:
        "From raw measurements to a PM2.5 forecast and an automated alert",
      type: "Course project · Data engineering and MLOps",
      status: "Pipeline built",
      affiliation: "Asian Institute of Technology",
      abstract:
        "An end-to-end pipeline covering data ingestion, PM2.5 forecasting, model training and automated alerting.",
      keywords: [
        "PM2.5",
        "Time-series forecasting",
        "MLOps",
        "Python",
        "Alerting",
      ],
      figureCaption: "The four stages of the pipeline.",
      sections: [
        {
          title: "Approach",
          bullets: [
            "Ingest air quality data.",
            "Forecast PM2.5 with a time-series model.",
            "Train and retrain the model as new data arrives.",
            "Send an automated alert when the forecast crosses a threshold.",
          ],
        },
      ],
      links: [],
    },
  },

  {
    id: "llm-workflow-automation",
    title: "YouTube Trend Analysis Agent",
    tag: "AUTOMATION",
    kind: "personal",
    summary:
      "Automated YouTube trend analysis using n8n and Gemini, with structured data stored in Google Sheets and visualized through a custom Next.js dashboard.",
    nodes: [
      "Trigger",
      "Fetch YouTube Data",
      "Gemini LLM",
      "Google Sheets",
      "Dashboard",
    ],
    stack: ["n8n", "Google Gemini", "Google Sheets", "Next.js"],
    video: "",
    themes: ["ai", "automation", "data-visualization"],
    story: {
      prob: "Manually collecting and analyzing YouTube trends makes it difficult to monitor content opportunities efficiently.",
      how: "An automated n8n workflow fetches YouTube data, uses Gemini to analyze trends and generate structured insights, and stores the results in Google Sheets for visualization in a custom Next.js dashboard.",
      status: "Workflow and dashboard built",
    },
    detail: {
      subtitle:
        "From automated YouTube data extraction to AI-powered insights and interactive visualization",
      type: "Personal project · AI automation & data visualization",
      status: "Workflow and dashboard built",
      abstract:
        "Built an end-to-end YouTube trend analysis pipeline using n8n and Google Gemini. The workflow runs on a schedule, fetches YouTube data, processes individual records, and uses Gemini with structured-output parsing to generate consistent analytical insights. Results are appended to Google Sheets, which connects to a locally hosted Next.js dashboard for interactive data visualization.",
      keywords: [
        "n8n",
        "Google Gemini",
        "YouTube Data API",
        "Google Sheets",
        "Next.js",
        "AI automation",
        "Structured output",
        "Data visualization",
      ],
      figureCaption:
        "Automated workflow connecting YouTube data extraction, Gemini analysis, Google Sheets, and a Next.js dashboard.",
      sections: [
        {
          title: "End-to-end workflow",
          bullets: [
            "Schedule Trigger: Automatically initiates the workflow.",
            "YouTube Data Extraction: Fetches YouTube data through an API request.",
            "Data Processing: Splits the results into individual records and prepares the fields for analysis.",
            "AI-Powered Analysis: Gemini analyzes the data and returns structured outputs through an output parser.",
            "Data Storage: Appends the analyzed results to Google Sheets.",
            "Interactive Dashboard: A locally hosted Next.js frontend connects to the spreadsheet data and visualizes YouTube trends.",
          ],
        },
        {
          title: "What I learned",
          body: [
            "Designed an end-to-end pipeline that connects API-based data collection, LLM-powered analysis, structured output parsing, spreadsheet storage, and frontend visualization.",
            "Built a custom Next.js dashboard to turn spreadsheet data into an interactive interface for exploring YouTube trends and content insights.",
          ],
        },
      ],
      links: [],
    },
  },
];
