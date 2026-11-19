/* ================= Flick embed ================= */
function tagDoc(slotId, b){
  // The bridge runs before the Flick. It reports render status, option switches and click-throughs
  // to this page, and gives the page a mute switch so sound can never keep playing off screen.
  const bridge = `(function(){var av=function(s){return /av01|av1/i.test(String(s||''))};try{if(window.VideoDecoder&&VideoDecoder.isConfigSupported){var o=VideoDecoder.isConfigSupported.bind(VideoDecoder);VideoDecoder.isConfigSupported=function(q){return q&&av(q.codec)?Promise.resolve({supported:false,config:q}):o(q)}}}catch(e){}try{var mc=navigator.mediaCapabilities;if(mc&&mc.decodingInfo){var od=mc.decodingInfo.bind(mc);mc.decodingInfo=function(q){return q&&q.video&&av(q.video.contentType)?Promise.resolve({supported:false,smooth:false,powerEfficient:false}):od(q)}}}catch(e){}})();
(function(){var S=${JSON.stringify(slotId)},RD=0;function t(m){m.flam=1;m.slot=S;try{parent.postMessage(m,"*")}catch(e){}}
function deep(root,sel,out){try{var a=root.querySelectorAll(sel);for(var i=0;i<a.length;i++)out.push(a[i]);var all=root.querySelectorAll("*");for(var j=0;j<all.length;j++)if(all[j].shadowRoot)deep(all[j].shadowRoot,sel,out)}catch(e){}return out}
/* ---- sound guard: starts silenced; the host page un-silences only the Flick that is on screen ---- */
var M=true,E=[],G=[];
function reg(el){if(E.indexOf(el)<0){E.push(el);el.addEventListener("volumechange",function(){if(M&&!el.muted){el.__fm=1;el.muted=true}})}}
function apply(){var m=deep(document,"video,audio",[]);for(var q=0;q<m.length;q++)reg(m[q]);for(var i=0;i<E.length;i++){var el=E[i];if(M){if(!el.muted){el.__fm=1;el.muted=true}}else if(el.__fm){el.__fm=0;el.muted=false}}for(var k=0;k<G.length;k++){try{G[k].gain.value=M?0:1}catch(e){}}}
try{var op=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){reg(this);if(M&&!this.muted){this.__fm=1;this.muted=true}return op.apply(this,arguments)}}catch(e){}
try{if(window.AudioNode){var oc=AudioNode.prototype.connect,odc=AudioNode.prototype.disconnect;
var gf=function(ctx){if(!ctx.__fg){var g=ctx.createGain();g.gain.value=M?0:1;oc.call(g,ctx.destination);ctx.__fg=g;G.push(g)}return ctx.__fg};
AudioNode.prototype.connect=function(d){if(d&&this.context&&d===this.context.destination){var a=Array.prototype.slice.call(arguments);a[0]=gf(this.context);return oc.apply(this,a)}return oc.apply(this,arguments)};
AudioNode.prototype.disconnect=function(d){if(d&&this.context&&d===this.context.destination&&this.context.__fg){var a=Array.prototype.slice.call(arguments);a[0]=this.context.__fg;return odc.apply(this,a)}return odc.apply(this,arguments)}}}catch(e){}
window.__flamMuted=function(){return M};
window.addEventListener("message",function(e){var d=e.data;if(!d||d.flamCmd!=="mute")return;M=!!d.on;apply()});
setInterval(function(){if(M)apply()},700);
/* ---- click-throughs stay inside the app ---- */
window.__vxOpen=function(u){t({type:"cta",url:u||""});return true};
window.ExitApi={exit:function(n,u){t({type:"cta",url:u||""})}};
window.open=function(u){t({type:"cta",url:String(u||"")});return null};
document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[target=_blank]");if(a){e.preventDefault();t({type:"cta",url:a.href});return}
var p=e.composedPath?e.composedPath():[],inP=false;for(var i=0;i<p.length;i++){var n=p[i];if(!n||!n.tagName)continue;var g=n.tagName;if(g==="BUTTON"||g==="A"||g==="INPUT"||g==="SELECT"||(n.getAttribute&&n.getAttribute("role")==="button"))return;if(g==="VERTEX-PLAYER"){inP=true;break}}if(inP)t({type:"tap"})},true);
function ready(){if(RD)return;RD=1;t({type:"ready"})}
function hook(v){if(v.__flam)return;v.__flam=1;
v.addEventListener("vertex-ready",ready);
v.addEventListener("vertex-error",function(e){var d=e.detail||{};if(d.recovered||d.severity==="warning")return;t({type:"error",msg:(d.message||d.code||"render error")+""})});
v.addEventListener("vertex-cta",function(e){var d=e.detail||{};t({type:"cta",url:d.url||""})});
v.addEventListener("vertex-diff-change",function(e){var d=e.detail||{};var x=d.diff!=null?d.diff:(d.diffId!=null?d.diffId:d.diff_id);t({type:"switch",diff:+x||0,initial:!!d.initial})});}
/* The app shows its own button beside each Flick, so the Flick's built-in button is hidden. The option switcher and the sound button are never touched:
   the rule only goes in when the player has a recognisable switcher, and it excludes the switcher and anything holding it. */
function nocta(ps){for(var i=0;i<ps.length;i++){try{var r=ps[i].shadowRoot;if(!r||r.querySelector("style[data-nocta]"))continue;
if(!r.querySelector(".vx-swatch,.vx-picker,[data-vertex-diff]"))continue;
var st=document.createElement("style");st.setAttribute("data-nocta","");
st.textContent="[data-vertex-trigger]:not(.vx-swatch):not(.vx-picker):not([data-vertex-diff]):not(.vx-picker *):not(:has(.vx-swatch,.vx-picker,[data-vertex-diff])){visibility:hidden!important;opacity:0!important;pointer-events:none!important}";
r.appendChild(st)}catch(e){}}}
var until=Date.now()+6e4;(function again(){var ps=deep(document,"vertex-player",[]);for(var i=0;i<ps.length;i++)hook(ps[i]);nocta(ps);
if(!RD){for(var k=0;k<ps.length;k++){try{var vd=ps[k].shadowRoot&&ps[k].shadowRoot.querySelector("video");if(vd&&vd.readyState>=2){ready();break}}catch(e){}}}
if(Date.now()<until)setTimeout(again,250)})();
try{new MutationObserver(function(){var v=document.querySelector("vertex-player");if(v)hook(v)}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
window.addEventListener("error",function(e){var s=e.target;if(s&&s.tagName==="SCRIPT")t({type:"error",msg:"The Flick could not be loaded"})},true);
t({type:"boot"});})();`;
  const cfg = TAGCFG[b.cfg] || "";
  const src = /^[\w-]+:\/\/[^"'<>\s]+$/.test(b.src) ? b.src : "";
  return `<!doctype html>
<meta charset=utf-8>
<meta name=ad.orientation content=portrait,landscape>
<style>html,body{margin:0;height:100%;background:${b.bg||"#15161b"};overflow:hidden}</style>
<script>${bridge}<\/script>
<script>var ExitApi=window.ExitApi||{exit:function(){}},clickTag="\${CLICK_URL_UNESC}";<\/script>
${cfg}
<script src="${src}"><\/script>`;
}

let SLOTS = {};
const VMEM = {}; let CURH = "#/home";
// cta: what the app's button for this Flick does. tap: whether a plain tap on the video opens the product page.
function flick(id, brand, opt={}){
  const b = BRANDS[brand], v = opt.v != null ? opt.v : (VMEM[CURH+"|"+id] || 0);
  SLOTS[id] = { id, brand, v, want:v, ready:false, error:false, mounted:false, on:opt.on||null, cta:opt.cta||"pdp", tap:!!opt.tap, lastCta:0, muted:null, timer:null };
  return `<div class="flick ${b.tall?"tall":""}" data-slot="${id}"><div class="fstate"></div></div>`;
}
const baseOf = b => b.tall ? [360,640] : [540,540];
function mount(host){
  const s = SLOTS[host.dataset.slot]; if(!s || s.mounted || s.error) return;
  s.mounted = true; s.ready = false; s.muted = null;
  const b = BRANDS[s.brand], [bw,bh] = baseOf(b);
  const f = document.createElement("iframe");
  f.title = `${b.name} Flick`; f.setAttribute("allow","autoplay; fullscreen; encrypted-media"); f.setAttribute("scrolling","no");
  f.style.width = bw+"px"; f.style.height = bh+"px";
  f.srcdoc = tagDoc(s.id, b);
  host.prepend(f); fitFlick(host);
  clearTimeout(s.timer);
  s.timer = setTimeout(()=>{ if(s.ready||s.error||!s.mounted) return;
    host.querySelector(".fstate")?.classList.add("hide");
    if(!host.querySelector(".fwarn")) host.insertAdjacentHTML("beforeend",`<button class="fwarn" onclick="retryFlick('${s.id}')">Still loading. Tap to retry</button>`);
  }, 12000);
}
function unmount(host){
  const s = SLOTS[host.dataset.slot]; if(!s || !s.mounted) return;
  clearTimeout(s.timer); s.mounted = false; s.ready = false; s.muted = null; s.want = s.v;
  // Removing the frame destroys the player and anything inside it, so nothing can keep playing.
  host.querySelector("iframe")?.remove(); host.querySelector(".fwarn")?.remove();
  const st = host.querySelector(".fstate"); if(st) st.className = "fstate";
}
function retryFlick(id){ const host = $(`.flick[data-slot="${id}"]`), s = SLOTS[id]; if(!host||!s) return; s.error=false; unmount(host); const st=host.querySelector(".fstate"); st.className="fstate"; st.innerHTML=""; mount(host); audit(); }
function fitFlick(host){ const f = host.querySelector("iframe"), s = SLOTS[host.dataset.slot]; if(!f||!s) return; const [bw] = baseOf(BRANDS[s.brand]); const w = host.clientWidth; if(w) f.style.transform = `scale(${w/bw})`; }
const frameWin = host => host.querySelector("iframe")?.contentWindow;
function swatchFor(id, i){
  try{ const r = $(`.flick[data-slot="${id}"] iframe`).contentDocument.querySelector("vertex-player").shadowRoot;
    return Array.from(r.querySelectorAll("button[data-vertex-diff]")).find(b=>+b.getAttribute("data-vertex-diff")===i) || r.querySelectorAll(".vx-swatch")[i] || null; }catch(e){ return null; }
}
// Switch the Flick from the app's own UI (option chips, product tiles under the video).
function setVariant(id, i){ const s = SLOTS[id]; if(!s) return; s.want = i; if(s.ready){ const sw = swatchFor(id, i); if(sw) sw.click(); } applyVariant(id, i); }
function applyVariant(id, i){
  const s = SLOTS[id]; if(!s) return; const b = BRANDS[s.brand]; if(!b.variants) return; const n = b.variants.length; i = Math.max(0, Math.min(i, n-1));
  const changed = s.v !== i; s.v = i; VMEM[CURH+"|"+id] = i;
  const v = b.variants[i], pid = `${s.brand}-${i}`;
  $$(`[data-sn="${id}"]`).forEach(e=>e.textContent = vname(s.brand,i));
  $$(`[data-sv="${id}"]`).forEach(e=>e.textContent = vshort(s.brand,i));
  $$(`[data-sp="${id}"]`).forEach(e=>e.innerHTML = v.p ? priceHTML(v.p) : "");
  $$(`[data-sd="${id}"] i`).forEach((e,j)=>e.classList.toggle("on", j===i));
  $$(`[data-sync="${id}"]`).forEach(e=>e.classList.toggle("on", +e.dataset.i===i));
  if(changed) $$(`[data-spop="${id}"]`).forEach(e=>{ e.classList.remove("pop"); void e.offsetWidth; e.classList.add("pop"); });
  if(s.on) s.on(i, changed);
}
window.addEventListener("message", e=>{
  const m = e.data; if(!m || m.flam!==1) return; const s = SLOTS[m.slot]; if(!s) return;
  const host = $(`.flick[data-slot="${m.slot}"]`); if(!host || e.source !== frameWin(host)) return;
  if(m.type==="boot"){ s.muted = null; audit(); }
  else if(m.type==="ready"){ s.ready = true; clearTimeout(s.timer); host.querySelector(".fstate")?.classList.add("hide"); host.querySelector(".fwarn")?.remove();
    if(s.want) setTimeout(()=>setVariant(m.slot, s.want), 80); s.muted = null; audit(); }
  else if(m.type==="error"){ s.error = true; s.mounted = false; clearTimeout(s.timer); host.querySelector("iframe")?.remove(); host.querySelector(".fwarn")?.remove();
    const st = host.querySelector(".fstate"); st.className = "fstate err";
    st.innerHTML = `<div><b>Flick didn't load</b>${esc(m.msg)}<br><button class="fretry" onclick="retryFlick('${s.id}')">Retry</button></div>`; }
  else if(m.type==="switch"){ if(m.initial && s.want) return; applyVariant(m.slot, m.diff); }
  else if(m.type==="cta" || m.type==="tap"){ const now = Date.now(); if(now - s.lastCta < 900) return; s.lastCta = now;
    if(m.type==="tap"){ if(s.tap) ctaGo(m.slot); return; }
    ctaGo(m.slot, m.url || ""); }
});

/* ---- mount and sound control ----
   Flicks are started well before they scroll into view so they are already playing when they arrive, and only the nearest few are kept running.
   A Flick can be heard only while at least half of it is on screen, in front, with the tab visible. */
const MAXLIVE = matchMedia("(pointer: coarse)").matches ? 4 : 6;
const CLIP = /(^|\s)(scr|row|hero|vm|pager|shb)(\s|$)/;
function vis(h){
  const r = h.getBoundingClientRect(), a = r.width*r.height; if(!a) return {ratio:0, dist:1e9};
  let x1=r.left, y1=r.top, x2=r.right, y2=r.bottom, dist=0;
  for(let p=h.parentElement; p; p=p.parentElement){
    if(p===APP || CLIP.test(p.className||"")){ const q = p.getBoundingClientRect();
      dist = Math.max(dist, q.left-r.right, r.left-q.right, q.top-r.bottom, r.top-q.bottom);
      x1=Math.max(x1,q.left); y1=Math.max(y1,q.top); x2=Math.min(x2,q.right); y2=Math.min(y2,q.bottom); }
    if(p===APP) break;
  }
  return {ratio: Math.max(0,x2-x1)*Math.max(0,y2-y1)/a, dist};
}
function audit(){
  const ov = OVER.classList.contains("on"); let best=null, bestR=0; const list=[], cand=[];
  $$(".flick[data-slot]", APP).forEach(h=>{ const s = SLOTS[h.dataset.slot]; if(!s) return; const {ratio,dist} = vis(h); const over = !!h.closest("#over");
    const ok = ratio >= .5 && !document.hidden && (!ov || over) && !document.body.classList.contains("splash");   // nothing is heard under the launch screen
    cand.push([dist - ratio*1000 - (over?5000:0), h, dist, ratio]);
    list.push([h,s]); if(ok && ratio + (over?1:0) > bestR){ bestR = ratio + (over?1:0); best = s; } });
  cand.sort((a,b)=>a[0]-b[0]).forEach(([_,h,dist,ratio],i)=>{ if(dist < 900 && (i < MAXLIVE || ratio > 0)) mount(h); else if(dist > 1500 || (i >= MAXLIVE && ratio === 0)) unmount(h); });
  list.forEach(([h,s])=>{ if(!s.mounted) return; const mute = s !== best; if(s.muted === mute) return; s.muted = mute; try{ frameWin(h).postMessage({flamCmd:"mute", on:mute}, "*"); }catch(e){} });
}
let auditT=0; const sched = () => { if(auditT) return; auditT = setTimeout(()=>{ auditT=0; audit(); }, 90); };
APP.addEventListener("scroll", sched, true);
addEventListener("resize", ()=>{ $$(".flick[data-slot]").forEach(fitFlick); sched(); });
document.addEventListener("visibilitychange", audit);
addEventListener("pagehide", ()=>$$(".flick[data-slot]").forEach(unmount));
setInterval(audit, 1200);

