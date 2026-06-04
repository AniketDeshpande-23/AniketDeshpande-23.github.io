# Evaluation Rubric: Portfolio "ATLAS" Rework

> Consumed by the Evaluator agent. Score each criterion 0–10, multiply by weight, sum for a final score out of 10.
> Project: visual rework of `F:\project\AI Projects\portfolio` (Next.js 14 + Tailwind + Framer Motion, static export).

## Scoring Method

- Each criterion scored on a **0–10 scale**.
- `Final = 0.30·Design + 0.20·Originality + 0.30·Craft + 0.20·Functionality`.
- Max final score = 10.0.
- **Gate:** If any HARD CONSTRAINT below fails, cap Final at **4.0** regardless of other scores.

### HARD CONSTRAINTS (gating — failure caps Final at 4.0)
- [ ] `npm run build` succeeds (static export, `output: 'export'` intact).
- [ ] No phone number anywhere on the rendered page.
- [ ] `app/data.ts` existing content unchanged in meaning (only permitted addition: `EDUCATION`).
- [ ] No new runtime dependencies added to `package.json`.
- [ ] Education section present with both degrees and the periods from the brief.

---

## 1. Design Quality — weight 0.30

| Band | Score | Description |
|------|-------|-------------|
| Excellent | 9–10 | Disciplined senior aesthetic: refined dark palette with real surface elevation + hairline borders, strong consistent type hierarchy, mono accents used purposefully, editorial/asymmetric hero, coherent spacing rhythm. Looks intentionally designed. |
| Good | 7–8 | Clear improvement over original; mostly consistent hierarchy and palette; minor spacing/contrast inconsistencies. |
| Fair | 4–6 | Some polish but generic in places; centered-column feel or uneven cards. |
| Poor | 0–3 | Flat, low contrast, gradient abuse, lone centered glow blob, template look. |

Check: palette tokens applied; hero is asymmetric on desktop; mono typography present; consistent card language; no loud full-width gradients.

## 2. Originality — weight 0.20

| Band | Score | Description |
|------|-------|-------------|
| Excellent | 9–10 | Bespoke identity: numbered section eyebrows, scroll-spy nav, progress bar, engineer mono signals, cursor spotlight or equivalent. Not a 1:1 clone of any known template. |
| Good | 7–8 | Several distinct identity elements; feels personal. |
| Fair | 4–6 | A couple of custom touches but largely conventional. |
| Poor | 0–3 | Generic AI-portfolio look; no distinguishing identity. |

Check: at least 3 of {numbered eyebrows, scroll-spy, progress bar, mono identity panel/terminal, cursor spotlight, featured-project tier} present and working.

## 3. Craft — weight 0.30

| Band | Score | Description |
|------|-------|-------------|
| Excellent | 9–10 | Smooth project hover + expand (no jank/layout shift), staggered in-view reveals, working scroll-spy + progress bar, reduced-motion respected, responsive at 360/768/1280, clean focus states, zero console errors. |
| Good | 7–8 | Most interactions smooth; minor jank or one missing state. |
| Fair | 4–6 | Animations present but rough; some responsive/overflow issues. |
| Poor | 0–3 | Janky or broken interactions, layout shift, console errors, broken responsive layout. |

Check: hover states distinctly richer than original border-color change; GitHub link click does not toggle expand; `prefers-reduced-motion` disables auto/looping motion; no horizontal overflow at 360px.

## 4. Functionality — weight 0.20

| Band | Score | Description |
|------|-------|-------------|
| Excellent | 9–10 | All sections render correct unchanged content; Education correct (MSc current, periods from brief); contact = email + LinkedIn + GitHub, no phone; all external links `target=_blank rel=noopener noreferrer`; email is `mailto:`; build green. |
| Good | 7–8 | All flows work; one minor link/attribute omission. |
| Fair | 4–6 | A section missing or misrendered, or a link attribute issue. |
| Poor | 0–3 | Build fails, content missing/altered, or phone present. |

Check critical flows:
1. Page loads, all 9 content sections + footer present.
2. Education: MSc AI & Robotics (Hof, Mar 2024–Present, current) + Bachelor's Mech Eng (Jun 2018–Jul 2022).
3. Contact: email (mailto), LinkedIn, GitHub — no phone.
4. Project card expand/collapse works; GitHub icon opens repo in new tab without expanding.
5. `npm run build` produces static export without error.

---

## Score Sheet (Evaluator fills)

| Criterion | Weight | Raw (0–10) | Weighted |
|-----------|--------|-----------|----------|
| Design Quality | 0.30 | | |
| Originality | 0.20 | | |
| Craft | 0.30 | | |
| Functionality | 0.20 | | |
| **Final** | 1.00 | | **/10** |

Hard-constraint gate triggered? (Y/N): ___  → if Y, cap Final at 4.0.

### Feedback template for Generator
- Top 3 strengths:
- Top 3 issues to fix next iteration:
- Any hard-constraint failure (must-fix):
