import './App.css'
import { useEffect, useRef, useState } from 'react'

const links = ['Home', 'About', 'Skills', 'Certifications', 'Projects', 'Education', 'Contact']

const roles = [
  'MCA student and aspiring software developer.',
  'Builder of practical Python & Django apps.',
  'Always learning, always shipping.',
]

const stats = [
  ['8.75', 'CGPA in BCA'],
  ['2026', 'BCA graduate'],
  ['2', 'Full-stack projects'],
  ['MCA', 'In progress'],
]

// Edit this to whatever you're actually studying right now.
const currentlyLearning = ['Data Structures & Algorithms', 'System Design']

const skills = [
  ['Programming', 'Languages I learned and used across my degree.', ['Python', 'C', 'Java']],
  ['Web development', 'What I use to build and style web applications.', ['Django', 'Flask', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'AJAX']],
  ['Databases', 'Storing and querying data for my projects.', ['DBMS', 'MySQL', 'SQLite']],
  ['Tools & AI', 'Everyday tools and local AI models.', ['Git', 'GitHub', 'VS Code', 'PyCharm', 'Ollama', 'Llama 3.2']],
]

const projects = [
  {
    name: 'CivicWatch',
    tag: 'Featured project',
    desc: 'A public grievance and infrastructure monitoring system. Citizens report issues and track updates, while officers and administrators manage the full grievance workflow.',
    details: 'CivicWatch lets a citizen file a grievance with location and photo context, then tracks it through review, assignment and resolution. Officers and admins get a dashboard to triage reports, update status, and close the loop with the citizen who filed it. The Llama 3.2 model, run locally through Ollama, helps auto-categorise incoming reports.',
    stack: ['Python', 'Django', 'SQLite', 'JavaScript', 'AJAX', 'Ollama', 'Llama 3.2'],
    url: 'https://github.com/shraddhaacharya11o4-rgb/CivicWatch',
    featured: true,
  },
  {
    name: 'Automobile Sales & Billing System',
    tag: 'Web application',
    desc: 'Manages vehicles, customers, stock, billing, discounts and loyalty points, and generates professional PDF invoices.',
    details: 'A Flask application for a vehicle dealership covering the full sales cycle: product and stock management, customer records, discounts and loyalty points, and billing. Finalised sales generate a professional PDF invoice through FPDF, ready to print or email to the customer.',
    stack: ['Python', 'Flask', 'SQLite', 'Bootstrap', 'JavaScript', 'FPDF'],
    url: 'https://github.com/shraddhaacharya11o4-rgb/Automobile-Sales-Billing-System',
  },
]

const certifications = [
  { name: 'Python Full Stack (Django) and Web Design (HTML, CSS)', issuer: 'ASAE LLP', year: '2026', file: '/certificates/ASAE_certificate.jpeg' },
  { name: 'Technology Job Simulation', issuer: 'Forage-Deloitte', year: '2026', file: '/certificates/certificate.pdf' },
  { name: 'Fundamentals of Object Oriented Programming', issuer: 'NPTEL', year: '2025', file: '/certificates/nptel_certificate.pdf' },
]

const notes = [
  {
    title: 'What I learned building CivicWatch',
    excerpt: 'I learned how to build a Django-based grievance management system, handle user authentication and CRUD operations, connect frontend pages with backend logic using AJAX, work with SQLite databases, and integrate a local LLM for grievance categorisation. I also learned how to structure a real-world application and manage the project using Git and GitHub.',
    date: 'CivicWatch',
  },
  {
    title: 'Built for a real-world automobile business',
    excerpt: 'I developed this system to help my father manage his automobile business more efficiently. It handles vehicles, customers, stock, billing, GST, discounts and PDF invoice generation, giving me hands-on experience in building software around real business requirements.',
    date: 'Automobile System',
  },
]

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Reveals any element with class "reveal" as it scrolls into view.
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = window.localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme]
}

// Thin bar across the top of the page that fills as you scroll.
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrollTop = h.scrollTop || document.body.scrollTop
      const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

// Highlights the nav link for whichever section is currently in view.
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

// Types out each phrase, pauses, deletes, moves to the next.
function useTypewriter(words, speed = 55, pause = 1600) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    if (reducedMotion()) {
      setText(current)
      return
    }
    let timeout
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, index])

  return text
}

// A ring + dot that trail the cursor, and grow over clickable elements.
function useCustomCursor() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('has-custom-cursor')
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, raf
    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }
    const over = (e) => { if (e.target.closest('a, button, .card')) ring.classList.add('cursor-hover') }
    const out = (e) => { if (e.target.closest('a, button, .card')) ring.classList.remove('cursor-hover') }
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    loop()
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf)
    }
  }, [])
}

const isNumeric = (v) => /^[\d.]+$/.test(v)

function StatCard({ value, label, index }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(isNumeric(value) ? (value.includes('.') ? '0.00' : '0') : value)

  useEffect(() => {
    if (!isNumeric(value) || !ref.current) return
    if (reducedMotion()) { setDisplay(value); return }
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate()
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    function animate() {
      const isDecimal = value.includes('.')
      const target = parseFloat(value)
      const duration = 1100
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = target * eased
        setDisplay(isDecimal ? current.toFixed(2) : Math.round(current).toString())
        if (progress < 1) requestAnimationFrame(tick)
        else setDisplay(value)
      }
      requestAnimationFrame(tick)
    }
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`card stat-card reveal delay-${(index % 3) + 1}`} ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  )
}

// Gentle pull toward the cursor on hover, released on mouse-leave.
function magnetic(e) {
  if (reducedMotion()) return
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`
}
function resetMagnetic(e) { e.currentTarget.style.transform = '' }

// 3D tilt that follows the cursor across a card.
function tilt(e) {
  if (reducedMotion()) return
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`
}
function resetTilt(e) { e.currentTarget.style.transform = '' }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [activeCert, setActiveCert] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [theme, setTheme] = useTheme()
  const progress = useScrollProgress()
  const activeSection = useScrollSpy(links.map((l) => l.toLowerCase()))
  const typedRole = useTypewriter(roles)
  useScrollReveal()
  useCustomCursor()

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:shraddhaacharya11@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="app">
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"><span className="cursor-ring-inner"></span></div>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true"></div>

      <div className="aurora" aria-hidden="true">
        <span className="blob b1"></span>
        <span className="blob b2"></span>
        <span className="blob b3"></span>
        <div className="grain"></div>
      </div>

      <header className="navbar">
        <div className="nav-pill">
          <a href="#home" className="logo">Shradha<span>.</span></a>
          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={activeSection === l.toLowerCase() ? 'active' : ''}
              >
                <span>{l}</span>
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle light and dark theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <a href="#contact" className="nav-button" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>
            Let's talk
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-container">
            <div className="hero-content reveal">
              <p className="hero-status"><i></i> Pursuing MCA at New Horizon College of Engineering</p>
              <h1 className="gradient-text">Shradha Acharya</h1>
              <h2 className="typewriter">
                {typedRole}
                <span className="typing-cursor">▌</span>
              </h2>
              <p className="hero-description">
                I build practical web applications with Python and Django, and I enjoy
                solving real-world problems with technology.
              </p>
              <p className="learning-line">
                Currently exploring: {currentlyLearning.map((l, i) => (
                  <span key={l}>{i > 0 && ', '}<span className="learning-chip">{l}</span></span>
                ))}
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="primary-button" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>
                  View my projects
                </a>
                <a href="#contact" className="secondary-button" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>
                  Get in touch
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="ghost-button" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>
                  View resume ↗
                </a>
              </div>
            </div>

            <div className="hero-visual reveal delay-1" onMouseMove={tilt} onMouseLeave={resetTilt}>
              <div className="code-window">
                <div className="window-top">
                  <div className="window-dots"><span></span><span></span><span></span></div>
                  <span className="window-title">developer.py</span>
                </div>
                <pre className="code-content">
                  <code>
                    <span className="c-k">def</span> <span className="c-f">build</span>():{'\n'}
                    {'    '}project = <span className="c-s">"CivicWatch"</span>{'\n'}
                    {'    '}skills = [{'\n'}
                    {'        '}<span className="c-s">"Python"</span>,{'\n'}
                    {'        '}<span className="c-s">"Django"</span>,{'\n'}
                    {'        '}<span className="c-s">"SQL"</span>{'\n'}
                    {'    '}]{'\n'}
                    {'    '}<span className="c-k">return</span> <span className="c-s">"building..."</span>
                    <span className="cursor-blink">▌</span>
                  </code>
                </pre>
                <div className="code-footer"><i></i> Ready to build</div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title reveal">About <em>me</em></h2>
            <div className="bento about-bento">
              <div className="card about-card reveal">
                <p className="about-lead">
                  I'm a BCA graduate from Karnatak Science College, Dharwad (Karnatak University),
                  with a strong interest in software and web development.
                </p>
                <p>
                  Through my academic projects I've worked hands-on with Python, Django, Flask,
                  databases and frontend technologies. CivicWatch and the Automobile Sales &amp;
                  Billing System are the two I'm proudest of.
                </p>
                <p>I've now begun my MCA journey at New Horizon College of Engineering to keep growing as a software professional.</p>
              </div>
              {stats.map(([n, l], i) => (
                <StatCard value={n} label={l} index={i} key={l} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <h2 className="section-title reveal">Skills</h2>
            <div className="bento skills-bento">
              {skills.map(([title, text, items], i) => (
                <div className={`card skill-card reveal delay-${(i % 3) + 1}`} key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="chips">
                    {items.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="container">
            <h2 className="section-title reveal">Certifications</h2>
            {certifications.length > 0 ? (
              <div className="bento cert-bento">
                {certifications.map((c, i) => (
                  <div
                    className={`card cert-card reveal delay-${(i % 3) + 1}`}
                    key={c.name}
                    onMouseMove={tilt}
                    onMouseLeave={resetTilt}
                  >
                    <span className="cert-icon">◆</span>
                    <h3>{c.name}</h3>
                    <p>{c.issuer} · {c.year}</p>
                    {c.file && (
                      <button className="project-link as-button" onClick={() => setActiveCert(c)}>
                        View certificate →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card cert-empty reveal">
                <p>No certifications added yet — drop an image or PDF in <code>/public/certificates</code> and list it in the <code>certifications</code> array.</p>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title reveal">Projects</h2>
            <div className="bento projects-bento">
              {projects.map((p, i) => (
                <article
                  className={`card project-card reveal delay-${i + 1}${p.featured ? ' featured' : ''}`}
                  key={p.name}
                  onMouseMove={tilt}
                  onMouseLeave={resetTilt}
                >
                  <span className="badge">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="chips">
                    {p.stack.map((s) => <span key={s}>{s}</span>)}
                  </div>
                  <div className="project-actions">
                    <button className="project-link as-button" onClick={() => setActiveProject(p)}>
                      Case study →
                    </button>
                    <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                      GitHub ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="section">
          <div className="container">
            <h2 className="section-title reveal">Notes</h2>
            <div className="bento notes-bento">
              {notes.map((n, i) => (
                <a className={`card note-card reveal delay-${(i % 3) + 1}`} href="#" key={n.title}>
                  <span className="badge">{n.date}</span>
                  <h3>{n.title}</h3>
                  <p>{n.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <div className="container">
            <h2 className="section-title reveal">Education</h2>
            <ol className="timeline">
              <li className="reveal">
                <span className="time">2023 – 2026</span>
                <div className="card">
                  <h3>Bachelor of Computer Applications</h3>
                  <p className="strong">Karnatak Science College, Dharwad</p>
                  <p>Affiliated with Karnatak University, Dharwad</p>
                  <span className="badge">CGPA 8.75 / 10</span>
                </div>
              </li>
              <li className="reveal delay-1">
                <span className="time">2026 – Present</span>
                <div className="card">
                  <h3>Master of Computer Applications</h3>
                  <p className="strong">New Horizon College of Engineering</p>
                  <p>Currently pursuing my MCA, continuing my academic and technical journey.</p>
                  <span className="badge">In progress</span>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="contact-box reveal">
              <div>
                <h2>Let's connect.</h2>
                <p>
                  I'm open to internships, meaningful projects and conversations about
                  software development.
                </p>
                <div className="contact-links">
                  <a href="mailto:shraddhaacharya11@gmail.com">
                    <span>Email</span><strong>shraddhaacharya11@gmail.com ↗</strong>
                  </a>
                  <a href="https://www.linkedin.com/in/shradha-acharya-049982391/" target="_blank" rel="noreferrer">
                    <span>LinkedIn</span><strong>Connect with me ↗</strong>
                  </a>
                  <a href="https://github.com/shraddhaacharya11o4-rgb" target="_blank" rel="noreferrer">
                    <span>GitHub</span><strong>View my repositories ↗</strong>
                  </a>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
                <label>
                  Message
                  <textarea
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </label>
                <button type="submit" className="primary-button" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>
                  Send message
                </button>
                <p className="form-note">Opens your email app with this filled in.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">© 2026 Shradha Acharya</footer>

      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close">✕</button>
            <span className="badge">{activeProject.tag}</span>
            <h3>{activeProject.name}</h3>
            <p>{activeProject.details}</p>
            <div className="chips">
              {activeProject.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
            <a href={activeProject.url} target="_blank" rel="noreferrer" className="primary-button">
              View on GitHub ↗
            </a>
          </div>
        </div>
      )}

      {activeCert && (
        <div className="modal-backdrop" onClick={() => setActiveCert(null)}>
          <div className="modal cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCert(null)} aria-label="Close">✕</button>
            <h3>{activeCert.name}</h3>
            <p>{activeCert.issuer} · {activeCert.year}</p>
            {activeCert.file.toLowerCase().endsWith('.pdf') ? (
              <iframe className="cert-frame" src={activeCert.file} title={activeCert.name} />
            ) : (
              <img className="cert-image" src={activeCert.file} alt={activeCert.name} />
            )}
            <a href={activeCert.file} download className="primary-button">
              Download certificate ↓
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
