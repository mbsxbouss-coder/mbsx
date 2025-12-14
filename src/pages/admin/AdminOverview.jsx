import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../App'
import { supabase } from '../../lib/supabase'

const AdminOverview = () => {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingServiceRequests: 0,
    pendingAdRequests: 0,
    activeAds: 0
  })
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchRecentRequests()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch user count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Fetch pending service requests
      const { count: pendingServices } = await supabase
        .from('service_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      // Fetch pending ad requests
      const { count: pendingAds } = await supabase
        .from('ad_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      // Fetch active ads
      const { count: activeAds } = await supabase
        .from('ad_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      setStats({
        totalUsers: usersCount || 0,
        pendingServiceRequests: pendingServices || 0,
        pendingAdRequests: pendingAds || 0,
        activeAds: activeAds || 0
      })
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const fetchRecentRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setRecentRequests(data || [])
    } catch (err) {
      console.error('Error fetching recent requests:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t('adminDashboard') || 'Dashboard'}</h1>
        <p className="admin-page-subtitle">{t('dashboardSubtitle') || 'Welcome to your admin dashboard'}</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">{t('totalUsers') || 'Total Users'}</span>
            <div className="admin-stat-icon users">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
          </div>
          <span className="admin-stat-value">{stats.totalUsers}</span>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">{t('pendingServiceRequests') || 'Pending Service Requests'}</span>
            <div className="admin-stat-icon pending">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
          <span className="admin-stat-value">{stats.pendingServiceRequests}</span>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">{t('pendingAdRequests') || 'Pending Ad Requests'}</span>
            <div className="admin-stat-icon pending">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 3v4M8 3v4" />
              </svg>
            </div>
          </div>
          <span className="admin-stat-value">{stats.pendingAdRequests}</span>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">{t('activeAds') || 'Active Ads'}</span>
            <div className="admin-stat-icon active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <span className="admin-stat-value">{stats.activeAds}</span>
        </div>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">{t('recentServiceRequests') || 'Recent Service Requests'}</h3>
        </div>
        {loading ? (
          <div className="admin-loading">
            <span className="loader"></span>
          </div>
        ) : recentRequests.length === 0 ? (
          <div className="admin-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <p>{t('noRequests') || 'No requests yet'}</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('institution') || 'Institution'}</th>
                <th>{t('service') || 'Service'}</th>
                <th>{t('status') || 'Status'}</th>
                <th>{t('date') || 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.institution_name}</td>
                  <td>{request.service_type}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{new Date(request.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminOverview
