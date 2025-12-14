import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useLanguage } from '../App'
import { useAuth } from '../contexts/AuthContext'
import AdminOverview from './admin/AdminOverview'
import AdminUsers from './admin/AdminUsers'
import AdminServiceRequests from './admin/AdminServiceRequests'
import AdminAdRequests from './admin/AdminAdRequests'
import AdminNotifications from './admin/AdminNotifications'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const { t } = useLanguage()
  const { profile, signOut } = useAuth()

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <NavLink to="/" className="admin-logo">
            MBSx
          </NavLink>
          <span className="admin-badge">{t('admin') || 'Admin'}</span>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>{t('overview') || 'Overview'}</span>
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            <span>{t('users') || 'Users'}</span>
          </NavLink>

          <NavLink to="/admin/service-requests" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>{t('serviceRequests') || 'Service Requests'}</span>
          </NavLink>

          <NavLink to="/admin/ad-requests" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 3v4M8 3v4" />
            </svg>
            <span>{t('adRequests') || 'Ad Requests'}</span>
          </NavLink>

          <NavLink to="/admin/notifications" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span>{t('notifications') || 'Notifications'}</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'A'}
            </div>
            <div className="admin-user-details">
              <span className="admin-user-name">{profile?.full_name || 'Admin'}</span>
              <span className="admin-user-email">{profile?.email}</span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={signOut}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>{t('signOut') || 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="service-requests" element={<AdminServiceRequests />} />
          <Route path="ad-requests" element={<AdminAdRequests />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminDashboard
