# Chrome Extension Boilerplate

Modern MV3 extension boilerplate with React, TypeScript, Tailwind, shadcn-style components, and a typed RPC messaging system.

## Features

- **Typed RPC messaging**: zod-validated request/response, timeouts, sender validation
- **React 18 + TypeScript**: strict mode with enhanced tsconfig rules
- **Tailwind CSS**: configured via `@tailwindcss/postcss`
- **shadcn-style components**: Button, Card, Separator, Select, DropdownMenu, Dialog, Tooltip, Toast, Command, Switch (Radix-based)
- **Theme**: system/light/dark with `ThemeProvider` and Tailwind `dark` class
- **Content UI isolation**: Shadow DOM mount for content script UI to avoid CSS collisions
- **MV3 service worker**: background script using Webpack 5
- **ESLint & Prettier**: linting and formatting
- **Optimized build**: prod minification and `DefinePlugin` for React optimizations

## Getting Started

### Prerequisites

- Node.js LTS

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Watches and rebuilds `dist/` on changes.

### Type check & Lint

```bash
npm run type-check
npm run lint
npm run lint:fix
```

### Build

```bash
npm run build
```

Load `dist/` in `chrome://extensions` with Developer Mode enabled.

## Project Structure

```
chrome-extension-boilerplate/
├── public/                    # Static assets and manifest
│   ├── icons/                 # Extension icons
│   ├── styles/                # Optional content CSS referenced by manifest
│   └── manifest.json          # MV3 manifest (permissions, matches, etc.)
├── src/
│   ├── app/
│   │   └── App.tsx            # Popup UI (React)
│   ├── components/
│   │   ├── theme/ThemeProvider.tsx
│   │   └── ui/                # shadcn-style wrappers (Radix-based)
│   ├── features/              # Feature-level components (lazy-loaded demos)
│   ├── lib/
│   │   ├── api.ts             # Client API calling RPC methods
│   │   ├── rpc.ts             # Typed RPC transport (background listener + client)
│   │   └── storage.ts         # Promise-based chrome.storage helpers
│   ├── scripts/
│   │   ├── background/background.ts
│   │   └── content/content.ts
│   ├── styles/styles.css      # Popup styles (Tailwind, size variables)
│   ├── popup.html             # Popup HTML template
│   └── popup.tsx              # Popup entry (mounts React)
├── dist/                      # Build output
├── postcss.config.js          # PostCSS with @tailwindcss/postcss
├── tailwind.config.js         # Tailwind config (darkMode: 'class')
├── tsconfig.json              # TS config with strict and extra safety flags
├── webpack.config.js          # Common Webpack config
├── webpack.dev.js             # Dev Webpack config
├── webpack.prod.js            # Prod Webpack config
└── package.json
```

## Messaging (RPC)

Background registers typed methods, UI invokes them via the client API. Schemas are validated and requests timeout if no response.

```ts
// src/scripts/background/background.ts
import { RPC } from '@/lib/rpc'

const rpc = new RPC()

rpc.register('getDadJoke', async () => {
  const res = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'text/plain' } })
  if (!res.ok) throw new Error(`http ${res.status}`)
  return await res.text()
})
```

```ts
// src/lib/api.ts
import { RPC } from '@/lib/rpc'

const rpc = new RPC()

export function getDadJoke(): Promise<string> {
  return rpc.invoke('getDadJoke')
}
```

## Theme & UI

- Wrap popup UI with `ThemeProvider` (`src/components/theme/ThemeProvider.tsx`).
- Tailwind dark mode via the `dark` class; system/light/dark stored in `localStorage`.
- Components are shadcn-style wrappers over Radix primitives for consistent theming.

```tsx
// src/app/App.tsx (excerpt)
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      {/* your UI */}
    </ThemeProvider>
  )
}
```

## Content Script UI (Shadow DOM)

The content script mounts a minimal UI into a Shadow DOM root to avoid page style collisions. See `src/scripts/content/content.ts`.

## Popup Size

Popup dimensions are controlled via CSS variables in `src/styles/styles.css`:

```css
:root { --popup-width: 600px; --popup-height: 400px }
```

## Manifest & Permissions

- `public/manifest.json` uses MV3 service worker.
- `content_scripts.matches` should be narrowed to the domains you need.
- `host_permissions` declares outbound hosts (e.g., `https://icanhazdadjoke.com/`).
- CSP is restricted to `'self'` with explicit `connect-src` entries.

## Scripts

- `npm run dev` – watch mode build
- `npm run build` – production build
- `npm run type-check` – TypeScript check
- `npm run lint` / `npm run lint:fix` – linting

## Notes

- The demo uses a public joke API. Replace with your own business logic.
- Heavy UI demos (dialog/command) are lazy-loaded to keep initial popup cost lower.

## License

ISC
