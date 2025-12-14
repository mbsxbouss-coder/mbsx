import { supabase } from '../lib/supabase'

export const notificationsService = {
  async getNotifications(userId, limit = 50) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async markAsRead(id) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
    if (error) throw error
  },

  async markAllAsRead(userId) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)
    if (error) throw error
  },

  async deleteNotification(id) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async sendNotification(notification) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notification])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async sendBulkNotifications(notifications) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notifications)
      .select()
    if (error) throw error
    return data
  }
}

export default notificationsService
