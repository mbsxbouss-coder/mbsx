import { supabase } from '../lib/supabase'

export const usersService = {
  async getProfiles(filter = 'all') {
    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('role', filter)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async updateUserRole(userId, role) {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
    if (error) throw error
  },

  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateProfile(userId, updates) {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    if (error) throw error
  },

  async getUsersCount() {
    const { count, error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })

    if (error) throw error
    return count || 0
  }
}

export default usersService
