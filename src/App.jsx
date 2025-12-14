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
