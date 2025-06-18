# Nordic Code Works Client

A fast, accessible React app built with TypeScript and Vite. This project is the portfolio for Nordic Code Works, focused on smooth user experience, strong accessibility, and GDPR-compliant cookie consent.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Accessibility & Performance](#accessibility--performance)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Ultra-Responsive Interactions**  
  Sub-80ms input delay, thanks to CSS containment, hardware-accelerated transitions, and smart transition management.

- **GDPR-Ready Cookie Consent**  
  Users can control cookie preferences (Necessary, Preferences, Analytics, Marketing) with persistent, accessible settings.

- **Top-Tier Accessibility**  
  Meets WCAG AAA: full keyboard navigation, live regions, skip links, focus indicators, and reduced-motion support.

- **Smooth Animations**  
  Menus, banners, and theme toggles use `translate3d`, `will-change`, and minimal JS for buttery transitions.

- **Theme Switcher**  
  Light/dark mode with system preference detection, smooth transitions, and local storage.

- **Code Splitting & Lazy Loading**  
  Route-based code splitting, Suspense fallbacks, and vendor chunking for quick loads.

- **Tailwind CSS**  
  Semantic colors, fluid typography, and responsive utilities for a consistent, mobile-first UI.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Install dependencies

```sh
pnpm install
```

### Start the dev server

```sh
pnpm run dev
```

### Build for production

```sh
pnpm run build
```

### Preview the production build

```sh
pnpm run preview
```

### Lint the code

```sh
pnpm run lint
```

---

## Folder Structure

```text
ncw_client/
├── public/                # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/            # Images, icons, SVGs
│   ├── components/        # UI components by feature
│   │   ├── common/        # Buttons, loaders, error boundaries
│   │   ├── layout/        # Navbar, overlays, layout wrappers
│   │   └── cookies/       # Cookie consent UI
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # App sections: Hero, Work, About, Contact
│   ├── utils/             # Helpers (analytics, tracking, etc.)
│   ├── styles/            # Global CSS and Tailwind config
│   ├── App.tsx            # Root component
│   └── main.tsx           # Vite entrypoint
└── README.md
```

---

## Accessibility & Performance

- **Screen Reader Friendly**  
  Uses `aria-*` and live regions to announce UI changes (like menu open/close).

- **Respects Reduced Motion**  
  Detects `prefers-reduced-motion` and disables non-essential animations.

- **CSS Containment**  
  Uses `contain: layout style paint` for better rendering performance.

- **Focus Management**  
  Focus is trapped in modals/overlays, and skip links are provided for keyboard users.

---

## Testing

_Testing docs coming soon! This section will cover our approach, tools, and coverage._

---

## Contributing

Contributions are welcome! Open an issue or pull request for improvements or bug fixes. For big changes, please start a discussion first.

---

## License

Licensed under the [MIT License](LICENSE).

---

> Built with React, TypeScript, Vite, and Tailwind CSS.
