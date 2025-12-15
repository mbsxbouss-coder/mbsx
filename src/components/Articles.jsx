import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../App'
import './Articles.css'

// Article data - can be moved to a separate data file later
const articlesData = [
  {
    id: 'from-data-to-decision',
    date: '2024-12-15',
    readTime: 8,
    category: 'analysis',
    title: {
      ar: 'من البيانات إلى القرار: نحو نموذج صحافة جديدة في العالم العربي',
      en: 'From Data to Decision: Towards a New Journalism Model in the Arab World',
      fr: 'Des donnees a la decision: Vers un nouveau modele de journalisme dans le monde arabe'
    },
    excerpt: {
      ar: 'يشهد الحقل الإعلامي في العالم العربي تحوّلًا تدريجيًا في وظائفه وأدواره، نتيجة تعقّد القضايا الاقتصادية والاجتماعية، وتزايد الحاجة إلى معلومات دقيقة قادرة على دعم عملية اتخاذ القرار.',
      en: 'The media field in the Arab world is witnessing a gradual transformation in its functions and roles, due to the complexity of economic and social issues and the growing need for accurate information capable of supporting decision-making.',
      fr: 'Le domaine mediatique dans le monde arabe connait une transformation progressive de ses fonctions et roles, en raison de la complexite des questions economiques et sociales et du besoin croissant d\'informations precises capables de soutenir la prise de decision.'
    },
    content: {
      ar: `يشهد الحقل الإعلامي في العالم العربي تحوّلًا تدريجيًا في وظائفه وأدواره، نتيجة تعقّد القضايا الاقتصادية والاجتماعية، وتزايد الحاجة إلى معلومات دقيقة قادرة على دعم عملية اتخاذ القرار. في هذا السياق، برزت صحافة البيانات كنموذج صحفي معاصر يسعى إلى تجاوز الوظيفة الإخبارية التقليدية نحو دور تحليلي وتفسيري أكثر عمقًا.

تقوم صحافة البيانات على مبدأ أساسي مفاده أن البيانات، مهما بلغ حجمها، لا تكتسب قيمتها الحقيقية إلا عندما تُقرأ في سياقها الصحيح، وتُربط بالواقع الاجتماعي والاقتصادي الذي تعكسه. ومن هذا المنطلق، لا تقتصر أهمية هذا النموذج على تقديم أرقام أو إحصاءات، بل تتجلى في قدرته على تحويل المعطيات المجردة إلى معرفة قابلة للفهم والاستيعاب.

في السياق العربي، ما تزال العلاقة بين الإعلام وصناعة القرار تعاني من فجوة واضحة. فغالبًا ما تعتمد القرارات العامة والخاصة على تقديرات ظرفية أو معطيات غير مكتملة، في ظل ضعف توظيف البيانات في الخطاب الإعلامي التحليلي. وتبرز صحافة البيانات هنا كأداة معرفية يمكنها المساهمة في تقليص هذه الفجوة، من خلال تقديم محتوى يستند إلى الوقائع الموثقة بدل الانطباعات.

كما تكتسب صحافة البيانات أهميتها من كونها تساهم في تعزيز مبدأ الشفافية والمساءلة، عبر إعادة قراءة السياسات والبرامج التنموية في ضوء نتائجها الفعلية. فحين تُعرض المعطيات بشكل منهجي، يصبح بالإمكان تقييم الأداء العام، ومقارنة الأهداف المعلنة بالنتائج المحققة، وهو ما يمنح النقاش العام بعدًا أكثر عقلانية وموضوعية.

ولا يعني تبنّي هذا النموذج الصحفي التخلي عن القيم الكلاسيكية للمهنة، بل يمثل امتدادًا لها. فالسرد الصحفي، في هذا الإطار، يُعاد بناؤه على أساس معرفي، يوازن بين التحليل الكمي والفهم السياقي، دون الوقوع في التبسيط أو التهويل. وبهذا، تتحول الصحافة من ناقل للمعلومة إلى وسيط معرفي يربط بين المعرفة العلمية والفضاء العام.

رغم هذه الأهمية، تواجه صحافة البيانات في العالم العربي جملة من التحديات، أبرزها محدودية إتاحة البيانات، وضعف الثقافة الإحصائية لدى الجمهور، إضافة إلى بطء التكيّف المؤسسي داخل بعض المنظومات الإعلامية. غير أن هذه التحديات لا تقلل من أهمية الدور الذي يمكن أن تلعبه صحافة البيانات في دعم القرار، بل تؤكد الحاجة إلى تطوير هذا النموذج وتكييفه مع الخصوصيات المحلية.

ختامًا، يمكن القول إن الانتقال من البيانات إلى القرار يمثّل أحد أبرز رهانات الإعلام العربي المعاصر. ففي زمن تتزايد فيه تعقيدات الواقع، تصبح الصحافة القائمة على المعرفة ضرورة معرفية ومجتمعية، لا مجرد خيار مهني. وبين البيانات والقرار، يتشكل نموذج صحافة جديدة أكثر قدرة على الفهم، وأكثر ارتباطًا بالتنمية وصناعة المستقبل.`,
      en: `The media field in the Arab world is witnessing a gradual transformation in its functions and roles, due to the complexity of economic and social issues and the growing need for accurate information capable of supporting decision-making. In this context, data journalism has emerged as a contemporary journalistic model that seeks to transcend the traditional news function towards a deeper analytical and interpretive role.

Data journalism is based on a fundamental principle that data, regardless of its volume, only acquires its true value when read in its proper context and linked to the social and economic reality it reflects. From this standpoint, the importance of this model is not limited to presenting numbers or statistics, but is manifested in its ability to transform abstract data into understandable and comprehensible knowledge.

In the Arab context, the relationship between media and decision-making still suffers from a clear gap. Public and private decisions often rely on circumstantial estimates or incomplete data, amid weak utilization of data in analytical media discourse. Data journalism emerges here as a knowledge tool that can contribute to bridging this gap by providing content based on documented facts rather than impressions.

Data journalism also derives its importance from its contribution to enhancing the principles of transparency and accountability, by re-reading policies and development programs in light of their actual results. When data is presented systematically, it becomes possible to evaluate public performance and compare declared goals with achieved results, which gives public discourse a more rational and objective dimension.

Adopting this journalistic model does not mean abandoning the classical values of the profession; rather, it represents an extension of them. Journalistic narrative, in this framework, is rebuilt on a knowledge basis that balances quantitative analysis with contextual understanding, without falling into oversimplification or exaggeration. Thus, journalism transforms from a transmitter of information to a knowledge mediator linking scientific knowledge with the public sphere.

Despite this importance, data journalism in the Arab world faces a number of challenges, most notably the limited availability of data, weak statistical culture among the public, and slow institutional adaptation within some media systems. However, these challenges do not diminish the importance of the role that data journalism can play in supporting decision-making; rather, they confirm the need to develop this model and adapt it to local specificities.

In conclusion, the transition from data to decision represents one of the most prominent stakes of contemporary Arab media. In a time of increasing complexity of reality, knowledge-based journalism becomes a cognitive and societal necessity, not just a professional choice. Between data and decision, a new journalism model is being formed that is more capable of understanding and more connected to development and shaping the future.`,
      fr: `Le domaine mediatique dans le monde arabe connait une transformation progressive de ses fonctions et roles, en raison de la complexite des questions economiques et sociales et du besoin croissant d'informations precises capables de soutenir la prise de decision. Dans ce contexte, le journalisme de donnees a emerge comme un modele journalistique contemporain qui cherche a transcender la fonction traditionnelle d'information vers un role analytique et interpretatif plus approfondi.

Le journalisme de donnees repose sur un principe fondamental selon lequel les donnees, quel que soit leur volume, n'acquierent leur veritable valeur que lorsqu'elles sont lues dans leur contexte approprie et liees a la realite sociale et economique qu'elles refletent. De ce point de vue, l'importance de ce modele ne se limite pas a presenter des chiffres ou des statistiques, mais se manifeste dans sa capacite a transformer des donnees abstraites en connaissances comprehensibles.

Dans le contexte arabe, la relation entre les medias et la prise de decision souffre encore d'un ecart evident. Les decisions publiques et privees reposent souvent sur des estimations circonstancielles ou des donnees incompletes, dans un contexte de faible utilisation des donnees dans le discours mediatique analytique. Le journalisme de donnees emerge ici comme un outil de connaissance pouvant contribuer a combler cet ecart en fournissant un contenu base sur des faits documentes plutot que sur des impressions.

Le journalisme de donnees tire egalement son importance de sa contribution au renforcement des principes de transparence et de responsabilite, en relisant les politiques et programmes de developpement a la lumiere de leurs resultats reels. Lorsque les donnees sont presentees systematiquement, il devient possible d'evaluer la performance publique et de comparer les objectifs declares aux resultats obtenus, ce qui donne au discours public une dimension plus rationnelle et objective.

Adopter ce modele journalistique ne signifie pas abandonner les valeurs classiques de la profession; il en represente plutot une extension. Le recit journalistique, dans ce cadre, est reconstruit sur une base de connaissances qui equilibre l'analyse quantitative et la comprehension contextuelle, sans tomber dans la simplification excessive ou l'exageration. Ainsi, le journalisme se transforme d'un transmetteur d'informations en un mediateur de connaissances reliant le savoir scientifique a la sphere publique.

Malgre cette importance, le journalisme de donnees dans le monde arabe fait face a plusieurs defis, notamment la disponibilite limitee des donnees, la faible culture statistique du public et la lente adaptation institutionnelle au sein de certains systemes mediatiques. Cependant, ces defis ne diminuent pas l'importance du role que le journalisme de donnees peut jouer dans le soutien a la prise de decision; ils confirment plutot la necessite de developper ce modele et de l'adapter aux specificites locales.

En conclusion, la transition des donnees a la decision represente l'un des enjeux les plus importants des medias arabes contemporains. Dans une epoque de complexite croissante de la realite, le journalisme base sur les connaissances devient une necessite cognitive et societale, pas seulement un choix professionnel. Entre les donnees et la decision, un nouveau modele de journalisme se forme, plus capable de comprendre et plus lie au developpement et a la construction de l'avenir.`
    }
  }
]

const Articles = () => {
  const { t, language } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category) => {
    const categories = {
      analysis: { ar: 'تحليل', en: 'Analysis', fr: 'Analyse' },
      research: { ar: 'بحث', en: 'Research', fr: 'Recherche' },
      caseStudy: { ar: 'دراسة حالة', en: 'Case Study', fr: 'Etude de cas' }
    }
    return categories[category]?.[language] || category
  }

  return (
    <section className="articles-section" ref={sectionRef}>
      <div className="articles-bg">
        <div className="articles-gradient" />
        <div className="articles-pattern" />
      </div>

      <div className="container">
        {/* Header */}
        <div className={`section-header ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <span className="section-label">{t('articlesLabel')}</span>
          <h1 className="section-title articles-title">{t('articlesPageTitle')}</h1>
          <p className="articles-subtitle">{t('articlesPageSubtitle')}</p>
        </div>

        {/* Back Link */}
        <Link to="/knowledge-center" className={`back-link ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>{t('backToKnowledgeCenter')}</span>
        </Link>

        {/* Articles Grid */}
        <div className="articles-grid">
          {articlesData.map((article, index) => (
            <Link
              key={article.id}
              to={`/knowledge-center/articles/${article.id}`}
              className={`article-card ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="article-card-header">
                <span className="article-category">{getCategoryLabel(article.category)}</span>
                <span className="article-date">{formatDate(article.date)}</span>
              </div>

              <h2 className="article-card-title">{article.title[language]}</h2>
              <p className="article-card-excerpt">{article.excerpt[language]}</p>

              <div className="article-card-footer">
                <span className="article-read-time">
                  {article.readTime} {t('minRead')}
                </span>
                <span className="article-read-more">
                  {t('readMore')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (shown when no articles) */}
        {articlesData.length === 0 && (
          <div className={`articles-empty ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </div>
            <h3>{t('noArticlesYet')}</h3>
            <p>{t('noArticlesDesc')}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export { articlesData }
export default Articles
