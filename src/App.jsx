import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, CaretDown, Moon, Sun, PaperPlaneTilt, TelegramLogo, X } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DemoProject } from './Demos'

gsap.registerPlugin(ScrollTrigger)

const imagePath = (fileName) => `${import.meta.env.BASE_URL}images/${fileName}`
const demoPath = (slug) => `${import.meta.env.BASE_URL}?demo=${slug}`
const localized = (value, language) => value?.[language] ?? value

const projects = [
  {
    title: 'Nocturne',
    type: { ru: 'Живой концепт музыкальной платформы', en: 'Interactive music platform concept' },
    image: imagePath('demo-nocturne.png'),
    alt: { ru: 'Главный экран музыкальной платформы Nocturne', en: 'Nocturne music platform home screen' },
    className: 'project--lead',
    summary: { ru: 'Музыкальная платформа с вечерними подборками, встроенным проигрывателем и выразительной редакционной подачей.', en: 'A late-night music platform with curated sets, a built-in player and a strong editorial voice.' },
    challenge: { ru: 'Сделать открытие новой музыки спокойным и последовательным, без перегруженных рекомендаций.', en: 'Make music discovery feel calm and deliberate, without a wall of recommendations.' },
    solution: { ru: 'Контрастная типографика, управляемый плеер и программа эфира собирают понятный сценарий прослушивания.', en: 'Bold type, a focused player and a clear broadcast schedule create one simple listening flow.' },
    role: { ru: 'Концепция, UX/UI, React-разработка', en: 'Concept, UX/UI, React development' },
    stack: 'React, Vite, GSAP, CSS',
    demo: demoPath('nocturne'),
  },
  {
    title: 'Forma',
    type: { ru: 'Живой концепт архитектурного бюро', en: 'Interactive architecture studio concept' },
    image: imagePath('demo-forma.png'),
    alt: { ru: 'Главный экран архитектурного бюро Forma', en: 'Forma architecture studio home screen' },
    className: '',
    summary: { ru: 'Портфолио архитектурного бюро с крупными проектами, спокойным ритмом и ясной студийной позицией.', en: 'An architecture portfolio with large project views, a measured pace and a clear studio point of view.' },
    challenge: { ru: 'Показать масштаб архитектуры и одновременно сделать навигацию по работам быстрой и ясной.', en: 'Show the scale of the work while keeping every project easy to find and understand.' },
    solution: { ru: 'Крупные изображения, строгая сетка и холодный синий акцент оставляют главное внимание пространству.', en: 'Large images, a strict grid and a cool blue accent keep the focus on the spaces.' },
    role: { ru: 'Арт-дирекшн, UX/UI, React-разработка', en: 'Art direction, UX/UI, React development' },
    stack: 'Figma, React, CSS Grid',
    demo: demoPath('forma'),
  },
  {
    title: 'Aperture',
    type: { ru: 'Живой концепт фотостудии', en: 'Interactive photography studio concept' },
    image: imagePath('demo-aperture.png'),
    alt: { ru: 'Главный экран фотостудии Aperture', en: 'Aperture photography studio home screen' },
    className: '',
    summary: { ru: 'Сайт фотостудии с живой галереей, выразительным первым экраном и прямым сценарием бронирования.', en: 'A studio site with an expressive gallery, a memorable opening frame and a direct booking path.' },
    challenge: { ru: 'Соединить эмоциональную галерею с понятным коммерческим предложением и быстрым контактом.', en: 'Pair an emotional image gallery with a clear offer and a fast route to booking.' },
    solution: { ru: 'Асимметричная галерея, тёмная палитра и мятный акцент превращают просмотр в цельную историю.', en: 'An asymmetric gallery, dark palette and mint accent turn the work into a coherent visual story.' },
    role: { ru: 'Концепция, UX/UI, React-разработка', en: 'Concept, UX/UI, React development' },
    stack: 'Figma, React, CSS Grid',
    demo: demoPath('aperture'),
  },
]

const services = [
  {
    id: 'websites',
    title: { ru: 'Разработка сайтов', en: 'Website development' },
    shortTitle: { ru: 'Сайты', en: 'Websites' },
    text: { ru: 'Проектирую лендинги и портфолио с понятной структурой и своим визуальным языком.', en: 'I design landing pages and portfolios with a clear structure and a distinct visual language.' },
    includes: { ru: ['Структура и прототип', 'Дизайн ключевых экранов', 'Адаптивная React-сборка'], en: ['Structure and wireframe', 'Key screen design', 'Responsive React build'] },
    fit: { ru: 'Для запуска услуги, продукта или личного бренда.', en: 'For launching a service, product or personal brand.' },
  },
  {
    id: 'interfaces',
    title: { ru: 'Веб-интерфейсы', en: 'Web interfaces' },
    shortTitle: { ru: 'Интерфейсы', en: 'Interfaces' },
    text: { ru: 'Собираю экраны, в которых легко найти нужное действие и понять результат.', en: 'I build screens that make the next action and its result easy to understand.' },
    includes: { ru: ['Карта сценариев', 'Компоненты и состояния', 'Кликабельный прототип'], en: ['User flow map', 'Components and states', 'Clickable prototype'] },
    fit: { ru: 'Для личного кабинета, каталога или сложного пользовательского пути.', en: 'For dashboards, catalogues and complex user journeys.' },
  },
  {
    id: 'motion',
    title: { ru: 'Motion-дизайн', en: 'Motion design' },
    shortTitle: { ru: 'Motion', en: 'Motion' },
    text: { ru: 'Добавляю движение там, где оно объясняет иерархию, смену состояния или ход истории.', en: 'I use motion to clarify hierarchy, changes of state and the rhythm of a story.' },
    includes: { ru: ['Микроанимации', 'Скролл-сцены', 'Состояния и переходы'], en: ['Micro-interactions', 'Scroll sequences', 'States and transitions'] },
    fit: { ru: 'Для готового сайта, которому не хватает ритма и обратной связи.', en: 'For an existing site that needs better rhythm and feedback.' },
  },
  {
    id: 'launch',
    title: { ru: 'Запуск проекта', en: 'Project launch' },
    shortTitle: { ru: 'Запуск', en: 'Launch' },
    text: { ru: 'Довожу готовый макет до публичной ссылки и проверяю его на реальных экранах.', en: 'I turn a finished design into a live site and test it on real screens.' },
    includes: { ru: ['Адаптивная верстка', 'Базовое SEO', 'Публикация и проверка'], en: ['Responsive development', 'Essential SEO', 'Deployment and testing'] },
    fit: { ru: 'Для макета в Figma, которому нужны код, домен и стабильная сборка.', en: 'For a Figma design that needs code, a domain and a reliable build.' },
  },
]

const principles = [
  {
    title: { ru: 'Сначала смысл', en: 'Meaning first' },
    text: { ru: 'До макета фиксирую, кому нужен сайт, что человек должен понять и какое действие совершить.', en: 'Before drawing screens, I define who the site is for, what they need to understand and what they should do next.' },
    points: { ru: [['Кому', 'конкретный клиент'], ['Что', 'одна мысль на экран'], ['Действие', 'заявка, покупка или контакт']], en: [['Audience', 'one specific customer'], ['Message', 'one idea per screen'], ['Action', 'enquiry, purchase or contact']] },
    outcome: { ru: 'На выходе: карта страницы и черновик текста.', en: 'You get a page map and a working copy draft.' },
    image: imagePath('principle-focus.jpg'),
  },
  {
    title: { ru: 'Движение по делу', en: 'Motion with a job' },
    text: { ru: 'Анимирую только те моменты, где движение помогает человеку заметить главное и понять смену состояния.', en: 'I animate moments where movement helps people notice what matters or understand a change of state.' },
    points: { ru: [['Иерархия', 'взгляд идёт к главному'], ['Отклик', 'интерфейс отвечает на действие'], ['Ритм', 'смена блоков не теряется']], en: [['Hierarchy', 'attention goes to what matters'], ['Feedback', 'the interface answers an action'], ['Rhythm', 'sections connect without getting lost']] },
    outcome: { ru: 'На выходе: набор анимаций с понятной ролью.', en: 'You get a motion set where every effect has a purpose.' },
    image: imagePath('principle-motion.jpg'),
  },
  {
    title: { ru: 'Готово к росту', en: 'Built to grow' },
    text: { ru: 'Собираю сайт из компонентов. Вы сможете добавить кейс, услугу или новый экран без переделки остальных разделов.', en: 'I build with reusable components, so a new case study, service or screen will not force a full rebuild.' },
    points: { ru: [['Система', 'повторяемые компоненты'], ['Контент', 'понятные места для замены'], ['Проверка', 'телефон, клавиатура и быстрая загрузка']], en: [['System', 'reusable components'], ['Content', 'clear places to edit'], ['Testing', 'mobile, keyboard and fast loading']] },
    outcome: { ru: 'На выходе: сайт, который не придётся собирать заново.', en: 'You get a site that can change without starting over.' },
    image: imagePath('project-forma.jpg'),
  },
]

const copy = {
  ru: {
    nav: { top: 'Главная', work: 'Работы', approach: 'Услуги', contact: 'Контакт' },
    aria: { home: 'На главную', navigation: 'Основная навигация', light: 'Включить светлую тему', dark: 'Включить тёмную тему', language: 'Switch to English', serviceChoice: 'Выбор услуги' },
    hero: { aria: 'Создаю сайты, в которые верят', lineOne: 'Создаю сайты,', lineTwoBefore: 'в которые', lineTwoAfter: 'верят', copyBefore: 'Дизайн, код и', copyAfter: 'для цифровых продуктов с характером.', work: 'Смотреть работы', contact: 'Обсудить проект' },
    work: { eyebrow: 'Избранные работы', title: 'Три проекта с живыми демо.', text: 'Откройте любой проект, прокрутите страницу и проверьте адаптивную версию.', open: 'Открыть кейс', close: 'Закрыть кейс', challenge: 'Задача', solution: 'Решение', role: 'Моя роль', tools: 'Инструменты', demo: 'Открыть демо' },
    services: { title: 'Что можно поручить мне.', text: 'Выберите задачу. Покажу состав работы и подходящий сценарий.', includes: 'В работу входит', fit: 'Подойдёт', discuss: 'Обсудить задачу' },
    story: [
      { title: 'Разобраться', text: 'Определяем аудиторию и действие, к которому ведёт страница.', result: 'Карта страницы' },
      { title: 'Найти характер', text: 'Выбираем типографику и ритм, затем настраиваем цвет и движение.', result: 'Визуальная система' },
      { title: 'Собрать и запустить', text: 'Верстаем адаптивно, проверяем состояния и готовим сайт к реальному использованию.', result: 'Рабочая ссылка' },
    ],
    principles: { previous: 'Предыдущий принцип', next: 'Следующий принцип' },
    contact: { eyebrow: 'Прямой контакт', titleOne: 'Удобный способ', titleTwo: 'связи.', text: 'Опишите задачу, сроки и референсы. Если технического задания пока нет, достаточно рассказать о цели своими словами.', name: 'Ваше имя', namePlaceholder: 'Как к вам обращаться', email: 'Ваша почта', brief: 'Что нужно сделать', briefPlaceholder: 'Коротко опишите задачу, сроки и референсы', consent: 'Я согласен на обработку данных для ответа на заявку.', sending: 'Отправляем...', submit: 'Отправить заявку', sendingStatus: 'Отправляем заявку...', success: 'Заявка отправлена. Я свяжусь с вами по email.', error: 'Не удалось отправить заявку. Напишите мне в Telegram.' },
    footer: { description: 'Сайты, веб-интерфейсы и motion-дизайн для цифровых продуктов.', services: 'Услуги', navigation: 'Навигация', portfolio: 'Портфолио', approach: 'Подход', contacts: 'Контакты', privacy: 'Политика обработки данных', copyright: '© 2026 oxssex. Все права защищены.', close: 'Закрыть', privacyOne: 'Данные из формы используются только для ответа на заявку. Имя, email и описание проекта отправляются на почту владельца сайта через сервис FormSubmit.', privacyTwo: 'Данные не продаются и не используются для рекламных рассылок. Чтобы запросить удаление информации, напишите в Telegram @oxssex.' },
  },
  en: {
    nav: { top: 'Home', work: 'Work', approach: 'Services', contact: 'Contact' },
    aria: { home: 'Back to home', navigation: 'Main navigation', light: 'Use light theme', dark: 'Use dark theme', language: 'Переключить на русский', serviceChoice: 'Choose a service' },
    hero: { aria: 'I build websites people can trust', lineOne: 'I build websites', lineTwoBefore: 'people can', lineTwoAfter: 'trust.', copyBefore: 'Design, code and', copyAfter: 'for digital products with a point of view.', work: 'View selected work', contact: 'Start a project' },
    work: { eyebrow: 'Selected work', title: 'Three projects. Three live demos.', text: 'Open a project, explore the page and try it at any screen size.', open: 'Open case study', close: 'Close case study', challenge: 'Challenge', solution: 'Solution', role: 'My role', tools: 'Tools', demo: 'Open live demo' },
    services: { title: 'What I can take off your plate.', text: 'Choose a task to see the scope and where it fits.', includes: 'What is included', fit: 'Best for', discuss: 'Discuss this project' },
    story: [
      { title: 'Get clear', text: 'Define the audience and the action each page should lead to.', result: 'Page map' },
      { title: 'Find the voice', text: 'Set the type, pace, colour and motion until the product feels like itself.', result: 'Visual system' },
      { title: 'Build and launch', text: 'Develop responsively, test real states and prepare the site for daily use.', result: 'Live website' },
    ],
    principles: { previous: 'Previous principle', next: 'Next principle' },
    contact: { eyebrow: 'Direct contact', titleOne: 'A straightforward', titleTwo: 'way to talk.', text: 'Send the goal, timing and any references you have. No formal brief is required. A plain description is enough to start.', name: 'Your name', namePlaceholder: 'How should I address you?', email: 'Your email', brief: 'What do you need?', briefPlaceholder: 'Tell me about the project, timing and references', consent: 'I agree to the use of my details to reply to this enquiry.', sending: 'Sending...', submit: 'Send enquiry', sendingStatus: 'Sending your enquiry...', success: 'Message sent. I will reply by email.', error: 'The form did not send. Please message me on Telegram.' },
    footer: { description: 'Websites, interfaces and motion design for digital products.', services: 'Services', navigation: 'Navigation', portfolio: 'Portfolio', approach: 'Approach', contacts: 'Contact', privacy: 'Data and privacy', copyright: '© 2026 oxssex. All rights reserved.', close: 'Close', privacyOne: 'Form details are used only to reply to your enquiry. Your name, email and project description are sent to the site owner through FormSubmit.', privacyTwo: 'Your details are not sold or used for marketing. To request deletion, message @oxssex on Telegram.' },
  },
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return [theme, setTheme]
}

function useLanguage() {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'ru')

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.language = language
    if (!new URLSearchParams(window.location.search).has('demo')) {
      document.title = language === 'ru' ? 'oxssex | Дизайн и разработка' : 'oxssex | Design and development'
      document.querySelector('meta[name="description"]')?.setAttribute(
        'content',
        language === 'ru'
          ? 'Портфолио независимого разработчика цифровых продуктов.'
          : 'Independent designer and developer portfolio for digital products.',
      )
    }
    localStorage.setItem('portfolio-language', language)
  }, [language])

  return [language, setLanguage]
}

function LanguageToggle({ language, setLanguage, label }) {
  const nextLanguage = language === 'ru' ? 'en' : 'ru'

  return (
    <button
      className="language-toggle"
      type="button"
      data-language={language}
      onClick={() => setLanguage(nextLanguage)}
      aria-label={label}
    >
      <span className="language-toggle__thumb" aria-hidden="true" />
      <span className={language === 'ru' ? 'is-active' : ''}>RU</span>
      <span className={language === 'en' ? 'is-active' : ''}>EN</span>
    </button>
  )
}

function Header({ theme, setTheme, language, setLanguage, text }) {
  const [activeSection, setActiveSection] = useState('top')
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesMenuRef = useRef(null)
  const navigation = [
    { id: 'top', label: text.nav.top },
    { id: 'work', label: text.nav.work },
    { id: 'approach', label: text.nav.approach },
    { id: 'contact', label: text.nav.contact },
  ]
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-nav-section]'))
    const headerOffset = window.matchMedia('(max-width: 900px)').matches ? 106 : 72

    function syncFromViewport() {
      const marker = headerOffset + window.innerHeight * 0.22
      const current = sections.filter((section) => section.getBoundingClientRect().top <= marker).at(-1)
      setActiveSection((current || sections[0]).dataset.navSection)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top - headerOffset) - Math.abs(b.boundingClientRect.top - headerOffset))[0]
        if (visible) setActiveSection(visible.target.dataset.navSection)
      },
      { rootMargin: `-${headerOffset}px 0px -65% 0px`, threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    const frame = requestAnimationFrame(syncFromViewport)
    window.addEventListener('pageshow', syncFromViewport)
    window.addEventListener('hashchange', syncFromViewport)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pageshow', syncFromViewport)
      window.removeEventListener('hashchange', syncFromViewport)
    }
  }, [])

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!servicesMenuRef.current?.contains(event.target)) setServicesOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  return (
    <header className="header" onKeyDown={(event) => event.key === 'Escape' && setServicesOpen(false)}>
      <a className="wordmark" href="#top" aria-label={text.aria.home}>oxssex</a>
      <nav className="nav-index" aria-label={text.aria.navigation}>
        {navigation.map((item, index) => item.id === 'approach' ? (
          <div
            className="nav-services"
            ref={servicesMenuRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            key={item.id}
          >
            <button
              className={`nav-service-trigger ${activeSection === item.id ? 'is-active' : ''}`}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              onClick={() => setServicesOpen(true)}
            >
              <span className="nav-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="nav-label" data-label={item.label}><span>{item.label}</span></span>
              <CaretDown className="nav-caret" size={13} />
            </button>
            <div className={`services-menu ${servicesOpen ? 'is-open' : ''}`} id="services-dropdown">
              {services.map((service, serviceIndex) => (
                <a
                  href={`#service-${service.id}`}
                  onClick={() => {
                    setActiveSection('approach')
                    setServicesOpen(false)
                  }}
                  key={service.id}
                >
                  <span>{localized(service.title, language)}</span>
                  <small>{String(serviceIndex + 1).padStart(2, '0')}</small>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <a
            className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
            onClick={() => setActiveSection(item.id)}
            key={item.id}
          >
            <span className="nav-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="nav-label" data-label={item.label}><span>{item.label}</span></span>
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="header-telegram" href="https://t.me/oxssex" target="_blank" rel="noreferrer">
          <TelegramLogo size={18} />
          <span>Telegram</span>
        </a>
        <LanguageToggle language={language} setLanguage={setLanguage} label={text.aria.language} />
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? text.aria.light : text.aria.dark}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}

function Hero({ text }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .from('.hero-line > span', { yPercent: 115, duration: 1.15, stagger: 0.09 })
        .from('.hero-copy, .hero-actions', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.65')
        .from('.hero-media', { scale: 0.88, opacity: 0, duration: 1.25 }, '-=0.9')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" data-nav-section="top" ref={root}>
      <div className="hero-title" aria-label={text.aria}>
        <div className="hero-line"><span>{text.lineOne}</span></div>
        <div className="hero-line hero-line--offset">
          <span>{text.lineTwoBefore} <i className="inline-image" style={{ backgroundImage: `url(${imagePath('principle-motion.jpg')})` }} aria-hidden="true" /> {text.lineTwoAfter}</span>
        </div>
      </div>
      <div className="hero-bottom">
        <p className="hero-copy">
          {text.copyBefore}{' '}
          <span className="motion-word" aria-label="motion">
            {'motion'.split('').map((letter, index) => (
              <span className="motion-letter" style={{ '--letter-index': index }} aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>
            ))}
          </span>{' '}
          {text.copyAfter}
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#work">{text.work} <ArrowDownRight size={19} /></a>
          <a className="button button--secondary" href="#contact">{text.contact}</a>
        </div>
      </div>
      <div className="hero-media" style={{ backgroundImage: `url(${imagePath('project-aperture.jpg')})` }} aria-hidden="true">
        <div className="hero-media__veil" />
      </div>
    </section>
  )
}

function Work({ language, text }) {
  const root = useRef(null)
  const dialog = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (!selectedProject || dialog.current?.open) return
    dialog.current?.showModal()
  }, [selectedProject])

  function closeProject() {
    dialog.current?.close()
  }

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.project', {
        scale: 0.94,
        opacity: 0.5,
      }, {
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'top 28%', scrub: 0.8 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section work" id="work" data-nav-section="work" ref={root}>
      <p className="eyebrow">{text.eyebrow}</p>
      <h2>{text.title}</h2>
      <p className="section-copy">{text.text}</p>
      <div className="project-grid">
        {projects.map((project) => (
          <button
            className={`project ${project.className}`}
            type="button"
            onClick={() => setSelectedProject(project)}
            aria-label={`${text.open} ${project.title}`}
            key={project.title}
          >
            <div className="project-visual">
              <img src={project.image} alt={localized(project.alt, language)} loading="lazy" />
            </div>
            <div className="project-meta">
              <div>
                <h3>{project.title}</h3>
                <p>{localized(project.type, language)}</p>
              </div>
              <span className="project-arrow" aria-hidden="true"><ArrowDownRight size={22} /></span>
            </div>
          </button>
        ))}
      </div>
      <dialog
        className="project-dialog"
        ref={dialog}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => event.target === event.currentTarget && closeProject()}
      >
        {selectedProject && (
          <div className="project-dialog__panel">
            <button className="project-dialog__close" type="button" onClick={closeProject} aria-label={text.close}>
              <X size={22} />
            </button>
            <div className="project-dialog__media">
              <img src={selectedProject.image} alt={localized(selectedProject.alt, language)} />
            </div>
            <div className="project-dialog__content">
              <p className="project-dialog__type">{localized(selectedProject.type, language)}</p>
              <h3>{selectedProject.title}</h3>
              <p className="project-dialog__summary">{localized(selectedProject.summary, language)}</p>
              <div className="project-dialog__facts">
                <section>
                  <h4>{text.challenge}</h4>
                  <p>{localized(selectedProject.challenge, language)}</p>
                </section>
                <section>
                  <h4>{text.solution}</h4>
                  <p>{localized(selectedProject.solution, language)}</p>
                </section>
              </div>
              <div className="project-dialog__footer">
                <p><strong>{text.role}</strong><span>{localized(selectedProject.role, language)}</span></p>
                <p><strong>{text.tools}</strong><span>{selectedProject.stack}</span></p>
              </div>
              <a className="project-dialog__demo" href={selectedProject.demo} target="_blank" rel="noreferrer">
                {text.demo} <ArrowDownRight size={20} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function Services({ language, text }) {
  const [active, setActive] = useState(0)
  const activeService = services[active]

  useEffect(() => {
    function selectServiceFromHash() {
      const id = window.location.hash.replace('#service-', '')
      const index = services.findIndex((service) => service.id === id)
      if (index >= 0) setActive(index)
    }

    selectServiceFromHash()
    window.addEventListener('hashchange', selectServiceFromHash)
    return () => window.removeEventListener('hashchange', selectServiceFromHash)
  }, [])

  return (
    <section className="section services" id="approach" data-nav-section="approach">
      <div className="services-heading">
        <h2>{text.title}</h2>
        <p>{text.text}</p>
      </div>
      <div className="service-composer">
        <div className="service-list" role="tablist" aria-label={copy[language].aria.serviceChoice}>
          {services.map(({ id, title }, index) => (
          <button
            className={`service-option ${active === index ? 'is-active' : ''}`}
            id={`service-${id}`}
            type="button"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            key={id}
            role="tab"
            aria-selected={active === index}
            aria-controls="service-detail"
          >
            <span>{localized(title, language)}</span>
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        ))}
        </div>
        <article
          className="service-detail"
          id="service-detail"
          role="tabpanel"
          aria-labelledby={`service-${activeService.id}`}
          key={activeService.id}
        >
          <h3>{localized(activeService.shortTitle, language)}</h3>
          <p className="service-detail__lead">{localized(activeService.text, language)}</p>
          <div className="service-detail__body">
            <section>
              <h4>{text.includes}</h4>
              <ul>
                {localized(activeService.includes, language).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h4>{text.fit}</h4>
              <p>{localized(activeService.fit, language)}</p>
            </section>
          </div>
          <a className="service-detail__link" href="#contact">{text.discuss} <ArrowDownRight size={19} /></a>
        </article>
      </div>
    </section>
  )
}

function Story({ cards }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.story-card__inner', {
          y: 28,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            once: true,
          },
        })
      }, root)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [])

  return (
    <section className="story" data-nav-section="approach" ref={root}>
      {cards.map(({ title, text, result }) => (
        <article className="story-card" key={title}>
          <div className="story-card__inner">
            <span className="story-card__result">{result}</span>
            <div className="story-card__copy">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function Principles({ language, text }) {
  const [active, setActive] = useState(0)
  const item = principles[active]

  return (
    <section className="section principles" data-nav-section="approach" aria-live="polite">
      <div className="principle-media">
        {principles.map((principle, index) => (
          <img
            className={index === active ? 'is-active' : ''}
            src={principle.image}
            alt=""
            key={principle.image}
          />
        ))}
      </div>
      <div className="principle-copy">
        <h2>{localized(item.title, language)}</h2>
        <p>{localized(item.text, language)}</p>
        <dl className="principle-points">
          {localized(item.points, language).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="principle-outcome">{localized(item.outcome, language)}</p>
        <div className="carousel-controls">
          <button type="button" onClick={() => setActive((active - 1 + principles.length) % principles.length)} aria-label={text.previous}>
            <ArrowLeft size={21} />
          </button>
          <button type="button" onClick={() => setActive((active + 1) % principles.length)} aria-label={text.next}>
            <ArrowRight size={21} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Contact({ language, text, footerText }) {
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const privacyDialog = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    setSubmitting(true)
    setStatus(text.sendingStatus)

    try {
      const response = await fetch('https://formsubmit.co/ajax/chasovskoi.platon@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('brief'),
          _replyto: form.get('email'),
          _subject: language === 'ru' ? 'Новая заявка с сайта oxssex' : 'New enquiry from oxssex',
          _template: 'table',
          _honey: form.get('_honey'),
        }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false) throw new Error('Submission failed')
      formElement.reset()
      setStatus(text.success)
    } catch {
      setStatus(text.error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="contact" id="contact" data-nav-section="contact">
      <div className="contact-grid">
        <div className="contact-info">
          <p className="contact-eyebrow">{text.eyebrow}</p>
          <h2>{text.titleOne}<br />{text.titleTwo}</h2>
          <p>{text.text}</p>
          <a className="telegram-link" href="https://t.me/oxssex" target="_blank" rel="noreferrer">
            <TelegramLogo size={24} weight="regular" />
            Telegram @oxssex
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              {text.name}
              <input name="name" placeholder={text.namePlaceholder} required />
            </label>
            <label>
              {text.email}
              <input name="email" type="email" placeholder="name@example.com" autoComplete="email" required />
            </label>
          </div>
          <label>
            {text.brief}
            <textarea name="brief" placeholder={text.briefPlaceholder} required rows="6" />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            <span>{text.consent}</span>
          </label>
          <input className="form-honey" type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          <button className="form-submit" type="submit" disabled={submitting}>
            <PaperPlaneTilt size={21} weight="regular" />
            {submitting ? text.sending : text.submit}
          </button>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </div>
      <div className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top">oxssex</a>
            <p>{footerText.description}</p>
            <a className="footer-telegram" href="https://t.me/oxssex" target="_blank" rel="noreferrer">Telegram</a>
          </div>
          <nav className="footer-column" aria-label={footerText.services}>
            <p>{footerText.services}</p>
            {services.map((service) => (
              <a href={`#service-${service.id}`} key={service.id}>{localized(service.title, language)}</a>
            ))}
          </nav>
          <nav className="footer-column" aria-label={footerText.navigation}>
            <p>{footerText.navigation}</p>
            <a href="#work">{footerText.portfolio}</a>
            <a href="#approach">{footerText.approach}</a>
            <a href="#contact">{footerText.contacts}</a>
            <button type="button" onClick={() => privacyDialog.current?.showModal()}>{footerText.privacy}</button>
          </nav>
        </div>
        <p className="footer-copyright">{footerText.copyright}</p>
      </div>
      <dialog className="privacy-dialog" ref={privacyDialog}>
        <div className="privacy-dialog__header">
          <h2>{footerText.privacy}</h2>
          <button type="button" onClick={() => privacyDialog.current?.close()} aria-label={footerText.close}>{footerText.close}</button>
        </div>
        <p>{footerText.privacyOne}</p>
        <p>{footerText.privacyTwo}</p>
      </dialog>
    </footer>
  )
}

function Portfolio({ language, setLanguage }) {
  const [theme, setTheme] = useTheme()
  const text = copy[language]

  return (
    <main className="portfolio-shell" data-language={language}>
      <Header theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} text={text} />
      <Hero text={text.hero} />
      <Work language={language} text={text.work} />
      <Services language={language} text={text.services} />
      <Story cards={text.story} />
      <Principles language={language} text={text.principles} />
      <Contact language={language} text={text.contact} footerText={text.footer} />
    </main>
  )
}

export default function App() {
  const [language, setLanguage] = useLanguage()
  const demoSlug = new URLSearchParams(window.location.search).get('demo')
  return demoSlug ? <DemoProject slug={demoSlug} language={language} /> : <Portfolio language={language} setLanguage={setLanguage} />
}
