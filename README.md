# MBSx Platform

A modern, multilingual data journalism institution website built with React and Vite. Features comprehensive support for English, French, and Arabic with full RTL (Right-to-Left) support.

**Created by Azeddine Zellag**

## Features

- **Trilingual Support**: Seamlessly switch between English, French, and Arabic
- **RTL Support**: Full right-to-left layout support for Arabic language
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Modern Stack**: Built with React 18, Vite, and React Router v7
- **Smooth Animations**: Enhanced UX with Framer Motion animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd mbs

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── main.jsx              # Application entry point
├── App.jsx               # Root component with contexts and routing
├── index.css             # Global styles and CSS variables
├── pages/                # Route-level components
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── DataJournalismPage.jsx
│   ├── OurServicesPage.jsx
│   ├── KnowledgeCenterPage.jsx
│   ├── PublicationsPage.jsx
│   └── AdvertisementsPage.jsx
└── components/           # Reusable UI components
    ├── IntroSidebar.jsx
    ├── FloatingNav.jsx
    ├── FloatingActions.jsx
    ├── SearchModal.jsx
    └── NotificationPanel.jsx
```

## Architecture

### State Management

The application uses React Context API for global state:

- **ThemeContext**: Manages light/dark theme preference (persisted to localStorage)
- **LanguageContext**: Manages current language selection and provides translation function

### Translations

All UI text is centralized in the `translations` object in `App.jsx`. Access translations using the `t(key)` function from the `useLanguage()` hook:

```jsx
const { t } = useLanguage();
return <h1>{t('welcome')}</h1>;
```

### Routing

The application uses React Router v7 with the following routes:

- `/` - Home page
- `/about` - About the institution
- `/data-journalism` - Data journalism initiatives
- `/our-services` - Services offered
- `/knowledge-center` - Educational resources
- `/publications` - Published works
- `/advertisements` - Advertisement requests

### RTL Support

Arabic language automatically enables RTL layout. RTL-specific styles use the `[dir="rtl"]` CSS selector. The application uses `Noto Kufi Arabic` font for Arabic text.

### Theming

Design tokens are defined as CSS variables in `src/index.css`. Dark theme is activated via the `[data-theme="dark"]` attribute on the `<html>` element.

### Key Components

- **IntroSidebar**: Language selection splash screen (shown once per user)
- **FloatingNav**: Main navigation bar
- **FloatingActions**: Quick access to search and notifications
- **SearchModal**: Full-screen search interface
- **NotificationPanel**: Notification center

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Framer Motion** - Animation library
- **CSS3** - Styling with CSS custom properties

## Design Guidelines

- Clean, minimal design without decorative icons
- Consistent use of typography and spacing
- Responsive layouts for all screen sizes
- Accessible color contrast ratios
- Smooth transitions and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to this project, please:

1. Follow the existing code style
2. Add translations for all three languages
3. Test RTL layout for Arabic language
4. Ensure responsive design works on mobile devices
5. Test both light and dark themes

## License

[Add your license information here]

## Contact

**Created by Azeddine Zellag**

---

Built with passion for data journalism and multilingual accessibility.
