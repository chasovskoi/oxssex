import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowDownRight, ArrowRight, MagnifyingGlass, Pause, Play, ShoppingBag, UserCircle, X } from '@phosphor-icons/react'
import './demos.css'

const baseUrl = import.meta.env.BASE_URL
const imagePath = (fileName) => `${baseUrl}images/${fileName}`

function DemoFrame({ className, title, language, children }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | oxssex demo`
    return () => { document.title = previousTitle }
  }, [title])

  return (
    <main className={`demo ${className}`}>
      <a className="demo-back" href={`${baseUrl}#work`}>
        <ArrowLeft size={22} />
        <span>{language === 'en' ? 'Back to portfolio' : 'Вернуться в портфолио'}</span>
      </a>
      {children}
    </main>
  )
}

function NocturneDemo({ language }) {
  const [playing, setPlaying] = useState(false)
  const tracks = [
    ['Soft Static', 'Mira Vale'],
    ['Night Windows', 'Common Hours'],
    ['Before the Trains', 'Nadia Moss'],
  ]

  return (
    <DemoFrame className="demo-nocturne" title="Nocturne" language={language}>
      <header className="demo-nav nocturne-nav">
        <a className="demo-brand" href="#top">Nocturne FM</a>
        <nav aria-label="Nocturne navigation">
          <a href="#program">Program</a>
          <a href="#about">About</a>
        </nav>
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause radio' : 'Play radio'}>
          {playing ? <Pause size={17} weight="fill" /> : <Play size={17} weight="fill" />}
          <span>{playing ? 'On air' : 'Listen'}</span>
        </button>
      </header>

      <section className="nocturne-hero" id="top">
        <div className="nocturne-copy">
          <p>Independent radio for late hours</p>
          <h1>Music after dark.</h1>
          <a href="#program">Tonight’s program <ArrowDownRight size={22} /></a>
        </div>
        <figure className="nocturne-cover">
          <img src={imagePath('project-nocturne.jpg')} alt="A city at night in monochrome" />
          <figcaption>Broadcasting quiet music for loud cities.</figcaption>
        </figure>
      </section>

      <section className="nocturne-program" id="program">
        <h2>Tonight on Nocturne</h2>
        <div className="nocturne-tracks">
          {tracks.map(([track, artist], index) => (
            <button type="button" onClick={() => setPlaying(true)} key={track}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{track}</strong>
              <small>{artist}</small>
              <Play size={17} weight="fill" />
            </button>
          ))}
        </div>
      </section>

      <section className="nocturne-about" id="about">
        <p>No algorithms chasing attention. A human-made sequence, renewed every evening.</p>
        <a href="#top">Return to broadcast <ArrowRight size={20} /></a>
      </section>
    </DemoFrame>
  )
}

function FormaDemo({ language }) {
  const isEnglish = language === 'en'
  const articles = [
    {
      title: isEnglish ? 'LED stages reach smaller regional studios' : 'LED-павильоны выходят за пределы столичных студий',
      category: isEnglish ? 'Production' : 'Продакшен',
      image: 'project-aperture.jpg',
    },
    {
      title: isEnglish ? 'How camera tracking changes pre-production' : 'Как camera tracking меняет препродакшен',
      category: isEnglish ? 'Technology' : 'Технологии',
      image: 'project-nocturne.jpg',
    },
  ]

  return (
    <DemoFrame className="demo-forma" title="VP/Report" language={language}>
      <header className="demo-nav report-nav">
        <a className="demo-brand report-brand" href="#top">VP/R</a>
        <nav aria-label={isEnglish ? 'Publication navigation' : 'Навигация издания'}>
          <a href="#latest">{isEnglish ? 'News' : 'Новости'}</a>
          <a href="#latest">{isEnglish ? 'Directory' : 'Каталог'}</a>
          <a href="#latest">{isEnglish ? 'Learning' : 'Обучение'}</a>
          <a href="#about">{isEnglish ? 'About' : 'О проекте'}</a>
        </nav>
        <button className="report-search" type="button" aria-label={isEnglish ? 'Search' : 'Поиск'}><MagnifyingGlass size={20} /></button>
      </header>

      <section className="report-hero" id="top">
        <img src={imagePath('project-forma.jpg')} alt={isEnglish ? 'Cameras prepared for a studio production' : 'Камеры, подготовленные к студийной съёмке'} />
        <div className="report-feature">
          <p>{isEnglish ? 'Main story' : 'Главный материал'}</p>
          <h1>{isEnglish ? 'Virtual production moves beyond the soundstage' : 'Виртуальный продакшен выходит за пределы павильона'}</h1>
          <time dateTime="2026-07-18">18.07.2026</time>
        </div>
      </section>

      <section className="report-latest" id="latest">
        <div className="report-feed">
          <h2>{isEnglish ? 'Latest stories' : 'Последние материалы'}</h2>
          {articles.map((article) => (
            <article key={article.title}>
              <img src={imagePath(article.image)} alt="" />
              <div>
                <p>{article.category}</p>
                <h3>{article.title}</h3>
                <a href="#top">{isEnglish ? 'Read story' : 'Читать материал'} <ArrowRight size={18} /></a>
              </div>
            </article>
          ))}
        </div>
        <aside className="report-subscribe" id="about">
          <h2>{isEnglish ? 'One useful letter a week' : 'Одно полезное письмо в неделю'}</h2>
          <p>{isEnglish ? 'Production news, tools and practical breakdowns.' : 'Новости индустрии, инструменты и разборы без лишнего шума.'}</p>
          <label>
            <span>{isEnglish ? 'Email address' : 'Email'}</span>
            <input type="email" placeholder="name@example.com" />
          </label>
          <button type="button">{isEnglish ? 'Subscribe' : 'Подписаться'}</button>
        </aside>
      </section>
    </DemoFrame>
  )
}

function OffsetDemo({ language }) {
  const isEnglish = language === 'en'
  const loginDialog = useRef(null)
  const [bagCount, setBagCount] = useState(0)
  const [loggingIn, setLoggingIn] = useState(false)
  const [accountActive, setAccountActive] = useState(false)
  const products = [
    { name: 'Courtyard, Rome', size: '50 × 70 cm', price: '€48', image: 'project-aperture.jpg' },
    { name: 'Night District', size: '40 × 50 cm', price: '€36', image: 'project-nocturne.jpg' },
    { name: 'Analogue Shelf', size: '30 × 40 cm', price: '€29', image: 'project-forma.jpg' },
  ]

  async function handleDemoLogin(event) {
    event.preventDefault()
    setLoggingIn(true)
    await new Promise((resolve) => setTimeout(resolve, 650))
    setAccountActive(true)
    setLoggingIn(false)
  }

  return (
    <DemoFrame className="demo-offset" title="Offset Store" language={language}>
      <header className="offset-nav">
        <a className="offset-brand" href="#top">OFFSET</a>
        <nav aria-label={isEnglish ? 'Shop navigation' : 'Навигация магазина'}>
          <a href="#prints">{isEnglish ? 'Prints' : 'Принты'}</a>
          <a href="#about">{isEnglish ? 'About' : 'О магазине'}</a>
        </nav>
        <div className="offset-actions">
          <button type="button" onClick={() => loginDialog.current?.showModal()}>
            <UserCircle size={20} />
            <span>{accountActive ? (isEnglish ? 'Demo account' : 'Демо-аккаунт') : (isEnglish ? 'Account' : 'Аккаунт')}</span>
          </button>
          <button type="button" aria-label={isEnglish ? `Bag with ${bagCount} items` : `В корзине товаров: ${bagCount}`}>
            <ShoppingBag size={20} />
            <span>{isEnglish ? 'Bag' : 'Корзина'} ({bagCount})</span>
          </button>
        </div>
      </header>

      <section className="offset-hero" id="top">
        <div className="offset-hero__copy">
          <p>{isEnglish ? 'Small-run photographic prints' : 'Фотопринты небольшими тиражами'}</p>
          <h1>{isEnglish ? 'Images made for real walls.' : 'Фотографии для настоящих стен.'}</h1>
          <a href="#prints">{isEnglish ? 'Browse the edition' : 'Смотреть коллекцию'} <ArrowDownRight size={20} /></a>
        </div>
        <img src={imagePath('project-aperture.jpg')} alt={isEnglish ? 'Architecture print from the current edition' : 'Архитектурный принт из текущей коллекции'} />
      </section>

      <section className="offset-products" id="prints">
        <div className="offset-products__heading">
          <h2>{isEnglish ? 'Current edition' : 'Текущая коллекция'}</h2>
          <p>{isEnglish ? 'Three photographs, archival paper, open edition.' : 'Три фотографии, архивная бумага, открытый тираж.'}</p>
        </div>
        <div className="offset-product-grid">
          {products.map((product) => (
            <article key={product.name}>
              <img src={imagePath(product.image)} alt="" />
              <div>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.size}</p>
                </div>
                <strong>{product.price}</strong>
              </div>
              <button type="button" onClick={() => setBagCount((count) => count + 1)}>
                {isEnglish ? 'Add to bag' : 'Добавить в корзину'}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="offset-about" id="about">
        <h2>{isEnglish ? 'Printed locally. Packed without plastic.' : 'Печатаем локально. Упаковываем без пластика.'}</h2>
        <p>{isEnglish ? 'Orders in this portfolio demo are not processed.' : 'Заказы в этом демонстрационном проекте не обрабатываются.'}</p>
      </section>

      <dialog className="offset-login" ref={loginDialog} onClick={(event) => event.target === event.currentTarget && loginDialog.current?.close()}>
        <button className="offset-login__close" type="button" onClick={() => loginDialog.current?.close()} aria-label={isEnglish ? 'Close' : 'Закрыть'}><X size={21} /></button>
        {accountActive ? (
          <div className="offset-login__success">
            <UserCircle size={42} weight="light" />
            <h2>{isEnglish ? 'Demo account is active' : 'Демо-аккаунт активен'}</h2>
            <p>{isEnglish ? 'This state exists only in your browser. No account was created.' : 'Это состояние существует только в вашем браузере. Настоящий аккаунт не создан.'}</p>
            <button type="button" onClick={() => { setAccountActive(false); loginDialog.current?.close() }}>{isEnglish ? 'Sign out' : 'Выйти'}</button>
          </div>
        ) : (
          <form onSubmit={handleDemoLogin}>
            <p className="offset-login__note">{isEnglish ? 'Example feature: login details are not stored or sent.' : 'Функция-пример: данные для входа не сохраняются и не отправляются.'}</p>
            <h2>{isEnglish ? 'Sign in' : 'Войти в аккаунт'}</h2>
            <label>{isEnglish ? 'Email' : 'Email'}<input type="email" placeholder="name@example.com" required /></label>
            <label>{isEnglish ? 'Password' : 'Пароль'}<input type="password" minLength="4" placeholder="••••••••" required /></label>
            <button type="submit" disabled={loggingIn}>{loggingIn ? (isEnglish ? 'Checking...' : 'Проверяем...') : (isEnglish ? 'Enter demo account' : 'Войти в демо-аккаунт')}</button>
          </form>
        )}
      </dialog>
    </DemoFrame>
  )
}

function ApertureDemo({ language }) {
  const frames = [
    ['project-forma.jpg', 'Objects and memory'],
    ['principle-focus.jpg', 'Portraits in motion'],
    ['principle-motion.jpg', 'Light studies'],
  ]

  return (
    <DemoFrame className="demo-aperture" title="Aperture" language={language}>
      <header className="demo-nav aperture-nav">
        <a className="demo-brand" href="#top">APERTURE / STUDIO</a>
        <nav aria-label="Aperture navigation">
          <a href="#stories">Stories</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="aperture-hero" id="top">
        <div className="aperture-title">
          <p>Photography and moving image</p>
          <h1>Available light. Honest stories.</h1>
        </div>
        <img src={imagePath('project-forma.jpg')} alt="A collection of analogue cameras" />
      </section>

      <section className="aperture-stories" id="stories">
        <h2>Recent stories</h2>
        <div className="aperture-grid">
          {frames.map(([image, title], index) => (
            <figure key={title}>
              <img src={imagePath(image)} alt="" />
              <figcaption><span>{title}</span><small>{String(index + 1).padStart(2, '0')}</small></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="aperture-contact" id="contact">
        <h2>Bring the brief. We’ll find the frame.</h2>
        <a href="mailto:studio@example.com">Book a shoot <ArrowDownRight size={22} /></a>
      </section>
    </DemoFrame>
  )
}

const demos = {
  nocturne: NocturneDemo,
  forma: FormaDemo,
  aperture: ApertureDemo,
  offset: OffsetDemo,
}

export function DemoProject({ slug, language }) {
  const Component = demos[slug]
  if (!Component) return <NocturneDemo language={language} />
  return <Component language={language} />
}
