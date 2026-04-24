# /publish

Rebuild the interactive viewer with the latest vault content.

## Input

No argument required: `/publish`

## Steps

1. Run `node docs/build.js` to parse all spots and signals and write `docs/data.js`
2. Report the output: spot count, signal count, any errors
3. Open `docs/index.html` in the default browser for local preview

## Output

- `docs/data.js` — regenerated vault data
- `docs/assets/` — hero images copied from `assets/`
- Browser opens `docs/index.html` for preview

## Notes

- Run this after any capture session or vault changes to keep the viewer in sync
- To publish to GitHub Pages, commit and push the `docs/` folder after running this command
