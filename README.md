# Flicks × JioHotstar demo

A working replica of the JioHotstar app with Flicks (Flam's interactive video ads) placed in it. Built the same way as the bigbasket and noon demos.

- **On a phone** it opens full screen, like the app. The rose "Ad slots" button lists every placement and jumps to it.
- **On desktop** it shows a framed phone with the list of ad slots beside it.

## Where the Flicks sit (25 slots)

| Group | Slots |
|---|---|
| Ad breaks in the stream | Pre-roll before the episode, mid-roll at the marker on the timeline, pause ad, companion ad under the player |
| Shop the look | In the player (a chip at the scene opens a sheet), on the title page, a rail on Home |
| Tadka micro-dramas | Two sponsored videos in the Tadka feed, Blank Cheque (a micro-drama episode with the Flick inside it), a full-screen ad between episodes, shop the look inside a micro-drama |
| Swipeable banners | Masthead and For You carousel on Home, TV, Movies and Sports |
| Billboards between rails | Home, Movies, Sports |
| Search | A sponsored tile in Popular Searches, a sponsored result at the top (try "cricket", "kids", "comedy", "dog") |

## Ordering inside JioHotstar

JioHotstar already carries Instamart in its Shop tab and Swiggy in its Order Food tab. The demo follows that journey: the app's button under a Flick opens a store that slides up inside the app, with the product for the option the Flick is on, then the cart, phone number, OTP and "Order placed". Nothing opens a browser.

| Store | Flicks |
|---|---|
| Swiggy | Little Caesars, Burger King |
| Instamart | Coca-Cola, Tropicana, Doritos, Ben & Jerry's, M&M's, General Mills, Bose, Sony, LEGO, BarkBox |
| Nykaa | L'Oréal Paris (lipstick, hair colour), e.l.f., Ulta Beauty |
| Nykaa Fashion | Reva Diamonds, Fossil, Mia by Tanishq, David Yurman, Gucci, Zara, Levi's (two), Nike, Under Armour, Gap (two), Patagonia, the puffer jacket, Get Ready With Me |
| AJIO | The shirt Flick (its own tag points at ajio.com) |
| Call back | Mercedes-Benz: "Book a Test Drive" asks for a phone number, there is no cart |

- **The prices are placeholders** and the item names are generic. The tags do not carry them.
- The picture in the cart is the Flick's own option picture.
- The phone number typed is kept only on the page. No message is sent; the OTP fills in by itself.
- No Flick is used twice: each of the 34 tags sits in one slot.

## What is real and what is not

- The app's screens are cuts from a screen recording of the JioHotstar iOS app (18 Nov 2026): header, banners, For You cards, posters, sports clips, Tadka cards, the Heart Beat title page.
- The Flicks are live ad tags from the saved `flicks-ad-tags` codes, loaded from `flicks.flamapp.live`, `native-ads-dev.appless.workers.dev` and `native-ads.appless.workers.dev`.
- **The episode in the player is not video.** JioHotstar blocks screen recording of its player, so the stream is a set of stills moved along a real timeline. Ad breaks, the pause ad and the scene chip are driven by that timeline. The Bigg Boss stills are cut from the show's trailer as it played in a 23 Nov 2026 screen recording of the app, so they are soft.
- The mid-roll is the 16:9 Mia by Tanishq necklace Flick, played in the player's own frame in between the content.
- Blank Cheque in Tadka is Flam's shoppable micro-drama preview (`flamdesign.github.io/FlicksLibrary/preview/blank-cheque-s1e03-bd4186/`), shown in a frame as it is.
- Options are switched only inside a Flick. The names under a Flick follow it and are not buttons.
- The other real video is the Tadka micro-drama shown as "The Last Delivery" (a title made up for the demo), played from `microdrama-audio-diff.vercel.app` with four audio languages. Its cover was generated with Flowy to match the video. My Secret CEO and Red Silk are Flam's own posters, not JioHotstar titles.
- In the Tadka feed, Blank Cheque and The Last Delivery play by themselves, silent, a second after they come on screen.
- Option names shown as "Look 1", "Shade 2" are placeholders where the real names are not known.
- The second sponsored video in the Tadka feed is a content Flick (the viewer picks who plays the lead); its button opens the micro-drama.
- Login, casting, downloads and sharing say they are outside the demo.

## Sound

A Flick is silent unless at least half of it is on screen, in front, with the tab visible, and only one Flick can be heard at a time. Leaving a screen removes its Flicks and its video.

## Build

Edit the files in `src/`, then:

    python3 scripts/build.py

This writes the single self-contained `index.html` that Vercel serves (no build step on Vercel; Framework preset: Other).

Concept prototype by Flam. Not an official JioHotstar build, and not affiliated with or endorsed by JioHotstar or the brands shown.
