import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../App'
import './Hero.css'

const Hero = () => {
  const { t, language } = useLanguage()
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20

      heroRef.current.style.setProperty('--mouse-x', `${x}px`)
      heroRef.current.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToRequest = () => {
    document.getElementById('service-request')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-gradient" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="hero-line" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in-up stagger-1">
            <span className="badge-dot" />
            <span>Data Journalism Institution</span>
          </div>

          <h1 className="hero-title animate-fade-in-up stagger-2">
            {t('heroTitle')}
            <br />
            <span className="hero-highlight">
              {language === 'ar' ? (
                <>
                  <span className="hero-highlight-line1">الإعلام | الأعمال</span>
                  <span className="hero-highlight-line2">الإحصاء</span>
                </>
              ) : language === 'en' ? (
                <>
                  <span className="hero-highlight-line1">Media | Business</span>
                  <span className="hero-highlight-line2">Statistics</span>
                </>
              ) : (
                <>
                  <span className="hero-highlight-line1">Médias | Affaires</span>
                  <span className="hero-highlight-line2">Statistiques</span>
                </>
              )}
            </span>
          </h1>

          <p className="hero-subtitle animate-fade-in-up stagger-3">
            {t('heroSubtitle')}
          </p>

          <div className="hero-actions animate-fade-in-up stagger-4">
            <button className="btn btn-primary" onClick={scrollToServices}>
              {t('exploreServices')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={language === 'ar' ? "M19 12H5M12 5l-7 7 7 7" : "M5 12h14M12 5l7 7-7 7"} />
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={scrollToRequest}>
              {t('requestConsultation')}
            </button>
          </div>

          <div className="hero-stats animate-fade-in-up stagger-5">
            <div className="stat">
              <span className="stat-value">3</span>
              <span className="stat-label">{t('languagesSupported')}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">2</span>
              <span className="stat-label">{t('sectorsCovered')}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">{t('coreServices')}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in stagger-3">
          <div className="visual-frame">
            <div className="visual-data">
              <div className="data-bar-group">
                {[85, 65, 92, 78, 88, 70, 95].map((height, i) => (
                  <div
                    key={i}
                    className="data-bar"
                    style={{
                      '--bar-height': `${height}%`,
                      animationDelay: `${1.5 + i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              <div className="data-line">
                <svg viewBox="0 0 200 80" preserveAspectRatio="none">
                  <path
                    className="line-path"
                    d="M0,60 Q20,55 40,45 T80,50 T120,30 T160,35 T200,20"
                    fill="none"
                    strokeWidth="2"
                  />
                  <path
                    className="line-glow"
                    d="M0,60 Q20,55 40,45 T80,50 T120,30 T160,35 T200,20"
                    fill="none"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="data-dots">
                {[
                  { x: 20, y: 30 },
                  { x: 45, y: 55 },
                  { x: 70, y: 40 },
                  { x: 85, y: 65 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="data-dot"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      animationDelay: `${2 + i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="visual-overlay" />
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
