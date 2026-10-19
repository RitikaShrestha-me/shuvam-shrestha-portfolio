/* Interest selection and contextual project previews for the intro. */
// ---- question-driven story ----
const THEMES={ai:'AI & intelligent systems',data:'Data & experimentation',product:'Products & innovation'};
// Maps each existing project (by its title in PJ) to interests, plus short story fields. Edit freely.
const FEATURE={
'Job Application Agent':{themes:['ai','product'],prob:'Tailoring a CV for every job posting by hand takes time.',how:'An agent reads the posting, matches it against my profile and drafts a tailored CV.',status:'Live demo in the portfolio'},
'AI Voice Portfolio':{themes:['ai','product'],prob:'Recruiters read portfolios but rarely experience the work.',how:'A speech-to-text agent on n8n and a local Ollama model answers questions and moves the page.',status:'Live: the site you are on'},
'LLM workflow automation':{themes:['ai'],prob:'Tools and AI models need to work together without manual hand-offs.',how:'n8n pipelines with Ollama and Gemini turn YouTube trends and RSS feeds into Sheets and Supabase.',status:'Pipelines built'},
'BNPL credit risk dashboard':{themes:['data'],prob:'Buy-now-pay-later credit risk needs to be visible at a glance.',how:'Interactive Tableau dashboards that support credit decisions, shown as a local prototype.',status:'Prototype built'},
'GLOF early warning system':{themes:['data'],prob:'Glacial lake outburst floods in the Himalaya need early warning.',how:'MQTT and InfluxDB feed a hazard engine, with operator review before alerts, documented in C4.',status:'Group project, Télécom SudParis'},
'Air Quality Alert System':{themes:['data'],prob:'Poor air quality needs to be flagged before it hurts.',how:'A pipeline ingests data, forecasts PM2.5, retrains the model and sends alerts.',status:'Pipeline built'},
'Cold Lead Conversion Prediction':{themes:['product'],prob:'Sales teams cannot chase every cold lead.',how:'Classification models predict which leads convert, so sales can prioritise.',status:'Models compared'}};
const DEFAULT_MIX=['Job Application Agent','GLOF early warning system','BNPL credit risk dashboard'];
const state={interest:null},cover=$('cover'),sps=$('sps');
const featured=()=>(state.interest?PJ.filter(p=>FEATURE[p.n]&&FEATURE[p.n].themes.includes(state.interest)):DEFAULT_MIX.map(n=>PJ.find(p=>p.n===n))).filter(Boolean).slice(0,3);
function renderSP(){const top=cover.scrollTop,list=featured();sps.style.minHeight=sps.offsetHeight+'px';
sps.innerHTML=list.map((p,k)=>{const f=FEATURE[p.n]||{};return `<article class='sp' style='animation-delay:${k*70}ms'><small>${esc(p.tag)}</small><h3>${esc(p.n)}</h3><dl><dt>Problem</dt><dd>${esc(f.prob||p.d)}</dd><dt>Approach</dt><dd>${esc(f.how||p.d)}</dd><dt>Status</dt><dd>${esc(f.status||'Project')}</dd></dl><button type='button' class='sp-go' data-n='${esc(p.n)}'>View ${esc(p.n)} in the portfolio</button></article>`}).join('');
requestAnimationFrame(()=>{sps.style.minHeight='';if(cover.scrollTop!==top)cover.scrollTop=top});
$('iStatus').textContent=state.interest?'Showing '+list.length+' projects for '+THEMES[state.interest]+'.':'';
$('pLead').textContent=state.interest?'Selected for you: '+THEMES[state.interest]+'.':'Choose an interest above to focus this selection. Here is a mix to start.'}
function goProject(n){const i=PJ.findIndex(p=>p.n===n);window.enterPortfolio('guest');pinned=true;show(i);setTimeout(()=>$('projects').scrollIntoView({behavior:rm?'auto':'smooth'}),60)}
/** Wires interest radios, preview links and renders the first set. */
function initStory(){
document.querySelectorAll('input[name=interest]').forEach(r=>r.onchange=()=>{state.interest=r.value;renderSP()});
sps.addEventListener('click',e=>{const b=e.target.closest('.sp-go');if(b)goProject(b.dataset.n)});
renderSP();
}
