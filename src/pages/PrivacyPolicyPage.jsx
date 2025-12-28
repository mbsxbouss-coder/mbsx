import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../App'
import './LegalPage.css'

const PrivacyPolicyPage = () => {
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
            <h1 className="legal-title">{t('privacyPolicy')}</h1>
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
              <h2>{t('ppIntroTitle')}</h2>
              <p>{t('ppIntroText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('ppDataCollectionTitle')}</h2>
              <p>{t('ppDataCollectionText')}</p>
              <ul>
                <li>{t('ppDataItem1')}</li>
                <li>{t('ppDataItem2')}</li>
                <li>{t('ppDataItem3')}</li>
                <li>{t('ppDataItem4')}</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>{t('ppDataUseTitle')}</h2>
              <p>{t('ppDataUseText')}</p>
              <ul>
                <li>{t('ppUseItem1')}</li>
                <li>{t('ppUseItem2')}</li>
                <li>{t('ppUseItem3')}</li>
                <li>{t('ppUseItem4')}</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>{t('ppDataProtectionTitle')}</h2>
              <p>{t('ppDataProtectionText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('ppCookiesTitle')}</h2>
              <p>{t('ppCookiesText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('ppThirdPartyTitle')}</h2>
              <p>{t('ppThirdPartyText')}</p>
            </section>

            <section className="legal-section">
              <h2>{t('ppUserRightsTitle')}</h2>
              <p>{t('ppUserRightsText')}</p>
              <ul>
                <li>{t('ppRightItem1')}</li>
                <li>{t('ppRightItem2')}</li>
                <li>{t('ppRightItem3')}</li>
                <li>{t('ppRightItem4')}</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>{t('ppContactTitle')}</h2>
              <p>{t('ppContactText')}</p>
              <p className="contact-email">mbsxbouss@gmail.com</p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
