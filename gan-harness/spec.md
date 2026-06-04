# Product Specification: Aniket Deshpande — Portfolio "ATLAS"

> Generated from brief: "Rework the portfolio UI at F:\project\AI Projects\portfolio to be significantly more polished and professional for Aniket Deshpande, MSc AI student + Working Student Gen AI @ Allianz SE."

## Vision

ATLAS is the personal portfolio of Aniket Deshpande — an AI engineer who ships production systems, not demos. The site should read like the work of a senior AI engineer who cares about craft: dense with signal, quiet in its confidence, and visually precise. It must feel like a piece of well-engineered software, not a template. Recruiters and hiring managers at companies like Allianz should leave convinced this person sweats the details.

**Hard constraints (non-negotiable):**
- Stack stays: Next.js 14 (App Router), Tailwind CSS, Framer Motion, lucide-react. No new runtime dependencies.
- `app/data.ts` content is **read-only**. This is a visual/structural rework. The only new data permitted is a hard-coded `EDUCATION` array (see below) since the brief explicitly requests an Education section, and a small derived `STATS` set if needed — but prefer deriving stats from existing data.
- **No phone number anywhere.** Contact surface = email, LinkedIn, GitHub only.
- Must pass `npm run build` with `output: 'export'` (static export). No server components needing runtime, no dynamic routes, no API calls, no `next/image` remote loaders.
- Dark theme only. No light-mode toggle required.

## Design Direction

- **Color palette** (refine, do not rainbow):
  - Base canvas: `#0a0a0c` (near-black, slightly warm) replacing flat `gray-950`.
  - Elevated surface: `#111114` / `#16161a` for cards, with a 1px `rgba(255,255,255,0.06)` hairline border.
  - Primary accent: indigo `#6366f1` → violet `#8b5cf6` (keep the existing accent family for continuity).
  - Secondary accent (sparingly, for "live"/metric signals): emerald `#10b981`.
  - Text ramp: `#f4f4f5` (headings) → `#a1a1aa` (body) → `#52525b` (muted/meta).
  - **Forbidden:** full-width loud gradients, neon-on-neon, more than 2 accent hues competing in one viewport.
- **Typography:**
  - Display/headings: Inter (already loaded) at 700–800, tight tracking (`-0.02em`), large scale jumps for hierarchy.
  - Body: Inter 400/500, `1.6` line-height.
  - Mono accents: JetBrains Mono (configured in tailwind but font not loaded — add the Google Fonts import or fall back gracefully) for metrics, dates, eyebrow labels, and stack tags. Mono is the "engineer" signal — use it deliberately, not everywhere.
  - Establish a real type scale: hero name ~clamp(2.75rem, 6vw, 4.5rem); section titles ~2rem; card titles ~1.05rem.
- **Layout philosophy:** Structured editorial, not centered-everything. Hero is an asymmetric two-column on desktop (identity left, metric panel / monospace "terminal" card right) collapsing to single column on mobile. Body sections use a consistent max-width grid with generous vertical rhythm (py-24/28). Avoid the "everything centered in a column" look that screams template.
- **Visual identity (anti-AI-slop):**
  - A subtle fixed background texture: faint dotted grid or radial vignette at low opacity — NOT a big blurry blob.
  - Section "eyebrow" labels in mono caps with an index number (e.g., `01 / EXPERIENCE`).
  - Consistent hairline borders + soft inner highlight on cards instead of heavy drop shadows.
  - A thin scroll-progress indicator at the top of the viewport.
  - Active-section highlighting in the navbar via scroll-spy.
  - **Avoid:** generic glassmorphism overload, stock illustrations, emoji decoration, identical rounded cards with no rhythm, the single centered glow blob currently in the hero.
- **Inspiration:** Linear (restraint, hairlines, mono accents), Vercel (typographic hierarchy, dark surfaces), Rauno Freiberg / rauno.me (craft, micro-interactions), brittanychiang.com (engineer-portfolio structure and scroll-spy nav).

## Information Architecture (sections, in order)

1. Hero / identity
2. About + highlight strip (derived stats)
3. Experience (timeline)
4. **Education (NEW)**
5. Projects (featured + grid)
6. Skills (visual, proficiency-oriented)
7. Research Papers
8. Certifications
9. Contact
10. Footer

## New Data: EDUCATION

Add to `app/data.ts` (the ONLY permitted content addition) or define locally if data.ts must stay byte-for-byte unchanged — implementer's choice, but a typed `EDUCATION` const is preferred:

```ts
export const EDUCATION = [
  {
    degree: 'MSc Artificial Intelligence & Robotics',
    institution: 'Hof University of Applied Sciences',
    location: 'Hof, Germany',
    period: 'Mar 2024 – Present',
    current: true,
    detail: 'Focus: LLMs, RAG systems, computer vision, and AI deployment on edge & cloud.',
  },
  {
    degree: "Bachelor's, Mechanical Engineering",
    institution: 'Savitribai Phule Pune University', // institution name not in brief — use neutral label if unknown
    location: 'India',
    period: 'Jun 2018 – Jul 2022',
    current: false,
    detail: 'Foundations in systems, mechatronics, and robotics that bridged into AI/ML.',
  },
]
```
> If the implementer cannot confirm the bachelor's institution from existing data, omit the institution field rather than inventing one. Periods and degree names from the brief are authoritative.

## Features (prioritized)

### Must-Have (Sprint 1-2)

1. **Refined Hero** — Asymmetric layout. Left column: status badge (live pulse, "Working Student Gen AI @ Allianz SE"), name in large display type, role line, tagline from `PROFILE.tagline`, CTA row (LinkedIn, GitHub, Email — no phone). Right column on desktop: a monospace "card" presenting the derived headline metrics OR a stylized identity panel (e.g., `~/aniket` terminal block listing focus areas). Acceptance: legible hierarchy where the eye lands name → role → metrics → CTAs; single-column graceful collapse on mobile; no lone centered blur blob.

2. **Scroll-spy sticky navbar** — Navbar links reflect new IA. Active section highlighted as user scrolls. Becomes opaque with hairline border after scroll. Acceptance: correct active link within 200ms of section entering viewport; keyboard-focusable links; mobile shows a compact menu (links or a simple toggle).

3. **Scroll-progress bar** — A 2px accent bar pinned to the top tracking page scroll. Acceptance: smooth, GPU-friendly (transform/scaleX), reaches full width at page bottom.

4. **Experience timeline (upgraded)** — Keep timeline metaphor but tighten: glowing node for current role, mono period chips, location meta, animated bullet reveal. Acceptance: clear current-vs-past distinction; staggered in-view animation; no layout shift.

5. **Education section (NEW)** — Two entries rendered as timeline or paired cards matching Experience visual language. Current degree gets the "live" treatment. GraduationCap icon eyebrow. Acceptance: present, populated from EDUCATION, visually consistent with Experience, responsive.

6. **Project cards with rich hover** — Each card: title, period, mono stack tags, emerald metric badge, GitHub link. On hover: lift (translateY), accent hairline glow, a subtle gradient/spotlight that follows cursor OR a fixed accent corner accent, and tag/metric emphasis. Keep click-to-expand bullets but make the expand animation smooth (height auto via Framer Motion). Acceptance: hover state is distinctly richer than current flat border-color change; expand/collapse has no jank; GitHub link click does not trigger expand.

7. **Featured projects treatment** — Promote the top 2 projects (AI Support Agent, KRAFT 2.0) into larger "featured" cards spanning more grid columns with bullets visible by default; remaining projects in the compact grid. Acceptance: clear visual hierarchy between featured and standard projects.

8. **Visual Skills section** — Replace plain tag clouds with a more visual treatment: grouped skill panels where each group has an icon, and items rendered as either (a) labeled proficiency bars, (b) a weighted/sized chip layout, or (c) a categorized matrix with hover emphasis. Must remain truthful — do not invent numeric proficiency levels not in data; if using bars, derive a sensible visual weight from category ordering rather than claiming exact percentages, OR use emphasis-on-hover chips. Acceptance: reads as designed, not as a raw tag dump; responsive 1→2 column.

### Should-Have (Sprint 3-4)

9. **About + highlight strip** — A short narrative block using `PROFILE.summary`, paired with a horizontal strip of derived headline stats (95% detection accuracy, +25% RAG uplift, project count, papers count) rendered as crisp stat tiles. Acceptance: stats derived from existing data/summary, not hard-coded falsehoods; tiles have mono numerals and quiet labels.

10. **Research papers (upgraded)** — Numbered list → refined cards with mono index, hover reveal of accent rule, BookOpen eyebrow. Acceptance: improved over current flat list; consistent card language.

11. **Certifications grid (upgraded)** — Keep grid but improve: issuer logos-as-monogram or consistent badge icon, hover lift. Acceptance: tidy 2-col responsive grid, hover feedback.

12. **Contact section (refined, no phone)** — Centered CTA card OR a structured contact block. Email, LinkedIn, GitHub, location. Explicitly NO phone field. Acceptance: three channels present, phone absent, email is a working `mailto:` link.

13. **Section eyebrows + consistent headings** — Every section gets `NN / SECTION NAME` mono eyebrow + display title. Acceptance: uniform across all sections.

### Nice-to-Have (Sprint 5+)

14. **Cursor-follow spotlight on featured cards** — Radial light tracking pointer within featured project cards (CSS variable updated on mousemove). Acceptance: smooth, disabled/neutral on touch devices, no perf hit.

15. **Reduced-motion support** — Respect `prefers-reduced-motion`: disable parallax/heavy entrance animation, keep content fully visible. Acceptance: with reduced motion enabled, all content renders immediately, no infinite/auto-bounce animations.

16. **Animated metric count-up** — Hero/stat numbers count up on first in-view. Acceptance: counts once, respects reduced motion, ends on exact value.

17. **Polished footer** — Back-to-top affordance, social row, build credit. Acceptance: consistent with overall craft.

## Technical Stack

- **Frontend:** Next.js 14 App Router, single client page (`app/page.tsx`) or split into `components/`. TypeScript.
- **Styling:** Tailwind CSS. Extend `tailwind.config.ts` with the refined palette tokens (e.g., `surface`, `surface-2`, `ink`, `accent`, `accent-2`). Use `@layer components` in `globals.css` for `.card`, `.tag`, `.eyebrow`, `.section-heading`.
- **Animation:** Framer Motion only (already installed). Use `useInView`, `useScroll`/`useSpring` for progress bar, `whileHover`, layout/height animations.
- **Icons:** lucide-react (add `GraduationCap` for Education).
- **Fonts:** Inter (loaded). Add JetBrains Mono via the existing Google Fonts `@import` so mono tokens render as intended; ensure graceful fallback.
- **Build:** static export must remain green. No new packages. Keep `next.config.js` as-is.

## Evaluation Criteria

(Full weighted rubric in `eval-rubric.md`. Summary below.)

### Design Quality (weight: 0.30)
"Good" here = disciplined, senior aesthetic. Refined dark palette with real surface elevation and hairline borders; strong, consistent typographic hierarchy with mono accents used purposefully; asymmetric/editorial hero; coherent spacing rhythm. Penalize: lone centered glow blob, gradient abuse, low contrast, inconsistent card styling.

### Originality (weight: 0.20)
Feels bespoke, not templated. Distinct identity elements present (numbered section eyebrows, scroll-spy nav, progress bar, mono "engineer" signals, cursor spotlight or equivalent). Does NOT look like a generic AI-generated portfolio or brittanychiang clone copied 1:1. Penalize: stock-y centered single column, generic identical cards.

### Craft (weight: 0.30)
Micro-interactions and states. Smooth project hover + expand, staggered in-view reveals without layout shift, working scroll-spy + progress bar, reduced-motion support, responsive at 360px / 768px / 1280px, no console errors, clean focus states.

### Functionality (weight: 0.20)
Critical flows work and constraints hold:
- `npm run build` succeeds with static export.
- Education section present and correct (both degrees, periods from brief, current flag on MSc).
- Contact shows email + LinkedIn + GitHub and NO phone number anywhere on the page.
- All `PROFILE/EXPERIENCE/PROJECTS/SKILLS/PAPERS/CERTS` content rendered, unchanged in meaning.
- All external links use `target="_blank" rel="noopener noreferrer"`; email is `mailto:`.

## Sprint Plan

### Sprint 1: Foundation & Hero
- Goals: Establish design tokens, fonts, global components; rebuild hero + navbar + scroll-progress.
- Features: #1, #2, #3, design tokens, JetBrains Mono load, `globals.css` component layer.
- Definition of done: New hero renders asymmetric on desktop / stacked on mobile; navbar scroll-spy + progress bar working; build green.

### Sprint 2: Experience, Education, Projects
- Goals: Core content sections with upgraded visuals.
- Features: #4, #5 (NEW Education), #6, #7.
- Definition of done: Timelines consistent, Education populated, project cards have rich hover + featured tier, expand/collapse smooth, no layout shift, build green.

### Sprint 3: Skills, About, Research, Certs, Contact
- Goals: Visual skills, narrative, remaining sections, contact constraint.
- Features: #8, #9, #10, #11, #12, #13.
- Definition of done: Skills visibly redesigned; stats truthful; contact has 3 channels and no phone; all sections share eyebrow/heading language; build green.

### Sprint 4: Craft & Polish
- Goals: Micro-interactions, accessibility, responsiveness, final QA.
- Features: #14, #15, #16, #17; cross-breakpoint pass; focus states; console clean.
- Definition of done: Reduced-motion respected, count-ups exact, responsive at 360/768/1280, zero console errors, `npm run build` green, no phone number present.
