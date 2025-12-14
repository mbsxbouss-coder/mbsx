import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntroSidebar from './components/IntroSidebar'
import FloatingNav from './components/FloatingNav'
import FloatingActions from './components/FloatingActions'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import NotificationPanel from './components/NotificationPanel'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DataJournalismPage from './pages/DataJournalismPage'
import OurServicesPage from './pages/OurServicesPage'
import KnowledgeCenterPage from './pages/KnowledgeCenterPage'
import PublicationsPage from './pages/PublicationsPage'
import AdvertisementsPage from './pages/AdvertisementsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificationProvider, useNotifications } from './contexts/NotificationContext'
import { getTranslation } from './i18n'

// Theme Context
const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// Language Context
const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

// Inner App component that uses contexts
function AppContent() {
  const [showIntro, setShowIntro] = useState(() => !localStorage.getItem('mbsx-visited'))
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { language } = useLanguage()
  const { unreadCount } = useNotifications()

  const handleEnterSite = () => {
    localStorage.setItem('mbsx-visited', 'true')
    setShowIntro(false)
  }

  // Check if current path is admin
  const isAdminRoute = window.location.pathname.startsWith('/admin')

  return (
    <div className="app">
      {showIntro && (
        <IntroSidebar
          onEnter={handleEnterSite}
          onLanguageChange={() => {}}
        />
      )}

      {!showIntro && (
        <>
          {!isAdminRoute && (
            <>
              <FloatingNav />
              <FloatingActions
                onSearchClick={() => setSearchOpen(true)}
                onNotificationClick={() => setNotificationsOpen(true)}
                unreadCount={unreadCount}
              />
            </>
          )}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/data-journalism" element={<DataJournalismPage />} />
            <Route path="/our-services" element={<OurServicesPage />} />
            <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/advertisements" element={<AdvertisementsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

          {!isAdminRoute && <Footer />}

          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
          />

          <NotificationPanel
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        </>
      )}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('mbsx-theme') || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem('mbsx-language') || 'en')

  useEffect(() => {
    // Set initial document attributes
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('mbsx-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)
    localStorage.setItem('mbsx-language', language)
  }, [language])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const t = (key) => getTranslation(language, key)

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
          <AuthProvider>
            <NotificationProvider language={language}>
              <AppContent />
            </NotificationProvider>
          </AuthProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </Router>
  )
}

export default App
