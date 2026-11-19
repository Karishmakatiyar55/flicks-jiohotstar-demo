/* =====================================================================
   FLICKS: every creative used in the demo, one record each.
   Sources are the saved flicks-ad-tags codes. Flicks saved as web embeds
   (embed.js + <flam-embed id>) run as the same Flick's own ad tag,
   https://flicks.flamapp.live/<id>/ad.js, so the app can hide the Flick's
   button, follow its options and control its sound.

   JioHotstar is a streaming app: it does not sell anything itself. The app's
   button under a Flick opens the brand's own page in the in-app browser, and
   the address is the one built into the Flick (its own Shop now link, for the
   option on screen). `home` is only used if a Flick hands back no address.
   kind:  site  = the Flick carries a link to the brand's site
          none  = the Flick carries no link, so the app shows no button
          watch = the app's own content: the button opens the micro-drama
   Option names that are not known show as the unit and a number ("Shade 2").
   ===================================================================== */
const T1 = "https://native-ads-dev.appless.workers.dev/", T2 = "https://flicks.flamapp.live/", T3 = "https://native-ads.appless.workers.dev/";
const BRANDS = {
  neck:{ name:"David Yurman", av:"DY", avc:"#8a6a2f", src:T2+"ikutv6/ad.js", tall:true, kind:"site", cta:"Shop Now", unit:"Style", home:"https://www.davidyurman.com/",
    head:"The necklace from tonight's scene", variants:[{},{},{}] },
  outfit:{ name:"Levi's", av:"L", avc:"#c41230", src:T2+"dox37k/ad.js", kind:"site", cta:"Shop Now", unit:"Look", home:"https://www.levi.com/",
    head:"Wear what she wore", variants:[{},{},{}] },
  gucci:{ name:"Gucci", av:"G", avc:"#1c3a2a", src:T2+"ocbyu3/ad.js", tall:true, kind:"site", cta:"Explore", unit:"Look", home:"https://www.gucci.com/",
    head:"The new collection", variants:[{},{},{}] },
  zara:{ name:"Zara", av:"Z", avc:"#111", src:T1+"zara/ad.js", tall:true, kind:"site", cta:"Shop Now", unit:"Look", bg:"#fff", home:"https://www.zara.com/",
    head:"New season, three looks", variants:[{},{},{}] },
  grwm:{ name:"Get Ready With Me", av:"GR", avc:"#c0477f", src:T1+"flicks1-grwm/ad.js", tall:true, kind:"none", unit:"Dress", named:true,
    head:"Get ready with me", variants:[{n:"Red"},{n:"Blue"},{n:"Black"}] },
  ugc:{ name:"Tadka Originals", av:"T", avc:"#e3138b", src:T1+"flicks4-ugc-p1/ad.js", kind:"watch", cta:"Watch Now", unit:"Lead", label:"Promoted",
    head:"Pick who plays the lead", variants:[{},{}] },
  lip:{ name:"Ulta Beauty", av:"U", avc:"#e9552b", src:T2+"onflg2/ad.js", kind:"site", cta:"Shop Now", unit:"Shade", home:"https://www.ulta.com/",
    head:"Her lip shade, in three tones", variants:[{},{},{}] },
  eye:{ name:"e.l.f.", av:"elf", avc:"#111", src:T2+"it6hi9/ad.js", kind:"site", cta:"Shop Now", unit:"Look", home:"https://elfcosmetics.com/",
    head:"The eye look from the episode", variants:[{},{},{}] },
  levis:{ name:"Levi's", av:"L", avc:"#c41230", src:T1+"6a96c6969e74536944c4167f_z64116/ad.js", kind:"site", cta:"Shop Now", unit:"Style", home:"https://www.levi.com/",
    head:"The denim everyone's wearing", variants:[{},{},{}] },
  nike:{ name:"Nike", av:"N", avc:"#111", src:T1+"6a97885c9e74536944d35d53_dsefds/ad.js", kind:"site", cta:"Shop Now", unit:"Colour", named:true, home:"https://www.nike.in/",
    head:"Own your movement", variants:[{n:"Black"},{n:"Red"},{n:"Lilac"}] },
  westelm:{ name:"West Elm", av:"WE", avc:"#3d4a3f", src:T2+"c5htms/ad.js", kind:"site", cta:"Shop Now", unit:"Chair", home:"https://www.westelm.com/",
    head:"The accent chair from the set", variants:[{},{},{}] },
  can:{ name:"Coca-Cola", av:"C", avc:"#e41e2b", src:T2+"n0489i/ad.js", kind:"site", cta:"Explore", unit:"Flavour", named:true, home:"https://www.coca-cola.com/",
    head:"Zero Sugar. Three ways to binge", variants:[{n:"Original"},{n:"Cherry"},{n:"Vanilla"}] },
  dor:{ name:"Doritos", av:"D", avc:"#d12a1e", src:T1+"6a96c6969e74536944c4167f_vqdcng/ad.js", kind:"site", cta:"Explore", unit:"Flavour", named:true, home:"https://www.doritos.com/",
    head:"Movie night needs a crunch", variants:[{n:"Cool Ranch"},{n:"Nacho Cheese"},{n:"Spicy Sweet Chili"}] },
  bk:{ name:"Burger King", av:"BK", avc:"#d62300", src:T2+"dzvxyq/ad.js", cfg:"house", kind:"site", cta:"Order Now", unit:"Meal", home:"https://www.bk.com/",
    head:"Hungry? Order before you press play", variants:[{},{},{}] },
  merc:{ name:"Mercedes-Benz", av:"MB", avc:"#111", src:T3+"6a9bc07393e71f3ec9b12c81_i3pdeq/ad.js", kind:"site", cta:"Explore", unit:"Model", home:"https://www.mbusa.com/",
    head:"Pick the one that moves you", variants:[{},{},{}] }
};
// In-app browser. A web page can only show another site inside itself if that site allows it; of the sites the Flicks link to, these do (checked 19 Nov 2026).
const FRAME_OK = /(^|\.)nike\.in$|(^|\.)gucci\.com$/;
// Phone-width captures of the real page, for sites that refuse to be shown inside another page. Keyed by host + path.
const CAPS = { "www.zara.com/us/en/checked-bomber-jacket-p06318268.html":"w_zara", "www.doritos.com/products/doritos-salsa-verde-flavored-tortilla-chips":"w_dor" };
// Config lines that some saved tags carry ahead of their script, kept exactly as saved.
const TAGCFG = {
  house:`<script>window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="house";window.AD_CONFIG.clickTracker={"mode":"exit","template":""};<\/script>`
};
const vshort = (k,i) => { const b = BRANDS[k], v = b.variants[i]; return v.n || `${b.unit} ${i+1}`; };
const vname = (k,i) => `${BRANDS[k].name} ${vshort(k,i)}`;

/* =====================================================================
   TITLES: what the app plays. img = poster cut from the app.
   ===================================================================== */
const TT = {};
const t = (id, n, meta, tags, o={}) => TT[id] = Object.assign({ id, n, meta, tags, img:"p_"+id }, o);
t("heartbeat","Heart Beat","2026 · U/A 16+ · 3 Seasons · 5 Languages",["Drama","Procedural","Medical","Friendship","Parenthood"],
  { desc:"A year after Reena's car accident, RK Multispeciality Hospitals has begun a new chapter, with new doctors and new management but old wounds.", note:"New Episodes Thursdays", ep:"S3 E1", epn:"Home No More", epm:"30 Jul 2026 · 31m", full:true });
t("biggboss","Bigg Boss","2026 · Hindi · Reality · Rivalry",["Reality","Rivalry"],{note:"New Episode Daily", ep:"S20 E73", epn:"Day 72: The Post-Nomination Chaos"});
t("dhamaal","Dhamaal With Pati Patni Aur Panga","2026 · Hindi · Reality · Comedy",["Reality","Comedy"],{ep:"S1 E12"});
t("roadies","Roadies Rebirth","2026 · Hindi · Reality",["Reality","Adventure"],{ep:"S1 E8"});
t("office","Mr & Mrs Office","2026 · Hindi · Comedy",["Comedy","Workplace"],{note:"New Episodes Wed", ep:"S1 E4"});
t("chiranjeevi","Chiranjeevi","2026 · Telugu · Drama",["Drama"]);
t("dilwaniya","Dulhaniya Le Aaegi","2026 · Hindi · Romance",["Romance","Comedy"]);
t("koffee","Koffee with Karan","2026 · Hindi · Talk Show",["Talk Show"],{note:"New Episode Wed", ep:"S9 E6"});
t("obsession","Obsession","2026 · 6 Languages · Horror · Thriller",["Horror","Thriller"]);
t("suits","Suits","2019 · English · Legal Drama",["Drama","Legal"]);
t("msdhoni","M.S. Dhoni: The Untold Story","2016 · Hindi · Biopic",["Biopic","Sports"]);
t("roarlion","Roar of the Lion","2019 · Hindi · Docuseries",["Documentary","Sports"]);
t("83","83","2021 · Hindi · Sports Drama",["Sports","Drama"]);
t("mahabharatham","Mahabharatham","Telugu · Mythology",["Mythology"]);
t("starmaa2","Star Maa Serial","Telugu · Mythology",["Mythology","Romance"]);
t("bbtelugu","Bigg Boss (Regional)","2026 · Reality",["Reality"],{note:"New Episode Daily"});
t("wolf","The Wolf of Wall Street","2013 · English · Comedy · Crime",["Comedy","Crime"]);
t("dhadkan","Aavesham","2024 · Malayalam · Action · Comedy",["Action","Comedy"]);
t("beautifuldisaster","Beautiful Disaster","2023 · English · Romance",["Romance"]);
t("maainti","Maa Inti Bangaaram","2026 · Now in Hindi · Action",["Action","Drama"]);
t("ohsukumari","Oh..! Sukumari","2026 · Telugu · Romance · Comedy",["Romance","Comedy"]);
t("colony","Colony","2026 · Korean · Thriller",["Thriller"]);
t("askme","Ask Me What You Want","2024 · Spanish · Romance",["Romance"]);
t("beautybeast","Beauty and the Beast","2017 · English · Fantasy · Romance",["Fantasy","Romance"]);
t("shiddat","Shiddat","2021 · Hindi · Romance",["Romance","Drama"]);
t("liger","Liger","2022 · Telugu · Action",["Action","Sports"]);
t("mirai","Mirai","2025 · Telugu · Action · Fantasy",["Action","Fantasy"]);
t("imgame","I'm Game","2026 · Malayalam · Action",["Action"]);
t("welcomejungle","Welcome to the Jungle","2026 · Hindi · Comedy",["Comedy","Action"]);
t("varahi","Mahendragiri Varahi","2026 · Telugu · Fantasy",["Fantasy","Thriller"]);
t("hanuman","The Legend of Hanuman","2026 · 7 Seasons · Animation",["Animation","Mythology"],{note:"New Season"});
t("doraemon","Doraemon","Kids · Animation",["Kids","Animation"]);
t("kabirsingh","Kabir Singh","2019 · Hindi · Romance · Drama",["Romance","Drama"]);
t("pokemon","Pokémon","Hindi · Kids · Animation",["Kids","Animation"]);
t("pokemon2","Pokémon the Movie: The Power of Us","2018 · Kids · Animation",["Kids","Animation"]);
t("pokemon3","Pokémon Ranger and the Temple of the Sea","2006 · Kids · Animation",["Kids","Animation"]);
t("bbkannada","Bigg Boss (Regional)","2026 · Reality",["Reality"],{note:"New Episode Daily"});
t("bbtamil","Bigg Boss (Regional)","2026 · Reality",["Reality"]);
t("laughterchefs","Laughter Chefs","2026 · Hindi · Comedy · Reality",["Comedy","Reality"]);
t("perfectcrown","Perfect Crown","2026 · Korean · Romance",["Romance","Drama"]);
t("magicshiri","The Magic of Shiri","2024 · Hindi · Drama",["Drama"]);
t("khalbali","Khalbali Records","2024 · Hindi · Musical Drama",["Drama","Music"]);
t("honeymoon","Honeymoon Photographer","2024 · Hindi · Thriller",["Thriller"]);
t("roslin","Roslin","2026 · Malayalam · Thriller",["Thriller","Drama"]);
t("sangamarmar","Sangamarmar","2026 · Hindi · Romance",["Romance","Drama"]);
t("yehrishta","Yeh Rishta Kya Kehlata Hai","Hindi · Family Drama",["Drama","Family"]);
t("anupamaa","Anupamaa","Hindi · Family Drama",["Drama","Family"]);
t("fitoor","Yeh Fitoor Tera","2026 · Hindi · Romance",["Romance"]);
t("draarohi","Dr. Aarohi","2026 · Hindi · Medical Drama",["Drama","Medical"]);
t("badboy","The Bad Boy and Me 2","2026 · English · Romance",["Romance"]);
t("drishyam","Drishyam","2015 · Hindi · Thriller",["Thriller","Crime"]);
t("queen","Queen","2026 · Hindi · Drama · Political",["Drama","Political"],{note:"New Release"});
t("apsara","Apsara","2026 · Hindi · Fantasy · Thriller",["Fantasy","Thriller"]);
t("terrifier","Terrifier 2","2022 · English · Horror",["Horror"]);
t("12th","12th Fail","2023 · Hindi · Drama",["Drama","Biopic"]);
t("paradha","Paradha","2025 · Telugu · Drama",["Drama"]);
t("tumdena","O Humnava Tum Dena Saath Mera","Hindi · Family Drama",["Drama","Romance"],{img:"s_tumdena"});
t("brahmastra","Brahmastra Part One: Shiva","2022 · Hindi · Fantasy · Action",["Fantasy","Action"],{img:"s_brahmastra"});
t("moana","Moana","2026 · 4 Languages · Adventure · Action",["Adventure","Family"],{img:"h_moana", sub:true});
t("bethlehem","Bethlehem Kudumba Unit","2026 · 5 Languages · Romance · Comedy",["Romance","Comedy"],{img:"h_bethlehem"});
// sports clips (landscape)
const CLIPS = {
  l_dhoni7:["MS Dhoni's Journey to Immortality in Chennai","7m"], l_wtc:["India's WTC Hopes Hinge on Kiwi Double","5m"],
  l_bb24:["BBS20: 24 HRS Channel [Deferred]","LIVE"], l_bbday72:["BBHin Day 72: The Post-Nomination Chaos","1h 8m"],
  l_stumpings:["Dhoni's Best Stumpings in TATA IPL","5m"], l_finishes:["MS Dhoni's Best Finishes in TATA IPL","13m"],
  l_mi:["MI Retention Review","4m"], l_rcb:["RCB Retention Review","4m"], l_irfan:["Irfan Pathan Opens Up on Dhoni's Retirement","1m"], l_raina:["Raina Rewinds CSK's Golden Era with Dhoni","4m"],
  l_drs:["2023: Dhoni Review System!","3m"], l_gut:["2022: Dhoni's Gut Feeling vs Kohli","3m"], l_sp1:["Sandpapergate: The Debate Reopens!","15m"], l_sp2:["Khawaja's 'Afterthought' Too Little Too Late?","14m"],
  l_aaryavir:["Don't Want to be Known as Sehwag 2.0: Aaryavir","7m"], l_virat:["Kohli on Cricket, Legacy and What's Ahead","29m"],
  l_t10a:["UAE Bulls vs Royal Desert Champions: Highlights","13m"], l_t10b:["Yas Lions vs Arabian Aces: Highlights","14m"],
  l_supersinger:["Star Vijay Super Singer","LIVE"], l_kalakkal:["Star Vijay Kalakkal Comedy","LIVE"]
};
const MD_BASE = "https://microdrama-audio-diff.vercel.app/videos/", MD_PREVIEW = MD_BASE + "English.mp4";
// Tadka micro-dramas. preview = the video a card plays by itself in the feed, silent. video:true plays the real micro-drama file; the others show their cover.
const TADKA = [
  // Blank Cheque is Flam's own shoppable micro-drama preview: the episode plays and the Flick comes in inside it. It is shown as it is, untouched.
  { id:"blankcheque", n:"Blank Cheque", meta:"Episode 3", tags:"Drama · Shoppable", frame:"https://flamdesign.github.io/FlicksLibrary/preview/blank-cheque-s1e03-bd4186/", poster:"https://flamdesign.github.io/FlicksLibrary/preview/blank-cheque-s1e03-bd4186/media/poster.jpg", preview:"https://flamdesign.github.io/FlicksLibrary/preview/blank-cheque-s1e03-bd4186/media/main.mp4", badge:"Shop while you watch" },
  { id:"delivery", n:"The Last Delivery", meta:"24 Eps · 4 Languages", tags:"Thriller · Mystery", img:"o_delivery", video:true, preview:MD_PREVIEW, badge:"New Episodes Daily" },
  { id:"reality", n:"Reality Check", meta:"10 Eps · Hindi", tags:"Celebrities · Reality", img:"tk_reality", cut:true },
  { id:"rizz", n:"Rizz Master", meta:"375 Eps · Hindi", tags:"Looking for Love · Reality", img:"tk_rizz", cut:true },
  { id:"ceo", n:"My Secret CEO", meta:"80 Eps · 2 Languages", tags:"Rich vs Poor · Romance", img:"o_ceo", badge:"New Episodes Added" },
  { id:"pregnant", n:"Pregnant Luxury Empire Heir", meta:"47 Eps · 2 Languages", tags:"Rich vs Poor · Romance", img:"tk_pregnant", cut:true },
  { id:"redsilk", n:"Red Silk", meta:"42 Eps · Hindi", tags:"Fashion · Drama", img:"o_redsilk" },
  { id:"heartbeatmd", n:"Heart Beat", meta:"117 Eps · Tamil", tags:"Medical · Drama", img:"tk_heartbeat", cut:true }
];
const LANGS = [["English","English"],["Kannada","ಕನ್ನಡ"],["Japanese","日本語"],["Spanish","Español"]];
// search: words that bring up a sponsored result
const SPON = [[/cricket|sport|ipl|match|dhoni|kohli|fitness/i,"nike"],[/roman|love|wedding|date|drama|shaadi/i,"neck"],[/comedy|fun|party|snack|laugh/i,"dor"],[/fashion|style|look|outfit|dress/i,"outfit"],[/beauty|makeup|lip/i,"lip"]];
