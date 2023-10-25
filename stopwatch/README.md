# ⏱️ Stopwatch

An imitation of the iOS native Stopwatch app in React + TypeScript.

## Requirements

- Node.js 14+
- pnpm 8

## Running the app

```
pnpm install
pnpm build
pnpm preview
```

## Running tests

```bash
pnpm test
```

## Known issues

1. There can technically be multiple "best" or "worst" laps, if multiple laps have the same time (10ms precision)
2. No tests for "best" and "worst" laps logic
