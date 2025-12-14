import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return date.toLocaleDateString()
}

export const NotificationProvider = ({ children, language = 'en' }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()

  // Format notification based on language
  const formatNotification = useCallback((notification) => {
    const titleKey = language === 'ar' ? 'title_ar' : language === 'fr' ? 'title_fr' : 'title'
    const messageKey = language === 'ar' ? 'message_ar' : language === 'fr' ? 'message_fr' : 'message'

    return {
      ...notification,
      displayTitle: notification[titleKey] || notification.title,
      displayMessage: notification[messageKey] || notification.message,
      timeAgo: formatTimeAgo(notification.created_at)
    }
  }, [language])

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setNotifications(data.map(formatNotification))
    } catch (err) {
      console.error('Error fetching notifications:', err)
    } finally {
      setLoading(false)
    }
  }, [user, formatNotification])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) {
      setNotifications([])
      setLoading(false)
      return
    }

    // Fetch initial notifications
    fetchNotifications()

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification = formatNotification(payload.new)
          setNotifications(prev => [newNotification, ...prev])
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const updatedNotification = formatNotification(payload.new)
          setNotifications(prev =>
            prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, fetchNotifications, formatNotification])

  // Update timeAgo periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => prev.map(n => ({
        ...n,
        timeAgo: formatTimeAgo(n.created_at)
      })))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Mark single notification as read
  const markAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)

      if (error) throw error

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      )
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false)

      if (error) throw error

      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (err) {
      console.error('Error marking all as read:', err)
    }
  }

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNotifications(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      console.error('Error deleting notification:', err)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const value = {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh: fetchNotifications,
    isAuthenticated
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
