import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../App'
import { supabase } from '../../lib/supabase'

const AdminUsers = () => {
  const { t } = useLanguage()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [filter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('role', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      fetchUsers()
    } catch (err) {
      console.error('Error updating user role:', err)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t('users') || 'Users'}</h1>
        <p className="admin-page-subtitle">{t('manageUsers') || 'Manage user accounts and roles'}</p>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">{t('allUsers') || 'All Users'}</h3>
          <div className="admin-table-filters">
            <select
              className="admin-filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">{t('allRoles') || 'All Roles'}</option>
              <option value="user">{t('users') || 'Users'}</option>
              <option value="admin">{t('admins') || 'Admins'}</option>
              <option value="moderator">{t('moderators') || 'Moderators'}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">
            <span className="loader"></span>
          </div>
        ) : users.length === 0 ? (
          <div className="admin-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <p>{t('noUsers') || 'No users found'}</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('name') || 'Name'}</th>
                <th>{t('email') || 'Email'}</th>
                <th>{t('role') || 'Role'}</th>
                <th>{t('joined') || 'Joined'}</th>
                <th>{t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.full_name || '-'}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.role === 'admin' ? 'approved' : user.role === 'moderator' ? 'in_review' : 'pending'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-actions">
                      <select
                        className="admin-filter-select"
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        style={{ padding: '0.375rem 0.5rem', fontSize: '0.8125rem' }}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminUsers
