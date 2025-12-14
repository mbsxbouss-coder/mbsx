import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../App'
import { supabase } from '../../lib/supabase'

const AdminServiceRequests = () => {
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
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setRequests(data || [])
    } catch (err) {
      console.error('Error fetching requests:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({
          status: newStatus,
          admin_notes: adminNotes || null
        })
        .eq('id', id)

      if (error) throw error
      setSelectedRequest(null)
      setAdminNotes('')
      fetchRequests()
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const statusOptions = ['pending', 'in_review', 'approved', 'rejected', 'completed']

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t('serviceRequests') || 'Service Requests'}</h1>
        <p className="admin-page-subtitle">{t('manageServiceRequests') || 'Review and manage service requests'}</p>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">{t('allRequests') || 'All Requests'}</h3>
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
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <p>{t('noRequests') || 'No requests found'}</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('institution') || 'Institution'}</th>
                <th>{t('sector') || 'Sector'}</th>
                <th>{t('service') || 'Service'}</th>
                <th>{t('email') || 'Email'}</th>
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
                  <td>{request.service_type}</td>
                  <td>{request.email}</td>
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
              <h3 className="admin-modal-title">{t('requestDetails') || 'Request Details'}</h3>
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
                  <label className="admin-form-label">{t('service') || 'Service'}</label>
                  <p>{selectedRequest.service_type}</p>
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
                  <label className="admin-form-label">{t('description') || 'Description'}</label>
                  <p>{selectedRequest.description}</p>
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

export default AdminServiceRequests
