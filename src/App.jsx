import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, CaretDown, Moon, Sun, PaperPlaneTilt, TelegramLogo, X } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DemoProject } from './Demos'

gsap.registerPlugin(ScrollTrigger)

const imagePath = (fileName) => `${import.meta.env.BASE_URL}images/${fileName}`
const demoPath = (slug) => `${import.meta.env.BASE_URL}?demo=${slug}`

const projects = [
  {
    title: 'Nocturne',
    type: 'Живой концепт музыкальной платформы',
    image: imagePath('demo-nocturne.png'),
    alt: 'Главный экран музыкальной платформы Nocturne',
    className: 'project--lead',
    summary: 'Музыкальная платформа с вечерними подборками, встроенным проигрывателем и выразительной редакционной подачей.',
    challenge: 'Сделать открытие новой музыки спокойным и последовательным, без перегруженных рекомендаций.',
    solution: 'Контрастная типографика, управляемый плеер и программа эфира собирают понятный сценарий прослушивания.',
    role: 'Концепция, UX/UI, React-разработка',
    stack: 'React, Vite, GSAP, CSS',
    demo: demoPath('nocturne'),
  },
  {
    title: 'Forma',
    type: 'Живой концепт архитектурного бюро',
    image: imagePath('demo-forma.png'),
    alt: 'Главный экран архитектурного бюро Forma',
    className: '',
    summary: 'Портфолио архитектурного бюро с крупными проектами, спокойным ритмом и ясной студийной позицией.',
    challenge: 'Показать масштаб архитектуры и одновременно сделать навигацию по работам быстрой и ясной.',
    solution: 'Крупные изображения, строгая сетка и холодный синий акцент оставляют главное внимание пространству.',
    role: 'Арт-дирекшн, UX/UI, React-разработка',
    stack: 'Figma, React, CSS Grid',
    demo: demoPath('forma'),
  },
  {
    title: 'Aperture',
    type: 'Живой концепт фотостудии',
    image: imagePath('demo-aperture.png'),
    alt: 'Главный экран фотостудии Aperture',
    className: '',
    summary: 'Сайт фотостудии с живой галереей, выразительным первым экраном и прямым сценарием бронирования.',
    challenge: 'Соединить эмоциональную галерею с понятным коммерческим предложением и быстрым контактом.',
    solution: 'Асимметричная галерея, тёмная палитра и мятный акцент превращают просмотр в цельную историю.',
    role: 'Концепция, UX/UI, React-разработка',
    stack: 'Figma, React, CSS Grid',
    demo: demoPath('aperture'),
  },
]

const services = [
  {
    id: 'websites',
    title: 'Разработка сайтов',
    shortTitle: 'Сайты',
    text: 'Проектирую лендинги и портфолио с понятной структурой и своим визуальным языком.',
    includes: ['Структура и прототип', 'Дизайн ключевых экранов', 'Адаптивная React-сборка'],
    fit: 'Для запуска услуги, продукта или личного бренда.',
  },
  {
    id: 'interfaces',
    title: 'Веб-интерфейсы',
    shortTitle: 'Интерфейсы',
    text: 'Собираю экраны, в которых легко найти нужное действие и понять результат.',
    includes: ['Карта сценариев', 'Компоненты и состояния', 'Кликабельный прототип'],
    fit: 'Для личного кабинета, каталога или сложного пользовательского пути.',
  },
  {
    id: 'motion',
    title: 'Motion-дизайн',
    shortTitle: 'Motion',
    text: 'Добавляю движение там, где оно объясняет иерархию, смену состояния или ход истории.',
    includes: ['Микроанимации', 'Скролл-сцены', 'Состояния и переходы'],
    fit: 'Для готового сайта, которому не хватает ритма и обратной связи.',
  },
  {
    id: 'launch',
    title: 'Запуск проекта',
    shortTitle: 'Запуск',
    text: 'Довожу готовый макет до публичной ссылки и проверяю его на реальных экранах.',
    includes: ['Адаптивная верстка', 'Базовое SEO', 'Публикация и проверка'],
    fit: 'Для макета в Figma, которому нужны код, домен и стабильная сборка.',
  },
]

const principles = [
  {
    title: 'Сначала смысл',
    text: 'До макета фиксирую, кому нужен сайт, что человек должен понять и какое действие совершить.',
    points: [
      ['Кому', 'конкретный клиент'],
      ['Что', 'одна мысль на экран'],
      ['Действие', 'заявка, покупка или контакт'],
    ],
    outcome: 'На выходе: карта страницы и черновик текста.',
    image: imagePath('principle-focus.jpg'),
  },
  {
    title: 'Движение по делу',
    text: 'Анимирую только те моменты, где движение помогает человеку заметить главное и понять смену состояния.',
    points: [
      ['Иерархия', 'взгляд идёт к главному'],
      ['Отклик', 'интерфейс отвечает на действие'],
      ['Ритм', 'смена блоков не теряется'],
    ],
    outcome: 'На выходе: набор анимаций с понятной ролью.',
    image: imagePath('principle-motion.jpg'),
  },
  {
    title: 'Готово к росту',
    text: 'Собираю сайт из компонентов. Вы сможете добавить кейс, услугу или новый экран без переделки остальных разделов.',
    points: [
      ['Система', 'повторяемые компоненты'],
      ['Контент', 'понятные места для замены'],
      ['Проверка', 'телефон, клавиатура и быстрая загрузка'],
    ],
    outcome: 'На выходе: сайт, который не придётся собирать заново.',
    image: imagePath('project-forma.jpg'),
  },
]

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

function Header({ theme, setTheme }) {
  const [activeSection, setActiveSection] = useState('top')
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesMenuRef = useRef(null)
  const navigation = [
    { id: 'top', label: 'Главная' },
    { id: 'work', label: 'Работы' },
    { id: 'approach', label: 'Услуги' },
    { id: 'contact', label: 'Контакт' },
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
      <a className="wordmark" href="#top" aria-label="На главную">oxssex</a>
      <nav className="nav-index" aria-label="Основная навигация">
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
                  <span>{service.title}</span>
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
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
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
      <div className="hero-title" aria-label="Создаю сайты, в которые верят">
        <div className="hero-line"><span>Создаю сайты,</span></div>
        <div className="hero-line hero-line--offset">
          <span>в которые <i className="inline-image" style={{ backgroundImage: `url(${imagePath('principle-motion.jpg')})` }} aria-hidden="true" /> верят</span>
        </div>
      </div>
      <div className="hero-bottom">
        <p className="hero-copy">
          Дизайн, код и{' '}
          <span className="motion-word" aria-label="motion">
            {'motion'.split('').map((letter, index) => (
              <span className="motion-letter" style={{ '--letter-index': index }} aria-hidden="true" key={`${letter}-${index}`}>{letter}</span>
            ))}
          </span>{' '}
          для цифровых продуктов с характером.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#work">Смотреть работы <ArrowDownRight size={19} /></a>
          <a className="button button--secondary" href="#contact">Обсудить проект</a>
        </div>
      </div>
      <div className="hero-media" style={{ backgroundImage: `url(${imagePath('project-aperture.jpg')})` }} aria-hidden="true">
        <div className="hero-media__veil" />
      </div>
    </section>
  )
}

function Work() {
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
      <p className="eyebrow">Избранные работы</p>
      <h2>Три проекта с живыми демо.</h2>
      <p className="section-copy">Откройте любой проект, прокрутите страницу и проверьте адаптивную версию.</p>
      <div className="project-grid">
        {projects.map((project) => (
          <button
            className={`project ${project.className}`}
            type="button"
            onClick={() => setSelectedProject(project)}
            aria-label={`Открыть кейс ${project.title}`}
            key={project.title}
          >
            <div className="project-visual">
              <img src={project.image} alt={project.alt} loading="lazy" />
            </div>
            <div className="project-meta">
              <div>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
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
            <button className="project-dialog__close" type="button" onClick={closeProject} aria-label="Закрыть кейс">
              <X size={22} />
            </button>
            <div className="project-dialog__media">
              <img src={selectedProject.image} alt={selectedProject.alt} />
            </div>
            <div className="project-dialog__content">
              <p className="project-dialog__type">{selectedProject.type}</p>
              <h3>{selectedProject.title}</h3>
              <p className="project-dialog__summary">{selectedProject.summary}</p>
              <div className="project-dialog__facts">
                <section>
                  <h4>Задача</h4>
                  <p>{selectedProject.challenge}</p>
                </section>
                <section>
                  <h4>Решение</h4>
                  <p>{selectedProject.solution}</p>
                </section>
              </div>
              <div className="project-dialog__footer">
                <p><strong>Моя роль</strong><span>{selectedProject.role}</span></p>
                <p><strong>Инструменты</strong><span>{selectedProject.stack}</span></p>
              </div>
              <a className="project-dialog__demo" href={selectedProject.demo} target="_blank" rel="noreferrer">
                Открыть демо <ArrowDownRight size={20} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function Services() {
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
        <h2>Что можно поручить мне.</h2>
        <p>Выберите задачу. Покажу состав работы и подходящий сценарий.</p>
      </div>
      <div className="service-composer">
        <div className="service-list" role="tablist" aria-label="Выбор услуги">
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
            <span>{title}</span>
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
          <h3>{activeService.shortTitle}</h3>
          <p className="service-detail__lead">{activeService.text}</p>
          <div className="service-detail__body">
            <section>
              <h4>В работу входит</h4>
              <ul>
                {activeService.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h4>Подойдёт</h4>
              <p>{activeService.fit}</p>
            </section>
          </div>
          <a className="service-detail__link" href="#contact">Обсудить задачу <ArrowDownRight size={19} /></a>
        </article>
      </div>
    </section>
  )
}

function Story() {
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

  const cards = [
    { title: 'Разобраться', text: 'Определяем аудиторию и действие, к которому ведёт страница.', result: 'Карта страницы' },
    { title: 'Найти характер', text: 'Выбираем типографику и ритм, затем настраиваем цвет и движение.', result: 'Визуальная система' },
    { title: 'Собрать и запустить', text: 'Верстаем адаптивно, проверяем состояния и готовим сайт к реальному использованию.', result: 'Рабочая ссылка' },
  ]

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

function Principles() {
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
            key={principle.title}
          />
        ))}
      </div>
      <div className="principle-copy">
        <h2>{item.title}</h2>
        <p>{item.text}</p>
        <dl className="principle-points">
          {item.points.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="principle-outcome">{item.outcome}</p>
        <div className="carousel-controls">
          <button type="button" onClick={() => setActive((active - 1 + principles.length) % principles.length)} aria-label="Предыдущий принцип">
            <ArrowLeft size={21} />
          </button>
          <button type="button" onClick={() => setActive((active + 1) % principles.length)} aria-label="Следующий принцип">
            <ArrowRight size={21} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const privacyDialog = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    setSubmitting(true)
    setStatus('Отправляем заявку...')

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
          _subject: 'Новая заявка с сайта oxssex',
          _template: 'table',
          _honey: form.get('_honey'),
        }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false) throw new Error('Submission failed')
      formElement.reset()
      setStatus('Заявка отправлена. Я свяжусь с вами по email.')
    } catch {
      setStatus('Не удалось отправить заявку. Напишите мне в Telegram.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="contact" id="contact" data-nav-section="contact">
      <div className="contact-grid">
        <div className="contact-info">
          <p className="contact-eyebrow">Прямой контакт</p>
          <h2>Удобный способ<br />связи.</h2>
          <p>Опишите задачу, сроки и референсы. Если технического задания пока нет, достаточно рассказать о цели своими словами.</p>
          <a className="telegram-link" href="https://t.me/oxssex" target="_blank" rel="noreferrer">
            <TelegramLogo size={24} weight="regular" />
            Telegram @oxssex
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Ваше имя
              <input name="name" placeholder="Как к вам обращаться" required />
            </label>
            <label>
              Ваша почта
              <input name="email" type="email" placeholder="name@example.com" autoComplete="email" required />
            </label>
          </div>
          <label>
            Что нужно сделать
            <textarea name="brief" placeholder="Коротко опишите задачу, сроки и референсы" required rows="6" />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            <span>Я согласен на обработку данных для ответа на заявку.</span>
          </label>
          <input className="form-honey" type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          <button className="form-submit" type="submit" disabled={submitting}>
            <PaperPlaneTilt size={21} weight="regular" />
            {submitting ? 'Отправляем...' : 'Отправить заявку'}
          </button>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </div>
      <div className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top">oxssex</a>
            <p>Сайты, веб-интерфейсы и motion-дизайн для цифровых продуктов.</p>
            <a className="footer-telegram" href="https://t.me/oxssex" target="_blank" rel="noreferrer">Telegram</a>
          </div>
          <nav className="footer-column" aria-label="Услуги">
            <p>Услуги</p>
            {services.map((service) => (
              <a href={`#service-${service.id}`} key={service.id}>{service.title}</a>
            ))}
          </nav>
          <nav className="footer-column" aria-label="Навигация">
            <p>Навигация</p>
            <a href="#work">Портфолио</a>
            <a href="#approach">Подход</a>
            <a href="#contact">Контакты</a>
            <button type="button" onClick={() => privacyDialog.current?.showModal()}>Политика обработки данных</button>
          </nav>
        </div>
        <p className="footer-copyright">© 2026 oxssex. Все права защищены.</p>
      </div>
      <dialog className="privacy-dialog" ref={privacyDialog}>
        <div className="privacy-dialog__header">
          <h2>Политика обработки данных</h2>
          <button type="button" onClick={() => privacyDialog.current?.close()} aria-label="Закрыть">Закрыть</button>
        </div>
        <p>Данные из формы используются только для ответа на заявку. Имя, email и описание проекта отправляются на почту владельца сайта через сервис FormSubmit.</p>
        <p>Данные не продаются и не используются для рекламных рассылок. Чтобы запросить удаление информации, напишите в Telegram @oxssex.</p>
      </dialog>
    </footer>
  )
}

function Portfolio() {
  const [theme, setTheme] = useTheme()

  return (
    <main>
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      <Work />
      <Services />
      <Story />
      <Principles />
      <Contact />
    </main>
  )
}

export default function App() {
  const demoSlug = new URLSearchParams(window.location.search).get('demo')
  return demoSlug ? <DemoProject slug={demoSlug} /> : <Portfolio />
}
