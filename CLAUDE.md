# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Expo dev server (scan QR or press i/a/w)
npm run ios        # Open in iOS simulator
npm run android    # Open in Android emulator
npm run web        # Open in browser
npm run lint       # Run ESLint via expo lint
```

No test suite is configured. The README points to the Expo unit testing guide if tests need to be added.

## Architecture

This is an **Expo 55 / React Native** app using **file-based routing** via `expo-router`. All routes live under `src/app/`; the `@/` alias resolves to `src/`.

### Routing & Layout

`src/app/_layout.tsx` is the root — it wraps everything in `ThemeProvider` → `SafeAreaProvider` → `AnimatedSplashOverlay` + `AppTabs`. The three tabs are `index` (Home), `explore` (Explore), and `read` (Bible reader).

Navigation uses platform-split components:
- **Native** (`app-tabs.tsx`): `NativeTabs` from `expo-router/unstable-native-tabs`
- **Web** (`app-tabs.web.tsx`): Custom tab list built on `expo-router/ui`

Expo resolves `.web.tsx` files automatically for web builds. The same pattern applies to `animated-icon.web.tsx` and `use-color-scheme.web.ts`.

### Styling — Two Systems in Use

The codebase uses **both** approaches; choose based on context:

1. **`StyleSheet.create()` + `useTheme()`** — for components that need runtime theme colors. `useTheme()` returns the current `Colors.light` or `Colors.dark` object from `src/constants/theme.ts`.

2. **Tailwind / Uniwind `className`** — for layout and static styles. `src/global.css` is the CSS entry point (imported in `_layout.tsx` via `theme.ts`). Custom CSS variables for fonts (`--font-display`, `--font-serif`, etc.) and reading color themes (sepia, gentle-dark, etc.) are defined there.

`src/constants/theme.ts` exports `Colors`, `Fonts`, `Spacing` (named scale: `half`→`six`), `BottomTabInset`, and `MaxContentWidth` (800px). Use `Spacing` constants for layout rather than raw numbers.

### State Management

Zustand is used for global UI state. The only store currently is `src/hooks/store/useTabbar.ts`, which tracks `isMinized` (sic) — set to `true` when the user scrolls down in the Read screen, hiding the tab bar.

### Bible Data

`src/constants/translations/esv_bible.json` contains the full ESV Bible, structured as:

```ts
{ [BookName]: { [chapter: string]: { [verse: string]: string } } }
```

`read.tsx` currently hardcodes Genesis 1. TanStack React Query is installed but not yet wired up.

### Fonts

Inter and Source Serif 4 are bundled under `assets/fonts/` and registered via the `expo-font` plugin in `app.json`. Use `font-display` (Inter/system) and `font-serif` (Source Serif 4) Tailwind utilities, or `Fonts.sans`/`Fonts.serif` from `theme.ts` in StyleSheet contexts.
