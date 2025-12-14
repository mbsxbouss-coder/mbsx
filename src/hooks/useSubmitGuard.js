import { useState, useRef, useCallback } from 'react'

/**
 * Hook to prevent duplicate form submissions
 * Provides debouncing and request deduplication
 */
export function useSubmitGuard(options = {}) {
  const { debounceMs = 300 } = options
  const [isSubmitting, setIsSubmitting] = useState(false)
  const lastSubmitTime = useRef(0)
  const pendingRequest = useRef(null)

  const guardedSubmit = useCallback(async (submitFn) => {
    // Debounce check - prevent rapid submissions
    const now = Date.now()
    if (now - lastSubmitTime.current < debounceMs) {
      return { debounced: true, success: false }
    }

    // Already submitting check
    if (isSubmitting) {
      return { blocked: true, success: false }
    }

    // Cancel any pending request
    if (pendingRequest.current) {
      pendingRequest.current.cancelled = true
    }

    const thisRequest = { cancelled: false }
    pendingRequest.current = thisRequest
    lastSubmitTime.current = now

    setIsSubmitting(true)
    try {
      const result = await submitFn()
      if (thisRequest.cancelled) {
        return { cancelled: true, success: false }
      }
      return { success: true, data: result }
    } catch (error) {
      if (thisRequest.cancelled) {
        return { cancelled: true, success: false }
      }
      return { success: false, error }
    } finally {
      if (!thisRequest.cancelled) {
        setIsSubmitting(false)
        pendingRequest.current = null
      }
    }
  }, [isSubmitting, debounceMs])

  const reset = useCallback(() => {
    setIsSubmitting(false)
    lastSubmitTime.current = 0
    if (pendingRequest.current) {
      pendingRequest.current.cancelled = true
      pendingRequest.current = null
    }
  }, [])

  return { isSubmitting, guardedSubmit, reset }
}

export default useSubmitGuard
