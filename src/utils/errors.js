// Error codes
export const ErrorCodes = {
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_EMAIL_IN_USE: 'AUTH_EMAIL_IN_USE',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  AUTH_WEAK_PASSWORD: 'AUTH_WEAK_PASSWORD',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RATE_LIMITED: 'RATE_LIMITED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

// Map Supabase/API errors to error codes
export function mapSupabaseError(error) {
  if (!error) return null

  const message = error.message?.toLowerCase() || ''
  const code = error.code || ''

  // Auth errors
  if (message.includes('invalid login') || message.includes('invalid credentials')) {
    return { code: ErrorCodes.AUTH_INVALID_CREDENTIALS, original: error }
  }
  if (message.includes('already registered') || message.includes('already exists')) {
    return { code: ErrorCodes.AUTH_EMAIL_IN_USE, original: error }
  }
  if (message.includes('password') && (message.includes('weak') || message.includes('short'))) {
    return { code: ErrorCodes.AUTH_WEAK_PASSWORD, original: error }
  }
  if (message.includes('session') || message.includes('expired') || message.includes('refresh')) {
    return { code: ErrorCodes.AUTH_SESSION_EXPIRED, original: error }
  }

  // Permission errors
  if (code === '42501' || message.includes('permission') || message.includes('denied')) {
    return { code: ErrorCodes.PERMISSION_DENIED, original: error }
  }

  // Not found
  if (code === 'PGRST116' || message.includes('not found')) {
    return { code: ErrorCodes.NOT_FOUND, original: error }
  }

  // Rate limiting
  if (message.includes('rate limit') || message.includes('too many')) {
    return { code: ErrorCodes.RATE_LIMITED, original: error }
  }

  // Network errors
  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
    return { code: ErrorCodes.NETWORK_ERROR, original: error }
  }

  return { code: ErrorCodes.UNKNOWN_ERROR, original: error }
}

// Get user-friendly error message using translation function
export function getErrorMessage(errorCode, t) {
  const messages = {
    [ErrorCodes.AUTH_INVALID_CREDENTIALS]: t('invalidCredentials'),
    [ErrorCodes.AUTH_EMAIL_IN_USE]: t('emailInUse'),
    [ErrorCodes.AUTH_WEAK_PASSWORD]: t('passwordTooShort'),
    [ErrorCodes.AUTH_SESSION_EXPIRED]: t('sessionExpired') || 'Session expired. Please log in again.',
    [ErrorCodes.NETWORK_ERROR]: t('networkError'),
    [ErrorCodes.VALIDATION_ERROR]: t('validationError'),
    [ErrorCodes.NOT_FOUND]: t('notFound') || 'Resource not found.',
    [ErrorCodes.PERMISSION_DENIED]: t('permissionDenied'),
    [ErrorCodes.RATE_LIMITED]: t('rateLimited') || 'Too many requests. Please try again later.',
    [ErrorCodes.UNKNOWN_ERROR]: t('unknownError')
  }
  return messages[errorCode] || t('unknownError')
}

// Helper to handle errors consistently
export function handleServiceError(error, t) {
  const mapped = mapSupabaseError(error)
  const message = getErrorMessage(mapped.code, t)
  console.error(`[${mapped.code}]`, error)
  return { code: mapped.code, message, original: error }
}
