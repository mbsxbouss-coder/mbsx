import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import './LegalPage.css'

const TermsAndConditionsPage = () => {
  const { t, language } = useLanguage()

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container">
          <motion.div
            className="legal-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t('backToHome')}
            </Link>
            <h1 className="legal-title">{t('termsAndConditions')}</h1>
            <p className="legal-update">{t('lastUpdated')}: {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US')}</p>
          </motion.div>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <motion.div
            className="legal-sections"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <section className="legal-section">
              <h2>{t('tcIntroTitle')}</h2>
              <p>{t('tcIntroText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcAcceptanceTitle')}</h2>
              <p>{t('tcAcceptanceText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcServicesTitle')}</h2>
              <p>{t('tcServicesText')}</p>
              <ul>
                <li>{t('tcServiceItem1')}</li>
                <li>{t('tcServiceItem2')}</li>
                <li>{t('tcServiceItem3')}</li>
                <li>{t('tcServiceItem4')}</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>{t('tcUserObligationsTitle')}</h2>
              <p>{t('tcUserObligationsText')}</p>
              <ul>
                <li>{t('tcObligationItem1')}</li>
                <li>{t('tcObligationItem2')}</li>
                <li>{t('tcObligationItem3')}</li>
                <li>{t('tcObligationItem4')}</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>{t('tcIntellectualPropertyTitle')}</h2>
              <p>{t('tcIntellectualPropertyText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcLiabilityTitle')}</h2>
              <p>{t('tcLiabilityText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcModificationsTitle')}</h2>
              <p>{t('tcModificationsText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcTerminationTitle')}</h2>
              <p>{t('tcTerminationText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcGoverningLawTitle')}</h2>
              <p>{t('tcGoverningLawText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('tcContactTitle')}</h2>
              <p>{t('tcContactText')}</p>
              <p className="contact-email">mbsxbouss@gmail.com</p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage
