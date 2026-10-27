/* Starts every module in order. Data files (../data) load before the modules. */
function initContactLinks() {
  $("mail").href = "mailto:" + CONFIG.email;
  $("mail").textContent = CONFIG.email;
  $("li").href = CONFIG.linkedin;
  $("gh").href = CONFIG.github;
}
initContactLinks();
initVoiceAgent();      // assistant console: speech, answers, navigation
initAssistantDock();   // floating launcher, bottom-right
initHero();            // robot greeter and quick questions
initDashboard();       // "your visit at a glance"
initGate();            // guest / recruiter entry
initCvPack();
initPhotoAccess();
initJourneyGlobe();
initBackground();
initProjects();        // projects on watch
initWorkExplorer();    // explore past work
initStory();           // intro: interests and previews
initDeck();            // intro: cards
initAboutBook();
initRopeExperience();
initDetailPage();      // project and past-work pages (#/project/<id>)
// hide links that have no address yet
[["gh", CONFIG.github], ["sIg", CONFIG.instagram]].forEach(([id, u]) => {
  if (!u || u === "#") $(id).hidden = true;
});
