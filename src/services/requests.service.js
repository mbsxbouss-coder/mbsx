import { supabase } from '../lib/supabase'

export const requestsService = {
  // Service Requests
  async createServiceRequest(data) {
    const { data: result, error } = await supabase
      .from('service_requests')
      .insert([data])
      .select()
      .single()
    if (error) throw error
    return result
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
