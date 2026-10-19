/* Edit this file to customise links, endpoints and media. */
// ---- CONFIG: edit these ----
const CONFIG = {
  n8nUrl: "",
  email: "sendtoshuvam@gmail.com",
  linkedin: "https://www.linkedin.com/in/shuvam-shrestha",
  github: "#",
  instagram: "#",
  whatsapp: "https://wa.me/9779860308208",
  scriptUrl:
    "https://script.google.com/macros/s/AKfycbw0Ao-8CczEixzueOjPoEn-tq2rEiU5rI3clG_aL9dZcSCwm9zuVEzB099AjfBgfc9wWw/exec",
  photoRequestUrl: "",
  photoStatusUrl: "",
  cvUrl: "assets/Shuvam_Shrestha_CV.pdf",
  earthTexture: "",
  jobAgentUrl: "",
  photo: "",
  photos: [],
  videos: [
    "jNQXAC9IVRw",
    "jNQXAC9IVRw",
    "jNQXAC9IVRw",
    "jNQXAC9IVRw",
    "jNQXAC9IVRw",
    "jNQXAC9IVRw",
    "jNQXAC9IVRw",
  ],
};
// Recruiter flow (n8n): entryUrl = POST {name,company,email} -> {ok:true}. photoRequestUrl = POST {name,company,email} -> {id}; photoStatusUrl = GET ?id= -> {status:'pending'|'approved'|'denied',photos:[urls]}.
// cvUrl = link to your real CV PDF (leave empty to use the built-in starter CV). videos = one YouTube ID per project, in page order.
// n8nUrl: POST {text} -> expects JSON {action:"navigate"|"answer", target:"#projects", text:"..."}
// ----------------------------
