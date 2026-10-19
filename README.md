# Shuvam's AI Portfolio

A one-page portfolio with a card-based intro, a voice assistant, a 3D journey globe, an animated projects showcase and a Job Application Agent. Plain HTML, CSS and JavaScript. No build step, no installs.

## Run it

**Quickest:** double-click `index.html`.

**Recommended:** serve it locally so the microphone and YouTube embeds work reliably (browsers restrict both on `file://`):

- macOS / Linux: `./serve.sh`
- Windows: double-click `serve.bat`
- or anywhere: `python3 -m http.server 8080` inside this folder

Then open http://localhost:8080. Use Chrome, Edge or Safari for voice input.

Works offline except Google Fonts (a system font is used instead) and YouTube demo videos.

## Folder map

| File                   | What it does                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `index.html`           | Page markup only                                                                   |
| `css/styles.css`       | All styling and the black theme tokens (top of file)                               |
| `js/utils.js`          | Shared helpers (`$`, `rm`, `esc`)                                                  |
| `js/config.js`         | **Edit this first:** email, social links, CV link, photo, video IDs, n8n endpoints |
| `js/voice-agent.js`    | Speech recognition, built-in answers, optional n8n webhook                         |
| `js/hero-dashboard.js` | Robot that follows the cursor, scroll-reveal headline, live dashboard              |
| `js/recruiter-gate.js` | Guest and recruiter entry, email check                                             |
| `js/cv-pack.js`        | CV download, social links, recruiter tabs                                          |
| `js/photo-access.js`   | Private photos unlocked by Telegram approval (needs n8n)                           |
| `js/journey-globe.js`  | 3D globe and educational journey. **Add stops in the `J` list**                    |
| `js/background.js`     | Animated network background, section tags                                          |
| `js/job-agent.js`      | Job Application Agent: match a posting, tailor and export a CV                     |
| `js/projects.js`       | Projects showcase data and animated pipelines                                      |
| `js/story.js`          | Interest selection and project previews                                            |
| `js/deck.js`           | Intro card animations, wheel, keys, swipe, portrait                                |
| `js/rope-experience.js`| Experience section: roles hang from a rope, one per scroll step                    |
| `js/about-book.js`     | About section: page-turning book (buttons, dots, arrow keys, swipe)                |
| `js/main.js`           | Starts every module in order                                                       |
| `vendor/three.min.js`  | Three.js r128, bundled for offline use                                             |
| `assets/`              | Earth texture (`earth-4k.jpg`, plus `earth-texture.js` so it loads from disk)      |

Script order in `index.html` matters: utils and config first, `main.js` last.

## Things to fill in

- `js/config.js`: email, LinkedIn and WhatsApp are filled in from your CV; still to add: GitHub and Instagram (links with `#` are hidden), `cvUrl` points to `assets/Shuvam_Shrestha_CV.pdf` (replace that file when your CV changes), your photo (save it as `assets/photo.jpg`; it is linked in `index.html`, and `photo` in config.js can point elsewhere), `videos` (one YouTube ID per project, in project order).
- `js/projects.js` and `js/story.js`: project descriptions, problem and approach lines, statuses.
- `js/journey-globe.js`: add your MBA city, years and other chapters.

## n8n connections (optional)

All empty by default, so everything runs in demo mode:

- `entryUrl`: POST `{name, company, email}` returns `{ok:true}`
- `photoRequestUrl` / `photoStatusUrl`: Telegram approval flow
- `jobAgentUrl`: POST `{url, text}` returns `{headline, summary, bullets, matched, gaps}`
- `n8nUrl`: POST `{text}` returns `{action, target, text}` for the voice assistant

The front-end email check is a convenience, not security. Only return private photo URLs from n8n after you approve.

## About book

The About section is three `<article class="bpage">` blocks inside `#book` in `index.html`. Add another page by copying one article; the page numbers (`1 / 3`) and the book's aria-label are plain text, so update them by hand. Everything else (dots, buttons, count) adapts automatically.

## Experience ropes

The work roles are the `<article class="rcard">` blocks inside `#ropeTrack`. Add or remove one and the scroll length, dots and count adapt automatically; update the "ROLE 1 / 3" labels by hand.

## WhatsApp QR

The QR code in the contact section opens `wa.me/9779860308208` with a short pre-filled message. To change the number, run `pip install segno && python3 tools/make_qr.py <number>` and paste the new SVG into the `.qrtile` span in `index.html`.
