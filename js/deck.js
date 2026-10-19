/* Intro card deck: per-card animations, wheel, keys, swipe, dots, portrait. */
// ---- card-flip deck ----
const cards=[...cover.querySelectorAll('.fc')],dots=[...document.querySelectorAll('.sdots a')],live=$('fLive');let idx=0,lock=false,wl=0;
function paint(){cards.forEach((c,i)=>{const on=i===idx;c.classList.toggle('cur',on);c.toggleAttribute('inert',!on);c.setAttribute('aria-hidden',on?'false':'true')});
dots.forEach((d,i)=>d.setAttribute('aria-current',i===idx));$('fCount').textContent='Card '+(idx+1)+' of '+cards.length;$('fPrev').disabled=idx===0;$('fNext').hidden=idx===cards.length-1;
live.textContent='Card '+(idx+1)+' of '+cards.length+': '+cards[idx].querySelector('h1,h2').textContent}
// each card has its own motion: exit and entry vary with direction
const setVars=(c,v)=>{['tx','ty','sc','bl','clip'].forEach(k=>c.style.removeProperty('--'+k));Object.entries(v).forEach(([k,x])=>c.style.setProperty('--'+k,x))};
const EXIT={zoom:d=>({sc:d>0?1.06:.96,bl:'8px'}),rise:d=>({ty:(d>0?-36:36)+'px'}),slide:d=>({tx:(d>0?-70:70)+'px'}),wipe:d=>({clip:d>0?'0 0 0 100%':'0 100% 0 0'}),depth:d=>({sc:.94,ty:'20px'})};
const ENTER={zoom:d=>({sc:d>0?.94:1.06,bl:'8px'}),rise:d=>({ty:(d>0?44:-44)+'px'}),slide:d=>({tx:(d>0?70:-70)+'px'}),wipe:d=>({clip:d>0?'0 100% 0 0':'0 0 0 100%'}),depth:d=>({sc:d>0?.9:1.08,ty:d>0?'24px':'0px'})};
function go(n,focus=true){n=Math.max(0,Math.min(cards.length-1,n));if(n===idx||lock)return;const dir=n>idx?1:-1,out=cards[idx],inn=cards[n];
if(!rm){setVars(out,EXIT[out.dataset.anim](dir));inn.classList.add('snap');setVars(inn,ENTER[inn.dataset.anim](dir));void inn.offsetWidth;inn.classList.remove('snap');lock=true;setTimeout(()=>lock=false,800)}
idx=n;paint();if(focus){const h=inn.querySelector('h1,h2');h.setAttribute('tabindex','-1');setTimeout(()=>h.focus({preventScroll:true}),rm?0:700)}}
/** Wires every way of moving between intro cards. */
function initDeck(){
cards.forEach(c=>c.querySelectorAll('.sv').forEach((el,i)=>el.style.transitionDelay=(.45+i*.09)+'s'));
{const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#a3b1c8'/><stop offset='1' stop-color='#2a3550'/></linearGradient></defs><path d='M20 500c0-110 70-150 180-150s180 40 180 150z' fill='url(#g)'/><rect x='165' y='290' width='70' height='80' rx='30' fill='#8393ad'/><ellipse cx='200' cy='210' rx='88' ry='105' fill='url(#g)'/><path d='M112 200c-6-90 50-130 100-125 55 5 92 45 78 125-20-45-60-62-100-60-35 2-60 20-78 60z' fill='#1b2438'/></svg>`;
const im=$('portraitImg');if(CONFIG.photo)im.src=CONFIG.photo;  // optional override from config.js
im.onerror=()=>{im.onerror=null;im.src='data:image/svg+xml,'+encodeURIComponent(svg);im.alt='Portrait placeholder'};  // no photo yet: show the illustrated placeholder
}
$('fNext').onclick=()=>go(idx+1);$('fPrev').onclick=()=>go(idx-1);
dots.forEach((d,i)=>d.onclick=e=>{e.preventDefault();go(i)});
$('skipIntro').onclick=e=>{e.preventDefault();go(cards.length-1)};
cover.querySelector('.scrollcue').onclick=e=>{e.preventDefault();go(1)};
cards.forEach(c=>{if(c.hasAttribute('data-tap'))c.addEventListener('click',e=>{if(!e.target.closest('a,button,input,label,form,summary,textarea'))go(idx+1)})});
let acc=0,accT=0;
cover.addEventListener('wheel',e=>{if(e.ctrlKey)return;const c=cards[idx],dy=e.deltaY,more=dy>0?c.scrollTop+c.clientHeight<c.scrollHeight-2:c.scrollTop>0;if(more)return;e.preventDefault();
if(Date.now()<wl){acc=0;return}clearTimeout(accT);acc+=dy;accT=setTimeout(()=>acc=0,200);
if(Math.abs(acc)>=40){const d=acc>0?1:-1;acc=0;wl=Date.now()+1100;go(idx+d)}},{passive:false});
addEventListener('keydown',e=>{if(cover.hidden||(e.target.closest&&e.target.closest('input,textarea,select')))return;
if(['ArrowRight','ArrowDown','PageDown'].includes(e.key)){e.preventDefault();go(idx+1)}else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(idx-1)}});
let sx=0,sy=0;cover.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
cover.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(idx+(dx<0?1:-1))},{passive:true});
paint();
}
