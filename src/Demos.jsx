import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowDownRight, ArrowRight, Pause, Play } from '@phosphor-icons/react'
import './demos.css'

const baseUrl = import.meta.env.BASE_URL
const imagePath = (fileName) => `${baseUrl}images/${fileName}`

function DemoFrame({ className, title, children }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | oxssex demo`
    return () => { document.title = previousTitle }
  }, [title])

  return (
    <main className={`demo ${className}`}>
      <a className="demo-back" href={`${baseUrl}#work`}>
        <ArrowLeft size={22} />
        <span>Вернуться в портфолио</span>
      </a>
      {children}
    </main>
  )
}

function NocturneDemo() {
  const [playing, setPlaying] = useState(false)
  const tracks = [
    ['Soft Static', 'Mira Vale'],
    ['Night Windows', 'Common Hours'],
    ['Before the Trains', 'Nadia Moss'],
  ]

  return (
    <DemoFrame className="demo-nocturne" title="Nocturne">
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

function FormaDemo() {
  const projects = [
    { name: 'Courtyard House', place: 'Ljubljana', image: 'project-aperture.jpg' },
    { name: 'River Archive', place: 'Salzburg', image: 'project-nocturne.jpg' },
  ]

  return (
    <DemoFrame className="demo-forma" title="Forma">
      <header className="demo-nav forma-nav">
        <a className="demo-brand" href="#top">FORMA</a>
        <nav aria-label="Forma navigation">
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
        </nav>
        <a className="forma-contact" href="mailto:studio@example.com">Start a project</a>
      </header>

      <section className="forma-hero" id="top">
        <p>Architecture for everyday rituals</p>
        <h1>Spaces that hold attention.</h1>
        <div className="forma-hero-media">
          <img src={imagePath('project-aperture.jpg')} alt="Historic architecture viewed from a courtyard" />
        </div>
      </section>

      <section className="forma-work" id="work">
        <h2>Selected spaces</h2>
        <div className="forma-projects">
          {projects.map((project) => (
            <article key={project.name}>
              <img src={imagePath(project.image)} alt="" />
              <div>
                <h3>{project.name}</h3>
                <p>{project.place}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="forma-studio" id="studio">
        <h2>Built around life, not spectacle.</h2>
        <p>We design calm, durable places by starting with movement, light and the way a room will be used.</p>
        <a href="mailto:studio@example.com">Discuss a space <ArrowRight size={20} /></a>
      </section>
    </DemoFrame>
  )
}

function ApertureDemo() {
  const frames = [
    ['project-forma.jpg', 'Objects and memory'],
    ['principle-focus.jpg', 'Portraits in motion'],
    ['principle-motion.jpg', 'Light studies'],
  ]

  return (
    <DemoFrame className="demo-aperture" title="Aperture">
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
}

export function DemoProject({ slug }) {
  const Component = demos[slug]
  if (!Component) return <NocturneDemo />
  return <Component />
}
