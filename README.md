# Simply Word Bible Reading App 🕊️

A bible reading app focused on deep focus, immersion, and a distraction-free experience. The goal is to provide legible fonts, generous whitespacing, and natural typography so passages are easy to read and easy to move through. It's especially designed for people who generally struggle to read the bible — including those with ADHD or dyslexia.

<img src="./assets/logo/simply-word-logo.png" alt="Simply Word Logo" width="256" height="256" />

This repository is the monorepo for **Simply Word**, built with React Native and Expo.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- iOS Simulator (Xcode) or Android Emulator (Android Studio), or a physical device with [Expo Go](https://expo.dev/go)

### Installation

```bash
npm install
```

### Running the app

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Tech Stack

- **[React Native](https://reactnative.dev/)** — cross-platform mobile framework
- **[Expo](https://expo.dev/)** (SDK 55) — tooling and runtime for React Native
- **[Expo Router](https://docs.expo.dev/router/introduction/)** — file-based routing
- **[TypeScript](https://www.typescriptlang.org/)** — typed JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** + **[Uniwind](https://github.com/uniwind/uniwind)** — utility-first styling for React Native
- **[HeroUI Native](https://heroui.com/)** — UI component library
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** & **[Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** — animations and gestures
- **[React Native Skia](https://shopify.github.io/react-native-skia/)** — 2D graphics rendering
- **[Zustand](https://github.com/pmndrs/zustand)** — state management
- **[TanStack Query](https://tanstack.com/query)** — server state and data fetching
- **[Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)** — local database for bible content
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** — linting and formatting

## Project Structure

```
ijn-app/
├── app/              # Expo Router routes and screens
├── src/              # Components, hooks, and utilities
├── assets/           # Fonts, images, and static assets
├── scripts/          # Helper scripts
└── package.json
```

## License

Copyright (C) 2026 Jeffery Yeung

This software is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).
