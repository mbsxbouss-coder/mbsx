import en from './en.json'
import fr from './fr.json'
import ar from './ar.json'

const translations = { en, fr, ar }

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations.en[key] || key
}

export { translations }
export default translations
