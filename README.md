# Flicks × JioHotstar demo

A working replica of the JioHotstar app with Flicks (Flam's interactive video ads) placed in it. Built the same way as the bigbasket and noon demos.

- **On a phone** it opens full screen, like the app. The rose "Ad slots" button lists every placement and jumps to it.
- **On desktop** it shows a framed phone with the list of ad slots beside it.

## Where the Flicks sit (26 slots)

| Group | Slots |
|---|---|
| Ad breaks in the stream | Pre-roll before the episode, mid-roll at the marker on the timeline, pause ad, companion ad under the player |
| Shop the look | In the player (a chip at the scene opens a sheet), on the title page, a rail on Home |
| Tadka micro-dramas | Two sponsored videos in the Tadka feed, Blank Cheque (a micro-drama episode with the Flick inside it), a full-screen ad between episodes, shop the look inside a micro-drama |
| Swipeable banners | Masthead and For You carousel on Home, TV, Movies and Sports |
| Billboards between rails | Home, Movies, Sports |
| Search | A sponsored tile in Popular Searches, a sponsored result at the top (try "cricket", "romance", "comedy") |

Fashion, beauty, audio and home Flicks can be bought inside the app (product page, bag). Food, drinks, luxury and cars hand over to the advertiser through a "You're leaving JioHotstar" sheet.

## What is real and what is not

- The app's screens are cuts from a screen recording of the JioHotstar iOS app (18 Nov 2026): header, banners, For You cards, posters, sports clips, Tadka cards, the Heart Beat title page.
- The Flicks are live ad tags from the saved `flicks-ad-tags` codes, loaded from `flicks.flamapp.live`, `native-ads-dev.appless.workers.dev` and `native-ads.appless.workers.dev`.
- **The episode in the player is not video.** JioHotstar blocks screen recording of its player, so the stream is a set of stills from the title moved along a real timeline. Ad breaks, the pause ad and the scene chip are driven by that timeline.
- Blank Cheque in Tadka is Flam's shoppable micro-drama preview (`flamdesign.github.io/FlicksLibrary/preview/blank-cheque-s1e03-bd4186/`), shown in a frame as it is.
- Options are switched only inside a Flick. The names and prices under a Flick follow it and are not buttons.
- The other real video is the Tadka micro-drama "Bahu Ka Badla", played from `microdrama-audio-diff.vercel.app` with four audio languages. Bahu Ka Badla, My Secret CEO and Red Silk are Flam's own posters, not JioHotstar titles.
- Rupee prices, the product names of the Get Ready With Me and Puffer Jacket Flicks (their brand is not known) and option names shown as "Look 1", "Shade 2" are illustrative.
- The second sponsored video in the Tadka feed is a content Flick (the viewer picks who plays the lead); its button opens the micro-drama.
- Payment, login, casting, downloads and advertiser sites say they are outside the demo.

## Sound

A Flick is silent unless at least half of it is on screen, in front, with the tab visible, and only one Flick can be heard at a time. Leaving a screen removes its Flicks and its video.

## Build

Edit the files in `src/`, then:

    python3 scripts/build.py

This writes the single self-contained `index.html` that Vercel serves (no build step on Vercel; Framework preset: Other).

Concept prototype by Flam. Not an official JioHotstar build, and not affiliated with or endorsed by JioHotstar or the brands shown.
