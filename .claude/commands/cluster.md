# /cluster

Find hidden connections across the entire vault, then act on the findings with confirmation.

## Input

No argument required. Operates on the full vault.

## Steps

### Analyse

1. Read every spot file in `trendspots/` — title, summary, body, category, geography, audience, maturity
2. Temporarily set aside existing signal tags — treat all spots as raw untagged material
3. Cluster spots by underlying themes, tensions and forces using only content analysis
4. Compare your derived clusters against the existing signal library in `signals/`:
   - Identify signals that appear to be the same underlying force under different names
   - Identify clusters that have no corresponding signal yet
   - Identify spots that are grouped differently from their current tags — possible mis-tags
   - Identify macro patterns that only become visible at this scale

### Propose

5. Present all findings with proposed actions:
   - **New signals** — proposed name, slug, and description for each unmapped cluster
   - **Merge candidates** — which signals to combine and under what name
   - **Re-tags** — spots to move to a different or new signal
   - **Macro patterns** — cross-category observations worth noting in the next brief
6. Ask for confirmation — the user can approve all, approve selectively, or cancel

### Execute

7. On confirmation, action approved changes:
   - Create new signal notes for approved proposals
   - Update spot files to reflect approved re-tags
   - Save a summary to `reports/cluster-YYYY-MM-DD.md`

## Output

- Updated spot and signal files (approved changes only)
- `reports/cluster-YYYY-MM-DD.md` — summary of findings and changes made

## Notes

- Ideal to run when the vault has grown significantly or before a brief cycle
- Merge candidates are flagged here but executed by `/audit`
- Never modify files before confirmation
