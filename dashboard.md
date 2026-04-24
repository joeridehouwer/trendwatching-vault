# Trend dashboard

## Coverage by signal (sorted by frequency)

```dataview
TABLE length(rows) AS "spot count", rows.maturity AS "maturity"
FROM "trendspots"
FLATTEN signals AS signal
GROUP BY signal
SORT length(rows) DESC
```

## All spots (newest first)

```dataview
TABLE url, category, signals, maturity, relevance
FROM "trendspots"
SORT date_spotted DESC
```

## Gaps — spots with no signals tagged

```dataview
LIST title
FROM "trendspots"
WHERE !signals OR length(signals) = 0
```

## Maturity spread

```dataview
TABLE length(rows) AS "count"
FROM "trendspots"
GROUP BY maturity
```

## Technology coverage (sorted by frequency)

```dataview
TABLE length(rows) AS "spot count", rows.file.link AS "spots"
FROM "trendspots"
FLATTEN technology AS tech
WHERE tech AND tech != "[]"
GROUP BY tech
SORT length(rows) DESC
```

## Spots by technology (flat list)

```dataview
TABLE technology, category, maturity, relevance
FROM "trendspots"
WHERE technology AND length(technology) > 0
SORT technology ASC, relevance DESC
```

## Spots with no technology tagged

```dataview
LIST title
FROM "trendspots"
WHERE !technology OR technology = "[]" OR length(technology) = 0
```
