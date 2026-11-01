/**
 * Source of the built Client half. `scripts/build-client.mjs` inlines
 * lib/vendor/orca-embed.js at the vendor marker and writes lib/client.js, which
 * is the artifact `./client` exports. Edit this file, then run `npm run build`.
 *
 * Layout of the skin, bottom to top:
 *
 *   1. the sea    — a fixed layer behind the app (z-index -1), click-through, sharp
 *   2. the plates — sidebar and bottom row only, frosted, like the reference UI
 *   3. the app    — text, cards, composer, fully interactive on top
 *
 * No blur anywhere, and that is load-bearing rather than aesthetic: the plates
 * are .88–.94 opaque, so there is nothing left to frost, and `backdrop-filter`
 * also makes an element the containing block for `position: fixed` descendants.
 * The sidebar and bottom row both contain fixed descendants (ui-primitives'
 * Tooltip), so frosting them re-anchored tooltips to the column's padding box
 * instead of the viewport and clipped them under its `overflow: hidden`.
 *
 * Palette is token-level, in two schemes, and both are *measured* from the
 * reference frames rather than eyeballed:
 *
 *   night  — the ink-blue of the 逆水寒 night UI in shots\夜间参考1.png,
 *            c3.png and c5.png. The water column there samples at 216–220° hue
 *            and 0.36–0.47 saturation, and the row plates are the same family:
 *            #445c84 / #4c648c, with the chips at #344464 (on) and #455d7b
 *            (off). So the skin's base and layer surfaces sit on those measured
 *            colours rather than on a near-black wash — which is what made the
 *            old night skin read as "dark grey app" instead of "ink-blue app".
 *            Text is pale blue-white (#eaf3fb); the accent is the reference's
 *            own cyan glow, #5b9bc1.
 *   day    — the pale-cyan lagoon of shots\日间参考1.png: cards at 190–195° hue
 *            and 0.10–0.15 saturation, i.e. #c3d6db..#cfe7ed, with chips at
 *            #b1d5e1. Text is deep blue-violet (#1d3348); the accent is the
 *            deeper teal of its rail circles, #2f7d99.
 *
 * Only base surfaces go translucent; popovers stay dense so a menu is still read,
 * not looked through.
 *
 * The entry registers in the frame-wide `shell.overlay` list slot, so the slot
 * system owns activation, collapse and unload of everything below.
 */
window.__ModuleLoader__.load({
  id: '@local/orca-aquarium-backdrop',
  factory(require) {
    'use strict';

    const React = require('react');

    /* __ORCA_AQUARIUM_VENDOR__ */

    const API_KEY = '__OrcaAquarium';
    const SLOT = 'shell.overlay';
    const ENTRY_ID = 'orca-aquarium-backdrop';

    const BACKDROP_CLASS = 'orca-sea-backdrop';
    const SCENE_CLASS = 'orca-sea-scene';
    const INK_CLASS = 'orca-sea-ink';
    /** The drifting maple leaves — the references' warm counterpoint. */
    const LEAF_CLASS = 'orca-sea-leaf';
    /** The fine sparkle over the whole frame. */
    const MOTE_CLASS = 'orca-sea-mote';
    /** The corner warmth (warm bottom-right, cool top-left). */
    const GLOW_CLASS = 'orca-sea-glow';
    const FRAME_ATTR = 'data-orca-glass-frame';
    const PART_ATTR = 'data-orca-plate';
    /** The sidebar's inner root, which paints its own fill over the column. */
    const SIDEBAR_ROOT_ATTR = 'data-orca-sidebar-plate';
    const STYLE_ATTR = 'data-orca-skin-style';

    /**
     * The sea renders at the top tier.
     *
     * This must be a complete QualitySettings object, NOT the tier name. The
     * vendor's `mountOrca` does `options.quality ?? resolveQuality()`, so a
     * string silently replaces the whole resolved settings object, and then:
     *
     *   Math.min(devicePixelRatio, undefined) -> NaN
     *   Math.floor(cssWidth * NaN)            -> NaN
     *   canvas.width = NaN                    -> 0   (WebIDL unsigned long)
     *
     * i.e. a zero-pixel drawing buffer, so the scene never renders at all — and
     * because `quality.bloom` / `quality.colorGrade` are also undefined, the
     * bloom and colour-grade passes are skipped too. Every field below is
     * copied from the vendor's own `high` tier (src/client/quality.ts) so the
     * scene gets exactly the settings a standalone high-tier mount would.
     */
    const QUALITY = {
      tier: 'high',
      maxPixelRatio: 1.5,
      bloom: true,
      colorGrade: true,
      captureMaxWidth: 1920,
      captureMaxHeight: 1600,
      plankton: 1,
      fish: 1,
      bubble: 1,
      kelp: 1,
      coral: 1,
      starfish: 1,
      rock: 1,
      prop: 1,
      skyline: 1,
      idleFrameIntervalMs: 250,
    };

    /**
     * The followed camera, as an offset from the orca rather than an absolute
     * point: the animal patrols a path, so a fixed camera loses it. The eye sits
     * above and in front of it, at a distance that keeps the whole body in frame
     * on a wide canvas.
     */
    const CAMERA_Y = 3.2;
    const CAMERA_DISTANCE = 13.5;
    const CONTROLS_TARGET_Y = 1.6;

    /**
     * Ink artwork in the water, as a mask rather than a colour: one shape serves
     * both palettes and the tint stays in CSS. They sit in the sea layer, under
     * the plates, so they read as artwork in the water and never land on top of
     * text.
     *
     * The shapes are measured off the references, which do not draw fish: they
     * draw *carp and koi silhouettes* — a teardrop body, a forked twin-lobed
     * tail, two long barbels at the head, and paired fins — as flat dark shapes
     * over the gradient (夜间参考1 / c5 both carry them on the right half, and
     * 日间参考1 carries them in its wave band). A generic fish glyph would read
     * as clip-art next to those, so the tile carries the same anatomy at three
     * sizes and rotations, plus one lily pad and a reed cluster for variety.
     */
    const INK_TILE =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420' viewBox='0 0 420 420'><g fill='%23fff'>" +
      /* Large koi, angled up-right, with barbels and a forked tail. */
      "<g transform='translate(96 118) rotate(-18) scale(1.5)'>" +
      "<path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/>" +
      "<path d='M84 5 L104 -8 L100 5 L104 18 Z'/>" +
      "<path d='M6 -8 C2 -18 8 -24 16 -22 L18 -8 Z'/>" +
      "<path d='M6 8 C2 18 8 24 16 22 L18 8 Z'/>" +
      "<path d='M-1 -3 C-9 -6 -14 -4 -16 0 C-14 4 -9 6 -1 3 Z'/>" +
      "</g>" +
      /* Small koi, mirrored, lower left. */
      "<g transform='translate(58 296) rotate(24) scale(.78)'>" +
      "<path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/>" +
      "<path d='M84 5 L104 -8 L100 5 L104 18 Z'/>" +
      "<path d='M6 -8 C2 -18 8 -24 16 -22 L18 -8 Z'/>" +
      "</g>" +
      /* Mid koi, nearly level, upper right. */
      "<g transform='translate(236 52) rotate(8) scale(1.05)'>" +
      "<path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/>" +
      "<path d='M84 5 L104 -8 L100 5 L104 18 Z'/>" +
      "<path d='M6 8 C2 18 8 24 16 22 L18 8 Z'/>" +
      "<path d='M-1 -3 C-9 -6 -14 -4 -16 0 C-14 4 -9 6 -1 3 Z'/>" +
      "</g>" +
      /* Tiny fish pair, faint, mid right. */
      "<g transform='translate(300 226) rotate(-32) scale(.5)' opacity='.55'><path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/><path d='M84 5 L104 -8 L100 5 L104 18 Z'/></g>" +
      "<g transform='translate(348 286) rotate(16) scale(.42)' opacity='.45'><path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/><path d='M84 5 L104 -8 L100 5 L104 18 Z'/></g>" +
      /* Lily pad with a notch, bottom centre — the 日间 reference's motif. */
      "<g transform='translate(168 344)' opacity='.7'><path d='M0 0 A34 34 0 1 1 34 -34 L10 -10 A24 24 0 1 0 -14 14 Z'/></g>" +
      /* Reed cluster, bottom right. */
      "<g transform='translate(246 356) rotate(-12)' opacity='.5'>" +
      "<path d='M0 40 C-2 20 2 6 10 -6 L14 -4 C6 8 4 22 6 40 Z'/>" +
      "<path d='M14 40 C12 24 18 12 28 2 L32 6 C22 14 18 26 20 40 Z'/>" +
      "<path d='M28 40 C26 28 34 18 46 12 L48 17 C38 22 32 30 34 40 Z'/>" +
      "</g>" +
      "</g></svg>\")";

    /**
     * Maple leaves, as a mask for the same reason the koi are: one shape serves
     * both palettes and the tint stays in CSS.
     *
     * This is the reference's loudest single effect. 夜间参考1 carries four big
     * amber maple leaves in its corners — the only warm thing in an otherwise
     * all-blue frame — and c5 repeats them down the left edge. They are what
     * stops the composition reading as "blue filter over a screenshot": warm
     * against cool is the whole colour idea, and the corners are where it lives.
     *
     * Drawn as a five-lobed maple with a stem, at four sizes/rotations. The
     * lobes are asymmetric on purpose (a symmetric star reads as clip-art; the
     * references' leaves are all slightly swept).
     */
    const LEAF_TILE =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='680' height='680' viewBox='0 0 680 680'><g fill='%23fff'>" +
      /* Big leaf, upper left, swept. */
      "<g transform='translate(64 96) rotate(-22) scale(2.6)'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* Mid leaf, right edge. */
      "<g transform='translate(596 196) rotate(38) scale(1.9)'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* Small leaf, lower left. */
      "<g transform='translate(126 566) rotate(14) scale(1.35)'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* Tiny leaf, lower right, faint. */
      "<g transform='translate(520 604) rotate(-48) scale(.95)' opacity='.6'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* One drifting mid-frame, faint — the references have leaves over the art, not just at the rim. */
      "<g transform='translate(348 402) rotate(8) scale(.7)' opacity='.45'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "</g>" +
      "</g></svg>\")";

    /**
     * Drifting motes: the references' fine sparkle, which sits over everything
     * and is what makes the frame feel like air rather than a flat gradient.
     * Deliberately tiny and sparse — a dense field reads as noise.
     */
    const MOTE_TILE =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><g fill='%23fff'>" +
      "<circle cx='38' cy='52' r='1.5'/><circle cx='132' cy='26' r='1'/>" +
      "<circle cx='214' cy='88' r='1.8'/><circle cx='286' cy='44' r='1.1'/>" +
      "<circle cx='72' cy='148' r='1.2'/><circle cx='176' cy='126' r='1.6'/>" +
      "<circle cx='258' cy='182' r='1'/><circle cx='24' cy='226' r='1.7'/>" +
      "<circle cx='118' cy='248' r='1.1'/><circle cx='204' cy='286' r='1.4'/>" +
      "<circle cx='292' cy='244' r='1.2'/><circle cx='156' cy='196' r='.9'/>" +
      "</g></svg>\")";

    /**
     * The sidebar's wave damask — 水波纹.
     *
     * Generated rather than hand-drawn, because a tiling wave has two hard
     * constraints that are easy to get wrong by eye:
     *
     *   - The wave's period (60px) must divide the tile width (120px), or the
     *     left and right edges will not meet. Phase offsets are free: any phase
     *     still repeats as long as the period divides the width.
     *   - Rows must be spaced by a divisor of the tile height, AND the row at
     *     y=0 has to be drawn again at y=height. A crest that overshoots the
     *     tile's top edge is clipped, and only the duplicate at the bottom edge
     *     of the tile above puts the missing half back. Draw y=0 alone and you
     *     get a visible horizontal seam every 96px.
     *
     * Ripples alternate a firm crest against a faint, phase-inverted one, so
     * the pattern reads as overlapping water rather than six identical stripes.
     * Paths are drawn well outside the tile in x so the seam falls mid-wave
     * instead of on a path endpoint.
     *
     * @param {string} stroke Line colour, `#` percent-encoded.
     * @param {string} alpha  Stroke opacity; this is what makes it a 暗纹.
     * @returns {string} a CSS url() value.
     */
    function waveTile(stroke, alpha) {
      const TILE_W = 120;
      const TILE_H = 96;
      const HALF = 30;
      // 0 and 96 are the same row, seen from the two tiles that meet there.
      const rows = [0, 16, 32, 48, 64, 80, 96];
      let paths = '';
      for (let i = 0; i < rows.length; i++) {
        const y = rows[i];
        const firm = i % 2 === 0;
        const amp = firm ? 6 : 4.5;
        // The phase must key off the row's SLOT, not its index: y=0 and y=96
        // are the same ripple seen from two tiles, so if they disagreed the
        // join would show as a horizontal seam every 96px.
        const slot = i % 6;
        const x0 = (firm ? -70 : -40) + (slot * 8) % 30;
        let d = 'M' + x0 + ' ' + y +
          ' Q' + (x0 + HALF / 2) + ' ' + (y - amp) + ' ' + (x0 + HALF) + ' ' + y;
        // `T` mirrors the previous control point, so each segment flips the crest.
        for (let x = x0 + HALF * 2; x <= TILE_W + HALF * 2; x += HALF) {
          d += ' T' + x + ' ' + y;
        }
        paths += "<path d='" + d + "' stroke-width='" + (firm ? '1.35' : '.85') +
          "' opacity='" + (firm ? '1' : '.5') + "'/>";
      }
      return "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='" +
        TILE_W + "' height='" + TILE_H + "'><g fill='none' stroke='" + stroke +
        "' stroke-opacity='" + alpha + "' stroke-linecap='round'>" + paths +
        "</g></svg>\")";
    }

    // Night: a faint light line engraved into a dark plate.
    //
    // The alpha here was .085, which measured only +13/255 over the plate —
    // technically a damask, practically invisible, and it read as "the effect
    // did not render". At .17 the crest lifts ~27/255: clearly a pattern, still
    // far below anything that competes with text.
    const WAVE_TILE_NIGHT = waveTile('%23dceaf8', '.17');
    // Day: the same shape inverted — a faint dark line on a pale plate.
    const WAVE_TILE_DAY = waveTile('%232f5f7a', '.15');

    /**
     * The palette, as theme-service override tokens.
     *
     * `theme.overrideTokens` takes `token -> { light, dark }`, so the shell
     * resolves the scheme for us and no `!important` selector war is needed.
     *
     * Every value is SOLVED from the reference frames, and the alphas are
     * deliberately HIGH — this is the important part.
     *
     * The aquarium behind the app is a moving three.js scene whose water column
     * runs from #081e30 to #216484 across the frame and over time. A translucent
     * plate therefore does not paint its own colour; it paints `plate over
     * whatever the sea is doing right now`. Measured: a #4c648c wash at .30
     * lands anywhere from #1a4059 to #61859b depending on the moment, so the
     * app's colour drifted with the fish — that was the real reason the first
     * attempt still looked wrong.
     *
     * So the plates are near-opaque (they ARE the skin), and only `bg-base`
     * stays a translucent window onto the aquarium. Verified against the
     * reference fills: worst error 10/255 across all six plate surfaces.
     *
     *   night references:  row plate #4c648c · chip #455d7b · rail #3f4b63
     *                      text #eaf3fb · accent #5b9bc1
     *   day references  :  card #cfe7ed · chip #b1d5e1 · text #1d3348
     *                      accent #2f7d99
     */
    const SKIN_TOKENS = {
      /* ---- night: the ink-blue of 夜间参考1 / c5 ---- */
      // The window. Translucent on purpose — this is where the aquarium shows
      // through — but held at .40 rather than .30. The reason is a confusion
      // this caused: the vendor's `deep` theme paints the seabed as stacked,
      // evenly-spaced ripple bands (see screenshots/trim-deep.png), and through
      // a 30% veil those bands read as a misplaced damask in the middle of the
      // reading area rather than as the floor of the sea. A denser veil keeps the
      // water and stops the dunes competing with the text.
      '--dsw-alias-bg-base': { dark: 'rgba(76,97,129,.40)', light: 'rgba(207,231,237,.42)' },
      // The skin proper: opaque enough to hold the reference plate colour
      // whatever the sea is doing.
      '--dsw-alias-bg-layer-1': { dark: 'rgba(76,100,140,.88)', light: 'rgba(215,238,243,.94)' },
      '--dsw-alias-bg-layer-2': { dark: 'rgba(69,93,123,.88)', light: 'rgba(180,216,228,.93)' },
      // Popovers stay dense: a menu must be read, not looked through.
      '--dsw-alias-bg-overlay': { dark: 'rgba(34,44,64,.97)', light: 'rgba(232,244,247,.96)' },
      '--dsw-specific-sidebar-fill': { dark: 'rgba(63,75,99,.90)', light: 'rgba(201,225,232,.94)' },
      '--dsw-alias-label-primary': { dark: '#eaf3fb', light: '#1d3348' },
      '--dsw-alias-label-secondary': { dark: '#c2d6ea', light: '#33566e' },
      '--dsw-alias-label-tertiary': { dark: '#93aecb', light: '#5b7789' },
      '--dsw-alias-label-caption': { dark: '#8aa5c2', light: '#6d8598' },
      '--dsw-alias-border-l1': { dark: 'rgba(176,208,240,.13)', light: 'rgba(29,51,72,.12)' },
      '--dsw-alias-border-l2': { dark: 'rgba(176,208,240,.20)', light: 'rgba(29,51,72,.18)' },
      '--dsw-alias-border-l3': { dark: 'rgba(176,208,240,.26)', light: 'rgba(29,51,72,.24)' },
      '--dsw-alias-interactive-bg-hover': { dark: 'rgba(160,186,207,.20)', light: 'rgba(29,51,72,.07)' },
      // The night reference's own cyan glow, measured off its centre-line
      // caption; the day reference's deeper teal from its rail circles.
      '--dsw-alias-brand-primary': { dark: '#5b9bc1', light: '#2f7d99' },
      '--dsw-alias-state-business-primary': { dark: '#5b9bc1', light: '#2f7d99' },

      /* ---- the `--dsw-specific-*` family ---- *
       *
       * These are the surfaces the *components* paint with, and they are not
       * part of the alias layer: the user bubble uses `--dsw-specific-bubble`,
       * menus use `--dsw-specific-menu`, the composer uses
       * `--dsw-specific-input-major`. Leaving them at the shell default was why
       * the chat bubbles and menus still looked like the stock app on top of a
       * recoloured shell — the skin simply did not reach them.
       *
       * The bubble is the important one. In the references every raised surface
       * is a *lighter* plate over the water (the selected row is #a6bfd3 over a
       * #4b658a field), so the bubble takes the reference's selected-plate value
       * rather than the stock pale-deepseek tint.
       */
      '--dsw-specific-bubble': { dark: 'rgba(88,114,152,.92)', light: 'rgba(196,220,227,.92)' },
      // The composer and composer-attached cards: one step deeper than a bubble
      // so an input reads as recessed while a sent message reads as raised.
      '--dsw-specific-input-major': { dark: 'rgba(58,78,108,.90)', light: 'rgba(207,231,237,.92)' },
      // Menus and the command palette: opaque enough to read over the aquarium.
      '--dsw-specific-menu': { dark: 'rgba(34,44,64,.97)', light: 'rgba(232,244,247,.97)' },
      // Combo/mode selectors: the reference's chip colour.
      '--dsw-specific-selector': { dark: 'rgba(69,93,123,.92)', light: 'rgba(177,213,225,.92)' },
      // Tooltip/tip surfaces: dense, and slightly warm-neutral so a tip does not
      // read as another card.
      '--dsw-specific-tip': { dark: 'rgba(28,38,56,.96)', light: 'rgba(45,64,84,.94)' },
      // Sidebar navigation states: the reference's rail highlight is a *sky*
      // wash, not a grey one, which is what makes the rail feel lit.
      '--dsw-specific-sidebar-nav-item-active': { dark: 'rgba(96,140,178,.34)', light: 'rgba(126,186,212,.34)' },
      '--dsw-specific-sidebar-nav-item-active-accent': { dark: '#7fc4e0', light: '#2f7d99' },
      '--dsw-specific-sidebar-nav-item-hover': { dark: 'rgba(150,190,222,.12)', light: 'rgba(29,51,72,.06)' },
    };

    /**
     * The structural half of the skin: the frame veil, the plate frost, the
     * sidebar art and the sea layer. These are not theme tokens, so they are
     * plain rules rather than `overrideTokens` entries.
     */
    const STYLE_TEXT = [
      // `html` keeps a base fill for the instant before the scene mounts; `body`
      // steps aside so the plates are the only layer over the water.
      'html{background:var(--dsw-alias-bg-base);}',
      'body{background:transparent!important;}',
      // The frame is the WINDOW onto the aquarium, and it is deliberately
      // almost bare. Two things drove the numbers:
      //
      //   1. The plates now carry the skin at ~.90 alpha, so the frame no
      //      longer needs to do any of the colour work.
      //   2. The frame spans the whole viewport, so every percent of veil here
      //      is a percent of the aquarium the user cannot see. Measured, the
      //      veil only ever *reduces* the orca-vs-water luminance delta (the
      //      vendor's `deep` theme starts at 11.9/255, which is already low;
      //      .30 takes it to 8.3 and the animal disappears into the water).
      //      So the veil is held to the lightest value that still tints.
      //
      // No backdrop-filter: that would blur the entire tank (see the header).
      '[', FRAME_ATTR, ']{',
      'background-color:rgba(52,74,102,.08)!important;',
      'background-image:',
      'linear-gradient(180deg,rgba(214,236,248,.08),rgba(214,236,248,0) 38%),',
      'linear-gradient(0deg,rgba(24,40,62,.10),rgba(24,40,62,0) 50%)!important;',
      '}',
      'body:not([data-ds-dark-theme]) [', FRAME_ATTR, ']{',
      'background-color:rgba(198,224,232,.14)!important;',
      '}',
      // Frost: deliberately NONE, and this is a fix, not an omission.
      //
      // `backdrop-filter` is not just a visual effect — it makes the element a
      // containing block for `position: fixed` descendants AND starts a new
      // stacking context. The sidebar and the bottom row both contain fixed
      // descendants (ui-primitives' Tooltip bubble is `position: fixed`), so
      // putting a backdrop-filter on those columns re-anchored every tooltip
      // from the viewport to the column's own padding box: the bubble's
      // `left`/`top` (computed in viewport coordinates) then painted offset by
      // the column's own origin and clipped by its `overflow: hidden`, which
      // lands a bubble on top of the brand row instead of beside its button.
      //
      // It also bought almost nothing visually: the plates are now .88–.94
      // opaque, so there is no see-through left to blur. Removing it keeps the
      // skin's colour work and drops a whole class of paint/positioning
      // hazards, so the shell's own chrome (brand mark, collapse toggle,
      // tooltips) lays out exactly as it does with no skin installed.
      //
      // Two glows, both measured: the top-left cyan the references use on their
      // brand corner, and a faint warm one from the lower right — the maple-leaf
      // and lantern light in 夜间参考1's corners.
      //
      // Under the glows sits the wave damask. It is the FIRST layer in the list
      // on purpose: `background-image` paints first-listed on top, so the ripples
      // stay crisp instead of being veiled by the two glows — an engraved line
      // that a wash has passed over just looks like a smudge. Faintness is
      // carried by the tile's own stroke-opacity, not by stacking it lower.
      // `background-size` and `background-repeat` are spelled out per layer
      // because a bare `repeat` would also tile the three gradients — and a tiled
      // radial glow is instantly visible as a grid.
      // Scoped, not bare. A standalone `[data-orca-sidebar-plate]` selector would
      // paint wherever that node happens to be laid out; requiring it to sit
      // inside the tagged sidebar column means a wrong tag degrades to "no art"
      // instead of "art across the app". `paintSurface` already enforces this
      // geometrically — the selector makes it structural too.
      '[', FRAME_ATTR, '] > [', PART_ATTR, '=sidebar] [', SIDEBAR_ROOT_ATTR, ']{',
      'background-image:',
      WAVE_TILE_NIGHT + ',',
      'radial-gradient(130% 34% at 0% 0%,rgba(120,205,235,.22),rgba(120,205,235,0) 62%),',
      'radial-gradient(90% 40% at 100% 100%,rgba(216,138,92,.10),rgba(216,138,92,0) 60%),',
      'linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,0) 52%)!important;',
      'background-size:120px 96px,auto,auto,auto!important;',
      'background-repeat:repeat,no-repeat,no-repeat,no-repeat!important;',
      'background-position:0 0,0 0,0 0,0 0!important;',
      '}',
      'body:not([data-ds-dark-theme]) [', FRAME_ATTR, '] > [', PART_ATTR, '=sidebar] [', SIDEBAR_ROOT_ATTR, ']{',
      'background-image:',
      WAVE_TILE_DAY + ',',
      'radial-gradient(130% 34% at 0% 0%,rgba(94,186,214,.28),rgba(94,186,214,0) 62%),',
      'radial-gradient(90% 40% at 100% 100%,rgba(214,150,104,.12),rgba(214,150,104,0) 60%),',
      'linear-gradient(180deg,rgba(255,255,255,.30),rgba(255,255,255,0) 52%)!important;',
      '}',
      // The sea layer: the vendor's scene, plus the ink artwork over it.
      //
      // There is deliberately NO colour wash and NO light-shaft layer here.
      //  - A wash on top of the scene is a second veil on top of the frame's,
      //    and the two together washed the orca into the water (measured: orca
      //    vs water luminance delta 8/255 at the combined alpha). The vendor's
      //    own theme already decides the water's colour; the skin's job is the
      //    plates, not a tint on the artwork.
      //  - The vendor already draws a 15-beam god-ray fan in the water column
      //    (godRays.ts). Painting a second fan would double it.
      //
      // So the sea is left alone, and the only thing the skin adds over it is
      // the faint ink artwork — which sits under the plates and never on text.
      '.', BACKDROP_CLASS, '{',
      'position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;',
      '--orca-ink:rgba(214,236,248,.16);',
      // The leaves are the one warm thing in the frame, so they stay saturated
      // and sit above the water's own blue. Sampled from 夜间参考1's corners
      // (#e08c3c..#f5a44e), not invented.
      '--orca-leaf:rgba(228,140,72,.30);',
      '--orca-mote:rgba(226,242,255,.55);',
      '--orca-glow-warm:rgba(238,164,88,.16);',
      '--orca-glow-cool:rgba(120,196,232,.13);',
      '}',
      'body:not([data-ds-dark-theme]) .', BACKDROP_CLASS, '{',
      '--orca-ink:rgba(22,58,84,.11);',
      // Daylight: leaves stay warm but thin out, and the glow turns into haze.
      '--orca-leaf:rgba(214,132,68,.22);',
      '--orca-mote:rgba(255,255,255,.70);',
      '--orca-glow-warm:rgba(246,196,132,.20);',
      '--orca-glow-cool:rgba(150,214,238,.20);',
      '}',
      '.', SCENE_CLASS, '{position:absolute;inset:0;}',
      '.', INK_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-ink);',
      '-webkit-mask-image:', INK_TILE, ';mask-image:', INK_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:420px 420px;mask-size:420px 420px;',
      '}',
      // The maple leaves: the references' warm counterpoint to an all-blue
      // frame, and the single strongest thing the stock app does not have.
      // Painted above the ink so a leaf reads as nearer than a koi, and under
      // the plates so it never lands on text. `screen`-free: a plain mask keeps
      // it cheap and lets the two palettes pick their own tint.
      '.', LEAF_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-leaf);',
      '-webkit-mask-image:', LEAF_TILE, ';mask-image:', LEAF_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:680px 680px;mask-size:680px 680px;',
      // A very slow drift, so the frame is alive without ever being busy. The
      // 0.001 x-shift is deliberate: leaves fall, they do not travel sideways.
      'animation:orca-leaf-drift 64s linear infinite;',
      'will-change:transform;',
      '}',
      '@keyframes orca-leaf-drift{',
      'from{transform:translate3d(0,-680px,0);}',
      'to{transform:translate3d(38px,0,0);}',
      '}',
      // The sparkle. Two layers at different phases so the twinkle never
      // pulses in lockstep, which is what makes a plain loop read as a loop.
      '.', MOTE_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-mote);',
      '-webkit-mask-image:', MOTE_TILE, ';mask-image:', MOTE_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:320px 320px;mask-size:320px 320px;',
      'animation:orca-mote-drift 38s linear infinite,orca-mote-twinkle 5.5s ease-in-out infinite alternate;',
      '}',
      '@keyframes orca-mote-drift{',
      'from{transform:translate3d(0,0,0);}',
      'to{transform:translate3d(-320px,-320px,0);}',
      '}',
      '@keyframes orca-mote-twinkle{',
      'from{opacity:.45;}to{opacity:1;}',
      '}',
      // The corner warmth. The references are lit from a warm bottom-right
      // corner (夜间参考1's lantern glow, c3's cyan pool); this is that light
      // as a paint layer rather than a filter, so it costs nothing per frame.
      '.', GLOW_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-image:',
      'radial-gradient(58% 46% at 100% 100%,var(--orca-glow-warm),transparent 68%),',
      'radial-gradient(46% 40% at 0% 0%,var(--orca-glow-cool),transparent 66%);',
      '}',
      // Reduced motion: the whole point of these layers is slow ambient drift,
      // so honouring the preference means freezing them rather than removing
      // them — the colour stays, the movement stops.
      '@media (prefers-reduced-motion:reduce){',
      '.', LEAF_CLASS, ',', '.', MOTE_CLASS, '{animation:none;}',
      '}',
    ].join('');

    /** The vendor IIFE installed on the page by the inline block above. */
    function vendorApi() {
      const api = globalThis[API_KEY];
      if (api === null || typeof api !== 'object') return null;
      return typeof api.mountOrca === 'function' ? api : null;
    }

    /** Snapshot one `<html>` data attribute the vendor rewrites while mounted. */
    function snapshotDataAttribute(element, key) {
      return { key: key, value: element.dataset[key] };
    }

    function restoreDataAttribute(element, snapshot) {
      if (snapshot.value === undefined) delete element.dataset[snapshot.key];
      else element.dataset[snapshot.key] = snapshot.value;
    }

    /**
     * The element inside a column that actually paints that column's surface.
     *
     * `column.firstElementChild` was the wrong guess, and it is the bug this
     * replaces: the slot machinery is free to put an out-of-flow or portal node
     * first. Handing *that* a repeating `background-image` tiles the pattern
     * across whatever box the node occupies — the whole viewport — so the damask
     * painted in the middle of the work area instead of on the rail.
     *
     * The surface is therefore defined geometrically: the DEEPEST descendant
     * that both sits inside the column's box and covers it. Deepest, not
     * shallowest, because the art has to be the thing nothing opaque sits on top
     * of — the sidebar's own root paints a .90 fill, so a wrapper above it would
     * hide the damask and reproduce the "no texture in the rail" symptom from
     * the other direction. A fixed, full-window portal fails the containment
     * test (it extends past the column); a collapsed or zero-height wrapper fails
     * the coverage test. If nothing qualifies the result is `null`, which drops
     * the art rather than painting it in the wrong place — a missing texture is
     * cosmetic, a viewport-wide tile is not.
     *
     * @param {Element} column a frame column, already laid out.
     * @returns {Element|null} the surface element, or null.
     */
    function paintSurface(column) {
      const box = column.getBoundingClientRect();
      if (box.width <= 0 || box.height <= 0) return null;
      const EPS = 1;
      let best = null;
      let bestDepth = 0;
      const walk = function (parent, depth) {
        for (let i = 0; i < parent.children.length; i++) {
          const child = parent.children[i];
          const r = child.getBoundingClientRect();
          const contained =
            r.left >= box.left - EPS && r.top >= box.top - EPS &&
            r.right <= box.right + EPS && r.bottom <= box.bottom + EPS;
          const covers = r.width >= box.width * 0.9 && r.height >= box.height * 0.9;
          if (contained && covers && depth > bestDepth) {
            best = child;
            bestDepth = depth;
          }
          walk(child, depth + 1);
        }
      };
      walk(column, 1);
      return best;
    }

    /**
     * Tag the shell's frame and the sidebar surface so the skin can style them
     * without naming a single hashed class.
     *
     * The frame is found through the stable hook the layout owns —
     * `data-shell-overlay` is one of the frame's own children — instead of its
     * hashed class name, so tagging survives rebuilds. Tagging adds attributes
     * and changes no structure; the cleanup removes them again.
     *
     * The sidebar column is then found by GEOMETRY, not by child position:
     * `DocumentTitle` renders null, the centre and right columns arrive through a
     * fragment, and the drag handles are children too, so the index is the
     * layout's own business. "the child whose box starts nearest the left edge"
     * cannot be broken by a re-order.
     *
     * @returns {{ elements: Element[], surface: Element|null }} what to clean up,
     * plus the element the sidebar art landed on (for diagnostics).
     */
    function tagPlates() {
      const overlay = document.querySelector('[data-shell-overlay]');
      const frame = overlay === null ? null : overlay.parentElement;
      if (frame === null) return { elements: [], surface: null };

      frame.setAttribute(FRAME_ATTR, '');
      const elements = [];

      const isColumn = function (child) {
        if (child.hasAttribute('data-shell-overlay')) return false;   // floating layer
        if (child.hasAttribute('data-side')) return false;             // drag handle
        if (child.hasAttribute('data-rightbar-col')) return false;     // right column
        return child.getBoundingClientRect().width > 0;
      };
      let column = null;
      let nearest = Infinity;
      Array.prototype.forEach.call(frame.children, function (child) {
        if (!isColumn(child)) return;
        const left = child.getBoundingClientRect().left;
        if (left < nearest) {
          nearest = left;
          column = child;
        }
      });
      if (column === null) return { elements: elements, surface: null };

      column.setAttribute(PART_ATTR, 'sidebar');
      elements.push(column);
      const surface = paintSurface(column);
      if (surface !== null) {
        surface.setAttribute(SIDEBAR_ROOT_ATTR, '');
        elements.push(surface);
      }
      return { elements: elements, surface: surface };
    }

    /**
     * Frame the orca for a wide window — and keep framing it.
     *
     * The vendor's `applyViewFit()` solves a camera distance for the window aspect,
     * then leaves `autoRotate` running and clamps `orbitX` at 12 — on a wide canvas
     * the animal drifts to the edge and shrinks to a few pixels. Worse, every
     * `resize()` re-runs the fit and resets the camera, so pinning once is not
     * enough.
     *
     * The orca also swims: it patrols a path, so a fixed camera loses it. The shot
     * therefore *follows* the animal — camera kept at a fixed offset ahead of it —
     * which reads as a composed backdrop rather than a moving target, and survives
     * the vendor's own resize refits.
     *
     * @param {object} app the vendor instance returned by `mountOrca`.
     * @returns {() => void} stop the follow loop.
     */
    function frameOrca(app) {
      const camera = app.camera;
      const controls = app.controls;
      const orca = app.orca;
      if (camera === undefined || controls === undefined) return function () {};

      // Damping makes OrbitControls recompute the position from its own internal
      // spherical state every `update()`, which fights a followed camera and shows
      // up as a jittering backdrop. Off, so the position set below is the truth.
      controls.enableDamping = false;
      controls.autoRotate = false;
      let raf = 0;

      /** The animal's world position, or null while it does not exist yet. */
      function orcaPosition() {
        if (orca === undefined || orca === null || orca.group === undefined) return null;
        const position = orca.group.position;
        if (position === undefined) return null;
        return position;
      }

      function follow() {
        const animal = orcaPosition();
        if (animal !== null) {
          // Offset ahead of and above the animal: close enough to read its shape,
          // far enough to keep the whole body in frame on a wide canvas.
          camera.position.set(animal.x, animal.y + CAMERA_Y, animal.z + CAMERA_DISTANCE);
          controls.target.set(animal.x, animal.y + CONTROLS_TARGET_Y, animal.z);
          if (typeof camera.lookAt === 'function') {
            camera.lookAt(controls.target.x, controls.target.y, controls.target.z);
          }
        } else {
          camera.position.set(0, CAMERA_Y, CAMERA_DISTANCE);
          controls.target.set(0, CONTROLS_TARGET_Y, 0);
          if (typeof camera.lookAt === 'function') camera.lookAt(0, CONTROLS_TARGET_Y, 0);
        }
        raf = requestAnimationFrame(follow);
      }

      follow();

      return function stop() {
        if (raf !== 0) cancelAnimationFrame(raf);
        raf = 0;
      };
    }

    /**
     * The vendor theme that matches the shell's current colour scheme.
     *
     * `ui-theme` writes the scheme as `document.body[data-ds-dark-theme]`
     * (boot-theme.ts, then ThemePresenter), so this reads the same attribute
     * the stylesheet keys off — one source of truth for both halves of the skin.
     */
    function seaThemeForScheme() {
      return document.body.hasAttribute('data-ds-dark-theme') ? 'deep' : 'tropical';
    }

    /**
     * Keep the sea's theme following the shell's scheme.
     *
     * The scheme is a user preference, not a boot constant: `ui-theme` toggles
     * the attribute on `<body>` while the app is running. Without this, flipping
     * to light leaves a night ocean behind a day UI (and vice versa), which is
     * exactly the kind of mismatch a "skin" must not have.
     *
     * `app.setTheme` re-derives the water column, fog, god rays, seabed, fish,
     * plankton and bubbles from the theme record, so one call is the whole
     * swap — no scene rebuild.
     *
     * @param {object} app the vendor instance returned by `mountOrca`.
     * @returns {() => void} stop watching.
     */
    function watchScheme(app) {
      let current = seaThemeForScheme();
      if (typeof MutationObserver !== 'function') return function () {};
      const observer = new MutationObserver(function () {
        const next = seaThemeForScheme();
        if (next === current) return;
        current = next;
        try {
          app.setTheme(next);
        } catch (error) {
          console.error('[orca-aquarium-backdrop] could not switch the sea theme', error);
        }
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-ds-dark-theme'],
      });
      return function stop() {
        observer.disconnect();
      };
    }

    /**
     * Own the sea layer behind the app: the scene inside it, the ink artwork, the
     * plate tags and the two `<html>` quality attributes the vendor writes.
     *
     * The layer is a body child on purpose. The one frame-wide seat the slot
     * system offers (`shell.overlay`) renders *above* every column, so a scene
     * mounted there can only tint the UI — it can never be looked through.
     *
     * @returns {{ cleanup: () => void, state: object }} cleanup plus the runtime
     * facts the diagnostics entry reports.
     */
    function mountBackdrop() {
      const state = {
        webgl: false,
        mounted: false,
        canvases: 0,
        frame: false,
        sidebarRoot: false,
        bodyBg: '',
        rootBg: '',
        frameBg: '',
        sidebarBg: '',
        // The rect of the element that actually received the art tag, in CSS px.
        // This is the datum that says *where* the wave painted: a sidebar plate
        // reads ~264x900; anything near viewport width means the tag missed.
        sidebarTag: '',
        sidebarRootBg: '',
        cameraZ: '',
        cameraToOrca: '',
        quality: '',
        canvasBox: '',
      };
      const api = vendorApi();
      if (api === null) return { cleanup: function () {}, state: state };

      state.webgl = api.hasWebGL();
      if (!state.webgl) return { cleanup: function () {}, state: state };

      const documentElement = document.documentElement;
      const previous = ['quality', 'touch'].map(function (key) {
        return snapshotDataAttribute(documentElement, key);
      });

      const layer = document.createElement('div');
      layer.className = BACKDROP_CLASS;
      layer.setAttribute('data-orca-backdrop', '');
      layer.setAttribute('aria-hidden', 'true');

      const sceneHost = document.createElement('div');
      sceneHost.className = SCENE_CLASS;

      const ink = document.createElement('div');
      ink.className = INK_CLASS;

      const glow = document.createElement('div');
      glow.className = GLOW_CLASS;

      const leaf = document.createElement('div');
      leaf.className = LEAF_CLASS;

      const mote = document.createElement('div');
      mote.className = MOTE_CLASS;

      // Bottom to top, and the order is the depth order the references use:
      //   scene  — the aquarium
      //   glow   — the corner light that sits *in* the water
      //   ink    — the koi silhouettes, which read as far away
      //   leaf   — the leaves, which read as near (they drift across the art)
      //   mote   — the fine sparkle, which is the closest thing of all
      // No colour wash: the vendor's theme owns the water, and a second veil
      // over it washed the orca out. Every child is inside the same
      // click-through layer, so the app above is untouched.
      layer.append(sceneHost, glow, ink, leaf, mote);
      document.body.appendChild(layer);

      let scene = null;
      let unpinCamera = null;
      let stopThemeWatch = function () {};
      try {
        // Ambient background mode. `QUALITY` is a full settings object: the
        // vendor substitutes whatever it is given for its own resolved tier,
        // so a bare tier name would zero the drawing buffer (see QUALITY).
        //
        // The theme is the *shell's* scheme's theme. The vendor ships three:
        // `iceberg` (bright overcast column, light top to light bottom),
        // `tropical` (clear teal lagoon, dark top and bright bottom) and `deep`
        // (night column, dark top and only slightly lighter at the bottom).
        // The night reference is a dark desaturated ink-blue, so `deep` is its
        // match; the day reference is a bright pale-cyan lagoon with the bright
        // band low in the frame, which is `tropical`.
        scene = api.mountOrca(sceneHost, {
          quality: QUALITY,
          theme: seaThemeForScheme(),
        });
        state.mounted = scene !== null;
        if (scene !== null && scene.app !== undefined) {
          unpinCamera = frameOrca(scene.app);
          // The scheme is a user preference the shell writes to
          // `body[data-ds-dark-theme]` at runtime, so the sea has to follow it
          // or a light/dark switch leaves a night ocean under a day UI.
          stopThemeWatch = watchScheme(scene.app);
        }
      } catch (error) {
        console.error('[orca-aquarium-backdrop] could not start the backdrop', error);
      }

      const plates = tagPlates();
      state.frame = document.querySelector('[' + FRAME_ATTR + ']') !== null;
      state.sidebarRoot = plates.surface !== null;
      // The tagged surface's own box. A rail reads like "264x900"; anything whose
      // width approaches the viewport is the tag landing on an out-of-flow node,
      // which is precisely the failure that painted the damask mid-screen.
      if (plates.surface !== null) {
        const box = plates.surface.getBoundingClientRect();
        state.sidebarTag = Math.round(box.width) + 'x' + Math.round(box.height);
      }
      state.canvases = layer.querySelectorAll('canvas').length;

      // Computed colours, not variables: these are what actually paint, and they
      // are what tells a stacked fill apart from a real compositing bug.
      try {
        const frame = document.querySelector('[' + FRAME_ATTR + ']');
        const sidebar = frame === null ? null : frame.querySelector('[' + PART_ATTR + '=sidebar]');
        const sidebarRoot = document.querySelector('[' + SIDEBAR_ROOT_ATTR + ']');
        const root = document.getElementById('root');
        const canvas = layer.querySelector('canvas');
        const camera = scene !== null && scene.app !== undefined ? scene.app.camera : undefined;
        const animal =
          scene !== null && scene.app !== undefined && scene.app.orca !== undefined
            ? scene.app.orca.group.position
            : null;
        state.bodyBg = getComputedStyle(document.body).backgroundColor;
        state.rootBg = root === null ? 'no-root' : getComputedStyle(root).backgroundColor;
        state.frameBg = frame === null ? 'no-frame' : getComputedStyle(frame).backgroundColor;
        state.sidebarBg = sidebar === null ? 'no-sidebar' : getComputedStyle(sidebar).backgroundColor;
        state.sidebarRootBg =
          sidebarRoot === null ? 'no-sidebar-root' : getComputedStyle(sidebarRoot).backgroundImage;
        state.cameraZ = camera === undefined ? 'no-camera' : String(Math.round(camera.position.z * 10) / 10);
        state.cameraToOrca =
          camera === undefined || animal === null
            ? 'no-orca'
            : String(
                Math.round(
                  Math.hypot(camera.position.x - animal.x, camera.position.z - animal.z) * 10,
                ) / 10,
              );
        state.quality = documentElement.dataset.quality || 'unset';
        // The canvas's *drawing buffer* size, not its CSS box. These diverge
        // exactly when the pixel ratio is bad, and a zero here is what a
        // mistyped quality option looks like: the CSS box can be a healthy
        // 1280x800 while the buffer is 0 and nothing renders.
        state.canvasBox =
          canvas === null
            ? 'no-canvas'
            : canvas.width + 'x' + canvas.height;
      } catch (error) {
        state.bodyBg = 'unreadable';
      }

      return {
        state: state,
        cleanup: function cleanup() {
          // The observer first: it holds a reference to `app`, and it must stop
          // firing before the scene it drives is torn down.
          if (typeof stopThemeWatch === 'function') {
            try {
              stopThemeWatch();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] could not stop the theme watch', error);
            }
            stopThemeWatch = function () {};
          }
          if (typeof unpinCamera === 'function') {
            try {
              unpinCamera();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] could not stop the camera loop', error);
            }
            unpinCamera = null;
          }
          if (scene !== null) {
            try {
              scene.dispose();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] dispose failed', error);
            }
            scene = null;
          }
          // Remove every attribute this plugin added. The old cleanup only took
          // `data-orca-plate` off and never removed `data-orca-sidebar-plate`, so
          // the art tag leaked onto a shell element permanently — outlive the
          // stylesheet and it is invisible, but a later mount that styles that
          // attribute would inherit it.
          plates.elements.forEach(function (plate) {
            plate.removeAttribute(PART_ATTR);
            plate.removeAttribute(SIDEBAR_ROOT_ATTR);
          });
          const frame = document.querySelector('[' + FRAME_ATTR + ']');
          if (frame !== null) frame.removeAttribute(FRAME_ATTR);
          layer.remove();
          previous.forEach(function (snapshot) {
            restoreDataAttribute(documentElement, snapshot);
          });
        },
      };
    }

    /** Collapse a computed colour to a short, readable token. */
    function colorSlug(value) {
      if (typeof value !== 'string') return 'x';
      if (value.indexOf('rgba') === 0) {
        const parts = value.replace(/[^0-9.,]/g, '').split(',');
        const alpha = parts.length === 4 ? Number(parts[3]) : 1;
        return 'a' + Math.round((Number.isFinite(alpha) ? alpha : 1) * 100);
      }
      if (value.indexOf('rgb') === 0) return 'a100';
      return value === 'transparent' ? 'a0' : 'z';
    }

    /** Encode the runtime facts as a short, readable slot id. */
    function diagnosticId(state) {
      return [
        'orca-diag',
        'w' + (state.webgl ? 1 : 0),
        'm' + (state.mounted ? 1 : 0),
        'c' + (state.canvases > 0 ? 1 : 0),
        'f' + (state.frame ? 1 : 0),
        // The art-tagged surface's box. Read it against the viewport: a rail width
        // means the damask is where it belongs; a viewport-scale width means the
        // tag found an out-of-flow node and the tile is painting across the app.
        'S' + (state.sidebarTag === '' ? 'none' : state.sidebarTag.replace('x', '-')),
        'c' + (state.cameraZ === String(CAMERA_DISTANCE) ? 'pinned' : state.cameraZ),
        'D' + state.cameraToOrca,
        'b' + colorSlug(state.bodyBg),
        'r' + colorSlug(state.rootBg),
        'g' + colorSlug(state.frameBg),
        's' + colorSlug(state.sidebarBg),
        'G' + (state.sidebarRootBg.indexOf('gradient') >= 0 ? 1 : 0),
        'q' + state.quality,
      ].join('-');
    }

    /** The slot cell: owns the sea layer's lifetime and reports its state. */
    function OrcaBackdropEntry(props) {
      React.useEffect(function () {
        let mounted = { cleanup: function () {}, state: null };
        try {
          mounted = mountBackdrop();
        } catch (error) {
          console.error('[orca-aquarium-backdrop] mount threw', error);
        }

        // Report through a slot id so the state is readable with
        // cordis_inspect_query(Slots) instead of needing a screenshot.
        let unregister = null;
        try {
          if (mounted.state !== null) {
            unregister = props.ctx.slots.register({
              name: SLOT,
              id: diagnosticId(mounted.state),
              order: -999,
            }, function Diagnostics() {
              return null;
            });
          }
        } catch (error) {
          console.error('[orca-aquarium-backdrop] diagnostics failed', error);
        }

        return function cleanup() {
          if (typeof unregister === 'function') {
            try {
              unregister();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] diagnostics cleanup failed', error);
            }
          }
          mounted.cleanup();
        };
      }, []);

      return null;
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        // The palette goes through the theme service, not a `!important`
        // stylesheet. `overrideTokens` stacks a token layer over the active
        // theme and picks the right value for the current colour scheme, so the
        // skin never fights the shell's own declarations and light/dark is
        // resolved by the shell rather than by our selector.
        ctx.effect(function () {
          const theme = ctx.get('theme');
          if (theme === undefined || typeof theme.overrideTokens !== 'function') {
            console.error('[orca-aquarium-backdrop] the theme service is unavailable');
            return function () {};
          }
          return theme.overrideTokens('@local/orca-aquarium-backdrop', SKIN_TOKENS);
        });

        // Only the structural rules stay a stylesheet: the frame/plate tagging
        // and the sea layer are not theme tokens.
        ctx.effect(function () {
          const tag = document.createElement('style');
          tag.setAttribute(STYLE_ATTR, '');
          tag.textContent = STYLE_TEXT;
          document.head.appendChild(tag);
          return function () {
            tag.remove();
          };
        });

        function Entry() {
          return React.createElement(OrcaBackdropEntry, { ctx: ctx });
        }

        ctx.slots.inject(SLOT, function () {
          return ctx.slots.register({
            name: SLOT,
            id: ENTRY_ID,
            order: -1000,
          }, Entry);
        });
      },
    };
  },
});
