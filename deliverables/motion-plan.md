# Motion plan

Result: PASS. Scene count: 4. External candidates reviewed: React Bits Scroll Stack, Scroll Expand, Magic Bento, and the user-specified OpenAI GPT-6 Astra reference page. The final system is light, warm and architectural; it must not become a black interface.

## Scene 1 — Architectural hero depth

- Purpose: give the three supplied banner images an advertising-level composition while keeping all headline and CTA text live HTML.
- Motion: slow focal parallax, restrained mask reveal and slide-specific depth; no random particle field and no full-frame dark overlay.
- Desktop: pointer movement may shift two decorative depth planes by at most 12px.
- 390px: no pointer parallax; use dedicated focal crop and a short opacity/translate reveal.
- Reduced motion: first slide is immediately visible; carousel remains manually operable without auto-motion.

## Scene 2 — Three.js material cross-section

- Purpose: explain the verified insulated-panel assembly, not merely decorate the page.
- Motion: an exploded cutaway separates finish, calcium-silicate structural layer and selected insulation core; control changes animate between exact layers.
- Desktop: lazy-load Three.js when near viewport; cap DPR, pause when off-screen, and stop the render loop after settling.
- 390px: default to a static layered SVG/CSS diagram with tap-select details; enable WebGL only when capability and performance budget permit.
- Reduced motion/no WebGL: static accessible diagram and complete text table preserve all information.

## Scene 3 — Project Scroll Stack

- Candidate: `react-bits:scroll-stack` version `1.0.0+009401`.
- Purpose: reveal eight named projects in sequence without turning the page into a gallery dump.
- Desktop: short sticky stack with visible next-card context and keyboard-safe links.
- 390px/touch: disable sticky behavior and render ordinary vertical cards.
- Reduced motion: cards render in document flow with no transform transitions.

## Scene 4 — Product and FAQ feedback

- Candidates: `react-bits:magic-bento` and `original-grouped-faq`.
- Purpose: clarify product-system relationships and FAQ state changes.
- Desktop: modest hover/focus depth and per-item viewport entry.
- 390px: tap/focus states only, no cursor-following glow.
- Reduced motion: immediate state changes; no entry transforms.

## Lifecycle and quality gates

Every major public content section gets its own IntersectionObserver lifecycle. No global/fixed timeout may mark unseen sections as completed. Failure fallback may reveal content but must not consume later entry animation. Production review must verify desktop, 390px, reduced-motion, off-screen pause, keyboard operation, touch behavior and no horizontal overflow.
