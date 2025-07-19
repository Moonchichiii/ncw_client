# Nordic Code Works

A high-performance React portfolio built with modern best practices in performance, accessibility, and privacy compliance.

----------

## 📋 Table of Contents

1. About
2. Features
3. Technology Stack
4. Installation & Quick Start
5. Project Structure
6. Testing & Metrics
   - Lighthouse Scores
   - Core Web Vitals
7. Performance Optimizations
8. Accessibility Features
9. Cookie Consent System
10. Monitoring & Analytics
11. Development Guidelines
12. Browser Support
13. License

----------

## 📝 About

Nordic Code Works is a production-grade React portfolio designed for the modern web. It emphasizes:

- **Performance:** Sub-500ms load times with hardware-accelerated animations.
- **Accessibility:** WCAG AAA compliance and comprehensive screen-reader support.
- **Privacy:** GDPR-ready cookie consent and transparent data handling.
- **Design:** A fluid, semantic design system with dark/light mode.

----------

## ✨ Features

### 🎯 Performance First

- Sub-500ms initial load via code splitting & lazy loading
- Hardware-accelerated animations with `will-change` and CSS transforms
- Zero layout shifts with optimized font loading & image handling

### ♿ Accessibility Excellence

- WCAG AAA compliant markup, ARIA roles, and live regions
- Full keyboard navigation with focus management and skip links
- Respect for reduced-motion preferences and high-contrast modes

### 🍪 Privacy & Compliance

- GDPR-ready cookie banner with category-based consent
- Persistent, versioned preference storage
- Clear, user-centric privacy controls accessible on every page

### 🎨 Modern Design System

- Semantic design tokens with automatic color-scheme switching
- Fluid typography using CSS `clamp()` for responsive scaling
- Glassmorphism effects with backdrop filters and gradients
- Subtle micro-interactions for an engaging user experience

----------

## 🛠 Technology Stack

- **Framework:** React 19 + TypeScript 5.8
- **Build:** Vite 6.3 with optimized chunking
- **Styling:** Tailwind CSS 4.1
- **Icons:** Lucide React
- **Fonts:** Inter (body) & Archivo Black (headings) with `font-display: swap`
- **Error Handling:** React Error Boundary

----------

## 🚀 Installation & Quick Start

```sh
# Clone repository
git clone https://github.com/your-username/nordic-code-works.git
cd nordic-code-works

# Install dependencies
pnpm install

# Launch dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting & type checks
pnpm lint && pnpm type-check
```

----------

## 📁 Project Structure

```text
src/
├── components/           # Reusable UI components
│   ├── common/           # Buttons, feedback, etc.
│   ├── layout/           # Navbar, Layout wrapper, overlays
│   └── cookies/          # Cookie consent UI
├── hooks/                # Custom React hooks
├── pages/                # route-based page components
├── assets/               # Optimized images & icons
└── utils/                # Helpers & constants
```

----------

## 🧪 Testing & Metrics

### Lighthouse Scores

| Category       | Score         |
| -------------- | ------------ |
| Performance    | 100/100 ⚡    |
| Accessibility  | 100/100 ♿    |
| Best Practices | 100/100 ✅   |
| SEO            | 100/100 🔍   |

### Core Web Vitals

- **First Contentful Paint (FCP):** 0.4s
- **Largest Contentful Paint (LCP):** 0.5s
- **Total Blocking Time (TBT):** 0ms
- **Cumulative Layout Shift (CLS):** 0.003

Automated Lighthouse CI is configured to run on every pull request to prevent regressions.

----------

## 🚅 Performance Optimizations

### Code Splitting & Loading

- Route-based `React.lazy()` & `Suspense`
- Vendor chunk separation for dependencies
- Prefetch & preload strategies for critical assets

### Rendering Performance

- `contain: layout style paint` for CSS containment
- 3D transforms & `will-change` for GPU acceleration
- `React.memo`, `useCallback`, and selective updates

### Asset Optimization

- Responsive WebP images
- Inlined critical CSS
- Tree-shaking & dead-code elimination

----------

## ♿ Accessibility Features

### Screen Reader Support

- ARIA live regions for dynamic updates
- Semantic headings & landmark roles
- Descriptive alt text and `aria-label`s

### Keyboard Navigation

- Logical tab order & focus trapping in modals
- Visible focus styles meeting contrast ratios
- Escape & arrow key handling for overlays

### User Preferences

- `prefers-reduced-motion` support
- High-contrast mode detection & override
- Manual theme switching with persisted settings

----------

## 🍪 Cookie Consent System

### Privacy Controls

- Granular categories: Necessary, Analytics, Marketing, Preferences
- Versioned consent storage with audit logs
- Accessible controls available site-wide

### Compliance

- Aligned with GDPR Article 7 (clear consent)
- Easy withdrawal & preference updates
- Detailed cookie policy documentation

----------

## 📊 Monitoring & Analytics

- Core Web Vitals tracking (FCP, LCP, CLS)
- Consent-based user interaction analytics
- Error boundary reporting via external service
- Performance budgets enforced in CI

----------

## 🔧 Development Guidelines

### Code Quality

- TypeScript strict mode & exhaustive checks
- ESLint + Prettier for code consistency
- `jsx-a11y` for accessibility linting

### Testing Strategy

- Lighthouse CI for performance gates
- Automated accessibility checks
- Cross-browser validation in CI workflows

----------

## 🌐 Browser Support

- Chrome (90+) | Firefox (88+) | Safari (14+) | Edge (90+)
- Progressive enhancement for legacy browsers
- No runtime polyfills; uses ES2020+ natively
- Responsive from 320px to 4K

----------

## 📜 License

Distributed under the MIT License. See LICENSE for details.
