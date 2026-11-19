/* ================= helpers ================= */
const $ = (s,r=document) => r.querySelector(s), $$ = (s,r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const num = n => Number(n).toLocaleString("en-IN");
const priceHTML = p => "";
const sv = (d,w=20,sw=1.9) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const fl = (d,w=18) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d}</svg>`;
const I = {
  search:sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.500-3.500"/>'), back:sv('<path d="M19 12H5M11 6l-6 6 6 6"/>',22), right:sv('<path d="M9 6l6 6-6 6"/>',16),
  user:sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.500 18.500a6.500 6.500 0 0 1 11 0"/>',22,1.7), x:sv('<path d="M6 6l12 12M18 6L6 18"/>',16,2.2),
  plus:sv('<path d="M12 5v14M5 12h14"/>',18), minus:sv('<path d="M5 12h14"/>',16), check:sv('<path d="M5 12.500l4.500 4.500L19 7.500"/>',18,2.2), share:sv('<path d="M14 5l6 6-6 6M20 11H10a6 6 0 0 0-6 6v2"/>',20),
  up:sv('<path d="M6 15l6-6 6 6"/>',14,2.2), down:sv('<path d="M6 9l6 6 6-6"/>',18,2.2), mic:sv('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',15),
  cast:sv('<path d="M3 8V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6"/><path d="M3 12a7 7 0 0 1 7 7M3 16a3 3 0 0 1 3 3"/>',20,1.7), bag:sv('<path d="M6 8h12l1 12H5zM9 8V6a3 3 0 0 1 6 0v2"/>',20),
  heart:sv('<path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.600A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>',22), dl:sv('<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',20), smile:sv('<circle cx="12" cy="12" r="9"/><path d="M8.500 14a4 4 0 0 0 7 0M9 9.500h.01M15 9.500h.01"/>',20),
  play:fl('<path d="M8 5v14l11-7z"/>'), pause:fl('<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>'), vol:sv('<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16.500 9a4 4 0 0 1 0 6M19 6.500a8 8 0 0 1 0 11"/>',20), mute:sv('<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 9.500l5 5M22 9.500l-5 5"/>',20),
  rw:sv('<path d="M11 7L6 12l5 5M18 7l-5 5 5 5"/>',22), ff:sv('<path d="M13 7l5 5-5 5M6 7l5 5-5 5"/>',22), lock:sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',11,2.2), reload:sv('<path d="M20 12a8 8 0 1 1-2.300-5.600M20 4v5h-5"/>',18), tag:sv('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1.200"/>',15),
  star:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.500l1.500 7.200 5.700-4.200-3.600 5.800 6.900 1.700-6.900 1.700 2.100 4.600-4.600-2.900L12 22.500l-1.100-7.100-4.600 2.900 2.100-4.600L1.500 12l6.900-1.700-3.600-5.800 5.700 4.200z"/></svg>`
};
const APP = $("#app"), VIEW = $("#view"), OVER = $("#over");
const av = k => `<i class="av" style="background:${BRANDS[k].avc}">${esc(BRANDS[k].av)}</i>`;
const dots = (id,n=3) => `<span class="dots" data-sd="${id}">${Array.from({length:n},(_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</span>`;
function toast(t){ const el=$("#toast"); el.textContent=t; el.classList.add("on"); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove("on"),2300); }
const out = what => toast(`${what} is outside this demo`);
const pic = (k,alt="") => IMG[k] ? `<img src="${IMG[k][2]}" width="${IMG[k][0]}" height="${IMG[k][1]}" alt="${esc(alt)}" draggable="false" loading="lazy">` : "";

/* ================= watchlist ================= */
const WL = new Set();
function wlToggle(id, ev){ if(ev) ev.stopPropagation(); const on = !WL.has(id); on ? WL.add(id) : WL.delete(id);
  $$(`[data-wl="${id}"]`).forEach(e=>{ e.classList.toggle("on", on); const ic = e.querySelector("i"); if(ic) ic.innerHTML = on ? I.check : I.plus; });
  toast(on ? `Added to Watchlist: ${TT[id].n}` : "Removed from Watchlist"); }

/*ENGINE*/

/* ================= what the app's button for a Flick does ================= */
function ctaGo(id, url){ const s = SLOTS[id]; if(!s) return; const b = BRANDS[s.brand];
  if(b.kind === "watch") return go("#/reel/delivery"); if(b.kind !== "site") return;
  if(url !== undefined){ clearTimeout(s.urlT); s.asked = 0; return openSite(s.brand, url || b.home); }      // the Flick answered with its own link
  // Ask the Flick for its own link by pressing its own (hidden) button for the option on screen; it answers through the same message a tap on it would send.
  s.asked = Date.now(); const pressed = pressOwn(id); clearTimeout(s.urlT);
  s.urlT = setTimeout(()=>{ if(s.asked){ s.asked = 0; openSite(s.brand, b.home); } }, pressed ? 800 : 0); }
function pressOwn(id){ try{ const f = $(`.flick[data-slot="${id}"] iframe`, APP), w = f.contentWindow, d = f.contentDocument;
    const find = root => { for(const e of root.querySelectorAll("*")){ if(e.tagName === "VERTEX-PLAYER" && e.shadowRoot) return e; if(e.shadowRoot){ const x = find(e.shadowRoot); if(x) return x; } } return null; };
    const vp = find(d); if(!vp) return false; const r = vp.shadowRoot;
    const ts = Array.from(r.querySelectorAll("[data-vertex-trigger]")).filter(e=>!e.matches(".vx-swatch,[data-vertex-diff]") && !e.closest(".vx-picker"));
    const t = ts.find(e=>w.getComputedStyle(e).display !== "none") || ts[0]; if(!t) return false; t.click(); return true; }catch(e){ return false; } }
// A Flick with two options shows two dots: the dots are matched to the Flick once its slot is known.
function fixDots(){ $$("[data-sd]", APP).forEach(d=>{ const s = SLOTS[d.dataset.sd]; if(!s) return; const n = BRANDS[s.brand].variants.length; if(d.children.length === n) return;
  d.innerHTML = Array.from({length:n},(_,i)=>`<i class="${i===s.v?"on":""}"></i>`).join(""); }); }

/* ================= building blocks ================= */
const stpad = () => `<div class="stpad"></div>`;
const ctaBtn = (id,k,cls) => { const b = BRANDS[k]; return b.kind === "none" ? "" : `<button class="${cls}" onclick="ctaGo('${id}')">${esc(b.cta)}</button>`; };
// A cut from the real app shown as it is, with tap areas over its buttons. zones: [left%, top%, width%, height%, handler, label]
const slice = (k, zones, anchor, cls="") => `<div class="slice ${cls}" ${anchor?`data-anchor="${anchor}"`:""} style="aspect-ratio:${IMG[k][0]}/${IMG[k][1]}"><img src="${IMG[k][2]}" alt="" draggable="false">${(zones||[]).map(z=>`<button class="hs" style="left:${z[0]}%;top:${z[1]}%;width:${z[2]}%;height:${z[3]}%" onclick="${z[4]}" aria-label="${esc(z[5]||"Open")}"></button>`).join("")}</div>`;
const header = on => `<div class="top">${slice(on==="tadka"?"hd_tadka":"hd_home",[[3,8,46,84,"go('#/home')","JioHotstar"],[51,8,46,84,"go('#/tadka')","Tadka"]])}</div>`;
const TABN = {tv:"TV", movies:"Movies", sports:"Sports"};
function nav(on, tab){
  const home = on==="tadka" ? `<b class="tk">T</b>` : I.star;
  const filt = !["home","tv","movies","sports"].includes(on) ? "" : tab
    ? `<div class="fpill"><div class="fp"><button class="on" onclick="go('#/${tab}')">${TABN[tab]}</button></div><button class="fx" onclick="go('#/home')" aria-label="Clear filter">${I.x}</button><button class="ask" onclick="out('Ask')">${I.mic}Ask</button></div>`
    : `<div class="fpill"><div class="fp">${Object.keys(TABN).map(k=>`<button onclick="go('#/${k}')">${TABN[k]}</button>`).join("")}<i>${I.up}</i></div><button class="ask round" onclick="out('Ask')" aria-label="Ask">${I.mic}</button></div>`;
  const it = [[["home","tv","movies","sports","tadka"].includes(on), on==="tadka"?"#/tadka":"#/home", home, "Home"],[on==="search","#/search",I.search,"Search"],[on==="space","#/space",I.user,"My Space"]];
  return `${filt}<nav class="nav">${it.map(([a,h,ic,l])=>`<button class="nb ${a?"on":""}" onclick="go('${h}')" aria-label="${l}">${ic}${a?`<span>${l}</span>`:""}</button>`).join("")}</nav>`; }
const sec = (title, body, sub) => `<section class="sec"><h2>${title}</h2>${sub?`<div class="sub">${sub}</div>`:""}${body}</section>`;
const poster = (id, cls="") => { const x = TT[id]; return `<button class="po ${cls}" onclick="go('#/t/${id}')" aria-label="${esc(x.n)}">${pic(x.img, x.n)}</button>`; };
const rail = (title, ids, sub) => sec(title, `<div class="row">${ids.map(id=>poster(id)).join("")}</div>`, sub);
const top10 = (title, ids, chips) => sec(title, `${chips?`<div class="chips">${chips.map((c,i)=>`<button class="chip ${i?"":"on"}" onclick="chipOn(this)">${c}</button>`).join("")}</div>`:""}<div class="row t10">${ids.map((id,i)=>`<div class="tn"><b>${i+1}</b>${poster(id)}</div>`).join("")}</div>`);
const lrail = (title, keys) => sec(title, `<div class="row">${keys.map(k=>`<button class="lt" onclick="go('#/watch/${k}')">${pic(k, CLIPS[k][0])}<span>${esc(CLIPS[k][0])}</span></button>`).join("")}</div>`);
const trail = (title, keys, fn) => sec(title, `<div class="row">${keys.map(k=>`<button class="tt" onclick="${fn}">${pic(k)}</button>`).join("")}</div>`);
function chipOn(el){ $$(".chip", el.parentElement).forEach(c=>c.classList.toggle("on", c===el)); }
const hdots = (id, n) => `<div class="hdots" data-hd="${id}">${Array.from({length:n},(_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`;

// Masthead: the swipeable banner at the top of a tab. A Flick card or one of the app's own banners.
function mastFlick(id, k, anchor){ const b = BRANDS[k];
  return `<div class="mcard" data-anchor="${anchor}">${flick(id,k)}<div class="mstrip" data-spop="${id}">${av(k)}<div class="mt"><b>${esc(b.head)}</b><span>Sponsored · ${esc(b.name)} · <em data-sv="${id}">${esc(vshort(k,0))}</em></span></div>${ctaBtn(id,k,"mbtn")}</div></div>`; }
const mastCut = (k, fn, label) => `<div class="mcard cut">${slice(k,[[0,0,100,82,fn,label],[66,84,32,14,fn,label]])}</div>`;
const mast = (id, cards) => `<div class="hero mast" data-hero="${id}">${cards.join("")}</div>${hdots(id, cards.length)}`;
// For You: the tall swipeable cards. A cut of the app's card with its buttons live, or a Flick card of the same size.
const fyCut = (k, id, label) => `<div class="fcard">${slice(k,[[0,0,100,84,`go('#/t/${id}')`,TT[id].n],[3,86,77,12,TT[id].sub?`out('Subscriptions')`:`go('#/watch/${id}')`,label||"Watch Now"],[82,86,15,12,`wlToggle('${id}')`,"Watchlist"]])}</div>`;
const fyClip = (k, clip) => `<div class="fcard">${slice(k,[[0,0,100,84,`go('#/watch/${clip}')`,"Watch"],[3,86,94,12,`go('#/watch/${clip}')`,"Watch Now"]])}</div>`;
function fyFlick(id, k, anchor){ const b = BRANDS[k], v = b.variants[0];
  return `<div class="fcard ad" data-anchor="${anchor}">${flick(id,k)}<div class="fb" data-spop="${id}"><div class="fl1"><span class="spill">Sponsored</span>${av(k)}<b>${esc(b.name)}</b>${dots(id)}</div>
  <div class="fl2"><span><em data-sv="${id}">${esc(vshort(k,0))}</em></span></div>
  ${ctaBtn(id,k,"wbtn")}</div></div>`; }
const fy = (id, cards) => `<div class="fyh"><h2>For You</h2><button onclick="out('Casting')" aria-label="Cast">${I.cast}</button></div><div class="hero fy" data-hero="${id}">${cards.join("")}</div>`;
// Billboard: a full-width banner between two rails.
function bill(id, k, anchor){ const b = BRANDS[k], v = b.variants[0];
  return `<div class="bill" data-anchor="${anchor}">${flick(id,k)}<div class="mstrip" data-spop="${id}">${av(k)}<div class="mt"><b>${esc(b.head)}</b><span>Sponsored · ${esc(b.name)} · <em data-sv="${id}">${esc(vshort(k,0))}</em></span></div>${ctaBtn(id,k,"mbtn")}</div></div>`; }
const banner = (k, fn) => `<button class="ban" onclick="${fn}">${pic(k)}</button>`;
// Shop the Look: a rail of vertical videos, each one a look that can be bought.
function lookCard(id, k, anchor){ const b = BRANDS[k], v = b.variants[0];
  return `<div class="lcard" ${anchor?`data-anchor="${anchor}"`:""}>${flick(id,k)}<div class="lb" data-spop="${id}"><div class="l1">${av(k)}<b>${esc(b.name)}</b>${dots(id)}</div><div class="l2"><em data-sv="${id}">${esc(vshort(k,0))}</em></div>${ctaBtn(id,k,"wbtn sm")}</div></div>`; }
// The options of a Flick as name and price under it. They only show which one the Flick is on: the option is changed inside the Flick, never from here.
const mini = (id,k,i) => { const v = BRANDS[k].variants[i]; return `<div class="mini ${i?"":"on"}" data-sync="${id}" data-i="${i}"><span>${esc(vshort(k,i))}</span></div>`; };
const minis = (id,k) => `<div class="minis">${BRANDS[k].variants.map((_,i)=>mini(id,k,i)).join("")}</div>`;

/* ================= screens ================= */
const HOME = {
  home: () => `
    ${mast("m-home",[mastFlick("mast","outfit","mast"), mastFlick("mast2","eye","mast2"), mastCut("m_tv","out('JioHotstar on TV')","Explore Now"), mastCut("m_mahabharat","out('The teaser')","Teaser")])}
    ${fy("f-home",[fyCut("h_biggboss","biggboss"), fyFlick("fy","lip","fy"), fyClip("h_bumrah","l_wtc"), fyCut("h_moana","moana","Subscribe to Watch"), fyFlick("fy2","nike","fy2"), fyCut("h_queen","queen"), fyCut("h_apsara","apsara")])}
    ${rail("New on JioHotstar",["office","chiranjeevi","dilwaniya","hanuman","imgame","roslin"])}
    ${slice("k_free",[[3,49,31,47,"go('#/t/biggboss')","Bigg Boss"],[35,49,31,47,"go('#/t/yehrishta')","Yeh Rishta Kya Kehlata Hai"],[67,49,31,47,"go('#/t/anupamaa')","Anupamaa"]])}
    ${sec("Shop the Look", `<div class="row looks">${lookCard("shop","neck","shop")}${lookCard("shop2","gucci")}${lookCard("shop3","zara")}</div>`, "Sponsored · Styles from the shows you watch")}
    ${banner("b_biggboss","go('#/t/biggboss')")}
    ${top10("Top 10 in India Today",["biggboss","dhamaal","roadies","anupamaa","yehrishta","laughterchefs"],["All","Hindi","English","Tamil","Telugu","Malayalam"])}
    ${bill("bill","can","bill")}
    ${rail("Peacock's Finest",["koffee","obsession","suits","wolf","beautifuldisaster"])}
    ${rail("Captain Cool Club",["msdhoni","roarlion","83"])}
    ${rail("Star Maa Shows",["mahabharatham","starmaa2","bbtelugu"])}
    ${lrail("Non-Stop Sports",["l_dhoni7","l_wtc","l_stumpings","l_finishes"])}
    ${lrail("Enter the Bigg Boss House",["l_bb24","l_bbday72"])}
    ${slice("k_peacock",[[3,48,31,50,"go('#/t/obsession')","Obsession"],[35,48,31,50,"out('Oppenheimer')","Oppenheimer"],[67,48,31,50,"out('Michael')","Michael"]])}
    ${sec("Popular Shows", `<div class="chips">${["All","Romance","Drama","Thriller","Horror","Comedy"].map((c,i)=>`<button class="chip ${i?"":"on"}" onclick="chipOn(this)">${c}</button>`).join("")}</div><div class="row">${["biggboss","anupamaa","yehrishta","heartbeat","sangamarmar","koffee"].map(id=>poster(id)).join("")}</div>`)}`,
  tv: () => `
    ${mast("m-tv",[mastFlick("mast","westelm","mast"), mastCut("m_arunachal","out('Arunachal League')","Explore"), mastCut("m_dilki","out('The trailer')","Trailer")])}
    ${fy("f-tv",[fyCut("h_dhamaal","dhamaal"), fyFlick("fy","outfit","fy"), fyCut("h_biggboss","biggboss"), fyCut("h_queen","queen")])}
    ${trail("Popular Channels",["c_starplus","c_colors","c_vijay"],"out('Channel pages')")}
    ${top10("Top 10 Shows - Hindi",["biggboss","dhamaal","roadies","laughterchefs","koffee","anupamaa"])}
    ${rail("Comedy Shows",["laughterchefs","dhamaal","perfectcrown","office"])}
    ${banner("b_premier","go('#/sports')")}
    ${lrail("Entertainment 24X7",["l_supersinger","l_kalakkal"])}
    ${rail("Must Watch Originals",["magicshiri","khalbali","honeymoon","heartbeat","roslin"])}
    ${rail("Real Lives, Unlimited Drama",["roadies","laughterchefs","koffee","biggboss"])}
    ${rail("House of Dramas",["heartbeat","roslin","sangamarmar","draarohi","fitoor"])}
    ${rail("The House of Bigg Boss!",["biggboss","bbkannada","bbtamil","bbtelugu"])}`,
  movies: () => `
    ${mast("m-mov",[mastFlick("mast","can","mast"), mastCut("m_mahabharat","out('The teaser')","Teaser")])}
    ${fy("f-mov",[fyCut("h_bethlehem","bethlehem"), fyFlick("fy","dor","fy"), fyCut("h_obsession","obsession","Subscribe to Watch"), fyCut("h_moana","moana","Subscribe to Watch")])}
    ${banner("b_karan","go('#/t/koffee')")}
    ${rail("Hahaha Loading...",["wolf","dhadkan","beautifuldisaster","welcomejungle"])}
    ${top10("Top 10 Movies - Hindi",["varahi","kabirsingh","maainti","12th","drishyam","brahmastra"])}
    ${rail("Popular Movies",["maainti","ohsukumari","colony","paradha","badboy"])}
    ${rail("Date Night Watchlist",["askme","beautybeast","shiddat","kabirsingh","beautifuldisaster"])}
    ${bill("bill","lip","bill")}
    ${rail("Telugu Action: Gravity Optional",["liger","mirai","maainti","varahi"])}
    ${rail("New Movies for You",["imgame","welcomejungle","varahi","terrifier"])}
    ${rail("Top Rated on IMDb",["hanuman","doraemon","kabirsingh","12th","drishyam"])}
    ${rail("Pokémon World",["pokemon","pokemon2","pokemon3","doraemon"])}`,
  sports: () => `
    ${mast("m-sp",[mastFlick("mast","nike","mast"), mastCut("m_dhaichaal","out('The trailer')","Trailer")])}
    ${fy("f-sp",[fyClip("h_wtc","l_wtc"), fyFlick("fy","bk","fy"), fyClip("h_rcb","l_rcb"), fyClip("h_sandpaper","l_sp1")])}
    ${banner("b_arunachal","out('Arunachal League')")}
    ${trail("Popular Tournaments",["t_ipl","t_t10","t_domestic"],"out('Tournament pages')")}
    ${lrail("CSK Icon Dhoni Hangs Up His Boots",["l_stumpings","l_finishes","l_dhoni7"])}
    ${lrail("TATA IPL 2027 Retention Special",["l_mi","l_rcb"])}
    ${bill("bill","merc","bill")}
    ${lrail("Cricket Fraternity Reacts to Dhoni Retirement",["l_irfan","l_raina"])}
    ${lrail("MSD's Captaincy Masterstrokes",["l_drs","l_gut"])}
    ${lrail("Sandpapergate: The Unsettled Debate",["l_sp1","l_sp2"])}
    ${lrail("Follow the Blues: Exclusive Interviews",["l_aaryavir","l_virat"])}
    ${lrail("Abu Dhabi T10 2026",["l_t10a","l_t10b"])}`
};
const homeScreen = tab => `<div class="screen">${stpad()}${header("home")}<div class="scr" id="scr">${HOME[tab]()}</div>${nav(tab, tab==="home"?null:tab)}</div>`;

/* ---- Tadka: the micro-drama feed ---- */
// Tadka feed cards behave like the app's own: the cover shows for a second, then the card plays by itself, silent; the play button opens it full screen.
function tkCard(x, i){ const pv = x.preview ? ` data-pv="${x.preview}"` : "", hold = x.preview ? `<span class="tkv"></span>` : "";
  if(x.frame) return `<button class="tkc own fr"${pv} onclick="tkOpen('${x.id}',this)" aria-label="${esc(x.n)}"><span class="frt"><b>${esc(x.n)}</b><em>${esc(x.meta)}</em></span><img src="${x.poster}" alt="" onerror="this.remove()" draggable="false">${hold}<span class="bdg">${x.badge}</span><i class="pl">${I.play}</i></button>`;
  if(x.cut) return `<div class="tkc">${slice(x.img,[[0,0,100,100,`go('#/reel/${x.id}')`,x.n]])}</div>`;
  return `<button class="tkc own"${pv} onclick="tkOpen('${x.id}',this)" aria-label="${esc(x.n)}">${pic(x.img,x.n)}${hold}${x.badge?`<span class="bdg">${x.badge}</span>`:""}${x.video?`<span class="tkn"><b>${esc(x.n)}</b><em>${esc(x.meta)} · ${esc(x.tags)}</em></span>`:""}<i class="pl">${I.play}</i></button>`; }
let FEEDCUR = null, FEEDSINCE = 0;
const RSTART = {};   // where each micro-drama's preview had got to when it was opened
function tkOpen(id, c){ const v = c.querySelector(".tkv video"); if(v && !v.error && v.currentTime > 0){ RSTART[id] = v.currentTime; if(TADKA.find(t=>t.id===id).frame) BCT = v.currentTime; } go("#/reel/"+id); }
function feedStop(c){ const h = c.querySelector(".tkv"); if(!h || !h.firstChild) return; $$("video", h).forEach(reelDrop); h.classList.remove("live"); }
function feedStart(c){ const h = c.querySelector(".tkv"); if(!h || h.firstChild) return;
  const v = document.createElement("video"); v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true; v.preload = "auto"; v.setAttribute("muted",""); v.setAttribute("playsinline",""); v.src = c.dataset.pv;
  v.addEventListener("playing", ()=>h.classList.add("live")); v.addEventListener("error", ()=>{ h.classList.remove("live"); });
  h.appendChild(v); v.play().catch(()=>{}); }
function feedAuto(){ const sc = $(".tadka #scr", VIEW); if(!sc){ FEEDCUR = null; return; }
  const cards = $$(".tkc[data-pv]", sc), sr = sc.getBoundingClientRect(); let best = null, bv = 0;
  cards.forEach(c=>{ const r = c.getBoundingClientRect(), v = Math.max(0, Math.min(r.bottom, sr.bottom) - Math.max(r.top, sr.top)) / (r.height||1); if(v > bv){ bv = v; best = c; } });
  if(bv < .6 || document.hidden || OVER.classList.contains("on")) best = null;
  cards.forEach(c=>{ if(c !== best) feedStop(c); });
  if(best !== FEEDCUR){ FEEDCUR = best; FEEDSINCE = Date.now(); return; }
  if(best && Date.now() - FEEDSINCE >= 1000) feedStart(best); }
setInterval(feedAuto, 200);
function tkAd(id, k, anchor){ const b = BRANDS[k], v = b.variants[0];
  return `<div class="tkc ad" data-anchor="${anchor}"><div class="tkh">${av(k)}<div><b>${esc(b.name)}</b><span>${b.label||"Sponsored"}</span></div>${dots(id)}</div><div class="tkf">${flick(id,k)}</div>
  <div class="tkb" data-spop="${id}"><span><em data-sv="${id}">${esc(vshort(k,0))}</em></span>${ctaBtn(id,k,"wbtn sm")}</div></div>`; }
function tadkaScreen(){ const c = TADKA.map(tkCard); bcFetch();
  return `<div class="screen tadka">${stpad()}${header("tadka")}<div class="scr" id="scr">
  ${c[0]}${tkAd("tk1","grwm","tk1")}${c[1]}${c[2]}${c[3]}${tkAd("tk2","ugc","tk2")}${c[4]}${c[5]}${c[6]}
  ${sec("Latest on Tadka", `<div class="row">${[["tr_reality","reality"],["tr_shehzada","ceo"],["tr_saanp","redsilk"]].map(([k,id])=>`<button class="po tall" onclick="go('#/reel/${id}')">${pic(k)}</button>`).join("")}${["delivery","ceo","redsilk"].map(id=>`<button class="po tall" onclick="go('#/reel/${id}')">${pic("o_"+id)}</button>`).join("")}</div>`)}
  </div>${nav("tadka")}</div>`; }

/* ---- Tadka player: full-screen vertical episodes, with a full-screen ad between them ---- */
const REEL_ADS = ["gucci","neck","zara"];
function reelSlides(){ const s = []; let n = 0; TADKA.forEach(x=>{ s.push({md:x}); if(!x.frame && n < REEL_ADS.length){ s.push({ad:REEL_ADS[n], anchor:"r"+(n+1)}); n++; } }); return s; }
let RS = [], RCUR = -1, RLANG = "English", RMUTED = false, RLIKE = {};
function reelScreen(id){ RS = reelSlides(); RCUR = -1; bcFetch();
  return `<div class="screen reel"><button class="rback" onclick="back()" aria-label="Back">${I.back}</button><div class="pager" id="pager">${RS.map((s,i)=> s.ad ? reelAd(s,i) : reelMd(s.md,i)).join("")}</div></div>`; }
function reelMd(x, i){
  if(x.frame) return `<section class="rs md fr" data-i="${i}" data-md="${x.id}" data-anchor="bc"><div class="rfr"></div></section>`;
  return `<section class="rs md" data-i="${i}" data-md="${x.id}" onclick="reelTap(event)"><div class="rbg ${x.cut?"cutbg":""}">${pic(x.img)}</div><div class="rvid"></div><div class="rshade"></div>
  <div class="rrail"><button onclick="reelLike('${x.id}',this)" class="${RLIKE[x.id]?"on":""}">${I.heart}<span>${RLIKE[x.id]?"12.5K":"12.4K"}</span></button><button onclick="out('Sharing')">${I.share}<span>Share</span></button>${x.video?`<button data-rmute onclick="reelMute()">${RMUTED?I.mute:I.vol}<span>Sound</span></button>`:""}</div>
  <div class="rinfo"><button class="shopchip" data-anchor="rshop-${i}" onclick="openScene('neck','${esc(x.n)}')">${I.tag} Shop the look</button><h3>${esc(x.n)}</h3><p>Ep 1 · ${esc(x.meta)} · ${esc(x.tags)}</p>
  ${x.video?`<div class="langs">${LANGS.map(([id,l])=>`<button class="${id===RLANG?"on":""}" data-lang="${id}" onclick="reelLang('${id}')">${l}</button>`).join("")}</div>`:""}
  <div class="rprog"><i></i></div></div></section>`; }
function reelAd(s, i){ const k = s.ad, b = BRANDS[k], id = "reel-"+k, v = b.variants[0];
  return `<section class="rs ad" data-i="${i}" data-anchor="${s.anchor}"><div class="rah">${av(k)}<div><b>${esc(b.name)}</b><span>Sponsored</span></div>${dots(id)}</div><div class="rfl">${flick(id,k)}</div>
  <div class="raf" data-spop="${id}"><span class="rv"><em data-sv="${id}">${esc(vshort(k,0))}</em></span><div class="rbt">${ctaBtn(id,k,"wbtn")}<button class="wbtn ghost" onclick="reelGo(${i+1})">Next episode ${I.down}</button></div></div></section>`; }
function reelFit(){ $$(".rs.ad", VIEW).forEach(s=>{ const box = s.querySelector(".rfl"), f = box.querySelector(".flick"); const w = Math.floor(Math.min(box.clientWidth, box.clientHeight*9/16)); f.style.width = w+"px"; fitFlick(f); }); }
function reelGo(i){ const p = $("#pager"); if(!p) return; i = Math.max(0, Math.min(RS.length-1, i)); p.scrollTo({top:i*p.clientHeight, behavior:"smooth"}); }
function reelActivate(){ const p = $("#pager"); if(!p) return; const i = Math.round(p.scrollTop / (p.clientHeight||1)); if(i === RCUR) return; RCUR = i;
  $$(".rs", p).forEach(sn=>{ const on = +sn.dataset.i === i; sn.classList.toggle("on", on);
    const fr = sn.querySelector(".rfr"); if(fr){ reelFrame(fr, on); return; }
    const hold = sn.querySelector(".rvid"); if(!hold) return;
    if(!on){ killVideo(hold); return; }
    const x = TADKA.find(t=>t.id===sn.dataset.md); if(x && x.video){ const at = RSTART[x.id] || 0; delete RSTART[x.id]; reelPlay(hold, at); } });
  const id = RS[i].md ? RS[i].md.id : null; if(id) keepHash("#/reel/"+id);
  const bare = !!(RS[i].md && RS[i].md.frame); $(".screen.reel", VIEW).classList.toggle("bare", bare); document.body.classList.toggle("nopill", bare);
  reelQuiet(false);
  audit(); }
// Full screen means the episode and nothing else: the app's own controls step back after three seconds and come back on a tap.
let RQT = 0;
function reelQuiet(q){ clearTimeout(RQT); const sn = $(".rs.md.on:not(.fr)", VIEW), scn = $(".screen.reel", VIEW); if(!scn) return;
  $$(".rs.quiet", VIEW).forEach(e=>{ if(e !== sn || !q) e.classList.remove("quiet"); });
  if(sn && q) sn.classList.add("quiet"); scn.classList.toggle("quiet", !!(sn && q)); if(sn) document.body.classList.toggle("nopill", !!q);
  if(sn && !q) RQT = setTimeout(()=>{ if(!OVER.classList.contains("on")) reelQuiet(true); }, 3000); }
function reelTap(e){ if(e.target.closest("button")) { reelQuiet(false); return; } const sn = e.currentTarget; reelQuiet(!sn.classList.contains("quiet")); }
addEventListener("message", e=>{ if(!e.data || e.data.type !== "flicks:close") return; const x = TADKA.find(t=>t.frame), f = $(".rs.fr.on .rfr iframe", VIEW); if(!x || !f) return;
  let ok = e.source === f.contentWindow; if(!ok) try{ ok = e.origin === new URL(x.frame).origin; }catch(err){} if(ok){ bcSave(); back(); } });
// Blank Cheque runs in its own frame, which the app cannot mute from outside. So the frame exists only while its episode is the one on screen with nothing over it.
// The page is loaded as it is published (its HTML fetched and put in the frame with its own address as the base), which lets the app start it and move it
// to a moment through the page's own controls, and never changes what it shows. If the HTML cannot be fetched the page is framed directly and starts on its own start screen.
let BCHTML = null, BCP = null, BCT = 0;
function bcFetch(){ const x = TADKA.find(t=>t.frame); if(BCP || !x) return BCP;
  BCP = fetch(x.frame, {credentials:"omit"}).then(r=>r.ok ? r.text() : Promise.reject()).then(t=>{ BCHTML = t; }).catch(()=>{ BCHTML = false; }); return BCP; }
function bcDoc(x){ // the page's music runs through an audio graph, which stays silent for another site's files unless they are asked for with CORS
  const shim = `<base href="${x.frame}"><script>(function(){var A=window.Audio;function F(s){var a=s===undefined?new A():new A(s);a.crossOrigin="anonymous";return a}F.prototype=A.prototype;window.Audio=F})()<\/script>`;
  return /<head[^>]*>/i.test(BCHTML) ? BCHTML.replace(/<head[^>]*>/i, m=>m+shim) : shim+BCHTML; }
const bcWin = () => { const f = $(".rs.on .rfr iframe", VIEW); try{ return f && f.contentWindow && f.contentWindow.__fp ? f : null; }catch(e){ return null; } };
function reelFrame(fr, on){ const x = TADKA.find(t=>t.frame); on = on && !document.hidden && !OVER.classList.contains("on");
  if(!on){ bcSave(); fr.innerHTML = ""; return; } if(fr.firstChild) return;
  if(BCHTML === null){ bcFetch().then(()=>{ if(fr.isConnected && !fr.firstChild && fr.closest(".rs.on")) reelFrame(fr, true); }); return; }   // wait for the page's HTML, a moment at most
  const f = document.createElement("iframe"); f.title = x.n; f.setAttribute("allow","autoplay; fullscreen; encrypted-media");
  if(BCHTML){ f.addEventListener("load", ()=>bcStart(f)); f.srcdoc = bcDoc(x); } else f.src = x.frame;
  fr.appendChild(f); }
// Opening the episode carries on from the moment the card's preview had reached: the page's own Play is pressed for the viewer and its own seek moves it there.
function bcStart(f){ let n = 0;
  const go = () => { if(!f.isConnected) return; let w, d, b; try{ w = f.contentWindow; d = f.contentDocument; b = d && d.querySelector("#cvBtns button"); }catch(e){ return; }
    if(!w || !w.__fp || !b){ if(n++ < 50) setTimeout(go, 100); return; }
    if(w.__fp.phase !== "cover") return;
    b.click(); if(BCT > .3) try{ w.__fp.seek(BCT); }catch(e){}
    // a browser that refuses sound without a fresh tap: start it silent through the page's own mute and play controls
    setTimeout(()=>{ try{ const m = d.getElementById("main"); if(f.isConnected && m && m.paused && w.__fp.phase === "play"){ if(!m.muted) d.dispatchEvent(new w.KeyboardEvent("keydown",{key:"m",bubbles:true})); const pb = d.getElementById("bPlay"); if(pb) pb.click(); } }catch(e){} }, 1200); };
  go(); }
function bcSave(){ const f = bcWin(); if(!f) return; try{ const fp = f.contentWindow.__fp; if(fp.phase !== "cover" && fp.t > 0) BCT = fp.t; }catch(e){} }
setInterval(bcSave, 500);
// A video is removed, not just paused, when its episode is no longer the one on screen, so it can never be heard from another screen.
function killVideo(hold){ if(!hold) return; $$("video", hold).forEach(reelDrop); hold.innerHTML = ""; }
function reelPlay(hold, at){ killVideo(hold);
  const v = document.createElement("video"); v.playsInline = true; v.loop = true; v.preload = "auto"; v.muted = RMUTED; v.src = MD_BASE + encodeURIComponent(RLANG) + ".mp4";
  v.addEventListener("loadedmetadata", ()=>{ if(at) try{ v.currentTime = Math.min(at, (v.duration||at)-.2); }catch(e){} });
  v.addEventListener("playing", ()=>hold.classList.add("live"));
  v.addEventListener("timeupdate", ()=>{ const b = hold.parentElement.querySelector(".rprog i"); if(b && v.duration) b.style.width = (v.currentTime/v.duration*100)+"%"; });
  v.addEventListener("error", ()=>{ hold.classList.remove("live"); hold.innerHTML = `<div class="verr"><b>The episode didn't load</b><button onclick="reelRetry()">Retry</button></div>`; });
  hold.classList.remove("live"); hold.appendChild(v);
  const p = v.play(); if(p && p.catch) p.catch(err=>{ if(err && err.name === "NotAllowedError" && !v.muted){ RMUTED = true; v.muted = true; reelMuteUI(); v.play().catch(()=>{}); toast("Tap Sound to hear the episode"); } }); }
const reelVideo = () => $(".rs.on .rvid video:not(.nx)", VIEW);
function reelRetry(){ const h = $(".rs.on .rvid", VIEW); if(h) reelPlay(h); }
function reelMuteUI(){ $$("[data-rmute]").forEach(b=>b.innerHTML = `${RMUTED?I.mute:I.vol}<span>Sound</span>`); }
function reelMute(){ RMUTED = !RMUTED; const v = reelVideo(); if(v){ v.muted = RMUTED; if(v.paused) v.play().catch(()=>{}); } reelMuteUI(); }
function reelLang(id){ if(id === RLANG) return; RLANG = id; $$("[data-lang]").forEach(b=>b.classList.toggle("on", b.dataset.lang===id));
  const hold = $(".rs.on .rvid", VIEW), old = reelVideo(); if(!hold) return; if(!old || old.error || !old.duration) return reelPlay(hold);
  $$("video", hold).forEach(v=>{ if(v !== old) reelDrop(v); });          // a switch that was still loading is dropped
  const v = document.createElement("video"); v.playsInline = true; v.loop = true; v.preload = "auto"; v.muted = true; v.className = "nx"; v.src = MD_BASE + encodeURIComponent(id) + ".mp4";
  let done = false;
  const swap = () => { if(done || !v.isConnected) return; done = true; v.muted = RMUTED; v.classList.remove("nx"); reelDrop(old); reelWire(v, hold); };
  v.addEventListener("loadedmetadata", ()=>{ try{ v.currentTime = Math.min(old.currentTime + .15, (v.duration||1e9) - .2); }catch(e){} v.play().catch(()=>{}); });
  v.addEventListener("playing", ()=>{ const d = old.currentTime - v.currentTime; if(Math.abs(d) > .35 && !v._re){ v._re = 1; try{ v.currentTime = old.currentTime + .1; }catch(e){} v.addEventListener("seeked", swap, {once:true}); } else swap(); });
  v.addEventListener("error", ()=>{ if(done) return; done = true; reelDrop(v); toast("That language didn't load"); const was = LANGS.find(l=>(old.src||"").includes(encodeURIComponent(l[0]))); if(was) RLANG = was[0]; $$("[data-lang]").forEach(b=>b.classList.toggle("on", b.dataset.lang===RLANG)); });
  hold.appendChild(v); }
function reelDrop(v){ try{ v.pause(); v.muted = true; v.removeAttribute("src"); v.load(); }catch(e){} v.remove(); }
function reelWire(v, hold){ v.addEventListener("timeupdate", ()=>{ const b = hold.parentElement.querySelector(".rprog i"); if(b && v.duration) b.style.width = (v.currentTime/v.duration*100)+"%"; }); }
function reelLike(id, el){ RLIKE[id] = !RLIKE[id]; el.classList.toggle("on", RLIKE[id]); el.querySelector("span").textContent = RLIKE[id] ? "12.5K" : "12.4K"; }
// The episode stops while anything is open over it, and whenever the tab is hidden.
function reelHold(stop){ const fr = $(".rs.on .rfr", VIEW); if(fr) reelFrame(fr, !stop); const v = reelVideo(); if(!v) return; if(stop) v.pause(); else v.play().catch(()=>{}); }
document.addEventListener("visibilitychange", ()=>{ reelHold(document.hidden || OVER.classList.contains("on")); if(document.hidden) plPause(true); });

/* ---- search ---- */
const SGRID = {
  "India":["biggboss","yehrishta","anupamaa","fitoor","roadies","draarohi","L:tumdena","queen","apsara","AD","heartbeat","sangamarmar","dhamaal","laughterchefs","koffee"],
  "Hot & New":["chiranjeevi","ohsukumari","colony","dilwaniya","imgame","varahi","L:brahmastra","queen","apsara","office","roslin","perfectcrown"],
  "Movies":["askme","colony","badboy","msdhoni","drishyam","shiddat","L:brahmastra","terrifier","12th","paradha","kabirsingh","maainti","beautifuldisaster","wolf","liger"],
  "Shows":["biggboss","yehrishta","anupamaa","fitoor","roadies","draarohi","L:tumdena","queen","apsara","heartbeat","roslin","sangamarmar","suits","koffee","office"],
  "Action":["liger","mirai","maainti","imgame","welcomejungle","varahi","L:brahmastra","drishyam","83","dhadkan","colony","hanuman"]
};
let SCHIP = "India";
function sgrid(){ return SGRID[SCHIP].map(x=>{
  if(x === "AD"){ const k = "levis", b = BRANDS[k], id = "stile"; return `<div class="sad" data-anchor="stile">${flick(id,k)}<div class="sab" data-spop="${id}"><div><b>${esc(b.name)}</b><span>Sponsored · <em data-sv="${id}">${esc(vshort(k,0))}</em></span></div>${ctaBtn(id,k,"mbtn")}</div></div>`; }
  return x.startsWith("L:") ? poster(x.slice(2),"big") : poster(x); }).join(""); }
function setChip(c){ SCHIP = c; render(false); }
function searchScreen(q){
  const chips = `<div class="chips">${Object.keys(SGRID).map(c=>`<button class="chip ${c===SCHIP?"on":""}" onclick="setChip('${c}')">${c}</button>`).join("")}</div>`;
  let body;
  if(q){ const ql = q.toLowerCase(), hits = Object.values(TT).filter(x=>(x.n+" "+x.meta+" "+x.tags.join(" ")).toLowerCase().includes(ql)).slice(0,18);
    const clips = Object.keys(CLIPS).filter(c=>("cricket sports "+CLIPS[c][0]).toLowerCase().includes(ql)).slice(0,8);
    const sp = SPON.find(([re])=>re.test(q)), k = sp && sp[1], b = k && BRANDS[k];
    body = `${k?`<div class="sres" data-anchor="sres"><div class="tkh">${av(k)}<div><b>${esc(b.head)}</b><span>Sponsored · ${esc(b.name)}</span></div>${dots("sres")}</div>${flick("sres",k)}${minis("sres",k)}<button class="wbtn" onclick="ctaGo('sres')">${esc(b.cta)}</button></div>`:""}
    <h2 class="sh">${hits.length + clips.length ? `Results for "${esc(q)}"` : `No titles found for "${esc(q)}"`}</h2>
    ${clips.map(c=>`<button class="srow" onclick="go('#/watch/${c}')"><span class="th wide">${pic(c)}</span><span><b>${esc(CLIPS[c][0])}</b><em>Cricket · ${CLIPS[c][1]}</em></span>${I.right}</button>`).join("")}
    ${hits.map(x=>`<button class="srow" onclick="go('#/t/${x.id}')"><span class="th">${pic(x.img)}</span><span><b>${esc(x.n)}</b><em>${esc(x.meta)}</em></span>${I.right}</button>`).join("")}`;
  } else body = `<h2 class="sh">Popular Searches in</h2>${chips}<div class="sgrid">${sgrid()}</div>`;
  return `<div class="screen">${stpad()}<div class="top"><form class="sbox" onsubmit="event.preventDefault();doSearch()">${I.search}<input id="q" value="${esc(q)}" placeholder="Movies, shows and more" autocomplete="off" enterkeyhint="search" aria-label="Search">${q?`<button type="button" onclick="go('#/search')" aria-label="Clear">${I.x}</button>`:`<button type="button" onclick="out('Voice search')" aria-label="Voice search">${I.mic}</button>`}</form></div>
  <div class="scr" id="scr">${body}</div>${nav("search")}</div>`; }
function doSearch(){ const v = $("#q").value.trim(); go(v ? `#/search/${encodeURIComponent(v)}` : "#/search"); }

/* ---- My Space ---- */
function spaceScreen(){ const wl = Array.from(WL);
  return `<div class="screen">${stpad()}<div class="scr" id="scr">${slice("sp_login",[[30,62,40,10,"out('Log in')","Log In"],[66,0,34,8,"out('Help and settings')","Help & Settings"]])}
  ${wl.length ? rail("Watchlist", wl) : `<section class="sec"><h2>Watchlist</h2><div class="sub">Titles you add with + show up here.</div></section>`}
  </div>${nav("space")}</div>`; }

/* ---- title page ---- */
function titleScreen(id){ const x = TT[id] || TT.heartbeat; id = x.id;
  const more = Object.keys(TT).filter(k=>k!==id && TT[k].tags.some(g=>x.tags.includes(g)) && TT[k].img.startsWith("p_")).slice(0,8);
  const eps = x.full ? [["Home No More","S3 E1 · 30 Jul 2026 · 31m"],["Second Chances","S3 E2 · 6 Aug 2026 · 29m"],["The Night Shift","S3 E3 · 13 Aug 2026 · 33m"]] : [[x.epn||"Episode 1",(x.ep||"S1 E1")+" · 31m"]];
  return `<div class="screen title"><div class="scr" id="scr">
  <div class="thero ${x.full?"full":""}">${x.full?pic("d_tr0",x.n):`<div class="tblur" style="background-image:url(${IMG[x.img][2]})"></div>${pic(x.img,x.n)}`}<button class="tx" onclick="back()" aria-label="Close">${I.x}</button></div>
  ${x.full?`<div class="tlogo">${pic("d_logo",x.n)}</div>`:`<h1 class="tname">${esc(x.n)}</h1>`}
  <div class="tmeta">${esc(x.meta)}</div>
  <button class="watch" onclick="${x.sub?`out('Subscriptions')`:`go('#/watch/${id}')`}">${I.play}<b>${x.sub?"Subscribe to Watch":x.full?"Watch Latest Season":"Watch Now"}</b>${x.ep&&!x.sub?`<span>${x.ep}</span>`:""}</button>
  <div class="ttags">${x.tags.map(g=>`<span>${g}</span>`).join("<i></i>")}</div>
  ${x.desc?`<p class="tdesc">${esc(x.desc)}</p>`:""}${x.note?`<div class="tnote">${esc(x.note)}</div>`:""}
  <div class="tacts"><button data-wl="${id}" class="${WL.has(id)?"on":""}" onclick="wlToggle('${id}')"><i>${WL.has(id)?I.check:I.plus}</i>Watchlist</button><button onclick="out('Sharing')"><i>${I.share}</i>Share</button><button onclick="toast('Thanks for rating')"><i>${I.smile}</i>Rate</button></div>
  <section class="look" data-anchor="look"><div class="lh"><div><h2>Shop the Look</h2><span>Sponsored · ${esc(BRANDS.outfit.name)}</span></div>${dots("look")}</div>
    <div class="lbox">${flick("look","outfit")}</div>${minis("look","outfit")}<button class="wbtn" onclick="ctaGo('look')">${esc(BRANDS.outfit.cta)}</button></section>
  <div class="seasons">${x.full?`<button onclick="chipOn2(this)">Season 1</button><button onclick="chipOn2(this)">Season 2</button><button class="on" onclick="chipOn2(this)">Season 3</button>`:`<button class="on">Episodes</button>`}</div>
  ${eps.map(([n,m])=>`<button class="eprow" onclick="${x.sub?`out('Subscriptions')`:`go('#/watch/${id}')`}"><span class="eth">${pic(x.full?"d_ep":x.img)}<i>${I.play}</i></span><span><b>${esc(n)}</b><em>${esc(m)}</em></span><span class="edl" onclick="event.stopPropagation();out('Downloads')">${I.dl}</span></button>`).join("")}
  ${more.length?rail("More Like This", more):""}
  </div></div>`; }
function chipOn2(el){ $$("button", el.parentElement).forEach(c=>c.classList.toggle("on", c===el)); }

/* ---- watch page: the player, with ad breaks, a pause ad, shop the scene and a companion ad ----
   The stream itself is a set of stills from the title (the app blocks recording of its video), moved along a real timeline. */
const PLS = {};            // per title: position and which breaks have played, kept while the demo is open
let PL = null, plTimer = 0;
const DUR = 31*60, START = 14*60+40, MID = 15*60, SCENE = 14*60+46, SCENE_LEN = 12, BREAK = 15, SKIP = 5;
const BRK = { pre:"can", mid:"eye", pause:"bk", scene:"neck", comp:"westelm" };
const mmss = s => { s = Math.max(0, Math.floor(s)); return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; };
function watchInfo(id){ if(TT[id]){ const x = TT[id]; return { n:x.n, sub:`${x.ep||"S1 E1"}${x.epn?" · "+x.epn:""}`, stills:x.full?["d_tr1","d_tr2","d_tr0"]:[x.img], poster:!x.full, back:`#/t/${id}` }; }
  const c = CLIPS[id] || CLIPS.l_wtc; return { n:c[0], sub:"Cricket · "+c[1], stills:[CLIPS[id]?id:"l_wtc"], poster:false }; }
function watchScreen(id){ const w = watchInfo(id); const more = ["roslin","sangamarmar","draarohi","magicshiri","khalbali","honeymoon"].filter(k=>k!==id);
  return `<div class="screen watch">${stpad()}
  <div class="pl" id="pl"><div class="plst ${w.poster?"poster":""}" id="plst">${w.stills.map((k,i)=>`<div class="st ${i?"":"on"}" style="background-image:url(${IMG[k][2]})"></div>`).join("")}</div>
    <div class="plui" id="plui" onclick="plTap(event)"><div class="plt"><button onclick="event.stopPropagation();back()" aria-label="Back">${I.back}</button><div><b>${esc(w.n)}</b><span>${esc(w.sub)}</span></div><button onclick="event.stopPropagation();out('Casting')" aria-label="Cast">${I.cast}</button></div>
      <div class="plc"><button onclick="event.stopPropagation();plSeek(PL.t-10)" aria-label="Back 10 seconds">${I.rw}</button><button class="pp" id="plpp" onclick="event.stopPropagation();plToggle()" aria-label="Play or pause">${I.pause}</button><button onclick="event.stopPropagation();plSeek(PL.t+10)" aria-label="Forward 10 seconds">${I.ff}</button></div>
      <button class="scenechip" id="scenechip" data-anchor="scene" onclick="event.stopPropagation();openScene('neck','${esc(w.n)}')">${I.tag} Shop this look</button>
      <div class="plb"><span id="plt1">00:00</span><div class="bar" id="plbar" onclick="event.stopPropagation();plBar(event)"><i id="plfill"></i><u style="left:${MID/DUR*100}%"></u><em id="plknob"></em></div><span>${mmss(DUR)}</span></div></div>
    <div class="plad" id="plad" data-anchor="brk"></div></div>
  <div class="adstrip" id="adstrip"></div>
  <div class="scr" id="scr">
    <div id="pausead" data-anchor="pause"></div>
    <div class="winfo"><h1>${esc(w.n)}</h1><span>${esc(w.sub)}</span></div>
    <div class="tacts">${TT[id]?`<button data-wl="${id}" class="${WL.has(id)?"on":""}" onclick="wlToggle('${id}')"><i>${WL.has(id)?I.check:I.plus}</i>Watchlist</button>`:""}<button onclick="out('Sharing')"><i>${I.share}</i>Share</button><button onclick="openScene('neck','${esc(w.n)}')"><i>${I.tag}</i>Shop the look</button><button onclick="out('Downloads')"><i>${I.dl}</i>Download</button></div>
    <div class="comp" data-anchor="comp"><div class="tkh">${av(BRK.comp)}<div><b>${esc(BRANDS[BRK.comp].head)}</b><span>Sponsored · ${esc(BRANDS[BRK.comp].name)}</span></div>${dots("comp")}</div>${flick("comp",BRK.comp)}${minis("comp",BRK.comp)}<button class="wbtn" onclick="ctaGo('comp')">${esc(BRANDS[BRK.comp].cta)}</button></div>
    ${rail("More Like This", more)}
  </div></div>`; }
function plInit(id, jump){
  const mem = PLS[id] || (PLS[id] = { t:START, pre:false, mid:false });
  if(jump === "pre"){ mem.pre = false; mem.t = START; }
  else if(jump){ mem.pre = true; if(jump === "mid"){ mem.mid = false; mem.t = MID-3; } else if(mem.t >= DUR-2) mem.t = START; if(jump === "scene") mem.t = SCENE; }
  PL = { id, mem, t:mem.t, playing:true, brk:null, left:0, sceneSeen:false };
  clearInterval(plTimer); plTimer = setInterval(plTick, 250);
  plDraw(); if(!mem.pre) plBreak("pre");
  if(jump === "pause") plToggle();
  if(jump === "scene") setTimeout(()=>openScene("neck", watchInfo(id).n), 350);
  if(jump === "comp") setTimeout(()=>scrollToAnchor("comp"), 120);
  if(jump === "mid" || jump === "pre") flash("#pl");
}
function plStop(){ clearInterval(plTimer); plTimer = 0; PL = null; }
function plTick(){ if(!PL || !$("#pl")) return;
  if(PL.brk){ PL.left -= .25; if(PL.left <= 0) return plBreakEnd(); plStrip(); return; }
  if(!PL.playing || OVER.classList.contains("on") || document.hidden) return;
  PL.t += .25; PL.mem.t = PL.t;
  if(!PL.mem.mid && PL.t >= MID){ PL.t = MID; return plBreak("mid"); }
  if(PL.t >= DUR){ PL.t = DUR; PL.playing = false; }
  plDraw(); }
function plDraw(){ if(!PL) return; const f = PL.t/DUR*100; $("#plfill").style.width = f+"%"; $("#plknob").style.left = f+"%"; $("#plt1").textContent = mmss(PL.t);
  $("#plpp").innerHTML = PL.playing ? I.pause : I.play;
  const sts = $$("#plst .st"), n = sts.length, on = Math.floor(PL.t/6) % n; sts.forEach((e,i)=>e.classList.toggle("on", i===on));
  $("#pl").classList.toggle("paused", !PL.playing);
  const sc = PL.t >= SCENE && PL.t < SCENE+SCENE_LEN; $("#scenechip").classList.toggle("on", sc || !PL.playing);
  if(sc && !PL.sceneSeen){ PL.sceneSeen = true; plShowUI(); } }
let plUIT = 0;
function plShowUI(){ const p = $("#pl"); if(!p) return; p.classList.add("ui"); clearTimeout(plUIT); plUIT = setTimeout(()=>{ if(PL && PL.playing) $("#pl")?.classList.remove("ui"); }, 3200); }
function plTap(e){ const p = $("#pl"); if(p.classList.contains("ui") && PL.playing) p.classList.remove("ui"); else plShowUI(); }
function plToggle(){ if(!PL || PL.brk) return; if(PL.t >= DUR) PL.t = PL.mem.t = START; PL.playing = !PL.playing; plDraw(); plShowUI();
  const h = $("#pausead");
  if(!PL.playing){ const k = BRK.pause, b = BRANDS[k];
    h.innerHTML = `<div class="pza"><div class="tkh">${av(k)}<div><b>${esc(b.head)}</b><span>Sponsored · ${esc(b.name)} · while you're paused</span></div><button class="pzx" onclick="plToggle()">Resume ${I.play}</button></div>${flick("pz",k)}<div class="pzb" data-spop="pz"><span><em data-sv="pz">${esc(vshort(k,0))}</em></span><button class="wbtn sm" onclick="ctaGo('pz')">${esc(b.cta)}</button></div></div>`;
    $("#scr").scrollTo({top:0, behavior:"smooth"}); audit();
  } else plClearPause(); }
function plClearPause(){ const h = $("#pausead"); if(!h) return; $$(".flick[data-slot]", h).forEach(x=>{ unmount(x); delete SLOTS[x.dataset.slot]; }); h.innerHTML = ""; audit(); }
function plPause(silent){ if(PL && !PL.brk && PL.playing && $("#pl")) { if(silent){ PL.playing = false; plDraw(); } else plToggle(); } }
function plSeek(t){ if(!PL || PL.brk) return; t = Math.max(0, Math.min(DUR, t)); const cross = !PL.mem.mid && PL.t < MID && t >= MID; PL.t = PL.mem.t = cross ? MID : t; plShowUI(); if(cross) plBreak("mid"); else plDraw(); }
function plBar(e){ const r = $("#plbar").getBoundingClientRect(); plSeek((e.clientX - r.left)/r.width*DUR); }
// Ad break: the player opens up to a square and the Flick plays in it, with the countdown and the app's button in a strip under it.
function plBreak(kind){ if(!PL) return; plClearPause(); PL.playing = true; PL.brk = kind; PL.left = BREAK; const k = BRK[kind];
  $("#plad").innerHTML = flick("brk", k); $("#pl").classList.add("ad"); $("#pl").classList.remove("ui","paused"); $("#adstrip").classList.add("on"); plStrip(true);
  $("#scr").scrollTo({top:0}); setTimeout(()=>{ const h = $(".flick", $("#plad")); if(h){ fitFlick(h); audit(); } }, 320); audit(); }
function plStrip(full){ const k = BRK[PL.brk], b = BRANDS[k], el = $("#adstrip"), can = BREAK - PL.left >= SKIP;
  if(full) el.innerHTML = `<div class="as1"><span class="adk">Ad · 1 of 1</span>${av(k)}<div class="mt"><b>${esc(b.name)}</b><span><em data-sv="brk">${esc(vshort(k,0))}</em> · your ${PL.brk==="pre"?"episode starts":"episode resumes"} in <em id="adleft"></em></span></div></div><div class="as2"><button class="wbtn sm" onclick="ctaGo('brk')">${esc(b.cta)}</button><button class="skip" id="adskip" onclick="plSkip()"></button></div>`;
  const l = $("#adleft"); if(l) l.textContent = mmss(Math.ceil(PL.left)).slice(1);
  const s = $("#adskip"); if(s){ s.disabled = !can; s.innerHTML = can ? `Skip Ad ${I.right}` : `Skip in ${Math.ceil(SKIP-(BREAK-PL.left))}`; } }
function plSkip(){ if(PL && PL.brk && BREAK - PL.left >= SKIP) plBreakEnd(); }
function plBreakEnd(){ if(!PL) return; const kind = PL.brk; PL.brk = null; PL.mem[kind] = true;
  $$(".flick[data-slot]", $("#plad")).forEach(x=>{ unmount(x); delete SLOTS[x.dataset.slot]; }); $("#plad").innerHTML = ""; $("#pl").classList.remove("ad"); $("#adstrip").classList.remove("on"); $("#adstrip").innerHTML = "";
  PL.playing = true; plDraw(); plShowUI(); audit(); }

/* ---- shop the scene: a sheet over the player or the micro-drama, with the Flick and its three options ---- */
function openScene(k, from){ const b = BRANDS[k];
  reelHold(true);
  openOver(`<div class="scrim" onclick="closeOver()"></div><div class="sheet"><div class="grab"></div><button class="shx" onclick="closeOver()" aria-label="Close">${I.x}</button>
  <div class="shh">${av(k)}<div><b>${esc(b.head)}</b><span>Sponsored · ${esc(b.name)}${from?` · seen in ${esc(from)}`:""}</span></div></div>
  <div class="shb"><div class="shf">${flick("scene",k)}</div><div class="shr">${minis("scene",k)}<div class="shp" data-spop="scene"><em data-sn="scene">${esc(vname(k,0))}</em></div><button class="wbtn" onclick="ctaGo('scene')">${esc(b.cta)}</button></div></div></div>`); }
/* ---- in-app browser: the brand's own page opens inside the app, as it does in other apps ---- */
function openSite(k, url){ const b = BRANDS[k]; let u; try{ u = new URL(url); }catch(e){ u = new URL(b.home); }
  const host = u.host.replace(/^www\./,""), key = u.host + u.pathname, cap = CAPS[key], live = FRAME_OK.test(u.hostname);
  const path = (u.pathname === "/" ? "" : u.pathname).replace(/\/$/,"");
  const body = live ? `<iframe class="iabf" title="${esc(b.name)}" src="${esc(u.href)}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerpolicy="no-referrer"></iframe>`
    : cap ? `<div class="iabcap">${pic(cap, b.name)}</div>`
    : `<div class="iabh">${av(k)}<b>${esc(b.name)}</b><span>${esc(host + path)}</span><a class="wbtn" href="${esc(u.href)}" target="_blank" rel="noopener noreferrer">Open ${esc(host)}</a></div>`;
  reelHold(true);
  openOver(`<div class="iab" data-url="${esc(u.href)}"><div class="iabt"><button onclick="closeOver()" aria-label="Close">${I.x}</button><div class="iabu"><b>${I.lock}${esc(host)}</b><span>${esc(b.name)}</span></div><button onclick="iabReload()" aria-label="Reload">${I.reload}</button><button onclick="out('Sharing')" aria-label="Share">${I.share}</button></div><div class="iabp"><i></i></div><div class="iabc shb">${body}</div></div>`); }
function iabReload(){ const f = $(".iabf", OVER), p = $(".iabp i", OVER); if(p){ p.style.animation = "none"; void p.offsetWidth; p.style.animation = ""; } if(f) f.src = f.src; }

/* ================= overlays ================= */
let OVSTATE = false;
function openOver(html){ const was = OVER.classList.contains("on");   // a sheet handing over to the browser: one layer, one Back step
  $$(".flick[data-slot]", OVER).forEach(h=>{ unmount(h); delete SLOTS[h.dataset.slot]; });
  OVER.innerHTML = html; OVER.classList.add("on"); document.body.classList.add("ovon"); if(!was) try{ history.pushState({ov:1}, ""); OVSTATE = true; }catch(e){} sizeOver(); audit(); }
function closeOver(silent){ if(!OVER.classList.contains("on")) return; $$(".flick[data-slot]", OVER).forEach(h=>{ unmount(h); delete SLOTS[h.dataset.slot]; });
  OVER.classList.remove("on"); OVER.innerHTML = ""; document.body.classList.remove("ovon"); if(OVSTATE && !silent){ OVSTATE = false; try{ history.back(); }catch(e){} } OVSTATE = false; reelHold(false); audit(); }
addEventListener("popstate", ()=>{ if(OVER.classList.contains("on")){ OVSTATE = false; closeOver(true); } });
function sizeOver(){ const box = $(".shf", OVER), f = box && box.querySelector(".flick"); if(!f) return; fitFlick(f); }

/* ================= router ================= */
const NAV = [], SCROLL = {}; let lastHash = "", pendingAnchor = null;
function go(h){ const rep = OVSTATE; if(rep) closeOver(true);
  if(location.hash === h){ if(rep) history.back(); else render(false); } else if(rep) location.replace(h); else location.hash = h; }
function back(){ if(NAV.length > 1) history.back(); else location.hash = "#/home"; }
function parse(){ const p = (location.hash || "#/home").replace(/^#\/?/,"").split("/"); return {name:p[0]||"home", a:decodeURIComponent(p[1]||""), b:p[2]}; }
function keepHash(h){ if(location.hash === h) return; history.replaceState(history.state, "", h); CURH = lastHash = h; if(NAV.length) NAV[NAV.length-1] = h; }
const TABS = ["home","tv","movies","sports","tadka","search","space"];
function bindHero(h){ const d = $(`[data-hd="${h.dataset.hero}"]`); if(!d) return; const kids = Array.from(h.children);
  h.addEventListener("scroll", ()=>{ const x = h.scrollLeft; let bi = 0; kids.forEach((c,i)=>{ if(Math.abs(c.offsetLeft - kids[0].offsetLeft - x) < Math.abs(kids[bi].offsetLeft - kids[0].offsetLeft - x)) bi = i; });
    if(x >= h.scrollWidth - h.clientWidth - 4) bi = kids.length-1;
    Array.from(d.children).forEach((e,i)=>e.classList.toggle("on", i===bi)); }, {passive:true}); }
function render(anim=true){
  const r = parse(), h = location.hash || "#/home";
  const old = $("#scr", VIEW); if(old && lastHash) SCROLL[lastHash] = old.scrollTop;
  let dir = "enter";
  if(NAV.length > 1 && NAV[NAV.length-2] === h){ NAV.pop(); dir = "enter-back"; } else if(NAV[NAV.length-1] !== h) NAV.push(h);
  closeOver(true);
  // Leaving a screen removes its Flicks and its videos outright, so nothing can keep playing behind the next screen.
  $$(".flick[data-slot]", VIEW).forEach(unmount); $$(".rvid", VIEW).forEach(killVideo); $$(".rfr", VIEW).forEach(f=>f.innerHTML = ""); $$(".tkc[data-pv]", VIEW).forEach(feedStop); FEEDCUR = null; clearTimeout(RQT); document.body.classList.remove("nopill"); plStop(); SLOTS = {}; CURH = h;
  const S = {home:()=>homeScreen("home"), tv:()=>homeScreen("tv"), movies:()=>homeScreen("movies"), sports:()=>homeScreen("sports"), tadka:tadkaScreen, reel:()=>reelScreen(r.a),
    search:()=>searchScreen(r.a), space:spaceScreen, t:()=>titleScreen(r.a), watch:()=>watchScreen(r.a)};
  const name = S[r.name] ? r.name : "home";
  VIEW.innerHTML = S[name]();
  const scrn = $(".screen", VIEW), sc = $("#scr", VIEW);
  if(anim && lastHash && !TABS.includes(name)) scrn.classList.add(dir);
  document.body.classList.toggle("lowpill", !TABS.includes(name));
  document.body.classList.toggle("toppill", name === "reel");
  lastHash = h;
  Object.values(SLOTS).forEach(s=>{ if(s.v) applyVariant(s.id, s.v); });
  fixDots();
  $$(".hero[data-hero]", VIEW).forEach(bindHero);
  if(dir === "enter-back" && SCROLL[h] && sc) sc.scrollTop = SCROLL[h];
  const anc = pendingAnchor; pendingAnchor = null;
  if(name === "watch") plInit(r.a, anc);
  else if(name === "reel"){ const p = $("#pager"); reelFit(); let i = RS.findIndex(s=>s.md && s.md.id === r.a); if(i < 0) i = 0;
    if(anc && /^r\d/.test(anc)) i = RS.findIndex(s=>s.anchor === anc);
    if(anc === "bc") i = RS.findIndex(s=>s.md && s.md.frame);
    p.scrollTop = i * p.clientHeight; p.addEventListener("scroll", ()=>{ clearTimeout(p._t); p._t = setTimeout(reelActivate, 110); }, {passive:true}); reelActivate();
    if(anc === "rshop"){ const nm = RS[i].md.n; setTimeout(()=>openScene("neck", nm), 450); }
    else if(anc && anc !== "bc") flash(`.rs[data-anchor="${anc}"] .rfl`); }
  else if(anc) setTimeout(()=>scrollToAnchor(anc), 80);
  if(name === "search" && !r.a && anim && !anc && !matchMedia("(pointer: coarse)").matches) setTimeout(()=>$("#q")?.focus({preventScroll:true}), 300);
  audit(); buildGuide();
}
setInterval(fixDots, 400);
addEventListener("hashchange", ()=>render(true));
function flash(sel){ setTimeout(()=>{ const el = typeof sel === "string" ? $(sel, VIEW) : sel; if(!el) return; $$(".pulse").forEach(e=>e.classList.remove("pulse")); void el.offsetWidth; el.classList.add("pulse"); }, 380); }

/* ================= ad slots list: slot types only, no brand names ================= */
const GUIDE = [
  ["Ad breaks in the stream", [["Pre-roll: before the episode starts","#/watch/heartbeat","pre"],["Mid-roll: ad break inside the episode","#/watch/heartbeat","mid"],["Pause ad","#/watch/heartbeat","pause"],["Companion ad under the player","#/watch/heartbeat","comp"]]],
  ["Shop the look", [["In the player: shop the scene","#/watch/heartbeat","scene"],["Title page: shop the look","#/t/heartbeat","look"],["Home: Shop the Look rail","#/home","shop"]]],
  ["Tadka micro-dramas", [["Sponsored video in the Tadka feed","#/tadka","tk1"],["Tadka feed: second sponsored video","#/tadka","tk2"],["Flick inside a micro-drama episode","#/reel/blankcheque","bc"],["Full-screen ad between episodes","#/reel/delivery","r1"],["Shop the look inside a micro-drama","#/reel/delivery","rshop"]]],
  ["Swipeable banners", [["Home: masthead","#/home","mast"],["Home: For You carousel","#/home","fy"],["TV: masthead","#/tv","mast"],["TV: For You carousel","#/tv","fy"],["Movies: masthead","#/movies","mast"],["Movies: For You carousel","#/movies","fy"],["Sports: masthead","#/sports","mast"],["Sports: For You carousel","#/sports","fy"]]],
  ["Billboards between rails", [["Home: billboard","#/home","bill"],["Movies: billboard","#/movies","bill"],["Sports: billboard","#/sports","bill"]]],
  ["Search", [["Sponsored tile in Popular Searches","#/search","stile"],["Sponsored result at the top","#/search/cricket","sres"]]]
];
let curPick = "";
function buildGuide(){ let n = 0;
  $("#glist").innerHTML = GUIDE.map(([sec,items],si)=>`<h6>${sec}</h6>` + items.map((it,ii)=>{ n++; const key = si+"-"+ii;
    return `<button class="gitem ${key===curPick?"cur":""}" onclick="pick(${si},${ii})"><span class="n">${n}</span>${it[0]}</button>`; }).join("")).join("");
  $("#gcount").textContent = n; }
let guideAt = 0;
function pick(si, ii){ if(Date.now() - guideAt < 500) return;   // the tap that opened the list must not also pick from it
  const it = GUIDE[si][1][ii]; curPick = si+"-"+ii; toggleGuide(false);
  const have = location.hash || "#/home", rep = OVSTATE, same = have === it[1];
  if(it[1] === "#/search") SCHIP = "India";
  closeOver(true); pendingAnchor = it[2];
  if(same){ if(rep) history.back(); setTimeout(()=>render(false), rep ? 60 : 0); }
  else if(rep) location.replace(it[1]); else location.hash = it[1]; }
function scrollToAnchor(a){
  const sc = $("#scr", VIEW), el = sc && sc.querySelector(`[data-anchor="${a}"]`); if(!el) return;
  const k = sc.getBoundingClientRect().height / (sc.clientHeight || 1);
  const hr = el.closest(".row,.hero");
  if(hr){ const left = (el.getBoundingClientRect().left - hr.getBoundingClientRect().left)/k + hr.scrollLeft - 12; hr.scrollTo({left:Math.max(0,left), behavior:"smooth"}); }
  const tgt = el.closest(".sec") || (hr && hr.classList.contains("fy") ? hr.previousElementSibling : null) || el;
  const top = (tgt.getBoundingClientRect().top - sc.getBoundingClientRect().top)/k + sc.scrollTop - 8;
  sc.scrollTo({top:Math.max(0,top), behavior:"smooth"});
  setTimeout(()=>{ $$(".pulse").forEach(e=>e.classList.remove("pulse")); void el.offsetWidth; el.classList.add("pulse"); audit(); }, 420); }
function toggleGuide(force){ const p = $("#side"), on = force === undefined ? !p.classList.contains("on") : force; if(on) guideAt = Date.now(); p.classList.toggle("on", on); $("#gscrim").classList.toggle("on", on); $("#gpill").setAttribute("aria-expanded", on); if(on) $("#gpill").classList.remove("hl"); }
$("#gscrim").addEventListener("click", ()=>{ if(Date.now() - guideAt > 500) toggleGuide(false); });
document.addEventListener("keydown", e=>{ if(e.key === "Escape"){ toggleGuide(false); closeOver(); } });
// The phone button can be dragged out of the way; a short move still counts as a tap.
(function(){ const b = $("#gpill"); let sx, sy, ox, oy, moved;
  b.addEventListener("pointerdown", e=>{ sx=e.clientX; sy=e.clientY; const r=b.getBoundingClientRect(); ox=r.left; oy=r.top; moved=false; b.setPointerCapture(e.pointerId); });
  b.addEventListener("pointermove", e=>{ if(sx==null) return; const dx=e.clientX-sx, dy=e.clientY-sy; if(!moved && Math.hypot(dx,dy)<8) return; moved=true;
    b.style.left=Math.max(6,Math.min(innerWidth-b.offsetWidth-6,ox+dx))+"px"; b.style.top=Math.max(6,Math.min(innerHeight-b.offsetHeight-6,oy+dy))+"px"; b.style.right="auto"; b.style.bottom="auto"; });
  b.addEventListener("pointerup", ()=>{ if(sx==null) return; sx=null; if(!moved) toggleGuide(); });
  setTimeout(()=>b.classList.add("hl"), 1500);   // blinks until the list has been opened once
})();

/* ================= phone scaling ================= */
function fit(){ const slot = $("#phoneSlot"), phone = $("#phone");
  if(innerWidth <= 860){ slot.style.width = slot.style.height = ""; phone.style.transform = ""; }
  else { const s = Math.min(1, (innerHeight - 52 - 40) / 868, (innerWidth - 440) / 414);
    phone.style.transform = `scale(${s})`; slot.style.width = (414*s)+"px"; slot.style.height = (868*s)+"px"; }
  if($("#pager")){ reelFit(); const p = $("#pager"); if(RCUR >= 0) p.scrollTop = RCUR * p.clientHeight; }
  sizeOver(); }
addEventListener("resize", fit);
setInterval(()=>$$(".flick[data-slot]", APP).forEach(fitFlick), 700);   // slots that change size (the ad break opening up) keep their Flick fitted
$("#flamLogo").src = FLAMLOGO; $("#jhLogo").src = JHLOGO;
// Launch screen: the JioHotstar mark on its own for a moment, as when the app is opened. The app loads underneath, silent, and takes over.
(function(){ const sp = $("#splash"); $("#splashLogo").src = JHLOGO;
  setTimeout(()=>sp.classList.add("out"), 1900);
  setTimeout(()=>{ sp.remove(); document.body.classList.remove("splash"); FEEDSINCE = Date.now(); audit(); }, 2350); })();
fit(); render(false);
(function(){ const list = Object.values(BRANDS).map(b=>b.src); let i = 0;
  const next = () => { if(i >= list.length) return; fetch(list[i++], {mode:"no-cors", credentials:"omit"}).catch(()=>{}).finally(()=>setTimeout(next, 250)); };
  setTimeout(next, 1500); })();
