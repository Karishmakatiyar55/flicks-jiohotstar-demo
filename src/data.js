/* =====================================================================
   FLICKS: every creative used in the demo, one record each, and each used in one place only.
   Sources are the saved flicks-ad-tags codes. Flicks saved as web embeds
   (embed.js + <flam-embed id>) run as the same Flick's own ad tag,
   https://flicks.flamapp.live/<id>/ad.js, so the app can hide the Flick's
   button, follow its options and control its sound.

   The app's button under a Flick opens a store inside JioHotstar, the way the app's own
   Shop (Instamart) and Order Food (Swiggy) tabs do: the product for the option on screen,
   the cart, phone number, OTP, order placed. Nothing leaves the app.
   store: instamart = groceries, snacks, drinks, electronics, toys
          swiggy    = restaurant food
          nykaa     = make-up and hair
          nykaaf    = clothing, jewellery, watches (Nykaa Fashion)
          ajio      = the shirt Flick, whose own tag points at ajio.com
          lead      = nothing to buy: a call-back request to the brand (cars)
   kind:  shop  = opens the store      watch = the app's own content: the button opens the micro-drama
   shape: square unless tall (9:16), wide (16:9) or r43 (4:3). Taken from each tag's own script on 24 Nov 2026.
   item / price: what the store shows for the Flick. THE PRICES ARE PLACEHOLDERS, not the brands' prices,
   and the item names are generic because the tags do not name their options.
   Option names that are not known show as the unit and a number ("Shade 2").
   ===================================================================== */
const T1 = "https://native-ads-dev.appless.workers.dev/", T2 = "https://flicks.flamapp.live/", T3 = "https://native-ads.appless.workers.dev/";
const V3 = () => [{},{},{}];
const BRANDS = {
  /* ---- jewellery and watches ---- */
  reva:{ name:"Reva Diamonds", av:"R", avc:"#7a5a2e", src:T2+"y1zcql/ad.js", cfg:"reva", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Style", item:"Diamond pendant", price:18500,
    head:"Diamonds for every day", variants:V3() },
  fossil:{ name:"Fossil", av:"F", avc:"#3a2a1c", src:T2+"zh7hpt/ad.js", cfg:"fossil", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Watch", item:"Men's watch", price:11995,
    head:"Three watches, one tap apart", variants:V3() },
  mia:{ name:"Mia by Tanishq", av:"M", avc:"#b0344f", src:T2+"vvb28h/ad.js", cfg:"mia", wide:true, kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Necklace", item:"Necklace", price:24999,
    head:"The necklace from the scene", variants:V3() },
  neck:{ name:"David Yurman", av:"DY", avc:"#8a6a2f", src:T2+"ikutv6/ad.js", tall:true, kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Style", item:"Gold necklace", price:145000,
    head:"The necklace from tonight's scene", variants:V3() },
  /* ---- make-up and hair ---- */
  lorlip:{ name:"L'Oréal Paris", av:"L'O", avc:"#111", src:T3+"6aa2aef14954ac6f0d9dcd05_s6bp0g/ad.js", cfg:"loreal", r43:true, kind:"shop", store:"nykaa", cta:"Shop Now", unit:"Shade", item:"Lipstick", price:899,
    head:"Her lip shade, in three tones", variants:V3() },
  lorhair:{ name:"L'Oréal Paris", av:"L'O", avc:"#111", src:T3+"6aa2aef14954ac6f0d9dcd05_w6l3nz/ad.js", cfg:"loreal", tall:true, kind:"shop", store:"nykaa", cta:"Shop Now", unit:"Colour", named:true, item:"Excellence Crème hair colour", price:649,
    // Colour names are the ones printed on the Flick's own option buttons.
    head:"The hair colour from the show", variants:[{n:"Beige Brown"},{n:"Burgundy"},{n:"Caramel Brown"}] },
  eye:{ name:"e.l.f.", av:"elf", avc:"#111", src:T2+"it6hi9/ad.js", kind:"shop", store:"nykaa", cta:"Shop Now", unit:"Look", item:"Eyeshadow palette", price:1150,
    head:"The eye look from the episode", variants:V3() },
  lip:{ name:"Ulta Beauty", av:"U", avc:"#e9552b", src:T2+"onflg2/ad.js", kind:"shop", store:"nykaa", cta:"Shop Now", unit:"Shade", item:"Lipstick", price:1450,
    head:"Three lip shades for date night", variants:V3() },
  /* ---- clothing ---- */
  gucci:{ name:"Gucci", av:"G", avc:"#1c3a2a", src:T2+"ocbyu3/ad.js", tall:true, kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Look", item:"Dress", price:245000,
    head:"The new collection", variants:V3() },
  zara:{ name:"Zara", av:"Z", avc:"#111", src:T1+"zara/ad.js", tall:true, kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Look", bg:"#fff", item:"Bomber jacket", price:5990,
    head:"New season, three looks", variants:V3() },
  outfit:{ name:"Levi's", av:"L", avc:"#c41230", src:T2+"dox37k/ad.js", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Look", item:"Baggy overalls", price:5499,
    head:"Wear what she wore", variants:V3() },
  levis:{ name:"Levi's", av:"L", avc:"#c41230", src:T1+"6a96c6969e74536944c4167f_z64116/ad.js", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Style", item:"Denim", price:3999,
    head:"The denim everyone's wearing", variants:V3() },
  nike:{ name:"Nike", av:"N", avc:"#111", src:T1+"6a97885c9e74536944d35d53_dsefds/ad.js", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Colour", named:true, item:"Training wear", price:3495,
    head:"Own your movement", variants:[{n:"Black"},{n:"Red"},{n:"Lilac"}] },
  ua:{ name:"Under Armour", av:"UA", avc:"#111", src:T2+"vq0vp6/ad.js", cfg:"ua", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Colour", named:true, item:"HeatGear crop top", price:2999,
    head:"Breathe. Sip. Go again.", variants:[{n:"Black"},{n:"Pink"},{n:"Lime"}] },
  gapus:{ name:"Gap", av:"GAP", avc:"#14213d", src:T1+"mti1bs/ad.js", cfg:"studio", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Look", item:"Shirt", price:2999,
    head:"Three looks for the weekend", variants:V3() },
  gapin:{ name:"Gap", av:"GAP", avc:"#14213d", src:T3+"6a9eb4cd93e71f3ec92010f1_im75ys/ad.js", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Look", item:"Outfit", price:3499,
    head:"The look from the episode", variants:[{},{},{},{}] },
  patagonia:{ name:"Patagonia", av:"P", avc:"#2b4c7e", src:T1+"6a91088b3252dba34b486df1_q18dy8/ad.js", kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Colour", item:"Jacket", price:12900,
    head:"The jacket from the episode", variants:V3() },
  puffer:{ name:"Puffer Jacket", av:"PJ", avc:"#35507a", src:T1+"flicks2-jacket-p1/ad.js", tall:true, kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Colour", item:"Puffer jacket", price:4499, label:"Sponsored",
    head:"One jacket, three colours", variants:V3() },
  grwm:{ name:"Get Ready With Me", av:"GR", avc:"#c0477f", src:T1+"flicks1-grwm/ad.js", tall:true, kind:"shop", store:"nykaaf", cta:"Shop Now", unit:"Dress", named:true, item:"Dress", price:2799,
    head:"Get ready with me", variants:[{n:"Red"},{n:"Blue"},{n:"Black"}] },
  shirt:{ name:"AJIO", av:"A", avc:"#2c4152", src:T2+"tnro5s/ad.js", cfg:"shirt", tall:true, kind:"shop", store:"ajio", cta:"Shop Now", unit:"Shirt", item:"Men's shirt", price:1299,
    head:"Pritam and Pedro", variants:V3() },
  /* ---- food and drink ---- */
  caesars:{ name:"Little Caesars", av:"LC", avc:"#f36f21", src:T1+"xlgqpx/ad.js", cfg:"studio", kind:"shop", store:"swiggy", cta:"Order Now", unit:"Pizza", item:"Pizza", price:399,
    head:"Your slice is calling", variants:V3() },
  bk:{ name:"Burger King", av:"BK", avc:"#d62300", src:T2+"dzvxyq/ad.js", cfg:"house", kind:"shop", store:"swiggy", cta:"Order Now", unit:"Meal", item:"Meal", price:249,
    head:"Hungry? Order before you press play", variants:V3() },
  can:{ name:"Coca-Cola", av:"C", avc:"#e41e2b", src:T2+"n0489i/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Flavour", named:true, item:"Zero Sugar can, 300 ml", price:40,
    head:"Zero Sugar. Three ways to binge", variants:[{n:"Original"},{n:"Cherry"},{n:"Vanilla"}] },
  juice:{ name:"Tropicana", av:"T", avc:"#f28c00", src:T2+"tyon6l/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Flavour", item:"Juice, 1 L", price:120,
    head:"Pick your flavour", variants:V3() },
  dor:{ name:"Doritos", av:"D", avc:"#d12a1e", src:T1+"6a96c6969e74536944c4167f_vqdcng/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Flavour", named:true, item:"Chips", price:50,
    head:"Movie night needs a crunch", variants:[{n:"Cool Ranch"},{n:"Nacho Cheese"},{n:"Spicy Sweet Chili"}] },
  benjerry:{ name:"Ben & Jerry's", av:"B&J", avc:"#2a6fb7", src:T1+"6a96c6969e74536944c4167f_z1fp1a/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Flavour", item:"Ice cream tub", price:499,
    head:"A tub for the second half", variants:V3() },
  mms:{ name:"M&M's", av:"m", avc:"#6b3e26", src:T1+"6a8e82a03252dba34b484fa9_xvaz4d/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Pack", item:"Chocolate pack", price:150,
    head:"Something sweet for the finale", variants:V3() },
  genmills:{ name:"General Mills", av:"GM", avc:"#1d4f91", src:T1+"kbf8k6/ad.js", cfg:"studio", kind:"shop", store:"instamart", cta:"Order Now", unit:"Pick", item:"Breakfast cereal", price:299,
    head:"Breakfast, sorted", variants:V3() },
  /* ---- electronics, toys, pets ---- */
  bose:{ name:"Bose", av:"B", avc:"#111", src:T1+"6a9733389e74536944cd96bd_baspn2/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Colour", item:"Headphones", price:29900,
    head:"Hear every line", variants:V3() },
  sony:{ name:"Sony", av:"S", avc:"#111", src:T1+"6a96c6969e74536944c4167f_dj5rq6/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Pick", item:"Sony product", price:24990,
    head:"Match day, upgraded", variants:V3() },
  lego:{ name:"LEGO", av:"L", avc:"#d01012", src:T1+"6a96c6969e74536944c4167f_u008vu/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Set", item:"Building set", price:2499,
    head:"Build it after the show", variants:V3() },
  barkbox:{ name:"BarkBox", av:"BB", avc:"#3f7fbf", src:T1+"6a8e82a03252dba34b484fa9_zi294y/ad.js", kind:"shop", store:"instamart", cta:"Order Now", unit:"Box", item:"Dog toy box", price:1499,
    head:"A treat for your co-watcher", variants:V3() },
  /* ---- cars: nothing to add to a cart, so the button asks for a call back ---- */
  merc:{ name:"Mercedes-Benz", av:"MB", avc:"#111", src:T3+"6a9bc07393e71f3ec9b12c81_i3pdeq/ad.js", kind:"shop", store:"lead", cta:"Book a Test Drive", unit:"Model", item:"Test drive",
    head:"Pick the one that moves you", variants:V3() },
  /* ---- cards: nothing to add to a cart, so the button asks for a call back ---- */
  amex:{ name:"American Express", av:"AX", avc:"#016fd0", src:T1+"f41m4u/ad.js", cfg:"house", kind:"shop", store:"lead", cta:"Get Your Card", unit:"Card", item:"Card application",
    head:"The world, on your terms", variants:V3() },
  /* ---- the app's own promo ---- */
  ugc:{ name:"Tadka Originals", av:"T", avc:"#e3138b", src:T1+"flicks4-ugc-p1/ad.js", kind:"watch", cta:"Watch Now", unit:"Lead", label:"Promoted",
    head:"Pick who plays the lead", variants:[{},{}] }
};
// The stores that open inside JioHotstar. Instamart and Swiggy are the two the app carries today (its Shop and Order Food tabs); their lines are the ones those tabs show.
const STORES = {
  instamart:{ n:"Instamart", col:"#1f4fd8", line:"Order, sit back, relax!", eta:"10 mins", tab:"Shop" },
  swiggy:{ n:"Swiggy", col:"#f15700", line:"Food you love, on time.", eta:"25 mins", tab:"Order Food" },
  nykaa:{ n:"Nykaa", col:"#e80071", line:"", eta:"2 days", tab:"Beauty" },
  nykaaf:{ n:"Nykaa Fashion", col:"#111318", line:"", eta:"3 days", tab:"Fashion" },
  ajio:{ n:"AJIO", col:"#2c4152", line:"", eta:"3 days", tab:"Fashion" },
  lead:{ n:"", col:"#111318", line:"", eta:"", tab:"" }
};
// Config lines that the saved tags carry ahead of their script, kept exactly as saved.
const FONTSCAN = `<script>(function(){var seen={},head=document.head||document.documentElement,until=Date.now()+3e4;function add(css){if(seen[css])return;seen[css]=1;var s=document.createElement("style");s.setAttribute("data-vertex-fonts","");s.textContent=css;head.appendChild(s)}function scan(){try{var ps=document.getElementsByTagName("vertex-player");for(var i=0;i<ps.length;i++){var r=ps[i].shadowRoot;if(!r)continue;var n=r.querySelectorAll("style,link[rel=stylesheet]");for(var j=0;j<n.length;j++){var el=n[j];if(el.tagName==="LINK"){if(/fonts\\.googleapis\\.com/.test(el.href)&&!seen[el.href]){seen[el.href]=1;var l=document.createElement("link");l.rel="stylesheet";l.href=el.href;head.appendChild(l)}continue}var m=(el.textContent||"").match(/@font-face\\s*\\{[^}]*\\}/g);if(m)add(m.join(""))}}}catch(e){}if(Date.now()<until)setTimeout(scan,250)}scan()})();<\/script>`;
const PUBINFO = `window.AD_CONFIG.publisherInfo={"publisher_id":"\${PUBLISHER_ID}","adsxt_publisher_id":"\${ADSXT_PUBLISHER_ID}","universal_site_id":"\${UNIVERSAL_SITE_ID}","source_url":"\${SOURCE_URL}","source_url_enc":"\${SOURCE_URL_ENC}","adsxt_ad_system_domain":"\${ADSXT_AD_SYSTEM_DOMAIN}"};`;
const CLICKCFG = (link, dsp) => `<script>var clickTag = "${link}";<\/script>\n<script>window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="${dsp}";${PUBINFO}window.AD_CONFIG.clickTracker={"mode":"clicktag","template":""};<\/script>`;
const TAGCFG = {
  house:`<script>window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="house";window.AD_CONFIG.clickTracker={"mode":"exit","template":""};<\/script>`,
  studio:`<script>window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="dv360_studio";${PUBINFO}window.AD_CONFIG.clickTracker={"mode":"exit","template":""};<\/script>`,
  fossil:CLICKCFG("https://www.fossil.in/watches/mens-watches/", "dv360 studio"),
  reva:CLICKCFG("https://www.revabypng.com/", "dv360_studio"),
  shirt:CLICKCFG("https://www.ajio.com/men-shirts/c/830216013", "dv360_studio"),
  mia:CLICKCFG("https://www.miabytanishq.com/en_IN/necklaces-and-pendants", "dv360_studio"),
  ua:`<script>window.clickTag="\${CLICK_URL}";window.AD_CONFIG=window.AD_CONFIG||{};window.AD_CONFIG.dsp="dv360_3p";window.AD_CONFIG.macros={"publisher_id":"\${PUBLISHER_ID}","universal_site_id":"\${UNIVERSAL_SITE_ID}","exchange_id":"\${EXCHANGE_ID}","app_bundle":"\${BUNDLE_ID}","adsxt_publisher_id":"\${ADSXT_PUBLISHER_ID}","adsxt_ad_system_domain":"\${ADSXT_AD_SYSTEM_DOMAIN}","adstxt_ad_system_domain":"\${ADSTXT_AD_SYSTEM_DOMAIN}","dsp_line_item_id":"\${CAMPAIGN_ID}","dsp_insertion_order_id":"\${INSERTION_ORDER_ID}","dsp_creative_id":"\${CREATIVE_ID}","inventory_source_id":"\${INVENTORY_SOURCE_EXTERNAL_ID}","auction_id":"\${AUCTION_ID}","impression_id":"\${IMPRESSION_ID}","geo_dma":"\${GEO_DMA}","gdpr":"\${GDPR}","source_url":"\${SOURCE_URL}","source_url_enc":"\${SOURCE_URL_ENC}"};window.AD_CONFIG.clickTracker={"mode":"clicktag","template":""};<\/script>`,
  loreal:`<script>var ExitApi=window.ExitApi||{exit:function(){}};var clickTag=(function(){try{var s=(location.search||"")+"&"+((location.hash||"").replace(/^#/,""));var m=/[?&]clickTag=([^&]*)/.exec(s);return m?decodeURIComponent(m[1]):"";}catch(e){return "";}})();<\/script>\n${FONTSCAN}`
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
t("biggboss","Bigg Boss","2026 · U/A 16+ · Hindi",["Reality","Rivalry","Controversial","Competition","Friends"],{note:"New Episode Daily at 09:00PM", ep:"S19 E94", epn:"Day 93: Ticket to Finale", stills:["bb_s0","bb_s1","bb_s2"]});
t("dhamaal","Dhamaal With Pati Patni Aur Panga","2026 · Hindi · Reality · Comedy",["Reality","Comedy"],{ep:"S1 E12"});
t("roadies","Roadies Rebirth","2026 · Hindi · Reality",["Reality","Adventure"],{ep:"S1 E8"});
t("office","Mr & Mrs Office","2026 · Hindi · Comedy",["Comedy","Workplace"],{note:"New Episodes Wed", ep:"S1 E4"});
t("chiranjeevi","Chiranjeevi","2026 · Telugu · Drama",["Drama"]);
t("dilwaniya","Dulhaniya Le Aaegi","2026 · Hindi · Romance",["Romance","Comedy"]);
t("koffee","Koffee with Karan","2026 · Hindi · Talk Show",["Talk Show"],{note:"New Episode Wed", ep:"S9 E6"});
t("obsession","Obsession","2026 · 6 Languages · Horror · Thriller",["Horror","Thriller"]);
t("obsreplay","Obsession Replay","Peacock on JioHotstar",["Peacock"],{img:"ob_poster", frame:"obsession-preview.html", ep:"Replay"});
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
  // An episode that is itself a Flick: the "In-shots Shirt change" tag. It plays in the feed and full screen, and the shirt can be changed and bought in both.
  { id:"pritam", n:"Pritam and Pedro", meta:"Hotstar Specials", tags:"Shop while you watch", flick:"shirt" },
  { id:"delivery", n:"The Last Delivery", meta:"24 Eps · 4 Languages", tags:"Thriller · Mystery", img:"o_delivery", video:true, preview:MD_PREVIEW, badge:"New Episodes Daily" },
  { id:"reality", n:"Reality Check", meta:"10 Eps · Hindi", tags:"Celebrities · Reality", img:"tk_reality", cut:true },
  { id:"rizz", n:"Rizz Master", meta:"375 Eps · Hindi", tags:"Looking for Love · Reality", img:"tk_rizz", cut:true },
  { id:"ceo", n:"My Secret CEO", meta:"80 Eps · 2 Languages", tags:"Rich vs Poor · Romance", img:"o_ceo", badge:"New Episodes Added", look:"patagonia" },
  { id:"pregnant", n:"Pregnant Luxury Empire Heir", meta:"47 Eps · 2 Languages", tags:"Rich vs Poor · Romance", img:"tk_pregnant", cut:true, look:"neck" },
  { id:"redsilk", n:"Red Silk", meta:"42 Eps · Hindi", tags:"Fashion · Drama", img:"o_redsilk", look:"gapin" },
  { id:"heartbeatmd", n:"Heart Beat", meta:"117 Eps · Tamil", tags:"Medical · Drama", img:"tk_heartbeat", cut:true }
];
const LANGS = [["English","English"],["Kannada","ಕನ್ನಡ"],["Japanese","日本語"],["Spanish","Español"]];
// search: words that bring up a sponsored result
const SPON = [[/cricket|sport|ipl|match|dhoni|kohli|football/i,"ua"],[/kid|cartoon|anim|pokemon|doraemon|family/i,"lego"],[/comedy|fun|party|snack|laugh|breakfast/i,"genmills"],[/dog|pet|puppy/i,"barkbox"]];
