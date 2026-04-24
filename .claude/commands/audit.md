# /audit

Vault hygiene. Scans spots and signals, proposes changes, then executes on confirmation.

## Input

No argument required. Optionally pass a cutoff age in months: `/audit 6`
Default cutoff is 6 months.

## Steps

1. Read all spot files in `trendspots/`
2. Read all signal notes in `signals/`
3. Analyse spots for:
   - **Aging spots** — spots older than the cutoff whose maturity may need updating
   - **Maturity promotions** — `emerging` spots corroborated by newer spots or signals, suggesting a move to `growing` or `mainstream`
   - **Unreviewed spots** — spots with unconfirmed signal suggestions
   - **Signalless spots** — spots with no signals at all
   - **Dead URLs** — flag spots whose source URLs may have gone stale (do not fetch, just flag for manual checking)
4. Analyse signals for:
   - **Overlapping signals** — signals that describe the same underlying force
   - **Weak signals** — signals with only one spot, worth monitoring or retiring
   - **Vague naming** — signals whose names don't clearly communicate the force
   - **Orphaned signals** — signals with no spots tagged
5. Present all findings grouped by type with proposed actions:
   - Maturity promotions (which spots, from → to)
   - Signal merges (which signals to combine, proposed merged name)
   - Signal retirements (which signals to remove and why)
   - Signal renames (current name → proposed name)
   - Spots and signals flagged for manual attention
6. Ask for confirmation — the user can approve all, approve selectively, or cancel
7. Execute all approved changes:
   - Update spot `maturity` fields
   - Merge signals: update all referencing spot files, create or update merged signal note, delete retired notes
   - Retire signals: remove signal note, update referencing spot files
   - Rename signals: rename signal file, update all spot references
8. Save a summary of changes to `reports/audit-YYYY-MM-DD.md`

## Output

- Updated spot and signal files (approved changes only)
- `reports/audit-YYYY-MM-DD.md` — summary of findings and changes made

## Notes

- Always present the full plan and get explicit confirmation before writing any changes
- Never delete a signal with 3 or more spots without explicit confirmation
- Maturity updates to spots can be made directly; signal changes require the user to confirm each merge or retirement
