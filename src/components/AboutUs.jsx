import React, { useRef, useEffect, useState } from 'react'
import { useLanguage } from '../App'
import './AboutUs.css'

const AboutUs = () => {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    t('value1'),
    t('value2'),
    t('value3'),
    t('value4'),
    t('value5'),
    t('value6'),
  ]

  return (
    <section id="about" className="about-us" ref={sectionRef}>
      <div className="about-bg">
        <div className="about-gradient" />
        <div className="about-pattern" />
      </div>

      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <span className="section-label">{t('aboutUsLabel')}</span>
          <h2 className="section-title">{t('aboutUsTitle')}</h2>
        </div>

        <div className="about-content">
          <div className={`about-main ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
            <p className="about-description">{t('aboutUsDesc')}</p>
          </div>

          <div className="about-grid">
            <div className={`about-card vision-card ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
                <h3 className="card-title">{t('visionTitle')}</h3>
              </div>
              <p className="card-text">{t('visionDesc')}</p>
            </div>

            <div className={`about-card mission-card ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                </div>
                <h3 className="card-title">{t('missionTitle')}</h3>
              </div>
              <p className="card-text">{t('missionDesc')}</p>
            </div>
          </div>

          <div className={`values-section ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
            <h3 className="values-title">{t('valuesTitle')}</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`value-item ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="value-number">0{index + 1}</div>
                  <p className="value-text">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`ceo-section ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.8s' }}>
            <div className="ceo-card">
              <div className="ceo-image-wrapper">
                <img src="/mara.jpg" alt={t('ceoName')} className="ceo-image" />
                <div className="ceo-image-overlay" />
              </div>
              <div className="ceo-info">
                <span className="ceo-label">{t('ceoTitle')}</span>
                <h4 className="ceo-name">{t('ceoName')}</h4>
                <p className="ceo-desc">{t('ceoDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
