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
- The slots list (desktop panel and phone sheet) shows slot types only, never brand or Flick names.
- Desktop: thin Flam x JioHotstar header, Flam dark style, slots list beside a framed phone. Phones (860 px and under): the app fills the screen; a rose "Ad slots" pill that blinks until opened once.
- `src/engine.js` is the Flick embed, option sync and sound code shared with the bigbasket demo. Do not name a class `bar` on anything but the player's scrub bar.
