# Evaluation — Iteration 001

> Mode: code-only (source read of `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `app/data.ts`, `next.config.js`). No live browser; interaction smoothness inferred from implementation, not observed.

## Scores

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Design Quality | 8/10 | 0.30 | 2.40 |
| Originality | 8/10 | 0.20 | 1.60 |
| Craft | 7/10 | 0.30 | 2.10 |
| Functionality | 8/10 | 0.20 | 1.60 |
| **TOTAL** | | | **7.7/10** |

## Verdict: PASS (threshold: 7.0)

## Hard-Constraint Gates

| Gate | Result | Evidence |
|------|--------|----------|
| `npm run build` static export (`output: 'export'` intact) | PASS | `next.config.js` keeps `output: 'export'`, `trailingSlash`, `images.unoptimized`. Page is `'use client'` only, no server/dynamic/API code, no `next/image`. Build was pre-confirmed green. |
| No phone number anywhere | PASS | Grep for `phone|tel:|+49|+91` across `app/` returns nothing. Contact = Email/LinkedIn/GitHub only. |
| `data.ts` content unchanged in meaning (only EDUCATION permitted) | PASS (with note) | EDUCATION defined locally in `page.tsx`, data.ts untouched there. The `phone` field was removed from `PROFILE` — this is the one meaning-level change, but it is *required* by the no-phone constraint, so it does not trip the gate. |
| No new runtime dependencies | PASS | Imports limited to `framer-motion` + `lucide-react`, both pre-installed. |
| Education present: both degrees + brief periods, MSc current | PASS | MSc AI & Robotics (Hof, Mar 2024–Present, `current: true`) + Bachelor's Mech Eng (Jun 2018–Jul 2022, `current: false`). Bachelor's institution correctly omitted (`null`) rather than invented. |

**Gate triggered? N.** Final is not capped.

---

## Critical Issues (must fix)

1. **Scroll-spy is broken for two tracked-ish sections; section IDs and NAV are misaligned.** `Hero` owns `id="about"`, but the actual `About` narrative section (the `00 / PROFILE` block) has **no `id`**. So the navbar "About" link maps to the hero, and the real About section is untracked. `Certs` also has **no `id`** and is not in `NAV` at all, so it is invisible to scroll-spy and unreachable by nav. → Give the About narrative section a distinct id (e.g. `id="profile"`) OR move `id="about"` onto it and give the hero `id="top"`. Add `id="certifications"` to `Certs` and decide whether it belongs in `NAV` (the `06 / CREDENTIALS` eyebrow implies it is a first-class section, so it should be navigable).

2. **Nested interactive elements in `StandardCard` (a11y + HTML validity).** The whole card is `role="button" tabIndex={0}`, and it contains an `<a>` (GitHub). A button containing a link is invalid interactive nesting and confuses screen readers / sequential focus. `stopPropagation` fixes the *click* but not the semantics or keyboard focus order. → Make the card a non-button container with a visible "+ details" trigger as the actual `<button>`, OR move the GitHub link outside the button's accessible subtree. At minimum add an `aria-label` to the card button describing the expand action.

## Major Issues (should fix)

1. **Eyebrow label vs nav-label drift.** Nav says "Skills" but the eyebrow/section reads `04 / CAPABILITIES`; nav says "Research" while content is fine, but "Certifications" exists as `06 / CREDENTIALS` with no nav entry. Inconsistent vocabulary undermines the "engineer who sweats details" thesis. → Align nav labels and eyebrow text (pick one term per section) and ensure every numbered eyebrow section is represented in `NAV` or intentionally excluded.

2. **Hero has no numbered eyebrow while every other section does.** Spec wants uniform `NN / SECTION` language. The hero breaking the pattern is defensible (it is the masthead), but the numbering then starts at `00 / PROFILE` on About — verify this is the intended sequence and that no number is skipped. Currently sequence is 00,01,02,03,04,05,06,07 which is clean; keep it, but the Skills eyebrow word choice (issue above) is the weak link.

3. **`prefers-reduced-motion` coverage is partial.** The CSS media query kills `animation`/`transition` durations globally (good), and JS guards (`useReducedMotion`) disable Reveal/CountUp/hover-lift/spotlight (good). But the **scroll-progress bar spring** and the **`layoutId` nav underline spring** are Framer springs driven by `useSpring`/layout animation, which are not durations and are not gated by `useReducedMotion`. They will still animate under reduced-motion. → Gate the progress bar and the nav underline transition on `useReducedMotion` (snap instead of spring) for full compliance.

4. **Project expand state can feel surprising on the standard grid.** Only one card expands at a time (`expanded === i`), so opening card B collapses card A elsewhere in the grid — potentially off-screen layout shift the user did not initiate. → Consider a `Set<number>` to allow independent multi-expand, or scroll the toggled card into view. Low risk but worth noting for the "no unexpected layout shift" craft bar.

## Minor Issues (nice to fix)

1. **`focus-visible` uses `ring-offset-2` globally**, including inline text links inside cards. On tight inline links this offset ring can overlap adjacent content. Scope the offset to buttons/cards, use a tighter ring on inline anchors.
2. **Mobile nav is a dot-indicator strip only** (no link menu / hamburger). Acknowledged by generator. Links remain reachable by scrolling, but a recruiter on mobile cannot jump to a section. Add a lightweight toggle menu.
3. **`tailwind.config.ts` defines a `pulseDot` keyframe/animation that is unused** (the live dot uses the `livePulse` keyframe in CSS instead). Dead token — remove or wire it up.
4. **Stat tiles claim "Shipped projects" = `PROJECTS.length` (9)** and "Research papers" = `PAPERS.length` (4). Truthful and derived — good. But "95% Detection accuracy" and "+25% RAG uplift" are hard-coded in `STATS`, not derived; they are backed by real project metrics in data.ts, so acceptable, but flag that they are literals if data ever changes.
5. **`section-title` uses `tracking-tightest` (-0.03em)** while spec asked for `-0.02em` on display. Cosmetic; current value is slightly tighter than briefed. Verify it does not crowd at the 2rem cap.
6. **Hero name forces a manual `<br/>` between "Aniket" and "Deshpande."** At very narrow widths this is fine, but at mid widths it may produce awkward stacking with extra clamp scaling. Consider letting it wrap naturally or using a non-breaking control only below a breakpoint.

## Strengths (genuine, not cope)

1. **Palette + surface discipline is real.** Tokens match the spec (`#0a0a0c` canvas, layered `surface`/`surface-2`, hairline `white/0.06` borders, inset top-highlight instead of heavy shadow, emerald used only for live/metric signals). No full-width loud gradient; background is a genuine dotted-grid + low-opacity vignette, not a centered blur blob. This clears the anti-AI-slop bar.
2. **Strong bespoke identity signals — well above 3 of the rubric set.** Present and wired: numbered mono eyebrows, scroll-progress spring bar (GPU `scaleX`, `origin-left`), IntersectionObserver scroll-spy with animated `layoutId` underline, `~/aniket` mono brand + `focus.sh` terminal panel, cursor-follow radial spotlight on featured cards, featured-vs-standard project tier. This is a distinctly engineered identity, not a brittanychiang 1:1 clone.
3. **Editorial asymmetric hero done correctly** (`lg:grid-cols-[1.15fr_0.85fr]`, identity left / terminal+stat tiles right, single-column collapse) with count-up that respects reduced motion and lands on the exact value. Featured cards span 3 of 6 columns with bullets always visible; standard cards span 2 — clear hierarchy.

## What Improved Since Last Iteration

- Baseline iteration — no prior to compare. Relative to the implied original flat `gray-950` centered template: removed the centered glow blob, introduced elevated surface tokens + hairlines, added the full identity/interaction layer, and added the required Education section.

## What Regressed Since Last Iteration

- None (first iteration).

## Prioritised Improvements for Iteration 2

1. **Fix section IDs / scroll-spy mapping** (Critical #1): give the About narrative its own id, add `id` to Certs, reconcile `NAV` so every numbered section is tracked and reachable.
2. **Resolve nested-interactive in StandardCard** (Critical #2): make the expand trigger a real `<button>` and keep the GitHub link out of the button's accessible subtree.
3. **Align section vocabulary** (Major #1): nav label "Skills" ↔ eyebrow "CAPABILITIES"; add Certifications to nav or rename consistently.
4. **Complete reduced-motion coverage** (Major #3): gate the progress-bar spring and nav-underline layout spring on `useReducedMotion`.
5. **Add a real mobile menu** (Minor #2) so sections are jumpable on phones.
6. **Remove dead `pulseDot` token** (Minor #3) and tidy the focus-ring offset on inline links (Minor #1).

## Notes on Confidence

This is a code-only evaluation. Claims about smoothness (hover lift, expand height-auto, spotlight, no layout shift, 360/768/1280 responsiveness, zero console errors) are inferred from a correct-looking implementation, not observed. The Craft score (7) is deliberately held one band below what the code suggests because reduced-motion gaps and the scroll-spy/id defects are concrete, and live interaction jank cannot be ruled out without a browser pass. If a live run confirms smooth interactions and the id/reduced-motion fixes land, Craft moves to 8 and the weighted total to ~8.0.
