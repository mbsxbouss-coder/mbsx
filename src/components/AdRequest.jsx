import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../App'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useFormValidation } from '../hooks/useFormValidation'
import { adRequestSchema } from '../validation/schemas'
import './AdRequest.css'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

const AdRequest = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    institutionName: '',
    sector: '',
    adTypes: [],
    adDetails: '',
    email: '',
    phone: '',
    boostAd: false,
    agreeTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const { errors, validate, clearError } = useFormValidation(adRequestSchema)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'adTypes') {
      setFormData(prev => ({
        ...prev,
        adTypes: checked
          ? [...prev.adTypes, value]
          : prev.adTypes.filter(t => t !== value)
      }))
      clearError('adTypes')
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
      clearError(name)
    }
    setError('')
  }

  const notifyAdmin = async (data) => {
    try {
      await fetch(`${SUPABASE_URL}/functions/v1/notify-admin-ad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (err) {
      console.warn('Admin notification failed:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Check terms agreement
    if (!formData.agreeTerms) {
      setError(t('agreeTermsError'))
      return
    }

    // Validate form
    const validationResult = validate(formData)
    if (!validationResult.success) {
      return
    }

    setIsSubmitting(true)

    try {
      const requestData = {
        user_id: user?.id || null,
        institution_name: formData.institutionName,
        sector: formData.sector,
        ad_types: formData.adTypes,
        ad_details: formData.adDetails,
        email: formData.email,
        phone: formData.phone || null,
        boost_ad: formData.boostAd
      }

      const { error: insertError } = await supabase
        .from('ad_requests')
        .insert([requestData])

      if (insertError) throw insertError

      // Notify admin (non-blocking)
      notifyAdmin(requestData)

      setIsSuccess(true)

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          institutionName: '',
          sector: '',
          adTypes: [],
          adDetails: '',
          email: '',
          phone: '',
          boostAd: false,
          agreeTerms: false
        })
      }, 4000)
    } catch (err) {
      console.error('Error submitting ad request:', err)
      setError(t('submitError') || 'Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const adTypeOptions = [
    { value: 'job', label: t('jobVacancy') },
    { value: 'business', label: t('businessOpportunity') },
    { value: 'tender', label: t('tender') },
    { value: 'service', label: t('servicePromotion') },
    { value: 'sponsored', label: t('sponsoredReport') },
    { value: 'launch', label: t('productLaunch') },
  ]

  return (
    <section id="ad-request" className="ad-request" ref={sectionRef}>
      <div className="ad-bg">
        <div className="ad-gradient" />
        <div className="ad-pattern" />
      </div>

      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <span className="section-label">{t('advertiseWithUs')}</span>
          <h2 className="section-title">Reach Your Target Audience</h2>
          <p className="section-subtitle">
            Promote your services, opportunities, and announcements to our network of media and economic institutions.
          </p>
        </div>

        <div className={`ad-form-container ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
          {isSuccess ? (
            <div className="success-message">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Advertisement Request Submitted!</h3>
              <p>{t('successMessage')}</p>
            </div>
          ) : (
            <form className="ad-form" onSubmit={handleSubmit}>
              {error && (
                <div className="form-error" style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                  {error}
                </div>
              )}

              <div className="ad-form-grid">
                <div className="ad-form-left">
                  <div className="form-group">
                    <label className="form-label">{t('institutionName')}</label>
                    <input
                      type="text"
                      name="institutionName"
                      className={`form-input ${errors.institutionName ? 'input-error' : ''}`}
                      value={formData.institutionName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.institutionName && <span className="field-error">{errors.institutionName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('sector')}</label>
                    <input
                      type="text"
                      name="sector"
                      className={`form-input ${errors.sector ? 'input-error' : ''}`}
                      placeholder="e.g., Media, Finance, Technology"
                      value={formData.sector}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.sector && <span className="field-error">{errors.sector}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('email')}</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="ad-form-right">
                  <div className="form-group">
                    <label className="form-label">{t('adType')}</label>
                    <div className="form-checkbox-grid">
                      {adTypeOptions.map(option => (
                        <label key={option.value} className="form-checkbox">
                          <input
                            type="checkbox"
                            name="adTypes"
                            value={option.value}
                            checked={formData.adTypes.includes(option.value)}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <span className="checkbox-custom" />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.adTypes && <span className="field-error">{errors.adTypes}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('adDetails')}</label>
                    <textarea
                      name="adDetails"
                      className={`form-textarea ${errors.adDetails ? 'input-error' : ''}`}
                      placeholder={t('adDetailsPlaceholder')}
                      value={formData.adDetails}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.adDetails && <span className="field-error">{errors.adDetails}</span>}
                  </div>

                  <label className="form-checkbox boost-option">
                    <input
                      type="checkbox"
                      name="boostAd"
                      checked={formData.boostAd}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span className="checkbox-custom" />
                    <span className="boost-text">
                      <strong>{t('boostAd')}</strong>
                      <small>Get premium placement and extended reach</small>
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                  <span className="checkbox-custom" />
                  <span>{t('agreeToPrivacyAndTerms')}</span>
                </label>
              </div>

              <button
                type="submit"
                className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner" />
                ) : (
                  <>
                    {t('submit')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdRequest
