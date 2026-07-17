import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, CaretDown, Moon, Sun, PaperPlaneTilt, TelegramLogo, X } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const imagePath = (fileName) => `${import.meta.env.BASE_URL}images/${fileName}`

const projects = [
  {
    title: 'oxssex',
    type: 'Персональное портфолио',
    year: '2026',
    image: imagePath('project-oxssex.png'),
    alt: 'Меню услуг в портфолио oxssex',
    className: 'project--lead',
    summary: 'Личный сайт, который показывает специализацию, процесс и характер работы до первого сообщения.',
    challenge: 'Собрать услуги, кейсы и прямой контакт на одной странице, не превращая портфолио в каталог.',
    solution: 'Крупная типографика, живые состояния и motion-сцены ведут пользователя от знакомства к заявке.',
    role: 'Стратегия, UX/UI, React-разработка',
    stack: 'React, Vite, GSAP, CSS',
  },
  {
    title: 'Nocturne',
    type: 'Концепт музыкальной платформы',
    year: '2026',
    image: imagePath('project-nocturne.jpg'),
    alt: 'Панорама города для визуального направления Nocturne',
    className: '',
    summary: 'Атмосферный интерфейс для музыкальных подборок, где настроение важнее количества элементов.',
    challenge: 'Дать музыке визуальный ритм и сохранить простой путь от открытия подборки до прослушивания.',
    solution: 'Контрастная композиция, монохромная фотография и спокойная анимация создают цельный сценарий.',
    role: 'Концепция, арт-дирекшн, прототип',
    stack: 'Figma, React, GSAP',
  },
  {
    title: 'Forma',
    type: 'Концепт архитектурного бюро',
    year: '2026',
    image: imagePath('project-aperture.jpg'),
    alt: 'Архитектура исторического здания для проекта Forma',
    className: '',
    summary: 'Сдержанный сайт бюро, в котором проекты читаются как пространство, а не как набор карточек.',
    challenge: 'Показать масштаб архитектуры и одновременно сделать навигацию по работам быстрой и ясной.',
    solution: 'Вертикальный ритм, крупные кадры и минимум интерфейсного шума оставляют внимание проектам.',
    role: 'UX/UI, визуальная система, frontend',
    stack: 'Figma, React, CSS Grid',
  },
  {
    title: 'Aperture',
    type: 'Концепт сайта фотостудии',
    year: '2026',
    image: imagePath('project-forma.jpg'),
    alt: 'Плёночные камеры для проекта Aperture',
    className: '',
    summary: 'Портфолио фотостудии с акцентом на серии работ, фактуру плёнки и уверенную подачу услуг.',
    challenge: 'Соединить эмоциональную галерею с понятным коммерческим предложением и быстрым контактом.',
    solution: 'Асимметричная сетка и тактильные переходы превращают просмотр работ в короткую визуальную историю.',
    role: 'Концепция, UX/UI, motion',
    stack: 'Figma, React, GSAP',
  },
]

const services = [
  { id: 'websites', title: 'Разработка сайтов', shortTitle: 'Сайты', text: 'Лендинги и портфолио, которые выглядят дороже шаблонных решений.' },
  { id: 'interfaces', title: 'Веб-интерфейсы', shortTitle: 'Интерфейсы', text: 'Продуктовые страницы с ясной логикой, сильным ритмом и живыми состояниями.' },
  { id: 'motion', title: 'Motion-дизайн', shortTitle: 'Motion', text: 'Скролл-сцены и микроанимации, которые ведут взгляд и объясняют структуру.' },
  { id: 'launch', title: 'Запуск проекта', shortTitle: 'Запуск', text: 'Адаптивная сборка, базовое SEO и подготовка проекта к публикации.' },
]

const principles = [
  {
    title: 'Сначала смысл',
    text: 'Каждая секция отвечает на один вопрос. Дизайн усиливает ответ, а не спорит с ним.',
    image: imagePath('principle-focus.jpg'),
  },
  {
    title: 'Движение по делу',
    text: 'Анимация показывает иерархию, смену состояния и ход истории. Никакого визуального шума.',
    image: imagePath('principle-motion.jpg'),
  },
  {
    title: 'Готово к росту',
    text: 'Компоненты и контент устроены так, чтобы новые кейсы добавлялись без полного редизайна.',
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
  const activeIndex = Math.max(0, navigation.findIndex((item) => item.id === activeSection))

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.4] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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
      <div className="header-progress" aria-hidden="true">
        <span style={{ '--nav-index': activeIndex }} />
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
    <section className="hero" id="top" ref={root}>
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
    <section className="section work" id="work" ref={root}>
      <p className="eyebrow">Избранные работы</p>
      <h2>Проекты, которым есть что сказать.</h2>
      <p className="section-copy">Один запущенный проект и три концепта, в которых видно мой подход к структуре, визуалу и движению.</p>
      <div className="project-grid">
        {projects.map((project) => (
          <button
            className={`project ${project.className}`}
            type="button"
            onClick={() => setSelectedProject(project)}
            aria-label={`Открыть кейс ${project.title}`}
            key={project.title}
          >
            <img src={project.image} alt={project.alt} loading="lazy" />
            <div className="project-shade" />
            <div className="project-meta">
              <div>
                <h3>{project.title}</h3>
                <p>{project.type} <span aria-hidden="true">/</span> {project.year}</p>
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
              <p className="project-dialog__type">{selectedProject.type} / {selectedProject.year}</p>
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
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function Services() {
  const [active, setActive] = useState(0)

  return (
    <section className="section services" id="approach">
      <h2>От идеи до работающей ссылки.</h2>
      <div className="service-accordion">
        {services.map(({ id, shortTitle: title, text }, index) => (
          <button
            className={`service-panel ${active === index ? 'is-active' : ''}`}
            id={`service-${id}`}
            type="button"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            key={id}
            aria-expanded={active === index}
          >
            <span className="service-title">{title}</span>
            <span className="service-text">{text}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Story() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.story-card')
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        })
        gsap.to(card.querySelector('.story-card__inner'), {
          scale: 0.92,
          opacity: 0.42,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const cards = [
    ['Разобраться', 'Собираем цель, аудиторию и одно действие, к которому ведёт страница.'],
    ['Найти характер', 'Выбираем типографику, ритм, цвет и движение. Всё работает как одна система.'],
    ['Собрать и запустить', 'Верстаем адаптивно, проверяем состояния и готовим сайт к реальному использованию.'],
  ]

  return (
    <section className="story" ref={root}>
      {cards.map(([title, text]) => (
        <article className="story-card" key={title}>
          <div className="story-card__inner">
            <h3>{title}</h3>
            <p>{text}</p>
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
    <section className="section principles" aria-live="polite">
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
    <footer className="contact" id="contact">
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

export default function App() {
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
