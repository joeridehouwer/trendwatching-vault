# /signal

Capture a manually observed signal — something you spotted directly rather than via a URL.

## Input

A free text description passed as an argument: `/signal "People are replacing morning routines with AI-assisted audio briefings"`

## Steps

1. Read all existing signal notes in `signals/` to build the current signal library
2. Analyse the description against existing signals:
   - If it clearly overlaps with an existing signal, suggest merging rather than creating a new one and explain why
   - If it is distinct, proceed to create a new signal note
3. Derive a short hyphenated slug for the signal name (e.g. `ai-morning-briefing`)
4. Generate a new `signals/signal-name.md` using the signal template:
   - Fill the `signal` field with the slug
   - Write a concise 1–2 sentence `description` capturing the underlying force
   - Write a short "What is this signal?" paragraph in the body
5. Save the file to `signals/signal-name.md`

## Output

- `signals/signal-name.md` — new signal note, or a merge suggestion if overlap detected
- A short terminal summary: signal name, description, any overlap warnings

## Notes

- Err on the side of suggesting a merge if in doubt — a lean signal library is more useful than a fragmented one
- The Dataview query in the signal template will automatically populate with spots once they are tagged
