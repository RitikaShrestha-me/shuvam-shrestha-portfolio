/* Projects showcase: data, animated pipelines, auto-rotating highlight. */
// ---- projects showcase ----
const PJ=[
{n:'Job Application Agent',tag:'NEW · AI AGENT',d:'Give it a job link and it reads the posting, matches it against my profile and returns a CV tailored to the role, ready to apply with.',nodes:['Job link','Parse posting','Match profile','Tailor CV','Export'],stack:['n8n','Ollama','LLM agent','Automation'],agent:1},
{n:'AI Voice Portfolio',tag:'GENAI · PRODUCT',d:'The portfolio you are on. Recruiters talk to a speech-to-text agent backed by an n8n workflow and a local Ollama model, with separate guest and recruiter flows and Telegram approval for private content.',nodes:['Speech','n8n workflow','Ollama model','Spoken answer'],stack:['n8n','Ollama','Speech-to-text','Telegram','Docker']},
{n:'GLOF early warning system',tag:'IOT · DIGITAL TWINS',d:'A group project at Télécom SudParis: an early-warning system for glacial lake outburst floods in Himalayan lakes. Sensor data flows through MQTT into InfluxDB, a hazard engine scores the risk, and operators review each alert before the ministry is notified on Telegram. Built to survive sensor disruption and documented in C4 diagrams revised after professor feedback.',nodes:['Lake sensors','MQTT + InfluxDB','Hazard engine','Operator review','Telegram alert'],stack:['MQTT','InfluxDB','Eclipse Mosquitto','n8n','Docker','Next.js','C4']},
{n:'BNPL credit risk dashboard',tag:'FINTECH · ANALYTICS',d:'Interactive Tableau dashboards for a buy-now-pay-later credit risk decision-support platform, built to surface key business metrics and actionable insights, and demonstrated as a locally run prototype.',nodes:['Data','Risk metrics','Dashboards','Decision support'],stack:['Tableau','Dashboard design','KPI analysis','Credit risk']},
{n:'Air Quality Alert System',tag:'DATA ENGINEERING · MLOPS',d:'An end-to-end pipeline covering data ingestion, PM2.5 forecasting, model training and automated alerting.',nodes:['Ingest data','Forecast PM2.5','Train model','Send alert'],stack:['Python','MLOps','Time-series forecasting']},
{n:'Cold Lead Conversion Prediction',tag:'MACHINE LEARNING',d:'Classification models built and compared to predict lead conversion, linking the outputs to sales prioritisation and go-to-market decisions.',nodes:['Lead data','Train models','Compare','Prioritise sales'],stack:['Python','Scikit-learn','Classification']},
{n:'LLM workflow automation',tag:'AUTOMATION',d:'n8n pipelines with local Ollama and Gemini models: YouTube trend analysis into Google Sheets, and RSS feeds summarised by AI into Supabase using structured-output parsing.',nodes:['Trigger','LLM','Structured output','Sheets / Supabase'],stack:['n8n','Ollama','Gemini','Supabase','Google Sheets','Docker']}];
function flow(nodes){const n=nodes.length,gap=480/(n-1),y=50;let s=`<svg viewBox='0 0 600 120' role='img' aria-label='Pipeline: ${nodes.join(', ')}'>`;
for(let i=0;i<n-1;i++)s+=`<line class='ln' x1='${60+i*gap}' y1='${y}' x2='${60+(i+1)*gap}' y2='${y}'/>`;
nodes.forEach((t,i)=>{const x=60+i*gap;s+=`<circle class='nd' cx='${x}' cy='${y}' r='15' style='animation-delay:${(i/(n-1)*3.2).toFixed(2)}s'/><text x='${x}' y='${y+42}'>${t}</text>`});
return s+`<circle r='5' fill='#f2b840'><animateMotion dur='4s' repeatCount='indefinite' path='M60 ${y} L540 ${y}'/></circle></svg>`}
let cur=0,pinned=rm;const pjq=$('pjq'),pjs=$('pjs');
function sched(){clearTimeout(timer);if(pinned||busy)return;timer=setTimeout(()=>{if(pjs.matches(':hover')||pjs.contains(document.activeElement))sched();else show((cur+1)%PJ.length)},9000)}
function vid(i){const box=$('pjVid');if(!box)return;const id=CONFIG.videos[i]||CONFIG.videos[0],b=document.createElement('button'),f=document.createElement('div');b.type='button';b.className='send';b.style.marginTop='14px';b.textContent='Watch demo video';
b.onclick=()=>{pinned=true;clearTimeout(timer);const bd=$('pjBadge');if(bd)bd.lastChild.textContent='PINNED · click to resume';if(f.firstChild){f.innerHTML='';b.textContent='Watch demo video';return}
f.innerHTML=`<iframe src='https://www.youtube-nocookie.com/embed/${id}' title='Project demo video' allowfullscreen loading='lazy'></iframe><p><a href='https://www.youtube.com/watch?v=${id}' target='_blank' rel='noopener'>Open on YouTube</a> if the video does not load.</p>`;b.textContent='Hide demo video'};box.append(b,f)}
function show(i){cur=i;[...pjq.children].forEach((b,k)=>b.setAttribute('aria-selected',k===i));const p=PJ[i];
pjs.innerHTML=`<div class='pjbar ${pinned?'':'run'}'></div><button class='pjbadge' type='button' id='pjBadge'><i></i>${pinned?'PINNED · click to resume':'ON WATCH'}</button><h3>${p.n}</h3><p>${p.d}</p><div class='pjflow'>${flow(p.nodes)}</div><div class='chips'>${p.stack.map(s=>`<span>${s}</span>`).join('')}</div><div class='rec-only' id='pjVid'></div>${p.agent?agentHTML:''}`;
$('pjBadge').onclick=()=>{pinned=!pinned;show(cur)};vid(i);if(p.agent)wireAgent();sched()}
/** Registers the project list and shows the first project. */
function initProjects(){
PJ.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.innerHTML=`<i></i><span><small>${p.tag}</small><b>${p.n}</b></span>`;b.onclick=()=>{pinned=true;show(i)};pjq.appendChild(b)});
show(0);
}
