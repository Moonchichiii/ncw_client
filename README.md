# Nordic Code Works // Systems Engineering

A high-performance React portfolio built with industrial precision. Focused on zero-latency interactions, strict type safety, and absolute accessibility.

![Lighthouse Score 100/100/100/100](https://img.shields.io/badge/Lighthouse-100%20%7C%20100%20%7C%20100%20%7C%20100-success?style=for-the-badge) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge) ![Tailwind](https://img.shields.io/badge/Tailwind-v4.1-38bdf8?style=for-the-badge)

----------

## 📋 System Index

1. [Mission Protocol](#-mission-protocol)
2. [Technical Stack](#-technical-stack)
3. [The Gold Standard (Lighthouse 100)](#-the-gold-standard-lighthouse-100)
4. [Typography & Font Strategy](#-typography--font-strategy)
5. [Accessibility Engineering](#-accessibility-engineering)
6. [Privacy & Compliance](#-privacy--compliance)
7. [Installation](#-installation)
8. [Architecture](#-architecture)

----------

## 📝 Mission Protocol

**Nordic Code Works** is a production-grade deployment log designed for the modern web. It abandons traditional "creative" bloat in favor of raw engineering performance.

- **Industrial Design:** A strict, high-contrast UI inspired by technical manuals and terminal interfaces.
- **Zero Latency:** Sub-500ms initial load times via aggressive optimization.
- **Type Safety:** Strict TypeScript configuration with no `any` types allowed.
- **Privacy:** Native Netlify Forms integration with GDPR-compliant data handling.

----------

## 🛠 Technical Stack

- **Runtime:** React 19 + TypeScript 5.8
- **Build Engine:** Vite 6.3 (ESBuild)
- **Styling:** Tailwind CSS 4.1 (Native CSS Variables strategy)
- **State:** React Hooks + LocalStorage Persistence
- **Hosting:** Netlify (Edge Network)
- **Assets:** Cloudinary (On-demand optimization)

----------

## 🏆 The Gold Standard (Lighthouse 100)

This system is engineered to pass Core Web Vitals with zero margins for error. Every byte sent to the client is justified.

| Metric | Score | Detail |
| :--- | :--- | :--- |
| **Performance** | **100** | Zero render-blocking resources. CSS-contained layouts. |
| **Accessibility** | **100** | WCAG AAA contrast compliance. Semantic ARIA implementation. |
| **Best Practices** | **100** | Immutable caching policies. HTTPS enforcement. |
| **SEO** | **100** | Semantic HTML5 structure. Optimized meta taxonomy. |

### Optimization Strategy

1. **Zero Layout Shift (CLS 0):** By preloading fonts and defining strict dimensions for media, the UI never "jumps" during load.
2. **Tailwind v4 Architecture:** Utilization of the new `@theme` CSS directive reduces JavaScript runtime overhead by leveraging native browser CSS variables for theming.
3. **Route-Based Splitting:** Component lazy-loading ensures the main bundle remains under 50kb for the initial paint.

----------

## 🔠 Typography & Font Strategy

To achieve **0ms font latency**, we rejected external CDNs (Google Fonts/Adobe Fonts) in favor of a localized, self-hosted strategy.

### The Stack

- **Headings:** *Familjen Grotesk* (Bold/Medium) - A distinct Swedish grotesque.
- **Body:** *Switzer* (Regular/Medium) - Highly legible neo-grotesque.
- **Monospace:** *Space Grotesk* - Technical data display.

### The "Instant Load" Implementation

External fonts typically cause a "Flash of Unstyled Text" (FOUT) or a layout shift. We solved this by:

1. **Local Hosting:** WOFF2 files are stored in `/public` to eliminate DNS resolution time.
2. **Preload Tags:** High-priority fonts are preloaded in `<head>` so they are available before the CSS Object Model is constructed.
3. **Swap Policy:** `font-display: swap` ensures text is visible immediately, even on slow 3G connections.

```html
<!-- Example of the Zero-Latency Strategy -->
<link rel="preload" href="/FamiljenGrotesk-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

----------

## ♿ Accessibility Engineering

Accessibility is not an afterthought; it is a core system requirement.

- **Strict Contrast Ratios:** Both Light and Dark modes use calibrated colors (e.g., `#0f0f10` text on `#ffffff` bg) to exceed WCAG AAA standards.
- **Screen Reader Optimization:**
  - Icon-only buttons include explicit `aria-label` attributes.
  - Decorative elements (like status pulses) use `aria-hidden="true"`.
- **Reduced Motion:** The system respects OS-level `prefers-reduced-motion` settings, disabling animations for sensitive users automatically via CSS media queries.
- **Keyboard Navigation:** Full focus trapping in modals and logical tab indexing throughout the document.

----------

## 🍪 Privacy & Compliance

- **No Third-Party Trackers:** Analytics are self-hosted or anonymous.
- **Cookie Consent:** A custom-built, lightweight consent manager allows granular control (Necessary vs. Preferences).
- **Secure Forms:** Contact submissions are handled via Netlify's serverless backend, ensuring data is encrypted in transit and at rest, with spam protection provided by hidden honeypot fields rather than intrusive CAPTCHAs.

----------

## 🚀 Installation

```bash
# 1. Clone Repository
git clone https://github.com/Moonchichiii/ncw_client.git
cd ncw_client

# 2. Install Dependencies (PNPM recommended)
pnpm install

# 3. Initialize Dev Environment
pnpm dev

# 4. Compile Production Build
pnpm build
```

----------

## 🏗 Architecture

```text
src/
├── components/           
│   ├── common/           # Atomic UI elements (Buttons, Forms, Images)
│   ├── layout/           # Structural components (Navbar, Footer, Grid)
│   ├── cookies/          # GDPR Consent Logic
│   └── modals/           # Legal & System overlays
├── pages/                # Route definitions (Hero, About, Work, Contact)
├── hooks/                # Custom logic (useCookieConsent, useLegalModals)
└── assets/               # Static vectors
public/
├── FamiljenGrotesk...    # Self-hosted WOFF2 font files
└── Switzer...            # Self-hosted WOFF2 font files
```

----------

## 📜 License

**MIT License** // Open Source Engineering.
Copyright © 2025 Nordic Code Works.
