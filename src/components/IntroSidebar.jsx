import React, { useState, useEffect } from 'react'
import { useLanguage } from '../App'
import './IntroSidebar.css'

const IntroSidebar = ({ onEnter, onLanguageChange }) => {
  const { language, t } = useLanguage()
  const [selectedLang, setSelectedLang] = useState(language)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang)
    onLanguageChange(lang)
  }

  const handleEnter = () => {
    setIsAnimating(true)
    setTimeout(onEnter, 600)
  }

  const isRTL = selectedLang === 'ar'

  return (
    <div className={`intro-overlay ${isAnimating ? 'animating' : ''}`}>
      <div className="intro-backdrop" />

      <aside
        className={`intro-sidebar ${isRTL ? 'rtl' : 'ltr'} ${isAnimating ? 'slide-out' : 'slide-in'}`}
      >
        <div className="intro-content">
          <div className="intro-logo">
            <div className="logo-mark">
              <span className="logo-letter">M</span>
              <span className="logo-letter">B</span>
              <span className="logo-letter">S</span>
              <span className="logo-letter accent">x</span>
            </div>
            <img src="/data-logo-removebg-preview.png" alt="MBSx Data" className="logo-icon" />
          </div>

          <div className="intro-text">
            <h1 className="intro-title">{t('welcome')}</h1>
            <p className="intro-tagline">{t('tagline')}</p>
          </div>

          <div className="language-selector">
            <span className="language-label">{t('selectLanguage')}</span>

            <div className="language-options">
              <button
                className={`language-btn ${selectedLang === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageSelect('en')}
              >
                <span className="lang-code">EN</span>
                <span className="lang-name">English</span>
              </button>

              <button
                className={`language-btn ${selectedLang === 'fr' ? 'active' : ''}`}
                onClick={() => handleLanguageSelect('fr')}
              >
                <span className="lang-code">FR</span>
                <span className="lang-name">Français</span>
              </button>

              <button
                className={`language-btn ${selectedLang === 'ar' ? 'active' : ''}`}
                onClick={() => handleLanguageSelect('ar')}
              >
                <span className="lang-code">ع</span>
                <span className="lang-name">العربية</span>
              </button>
            </div>
          </div>

          <button className="enter-btn" onClick={handleEnter}>
            <span>{t('enterSite')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={isRTL ? "M19 12H5M12 5l-7 7 7 7" : "M5 12h14M12 5l7 7-7 7"} />
            </svg>
          </button>
        </div>

        <div className="intro-decoration">
          <div className="deco-line line-1" />
          <div className="deco-line line-2" />
          <div className="deco-line line-3" />
          <div className="deco-circle circle-1" />
          <div className="deco-circle circle-2" />
        </div>
      </aside>
    </div>
  )
}

export default IntroSidebar
