import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../App'
import './Articles.css'

// Article data - can be moved to a separate data file later
const articlesData = [
  {
    id: 'climate-change-algeria',
    date: '2024-12-16',
    readTime: 10,
    category: 'research',
    image: '/articl 2 image.jpg',
    title: {
      ar: 'التغير المناخي في الجزائر: قراءة معمقة في الأرقام والواقع',
      en: 'Climate Change in Algeria: An In-Depth Reading of Numbers and Reality',
      fr: 'Le changement climatique en Algerie: Une lecture approfondie des chiffres et de la realite'
    },
    excerpt: {
      ar: 'في السنوات الأخيرة، أصبح التغير المناخي في الجزائر حقيقة ملموسة تتجلى في ارتفاع درجات الحرارة، تراجع الموارد المائية، واتساع رقعة التصحر.',
      en: 'In recent years, climate change in Algeria has become a tangible reality manifested in rising temperatures, declining water resources, and expanding desertification.',
      fr: 'Ces dernieres annees, le changement climatique en Algerie est devenu une realite tangible qui se manifeste par la hausse des temperatures, le declin des ressources en eau et l\'expansion de la desertification.'
    },
    content: {
      ar: `في السنوات الأخيرة، أصبح التغير المناخي في الجزائر حقيقة ملموسة تتجلى في ارتفاع درجات الحرارة، تراجع الموارد المائية، واتساع رقعة التصحر. ما قد يبدو في البداية مجرد أرقام على الورق، يظهر تأثيره بوضوح على حياة المواطنين والاقتصاد الوطني، ويستدعي الانتباه الإعلامي المبني على البيانات.

تشير السجلات المناخية إلى ارتفاع تدريجي في متوسط درجات الحرارة السنوية، وهو ارتفاع يبدو بسيطًا عند النظر إلى الأرقام، لكنه يحمل آثارًا تراكمية ملموسة. فموجات الحر الطويلة والمتكررة تؤثر على الزراعة، وتزيد معدل تبخر المياه من السدود والأنهار، ما يضغط على موارد البلاد المائية. هذه التغيرات تجعل الجزائر ضمن الدول الأكثر تأثرًا بالتحولات المناخية في حوض البحر المتوسط.

بالإضافة إلى ذلك، يشهد نمط التساقطات المطرية تغييرات واضحة، حيث تصبح الأمطار أقل انتظامًا وأكثر تقلبًا. فبدل التساقطات المعتادة، تواجه البلاد فترات جفاف طويلة تليها أمطار غزيرة ومفاجئة تؤدي إلى فيضانات، مما يضعف التربة ويهدد الإنتاج الزراعي التقليدي الذي يعتمد على مياه الأمطار. هذا التغير في نمط الهطول يزيد من هشاشة البيئة الزراعية ويضعف الأمن الغذائي.

تتراجع الموارد المائية الفردية بشكل مستمر نتيجة للنمو السكاني وارتفاع الاستهلاك، إضافة إلى تأثير التغير المناخي. السدود، التي تشكل أحد حلول تخزين المياه، لم تعد كافية لتلبية الاحتياجات، فيما يطرح الاعتماد المتزايد على تحلية مياه البحر تحديات كبيرة من حيث الكلفة الاقتصادية واستهلاك الطاقة. هذه المعطيات تشير إلى ضرورة التفكير في حلول مستدامة ومتعددة المستويات، تجمع بين التخطيط البيئي والإدارة الذكية للموارد.

التصحر يمثل تحديًا إضافيًا، إذ تتعرض الجزائر لتدهور الأراضي الزراعية وتقلص الغطاء النباتي، خاصة في المناطق السهبية. ورغم إطلاق برامج لمكافحة التصحر، يظل قياس فعاليتها صعبًا بسبب نقص المتابعة الرقمية والتحليل المستمر للبيانات. النتيجة هي انخفاض الإنتاج الزراعي وتفاقم المشكلات الاقتصادية والاجتماعية المرتبطة به، بما في ذلك ارتفاع أسعار المواد الغذائية وفقدان فرص العمل في القطاع الفلاحي، الأمر الذي يدفع بعض المواطنين إلى الهجرة الداخلية من المناطق المتضررة.

وفي هذا السياق، يبرز الدور الحيوي لوسائل الإعلام، وخاصة صحافة البيانات، في ربط المواطن بالواقع القائم. فغالبًا ما تكتفي التغطية الإعلامية التقليدية بالحدث المباشر، مثل الفيضانات أو موجات الحر، دون تفسير الأسباب الجذرية أو تقديم أرقام دقيقة تُسهل فهم الاتجاهات طويلة المدى. صحافة البيانات تحول الأرقام إلى قصص مفهومة، وتكشف الاتجاهات الخفية خلف الظواهر، وتمكن صانعي القرار والمواطن على حد سواء من التعامل مع الأزمة بشكل أكثر وعيًا.

التغير المناخي في الجزائر ليس مجرد توقع مستقبلي، بل حقيقة قائمة يمكن قياسها وتحليلها. التعامل معه يتطلب أكثر من حلول تقنية، فهو يحتاج إلى وعي جماعي وإعلام يعتمد على البيانات، يربط بين القرار والمعلومة، ويحول الأرقام إلى أداة تغيير حقيقية. عندما تصبح الأرقام لغة الإعلام، يتحول الوعي إلى قوة فعلية يمكنها حماية البيئة وتعزيز التنمية المستدامة.`,
      en: `In recent years, climate change in Algeria has become a tangible reality manifested in rising temperatures, declining water resources, and expanding desertification. What may initially appear as mere numbers on paper clearly shows its impact on citizens' lives and the national economy, calling for data-driven media attention.

Climate records indicate a gradual rise in average annual temperatures, a rise that seems simple when looking at the numbers, but carries tangible cumulative effects. Long and frequent heat waves affect agriculture and increase the rate of water evaporation from dams and rivers, putting pressure on the country's water resources. These changes make Algeria among the countries most affected by climate transformations in the Mediterranean basin.

Additionally, rainfall patterns are undergoing clear changes, with rain becoming less regular and more volatile. Instead of normal precipitation, the country faces long periods of drought followed by heavy, sudden rains leading to floods, weakening the soil and threatening traditional agricultural production that depends on rainwater. This change in precipitation patterns increases the fragility of the agricultural environment and weakens food security.

Individual water resources are continuously declining due to population growth and increased consumption, in addition to the impact of climate change. Dams, which represent one of the water storage solutions, are no longer sufficient to meet needs, while the increasing reliance on seawater desalination poses significant challenges in terms of economic cost and energy consumption. These data indicate the need to think about sustainable, multi-level solutions that combine environmental planning with smart resource management.

Desertification represents an additional challenge, as Algeria faces degradation of agricultural land and shrinking vegetation cover, especially in steppe areas. Despite launching programs to combat desertification, measuring their effectiveness remains difficult due to the lack of digital monitoring and continuous data analysis. The result is declining agricultural production and worsening economic and social problems associated with it, including rising food prices and loss of jobs in the agricultural sector, which drives some citizens to internal migration from affected areas.

In this context, the vital role of media, especially data journalism, emerges in connecting citizens with the existing reality. Traditional media coverage often settles for the immediate event, such as floods or heat waves, without explaining the root causes or providing accurate figures that facilitate understanding long-term trends. Data journalism transforms numbers into understandable stories, reveals hidden trends behind phenomena, and enables both decision-makers and citizens to deal with the crisis more consciously.

Climate change in Algeria is not just a future prediction, but an existing reality that can be measured and analyzed. Dealing with it requires more than technical solutions; it needs collective awareness and data-driven media that connects decisions to information and transforms numbers into a real tool for change. When numbers become the language of media, awareness becomes an actual force capable of protecting the environment and promoting sustainable development.`,
      fr: `Ces dernieres annees, le changement climatique en Algerie est devenu une realite tangible qui se manifeste par la hausse des temperatures, le declin des ressources en eau et l'expansion de la desertification. Ce qui peut initialement sembler de simples chiffres sur papier montre clairement son impact sur la vie des citoyens et l'economie nationale, appelant a une attention mediatique basee sur les donnees.

Les registres climatiques indiquent une augmentation progressive des temperatures annuelles moyennes, une augmentation qui semble simple en regardant les chiffres, mais qui porte des effets cumulatifs tangibles. Les vagues de chaleur longues et frequentes affectent l'agriculture et augmentent le taux d'evaporation de l'eau des barrages et des rivieres, exercant une pression sur les ressources en eau du pays. Ces changements placent l'Algerie parmi les pays les plus touches par les transformations climatiques dans le bassin mediterraneen.

De plus, les regimes pluviometriques subissent des changements evidents, les pluies devenant moins regulieres et plus volatiles. Au lieu des precipitations normales, le pays fait face a de longues periodes de secheresse suivies de pluies soudaines et abondantes entrainant des inondations, affaiblissant le sol et menacant la production agricole traditionnelle qui depend des eaux de pluie. Ce changement dans les regimes de precipitation augmente la fragilite de l'environnement agricole et affaiblit la securite alimentaire.

Les ressources en eau individuelles diminuent continuellement en raison de la croissance demographique et de l'augmentation de la consommation, en plus de l'impact du changement climatique. Les barrages, qui representent l'une des solutions de stockage de l'eau, ne sont plus suffisants pour repondre aux besoins, tandis que le recours croissant au dessalement de l'eau de mer pose des defis importants en termes de cout economique et de consommation d'energie. Ces donnees indiquent la necessite de reflechir a des solutions durables et multi-niveaux qui combinent la planification environnementale avec une gestion intelligente des ressources.

La desertification represente un defi supplementaire, car l'Algerie fait face a la degradation des terres agricoles et au retrecissement du couvert vegetal, en particulier dans les zones steppiques. Malgre le lancement de programmes de lutte contre la desertification, mesurer leur efficacite reste difficile en raison du manque de suivi numerique et d'analyse continue des donnees. Le resultat est une baisse de la production agricole et une aggravation des problemes economiques et sociaux qui y sont associes, notamment la hausse des prix des denrees alimentaires et la perte d'emplois dans le secteur agricole, ce qui pousse certains citoyens a migrer en interne depuis les zones touchees.

Dans ce contexte, le role vital des medias, en particulier le journalisme de donnees, emerge pour connecter les citoyens a la realite existante. La couverture mediatique traditionnelle se contente souvent de l'evenement immediat, comme les inondations ou les vagues de chaleur, sans expliquer les causes profondes ni fournir des chiffres precis qui facilitent la comprehension des tendances a long terme. Le journalisme de donnees transforme les chiffres en histoires comprehensibles, revele les tendances cachees derriere les phenomenes et permet aux decideurs comme aux citoyens de faire face a la crise de maniere plus consciente.

Le changement climatique en Algerie n'est pas seulement une prediction future, mais une realite existante qui peut etre mesuree et analysee. Y faire face necessite plus que des solutions techniques; il faut une prise de conscience collective et des medias bases sur les donnees qui relient les decisions a l'information et transforment les chiffres en un veritable outil de changement. Lorsque les chiffres deviennent le langage des medias, la prise de conscience devient une force reelle capable de proteger l'environnement et de promouvoir le developpement durable.`
    }
  },
  {
    id: 'from-data-to-decision',
    date: '2024-12-15',
    readTime: 8,
    category: 'analysis',
    image: '/articl 1.jpg',
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
              className={`article-card ${article.image ? 'has-image' : ''} ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {article.image && (
                <div className="article-card-image">
                  <img src={article.image} alt={article.title[language]} />
                </div>
              )}
              <div className="article-card-content">
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
