# Flicks × JioHotstar demo

A concept prototype by Flam showing Flicks (real-time product, scene and model swaps) inside the JioHotstar viewing journey.

- **On a phone** it opens full screen, like the app.
- **On desktop** it shows a phone frame with a step-by-step guide.

## What's in the journey
1. Real JioHotstar home with four added slots: a Tadka multi-language banner, a "Shop the Scene" rail, a native West Elm Flicks unit and a Tadka micro-drama rail.
2. Tadka micro-drama with live audio switching (English, Kannada, Japanese, Spanish).
3. Necklace Swap and Gucci flicks as vertical Tadka scenes.
4. A Flicks moment inside a playing episode (Levi's denim dungaree swap).

On-screen cues guide the journey on phone and desktop alike: the next thing to tap glows and pulses, and swipe screens show a small glowing arrow. No text overlays. The cues move on as you tap and can be restarted from the ✦ button or the desktop guide.

Only one video or flick plays at a time; it is removed when you go back, swipe or scroll away, or switch tabs.

## Hosting
A single static `index.html` with every image built in. Deploy on Vercel with no build step (Framework preset: Other).

External content loaded at runtime: flicks from `flicks.flamapp.live` and the micro-drama videos from `microdrama-audio-diff.vercel.app`.

Concept prototype by Flam. Not an official JioHotstar build.
