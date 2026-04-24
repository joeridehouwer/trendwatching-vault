---
signal: ""
description: ""
---

## What is this signal?

## Trend spots carrying this signal

```dataview
LIST title
FROM "trendspots"
WHERE contains(signals, [[signals/{{title}}]])
```
