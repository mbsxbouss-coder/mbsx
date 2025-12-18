# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MBSx Platform - A multilingual (English, French, Arabic with RTL support) React-based data journalism institution website built with Vite.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

### Core Structure
- **Entry**: `src/main.jsx` → `src/App.jsx`
- **Pages**: `src/pages/` - Route-level components (HomePage, AboutPage, DataJournalismPage, etc.)
- **Components**: `src/components/` - Reusable UI components
- **Styling**: Component-specific CSS files alongside components, global styles in `src/index.css`

### State Management
App.jsx provides two React Contexts:
- `ThemeContext` - Light/dark theme toggle (persisted to localStorage as `mbsx-theme`)
- `LanguageContext` - Trilingual support with `t()` translation function (persisted as `mbsx-language`)

### Translations
All UI text is defined in the `translations` object in App.jsx with keys for `en`, `fr`, and `ar`. Access translations via the `t(key)` function from `useLanguage()` hook.

### Routing
React Router v7 with routes:
- `/` - HomePage
- `/about` - AboutPage
- `/data-journalism` - DataJournalismPage
- `/our-services` - OurServicesPage
- `/knowledge-center` - KnowledgeCenterPage
- `/publications` - PublicationsPage
- `/advertisements` - AdvertisementsPage

### RTL Support
Arabic language automatically sets `dir="rtl"` on document. RTL-specific styles use `[dir="rtl"]` selector. Arabic uses `Noto Kufi Arabic` font.

### Theming
CSS variables in `src/index.css` define design tokens. Dark theme activated via `[data-theme="dark"]` attribute on `<html>`.

### Key Components
- `IntroSidebar` - Language selection splash screen (shown once, tracked via `mbsx-visited` localStorage)
- `FloatingNav` - Navigation bar
- `FloatingActions` - Search and notification triggers
- `SearchModal` / `NotificationPanel` - Overlay panels

### Animation
Uses `motion` (Framer Motion) library for animations.

## Design Guidelines
- Do not use icons in designs
- Do not use colored icons in UI
