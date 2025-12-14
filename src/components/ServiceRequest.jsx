import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../App'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import './ServiceRequest.css'

const ServiceRequest = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    institutionName: '',
    sector: '',
    serviceType: '',
    description: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const { error: insertError } = await supabase
        .from('service_requests')
        .insert([{
          user_id: user?.id || null,
          institution_name: formData.institutionName,
          sector: formData.sector,
          service_type: formData.serviceType,
          description: formData.description,
          email: formData.email,
          phone: formData.phone || null
        }])

      if (insertError) throw insertError

      setIsSuccess(true)

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          institutionName: '',
          sector: '',
          serviceType: '',
          description: '',
          email: '',
          phone: ''
        })
      }, 4000)
    } catch (err) {
      console.error('Error submitting service request:', err)
      setError(t('submitError') || 'Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="service-request" className="service-request" ref={sectionRef}>
      <div className="container">
        <div className="request-layout">
          <div className={`request-info ${isVisible ? 'animate-fade-in-left' : ''}`}>
            <span className="section-label">{t('requestService')}</span>
            <h2 className="request-title">Let's Build Something Great Together</h2>
            <p className="request-desc">
              Ready to transform your data into actionable insights? Fill out the form and our team
              will get back to you within 24 hours.
            </p>

            <div className="request-features">
              <div className="req-feature">
                <div className="req-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="req-feature-text">
                  <h4>Quick Response</h4>
                  <p>We respond to all inquiries within 24 hours</p>
                </div>
              </div>

              <div className="req-feature">
                <div className="req-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div className="req-feature-text">
                  <h4>Dedicated Team</h4>
                  <p>Work with expert data journalists</p>
                </div>
              </div>

              <div className="req-feature">
                <div className="req-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <div className="req-feature-text">
                  <h4>Confidential</h4>
                  <p>Your data and requests are secure</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`request-form-wrapper ${isVisible ? 'animate-fade-in-right' : ''}`}>
            {isSuccess ? (
              <div className="success-message">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3>Request Submitted!</h3>
                <p>{t('successMessage')}</p>
              </div>
            ) : (
              <form className="request-form" onSubmit={handleSubmit}>
                {error && (
                  <div className="form-error">
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">{t('institutionName')}</label>
                  <input
                    type="text"
                    name="institutionName"
                    className="form-input"
                    value={formData.institutionName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('sector')}</label>
                  <div className="form-radio-group">
                    <label className="form-radio">
                      <input
                        type="radio"
                        name="sector"
                        value="media"
                        checked={formData.sector === 'media'}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                      <span>{t('media')}</span>
                    </label>
                    <label className="form-radio">
                      <input
                        type="radio"
                        name="sector"
                        value="economic"
                        checked={formData.sector === 'economic'}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      <span>{t('economic')}</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('serviceType')}</label>
                  <select
                    name="serviceType"
                    className="form-select"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option value="report">{t('report')}</option>
                    <option value="dashboard">{t('dashboard')}</option>
                    <option value="consultation">{t('consultation')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('description')}</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    placeholder={t('descriptionPlaceholder')}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('email')}</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
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
      </div>
    </section>
  )
}

export default ServiceRequest
