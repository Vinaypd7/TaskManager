# TaskManager

TaskManager is a small React Native (Expo) TypeScript project that demonstrates task management screens, components, and unit tests.

**Prerequisites:**
- Node.js (recommended LTS)
- npm or yarn
- Expo CLI (optional, for running on devices/simulators)

**Install**

```powershell
npm i -f
```

**Available scripts**

- `start`: Run the app with Expo (`expo start`).
- `android`: Start Expo and open Android (`expo start --android`).
- `ios`: Start Expo and open iOS (`expo start --ios`).
- `web`: Start Expo for web (`expo start --web`).
- `storybook:web`: Run Storybook web dev server on port 6006.
- `test`: Run Jest tests.
- `test:watch`: Run Jest in watch mode.
- `test:coverage`: Run Jest with coverage.
- `test:snapshot`: Run only snapshot tests.
- `test:snapshot:update`: Update snapshot tests.
- `test:update-snapshots`: Update all snapshots.
- `test:ci`: CI-friendly Jest run with coverage and limited workers.
- `lint`: Run ESLint for `src/**/*.ts` and `src/**/*.tsx`.
- `build`: Run `expo build`.

Run an arbitrary script with `npm run <script>`.

**Project structure (partial)**

- `App.tsx` — app entry
- `src/screens` — screen components and tests
- `src/components` — shared components and snapshots
- `src/services` — network / data services
- `src/hooks` — custom hooks
- `__tests__` — unit tests and factories

**Testing**

```powershell
npm test
# update snapshots
npm run test:update-snapshots
```

**Code style & pre-commit**
- ESLint and Prettier are configured. `lint-staged` runs on staged files.
- Husky hooks are available if configured locally.

**Contributing**
- Open an issue or PR. Keep changes focused and add tests for new behaviors.

**License**
This repository does not include a license file. Add one if you plan to publish or share.
