# Trend vault

An Obsidian vault template for capturing, organising and synthesising trend spots into trend reports, powered by Claude Code.

## What this is

A structured system for trendwatching that turns raw URLs and observations into a connected signal library and publishable reports. Built around Obsidian for organisation and Claude Code for intelligence.

## Requirements

- [Obsidian](https://obsidian.md)
- [Claude Code](https://claude.ai/code)
- Node.js (any recent version) for `docs/build.js`
- Obsidian community plugin: [Dataview](https://github.com/blacksmithgu/obsidian-dataview) — install via Settings → Community plugins → Browse
- Obsidian core plugin: Templates (built-in, enable in Settings → Core plugins)

## Setup

1. Clone this repo into a new local folder
2. Open the folder as a new Obsidian vault
3. Enable the Templates core plugin and point it at the `templates/` folder
4. Install the Dataview community plugin
5. Open `CLAUDE.md` and fill in the vault context section
6. Open Claude Code in the vault root directory

## Folder structure

```
trend-vault/
  .claude/
    commands/        ← Claude Code slash commands
  CLAUDE.md          ← Vault context and instructions for Claude
  dashboard.md       ← Live Dataview overview of the vault
  trendspots/        ← One .md file per trend spot
  signals/           ← One .md file per signal
  assets/            ← hero.png and extras per spot
  reports/           ← Claude-generated synthesis reports
  templates/         ← Note templates for Obsidian
  references/        ← Background documents, inventories, or briefing materials for the research context
  docs/              ← GitHub Pages publication (index.html + data.js + assets/)
    build.js         ← Node.js script to generate data.js from vault content
```

## Workflow

| Command                 | What it does                                                          |
| ----------------------- | --------------------------------------------------------------------- |
| `/vault-setup`          | Guided first-time context configuration                               |
| `/spot [url]`           | Captures a URL as a trend spot with hero image and signal suggestions |
| `/signal [description]` | Captures a manually observed signal                                   |
| `/cluster`              | Finds hidden connections across the entire vault                      |
| `/brief [format]`       | Generates a trend brief; add pptx, html or pdf to also render it      |
| `/audit`                | Vault hygiene - scans, proposes changes, executes on confirmation     |
| `/publish`              | Rebuilds the interactive viewer and opens it for local preview        |

## Using the template

1. Clone the repo and open the folder as an Obsidian vault
2. Run `/vault-setup` in Claude Code - this guides you through context configuration and sets up the Templates plugin
3. Run `/spot [url]` for each trend spot URL — signals are suggested automatically
4. Review signal suggestions and confirm or edit; use `/signal` to create new ones
5. Run `/cluster` periodically to surface cross-vault patterns
6. Run `/brief` to generate the trend brief, or `/brief pptx` to generate and render in one step
7. Run `/audit` to keep the vault healthy between cycles

## Viewer

An interactive HTML viewer (`docs/index.html`) lets you visually explore signals and trendspots without Obsidian - graph view, card grids, filters, and full spot/signal detail panels. It works locally and doubles as the GitHub Pages site.

**Generating the viewer data:**

```bash
node docs/build.js
```

Run this once after any changes to `trendspots/` or `signals/`. It writes `docs/data.js`. Open `docs/index.html` in any browser — no server needed.

**Watching for changes while you work:**

```bash
node --watch build.js
```

Re-runs automatically whenever a vault file changes. Keep it running in a terminal tab alongside Obsidian.

**Publishing to GitHub Pages:**

Push the `docs/` folder to your repository and enable GitHub Pages from the `docs/` folder in your repo settings. The viewer will be publicly accessible at your GitHub Pages URL.

**Sharing locally:**

Zip the `docs/` folder. Recipients open `docs/index.html` locally — no install required (an internet connection is needed to load the D3 and marked libraries from CDN on first open).

## License

MIT
