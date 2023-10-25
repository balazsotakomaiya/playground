# ⏱️ Stopwatch

An imitation of the iOS native Stopwatch app in React + TypeScript.

| ![Analog](src%2Fscreenshots%2Fanalog.png) | ![Digital](src%2Fscreenshots%2Fdigital.png) |
|---------------------------|----------------------------|

## Features

- Analog and digital clock
- Start, stop, and reset
- Lap times
- Best and worst lap times
- Responsive design (mobile & touch first)

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
3. The stopwatch only works when the tab is in focus. This could be resolved by using a Web Worker
4. The analog clock of the stopwatch is still missing 1:1 design parity with Apple's Stopwatch app
