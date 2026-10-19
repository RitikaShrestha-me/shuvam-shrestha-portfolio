/* Shared helpers used by every module. */
const $=id=>document.getElementById(id);
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches; // visitor prefers reduced motion
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));  // escape text for HTML
