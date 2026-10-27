/*
  PAST WORK: everything else you have done. Shown in the "Explore more of my past work" section,
  together with the projects from data/projects.js. Each entry gets its own detail page.

  kind:  'company' | 'freelance' | 'academic' | 'personal'
         A filter button only appears for kinds that have at least one entry,
         so add a freelance entry and the "Freelance" filter shows up on its own.
  Fields are the same as in data/projects.js (id, title, tag, org, role, period, summary,
  nodes, stack, themes, story, detail { abstract, keywords, sections, links, cite ... }).

  ADD A FREELANCE OR COMPANY PROJECT: copy the commented example at the bottom.
*/
const WORKS = [
  {
    id: "webpoint-solutions",
    kind: "company",
    title: "Associate Project Manager",
    tag: "COMPANY ROLE",
    org: "Webpoint Solutions",
    role: "Associate Project Manager",
    period: "2024 – 2025",
    summary:
      "Led end-to-end delivery of 7 projects, 5 of them shipped to production, as the main link between business and technical stakeholders.",
    stack: ["Agile", "Scrum", "Jira", "Trello"],
    detail: {
      abstractLabel: "Summary",
      type: "Company role · IT project management",
      status: "Completed",
      abstract:
        "At Webpoint Solutions I led end-to-end delivery of 7 projects, 5 of which shipped to production, coordinating clients, developers and change requests across the full delivery lifecycle.",
      keywords: ["Project management", "Agile", "Scrum", "Stakeholder alignment", "Delivery"],
      sections: [
        {
          title: "Responsibilities and impact",
          bullets: [
            "Led end-to-end delivery of 7 projects (5 shipped to production), coordinating clients, developers and change requests.",
            "Translated business requirements into product requirements and engineering tasks as the primary link between business and technical stakeholders.",
            "Ran Agile and Scrum ceremonies.",
          ],
        },
        {
          title: "What it taught me",
          body: [
            "Managing software delivery introduced me to development, cross-functional collaboration and the work of turning business requirements into working solutions. It is where I started wanting to understand the data and intelligence behind products, not only manage their delivery.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "mid-valley-college",
    kind: "company",
    title: "Senior Marketing Officer",
    tag: "COMPANY ROLE",
    org: "Mid-Valley International College",
    role: "Senior Marketing Officer",
    period: "2021 – 2022",
    summary:
      "Lifted lead conversion by 30% through digital admission campaigns and built 46+ strategic partnerships.",
    stack: ["Digital campaigns", "Partnerships", "Lead conversion"],
    detail: {
      abstractLabel: "Summary",
      type: "Company role · Marketing",
      status: "Completed",
      abstract:
        "At Mid-Valley International College I lifted lead conversion by 30% through digital admission campaigns and built and maintained over 46 strategic partnerships with schools, consultants and alumni networks.",
      keywords: ["Marketing", "Lead conversion", "Partnerships", "Admissions"],
      sections: [
        {
          title: "Responsibilities and impact",
          bullets: [
            "Lifted lead conversion by 30% through digital admission campaigns.",
            "Built and maintained 46+ strategic partnerships with schools, consultants and alumni networks.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "national-life-insurance",
    kind: "company",
    title: "Bancassurance Officer",
    tag: "COMPANY ROLE",
    org: "National Life Insurance Company",
    role: "Bancassurance Officer",
    period: "2018 – 2019",
    summary:
      "Drove Rs. 25M of semi-annual premium revenue across 10 partner bank branches, reaching 84% of targets.",
    stack: ["Bancassurance", "Sales", "Training", "Partnerships"],
    detail: {
      abstractLabel: "Summary",
      type: "Company role · Bancassurance",
      status: "Completed",
      abstract:
        "As a Bancassurance Officer at National Life Insurance Company I drove Rs. 25M of semi-annual premium revenue across 10 partner bank branches, reaching 84% of targets, and worked with corporate banks and business houses.",
      keywords: ["Bancassurance", "Insurance", "Sales", "Bank partnerships", "Training"],
      sections: [
        {
          title: "Responsibilities and impact",
          bullets: [
            "Drove Rs. 25M of semi-annual premium revenue across 10 partner bank branches (84% of targets).",
            "Delivered 30+ training sessions that contributed to a 60% increase in insurance sales.",
            "Facilitated 3 bank-insurer MOUs.",
          ],
        },
        {
          title: "What it taught me",
          body: [
            "An early understanding of how businesses operate, how relationships shape markets and how products need to be positioned to create value.",
          ],
        },
      ],
      links: [],
    },
  },
  // {
  //   id: "iot-ranger",
  //   kind: "academic",
  //   title: "IoT Ranger",
  //   tag: "IOT · PLATFORM",
  //   org: "Asian Institute of Technology",
  //   role: "Backend, integration and architecture",
  //   period: "M1 · AIT",
  //   summary:
  //     "A team project: an IoT monitoring and device management platform inspired by cloud IoT services such as NETPIE and AWS IoT.",
  //   nodes: ["Devices", "EMQX broker", "FastAPI services", "MongoDB + InfluxDB", "SvelteKit dashboards"],
  //   stack: ["FastAPI", "SvelteKit", "MQTT", "EMQX", "InfluxDB", "MongoDB", "Grafana", "Firebase"],
  //   themes: ["ai", "data"],
  //   story: {
  //     prob: "Teams need one place to connect, monitor and manage fleets of IoT devices.",
  //     how: "A platform inspired by NETPIE and AWS IoT, with live telemetry and a custom dashboard builder.",
  //     status: "Team project, AIT",
  //   },
  //   detail: {
  //     subtitle: "A NETPIE and AWS IoT-inspired platform for monitoring and managing devices",
  //     type: "Team project · IoT platform",
  //     status: "Completed",
  //     affiliation: "Asian Institute of Technology",
  //     role: "Backend, integration and architecture",
  //     team: "Team project",
  //     abstract:
  //       "IoT Ranger is an IoT monitoring and device management platform inspired by cloud IoT solutions such as NETPIE and AWS IoT. Devices connect over MQTT or HTTP, telemetry streams to users in real time, and historical and live sensor data can be explored in dashboards that users build themselves.",
  //     keywords: ["IoT", "MQTT", "Device management", "Real-time telemetry", "Microservices", "Dashboards"],
  //     figureCaption: "How device data moves through the platform.",
  //     sections: [
  //       {
  //         title: "Features",
  //         bullets: [
  //           "MQTT and HTTP device communication.",
  //           "Real-time telemetry through WebSockets.",
  //           "JWT and Firebase authentication.",
  //           "Device shadow and live feed synchronisation.",
  //           "Historical and real-time sensor visualisation, and a custom dashboard builder.",
  //         ],
  //       },
  //       {
  //         title: "Architecture",
  //         body: [
  //           "A modular, microservice-style design: an EMQX broker, FastAPI services, MongoDB and InfluxDB for storage, Grafana for monitoring and alerting, and a SvelteKit frontend.",
  //         ],
  //       },
  //       {
  //         title: "My contribution",
  //         bullets: [
  //           "Responsible for the backend functionality.",
  //           "Connected the backend with the frontend and the other parts of the system.",
  //           "Worked on Firebase integration.",
  //           "Helped create the architecture of the application.",
  //         ],
  //       },
  //     ],
  //     links: [],
  //   },
  // },
  // {
  //   id: "cold-lead-conversion",
  //   kind: "academic",
  //   title: "Cold Lead Conversion Prediction",
  //   tag: "MACHINE LEARNING",
  //   org: "Asian Institute of Technology",
  //   summary:
  //     "Classification models built and compared to predict lead conversion, linking the outputs to sales prioritisation and go-to-market decisions.",
  //   nodes: ["Lead data", "Train models", "Compare", "Prioritise sales"],
  //   stack: ["Python", "Scikit-learn", "Classification"],
  //   themes: ["product"],
  //   story: {
  //     prob: "Sales teams cannot chase every cold lead.",
  //     how: "Classification models predict which leads convert, so sales can prioritise.",
  //     status: "Models compared",
  //   },
  //   detail: {
  //     subtitle: "Predicting which cold leads are worth a salesperson's time",
  //     type: "Course project · Machine learning",
  //     status: "Models compared",
  //     affiliation: "Asian Institute of Technology",
  //     abstract:
  //       "Classification models were built and compared to predict lead conversion, and their outputs were linked to sales prioritisation and go-to-market decisions.",
  //     keywords: ["Classification", "Scikit-learn", "Lead scoring", "Go-to-market"],
  //     figureCaption: "From lead data to a sales priority list.",
  //     sections: [
  //       {
  //         title: "Approach",
  //         bullets: [
  //           "Prepare lead data.",
  //           "Train several classification models.",
  //           "Compare them.",
  //           "Turn the predictions into a sales prioritisation.",
  //         ],
  //       },
  //     ],
  //     links: [],
  //   },
  // },
  {
    id: "ai-voice-portfolio",
    kind: "personal",
    title: "AI Voice Portfolio",
    tag: "GENAI · PRODUCT",
    summary:
      "The portfolio you are on. Visitors talk to a speech-to-text agent backed by an n8n workflow and a local Ollama model, with separate guest and recruiter flows and Telegram approval for private content.",
    nodes: ["Speech", "n8n workflow", "Ollama model", "Spoken answer"],
    stack: ["n8n", "Ollama", "Speech-to-text", "Telegram", "Docker"],
    themes: ["ai", "product"],
    story: {
      prob: "Recruiters read portfolios but rarely experience the work.",
      how: "A speech-to-text agent on n8n and a local Ollama model answers questions and moves the page.",
      status: "Live: the site you are on",
    },
    detail: {
      subtitle: "A portfolio you can talk to",
      type: "Personal project · GenAI product",
      status: "Live",
      abstract:
        "This portfolio is itself a project. Visitors talk to a speech-to-text agent backed by an n8n workflow and a local Ollama model, with separate guest and recruiter flows and Telegram approval for private content.",
      keywords: ["Speech-to-text", "n8n", "Ollama", "Agent", "Telegram", "Product design"],
      figureCaption: "From a spoken question to a spoken answer.",
      sections: [
        {
          title: "Design principles",
          bullets: [
            "A guest can explore without giving any details.",
            "Recruiters get the CV, demo videos and a private photo collection.",
            "Private content unlocks only after I approve it on Telegram.",
          ],
        },
      ],
      links: [],
    },
  },

  /* ---- ADD YOUR OWN: copy one of these and fill it in --------------------------------------
  {
    id: "my-freelance-project",          // unique, no spaces
    kind: "freelance",                   // 'company' | 'freelance' | 'academic' | 'personal'
    title: "Project name",
    tag: "FREELANCE · WEB",
    org: "Client or company",
    role: "Your role",
    period: "2023",
    summary: "One or two sentences that say what you did and for whom.",
    stack: ["Tool", "Tool"],
    detail: {
      abstract: "A short abstract.",
      keywords: ["keyword"],
      sections: [{ title: "What I did", bullets: ["...", "..."] }],
      links: [{ label: "Live site", url: "https://example.com", note: "Optional" }],   // OPTIONAL
    },
  },
  ------------------------------------------------------------------------------------------- */
];
