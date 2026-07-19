import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowDownRight, ArrowRight, Check, MagnifyingGlass, Minus, Pause, Play, Plus, ShoppingBag, UserCircle, X } from '@phosphor-icons/react'
import './demos.css'

const baseUrl = import.meta.env.BASE_URL
const imagePath = (fileName) => `${baseUrl}images/${fileName}`

function DemoFrame({ className, title, language, children }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | Outline Digital demo`
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
  const searchInput = useRef(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase(language)
  const visibleArticles = articles.filter((article) =>
    `${article.title} ${article.category}`.toLocaleLowerCase(language).includes(normalizedQuery),
  )

  function toggleSearch() {
    if (searchOpen && searchQuery) {
      setSearchQuery('')
      searchInput.current?.focus()
      return
    }
    setSearchOpen((open) => {
      if (!open) window.requestAnimationFrame(() => searchInput.current?.focus())
      return !open
    })
  }

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
        <form
          className={`report-search${searchOpen ? ' is-open' : ''}`}
          role="search"
          onSubmit={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setSearchOpen(false)
              setSearchQuery('')
            }
          }}
        >
          <label htmlFor="report-search-input">{isEnglish ? 'Search stories' : 'Поиск материалов'}</label>
          <input
            id="report-search-input"
            ref={searchInput}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={isEnglish ? 'Search stories' : 'Найти материал'}
            tabIndex={searchOpen ? 0 : -1}
          />
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchQuery ? (isEnglish ? 'Clear search' : 'Очистить поиск') : (isEnglish ? 'Open search' : 'Открыть поиск')}
            aria-expanded={searchOpen}
          >
            {searchQuery ? <X size={20} /> : <MagnifyingGlass size={20} />}
          </button>
        </form>
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
          {visibleArticles.map((article) => (
            <article key={article.title}>
              <img src={imagePath(article.image)} alt="" />
              <div>
                <p>{article.category}</p>
                <h3>{article.title}</h3>
                <a href="#top">{isEnglish ? 'Read story' : 'Читать материал'} <ArrowRight size={18} /></a>
              </div>
            </article>
          ))}
          {visibleArticles.length === 0 && (
            <p className="report-empty">{isEnglish ? 'No stories found. Try another query.' : 'Материалы не найдены. Попробуйте другой запрос.'}</p>
          )}
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
  const cartCloseButton = useRef(null)
  const feedbackTimer = useRef(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [addedProduct, setAddedProduct] = useState(null)
  const [checkoutNotice, setCheckoutNotice] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [accountActive, setAccountActive] = useState(false)
  const products = [
    { id: 'courtyard', name: 'Courtyard, Rome', size: '50 × 70 cm', price: 48, image: 'project-aperture.jpg' },
    { id: 'night-district', name: 'Night District', size: '40 × 50 cm', price: 36, image: 'project-nocturne.jpg' },
    { id: 'analogue-shelf', name: 'Analogue Shelf', size: '30 × 40 cm', price: 29, image: 'project-forma.jpg' },
  ]
  const bagCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 6
  const total = subtotal + shipping

  useEffect(() => {
    if (!cartOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => cartCloseButton.current?.focus())

    function closeOnEscape(event) {
      if (event.key === 'Escape') setCartOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [cartOpen])

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), [])

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...items, { ...product, quantity: 1 }]
    })
    setCheckoutNotice('')
    setAddedProduct(null)
    requestAnimationFrame(() => {
      setAddedProduct(product)
      window.clearTimeout(feedbackTimer.current)
      feedbackTimer.current = window.setTimeout(() => setAddedProduct(null), 2400)
    })
  }

  function changeQuantity(productId, delta) {
    setCheckoutNotice('')
    setCart((items) => items
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0))
  }

  function removeFromCart(productId) {
    setCheckoutNotice('')
    setCart((items) => items.filter((item) => item.id !== productId))
  }

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
          <button
            className={addedProduct ? 'offset-bag-button is-bumping' : 'offset-bag-button'}
            type="button"
            aria-label={isEnglish ? `Bag with ${bagCount} items` : `В корзине товаров: ${bagCount}`}
            onClick={() => setCartOpen(true)}
          >
            <span className="offset-bag-button__icon"><ShoppingBag size={20} />{bagCount > 0 && <i>{bagCount}</i>}</span>
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
                <strong>€{product.price}</strong>
              </div>
              <button
                className={addedProduct?.id === product.id ? 'is-added' : ''}
                type="button"
                onClick={() => addToCart(product)}
              >
                {addedProduct?.id === product.id ? <><Check size={17} /> {isEnglish ? 'Added' : 'Добавлено'}</> : (isEnglish ? 'Add to bag' : 'Добавить в корзину')}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="offset-about" id="about">
        <h2>{isEnglish ? 'Printed locally. Packed without plastic.' : 'Печатаем локально. Упаковываем без пластика.'}</h2>
        <p>{isEnglish ? 'Orders in this portfolio demo are not processed.' : 'Заказы в этом демонстрационном проекте не обрабатываются.'}</p>
      </section>

      <div
        className={`offset-cart-layer ${cartOpen ? 'is-open' : ''}`}
        aria-hidden={!cartOpen}
        inert={!cartOpen}
        onClick={() => setCartOpen(false)}
      >
        <aside
          className="offset-cart"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offset-cart-title"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="offset-cart__header">
            <div>
              <p>{isEnglish ? 'Your selection' : 'Ваш выбор'}</p>
              <h2 id="offset-cart-title">{isEnglish ? 'Bag' : 'Корзина'} <span>{bagCount}</span></h2>
            </div>
            <button ref={cartCloseButton} type="button" onClick={() => setCartOpen(false)} aria-label={isEnglish ? 'Close bag' : 'Закрыть корзину'}><X size={22} /></button>
          </header>

          {cart.length ? (
            <div className="offset-cart__content">
              <div className="offset-cart__items">
                {cart.map((item) => (
                  <article className="offset-cart-item" key={item.id}>
                    <img src={imagePath(item.image)} alt="" />
                    <div className="offset-cart-item__copy">
                      <h3>{item.name}</h3>
                      <p>{item.size}</p>
                      <strong>€{item.price}</strong>
                    </div>
                    <div className="offset-cart-item__actions">
                      <div className="offset-quantity" aria-label={isEnglish ? `Quantity for ${item.name}` : `Количество: ${item.name}`}>
                        <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={isEnglish ? 'Decrease quantity' : 'Уменьшить количество'}><Minus size={15} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={isEnglish ? 'Increase quantity' : 'Увеличить количество'}><Plus size={15} /></button>
                      </div>
                      <button className="offset-cart-item__remove" type="button" onClick={() => removeFromCart(item.id)}>{isEnglish ? 'Remove' : 'Удалить'}</button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="offset-cart__summary">
                <dl>
                  <div><dt>{isEnglish ? 'Subtotal' : 'Сумма'}</dt><dd>€{subtotal}</dd></div>
                  <div><dt>{isEnglish ? 'Shipping' : 'Доставка'}</dt><dd>{shipping ? `€${shipping}` : (isEnglish ? 'Free' : 'Бесплатно')}</dd></div>
                  <div className="offset-cart__total"><dt>{isEnglish ? 'Total' : 'Итого'}</dt><dd>€{total}</dd></div>
                </dl>
                <button
                  className="offset-checkout"
                  type="button"
                  onClick={() => setCheckoutNotice(isEnglish ? 'Demo checkout only. No order was placed.' : 'Это демо-оформление. Заказ не создан.')}
                >
                  {isEnglish ? 'Checkout demo' : 'Оформить демо-заказ'} <ArrowRight size={19} />
                </button>
                <p className="offset-checkout-note" aria-live="polite">{checkoutNotice || (isEnglish ? 'Portfolio demo. Payments are disabled.' : 'Демо для портфолио. Оплата отключена.')}</p>
              </div>
            </div>
          ) : (
            <div className="offset-cart__empty">
              <ShoppingBag size={38} weight="light" />
              <h3>{isEnglish ? 'Your bag is empty' : 'Корзина пуста'}</h3>
              <p>{isEnglish ? 'Add a print from the current edition.' : 'Добавьте принт из текущей коллекции.'}</p>
              <button type="button" onClick={() => setCartOpen(false)}>{isEnglish ? 'Continue browsing' : 'Продолжить просмотр'}</button>
            </div>
          )}
        </aside>
      </div>

      {addedProduct && (
        <div className="offset-cart-toast" role="status">
          <span><Check size={16} weight="bold" /></span>
          <div><strong>{addedProduct.name}</strong><small>{isEnglish ? 'Added to your bag' : 'Добавлено в корзину'}</small></div>
          <button type="button" onClick={() => { setCartOpen(true); setAddedProduct(null) }}>{isEnglish ? 'View bag' : 'Открыть'}</button>
        </div>
      )}

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
  offset: OffsetDemo,
}

export function DemoProject({ slug, language }) {
  const Component = demos[slug]
  if (!Component) return <NocturneDemo language={language} />
  return <Component language={language} />
}
