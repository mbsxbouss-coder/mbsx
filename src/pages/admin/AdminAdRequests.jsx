import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../App'
import { supabase } from '../../lib/supabase'

const AdminAdRequests = () => {
  const { t } = useLanguage()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [filter])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('ad_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setRequests(data || [])
    } catch (err) {
      console.error('Error fetching ad requests:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        admin_notes: adminNotes || null
      }

      // Set start/end dates if activating
      if (newStatus === 'active') {
        updateData.start_date = new Date().toISOString()
        updateData.end_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      }

      const { error } = await supabase
        .from('ad_requests')
        .update(updateData)
        .eq('id', id)

      if (error) throw error
      setSelectedRequest(null)
      setAdminNotes('')
      fetchRequests()
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const statusOptions = ['pending', 'in_review', 'approved', 'rejected', 'active', 'expired']

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t('adRequests') || 'Ad Requests'}</h1>
        <p className="admin-page-subtitle">{t('manageAdRequests') || 'Review and manage advertisement requests'}</p>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">{t('allAdRequests') || 'All Ad Requests'}</h3>
          <div className="admin-table-filters">
            <select
              className="admin-filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">{t('allStatuses') || 'All Statuses'}</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">
            <span className="loader"></span>
          </div>
        ) : requests.length === 0 ? (
          <div className="admin-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 3v4M8 3v4" />
            </svg>
            <p>{t('noAdRequests') || 'No ad requests found'}</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('institution') || 'Institution'}</th>
                <th>{t('sector') || 'Sector'}</th>
                <th>{t('adTypes') || 'Ad Types'}</th>
                <th>{t('boosted') || 'Boosted'}</th>
                <th>{t('status') || 'Status'}</th>
                <th>{t('date') || 'Date'}</th>
                <th>{t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.institution_name}</td>
                  <td>{request.sector}</td>
                  <td>{request.ad_types?.join(', ') || '-'}</td>
                  <td>{request.boost_ad ? 'Yes' : 'No'}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{new Date(request.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="admin-action-btn"
                      onClick={() => setSelectedRequest(request)}
                    >
                      {t('view') || 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="admin-modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{t('adRequestDetails') || 'Ad Request Details'}</h3>
              <button className="admin-modal-close" onClick={() => setSelectedRequest(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">{t('institution') || 'Institution'}</label>
                  <p>{selectedRequest.institution_name}</p>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">{t('sector') || 'Sector'}</label>
                  <p>{selectedRequest.sector}</p>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">{t('adTypes') || 'Ad Types'}</label>
                  <p>{selectedRequest.ad_types?.join(', ') || '-'}</p>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">{t('boosted') || 'Boosted'}</label>
                  <p>{selectedRequest.boost_ad ? 'Yes - Premium Placement' : 'No'}</p>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">{t('email') || 'Email'}</label>
                  <p>{selectedRequest.email}</p>
                </div>
                {selectedRequest.phone && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">{t('phone') || 'Phone'}</label>
                    <p>{selectedRequest.phone}</p>
                  </div>
                )}
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-form-label">{t('adDetails') || 'Ad Details'}</label>
                  <p>{selectedRequest.ad_details}</p>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">{t('updateStatus') || 'Update Status'}</label>
                  <select
                    className="admin-form-select"
                    value={selectedRequest.status}
                    onChange={(e) => setSelectedRequest({ ...selectedRequest, status: e.target.value })}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-form-label">{t('adminNotes') || 'Admin Notes'}</label>
                  <textarea
                    className="admin-form-textarea"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder={t('addNotes') || 'Add notes about this request...'}
                  />
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                className="admin-action-btn"
                onClick={() => setSelectedRequest(null)}
              >
                {t('cancel') || 'Cancel'}
              </button>
              <button
                className="admin-action-btn primary"
                onClick={() => updateStatus(selectedRequest.id, selectedRequest.status)}
              >
                {t('saveChanges') || 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAdRequests
