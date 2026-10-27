# Shuvam's AI Portfolio

A one-page portfolio: card-based intro, hero with a robot greeter, a floating voice and text assistant, projects on watch with demo videos, a research-style page for every project, a filterable archive of past work, a 3D journey globe, and a Job Application Agent. Plain HTML, CSS and JavaScript. No build step.

## Run it

- **Quickest:** double-click `index.html`.
- **Recommended:** `./serve.sh` (Mac/Linux), `serve.bat` (Windows) or `python3 -m http.server 8080`, then open http://localhost:8080. The microphone and YouTube embeds work reliably only this way.

Works offline except Google Fonts and the demo videos.

## Where to change things

| I want to change... | Edit |
| --- | --- |
| Email, social links, CV, photo, n8n and Sheet links | `js/config.js` |
| **Projects on watch**, their detail pages, demo videos, optional links | `data/projects.js` |
| **Past work** (company, freelance, academic, personal) and its detail pages | `data/works.js` |
| Hero text and buttons | `index.html` (`<header class="hero">`) |
| Colours and theme | `css/base.css` (top of the file) |
| Assistant answers and the questions it understands | `js/voice-agent.js` (`KB` list) |

### Add a demo video
In `data/projects.js`, set `video` on the project: a YouTube link, a Google Drive link (`.../file/d/<id>/view`) or an `.mp4` path. Recruiters see it on the project; guests see the live agent on the Job Application Agent.

### Add links to a project page (optional)
In `data/projects.js` or `data/works.js`, inside `detail`:
```js
links: [{ label: "Source code", url: "https://github.com/...", note: "Repository" }]
```
A "Further reading and resources" section appears only when there is at least one link.

### Add a freelance or company project
Copy the commented example at the bottom of `data/works.js`. Use `kind: "freelance"` and a **Freelance projects** filter appears on its own.

### Share a project page
Every page has an address like `index.html#/project/job-agent` or `#/work/iot-ranger` (use the **Copy link** button).

## Folder map

```
index.html            page markup
css/                  base, hero, assistant, projects, detail, work, intro, about, experience,
                      journey, dashboard, pack, contact, robot  (one file per feature)
data/                 projects.js, works.js  (your content)
js/                   one file per feature; main.js starts them in order
vendor/three.min.js   Three.js, bundled for offline use
assets/               CV, photo, earth texture
```

Script order in `index.html` matters: utils and config first, data next, `main.js` last.

## Notes

- The floating assistant (bottom-right) is available everywhere after the intro. Escape closes it.
- The recruiter entry details go to the Google Sheet configured as `scriptUrl`.
- The front-end checks are conveniences, not security. Return private photo URLs from n8n only after you approve.
