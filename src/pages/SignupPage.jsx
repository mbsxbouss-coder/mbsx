import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import { useAuth } from '../contexts/AuthContext'
import './LoginPage.css'

const SignupPage = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const { signUp, signInWithGoogle, isAuthenticated, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerification, setShowVerification] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <main className="auth-page">
        <div className="auth-loading">
          <span className="loader"></span>
        </div>
      </main>
    )
  }

  // Redirect if already authenticated
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

    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordMismatch'))
      return
    }

    if (!formData.agreeTerms) {
      setError(t('agreeTermsError'))
      return
    }

    if (formData.password.length < 8) {
      setError(t('passwordTooShort') || 'Password must be at least 8 characters')
      return
    }

    setIsLoading(true)
    setError('')

    const { data, error: signUpError } = await signUp({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName
    })

    setIsLoading(false)

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError(t('emailInUse') || 'This email is already registered')
      } else {
        setError(signUpError.message)
      }
    } else {
      setShowVerification(true)
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    setError('')
    const { error: googleError } = await signInWithGoogle()
    if (googleError) {
      setError(googleError.message)
      setIsLoading(false)
    }
  }

  // Show verification message
  if (showVerification) {
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
              <h1 className="auth-title">{t('checkEmail') || 'Check Your Email'}</h1>
              <p className="auth-subtitle verification-message">
                {t('verificationSent') || 'We sent a verification link to your email. Please check your inbox and click the link to verify your account.'}
              </p>
            </div>
            <div className="auth-footer">
              <p>
                {t('alreadyVerified') || 'Already verified?'}{' '}
                <Link to="/login" className="auth-link">
                  {t('loginLink')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    )
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
            <h1 className="auth-title">{t('signupTitle')}</h1>
            <p className="auth-subtitle">{t('signupSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                {t('fullName')}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                placeholder={t('fullNamePlaceholder')}
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

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
                minLength={8}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder={t('confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-terms">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span>
                  {t('agreeToTerms')}{' '}
                  <Link to="/terms" className="auth-link">
                    {t('termsOfService')}
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`btn btn-primary auth-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                t('signupButton')
              )}
            </button>

            <div className="auth-divider">
              <span>{t('orContinueWith') || 'or continue with'}</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="btn btn-secondary auth-social-btn"
              disabled={isLoading}
            >
              {t('continueWithGoogle') || 'Continue with Google'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {t('haveAccount')}{' '}
              <Link to="/login" className="auth-link">
                {t('loginLink')}
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

export default SignupPage
