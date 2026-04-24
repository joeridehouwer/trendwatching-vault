# Trend vault — context for Claude

This is an Obsidian vault used to capture, organise and synthesise trend spots into trend reports.

## Vault context

<!-- EDIT THIS SECTION when starting a new research cycle -->

**Topic:** [Describe the research topic or question this vault is tracking]

**Geographic focus:** [e.g. Global, EU, US, a specific region]

**Primary audience:** [e.g. internal research team, sector partners, client name]

**Lens:** [Any specific angle to apply when capturing and synthesising — e.g. a technology focus, sector perspective, or methodological constraint]

**Report cadence:** [e.g. monthly, ad hoc, end of project]

<!-- END EDITABLE SECTION -->



## Folder structure

| Folder | Purpose |
|---|---|
| `trendspots/` | One .md file per trend spot. Each file has YAML front matter and a short body. |
| `signals/` | One .md file per signal tag. Signals are the underlying forces that connect multiple trend spots. |
| `reports/` | Claude-generated synthesis outputs. One file per report cycle. |
| `templates/` | Note templates. Use `trendspot-template.md` for new spots, `signal-template.md` for new signals. |
| `dashboard.md` | Dataview queries giving a live overview of coverage, gaps and maturity spread. |

## YAML front matter — trendspots

| Field | Type | Notes |
|---|---|---|
| `title` | string | Plain title of the trend spot |
| `url` | string | Source URL |
| `date_spotted` | YYYY-MM-DD | Date added to vault |
| `source_type` | enum | article, video, product, event, research |
| `category` | string | Broad domain e.g. Health, Retail, Work, Finance |
| `signals` | list of wikilinks | Links to notes in `signals/` e.g. `[[signals/ai-augmentation]]` |
| `technology` | list of strings | Primary distinctive technology types involved. Use agreed taxonomy values only (see below). Leave empty if no distinctive hardware or AI subtype applies. |
| `geography` | list | e.g. EU, US, Global |
| `audience` | list | e.g. Gen Z, B2B, Mass market |
| `maturity` | enum | emerging, growing, mainstream |
| `relevance` | 1–5 | Subjective strength of the spot |
| `summary` | string | 2–3 sentence plain description |

## Technology taxonomy

Tag only what is **primary and distinctive** to the spot. A spot can carry multiple values. Do not tag "AI" generically — use the specific AI subtype. Leave the field empty if the technology is a generic web/app with no distinctive hardware or AI subtype.

**AI subtypes**

| Value | When to use |
|---|---|
| `AI: Audio Generation` | Synthesised speech, voice, soundscapes, ambient audio |
| `AI: Video Generation` | AI-generated moving image footage |
| `AI: Image Generation` | AI-generated still images |
| `AI: Music Composition` | AI composing or extending musical works within a tradition |
| `AI: Motion Generation` | Choreography synthesis, movement generation |
| `AI: 3D Generation` | Depth maps, volumetric reconstruction, 3D model generation |
| `AI: Transcription` | Speech-to-text, dialect ASR, oral history processing |
| `AI: Translation` | Language translation models, multilingual output |
| `AI: Computer Vision` | Image/video understanding, object recognition, visual description |
| `AI: Text Generation` | LLM-produced narrative, biography, guide text, interpretation |
| `AI: Agent` | Autonomous AI conducting fieldwork, research, or multi-step tasks |
| `AI: Simulation` | Rule inference, game reconstruction, predictive modelling |

**Hardware and platform types**

| Value | When to use |
|---|---|
| `Drone` | UAV — agricultural, documentary, or performative |
| `AR Glasses` | Wearable augmented reality hardware (Snap Spectacles, Halo, etc.) — not phone-based AR |
| `QR Codes` | QR-triggered browser experiences, interactive print media, no-app AR layers activated via QR scan |
| `Holographic Display` | Volumetric or lightfield display technology |
| `VR / XR` | Headset-based immersive environments |
| `Humanoid Robot` | Embodied robot with social or visitor-facing interface |
| `3D Scanner` | Photogrammetry, LiDAR, structured-light documentation |
| `Digital Twin` | Real-time structural or environmental computational model |
| `Game Engine` | Unity, Unreal, Minecraft or similar as delivery layer |
| `GPS / Location` | Position-triggered audio, spatial navigation, geofencing |
| `Screenless Device` | Physical objects as AI interface (telephone, radio, tactile device) |
| `Physical Installation` | Built environment, set design, or spatial experience |
| `Wearable Camera` | Body-worn or head-mounted camera (GoPro, phone rig, glasses cam) used for first-person recording, lifelogging, or data capture |

## Assets

Each trend spot has a corresponding folder in `assets/` named after the spot file:

```
assets/
  spot-001/
    hero.png       ← always present, captured from og:image
    screenshot.png ← optional extras
  spot-002/
    hero.png
```

When capturing a trend spot, always attempt to download the `og:image` from the source page and save it as `hero.png` in the matching assets folder. If no og:image exists, take a screenshot of the page hero or most relevant visual instead.

## Presentation output

Briefs can be rendered as PowerPoint (.pptx), a custom HTML presentation, or PDF. Each format can be generated by Claude using the `reports/` markdown output plus the images in `assets/`. When building a presentation, pair each macro trend with the hero images from its 3 evidencing spots.

## Signals

Signals are the connection layer. A signal represents an underlying cultural, technological or economic force. Multiple trend spots sharing a signal form the evidence base for a macro trend.

When you encounter a new concept in the trendspots that doesn't match an existing signal, create a new note in `signals/` using the signal template.

## How to generate a brief

1. Read all .md files in `trendspots/`
2. Extract `signals`, `maturity`, `summary`, `category` from each
3. Count signal frequency — signals appearing in 3+ spots indicate a macro trend
4. Group spots into 3–5 macro trends, named as verb phrases
5. For each macro trend write: a 2-sentence headline, the underlying tension, 3 evidencing spots, and an implication
6. Flag spots that don't fit any macro trend as weak signals to watch
7. Output as structured markdown to `reports/` named `YYYY-MM-brief.md`

## Interactive viewer

The vault has a standalone HTML viewer for sharing with people who don't have Obsidian.

| File | Purpose |
|---|---|
| `docs/build.js` | Node.js script (no dependencies). Parses all `.md` frontmatter and bodies, resolves hero image paths, writes `docs/data.js`. Run with `node docs/build.js` after vault changes. |
| `docs/data.js` | Generated file — do not edit. Exposes `window.VAULT_DATA = { spots, signals }` for the viewer. |
| `docs/index.html` | Self-contained viewer. Works locally (`file://`) and as a GitHub Pages site. Uses D3.js and marked.js from CDN. |

**Viewer features:**
- Three views toggled in the header: **Graph** (D3 force-directed, signals as large nodes / spots as small nodes), **Trendspots** (card grid with hero images), **Signals** (card grid with full description and spot thumbnails)
- Filter bar with dropdown popovers: Maturity, Category, Geography, Signal
- Search (spots: title + summary; signals: name + description)
- Slide-in detail panel for both spots and signals

**When iterating on the viewer**, edit `docs/index.html` directly. The script block at the bottom of the file contains all application logic — no build step needed for the viewer itself, only for `docs/data.js`. After any vault content changes, re-run `node docs/build.js`.

## Conventions

- Signal wikilinks always use the format `[[signals/signal-name]]` — lowercase, hyphenated
- Spot files are named `spot-001.md`, `spot-002.md` etc.
- Never edit files in `templates/`
- The `dashboard.md` file is query-only — do not add manual content to it
