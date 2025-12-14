import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntroSidebar from './components/IntroSidebar'
import FloatingNav from './components/FloatingNav'
import FloatingActions from './components/FloatingActions'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import NotificationPanel from './components/NotificationPanel'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DataJournalismPage from './pages/DataJournalismPage'
import OurServicesPage from './pages/OurServicesPage'
import KnowledgeCenterPage from './pages/KnowledgeCenterPage'
import PublicationsPage from './pages/PublicationsPage'
import AdvertisementsPage from './pages/AdvertisementsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

// Theme Context
const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// Language Context
const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

// Translations
const translations = {
  en: {
    // Intro Sidebar
    welcome: 'Welcome to MBSx',
    tagline: 'Your trusted partner for data-driven insights and journalism excellence',
    selectLanguage: 'Select your language',
    enterSite: 'Enter Site',

    // Navigation
    home: 'Home',
    mediaServices: 'Media Services',
    economicServices: 'Economic Services',
    reports: 'Reports',
    dashboards: 'Dashboards',
    training: 'Training',

    // Hero
    heroTitle: 'Data Journalism',
    heroTitleHighlight: `Media That Inspires
Decisions That Shape`,
    heroSubtitle: 'Transforming complex data into compelling narratives. We empower media and economic institutions with actionable insights, custom reports, and strategic consulting.',
    exploreServices: 'Explore Services',
    requestConsultation: 'Request Consultation',

    // Services
    servicesLabel: 'Our Expertise',
    servicesTitle: 'Tailored Solutions for Your Sector',
    servicesSubtitle: 'Whether you are a media organization seeking impactful stories or an economic institution requiring strategic insights, we deliver.',

    mediaSector: 'Media Sector',
    mediaDesc: 'Comprehensive data services designed for news organizations, broadcasters, and digital publishers.',
    economicSector: 'Economic Sector',
    economicDesc: 'Strategic insights and analytics tailored for financial institutions, corporations, and policymakers.',

    dataReports: 'Data Reports',
    dataReportsDesc: 'In-depth analysis and visualizations that tell your story with authority.',
    interactiveDashboards: 'Interactive Dashboards',
    interactiveDashboardsDesc: 'Real-time data visualization platforms customized to your needs.',
    strategicConsulting: 'Strategic Consulting',
    strategicConsultingDesc: 'Expert guidance on data strategy and implementation.',
    professionalTraining: 'Professional Training',
    professionalTrainingDesc: 'Upskill your team with our data journalism workshops.',

    // Features
    featuresLabel: 'Why MBSx',
    featuresTitle: 'Excellence in Every Detail',
    featuresSubtitle: 'We combine cutting-edge technology with journalistic integrity to deliver unparalleled data services.',

    aiPowered: 'AI-Powered Analysis',
    aiPoweredDesc: 'Leverage machine learning to uncover hidden patterns and trends in your data.',
    multiLanguage: 'Multilingual Support',
    multiLanguageDesc: 'Full support for Arabic, French, and English content and interfaces.',
    realTime: 'Real-Time Updates',
    realTimeDesc: 'Stay informed with live notifications and instant report delivery.',
    secureData: 'Enterprise Security',
    secureDataDesc: 'Bank-level encryption and compliance with international data standards.',

    // Forms
    requestService: 'Request Service',
    advertiseWithUs: 'Advertise with Us',
    institutionName: 'Institution / Company Name',
    sector: 'Sector',
    media: 'Media',
    economic: 'Economic',
    serviceType: 'Service Type',
    report: 'Report',
    dashboard: 'Dashboard',
    consultation: 'Consultation',
    description: 'Description',
    descriptionPlaceholder: 'Tell us about your project requirements...',
    email: 'Email Address',
    phone: 'Phone Number',
    submit: 'Submit Request',

    adType: 'Advertisement Type',
    jobVacancy: 'Job Vacancy',
    businessOpportunity: 'Business Opportunity',
    tender: 'Tender / Bids',
    servicePromotion: 'Service Promotion',
    sponsoredReport: 'Sponsored Report',
    productLaunch: 'New Product / Project Launch',
    adDetails: 'Advertisement Details',
    adDetailsPlaceholder: 'Describe your advertisement and preferred duration...',
    boostAd: 'Boost this advertisement for premium visibility',

    successMessage: 'Your request has been sent successfully. We will contact you soon.',

    // Footer
    footerTagline: 'Transforming data into stories that matter.',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',

    // Search
    search: 'Search',
    searchPlaceholder: 'Search reports, services, and more...',
    keywordSearch: 'Keyword Search',
    aiSearch: 'AI Search',
    startSearching: 'Start searching',
    searchHint: 'Enter keywords to find reports, dashboards, and services',

    // Notifications
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    markAllRead: 'Mark all as read',

    // About Us
    aboutUsLabel: 'About Us',
    aboutUsTitle: 'Data Journalism Agency',
    aboutUsDesc: 'A media platform that combines the power of data with the depth of journalistic analysis. We provide interactive content that serves media institutions in developing their content. We aim to transform data into knowledge for companies and economic entities in society and decision-making, while providing analytics and dashboards that support their strategic decisions.',
    visionTitle: 'Our Vision',
    visionDesc: 'To become pioneers in building smart, data-driven media that combines analysis and innovation to serve decision-makers.',
    missionTitle: 'Our Mission',
    missionDesc: 'We work to develop the media and economic landscape through innovative data-based solutions.',
    valuesTitle: 'Our Values',
    value1: 'We believe that data is not just numbers, but intellectual energy that makes a difference.',
    value2: 'We continuously strive to provide data and media content that reflects the highest standards of accuracy and excellence.',
    value3: 'We work according to professional ethics to ensure the reliability of the content we provide.',
    value4: 'Understanding numbers is the key to smart decisions.',
    value5: 'We aim for our data to be a tool for development and informed decision-making.',
    value6: 'Creativity is only achieved through learning and keeping pace with change.',
    ceoTitle: 'CEO & Founder',
    ceoName: 'Maroua Bosadia',
    ceoDesc: 'Maroua leads the organization with focus, integrity, and a passion for purposeful journalism, continuously empowering its growth through thoughtful guidance and ongoing innovation.',

    // Data Journalism Page
    dataJournalism: 'Data Journalism',
    djLabel: 'Data Journalism',
    djTitle: 'Data Journalism',
    djSubtitle: 'Transforming raw data into compelling stories that inform, engage, and drive decisions in the digital age.',

    // Concepts and Fundamentals
    djConceptsTitle: 'Concepts and Fundamentals',
    djConcept1Title: 'Data Collection',
    djConcept1Desc: 'Systematic gathering of structured and unstructured data from diverse sources including databases, APIs, public records, and field research.',
    djConcept2Title: 'Data Analysis',
    djConcept2Desc: 'Applying statistical methods and analytical frameworks to identify patterns, correlations, and insights within complex datasets.',
    djConcept3Title: 'Data Visualization',
    djConcept3Desc: 'Converting analytical findings into compelling visual narratives through charts, graphs, maps, and interactive elements.',

    // Applications and Features
    djApplicationsTitle: 'Applications and Features',
    djApp1Title: 'Interactive Storytelling',
    djApp1Desc: 'Creating immersive narratives that allow readers to explore data at their own pace and depth.',
    djApp2Title: 'Real-time Monitoring',
    djApp2Desc: 'Tracking live data streams for breaking news coverage and ongoing story development.',
    djApp3Title: 'Investigative Reporting',
    djApp3Desc: 'Using data analysis to uncover hidden patterns and support investigative journalism.',
    djApp4Title: 'Audience Engagement',
    djApp4Desc: 'Developing data-driven content that resonates with target audiences and drives meaningful engagement.',

    // Reports and Indicators
    djReportsTitle: 'Reports and Indicators',
    djReport1Title: 'Economic Indicators',
    djReport1Desc: 'Comprehensive analysis of market trends, economic performance, and financial forecasts.',
    djReport2Title: 'Social Metrics',
    djReport2Desc: 'Measuring social impact, demographic shifts, and community development indicators.',
    djReport3Title: 'Industry Analysis',
    djReport3Desc: 'Sector-specific reports covering trends, challenges, and opportunities across industries.',

    // Current Situation
    djCurrentTitle: 'The Current Situation',
    djCurrentIntro: 'Data journalism has evolved significantly in recent years, becoming an essential component of modern newsrooms and media organizations worldwide.',
    djCurrent1: 'Growing demand for data-driven narratives across all media platforms and formats.',
    djCurrent2: 'Increasing integration of AI and machine learning tools in journalistic workflows.',
    djCurrent3: 'Rising importance of data literacy among journalists and media professionals.',

    // Trends
    djTrendsTitle: 'Trends and Directions',
    djTrend1Title: 'AI Integration',
    djTrend1Desc: 'Leveraging artificial intelligence for automated data analysis, pattern recognition, and content generation.',
    djTrend2Title: 'Mobile-First Design',
    djTrend2Desc: 'Optimizing data visualizations and interactive content for mobile consumption.',
    djTrend3Title: 'Collaborative Journalism',
    djTrend3Desc: 'Cross-border partnerships enabling large-scale data investigations and shared resources.',

    // Future
    djFutureTitle: 'Future Prospects',
    djFuture1Title: 'Immersive Experiences',
    djFuture1Desc: 'Virtual and augmented reality technologies will transform how audiences interact with data-driven stories.',
    djFuture2Title: 'Predictive Analytics',
    djFuture2Desc: 'Advanced modeling will enable journalists to anticipate trends and provide forward-looking analysis.',
    djFuture3Title: 'Democratized Data',
    djFuture3Desc: 'Improved tools will make data journalism accessible to smaller newsrooms and independent journalists.',

    // Our Services Page
    ourServices: 'Our Services',
    osLabel: 'Our Services',
    osTitle: 'Our Services',
    osSubtitle: 'Comprehensive solutions tailored to meet the needs of media and economic institutions with excellence and precision.',

    // Reports Section
    osReportsTitle: 'Reports',
    osReportEconomy: 'Economy',
    osReportEconomyDesc: 'In-depth economic analysis covering market trends, financial indicators, and economic forecasts.',
    osReportEnergy: 'Energy and Resources',
    osReportEnergyDesc: 'Comprehensive reports on energy markets, natural resources, and sustainability initiatives.',
    osReportTech: 'Technology and Structuring',
    osReportTechDesc: 'Analysis of technological developments, digital transformation, and organizational restructuring.',
    osReportEnvironment: 'Environment and Climate',
    osReportEnvironmentDesc: 'Environmental impact assessments, climate change analysis, and sustainability reports.',

    // Dashboards Section
    osDashboardsTitle: 'Dashboards',
    osDashboardMedia: 'Media Institutions Monitoring Dashboards',
    osDashboardMediaDesc: 'Real-time dashboards designed to track media performance, audience engagement, and content analytics for news organizations and broadcasters.',
    osDashboardEconomic: 'Economic Institutions Monitoring Dashboards',
    osDashboardEconomicDesc: 'Comprehensive dashboards for financial institutions, tracking market indicators, investment performance, and economic metrics.',
    osFeatureRealtime: 'Real-time',
    osFeatureInteractive: 'Interactive',
    osFeatureCustom: 'Customizable',

    // Consulting Section
    osConsultingTitle: 'Consultations and Training',
    osConsultMedia: 'Media Consultations',
    osConsultMediaDesc: 'Strategic guidance for media organizations on content strategy, audience development, and digital transformation.',
    osConsultInvestment: 'Investment Consultations',
    osConsultInvestmentDesc: 'Expert advisory services on investment opportunities, risk assessment, and portfolio optimization.',
    osConsultDevelopment: 'Development and Capacity Building',
    osConsultDevelopmentDesc: 'Training programs and workshops designed to enhance skills and build institutional capabilities.',

    // CTA
    osCtaTitle: 'Ready to Transform Your Data?',
    osCtaDesc: 'Contact us today to discuss how our services can help you achieve your goals.',
    osCtaButton: 'Request Service',

    // Knowledge Center Page
    knowledgeCenter: 'Knowledge Center',
    kcLabel: 'Knowledge Center',
    kcTitle: 'Knowledge Center',
    kcSubtitle: 'Your gateway to comprehensive data journalism resources, research, and collaborative learning.',

    // Digital Library Section
    kcDigitalLibraryTitle: 'Digital Library',
    kcDigitalLibraryDesc: 'Access our comprehensive collection of resources designed to enhance your understanding of data journalism and analytics.',
    kcArticlesTitle: 'Articles and Studies',
    kcArticlesDesc: 'In-depth research papers, case studies, and analytical articles covering the latest trends in data journalism and media analytics.',
    kcDictionaryTitle: 'Data Dictionary and Vocabulary',
    kcDictionaryDesc: 'Comprehensive glossary of data journalism terms, definitions, and standardized vocabulary for professionals in the field.',
    kcBookletsTitle: 'Electronic Booklets',
    kcBookletsDesc: 'Downloadable guides, manuals, and educational materials for data journalism practitioners at all skill levels.',

    // Knowledge Forum Section
    kcForumTitle: 'Knowledge Forum',
    kcForumDesc: 'Join our community of data journalism professionals and enthusiasts for meaningful discussions and knowledge sharing.',
    kcDiscussionsTitle: 'Knowledge-based Discussions and Dialogues',
    kcDiscussionsDesc: 'Engage in thoughtful conversations about data journalism methodologies, best practices, and emerging trends with industry experts.',
    kcForumFeature1: 'Expert-led Discussions',
    kcForumFeature1Desc: 'Participate in forums moderated by industry leaders and experienced data journalists.',
    kcForumFeature2: 'Collaborative Learning',
    kcForumFeature2Desc: 'Share insights, ask questions, and learn from peers in a supportive community environment.',
    kcForumFeature3: 'Trending Topics',
    kcForumFeature3Desc: 'Stay updated with discussions on the latest developments in data journalism and media analytics.',

    // CTA
    kcCtaTitle: 'Expand Your Knowledge',
    kcCtaDesc: 'Join our knowledge community and access exclusive resources, discussions, and learning opportunities.',
    kcCtaButton: 'Get Started',

    // Publications Page
    publications: 'Publications',
    pubLabel: 'Publications',
    pubTitle: 'Publications',
    pubSubtitle: 'Explore our comprehensive collection of periodic and special publications covering data journalism and media analytics.',

    // Periodic Publications
    pubPeriodicTitle: 'Periodic Publications',
    pubPeriodicDesc: 'Regular publications delivering timely insights and analysis on key topics in data journalism.',

    // Monthly
    pubMonthlyTitle: 'Monthly',
    pubMonthlyBadge: 'Monthly',
    pubMonthly1: 'Data Trends Report',
    pubMonthly1Desc: 'Monthly analysis of emerging trends in data journalism and media analytics.',
    pubMonthly2: 'Industry Insights',
    pubMonthly2Desc: 'Comprehensive coverage of industry developments and best practices.',
    pubMonthly3: 'Case Studies',
    pubMonthly3Desc: 'Real-world examples and success stories from leading organizations.',

    // Annual
    pubAnnualTitle: 'Annual',
    pubAnnualBadge: 'Annual',
    pubAnnual1: 'Annual Report',
    pubAnnual1Desc: 'Comprehensive yearly review of data journalism landscape and achievements.',
    pubAnnual2: 'Market Analysis',
    pubAnnual2Desc: 'In-depth analysis of market trends and future projections.',
    pubAnnual3: 'Impact Assessment',
    pubAnnual3Desc: 'Evaluation of data journalism impact on media and society.',

    // Special Publications
    pubSpecialTitle: 'Special Publications',
    pubSpecialDesc: 'Exclusive publications on specialized topics and emerging areas of data journalism.',
    pubSpecialTag: 'Special',
    pubSpecial1: 'Research Papers',
    pubSpecial1Desc: 'Original research and academic contributions to the field of data journalism.',
    pubSpecial2: 'White Papers',
    pubSpecial2Desc: 'Expert analysis and recommendations on critical industry topics.',
    pubSpecial3: 'Best Practices Guide',
    pubSpecial3Desc: 'Comprehensive guides for implementing data journalism methodologies.',
    pubLearnMore: 'Learn More',

    // CTA
    pubCtaTitle: 'Stay Informed',
    pubCtaDesc: 'Subscribe to receive our latest publications and stay ahead in the world of data journalism.',
    pubCtaButton: 'Subscribe Now',

    // Advertisements Page
    advertisements: 'Advertisements',
    adsLabel: 'Advertisements',
    adsTitle: 'Advertisements',
    adsSubtitle: 'Reach your target audience through our platform with institutional advertisements and business opportunities.',

    // Categories
    adsInstitutionalTitle: 'Institutional Advertisements',
    adsInstitutionalDesc: 'Professional advertising solutions for organizations and businesses.',
    adsJobs: 'Job Vacancies',
    adsJobsDesc: 'Post job openings and reach qualified candidates in the media and data journalism sectors.',
    adsBusinessOpp: 'Business Opportunities',
    adsBusinessOppDesc: 'Promote partnerships, investments, and business collaboration opportunities.',

    // Form
    adsFormTitle: 'Ad Request Form',
    adsFormDesc: 'Fill out the form below to submit your advertisement request. Our team will review and contact you shortly.',
    adsInstitutionName: 'Institution / Company Name',
    adsInstitutionPlaceholder: 'Enter your institution name',
    adsSector: 'Sector / Activity',
    adsSectorPlaceholder: 'Enter your sector or activity',
    adsAdType: 'Advertisement Type',
    adsTypeJob: 'Job Advertisement',
    adsTypeBusiness: 'Business Opportunity',
    adsTypeTender: 'Tender / Bids',
    adsTypeService: 'Service Promotion',
    adsTypeSponsored: 'Sponsored Report',
    adsTypeProduct: 'New Product / Project',
    adsDetails: 'Advertisement Details',
    adsDetailsPlaceholder: 'Describe your advertisement content and requirements...',
    adsDuration: 'Duration',
    adsDurationPlaceholder: 'Select duration',
    adsDuration1Week: '1 Week',
    adsDuration2Weeks: '2 Weeks',
    adsDuration1Month: '1 Month',
    adsDuration3Months: '3 Months',
    adsDuration6Months: '6 Months',
    adsDuration1Year: '1 Year',
    adsBoost: 'Boost Advertisement',
    adsBoostYes: 'Yes',
    adsBoostNo: 'No',
    adsEmail: 'Email Address',
    adsEmailPlaceholder: 'Enter your email',
    adsPhone: 'Phone Number',
    adsPhonePlaceholder: 'Enter your phone number',
    adsSubmitBtn: 'Submit Request',
    adsSubmitSuccess: 'Request Sent!',
    adsSuccessMessage: 'Your advertisement request has been submitted successfully. We will contact you soon.',

    // Login Page
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Sign in to your account to continue',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginButton: 'Sign In',
    noAccount: "Don't have an account?",
    signupLink: 'Sign up',

    // Signup Page
    signupTitle: 'Create Account',
    signupSubtitle: 'Join MBSx to access data journalism resources',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    agreeToTerms: 'I agree to the',
    termsOfService: 'Terms of Service',
    signupButton: 'Create Account',
    haveAccount: 'Already have an account?',
    loginLink: 'Sign in',
    passwordMismatch: 'Passwords do not match',
    agreeTermsError: 'You must agree to the terms of service',
  },
  fr: {
    welcome: 'Bienvenue chez MBSx',
    tagline: 'Votre partenaire de confiance pour des analyses basées sur les données',
    selectLanguage: 'Sélectionnez votre langue',
    enterSite: 'Entrer',

    home: 'Accueil',
    mediaServices: 'Services Médias',
    economicServices: 'Services Économiques',
    reports: 'Rapports',
    dashboards: 'Tableaux de Bord',
    training: 'Formation',

    heroTitle: 'Journalisme de Données',
    heroTitleHighlight: `Médias Qui Inspirent
Décisions Qui Façonnent`,
    heroSubtitle: 'Transformer des données complexes en récits captivants. Nous donnons aux institutions médiatiques et économiques des informations exploitables.',
    exploreServices: 'Explorer les Services',
    requestConsultation: 'Demander une Consultation',

    servicesLabel: 'Notre Expertise',
    servicesTitle: 'Solutions Sur Mesure pour Votre Secteur',
    servicesSubtitle: 'Que vous soyez une organisation médiatique ou une institution économique, nous livrons.',

    mediaSector: 'Secteur Médias',
    mediaDesc: 'Services de données complets conçus pour les organisations de presse et les éditeurs numériques.',
    economicSector: 'Secteur Économique',
    economicDesc: 'Analyses stratégiques adaptées aux institutions financières et aux décideurs.',

    dataReports: 'Rapports de Données',
    dataReportsDesc: 'Analyses approfondies et visualisations qui racontent votre histoire avec autorité.',
    interactiveDashboards: 'Tableaux de Bord Interactifs',
    interactiveDashboardsDesc: 'Plateformes de visualisation de données en temps réel personnalisées.',
    strategicConsulting: 'Conseil Stratégique',
    strategicConsultingDesc: 'Conseils d\'experts en stratégie et mise en œuvre des données.',
    professionalTraining: 'Formation Professionnelle',
    professionalTrainingDesc: 'Perfectionnez votre équipe avec nos ateliers de journalisme de données.',

    featuresLabel: 'Pourquoi MBSx',
    featuresTitle: 'Excellence dans Chaque Détail',
    featuresSubtitle: 'Nous combinons technologie de pointe et intégrité journalistique.',

    aiPowered: 'Analyse IA',
    aiPoweredDesc: 'Exploitez l\'apprentissage automatique pour découvrir des tendances cachées.',
    multiLanguage: 'Support Multilingue',
    multiLanguageDesc: 'Support complet pour le contenu en arabe, français et anglais.',
    realTime: 'Mises à Jour en Direct',
    realTimeDesc: 'Restez informé avec des notifications en direct.',
    secureData: 'Sécurité Entreprise',
    secureDataDesc: 'Cryptage bancaire et conformité aux normes internationales.',

    requestService: 'Demander un Service',
    advertiseWithUs: 'Annoncez chez Nous',
    institutionName: 'Nom de l\'Institution',
    sector: 'Secteur',
    media: 'Médias',
    economic: 'Économique',
    serviceType: 'Type de Service',
    report: 'Rapport',
    dashboard: 'Tableau de Bord',
    consultation: 'Consultation',
    description: 'Description',
    descriptionPlaceholder: 'Décrivez vos besoins de projet...',
    email: 'Adresse Email',
    phone: 'Numéro de Téléphone',
    submit: 'Soumettre',

    adType: 'Type d\'Annonce',
    jobVacancy: 'Offre d\'Emploi',
    businessOpportunity: 'Opportunité d\'Affaires',
    tender: 'Appel d\'Offres',
    servicePromotion: 'Promotion de Service',
    sponsoredReport: 'Rapport Sponsorisé',
    productLaunch: 'Lancement de Produit',
    adDetails: 'Détails de l\'Annonce',
    adDetailsPlaceholder: 'Décrivez votre annonce...',
    boostAd: 'Booster cette annonce',

    successMessage: 'Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.',

    footerTagline: 'Transformer les données en histoires qui comptent.',
    quickLinks: 'Liens Rapides',
    contact: 'Contact',
    followUs: 'Suivez-nous',
    allRightsReserved: 'Tous droits réservés.',

    search: 'Rechercher',
    searchPlaceholder: 'Rechercher rapports, services...',
    keywordSearch: 'Recherche par Mot-clé',
    aiSearch: 'Recherche IA',
    startSearching: 'Commencer la recherche',
    searchHint: 'Entrez des mots-clés pour trouver des rapports, tableaux de bord et services',

    notifications: 'Notifications',
    noNotifications: 'Aucune nouvelle notification',
    markAllRead: 'Tout marquer comme lu',

    // About Us
    aboutUsLabel: 'À Propos',
    aboutUsTitle: 'Agence de Journalisme de Données',
    aboutUsDesc: 'Une plateforme médiatique qui allie la puissance des données à la profondeur de l\'analyse journalistique. Nous fournissons du contenu interactif au service des institutions médiatiques. Nous visons à transformer les données en connaissances pour les entreprises et les entités économiques, tout en fournissant des analyses et des tableaux de bord qui soutiennent leurs décisions stratégiques.',
    visionTitle: 'Notre Vision',
    visionDesc: 'Devenir des pionniers dans la construction de médias intelligents basés sur les données, alliant analyse et innovation au service des décideurs.',
    missionTitle: 'Notre Mission',
    missionDesc: 'Nous travaillons à développer le paysage médiatique et économique à travers des solutions innovantes basées sur les données.',
    valuesTitle: 'Nos Valeurs',
    value1: 'Nous croyons que les données ne sont pas de simples chiffres, mais une énergie intellectuelle qui fait la différence.',
    value2: 'Nous nous efforçons continuellement de fournir un contenu qui reflète les plus hauts standards de précision et d\'excellence.',
    value3: 'Nous travaillons selon l\'éthique professionnelle pour garantir la fiabilité du contenu que nous fournissons.',
    value4: 'Comprendre les chiffres est la clé des décisions intelligentes.',
    value5: 'Nous visons que nos données soient un outil de développement et de prise de décision éclairée.',
    value6: 'La créativité ne s\'atteint que par l\'apprentissage et l\'adaptation au changement.',
    ceoTitle: 'PDG & Fondatrice',
    ceoName: 'Maroua Bosadia',
    ceoDesc: 'Maroua dirige l\'organisation avec concentration, intégrité et passion pour un journalisme engagé, en favorisant continuellement sa croissance grâce à une orientation réfléchie et une innovation constante.',

    // Data Journalism Page
    dataJournalism: 'Journalisme de Données',
    djLabel: 'Journalisme de Données',
    djTitle: 'Journalisme de Données',
    djSubtitle: 'Transformer les données brutes en histoires captivantes qui informent, engagent et orientent les décisions à l\'ère numérique.',

    // Concepts and Fundamentals
    djConceptsTitle: 'Concepts et Fondamentaux',
    djConcept1Title: 'Collecte de Données',
    djConcept1Desc: 'Collecte systématique de données structurées et non structurées provenant de sources diverses incluant bases de données, APIs, archives publiques et recherche terrain.',
    djConcept2Title: 'Analyse de Données',
    djConcept2Desc: 'Application de méthodes statistiques et cadres analytiques pour identifier des modèles, corrélations et insights dans des ensembles de données complexes.',
    djConcept3Title: 'Visualisation de Données',
    djConcept3Desc: 'Conversion des résultats analytiques en récits visuels captivants à travers graphiques, cartes et éléments interactifs.',

    // Applications and Features
    djApplicationsTitle: 'Applications et Caractéristiques',
    djApp1Title: 'Narration Interactive',
    djApp1Desc: 'Création de récits immersifs permettant aux lecteurs d\'explorer les données à leur propre rythme.',
    djApp2Title: 'Surveillance en Temps Réel',
    djApp2Desc: 'Suivi des flux de données en direct pour la couverture des actualités et le développement continu des histoires.',
    djApp3Title: 'Journalisme d\'Investigation',
    djApp3Desc: 'Utilisation de l\'analyse de données pour découvrir des modèles cachés et soutenir le journalisme d\'investigation.',
    djApp4Title: 'Engagement du Public',
    djApp4Desc: 'Développement de contenu basé sur les données qui résonne avec les audiences cibles.',

    // Reports and Indicators
    djReportsTitle: 'Rapports et Indicateurs',
    djReport1Title: 'Indicateurs Économiques',
    djReport1Desc: 'Analyse complète des tendances du marché, performances économiques et prévisions financières.',
    djReport2Title: 'Métriques Sociales',
    djReport2Desc: 'Mesure de l\'impact social, des changements démographiques et des indicateurs de développement communautaire.',
    djReport3Title: 'Analyse Sectorielle',
    djReport3Desc: 'Rapports spécifiques par secteur couvrant tendances, défis et opportunités.',

    // Current Situation
    djCurrentTitle: 'La Situation Actuelle',
    djCurrentIntro: 'Le journalisme de données a considérablement évolué ces dernières années, devenant un composant essentiel des rédactions modernes.',
    djCurrent1: 'Demande croissante de récits basés sur les données sur toutes les plateformes médiatiques.',
    djCurrent2: 'Intégration croissante des outils d\'IA et d\'apprentissage automatique dans les flux de travail journalistiques.',
    djCurrent3: 'Importance croissante de la littératie des données parmi les journalistes et professionnels des médias.',

    // Trends
    djTrendsTitle: 'Tendances et Orientations',
    djTrend1Title: 'Intégration de l\'IA',
    djTrend1Desc: 'Exploitation de l\'intelligence artificielle pour l\'analyse automatisée et la génération de contenu.',
    djTrend2Title: 'Conception Mobile-First',
    djTrend2Desc: 'Optimisation des visualisations de données et du contenu interactif pour la consommation mobile.',
    djTrend3Title: 'Journalisme Collaboratif',
    djTrend3Desc: 'Partenariats transfrontaliers permettant des investigations de données à grande échelle.',

    // Future
    djFutureTitle: 'Perspectives Futures',
    djFuture1Title: 'Expériences Immersives',
    djFuture1Desc: 'Les technologies VR et AR transformeront la façon dont les audiences interagissent avec les histoires basées sur les données.',
    djFuture2Title: 'Analytique Prédictive',
    djFuture2Desc: 'La modélisation avancée permettra aux journalistes d\'anticiper les tendances et de fournir des analyses prospectives.',
    djFuture3Title: 'Données Démocratisées',
    djFuture3Desc: 'Des outils améliorés rendront le journalisme de données accessible aux petites rédactions et journalistes indépendants.',

    // Our Services Page
    ourServices: 'Nos Services',
    osLabel: 'Nos Services',
    osTitle: 'Nos Services',
    osSubtitle: 'Des solutions complètes adaptées aux besoins des institutions médiatiques et économiques avec excellence et précision.',

    // Reports Section
    osReportsTitle: 'Rapports',
    osReportEconomy: 'Économie',
    osReportEconomyDesc: 'Analyse économique approfondie couvrant les tendances du marché, les indicateurs financiers et les prévisions économiques.',
    osReportEnergy: 'Énergie et Ressources',
    osReportEnergyDesc: 'Rapports complets sur les marchés de l\'énergie, les ressources naturelles et les initiatives de durabilité.',
    osReportTech: 'Technologie et Structuration',
    osReportTechDesc: 'Analyse des développements technologiques, de la transformation numérique et de la restructuration organisationnelle.',
    osReportEnvironment: 'Environnement et Climat',
    osReportEnvironmentDesc: 'Évaluations d\'impact environnemental, analyse du changement climatique et rapports de durabilité.',

    // Dashboards Section
    osDashboardsTitle: 'Tableaux de Bord',
    osDashboardMedia: 'Tableaux de Bord de Suivi des Institutions Médiatiques',
    osDashboardMediaDesc: 'Tableaux de bord en temps réel conçus pour suivre les performances médiatiques, l\'engagement du public et l\'analyse de contenu.',
    osDashboardEconomic: 'Tableaux de Bord de Suivi des Institutions Économiques',
    osDashboardEconomicDesc: 'Tableaux de bord complets pour les institutions financières, suivant les indicateurs de marché et les performances d\'investissement.',
    osFeatureRealtime: 'Temps Réel',
    osFeatureInteractive: 'Interactif',
    osFeatureCustom: 'Personnalisable',

    // Consulting Section
    osConsultingTitle: 'Consultations et Formation',
    osConsultMedia: 'Consultations Médiatiques',
    osConsultMediaDesc: 'Orientation stratégique pour les organisations médiatiques sur la stratégie de contenu et le développement d\'audience.',
    osConsultInvestment: 'Consultations en Investissement',
    osConsultInvestmentDesc: 'Services de conseil expert sur les opportunités d\'investissement, l\'évaluation des risques et l\'optimisation de portefeuille.',
    osConsultDevelopment: 'Développement et Renforcement des Capacités',
    osConsultDevelopmentDesc: 'Programmes de formation et ateliers conçus pour améliorer les compétences et renforcer les capacités institutionnelles.',

    // CTA
    osCtaTitle: 'Prêt à Transformer Vos Données?',
    osCtaDesc: 'Contactez-nous aujourd\'hui pour discuter de la façon dont nos services peuvent vous aider à atteindre vos objectifs.',
    osCtaButton: 'Demander un Service',

    // Knowledge Center Page
    knowledgeCenter: 'Centre de Connaissances',
    kcLabel: 'Centre de Connaissances',
    kcTitle: 'Centre de Connaissances',
    kcSubtitle: 'Votre portail vers des ressources complètes en journalisme de données, recherche et apprentissage collaboratif.',

    // Digital Library Section
    kcDigitalLibraryTitle: 'Bibliothèque Numérique',
    kcDigitalLibraryDesc: 'Accédez à notre collection complète de ressources conçues pour améliorer votre compréhension du journalisme de données.',
    kcArticlesTitle: 'Articles et Études',
    kcArticlesDesc: 'Articles de recherche approfondis, études de cas et analyses couvrant les dernières tendances du journalisme de données.',
    kcDictionaryTitle: 'Dictionnaire et Vocabulaire des Données',
    kcDictionaryDesc: 'Glossaire complet des termes, définitions et vocabulaire standardisé du journalisme de données pour les professionnels.',
    kcBookletsTitle: 'Livrets Électroniques',
    kcBookletsDesc: 'Guides téléchargeables, manuels et matériels éducatifs pour les praticiens du journalisme de données de tous niveaux.',

    // Knowledge Forum Section
    kcForumTitle: 'Forum de Connaissances',
    kcForumDesc: 'Rejoignez notre communauté de professionnels du journalisme de données pour des discussions enrichissantes et le partage de connaissances.',
    kcDiscussionsTitle: 'Discussions et Dialogues Basés sur les Connaissances',
    kcDiscussionsDesc: 'Participez à des conversations réfléchies sur les méthodologies du journalisme de données et les meilleures pratiques.',
    kcForumFeature1: 'Discussions Animées par des Experts',
    kcForumFeature1Desc: 'Participez à des forums modérés par des leaders de l\'industrie et des journalistes de données expérimentés.',
    kcForumFeature2: 'Apprentissage Collaboratif',
    kcForumFeature2Desc: 'Partagez des idées, posez des questions et apprenez de vos pairs dans un environnement communautaire.',
    kcForumFeature3: 'Sujets Tendance',
    kcForumFeature3Desc: 'Restez informé des discussions sur les derniers développements du journalisme de données.',

    // CTA
    kcCtaTitle: 'Élargissez Vos Connaissances',
    kcCtaDesc: 'Rejoignez notre communauté et accédez à des ressources exclusives, discussions et opportunités d\'apprentissage.',
    kcCtaButton: 'Commencer',

    // Publications Page
    publications: 'Publications',
    pubLabel: 'Publications',
    pubTitle: 'Publications',
    pubSubtitle: 'Explorez notre collection complète de publications périodiques et spéciales sur le journalisme de données.',

    // Periodic Publications
    pubPeriodicTitle: 'Publications Périodiques',
    pubPeriodicDesc: 'Publications régulières offrant des analyses et des informations actualisées sur le journalisme de données.',

    // Monthly
    pubMonthlyTitle: 'Mensuelles',
    pubMonthlyBadge: 'Mensuel',
    pubMonthly1: 'Rapport des Tendances',
    pubMonthly1Desc: 'Analyse mensuelle des tendances émergentes en journalisme de données et analyse médiatique.',
    pubMonthly2: 'Perspectives du Secteur',
    pubMonthly2Desc: 'Couverture complète des développements et meilleures pratiques de l\'industrie.',
    pubMonthly3: 'Études de Cas',
    pubMonthly3Desc: 'Exemples concrets et histoires de succès d\'organisations de premier plan.',

    // Annual
    pubAnnualTitle: 'Annuelles',
    pubAnnualBadge: 'Annuel',
    pubAnnual1: 'Rapport Annuel',
    pubAnnual1Desc: 'Revue annuelle complète du paysage du journalisme de données et des réalisations.',
    pubAnnual2: 'Analyse de Marché',
    pubAnnual2Desc: 'Analyse approfondie des tendances du marché et projections futures.',
    pubAnnual3: 'Évaluation d\'Impact',
    pubAnnual3Desc: 'Évaluation de l\'impact du journalisme de données sur les médias et la société.',

    // Special Publications
    pubSpecialTitle: 'Publications Spéciales',
    pubSpecialDesc: 'Publications exclusives sur des sujets spécialisés et domaines émergents du journalisme de données.',
    pubSpecialTag: 'Spécial',
    pubSpecial1: 'Articles de Recherche',
    pubSpecial1Desc: 'Recherches originales et contributions académiques au domaine du journalisme de données.',
    pubSpecial2: 'Livres Blancs',
    pubSpecial2Desc: 'Analyses et recommandations d\'experts sur des sujets critiques de l\'industrie.',
    pubSpecial3: 'Guide des Meilleures Pratiques',
    pubSpecial3Desc: 'Guides complets pour la mise en œuvre des méthodologies du journalisme de données.',
    pubLearnMore: 'En Savoir Plus',

    // CTA
    pubCtaTitle: 'Restez Informé',
    pubCtaDesc: 'Abonnez-vous pour recevoir nos dernières publications et restez en avance dans le monde du journalisme de données.',
    pubCtaButton: 'S\'abonner',

    // Advertisements Page
    advertisements: 'Annonces',
    adsLabel: 'Annonces',
    adsTitle: 'Annonces',
    adsSubtitle: 'Atteignez votre public cible via notre plateforme avec des annonces institutionnelles et des opportunités commerciales.',

    // Categories
    adsInstitutionalTitle: 'Annonces Institutionnelles',
    adsInstitutionalDesc: 'Solutions publicitaires professionnelles pour les organisations et les entreprises.',
    adsJobs: 'Offres d\'Emploi',
    adsJobsDesc: 'Publiez des offres d\'emploi et atteignez des candidats qualifiés dans les secteurs des médias et du journalisme de données.',
    adsBusinessOpp: 'Opportunités Commerciales',
    adsBusinessOppDesc: 'Promouvez des partenariats, investissements et opportunités de collaboration commerciale.',

    // Form
    adsFormTitle: 'Formulaire de Demande d\'Annonce',
    adsFormDesc: 'Remplissez le formulaire ci-dessous pour soumettre votre demande d\'annonce. Notre équipe examinera et vous contactera bientôt.',
    adsInstitutionName: 'Nom de l\'Institution / Entreprise',
    adsInstitutionPlaceholder: 'Entrez le nom de votre institution',
    adsSector: 'Secteur / Activité',
    adsSectorPlaceholder: 'Entrez votre secteur ou activité',
    adsAdType: 'Type d\'Annonce',
    adsTypeJob: 'Annonce d\'Emploi',
    adsTypeBusiness: 'Opportunité Commerciale',
    adsTypeTender: 'Appel d\'Offres',
    adsTypeService: 'Promotion de Services',
    adsTypeSponsored: 'Rapport Sponsorisé',
    adsTypeProduct: 'Nouveau Produit / Projet',
    adsDetails: 'Détails de l\'Annonce',
    adsDetailsPlaceholder: 'Décrivez le contenu et les exigences de votre annonce...',
    adsDuration: 'Durée',
    adsDurationPlaceholder: 'Sélectionnez la durée',
    adsDuration1Week: '1 Semaine',
    adsDuration2Weeks: '2 Semaines',
    adsDuration1Month: '1 Mois',
    adsDuration3Months: '3 Mois',
    adsDuration6Months: '6 Mois',
    adsDuration1Year: '1 An',
    adsBoost: 'Booster l\'Annonce',
    adsBoostYes: 'Oui',
    adsBoostNo: 'Non',
    adsEmail: 'Adresse Email',
    adsEmailPlaceholder: 'Entrez votre email',
    adsPhone: 'Numéro de Téléphone',
    adsPhonePlaceholder: 'Entrez votre numéro de téléphone',
    adsSubmitBtn: 'Soumettre la Demande',
    adsSubmitSuccess: 'Demande Envoyée!',
    adsSuccessMessage: 'Votre demande d\'annonce a été soumise avec succès. Nous vous contacterons bientôt.',

    // Login Page
    loginTitle: 'Bon Retour',
    loginSubtitle: 'Connectez-vous à votre compte pour continuer',
    emailPlaceholder: 'Entrez votre email',
    password: 'Mot de passe',
    passwordPlaceholder: 'Entrez votre mot de passe',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié?',
    loginButton: 'Se Connecter',
    noAccount: "Vous n'avez pas de compte?",
    signupLink: "S'inscrire",

    // Signup Page
    signupTitle: 'Créer un Compte',
    signupSubtitle: 'Rejoignez MBSx pour accéder aux ressources de journalisme de données',
    fullName: 'Nom Complet',
    fullNamePlaceholder: 'Entrez votre nom complet',
    confirmPassword: 'Confirmer le Mot de Passe',
    confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
    agreeToTerms: "J'accepte les",
    termsOfService: "Conditions d'utilisation",
    signupButton: 'Créer un Compte',
    haveAccount: 'Vous avez déjà un compte?',
    loginLink: 'Se connecter',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    agreeTermsError: "Vous devez accepter les conditions d'utilisation",
  },
  ar: {
    welcome: 'مرحباً بكم في MBSx',
    tagline: 'شريككم الموثوق للرؤى المبنية على البيانات والتميز الصحفي',
    selectLanguage: 'اختر لغتك',
    enterSite: 'دخول الموقع',

    home: 'الرئيسية',
    mediaServices: 'خدمات الإعلام',
    economicServices: 'الخدمات الاقتصادية',
    reports: 'التقارير',
    dashboards: 'لوحات البيانات',
    training: 'التدريب',

    heroTitle: 'صحافة البيانات',
    heroTitleHighlight: `إعلام يلهم
وقرارات تُبنى`,
    heroSubtitle: 'نحول البيانات المعقدة إلى قصص مؤثرة. نمكّن المؤسسات الإعلامية والاقتصادية برؤى قابلة للتنفيذ وتقارير مخصصة واستشارات استراتيجية.',
    exploreServices: 'استكشف الخدمات',
    requestConsultation: 'طلب استشارة',

    servicesLabel: 'خبراتنا',
    servicesTitle: 'حلول مصممة لقطاعك',
    servicesSubtitle: 'سواء كنت مؤسسة إعلامية تبحث عن قصص مؤثرة أو مؤسسة اقتصادية تحتاج رؤى استراتيجية، نحن نقدم.',

    mediaSector: 'القطاع الإعلامي',
    mediaDesc: 'خدمات بيانات شاملة مصممة للمؤسسات الإخبارية والناشرين الرقميين.',
    economicSector: 'القطاع الاقتصادي',
    economicDesc: 'رؤى استراتيجية وتحليلات مصممة للمؤسسات المالية والشركات وصناع السياسات.',

    dataReports: 'تقارير البيانات',
    dataReportsDesc: 'تحليلات معمقة ومرئيات تروي قصتك بمصداقية.',
    interactiveDashboards: 'لوحات تفاعلية',
    interactiveDashboardsDesc: 'منصات تصور بيانات مباشرة مخصصة لاحتياجاتك.',
    strategicConsulting: 'استشارات استراتيجية',
    strategicConsultingDesc: 'إرشادات خبراء في استراتيجية البيانات وتنفيذها.',
    professionalTraining: 'التدريب المهني',
    professionalTrainingDesc: 'ارتقِ بمهارات فريقك مع ورش صحافة البيانات.',

    featuresLabel: 'لماذا MBSx',
    featuresTitle: 'التميز في كل تفصيل',
    featuresSubtitle: 'نجمع بين التكنولوجيا المتطورة والنزاهة الصحفية لتقديم خدمات بيانات لا مثيل لها.',

    aiPowered: 'تحليل بالذكاء الاصطناعي',
    aiPoweredDesc: 'استفد من التعلم الآلي لاكتشاف الأنماط والاتجاهات المخفية.',
    multiLanguage: 'دعم متعدد اللغات',
    multiLanguageDesc: 'دعم كامل للمحتوى بالعربية والفرنسية والإنجليزية.',
    realTime: 'تحديثات فورية',
    realTimeDesc: 'ابقَ على اطلاع مع الإشعارات المباشرة والتسليم الفوري للتقارير.',
    secureData: 'أمان المؤسسات',
    secureDataDesc: 'تشفير بمستوى البنوك والامتثال للمعايير الدولية.',

    requestService: 'طلب خدمة',
    advertiseWithUs: 'أعلن معنا',
    institutionName: 'اسم المؤسسة / الشركة',
    sector: 'القطاع',
    media: 'إعلام',
    economic: 'اقتصادي',
    serviceType: 'نوع الخدمة',
    report: 'تقرير',
    dashboard: 'لوحة بيانات',
    consultation: 'استشارة',
    description: 'الوصف',
    descriptionPlaceholder: 'أخبرنا عن متطلبات مشروعك...',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    submit: 'إرسال الطلب',

    adType: 'نوع الإعلان',
    jobVacancy: 'وظيفة شاغرة',
    businessOpportunity: 'فرصة عمل',
    tender: 'مناقصة',
    servicePromotion: 'ترويج خدمة',
    sponsoredReport: 'تقرير مدعوم',
    productLaunch: 'إطلاق منتج جديد',
    adDetails: 'تفاصيل الإعلان',
    adDetailsPlaceholder: 'صف إعلانك والمدة المفضلة...',
    boostAd: 'تعزيز هذا الإعلان لرؤية مميزة',

    successMessage: 'تم إرسال طلبك بنجاح. سنتواصل معك قريباً.',

    footerTagline: 'نحول البيانات إلى قصص ذات معنى.',
    quickLinks: 'روابط سريعة',
    contact: 'اتصل بنا',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',

    search: 'بحث',
    searchPlaceholder: 'ابحث في التقارير والخدمات...',
    keywordSearch: 'بحث بالكلمة',
    aiSearch: 'بحث بالذكاء الاصطناعي',
    startSearching: 'ابدأ البحث',
    searchHint: 'أدخل كلمات للبحث في التقارير ولوحات البيانات والخدمات',

    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة',
    markAllRead: 'تحديد الكل كمقروء',

    // About Us
    aboutUsLabel: 'من نحن',
    aboutUsTitle: 'مؤسسة صحافة بيانات',
    aboutUsDesc: 'منصة إعلامية تجمع بين قوة البيانات وعمق التحليل الصحفي. نقدم محتوى تفاعلياً يخدم المؤسسات الإعلامية في تطوير محتواها، نسعى إلى تحويل البيانات إلى معرفة للشركات والهيئات الاقتصادية في المجتمع وصناعة القرار، كما نوفر تحليلات ولوحات بيانات تدعم قراراتها الإستراتيجية.',
    visionTitle: 'الرؤية',
    visionDesc: 'أن نصبح رواداً في بناء إعلام ذكي قائم على البيانات، يجمع بين التحليل والإبتكار لخدمة صُنّاع القرار.',
    missionTitle: 'الرسالة',
    missionDesc: 'نعمل على تطوير المشهد الإعلامي والإقتصادي عبر حلول مبتكرة قائمة على البيانات.',
    valuesTitle: 'القيم',
    value1: 'نؤمن بأن البيانات ليست أرقاماً بل طاقة فكرية تصنع الفارق.',
    value2: 'نسعى بإستمرار لتقديم محتوى بياني وإعلامي يعكس أعلى معايير الدقة والتميز.',
    value3: 'نعمل وفق أخلاقيات المهنة لضمان موثوقية المحتوى الذي نقدمه.',
    value4: 'فهم الأرقام هو مفتاح القرارات الذكية.',
    value5: 'نهدف إلى أن تكون بياناتنا أداة للتنمية وصنع القرار الواعي.',
    value6: 'الإبداع لا يتحقق إلا بالتعلم ومواكبة التغيير.',
    ceoTitle: 'المديرة التنفيذية والمؤسسة',
    ceoName: 'مروى بوسعدية',
    ceoDesc: 'تقود مروى المنظمة بتركيز ونزاهة وشغف بالصحافة الهادفة، وتعمل باستمرار على تمكين نموها من خلال التوجيه المدروس والابتكار المستمر.',

    // Data Journalism Page
    dataJournalism: 'صحافة البيانات',
    djLabel: 'صحافة البيانات',
    djTitle: 'صحافة البيانات',
    djSubtitle: 'تحويل البيانات الخام إلى قصص مؤثرة تُعلم وتُشرك وتوجه القرارات في العصر الرقمي.',

    // Concepts and Fundamentals
    djConceptsTitle: 'المفاهيم والأساسيات',
    djConcept1Title: 'جمع البيانات',
    djConcept1Desc: 'جمع منهجي للبيانات المهيكلة وغير المهيكلة من مصادر متنوعة تشمل قواعد البيانات وواجهات برمجة التطبيقات والسجلات العامة والبحث الميداني.',
    djConcept2Title: 'تحليل البيانات',
    djConcept2Desc: 'تطبيق الأساليب الإحصائية والأطر التحليلية لتحديد الأنماط والارتباطات والرؤى ضمن مجموعات البيانات المعقدة.',
    djConcept3Title: 'تصور البيانات',
    djConcept3Desc: 'تحويل النتائج التحليلية إلى سرديات بصرية مقنعة من خلال الرسوم البيانية والخرائط والعناصر التفاعلية.',

    // Applications and Features
    djApplicationsTitle: 'التطبيقات والمميزات',
    djApp1Title: 'السرد التفاعلي',
    djApp1Desc: 'إنشاء سرديات غامرة تتيح للقراء استكشاف البيانات بوتيرتهم وعمقهم الخاص.',
    djApp2Title: 'المراقبة الفورية',
    djApp2Desc: 'تتبع تدفقات البيانات المباشرة لتغطية الأخبار العاجلة وتطوير القصص المستمر.',
    djApp3Title: 'الصحافة الاستقصائية',
    djApp3Desc: 'استخدام تحليل البيانات للكشف عن الأنماط الخفية ودعم الصحافة الاستقصائية.',
    djApp4Title: 'إشراك الجمهور',
    djApp4Desc: 'تطوير محتوى قائم على البيانات يتردد صداه مع الجماهير المستهدفة ويدفع المشاركة الهادفة.',

    // Reports and Indicators
    djReportsTitle: 'التقارير والمؤشرات',
    djReport1Title: 'المؤشرات الاقتصادية',
    djReport1Desc: 'تحليل شامل لاتجاهات السوق والأداء الاقتصادي والتوقعات المالية.',
    djReport2Title: 'المقاييس الاجتماعية',
    djReport2Desc: 'قياس الأثر الاجتماعي والتحولات الديموغرافية ومؤشرات التنمية المجتمعية.',
    djReport3Title: 'تحليل القطاعات',
    djReport3Desc: 'تقارير خاصة بالقطاعات تغطي الاتجاهات والتحديات والفرص عبر الصناعات.',

    // Current Situation
    djCurrentTitle: 'الحالة الراهنة',
    djCurrentIntro: 'تطورت صحافة البيانات بشكل كبير في السنوات الأخيرة، لتصبح مكوناً أساسياً في غرف الأخبار الحديثة والمؤسسات الإعلامية حول العالم.',
    djCurrent1: 'طلب متزايد على السرديات القائمة على البيانات عبر جميع المنصات والأشكال الإعلامية.',
    djCurrent2: 'تكامل متزايد لأدوات الذكاء الاصطناعي والتعلم الآلي في سير العمل الصحفي.',
    djCurrent3: 'أهمية متزايدة لمحو الأمية البيانية بين الصحفيين والمهنيين الإعلاميين.',

    // Trends
    djTrendsTitle: 'التوجهات',
    djTrend1Title: 'تكامل الذكاء الاصطناعي',
    djTrend1Desc: 'الاستفادة من الذكاء الاصطناعي للتحليل الآلي للبيانات والتعرف على الأنماط وإنشاء المحتوى.',
    djTrend2Title: 'التصميم للجوال أولاً',
    djTrend2Desc: 'تحسين تصورات البيانات والمحتوى التفاعلي للاستهلاك عبر الأجهزة المحمولة.',
    djTrend3Title: 'الصحافة التعاونية',
    djTrend3Desc: 'شراكات عابرة للحدود تمكّن التحقيقات الواسعة النطاق والموارد المشتركة.',

    // Future
    djFutureTitle: 'المستقبلية',
    djFuture1Title: 'التجارب الغامرة',
    djFuture1Desc: 'ستحول تقنيات الواقع الافتراضي والمعزز طريقة تفاعل الجماهير مع القصص القائمة على البيانات.',
    djFuture2Title: 'التحليلات التنبؤية',
    djFuture2Desc: 'ستمكّن النمذجة المتقدمة الصحفيين من توقع الاتجاهات وتقديم تحليلات استشرافية.',
    djFuture3Title: 'ديمقراطية البيانات',
    djFuture3Desc: 'ستجعل الأدوات المحسّنة صحافة البيانات في متناول غرف الأخبار الصغيرة والصحفيين المستقلين.',

    // Our Services Page
    ourServices: 'خدماتنا',
    osLabel: 'خدماتنا',
    osTitle: 'خدماتنا',
    osSubtitle: 'حلول شاملة مصممة لتلبية احتياجات المؤسسات الإعلامية والاقتصادية بتميز ودقة.',

    // Reports Section
    osReportsTitle: 'تقارير',
    osReportEconomy: 'الاقتصاد',
    osReportEconomyDesc: 'تحليل اقتصادي معمق يغطي اتجاهات السوق والمؤشرات المالية والتوقعات الاقتصادية.',
    osReportEnergy: 'الطاقة والموارد',
    osReportEnergyDesc: 'تقارير شاملة عن أسواق الطاقة والموارد الطبيعية ومبادرات الاستدامة.',
    osReportTech: 'التكنولوجيا والهيكلة',
    osReportTechDesc: 'تحليل التطورات التكنولوجية والتحول الرقمي وإعادة الهيكلة التنظيمية.',
    osReportEnvironment: 'البيئة والمناخ',
    osReportEnvironmentDesc: 'تقييمات الأثر البيئي وتحليل تغير المناخ وتقارير الاستدامة.',

    // Dashboards Section
    osDashboardsTitle: 'لوحات',
    osDashboardMedia: 'لوحات متابعة - المؤسسات الإعلامية',
    osDashboardMediaDesc: 'لوحات بيانات فورية مصممة لتتبع أداء الإعلام ومشاركة الجمهور وتحليلات المحتوى للمؤسسات الإخبارية والبث.',
    osDashboardEconomic: 'لوحات متابعة - المؤسسات الاقتصادية',
    osDashboardEconomicDesc: 'لوحات بيانات شاملة للمؤسسات المالية تتبع مؤشرات السوق وأداء الاستثمار والمقاييس الاقتصادية.',
    osFeatureRealtime: 'فوري',
    osFeatureInteractive: 'تفاعلي',
    osFeatureCustom: 'قابل للتخصيص',

    // Consulting Section
    osConsultingTitle: 'الاستشارات والتدريب',
    osConsultMedia: 'الاستشارات الإعلامية',
    osConsultMediaDesc: 'توجيه استراتيجي للمؤسسات الإعلامية في استراتيجية المحتوى وتطوير الجمهور والتحول الرقمي.',
    osConsultInvestment: 'الاستشارات الاستثمارية',
    osConsultInvestmentDesc: 'خدمات استشارية خبيرة في فرص الاستثمار وتقييم المخاطر وتحسين المحافظ.',
    osConsultDevelopment: 'التطوير وبناء القدرات',
    osConsultDevelopmentDesc: 'برامج تدريبية وورش عمل مصممة لتعزيز المهارات وبناء القدرات المؤسسية.',

    // CTA
    osCtaTitle: 'هل أنت مستعد لتحويل بياناتك؟',
    osCtaDesc: 'تواصل معنا اليوم لمناقشة كيف يمكن لخدماتنا مساعدتك في تحقيق أهدافك.',
    osCtaButton: 'طلب خدمة',

    // Knowledge Center Page
    knowledgeCenter: 'المراكز المعرفية',
    kcLabel: 'المراكز المعرفية',
    kcTitle: 'المراكز المعرفية',
    kcSubtitle: 'بوابتك إلى موارد شاملة في صحافة البيانات والبحث والتعلم التعاوني.',

    // Digital Library Section
    kcDigitalLibraryTitle: 'المكتبة الرقمية',
    kcDigitalLibraryDesc: 'استكشف مجموعتنا الشاملة من الموارد المصممة لتعزيز فهمك لصحافة البيانات والتحليلات.',
    kcArticlesTitle: 'مقالات ودراسات',
    kcArticlesDesc: 'أوراق بحثية معمقة ودراسات حالة ومقالات تحليلية تغطي أحدث الاتجاهات في صحافة البيانات وتحليلات الإعلام.',
    kcDictionaryTitle: 'قاموس ومفردات البيانات',
    kcDictionaryDesc: 'قاموس شامل لمصطلحات صحافة البيانات والتعريفات والمفردات الموحدة للمهنيين في هذا المجال.',
    kcBookletsTitle: 'كتيبات إلكترونية',
    kcBookletsDesc: 'أدلة قابلة للتنزيل وكتيبات ومواد تعليمية لممارسي صحافة البيانات من جميع المستويات.',

    // Knowledge Forum Section
    kcForumTitle: 'المنتدى المعرفي',
    kcForumDesc: 'انضم إلى مجتمعنا من المهنيين والمهتمين بصحافة البيانات للمناقشات الهادفة وتبادل المعرفة.',
    kcDiscussionsTitle: 'نقاشات وحوارات معرفية',
    kcDiscussionsDesc: 'شارك في محادثات مدروسة حول منهجيات صحافة البيانات وأفضل الممارسات والاتجاهات الناشئة مع خبراء الصناعة.',
    kcForumFeature1: 'نقاشات بقيادة خبراء',
    kcForumFeature1Desc: 'شارك في منتديات يديرها قادة الصناعة وصحفيو البيانات ذوو الخبرة.',
    kcForumFeature2: 'التعلم التعاوني',
    kcForumFeature2Desc: 'شارك الأفكار واطرح الأسئلة وتعلم من الأقران في بيئة مجتمعية داعمة.',
    kcForumFeature3: 'المواضيع الرائجة',
    kcForumFeature3Desc: 'ابقَ على اطلاع بالنقاشات حول أحدث التطورات في صحافة البيانات وتحليلات الإعلام.',

    // CTA
    kcCtaTitle: 'وسّع معرفتك',
    kcCtaDesc: 'انضم إلى مجتمعنا المعرفي واحصل على موارد حصرية ونقاشات وفرص تعلم.',
    kcCtaButton: 'ابدأ الآن',

    // Publications Page
    publications: 'الإصدارات',
    pubLabel: 'الإصدارات',
    pubTitle: 'الإصدارات',
    pubSubtitle: 'استكشف مجموعتنا الشاملة من الإصدارات الدورية والخاصة في صحافة البيانات وتحليلات الإعلام.',

    // Periodic Publications
    pubPeriodicTitle: 'إصدارات دورية',
    pubPeriodicDesc: 'إصدارات منتظمة تقدم رؤى وتحليلات حديثة حول المواضيع الرئيسية في صحافة البيانات.',

    // Monthly
    pubMonthlyTitle: 'شهرية',
    pubMonthlyBadge: 'شهري',
    pubMonthly1: 'تقرير اتجاهات البيانات',
    pubMonthly1Desc: 'تحليل شهري للاتجاهات الناشئة في صحافة البيانات وتحليلات الإعلام.',
    pubMonthly2: 'رؤى الصناعة',
    pubMonthly2Desc: 'تغطية شاملة لتطورات الصناعة وأفضل الممارسات.',
    pubMonthly3: 'دراسات الحالة',
    pubMonthly3Desc: 'أمثلة واقعية وقصص نجاح من المؤسسات الرائدة.',

    // Annual
    pubAnnualTitle: 'سنوية',
    pubAnnualBadge: 'سنوي',
    pubAnnual1: 'التقرير السنوي',
    pubAnnual1Desc: 'مراجعة سنوية شاملة لمشهد صحافة البيانات والإنجازات.',
    pubAnnual2: 'تحليل السوق',
    pubAnnual2Desc: 'تحليل معمق لاتجاهات السوق والتوقعات المستقبلية.',
    pubAnnual3: 'تقييم الأثر',
    pubAnnual3Desc: 'تقييم تأثير صحافة البيانات على الإعلام والمجتمع.',

    // Special Publications
    pubSpecialTitle: 'إصدارات خاصة',
    pubSpecialDesc: 'إصدارات حصرية حول مواضيع متخصصة ومجالات ناشئة في صحافة البيانات.',
    pubSpecialTag: 'خاص',
    pubSpecial1: 'أوراق بحثية',
    pubSpecial1Desc: 'أبحاث أصلية ومساهمات أكاديمية في مجال صحافة البيانات.',
    pubSpecial2: 'أوراق بيضاء',
    pubSpecial2Desc: 'تحليلات وتوصيات الخبراء حول مواضيع الصناعة الحرجة.',
    pubSpecial3: 'دليل أفضل الممارسات',
    pubSpecial3Desc: 'أدلة شاملة لتطبيق منهجيات صحافة البيانات.',
    pubLearnMore: 'اعرف المزيد',

    // CTA
    pubCtaTitle: 'ابقَ على اطلاع',
    pubCtaDesc: 'اشترك لتلقي أحدث إصداراتنا وكن في الصدارة في عالم صحافة البيانات.',
    pubCtaButton: 'اشترك الآن',

    // Advertisements Page
    advertisements: 'الإعلانات',
    adsLabel: 'الإعلانات',
    adsTitle: 'الإعلانات',
    adsSubtitle: 'الوصول إلى جمهورك المستهدف عبر منصتنا من خلال إعلانات المؤسسات والفرص التجارية.',

    // Categories
    adsInstitutionalTitle: 'إعلانات المؤسسات',
    adsInstitutionalDesc: 'حلول إعلانية احترافية للمؤسسات والشركات.',
    adsJobs: 'الوظائف',
    adsJobsDesc: 'نشر الوظائف الشاغرة والوصول إلى المرشحين المؤهلين في قطاعات الإعلام وصحافة البيانات.',
    adsBusinessOpp: 'فرص تجارية',
    adsBusinessOppDesc: 'الترويج للشراكات والاستثمارات وفرص التعاون التجاري.',

    // Form
    adsFormTitle: 'نموذج طلب الإعلان',
    adsFormDesc: 'املأ النموذج أدناه لتقديم طلب إعلانك. سيقوم فريقنا بمراجعته والتواصل معك قريباً.',
    adsInstitutionName: 'اسم المؤسسة / الشركة',
    adsInstitutionPlaceholder: 'أدخل اسم مؤسستك',
    adsSector: 'القطاع / النشاط',
    adsSectorPlaceholder: 'أدخل قطاعك أو نشاطك',
    adsAdType: 'نوع الإعلان',
    adsTypeJob: 'إعلان وظيفة',
    adsTypeBusiness: 'إعلان فرصة تجارية',
    adsTypeTender: 'إعلان مناقصة',
    adsTypeService: 'إعلان ترويجي للخدمات',
    adsTypeSponsored: 'إعلان تقرير ممول',
    adsTypeProduct: 'إعلان منتج / مشروع جديد',
    adsDetails: 'تفاصيل الإعلان / المدة المطلوبة',
    adsDetailsPlaceholder: 'صف محتوى إعلانك ومتطلباتك...',
    adsDuration: 'المدة',
    adsDurationPlaceholder: 'اختر المدة',
    adsDuration1Week: 'أسبوع واحد',
    adsDuration2Weeks: 'أسبوعان',
    adsDuration1Month: 'شهر واحد',
    adsDuration3Months: '3 أشهر',
    adsDuration6Months: '6 أشهر',
    adsDuration1Year: 'سنة واحدة',
    adsBoost: 'تعزيز الإعلان',
    adsBoostYes: 'نعم',
    adsBoostNo: 'لا',
    adsEmail: 'البريد الإلكتروني',
    adsEmailPlaceholder: 'أدخل بريدك الإلكتروني',
    adsPhone: 'رقم الهاتف',
    adsPhonePlaceholder: 'أدخل رقم هاتفك',
    adsSubmitBtn: 'إرسال الطلب',
    adsSubmitSuccess: 'تم الإرسال!',
    adsSuccessMessage: 'تم تقديم طلب إعلانك بنجاح. سنتواصل معك قريباً.',

    // Login Page
    loginTitle: 'مرحباً بعودتك',
    loginSubtitle: 'سجل الدخول إلى حسابك للمتابعة',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    loginButton: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    signupLink: 'إنشاء حساب',

    // Signup Page
    signupTitle: 'إنشاء حساب',
    signupSubtitle: 'انضم إلى MBSx للوصول إلى موارد صحافة البيانات',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    confirmPassword: 'تأكيد كلمة المرور',
    confirmPasswordPlaceholder: 'أكد كلمة المرور',
    agreeToTerms: 'أوافق على',
    termsOfService: 'شروط الخدمة',
    signupButton: 'إنشاء حساب',
    haveAccount: 'لديك حساب بالفعل؟',
    loginLink: 'تسجيل الدخول',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    agreeTermsError: 'يجب الموافقة على شروط الخدمة',
  }
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('mbsx-theme') || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem('mbsx-language') || 'en')
  const [showIntro, setShowIntro] = useState(() => !localStorage.getItem('mbsx-visited'))
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Report Available', message: 'Q4 Economic Analysis Report is now ready', read: false, time: '2 hours ago' },
    { id: 2, title: 'Service Update', message: 'Interactive dashboards now support real-time data', read: false, time: '5 hours ago' },
    { id: 3, title: 'Training Session', message: 'Data Journalism Workshop scheduled for next week', read: true, time: '1 day ago' },
  ])

  useEffect(() => {
    // Set initial document attributes
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('mbsx-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)
    localStorage.setItem('mbsx-language', language)
  }, [language])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleEnterSite = () => {
    localStorage.setItem('mbsx-visited', 'true')
    setShowIntro(false)
  }

  const t = (key) => translations[language]?.[key] || translations.en[key] || key

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
          <div className="app">
            {showIntro && (
              <IntroSidebar
                onEnter={handleEnterSite}
                onLanguageChange={setLanguage}
              />
            )}

            {!showIntro && (
              <>
                <FloatingNav />
                <FloatingActions
                  onSearchClick={() => setSearchOpen(true)}
                  onNotificationClick={() => setNotificationsOpen(true)}
                  unreadCount={unreadCount}
                />

                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/data-journalism" element={<DataJournalismPage />} />
                  <Route path="/our-services" element={<OurServicesPage />} />
                  <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
                  <Route path="/publications" element={<PublicationsPage />} />
                  <Route path="/advertisements" element={<AdvertisementsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>

                <Footer />

                <SearchModal
                  isOpen={searchOpen}
                  onClose={() => setSearchOpen(false)}
                />

                <NotificationPanel
                  isOpen={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                  notifications={notifications}
                  onMarkRead={markNotificationRead}
                  onMarkAllRead={markAllNotificationsRead}
                />
              </>
            )}
          </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </Router>
  )
}

export default App
