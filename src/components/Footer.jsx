import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../App'
import './Footer.css'

const Footer = () => {
  const { t, language } = useLanguage()

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-bg">
        <div className="footer-gradient" />
      </div>

      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-letter">M</span>
              <span className="logo-letter">B</span>
              <span className="logo-letter">S</span>
              <span className="logo-letter accent">x</span>
              <img src="/data-logo-removebg-preview.png" alt="MBSx Data" className="logo-icon" />
            </div>
            <p className="footer-tagline">{t('footerTagline')}</p>
            <div className="footer-social">
              <a href="https://x.com/BoussMarou40219" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/maroua-boussadia-b1652334b?trk=contact-info" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@MarouaBouSs" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">{t('quickLinks')}</h4>
              <nav className="footer-nav">
                <button onClick={() => scrollToSection('hero')}>{t('home')}</button>
                <button onClick={() => scrollToSection('services')}>{t('mediaServices')}</button>
                <button onClick={() => scrollToSection('features')}>{t('economicServices')}</button>
                <button onClick={() => scrollToSection('service-request')}>{t('reports')}</button>
              </nav>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">{t('contact')}</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>mbsxbouss@gmail.com</span>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span>+213 696 31 20 16</span>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{t('location')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MBSx. {t('allRightsReserved')}</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">{t('privacyPolicy')}</Link>
            <Link to="/terms-and-conditions">{t('termsAndConditions')}</Link>
          </div>
        </div>

        {language !== 'ar' && (
          <div className="dev-signature">
            <span className="dev-text">Crafted by</span>
            <a href="https://www.sitedz.store" target="_blank" rel="noopener noreferrer" className="dev-link">
              <span className="dev-name">site</span>
              <span className="dev-name-accent">Dz</span>
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
