import React, { useEffect } from 'react'
import { useLanguage } from '../App'
import { useNotifications } from '../contexts/NotificationContext'
import { Link } from 'react-router-dom'
import './NotificationPanel.css'

const NotificationPanel = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage()
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isAuthenticated
  } = useNotifications()
  const isRTL = language === 'ar'

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

  if (!isOpen) return null

  return (
    <>
      <div className="notification-overlay" onClick={onClose} />
      <div className={`notification-panel ${isRTL ? 'rtl' : ''}`}>
        <div className="notification-header">
          <div className="notification-header-info">
            <h3>{t('notifications')}</h3>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount} {t('new') || 'new'}</span>
            )}
          </div>
          <div className="notification-header-actions">
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                {t('markAllRead')}
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="notification-body">
          {!isAuthenticated ? (
            <div className="notification-empty">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </div>
              <p>{t('loginToSeeNotifications') || 'Please log in to see your notifications'}</p>
              <Link to="/login" className="btn btn-primary notification-login-btn" onClick={onClose}>
                {t('loginButton') || 'Log In'}
              </Link>
            </div>
          ) : loading ? (
            <div className="notification-loading">
              <span className="loader"></span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="notification-empty">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </div>
              <p>{t('noNotifications')}</p>
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : ''} ${notification.type || ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-indicator">
                    {!notification.read && <span className="indicator-dot" />}
                  </div>
                  <div className="notification-content">
                    <h4 className="notification-title">{notification.displayTitle || notification.title}</h4>
                    <p className="notification-message">{notification.displayMessage || notification.message}</p>
                    <span className="notification-time">{notification.timeAgo}</span>
                  </div>
                  <div className="notification-action">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NotificationPanel
