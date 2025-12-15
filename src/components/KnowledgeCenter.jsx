import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../App'
import './KnowledgeCenter.css'

const KnowledgeCenter = () => {
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

  const digitalLibraryItems = [
    {
      id: 'articles',
      title: t('kcArticlesTitle'),
      desc: t('kcArticlesDesc'),
      link: '/knowledge-center/articles',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="12" y2="14" />
        </svg>
      ),
    },
    {
      id: 'dictionary',
      title: t('kcDictionaryTitle'),
      desc: t('kcDictionaryDesc'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'booklets',
      title: t('kcBookletsTitle'),
      desc: t('kcBookletsDesc'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      ),
    },
  ]

  const forumFeatures = [
    { title: t('kcForumFeature1'), desc: t('kcForumFeature1Desc') },
    { title: t('kcForumFeature2'), desc: t('kcForumFeature2Desc') },
    { title: t('kcForumFeature3'), desc: t('kcForumFeature3Desc') },
  ]

  return (
    <section id="knowledge-center" className="knowledge-center" ref={sectionRef}>
      <div className="kc-bg">
        <div className="kc-gradient" />
        <div className="kc-pattern" />
      </div>

      <div className="container">
        {/* Header */}
        <div className={`section-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <span className="section-label">{t('kcLabel')}</span>
          <h1 className="section-title kc-title">{t('kcTitle')}</h1>
          <p className="kc-subtitle">{t('kcSubtitle')}</p>
        </div>

        {/* Section 1: Digital Library */}
        <div className={`kc-section ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
          <div className="kc-section-header">
            <div className="kc-section-number">01</div>
            <div className="kc-section-info">
              <h2 className="kc-section-title">{t('kcDigitalLibraryTitle')}</h2>
              <p className="kc-section-desc">{t('kcDigitalLibraryDesc')}</p>
            </div>
          </div>

          <div className="library-grid">
            {digitalLibraryItems.map((item, index) => {
              const CardWrapper = item.link ? Link : 'div'
              const cardProps = item.link ? { to: item.link } : {}

              return (
                <CardWrapper
                  key={item.id}
                  {...cardProps}
                  className={`library-card ${isVisible ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="library-card-icon">
                    {item.icon}
                  </div>
                  <div className="library-card-content">
                    <h3 className="library-card-title">{item.title}</h3>
                    <p className="library-card-desc">{item.desc}</p>
                  </div>
                  <div className="library-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </CardWrapper>
              )
            })}
          </div>
        </div>

        {/* Section 2: Knowledge Forum */}
        <div className={`kc-section forum-section ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
          <div className="kc-section-header">
            <div className="kc-section-number">02</div>
            <div className="kc-section-info">
              <h2 className="kc-section-title">{t('kcForumTitle')}</h2>
              <p className="kc-section-desc">{t('kcForumDesc')}</p>
            </div>
          </div>

          <div className="forum-container">
            <div className="forum-main">
              <div className="forum-highlight">
                <div className="forum-highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div className="forum-highlight-content">
                  <h3 className="forum-highlight-title">{t('kcDiscussionsTitle')}</h3>
                  <p className="forum-highlight-desc">{t('kcDiscussionsDesc')}</p>
                </div>
              </div>

              <div className="forum-features">
                {forumFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`forum-feature ${isVisible ? 'animate-fade-in-up' : ''}`}
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="forum-feature-marker" />
                    <div className="forum-feature-content">
                      <h4 className="forum-feature-title">{feature.title}</h4>
                      <p className="forum-feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="forum-visual">
              <div className="forum-visual-card">
                <div className="visual-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="visual-lines">
                  <div className="visual-line"></div>
                  <div className="visual-line short"></div>
                  <div className="visual-line"></div>
                  <div className="visual-line medium"></div>
                </div>
                <div className="visual-bubbles">
                  <div className="bubble left"></div>
                  <div className="bubble right"></div>
                  <div className="bubble left small"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`kc-cta ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.7s' }}>
          <div className="cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div className="cta-content">
            <h3 className="cta-title">{t('kcCtaTitle')}</h3>
            <p className="cta-desc">{t('kcCtaDesc')}</p>
          </div>
          <a href="/#service-request" className="cta-button">
            {t('kcCtaButton')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default KnowledgeCenter
