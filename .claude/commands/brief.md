# /brief

Generate a trend brief from confirmed spots and signals. Optionally render it as a presentation.

## Input

- `/brief` — markdown brief only
- `/brief pptx` / `/brief html` / `/brief pdf` — brief + rendered presentation
- `/brief 2026-01 2026-04` — filter by date range
- `/brief pptx reports/2026-04-brief.md` — render a specific existing brief

## Steps

### Always: generate the brief

1. Read `CLAUDE.md` to load the vault context — topic, audience, client, lens
2. Read all confirmed signal notes in `signals/`
3. Read all spot files in `trendspots/`, extracting: title, signals, maturity, summary, category, relevance, date_spotted
4. Filter to confirmed signals only — ignore spots with unreviewed signal suggestions
5. Count signal frequency across spots — signals appearing in 3+ spots are macro trend candidates
6. Group spots into 3–5 macro trends:
   - Name each trend as a sharp verb phrase that captures the underlying shift
   - Prioritise signals with the highest spot count and strongest relevance scores
7. For each macro trend write:
   - A 2-sentence headline summary
   - The underlying cultural, technological or economic tension driving it
   - The 3 most evidencing spots (cite by title and link)
   - A maturity assessment (emerging / growing / mainstream)
   - An implication framed for the vault's stated audience and context
8. Write a short introduction framing the overall brief
9. Flag spots that don't fit any macro trend as weak signals to watch
10. Save the brief to `reports/YYYY-MM-brief.md`

### If a format argument is given: render the presentation

11. For each macro trend, locate hero images for its 3 evidencing spots in `assets/`
12. Build the presentation structure:
    - **Cover slide** — brief title, date, context/client from CLAUDE.md
    - **Overview slide** — list of macro trends as a visual index
    - **One section per macro trend:**
      - Trend title slide
      - 3 spot slides — hero image + title + 1-sentence summary
      - Synthesis slide — headline, tension, implication
    - **Weak signals slide** — spots that didn't fit a macro trend
    - **Closing slide**
13. Generate the output file and save to `reports/`

## Output

- `reports/YYYY-MM-brief.md` — structured trend brief (always)
- `reports/YYYY-MM-brief.pptx` / `.html` / `.pdf` — rendered presentation (if format given)

## Format notes

**pptx** — use the pptx skill (`/mnt/skills/public/pptx/SKILL.md`) to generate the file

**html** — generate a single self-contained HTML file with embedded CSS, using a clean minimal presentation layout. Images are embedded as base64.

**pdf** — use the pdf skill (`/mnt/skills/public/pdf/SKILL.md`) to generate the file

## Notes

- The brief should read as a coherent narrative, not a list of summaries
- Implications must be specific to the vault context defined in `CLAUDE.md` — generic implications are not useful
- If the vault context section in `CLAUDE.md` is still blank, stop and ask the user to fill it in first
- If a spot's hero image is missing, use a placeholder rather than skipping the slide
- Keep slide copy short — headlines and 1-sentence summaries only. Detail lives in the brief markdown.
