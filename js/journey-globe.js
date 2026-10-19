/* 3D satellite globe that tells the educational journey. Add stops in the J list. */
/** Builds the Three.js globe, route, chapters and cinematic flights. */
function initJourneyGlobe(){
// Educational journey. To add a chapter, append an object to J: {n:'Place',lat,lon,t:'Title',p:'Story',b:['Highlight',...],r:'Why it matters (recruiters)',yr:'optional years'}. The route, buttons, timeline and tour update automatically. earthTexture in CONFIG can hold a real satellite image URL on your own host.
const J=[
{n:'Nepal',lat:26.77,lon:85.28,t:'Where it began',p:'My roots, an MBA in Finance at Purbanchal University (2020–2024), and early work in bancassurance, marketing and IT project management.',r:'The finance, sales and delivery background that shapes how I scope AI products.',b:['MBA in Finance','Bancassurance','Marketing','IT project management']},
{n:'Thailand',lat:14.08,lon:100.61,t:'Asian Institute of Technology',p:'M.S. in Information Management (Data Science & AI) since August 2025, one half of the DANI dual degree.',r:'The data science and AI foundation behind my BNPL, air quality and lead-conversion projects.',b:['Information Management','Data Science & AI focus','Dual degree with France']},
{n:'France',lat:48.62,lon:2.44,t:'Télécom SudParis, Institut Polytechnique de Paris',p:'MSc in Data Science & Network Intelligence since September 2026, the other half of the DANI dual degree.',r:'A second data science programme, where I work on IoT and digital twins such as the GLOF early warning system.',b:['Data Science & Network Intelligence','IoT & digital twins','Dual degree with Thailand']}];
const LAND=[[-168,66,-156,71,-125,70,-95,72,-80,73,-62,66,-55,52,-66,44,-76,35,-81,25,-90,29,-97,26,-105,22,-110,24,-117,32,-124,40,-125,49,-135,58,-150,60,-165,60],[-97,20,-88,21,-83,10,-78,8,-80,7,-86,11,-92,15,-97,16],[-78,8,-62,11,-51,4,-35,-5,-39,-15,-48,-26,-58,-38,-66,-46,-69,-55,-75,-50,-73,-37,-71,-18,-81,-5,-80,1],[-55,60,-45,60,-20,70,-22,82,-60,82,-70,76],[-10,36,-9,43,-2,48,-5,52,5,53,8,58,5,62,15,69,28,71,45,68,70,73,100,78,140,73,170,70,180,66,160,58,142,52,140,46,130,42,122,40,122,30,110,20,109,12,105,9,103,1,100,6,98,12,97,17,94,17,90,22,80,15,77,8,72,20,67,25,57,25,52,17,43,13,35,30,28,36,22,37,15,40,8,44,3,43,-5,36],[-17,21,-10,32,10,37,32,31,34,28,43,12,51,12,40,-3,40,-15,33,-26,20,-35,12,-18,9,-1,8,5,-8,4,-17,14],[114,-22,122,-18,130,-12,142,-11,146,-19,153,-27,150,-37,140,-38,131,-31,115,-34]];
const box=$('jMap'),cv=$('jCanvas'),stopsEl=$('jStops'),card=$('jCard'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let sel=-1,tour=null,target=null,zoomT=3.6,pickHook=()=>{};
const btns=J.map((s,i)=>{const b=document.createElement('button');b.type='button';b.textContent=(i+1)+'. '+s.n;b.setAttribute('aria-pressed','false');b.onclick=()=>{stopTour();pick(i)};stopsEl.appendChild(b);return b});
function render(i){card.innerHTML=i<0?`<small>Overview</small><h3>Nepal → Thailand → France</h3><p>Three countries across Asia and Europe, ending in a dual master’s degree in data science and AI.</p><p>Pick a stop to fly there.</p>`:`<small>Stop ${i+1} of ${J.length} · ${J[i].n}</small><h3>${J[i].t}</h3><p>${J[i].p}</p><p class='rec-only'><b>Why it matters:</b> ${J[i].r}</p>`}
function pick(i){sel=i;btns.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));render(i);pickHook(i)}
function stopTour(){if(tour){clearInterval(tour);tour=null;$('jTour').textContent='Play tour'}}
$('jTour').onclick=()=>{if(tour){stopTour();return}$('jTour').textContent='Pause tour';pick(sel<0?0:(sel+1)%J.length);tour=setInterval(()=>pick((sel+1)%J.length),9000)};
$('jReset').onclick=()=>{stopTour();sel=-1;btns.forEach(b=>b.setAttribute('aria-pressed','false'));render(-1);pickHook(-1)};
render(-1);
if(!window.THREE){box.insertAdjacentHTML('beforeend','<p style="position:absolute;inset:0;display:grid;place-items:center;color:#9fb0c8;margin:0;text-align:center;padding:20px">The 3D view could not load. Use the stops on the left.</p>');return}
const T=THREE,D=Math.PI/180;
const renderer=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputEncoding=T.sRGBEncoding;
const scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,60);cam.position.z=3.6;
const globe=new T.Group();scene.add(globe);
// procedural night-satellite texture
const W=2048,H=1024,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
const X=lo=>(lo+180)/360*W,Y=la=>(90-la)/180*H;
const og=g.createLinearGradient(0,0,0,H);og.addColorStop(0,'#0b1d3d');og.addColorStop(.5,'#0a2a52');og.addColorStop(1,'#0b1d3d');g.fillStyle=og;g.fillRect(0,0,W,H);
g.strokeStyle='rgba(120,170,230,.14)';g.lineWidth=1;for(let lo=-180;lo<=180;lo+=15){g.beginPath();g.moveTo(X(lo),0);g.lineTo(X(lo),H);g.stroke()}for(let la=-75;la<=75;la+=15){g.beginPath();g.moveTo(0,Y(la));g.lineTo(W,Y(la));g.stroke()}
const land=new Path2D();LAND.forEach(p=>{for(let i=0;i<p.length;i+=2){const x=X(p[i]),y=Y(p[i+1]);i?land.lineTo(x,y):land.moveTo(x,y)}land.closePath()});
g.fillStyle='#1b4a47';g.fill(land);g.strokeStyle='#4fd1c5';g.lineWidth=2.5;g.stroke(land);
g.fillStyle='rgba(255,214,120,.85)';for(let k=0;k<3500;k++){const x=Math.random()*W,y=Math.random()*H;if(g.isPointInPath(land,x,y))g.fillRect(x,y,2,2)}
J.forEach(s=>{const x=X(s.lon),y=Y(s.lat),gr=g.createRadialGradient(x,y,0,x,y,60);gr.addColorStop(0,'rgba(255,200,100,.35)');gr.addColorStop(1,'rgba(255,200,100,0)');g.fillStyle=gr;g.fillRect(x-60,y-60,120,120);g.fillStyle='rgba(255,230,160,.9)';for(let k=0;k<260;k++){const a=Math.random()*6.283,r=Math.pow(Math.random(),1.6)*50;g.fillRect(x+Math.cos(a)*r,y+Math.sin(a)*r*.7,2,2)}});
const tex=new T.CanvasTexture(c);tex.encoding=T.sRGBEncoding;
const earth=new T.Mesh(new T.SphereGeometry(1,64,48),new T.MeshBasicMaterial({map:tex}));globe.add(earth);
if(CONFIG.earthTexture)new T.TextureLoader().load(CONFIG.earthTexture,t=>{t.encoding=T.sRGBEncoding;earth.material.map=t;earth.material.needsUpdate=true});
if(!CONFIG.earthTexture&&window.EARTH_B64)new T.TextureLoader().load('data:image/jpeg;base64,'+window.EARTH_B64,t=>{t.encoding=T.sRGBEncoding;t.anisotropy=renderer.capabilities.getMaxAnisotropy();earth.material.map=t;earth.material.needsUpdate=true});
scene.add(new T.Mesh(new T.SphereGeometry(1.07,48,32),new T.MeshBasicMaterial({color:0x4fb4ff,transparent:true,opacity:.07,side:T.BackSide})));
const sp=new Float32Array(900);for(let i=0;i<900;i+=3){const v=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(9+Math.random()*4);sp[i]=v.x;sp[i+1]=v.y;sp[i+2]=v.z}
const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(sp,3));scene.add(new T.Points(sg,new T.PointsMaterial({size:.035,color:0xffffff})));
const P=(la,lo,r=1)=>{const ph=(90-la)*D,th=(lo+180)*D;return new T.Vector3(-r*Math.sin(ph)*Math.cos(th),r*Math.cos(ph),r*Math.sin(ph)*Math.sin(th))};
// markers
const rings=J.map(s=>{const pos=P(s.lat,s.lon,1.006),m=new T.Mesh(new T.SphereGeometry(.024,16,16),new T.MeshBasicMaterial({color:0xf2b840}));m.position.copy(pos);globe.add(m);
const r=new T.Mesh(new T.RingGeometry(.03,.04,32),new T.MeshBasicMaterial({color:0xf2b840,transparent:true,side:T.DoubleSide}));r.position.copy(pos);r.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),pos.clone().normalize());globe.add(r);return r});
// route arcs and traveler
const path=[];for(let i=0;i<J.length-1;i++){const a=P(J[i].lat,J[i].lon),b=P(J[i+1].lat,J[i+1].lon),an=a.angleTo(b),sn=Math.sin(an),seg=[];
for(let k=0;k<=64;k++){const t=k/64;seg.push(a.clone().multiplyScalar(Math.sin((1-t)*an)/sn).add(b.clone().multiplyScalar(Math.sin(t*an)/sn)).multiplyScalar(1+.16*Math.sin(Math.PI*t)))}
globe.add(new T.Line(new T.BufferGeometry().setFromPoints(seg),new T.LineBasicMaterial({color:0xf2b840})));path.push(...seg)}
const trav=new T.Mesh(new T.SphereGeometry(.03,16,16),new T.MeshBasicMaterial({color:0xffffff}));globe.add(trav);
// orbiting satellite
const sat=new T.Group(),gray=new T.MeshBasicMaterial({color:0xcfd8e6}),blue=new T.MeshBasicMaterial({color:0x3b82f6});
sat.add(new T.Mesh(new T.BoxGeometry(.06,.04,.04),gray));[-1,1].forEach(s=>{const p=new T.Mesh(new T.BoxGeometry(.09,.003,.045),blue);p.position.x=s*.08;sat.add(p)});scene.add(sat);
// interaction
let drag=false,lx=0,ly=0,vis=false;const qa=new T.Quaternion();
const rot=(yaw,pitch)=>{qa.setFromEuler(new T.Euler(pitch,yaw,0));globe.quaternion.premultiply(qa)};
cv.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;target=null;flight=null;stopTour();cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',e=>{if(!drag)return;rot((e.clientX-lx)*.006,(e.clientY-ly)*.006);lx=e.clientX;ly=e.clientY});
['pointerup','pointercancel'].forEach(n=>cv.addEventListener(n,()=>{drag=false;cv.style.cursor='grab'}));
pickHook=i=>{if(i<0){target=null;zoomT=3.6;return}target=new T.Quaternion().setFromEuler(new T.Euler(J[i].lat*D,Math.PI/2-(J[i].lon+180)*D,0));zoomT=2.3;if(rm)globe.quaternion.copy(target)};
// cinematic flights between chapters
let flight=null,landT=0,hudS='';const FL=3400,ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const qFor=i=>new T.Quaternion().setFromEuler(new T.Euler(J[i].lat*D,Math.PI/2-(J[i].lon+180)*D,0));
function title(i){const t=$('jTitle');t.classList.remove('go');void t.offsetWidth;if(i<0){t.innerHTML='';return}t.innerHTML=`<small>CHAPTER ${i+1}</small><b>${J[i].n}</b>`;t.classList.add('go')}
function render(i){const s=J[i];card.classList.remove('in');void card.offsetWidth;card.classList.add('in');
card.innerHTML=i<0?`<small>The whole story</small><h3>${J.map(x=>x.n).join(' → ')}</h3><p>${J.length} chapters, each one a place that shaped how I study, build and think about AI products.</p><p>Press play, or pick a chapter.</p>`:`<small>Chapter ${i+1} of ${J.length}${s.yr?' · '+s.yr:''}</small><h3>${s.t}</h3><p>${s.p}</p>${s.b?`<ul>${s.b.map(b=>`<li>${b}</li>`).join('')}</ul>`:''}<p class='rec-only'><b>Why it matters:</b> ${s.r}</p>`}
pickHook=i=>{const z1=i<0?3.6:1.5;zoomT=z1;target=null;title(i);
if(rm){if(i>=0)globe.quaternion.copy(qFor(i));cam.position.z=z1;return}
flight={t0:performance.now(),q0:globe.quaternion.clone(),q1:i<0?globe.quaternion.clone():qFor(i),z0:cam.position.z,z1}};
function hud(){const s=sel>=0?J[sel]:null,km=Math.max(0,Math.round((cam.position.z-1)*637.1)*10),h=(s?'LAT '+s.lat.toFixed(2)+' LON '+s.lon.toFixed(2)+'<br>':'')+'ALT '+km.toLocaleString('en-US')+' km';if(h!==hudS){hudS=h;$('jHud').innerHTML=h}$('jProg').style.width=(sel<0?0:(sel+1)/J.length*100)+'%'}
function flightStep(){hud();const tx=(sel>=0&&innerWidth>820)?-.3:0;cam.position.x+=(tx-cam.position.x)*.05;
if(flight){const k=Math.min(1,(performance.now()-flight.t0)/FL),e=ease(k);globe.quaternion.copy(flight.q0).slerp(flight.q1,e);cam.position.z=flight.z0+(flight.z1-flight.z0)*e+Math.sin(Math.PI*k)*(flight.z1<2?1.2:.4);if(k>=1){cam.position.z=flight.z1;flight=null;landT=performance.now()}}
else if(sel>=0&&!rm){cam.position.z=zoomT-.08*(1-Math.cos((performance.now()-landT)/4000))/2;rot(.0001,0)}}
$('jNext').onclick=()=>{stopTour();pick(sel<0?0:(sel+1)%J.length)};
$('jPrev').onclick=()=>{stopTour();pick(sel<=0?J.length-1:sel-1)};
J.forEach(s=>{const c2=document.createElement('canvas');c2.width=256;c2.height=64;const x2=c2.getContext('2d');x2.font='600 30px sans-serif';x2.textAlign='center';x2.fillStyle='#fff';x2.shadowColor='#000';x2.shadowBlur=8;x2.fillText(s.n.toUpperCase(),128,42);const sp2=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c2),transparent:true}));sp2.scale.set(.32,.08,1);sp2.position.copy(P(s.lat,s.lon,1.1));globe.add(sp2)});
function size(){const w=box.clientWidth,h=box.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
new ResizeObserver(size).observe(box);size();
new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(box);
let tt=0,ti=0;
(function loop(){requestAnimationFrame(loop);if(!vis)return;tt+=.016;
if(!flight&&!drag&&sel<0&&!rm)rot(.0016,0);
if(sel<0&&!flight)cam.position.z+=(zoomT-cam.position.z)*.06;flightStep();
rings.forEach((r,i)=>{const k=(tt*.8+i*.3)%1;r.scale.setScalar(1+k*1.4);r.material.opacity=(1-k)*.8});
if(!rm){ti=(ti+.7)%path.length;trav.position.copy(path[Math.floor(ti)]);const a=tt*.5;sat.position.set(1.45*Math.cos(a),1.45*Math.sin(a)*.5,1.45*Math.sin(a)*.87);sat.rotation.y=a}
renderer.render(scene,cam)})();
}
