/* Starts every module in order. */
function initContactLinks(){
$("mail").href="mailto:"+CONFIG.email;$("mail").textContent=CONFIG.email;$("li").href=CONFIG.linkedin;$("gh").href=CONFIG.github;
}
initContactLinks();initVoiceAgent();initHeroAndDashboard();initGate();initCvPack();initPhotoAccess();initJourneyGlobe();initBackground();initProjects();initStory();initDeck();initAboutBook();initRopeExperience();
// hide links that have no address yet
[["gh",CONFIG.github],["sIg",CONFIG.instagram]].forEach(([id,u])=>{if(!u||u==="#")$(id).hidden=true});
