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
- The cover of the playable micro-drama ("The Last Delivery", `o_delivery.webp`) was made with Flowy to match its video: a delivery rider in a yellow raincoat, rain, parcel lockers, a cracked phone.
- Changing the audio language of a micro-drama must never show the cover image: the playing video stays up until the new track is playing at the same moment, then they swap.
- The slots list (desktop panel and phone sheet) shows slot types only, never brand or Flick names.
- Desktop: thin Flam x JioHotstar header, Flam dark style, slots list beside a framed phone. Phones (860 px and under): the app fills the screen; a rose "Ad slots" pill that blinks until opened once.
- `src/engine.js` is the Flick embed, option sync and sound code shared with the bigbasket demo. Do not name a class `bar` on anything but the player's scrub bar.
