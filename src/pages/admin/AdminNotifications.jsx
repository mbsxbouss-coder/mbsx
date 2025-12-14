import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../App'
import { supabase } from '../../lib/supabase'

const AdminNotifications = () => {
  const { t } = useLanguage()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    targetUsers: 'all',
    selectedUsers: [],
    title: '',
    titleAr: '',
    titleFr: '',
    message: '',
    messageAr: '',
    messageFr: '',
    type: 'info'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .order('full_name', { ascending: true })

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSuccess(false)
  }

  const handleUserSelect = (userId) => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.message) return

    setSending(true)

    try {
      let targetUserIds = []

      if (formData.targetUsers === 'all') {
        targetUserIds = users.map(u => u.id)
      } else {
        targetUserIds = formData.selectedUsers
      }

      if (targetUserIds.length === 0) {
        alert(t('selectAtLeastOneUser') || 'Please select at least one user')
        setSending(false)
        return
      }

      // Create notifications for each user
      const notifications = targetUserIds.map(userId => ({
        user_id: userId,
        title: formData.title,
        title_ar: formData.titleAr || null,
        title_fr: formData.titleFr || null,
        message: formData.message,
        message_ar: formData.messageAr || null,
        message_fr: formData.messageFr || null,
        type: formData.type,
        related_type: 'announcement'
      }))

      const { error } = await supabase
        .from('notifications')
        .insert(notifications)

      if (error) throw error

      setSuccess(true)
      setFormData({
        targetUsers: 'all',
        selectedUsers: [],
        title: '',
        titleAr: '',
        titleFr: '',
        message: '',
        messageAr: '',
        messageFr: '',
        type: 'info'
      })
    } catch (err) {
      console.error('Error sending notifications:', err)
      alert(t('errorSendingNotification') || 'Error sending notification')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t('sendNotifications') || 'Send Notifications'}</h1>
        <p className="admin-page-subtitle">{t('sendNotificationsSubtitle') || 'Send notifications to users'}</p>
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-title">{t('newNotification') || 'New Notification'}</h3>

        {success && (
          <div style={{
            padding: '1rem',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#22C55E',
            marginBottom: '1.5rem'
          }}>
            {t('notificationSentSuccess') || 'Notification sent successfully!'}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-form-label">{t('recipients') || 'Recipients'}</label>
              <select
                name="targetUsers"
                className="admin-form-select"
                value={formData.targetUsers}
                onChange={handleChange}
              >
                <option value="all">{t('allUsers') || 'All Users'}</option>
                <option value="selected">{t('selectedUsers') || 'Selected Users'}</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">{t('notificationType') || 'Type'}</label>
              <select
                name="type"
                className="admin-form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="info">{t('info') || 'Info'}</option>
                <option value="success">{t('success') || 'Success'}</option>
                <option value="warning">{t('warning') || 'Warning'}</option>
                <option value="alert">{t('alert') || 'Alert'}</option>
              </select>
            </div>

            {formData.targetUsers === 'selected' && (
              <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="admin-form-label">{t('selectUsers') || 'Select Users'}</label>
                <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem'
                }}>
                  {users.map(user => (
                    <label key={user.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                      />
                      <span>{user.full_name || user.email}</span>
                    </label>
                  ))}
                </div>
                <small style={{ color: 'var(--text-tertiary)' }}>
                  {formData.selectedUsers.length} {t('usersSelected') || 'users selected'}
                </small>
              </div>
            )}

            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="admin-form-label">{t('titleEnglish') || 'Title (English)'} *</label>
              <input
                type="text"
                name="title"
                className="admin-form-input"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder={t('enterTitle') || 'Enter notification title'}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">{t('titleArabic') || 'Title (Arabic)'}</label>
              <input
                type="text"
                name="titleAr"
                className="admin-form-input"
                value={formData.titleAr}
                onChange={handleChange}
                placeholder={t('enterTitleAr') || 'أدخل عنوان الإشعار'}
                dir="rtl"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">{t('titleFrench') || 'Title (French)'}</label>
              <input
                type="text"
                name="titleFr"
                className="admin-form-input"
                value={formData.titleFr}
                onChange={handleChange}
                placeholder={t('enterTitleFr') || 'Entrez le titre de la notification'}
              />
            </div>

            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="admin-form-label">{t('messageEnglish') || 'Message (English)'} *</label>
              <textarea
                name="message"
                className="admin-form-textarea"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t('enterMessage') || 'Enter notification message'}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">{t('messageArabic') || 'Message (Arabic)'}</label>
              <textarea
                name="messageAr"
                className="admin-form-textarea"
                value={formData.messageAr}
                onChange={handleChange}
                placeholder={t('enterMessageAr') || 'أدخل رسالة الإشعار'}
                dir="rtl"
                style={{ minHeight: '80px' }}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">{t('messageFrench') || 'Message (French)'}</label>
              <textarea
                name="messageFr"
                className="admin-form-textarea"
                value={formData.messageFr}
                onChange={handleChange}
                placeholder={t('enterMessageFr') || 'Entrez le message de la notification'}
                style={{ minHeight: '80px' }}
              />
            </div>
          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              className="admin-action-btn primary"
              disabled={sending || !formData.title || !formData.message}
            >
              {sending ? (t('sending') || 'Sending...') : (t('sendNotification') || 'Send Notification')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminNotifications
