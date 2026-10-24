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
      // The window. Stays translucent on purpose: this is where the aquarium
      // shows through, and the only surface allowed to move with it.
      '--dsw-alias-bg-base': { dark: 'rgba(76,97,129,.30)', light: 'rgba(207,231,237,.34)' },
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
      '[', SIDEBAR_ROOT_ATTR, ']{',
      'background-image:',
      'radial-gradient(130% 34% at 0% 0%,rgba(120,205,235,.22),rgba(120,205,235,0) 62%),',
      'radial-gradient(90% 40% at 100% 100%,rgba(216,138,92,.10),rgba(216,138,92,0) 60%),',
      'linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,0) 52%)!important;',
      '}',
      'body:not([data-ds-dark-theme]) [', SIDEBAR_ROOT_ATTR, ']{',
      'background-image:',
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
      '}',
      'body:not([data-ds-dark-theme]) .', BACKDROP_CLASS, '{',
      '--orca-ink:rgba(22,58,84,.11);',
      '}',
      '.', SCENE_CLASS, '{position:absolute;inset:0;}',
      '.', INK_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-ink);',
      '-webkit-mask-image:', INK_TILE, ';mask-image:', INK_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:420px 420px;mask-size:420px 420px;',
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
     * The frame is found through the stable hook the layout owns — `data-shell-overlay`
     * is one of the frame's own children — instead of its hashed class name, so
     * tagging survives rebuilds. Children are tagged by position: the layout renders
     * the sidebar first, and the bottom row carries its own stable hook. Tagging
     * adds attributes and changes no structure; the cleanup removes them again.
     *
     * The sidebar's *inner* root is tagged too: it paints its own fill, so it is
     * the element the sidebar art belongs to.
     *
     * @returns {Element[]} the tagged elements, for cleanup.
     */
    function tagPlates() {
      const overlay = document.querySelector('[data-shell-overlay]');
      const frame = overlay === null ? null : overlay.parentElement;
      if (frame === null) return [];

      frame.setAttribute(FRAME_ATTR, '');
      const tagged = [];
      const children = Array.prototype.slice.call(frame.children);
      children.forEach(function (child, index) {
        if (child.hasAttribute('data-shell-overlay')) return;
        if (child.hasAttribute('data-shell-bottom')) {
          child.setAttribute(PART_ATTR, 'bottom');
          tagged.push(child);
          return;
        }
        if (index === 0) {
          child.setAttribute(PART_ATTR, 'sidebar');
          tagged.push(child);
          // The sidebar's inner root is the first descendant that fills the column.
          const inner = child.firstElementChild;
          if (inner !== null) {
            inner.setAttribute(SIDEBAR_ROOT_ATTR, '');
            tagged.push(inner);
          }
        }
      });
      return tagged;
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

      // The scene first, then the ink artwork over it. No colour wash: the
      // vendor's theme owns the water, and a second veil over it washed the
      // orca out. Both children are inside the same click-through layer, so
      // the app above is untouched.
      layer.append(sceneHost, ink);
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
      state.sidebarRoot = document.querySelector('[' + SIDEBAR_ROOT_ATTR + ']') !== null;
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
          plates.forEach(function (plate) {
            plate.removeAttribute(PART_ATTR);
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
        'S' + (state.sidebarRoot ? 1 : 0),
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
