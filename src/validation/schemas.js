// Simple validation functions (no external dependency)
// Can be replaced with Zod when installed: npm install zod

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone pattern - flexible international format
const phonePattern = /^[+]?[\d\s\-()]{8,}$/

/**
 * Simple schema builder for validation
 */
const createSchema = (fields) => ({
  safeParse: (data) => {
    const errors = []

    for (const [fieldName, rules] of Object.entries(fields)) {
      const value = data[fieldName]

      // Required check
      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors.push({ path: [fieldName], message: rules.requiredMessage || 'This field is required' })
        continue
      }

      // Skip further validation if empty and not required
      if (!value && !rules.required) continue

      // Min length
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push({ path: [fieldName], message: rules.minLengthMessage || `Must be at least ${rules.minLength} characters` })
      }

      // Email validation
      if (rules.email && value && !emailPattern.test(value)) {
        errors.push({ path: [fieldName], message: rules.emailMessage || 'Invalid email address' })
      }

      // Phone validation
      if (rules.phone && value && !phonePattern.test(value)) {
        errors.push({ path: [fieldName], message: rules.phoneMessage || 'Invalid phone number' })
      }

      // Custom validator
      if (rules.validate && value) {
        const result = rules.validate(value, data)
        if (result !== true) {
          errors.push({ path: [fieldName], message: result || 'Invalid value' })
        }
      }

      // Enum validation
      if (rules.enum && value && !rules.enum.includes(value)) {
        errors.push({ path: [fieldName], message: rules.enumMessage || 'Please select a valid option' })
      }

      // Array min length
      if (rules.arrayMinLength && Array.isArray(value) && value.length < rules.arrayMinLength) {
        errors.push({ path: [fieldName], message: rules.arrayMinLengthMessage || `Please select at least ${rules.arrayMinLength} item(s)` })
      }
    }

    if (errors.length > 0) {
      return { success: false, error: { errors } }
    }

    return { success: true, data }
  },
  pick: (keys) => {
    const pickedFields = {}
    for (const key of Object.keys(keys)) {
      if (fields[key]) {
        pickedFields[key] = fields[key]
      }
    }
    return createSchema(pickedFields)
  }
})

// Service Request Schema
export const serviceRequestSchema = createSchema({
  institutionName: {
    required: true,
    requiredMessage: 'Institution name is required'
  },
  sector: {
    required: true,
    enum: ['media', 'economic'],
    enumMessage: 'Please select a sector'
  },
  serviceType: {
    required: true,
    enum: ['report', 'dashboard', 'consultation'],
    enumMessage: 'Please select a service type'
  },
  description: {
    required: true,
    minLength: 10,
    minLengthMessage: 'Description must be at least 10 characters'
  },
  email: {
    required: true,
    email: true,
    emailMessage: 'Please enter a valid email address'
  },
  phone: {
    phone: true,
    phoneMessage: 'Please enter a valid phone number'
  }
})

// Ad Request Schema
export const adRequestSchema = createSchema({
  institutionName: {
    required: true,
    requiredMessage: 'Institution name is required'
  },
  sector: {
    required: true,
    requiredMessage: 'Sector is required'
  },
  adTypes: {
    arrayMinLength: 1,
    arrayMinLengthMessage: 'Please select at least one ad type'
  },
  adDetails: {
    required: true,
    minLength: 10,
    minLengthMessage: 'Details must be at least 10 characters'
  },
  email: {
    required: true,
    email: true,
    emailMessage: 'Please enter a valid email address'
  },
  phone: {
    phone: true,
    phoneMessage: 'Please enter a valid phone number'
  }
})

// Login Schema
export const loginSchema = createSchema({
  email: {
    required: true,
    email: true,
    requiredMessage: 'Email is required',
    emailMessage: 'Please enter a valid email address'
  },
  password: {
    required: true,
    requiredMessage: 'Password is required'
  }
})

// Signup Schema
export const signupSchema = createSchema({
  fullName: {
    required: true,
    minLength: 2,
    requiredMessage: 'Full name is required',
    minLengthMessage: 'Name must be at least 2 characters'
  },
  email: {
    required: true,
    email: true,
    requiredMessage: 'Email is required',
    emailMessage: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    requiredMessage: 'Password is required',
    minLengthMessage: 'Password must be at least 8 characters'
  },
  confirmPassword: {
    required: true,
    validate: (value, data) => value === data.password || 'Passwords do not match'
  },
  agreeTerms: {
    validate: (value) => value === true || 'You must agree to the terms of service'
  }
})

// Profile Schema
export const profileSchema = createSchema({
  fullName: {
    required: true,
    minLength: 2,
    requiredMessage: 'Full name is required',
    minLengthMessage: 'Name must be at least 2 characters'
  },
  phone: {
    phone: true,
    phoneMessage: 'Please enter a valid phone number'
  }
})
