import { useState, useCallback } from 'react'

/**
 * Hook for form validation using Zod schemas
 * @param {Object} schema - Zod schema for validation
 */
export function useFormValidation(schema) {
  const [errors, setErrors] = useState({})

  const validate = useCallback((data) => {
    if (!schema) {
      return { success: true, data }
    }

    const result = schema.safeParse(data)
    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach(err => {
        const field = err.path[0]
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message
        }
      })
      setErrors(fieldErrors)
      return { success: false, errors: fieldErrors }
    }

    setErrors({})
    return { success: true, data: result.data }
  }, [schema])

  const validateField = useCallback((fieldName, value) => {
    if (!schema) return true

    try {
      // Try to validate just this field using pick
      const fieldSchema = schema.pick({ [fieldName]: true })
      const result = fieldSchema.safeParse({ [fieldName]: value })

      if (!result.success) {
        const error = result.error.errors[0]?.message || 'Invalid value'
        setErrors(prev => ({ ...prev, [fieldName]: error }))
        return false
      }

      setErrors(prev => {
        const next = { ...prev }
        delete next[fieldName]
        return next
      })
      return true
    } catch {
      // If pick fails, just clear the error
      return true
    }
  }, [schema])

  const clearError = useCallback((field) => {
    setErrors(prev => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  const hasErrors = Object.keys(errors).length > 0

  return {
    errors,
    validate,
    validateField,
    clearError,
    clearAllErrors,
    hasErrors
  }
}

export default useFormValidation
