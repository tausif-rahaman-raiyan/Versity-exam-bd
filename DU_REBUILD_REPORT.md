# DU MCQ Rebuild Report

## Source and scope

Rebuilt the DU MCQ sessions from the supplied `DU(2).txt` source. The source contains 1,185 questions across eight sessions. Question text and option text were preserved from the source; `[IMG:...]` markers were converted to Markdown image embeds that point to the repository's local `/assets/imported/` files.

| Session | Questions | Subject distribution |
|---|---:|---|
| DU 20-21 | 90 | Physics 15, Chemistry 15, Mathematics 15, Biology 15, Bangla 15, English 15 |
| DU 19-20 | 85 | Physics 15, Chemistry 15, Mathematics 15, Biology 15, Bangla 15, English 10 |
| DU 18-19 | 175 | Bangla 30, Biology 30, English 25, Chemistry 30, Physics 30, Mathematics 30 |
| DU 17-18 | 171 | Biology 30, Chemistry 30, Physics 30, Bangla 28, English 27, Mathematics 26 |
| DU 16-17 | 167 | Physics 29, Biology 30, Bangla 28, Mathematics 25, Chemistry 30, English 25 |
| DU 15-16 | 165 | Biology 30, English 24, Bangla 28, Physics 30, Chemistry 29, Mathematics 24 |
| DU 14-15 | 164 | Physics 29, Biology 30, Chemistry 30, English 25, Bangla 27, Mathematics 23 |
| DU 13-14 | 168 | Bangla 29, Chemistry 29, Mathematics 24, Biology 30, Physics 30, English 26 |

The supplied source has fewer than the nominal subject totals in several sessions. Missing questions were not invented or duplicated to fill those gaps.

## Images and math

- All 43 distinct image URLs found in the supplied source have matching local files under `public/assets/imported/`.
- All source image markers in question stems and options now point to local assets; no `assets.chorcha.net` references remain in the rebuilt question data.
- Legacy explanation strings had JavaScript-escape corruption in some TeX commands. Common affected commands were repaired, non-printing control characters were removed, and math delimiter / brace-balance checks were run.
- The app's `MathMarkdownRenderer` normalizes naked TeX fragments and renders dollar-delimited math with KaTeX.

## Answers and explanations

- Existing answer keys and explanations were matched from the repository's prior DU question data by subject and question sequence; the 18-19 English questions were aligned by text because the existing dataset had one additional English item.
- Every rebuilt question currently resolves to one of its four options and has exactly one `is_correct` option.
- **Known content limitation:** all 164 DU 14-15 and all 168 DU 13-14 explanations in the previous repository data were generic placeholder explanations. Those 332 explanations remain flagged for editorial, textbook-based solution writing; they were not replaced with invented reasoning.

## Validation

- `node scripts/check_du_sessions.cjs` passed: 1,185 questions, four options each, answer mapping, explanation presence, and local image paths.
- A separate source comparison found no question or option text mismatches against the supplied TXT after only converting image markers to local Markdown embeds.
- A full TypeScript check and Vite production build could not be completed in this environment: dependencies were not present, `npm ci` timed out, offline installation lacked cached packages, and `tsc --noEmit` stopped because `vite/client` types were unavailable. Run `npm ci`, `npm run lint`, and `npm run build` in a network-enabled environment before deploying.
