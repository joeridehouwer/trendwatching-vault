# /spot

Capture a URL as a trend spot.

## Input

A URL passed as an argument: `/spot https://example.com`

## Steps

1. Fetch the page at the given URL
2. Extract the following from the page:
   - `og:title` or page `<title>` → `title`
   - `og:url` or the given URL → `url`
   - `og:description` or meta description → starting point for `summary`
   - `og:image` URL → download and save as `hero.png`
3. Determine the next spot number by checking existing files in `trendspots/` and incrementing
4. Read all existing signal notes in `signals/` to build the current signal library
5. Analyse the page content and suggest which existing signals apply. If the content strongly implies a signal that doesn't exist yet, propose it clearly but do not create it automatically
6. Generate a filled `trendspots/spot-XXX.md` using the trendspot template:
   - Fill all YAML fields from extracted metadata
   - Set `maturity` to `emerging` by default
   - Set `relevance` based on your assessment of the spot's strength (1–5)
   - Write a 2–3 sentence `summary` in plain language
   - Populate `signals` with suggested existing signals, clearly marked as suggestions for review
   - Write short body content under each heading based on page content
7. Download the `og:image` and save to `assets/spot-XXX/hero.png`. If no og:image exists, note this in the file and leave the embed placeholder
8. Save the spot file to `trendspots/spot-XXX.md`

## Output

- `trendspots/spot-XXX.md` — filled trend spot note
- `assets/spot-XXX/hero.png` — hero image
- A short summary in the terminal: spot number, title, signals suggested, any proposed new signals

## Notes

- Always mark suggested signals clearly so the user knows they need review
- Never create new signal notes automatically — propose them and let the user run `/signal` to create them
- If the page is paywalled or inaccessible, extract what is available from the og: tags and note the limitation in the spot body
