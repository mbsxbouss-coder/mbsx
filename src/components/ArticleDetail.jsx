import React, { useRef, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../App'
import { articlesData } from './Articles'
import './ArticleDetail.css'

const ArticleDetail = () => {
  const { t, language } = useLanguage()
  const { articleId } = useParams()
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const article = articlesData.find(a => a.id === articleId)

  useEffect(() => {
    if (!article) {
      navigate('/knowledge-center/articles')
      return
    }

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
  }, [article, navigate])

  if (!article) {
    return null
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category) => {
    const categories = {
      analysis: { ar: 'تحليل', en: 'Analysis', fr: 'Analyse' },
      research: { ar: 'بحث', en: 'Research', fr: 'Recherche' },
      caseStudy: { ar: 'دراسة حالة', en: 'Case Study', fr: 'Etude de cas' }
    }
    return categories[category]?.[language] || category
  }

  // Split content into paragraphs
  const paragraphs = article.content[language].split('\n\n').filter(p => p.trim())

  return (
    <section className="article-detail-section" ref={sectionRef}>
      <div className="article-detail-bg">
        <div className="article-detail-gradient" />
        <div className="article-detail-pattern" />
      </div>

      <div className="container">
        {/* Back Link */}
        <Link to="/knowledge-center/articles" className={`back-link ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>{t('backToArticles')}</span>
        </Link>

        {/* Article Header */}
        <header className={`article-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="article-meta">
            <span className="article-category-badge">{getCategoryLabel(article.category)}</span>
            <span className="article-meta-separator"></span>
            <span className="article-meta-date">{formatDate(article.date)}</span>
            <span className="article-meta-separator"></span>
            <span className="article-meta-read-time">{article.readTime} {t('minRead')}</span>
          </div>
          <h1 className="article-title">{article.title[language]}</h1>
        </header>

        {/* Article Content */}
        <article className={`article-content ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {/* Article Footer */}
        <footer className={`article-footer ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="article-footer-content">
            <h3>{t('shareArticle')}</h3>
            <div className="share-buttons">
              <button
                className="share-btn"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title[language],
                      url: window.location.href
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                aria-label={t('copyLink')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{t('copyLink')}</span>
              </button>
            </div>
          </div>

          <Link to="/knowledge-center/articles" className="back-to-articles-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {t('backToArticles')}
          </Link>
        </footer>
      </div>
    </section>
  )
}

export default ArticleDetail
