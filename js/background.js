/* Animated network background and section tags. */
/** Starts the background network and tags each section. */
function initBackground(){
// AI background network
{const c=$('ai'),x=c.getContext('2d'),m={x:-999,y:-999};let w,h,P=[];
const fit=()=>{w=c.width=innerWidth;h=c.height=innerHeight;P=Array.from({length:Math.min(70,Math.floor(w*h/22000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}))};
addEventListener('resize',fit);fit();addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY});
(function f(){requestAnimationFrame(f);x.clearRect(0,0,w,h);
P.forEach((p,i)=>{if(!rm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<120&&d>.1){p.x+=dx/d*.8;p.y+=dy/d*.8}}
x.fillStyle='rgba(45,212,191,.6)';x.fillRect(p.x,p.y,2,2);
for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<140){x.strokeStyle='rgba(45,212,191,'+(.18*(1-d/140))+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}})})()}
// section tags
const LAB={dash:"YOUR VISIT",projects:"PROJECTS ON WATCH",work:"PAST WORK",pack:"RECRUITER PACK"};
document.querySelectorAll('section').forEach(s=>{const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('beforebegin',`<span class='stag'>// ${LAB[s.id]||s.id.toUpperCase()}</span>`)});
}
