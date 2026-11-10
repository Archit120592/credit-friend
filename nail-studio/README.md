# lustre nail studio

`index.html` is the current site: a scroll-driven 3D storefront. Open it in a browser; it loads three.js, GSAP and Lenis from public CDNs.

Built on the principles in alagappan567/lipstick-3d-site-notes, adapted from lipstick to nail art:

| Principle from the notes | How it shows up here |
|---|---|
| The product is code, not a model | Gel bottle (lathe geometry), press-on tip (bent extrusion), crystals, pearls, polish ribbon are all generated in code |
| One shared 3D scene, many poses | One fixed canvas; hero, four Inside chapters and the swirl each give the bottle a pose |
| Scroll as the timeline | ScrollTrigger writes 0..1 numbers into `state`; the scene reads them every frame |
| Ribbon drawn by draw range | The S-shaped ribbon pours in as you scroll |
| Cards on a strip, drag and drift | Swatch bar: tilts, drifts, drags, paints a stroke on hover |
| Try-on as SVG | Shade finder: fingertips and nails as SVG, skin tone and shade tween |
| Container-query still life | The Edit: pedestals sized in cqw |
| Polish | Word-rise headings, nav pill that tracks the section, bag count, scroll readout, mobile poses |

Edit the shop details, shades, prices and kits at the top of the script (`CONFIG`, `SHADES`, `KITS`). Prices, specs and kit contents are placeholders.

Not built (they need real photos or video): preloader film, muse portraits, muse film, lip reels, reel viewer.

`v2-scrollcraft/` keeps the previous version.
