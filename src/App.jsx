import './App.css'
import { useEffect, useState } from 'react'

const links = ['Home', 'About', 'Skills', 'Certifications', 'Projects', 'Education', 'Contact']

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
  { title: 'What I learned building CivicWatch', excerpt: 'I learned how to build a Django-based grievance management system, handle user authentication and CRUD operations, connect frontend pages with backend logic using AJAX, work with SQLite databases, and integrate a local LLM for grievance categorisation. I also learned how to structure a real-world application and manage the project using Git and GitHub.',
    date: 'CivicWatch' },
  { title: 'Built for a real-world automobile business',
    excerpt: 'I developed this system to help my father manage his automobile business more efficiently. It handles vehicles, customers, stock, billing, GST, discounts and PDF invoice generation, giving me hands-on experience in building software around real business requirements.',
    date: 'Automobile System'
  },
]

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [activeCert, setActiveCert] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [theme, setTheme] = useTheme()
  useScrollReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:shraddhaacharya11@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="app">
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
              <a key={l} href={`#${l.toLowerCase()}`}><span>{l}</span></a>
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
          <a href="#contact" className="nav-button">Let's talk</a>
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
              <h2>MCA student and aspiring software developer.</h2>
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
                <a href="#projects" className="primary-button">View my projects</a>
                <a href="#contact" className="secondary-button">Get in touch</a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="ghost-button">
                  View resume ↗
                </a>
                {/* <a href="/resume.pdf" download className="ghost-button"> */}
                  {/* Download CV ↓ */}
                {/* </a> */}
              </div>
            </div>

            <div className="hero-visual reveal delay-1">
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
                <div className={`card stat-card reveal delay-${(i % 3) + 1}`} key={l}>
                  <strong>{n}</strong>
                  <span>{l}</span>
                </div>
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
                  <div className={`card cert-card reveal delay-${(i % 3) + 1}`} key={c.name}>
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
                <article className={`card project-card reveal delay-${i + 1}${p.featured ? ' featured' : ''}`} key={p.name}>
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
              </div>
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
