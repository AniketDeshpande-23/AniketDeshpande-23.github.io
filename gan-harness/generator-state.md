# Generator State — Iteration 002

## What Changed This Iteration (bug-fix pass)
- **Fixed scroll-spy section IDs (Critical #1):** Hero now owns `id="top"`; the real About narrative section (`00 / PROFILE`) now owns `id="about"`, so the nav "About" link and IntersectionObserver scroll-spy track the correct section. Added `id="certifications"` to the Certs section. All NAV ids (`about`, `experience`, `education`, `projects`, `skills`, `research`, `contact`) are now present on their respective `<section>` elements.
- **Fixed invalid interactive nesting in StandardCard (Critical #2):** outer container changed from a `role="button" tabIndex` `motion.div` to a non-interactive `motion.article`. The expand/collapse trigger is now a real `<button>` in the card footer with `aria-expanded` + descriptive `aria-label`. The GitHub `<a>` is no longer nested inside a button's accessible subtree (no more button-in-button / link-in-button nesting; `stopPropagation` no longer needed for semantics).
- `npm run build` re-verified green (static export intact, 53.9 kB page).

Targeted minimal changes only — no redesign.

---

# Generator State — Iteration 001

## What Was Built
A full premium rework of the ATLAS portfolio (`app/page.tsx`, `app/globals.css`, `tailwind.config.ts`).

- **Design tokens (tailwind.config.ts):** `canvas #0a0a0c`, `surface`/`surface-2`, `ink` ramp (`ink`/`ink-soft`/`ink-muted`), `accent`/`accent-2` (indigo→violet), `signal` (emerald). JetBrains Mono + Inter font families. `livePulse`/`pulseDot` keyframes.
- **globals.css component layer:** `.eyebrow`, `.section-title`, `.card` (hairline border + inner highlight, no heavy shadow), `.tag`, `.btn-primary`/`.btn-ghost`, `.live-dot`. Fixed dotted-grid + soft radial vignette background (no blur blob). `:focus-visible` ring. `prefers-reduced-motion` media query disabling animations.
- **Scroll-progress bar:** 2px GPU `scaleX` spring gradient bar pinned to top (`useScroll`/`useSpring`).
- **Scroll-spy navbar:** IntersectionObserver-based active section; animated `layoutId` underline; navbar turns opaque + hairline border after scroll; mono `~/aniket` brand; mobile shows active-section label + dot indicators.
- **Editorial asymmetric hero:** left identity column (live status badge, large clamp display name, role line, tagline, LinkedIn/GitHub/Email CTAs, location); right `focus.sh` mono terminal panel + 2x2 derived stat tiles with count-up.
- **About strip:** 00 / PROFILE eyebrow + `PROFILE.summary`.
- **Experience timeline:** shared `TimelineItem`, glowing emerald node for current role, mono period chips, location meta, staggered reveals.
- **Education (NEW):** 02 / EDUCATION, GraduationCap eyebrow, same timeline language. MSc AI & Robotics (Hof, Mar 2024–Present, current) + Bachelor's Mech Eng (Jun 2018–Jul 2022). EDUCATION defined locally in page.tsx so data.ts content is unchanged.
- **Projects:** top 2 (AI Support Agent, KRAFT 2.0) as featured cards spanning 3 cols with bullets always visible + cursor-follow radial spotlight + lift/glow hover. Remaining 7 as standard cards (2-col span) with click/keyboard expand (Framer height-auto via AnimatePresence) and stack truncation. GitHub link uses stopPropagation so it never toggles expand.
- **Skills (visual):** grouped panels each with a category lucide icon, item count badge, first-item emphasis chip, hover emphasis — not a flat tag dump.
- **Research:** numbered mono index cards with hover accent underline reveal.
- **Certifications:** monogram badges derived from issuer initials, hover lift.
- **Contact:** structured channel rows — Email (mailto), LinkedIn, GitHub only. No phone. Location shown in copy.
- **Footer:** social row, build credit, back-to-top.

## What Changed This Iteration
- Initial rework from flat centered template to editorial dark theme.
- Removed the lone centered hero glow blob.
- Replaced gray-950 flat palette with elevated surface tokens + hairlines.
- Added numbered mono section eyebrows across all sections.
- Added scroll-spy, progress bar, count-up, cursor spotlight, reduced-motion support.

## Constraints Verified
- `npm run build` succeeds with static export (`output: 'export'` intact). 53.9 kB page.
- No phone number anywhere (grep for phone/+49/tel: returns nothing).
- `app/data.ts` content unchanged in meaning — only the `phone` field was removed (required by the no-phone hard constraint). EDUCATION added locally, not in data.ts.
- No new npm dependencies.
- All external links use `target="_blank" rel="noopener noreferrer"`; email is `mailto:`.

## Known Issues
- Mobile nav is a section-indicator strip (no full link menu / hamburger) — links remain reachable via scroll; could add a toggle menu next iteration.
- Bachelor's institution intentionally omitted (not in source brief) rather than invented.

## Dev Server
- URL: http://localhost:3000
- Status: running (Ready in ~1.1s)
- Command: npm run dev
