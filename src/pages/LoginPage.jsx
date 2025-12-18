import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import { useAuth } from '../contexts/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const { signIn, isAuthenticated, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Redirect if already authenticated
  if (authLoading) {
    return (
      <main className="auth-page">
        <div className="auth-loading">
          <span className="loader"></span>
        </div>
      </main>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const { error: signInError } = await signIn({
      email: formData.email,
      password: formData.password
    })

    if (signInError) {
      setError(t('invalidCredentials') || signInError.message)
      setIsLoading(false)
    } else {
      if (formData.rememberMe) {
        localStorage.setItem('mbsx-remember', 'true')
      }
      navigate('/')
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              MBSx
              <img src="/data-logo-removebg-preview.png" alt="MBSx Data" className="auth-logo-icon" />
            </Link>
            <h1 className="auth-title">{t('loginTitle')}</h1>
            <p className="auth-subtitle">{t('loginSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder={t('passwordPlaceholder')}
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-options">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span>{t('rememberMe')}</span>
              </label>
              <Link to="/forgot-password" className="auth-link">
                {t('forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              className={`btn btn-primary auth-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                t('loginButton')
              )}
            </button>

          </form>

          <div className="auth-footer">
            <p>
              {t('noAccount')}{' '}
              <Link to="/signup" className="auth-link">
                {t('signupLink')}
              </Link>
            </p>
          </div>
        </motion.div>

        <div className="auth-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-line"></div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
