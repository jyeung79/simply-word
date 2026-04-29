# Repository Guidelines

## Project Structure & Module Organization

This is an Expo Router React Native app. Routes live in `src/app`; `_layout.tsx` owns root providers and the tab shell, while `index.tsx`, `explore.tsx`, and `read.tsx` define screens. Shared UI belongs in `src/components`, with primitives in `src/components/ui`. Hooks are in `src/hooks`, including Zustand stores under `src/hooks/store`. Constants, themes, and translation data live in `src/constants`. Static assets are in `assets`, including app icons and tab images under `assets/images`.

Use the TypeScript path aliases from `tsconfig.json`: `@/*` maps to `src/*`, and `@/assets/*` maps to `assets/*`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run start`: start the Expo development server.
- `npm run ios`: start Expo and open the iOS simulator target.
- `npm run android`: start Expo and open the Android target.
- `npm run web`: run the web target.
- `npm run lint`: run Expo ESLint checks.

There is no production build script yet; use the Expo/EAS workflow appropriate to the target when release automation is added.

## Coding Style & Naming Conventions

Write TypeScript and TSX with strict mode enabled. Follow the existing Prettier style: two-space indentation, double quotes, semicolons, and trailing commas where formatted. Prefer function components, hooks with `use` prefixes, and the current lowercase kebab-case filenames such as `app-tabs.tsx` and `themed-view.tsx`.

Keep imports using `@/` aliases for internal modules. Keep route files in `src/app` named after their URL segment.

## Testing Guidelines

No test framework or test script is currently configured. For logic changes, add tests beside the module or in a clear `__tests__` directory, and add the matching npm script. Until then, validate with `npm run lint` and the affected Expo target.

## Commit & Pull Request Guidelines

Recent commits use concise imperative subjects, for example `Add tap handling to show header and footer`. Keep subjects specific and under roughly 72 characters when possible.

Pull requests should include a short description, testing notes, linked issues when applicable, and screenshots or recordings for visible UI changes. Mention platform coverage when behavior differs across iOS, Android, or web.

## Agent-Specific Instructions

Do not revert unrelated local changes. Keep edits scoped, run `npm run lint` after code changes when feasible, and update this guide when repository commands or structure change.
