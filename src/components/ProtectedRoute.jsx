import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Protected route component with role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {boolean} props.requireAuth - Require authentication (default: true)
 * @param {string} props.requireRole - Required role: 'admin' | 'moderator' | null
 * @param {boolean} props.requireAdmin - Legacy prop for admin-only routes
 * @param {string} props.redirectTo - Redirect path for unauthenticated users
 */
const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireRole = null,
  requireAdmin = false,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, isAdmin, isModerator, loading } = useAuth()
  const location = useLocation()

  // Handle legacy requireAdmin prop
  const effectiveRole = requireAdmin ? 'admin' : requireRole

  if (loading) {
    return (
      <div className="protected-loading">
        <span className="loader"></span>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (effectiveRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />
  }

  if (effectiveRole === 'moderator' && !isModerator) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
