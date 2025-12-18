import { supabase } from '../lib/supabase'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

export const requestsService = {
  // Service Requests
  async createServiceRequest(data) {
    const { data: result, error } = await supabase
      .from('service_requests')
      .insert([data])
      .select()
      .single()
    if (error) throw error

    // Notify admin via Edge Function (non-blocking)
    this.notifyAdmin(data).catch(err => {
      console.warn('Admin notification failed:', err)
    })

    return result
  },

  // Notify admin of new service request
  async notifyAdmin(data) {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/notify-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          institution_name: data.institution_name,
          sector: data.sector,
          service_type: data.service_type,
          description: data.description,
          email: data.email,
          phone: data.phone || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to notify admin')
      }

      return await response.json()
    } catch (error) {
      console.error('Error notifying admin:', error)
      throw error
    }
  },

  async getServiceRequests(filter = 'all') {
    let query = supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async updateServiceRequest(id, updates) {
    const { error } = await supabase
      .from('service_requests')
      .update(updates)
      .eq('id', id)
    if (error) throw error
  },

  async getServiceRequestsCount(status = null) {
    let query = supabase
      .from('service_requests')
      .select('id', { count: 'exact', head: true })

    if (status) {
      query = query.eq('status', status)
    }

    const { count, error } = await query
    if (error) throw error
    return count || 0
  },

  // Ad Requests
  async createAdRequest(data) {
    const { data: result, error } = await supabase
      .from('ad_requests')
      .insert([data])
      .select()
      .single()
    if (error) throw error
    return result
  },

  async getAdRequests(filter = 'all') {
    let query = supabase
      .from('ad_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async updateAdRequest(id, updates) {
    const { error } = await supabase
      .from('ad_requests')
      .update(updates)
      .eq('id', id)
    if (error) throw error
  },

  async getAdRequestsCount(status = null) {
    let query = supabase
      .from('ad_requests')
      .select('id', { count: 'exact', head: true })

    if (status) {
      query = query.eq('status', status)
    }

    const { count, error } = await query
    if (error) throw error
    return count || 0
  },

  async getActiveAdsCount() {
    const { count, error } = await supabase
      .from('ad_requests')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'approved')

    if (error) throw error
    return count || 0
  }
}

export default requestsService
