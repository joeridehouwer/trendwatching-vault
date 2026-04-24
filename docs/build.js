#!/usr/bin/env node
// Parses trendspots/ and signals/ into docs/data.js for the viewer

const fs = require('fs');
const path = require('path');

const VAULT = path.join(__dirname, '..');
const DOCS = __dirname;

// --- minimal YAML frontmatter parser ---
function parseFrontmatter(src) {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: src };
  const raw = match[1];
  const body = src.slice(match[0].length).trim();
  const meta = {};

  const lines = raw.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // skip blank lines
    if (!line.trim()) { i++; continue; }
    // list item continuation
    const listItem = line.match(/^  - (.*)$/);
    if (listItem) { i++; continue; } // handled below
    // key: value
    const kv = line.match(/^(\w[\w_-]*)\s*:\s*(.*)/);
    if (!kv) { i++; continue; }
    const key = kv[1];
    let val = kv[2].trim();
    // check if next lines are list items
    if (val === '' || val === '|' || val === '>') {
      // collect list or block scalar
      const items = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t'))) {
        const li = lines[i].match(/^\s+- (.*)$/);
        if (li) {
          items.push(cleanValue(li[1]));
        }
        i++;
      }
      meta[key] = items.length > 0 ? items : null;
    } else {
      meta[key] = cleanValue(val);
      i++;
    }
  }
  return { meta, body };
}

function cleanValue(v) {
  // strip inline comments
  v = v.replace(/\s+#.*$/, '').trim();
  // strip surrounding quotes
  v = v.replace(/^["']|["']$/g, '').trim();
  return v;
}

function extractSignalId(wikilink) {
  // "[[signals/foo-bar]]" → "foo-bar"
  const m = wikilink.match(/\[\[signals\/([^\]]+)\]\]/);
  return m ? m[1] : null;
}

function heroPath(spotId) {
  const base = path.join(VAULT, 'assets', spotId);
  if (!fs.existsSync(base)) return null;
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const p = path.join(base, `hero.${ext}`);
    if (fs.existsSync(p)) {
      const destDir = path.join(DOCS, 'assets', spotId);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(p, path.join(destDir, `hero.${ext}`));
      return `assets/${spotId}/hero.${ext}`;
    }
  }
  return null;
}

// --- parse signals ---
const signalsDir = path.join(VAULT, 'signals');
const signals = {};
for (const f of fs.readdirSync(signalsDir)) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const src = fs.readFileSync(path.join(signalsDir, f), 'utf8');
  const { meta, body } = parseFrontmatter(src);
  const id = meta.signal || f.replace('.md', '');
  signals[id] = {
    id,
    description: meta.description || '',
    body: body.replace(/```dataview[\s\S]*?```/g, '').trim(),
  };
}

// --- parse trendspots ---
const spotsDir = path.join(VAULT, 'trendspots');
const spots = [];
for (const f of fs.readdirSync(spotsDir).sort()) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const src = fs.readFileSync(path.join(spotsDir, f), 'utf8');
  const { meta, body } = parseFrontmatter(src);
  const spotId = f.replace('.md', '');
  const signalIds = Array.isArray(meta.signals)
    ? meta.signals.map(extractSignalId).filter(Boolean)
    : [];
  spots.push({
    id: spotId,
    title: meta.title || spotId,
    url: meta.url || '',
    date_spotted: meta.date_spotted || '',
    source_type: meta.source_type || '',
    category: meta.category || '',
    signals: signalIds,
    technology: Array.isArray(meta.technology) ? meta.technology : (meta.technology ? [meta.technology] : []),
    geography: Array.isArray(meta.geography) ? meta.geography : (meta.geography ? [meta.geography] : []),
    audience: Array.isArray(meta.audience) ? meta.audience : (meta.audience ? [meta.audience] : []),
    maturity: meta.maturity || '',
    relevance: parseInt(meta.relevance, 10) || 0,
    summary: meta.summary || '',
    hero: heroPath(spotId),
    body: body.replace(/!\[\[assets\/[^\]]+\]\]/g, '').trim(),
  });
}

// ensure every signal referenced by spots exists in signals map
for (const spot of spots) {
  for (const sid of spot.signals) {
    if (!signals[sid]) {
      signals[sid] = { id: sid, description: '', body: '' };
    }
  }
}

const out = { spots, signals: Object.values(signals) };
const json = JSON.stringify(out);
fs.writeFileSync(path.join(DOCS, 'data.js'), `window.VAULT_DATA = ${json};`);
console.log(`✓ ${spots.length} spots, ${Object.keys(signals).length} signals → docs/data.js`);
