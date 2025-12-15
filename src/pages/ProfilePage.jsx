import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../App'
import { useAuth } from '../contexts/AuthContext'
import './LoginPage.css'

const ProfilePage = () => {
  const { t, language } = useLanguage()
  const { user, profile, signOut, updateProfile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    phone: profile?.phone || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await updateProfile({
      full_name: formData.fullName,
      phone: formData.phone
    })

    if (error) {
      setError(error.message || t('updateError') || 'Failed to update profile')
    } else {
      setSuccess(t('profileUpdated') || 'Profile updated successfully')
      setIsEditing(false)
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '520px' }}>
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">MBSx<img src="/data-logo-removebg-preview.png" alt="MBSx Data" className="auth-logo-icon" /></Link>
            <h1 className="auth-title">{t('profile') || 'Profile'}</h1>
            <p className="auth-subtitle">{t('manageYourAccount') || 'Manage your account'}</p>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && (
            <div style={{
              padding: '0.875rem 1rem',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#22C55E',
              fontSize: '0.875rem',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              {success}
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                {(profile?.full_name || user?.email || '?')[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  {profile?.full_name || t('noName') || 'No name set'}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                  {user?.email}
                </div>
                {isAdmin && (
                  <div style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(201, 162, 39, 0.1)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    {t('admin') || 'Admin'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="auth-form">
              <div className="form-group">
                <label className="form-label">{t('fullName') || 'Full Name'}</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('enterFullName') || 'Enter your full name'}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('email') || 'Email'}</label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('phone') || 'Phone'}</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('enterPhone') || 'Enter your phone number'}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                  style={{ flex: 1 }}
                >
                  {t('cancel') || 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? <span className="loader"></span> : (t('save') || 'Save')}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
                style={{ width: '100%' }}
              >
                {t('editProfile') || 'Edit Profile'}
              </button>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="btn btn-secondary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {t('adminDashboard') || 'Admin Dashboard'}
                </Link>
              )}

              <button
                className="btn btn-secondary"
                onClick={handleSignOut}
                style={{ width: '100%' }}
              >
                {t('signOut') || 'Sign Out'}
              </button>
            </div>
          )}

          <div className="auth-footer">
            <p>
              <Link to="/" className="auth-link">{t('backToHome') || 'Back to Home'}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
