# Working in this repo

## Always push every change

After any change to the demo, in the same turn:

1. Edit the source, not the build: the files in `src/` (`app.js`, `engine.js`, `data.js`, `app.css`, `template.html`) or `src/assets/`.
2. Rebuild: `python3 scripts/build.py` (regenerates `index.html`). Never hand-edit `index.html`.
3. Commit with a short message describing the change, then `git push origin main`.
4. Confirm with `git ls-remote origin main` that the remote matches `git rev-parse HEAD`. If the push fails, say so plainly.

## Never commit

- The original screen recording or extracted frames (`*.mp4`, `*.mov`, `frames/`).

## Demo rules to keep (set 18 Nov 2026: build it like the bigbasket and noon demos)

- It is a working replica of the JioHotstar app with Flicks placed in it, not a guided tour. No explanatory text on the page; notes live in the README only.
- JioHotstar is a streaming app, so Flicks sit in ad breaks while content plays, in the app's own swipeable ad slots, in Tadka, and as "shop the look" units that sell what is seen on screen.
- Flicks come from the saved `flicks-ad-tags` codes, unchanged, and each must fit the content around it. Prefer Flicks that look like content.
- No audio leaks: a Flick is silenced unless at least half of it is on screen; leaving a screen removes every Flick and video on it.
- Flicks saved as web embeds run as their ad tag (`https://flicks.flamapp.live/<id>/ad.js`).
- No button inside a Flick where the app shows its own; never hide the option switcher (do not blanket-hide `[data-vertex-trigger]`).
- Options are changed only inside the Flick (set 19 Nov 2026). Nothing outside a Flick may switch its option: the rows and chips under or beside a Flick show the option name and price and highlight the one the Flick is on, and are not buttons. Do not bring back `setVariant` calls from the app's own UI.
- Blank Cheque (Tadka, `#/reel/blankcheque`) is Flam's own shoppable micro-drama preview, shown in a frame exactly as it is. Do not overlay or alter it. The app cannot mute that frame, so the frame is removed whenever its slide is not the one on screen, a sheet is open, or the tab is hidden.
- Opening a Tadka episode full screen never asks to play again (set 19 Nov 2026): it carries on from the moment the card's preview had reached. For the micro-drama video the start time is passed along. For Blank Cheque the page's HTML is fetched and put in the frame with its own address as `<base>`, so the app can press the page's own Play and call its own `__fp.seek`; nothing the page shows is changed. A small shim asks for the page's music files with CORS, because its audio graph is silent otherwise. If the HTML cannot be fetched the page is framed directly and opens on its own start screen.
- Tadka feed cards behave like the app's own (set 19 Nov 2026): the cover shows for about a second, then the card plays by itself, silent, one card at a time; the play button at the bottom right opens it full screen.
- Full screen means nothing of the app sits over the episode. On Blank Cheque the app shows no controls at all (its own X closes it, through its `flicks:close` message) and the frame starts below the phone's status bar. On the other micro-dramas the app's controls fade out after three seconds and come back on a tap. On phones the "Ad slots" pill is hidden while they are hidden.
- The demo opens on a JioHotstar launch screen (set 19 Nov 2026): the logo alone on a dark blue-to-plum background for about two seconds, then it fades into Home. The app loads underneath and no Flick may be heard until it is gone. It shows once per page load.
- Ordering happens inside JioHotstar (set 24 Nov 2026, replaces the 19 Nov "brand's own page" rules). The app already carries Instamart in its Shop tab and Swiggy in its Order Food tab; the demo follows that journey. The app's button under a Flick opens a store sheet that slides up inside the app (`openStore` in `src/app.js`): the product for the option the Flick is on, the cart, phone number, OTP, order placed. Nothing opens a browser, a new tab or a brand site. Do not bring back the in-app browser, `openSite`, page captures or link look-ups.
- Which store opens is set per Flick (`store` in `src/data.js`): food from restaurants is Swiggy, groceries, snacks, drinks, electronics and toys are Instamart, make-up and hair are Nykaa, clothing, jewellery and watches are Nykaa Fashion. The shirt Flick opens AJIO because its own tag points at ajio.com. Cars have nothing to add to a cart, so their button asks for a call back (`store:"lead"`).
- The prices in the store are placeholders and the item names are generic (`item`, `price` in `src/data.js`); the tags do not carry them. Say so whenever asked. The picture in the cart is the Flick's own option picture, read from the Flick when the button is pressed.
- The phone number typed in the store is kept only on the page and sent nowhere. The OTP fills in by itself after a moment; no message is sent.
- No Flick tag is used twice (set 24 Nov 2026). Each record in `BRANDS` is placed in exactly one slot. Before adding a placement, check the tag is not already placed.
- Jewellery and watches lead the Home page (Reva Diamonds and Fossil in the masthead), then L'Oréal. Keep FMCG Flicks in the mix.
- In-content Flick (set 24 Nov 2026): the "In-video necklace change with video preview" page from the skill (`https://flam-ads-uploader.vercel.app/d/fa79cf12-f683-4d9c-b6a9-ef61ebddd1d1`) is the video in which the Mia by Tanishq Flick comes on by itself at 0:22. A byte-for-byte copy of that page is kept in the repo as `obsession-preview.html` (taken 24 Nov 2026; if Flam updates the page, take a fresh copy) and shown as it is in the player at `#/watch/obsreplay`, titled "Obsession Replay" (a name made up from Karishma's words). It has to be a copy on the demo's own site: only then can the app press the page's own Play, so the video starts straight from the Home card with no second tap. The Home card is the first card in For You.
- The one thing the app changes on that page: the Flick's own Shop now would open the brand's site in a new tab; it opens the Nykaa Fashion store sheet instead and the video waits (`obWatch`, `obHold`). That page has no other Flick on it, so nothing else can be heard there, and leaving removes the frame.
- The Mia tag lives only in that video. The mid-roll break on the Bigg Boss player (`#/watch/biggboss`) is the American Express Flick (button asks for a call back); the strip under a break names the show that resumes. An ad break waits while a store is open.
- The Bigg Boss player stills (`bb_s*.webp`) are cut from Karishma's own 23 Nov screen recording (the show's trailer in the title page). No pictures were taken from the internet.
- The "In-shots Shirt change" Flick is a Tadka episode, not a sponsored card (set 24 Nov 2026): "Pritam and Pedro · Hotstar Specials" (the name on the Flick itself). It plays as a card in the feed and full screen in the Tadka player (`#/reel/pritam`), with the Flick and Shop Now in both.
- Shop-the-look sheets (set 24 Nov 2026): the Flick sits in the middle as the hero, as wide as the sheet (a tall Flick as tall as the phone allows), with one line naming the option and the button under it. No rows listing the options anywhere: the options are inside the Flick.
- Search "cricket" shows the Under Armour Flick; Sony is in the Sports For You carousel.
- "Shop the look" units: the player sells Levi's, and each micro-drama names its own in `TADKA` (`look`): Reality Check is Zara, Rizz Master is Gucci, My Secret CEO is Patagonia, Pregnant Luxury Empire Heir is David Yurman, Red Silk is Gap. A "Shop the look" chip sits on the card in the Tadka feed and in the full-screen episode; both open the same sheet.
- The Last Delivery (the language-change micro-drama) was removed from Tadka on 24 Nov 2026 at Karishma's request. Do not bring it back. The "pick the lead" content Flick's Watch Now opens My Secret CEO.
- Home's Shop the Look rail is L'Oréal hair colour, Get Ready With Me and the puffer jacket. The full-screen ad between Tadka episodes is Cadillac (call back).
- The L'Oréal hair colour tag (`…w6l3nz`) was published with its three option buttons all pointing at the same option ("Variant 3"), so in the tag as saved no option can be picked and all three look selected (checked 24 Nov 2026 by running the saved tag with none of the app's code). The bridge in `src/engine.js` (`fixdiff`) numbers such buttons by their place inside the frame and keeps the highlight on the one that is on. It only acts when every button carries the same number, so properly published Flicks are untouched. Remove it once the tag is fixed at source. This is the one place the demo changes anything inside a Flick.
- Shapes come from each tag's own script: square unless `tall` (9:16), `wide` (16:9) or `r43` (4:3).
- The slots list (desktop panel and phone sheet) shows slot types only, never brand or Flick names.
- Desktop: thin Flam x JioHotstar header, Flam dark style, slots list beside a framed phone. Phones (860 px and under): the app fills the screen; a rose "Ad slots" pill that blinks until opened once.
- `src/engine.js` is the Flick embed, option sync and sound code shared with the bigbasket demo. Do not name a class `bar` on anything but the player's scrub bar.
