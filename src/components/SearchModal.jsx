import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../App'
import { supabase } from '../lib/supabase'
import './SearchModal.css'

const SearchModal = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage()
  const [query, setQuery] = useState('')
  const [searchMode, setSearchMode] = useState('keyword')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Reset results when modal closes
  useEffect(() => {
    if (!isOpen) {
      setResults([])
      setQuery('')
    }
  }, [isOpen])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)

    try {
      // Determine which columns to search based on language
      const titleCol = language === 'ar' ? 'title_ar' : language === 'fr' ? 'title_fr' : 'title'
      const descCol = language === 'ar' ? 'description_ar' : language === 'fr' ? 'description_fr' : 'description'

      let searchQuery = supabase
        .from('searchable_content')
        .select('*')
        .eq('is_published', true)

      // Build the search filter - search across all language columns
      const searchPattern = `%${query}%`
      searchQuery = searchQuery.or(
        `title.ilike.${searchPattern},description.ilike.${searchPattern},title_ar.ilike.${searchPattern},title_fr.ilike.${searchPattern},description_ar.ilike.${searchPattern},description_fr.ilike.${searchPattern}`
      )

      const { data, error } = await searchQuery
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error

      // Format results with localized content
      setResults(data.map(item => ({
        id: item.id,
        type: item.content_type,
        title: item[titleCol] || item.title,
        description: item[descCol] || item.description,
        url: item.url,
        date: new Date(item.created_at).toLocaleDateString(
          language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-US',
          { month: 'short', year: 'numeric' }
        )
      })))
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleResultClick = (result) => {
    if (result.url) {
      window.location.href = result.url
    }
    onClose()
  }

  const isRTL = language === 'ar'

  if (!isOpen) return null

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className={`search-modal ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder') || 'Search reports, dashboards, services...'}
              />
              {query && (
                <button type="button" className="search-clear" onClick={() => { setQuery(''); setResults([]); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </form>

          <button className="search-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="search-modes">
          <button
            className={`mode-btn ${searchMode === 'keyword' ? 'active' : ''}`}
            onClick={() => setSearchMode('keyword')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 7 4 4 20 4 20 7" />
              <line x1="9" y1="20" x2="15" y2="20" />
              <line x1="12" y1="4" x2="12" y2="20" />
            </svg>
            {t('keywordSearch')}
          </button>
          <button
            className={`mode-btn ${searchMode === 'ai' ? 'active' : ''}`}
            onClick={() => setSearchMode('ai')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93" />
              <path d="M8.25 9.93A4 4 0 0112 2" />
              <circle cx="12" cy="14" r="4" />
              <path d="M12 18v4" />
              <path d="M8 22h8" />
            </svg>
            {t('aiSearch')}
          </button>
        </div>

        <div className="search-body">
          {isSearching ? (
            <div className="search-loading">
              <div className="loading-spinner" />
              <span>{t('searching') || 'Searching...'}</span>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results">
              <span className="results-label">{results.length} {t('resultsFound') || 'results found'}</span>
              {results.map((result) => (
                <div
                  key={result.id}
                  className="result-item"
                  onClick={() => handleResultClick(result)}
                  style={{ cursor: result.url ? 'pointer' : 'default' }}
                >
                  <div className="result-icon">
                    {result.type === 'report' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {result.type === 'dashboard' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    )}
                    {result.type === 'service' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                    )}
                    {result.type === 'publication' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      </svg>
                    )}
                    {result.type === 'article' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    )}
                  </div>
                  <div className="result-content">
                    <h4 className="result-title">{result.title}</h4>
                    {result.description && (
                      <p className="result-description">{result.description.substring(0, 100)}{result.description.length > 100 ? '...' : ''}</p>
                    )}
                    <span className="result-meta">{result.type} • {result.date}</span>
                  </div>
                  <svg className="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          ) : query && !isSearching ? (
            <div className="search-empty">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h4>{t('noResults') || 'No results found'}</h4>
              <p>{t('tryDifferentKeywords') || 'Try different keywords or check your spelling'}</p>
            </div>
          ) : (
            <div className="search-empty">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h4>{t('startSearching')}</h4>
              <p>{t('searchHint') || 'Search for reports, dashboards, services, and more'}</p>
            </div>
          )}
        </div>

        <div className="search-footer">
          <span className="search-hint">
            {t('pressEscToClose') || 'Press'} <kbd>ESC</kbd> {t('toClose') || 'to close'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
