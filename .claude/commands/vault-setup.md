# /vault-setup

Guided first-time setup of the vault. Asks the user a series of questions and writes the context section of `CLAUDE.md`.

## Input

No argument required: `/vault-setup`

## Steps

1. Check if the vault context section in `CLAUDE.md` has already been filled in
   - If yes, ask the user whether they want to update it or leave it as is
   - If no, proceed with setup

2. Ask the user the following questions one at a time, waiting for each answer before proceeding:

   - **Domain**: What topic, sector or industry does this vault focus on?
   - **Geography**: Is there a geographic focus, or is it global?
   - **Audience**: Who will read the reports generated from this vault? (e.g. a specific client, role or team)
   - **Lens**: Is there a specific angle or filter to apply when capturing and synthesising? (e.g. sustainability, Gen Z behaviour, B2B adoption, emerging technology)

3. Summarise the answers back to the user and ask for confirmation before writing

4. On confirmation, update the vault context section in `CLAUDE.md` with a clean, well-written paragraph incorporating all answers — replacing the placeholder blockquote entirely

5. Create a `.obsidian/` folder if it doesn't exist and write a minimal `app.json` pointing the Templates plugin at the `templates/` folder

## Output

- Updated `CLAUDE.md` with filled vault context
- Terminal confirmation of what was written

## Notes

- Write the context as a clear prose paragraph, not a list of answers
- The context should give Claude enough to apply the right lens during capture, analysis and synthesis without needing to ask again
- If the user skips a question, omit that element gracefully rather than leaving a blank placeholder
