import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const [scrolled, setScrolled] = useState(false)

  // NAVBAR SCROLL DETECTION
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40)
  }

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])

  // SCROLL REVEAL
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '#about, #skills, #projects, #journey, #contact'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
      }
    )

    revealElements.forEach((element) => {
      element.classList.add('reveal')
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // CURSOR TRACKING
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // MAGNETIC BUTTON
  const handleMagnetic = (e) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()

    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)

    element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const resetMagnetic = (e) => {
    e.currentTarget.style.transform = ''
  }

  // 3D TILT
  const handleTilt = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = ((y - rect.height / 2) / rect.height) * -8
    const rotateY = ((x - rect.width / 2) / rect.width) * 8

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `
  }

  const resetTilt = (e) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <main>
      {/* CURSOR GLOW */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* CURSOR DOT */}
      <div
        className="cursor-dot"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <a className="logo" href="#top">
          SHABAN<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="hero">
       {/* 3D ORB */}
        <div className="hero-orb">
          <div className="orb-core"></div>
        </div>

        <h1>
          HEY, I'M
          <br />
          SHABAN.
        </h1>

        <p>I BUILD DIGITAL EXPERIENCES.</p>

        <button
          onMouseMove={handleMagnetic}
          onMouseLeave={resetMagnetic}
          onClick={() => {
            document.getElementById('projects').scrollIntoView({
              behavior: 'smooth',
            })
          }}
        >
          VIEW MY WORK →
        </button>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          BUILD • CREATE • EXPLORE • LEARN • BUILD • CREATE • EXPLORE • LEARN •
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <span className="section-label">02 — ABOUT</span>

        <h2>BUILDING, LEARNING, CREATING.</h2>

        <p className="about-text">
          I'm Shaban, a student and aspiring developer exploring
          modern web development, creative design and interactive
          digital experiences.
        </p>

        <div className="about-grid">
          <div>
            <strong>01</strong>
            <h3>WEB DEVELOPMENT</h3>
            <p>Learning and building modern websites with React.</p>
          </div>

          <div>
            <strong>02</strong>
            <h3>CREATIVE DESIGN</h3>
            <p>Exploring layouts, animations and futuristic interfaces.</p>
          </div>

          <div>
            <strong>03</strong>
            <h3>ALWAYS LEARNING</h3>
            <p>Turning new ideas into real projects step by step.</p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <span className="section-label">03 — SKILLS</span>

        <h2>WHAT I WORK WITH.</h2>

        <div className="skills-grid">
          <div className="skill-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <span>01</span>
            <h3>HTML</h3>
            <p>Building clean and structured web pages.</p>
          </div>

          <div className="skill-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <span>02</span>
            <h3>CSS</h3>
            <p>Creating modern layouts, effects and responsive designs.</p>
          </div>

          <div className="skill-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <span>03</span>
            <h3>JAVASCRIPT</h3>
            <p>Adding interaction and dynamic functionality.</p>
          </div>

          <div className="skill-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <span>04</span>
            <h3>REACT</h3>
            <p>Building modern interfaces with reusable components.</p>
          </div>

          <div className="skill-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <span>05</span>
            <h3>UI / UX</h3>
            <p>Exploring clean, premium and user-friendly interfaces.</p>
          </div>

          <div className="skill-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <span>06</span>
            <h3>CREATIVE TECH</h3>
            <p>
              Experimenting with animation, 3D and interactive
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <span className="section-label">04 — PROJECTS</span>

        <h2>SELECTED WORK.</h2>

        {/* PROJECT 1 */}
        <div
          className="project-card"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div className="project-preview project-purple">
            <span>SAH</span>
          </div>

          <div className="project-content">
            <span>01 — WEBSITE</span>

            <h3>Saharsa Digital Services</h3>

            <p>
              A modern digital services website designed to showcase
              services and create a professional online presence.
            </p>

            <a
  className="project-button"
  href="https://saharsadigitalservices.my.canva.site/"
  target="_blank"
  rel="noreferrer"
>
  VIEW PROJECT →
</a>
          </div>
        </div>

        {/* PROJECT 2 */}
        <div
          className="project-card"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div className="project-preview project-blue">
            <span>RS</span>
          </div>

          <div className="project-content">
            <span>02 — WEBSITE</span>

            <h3>Restaurant Website</h3>

            <p>
              A premium restaurant website concept with an elegant
              interface, modern presentation and interactive sections.
            </p>

            <a className="project-button" href="#contact">
              VIEW PROJECT →
            </a>
          </div>
        </div>

        {/* PROJECT 3 */}
        <div
          className="project-card"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div className="project-preview project-dark">
            <span>03</span>
          </div>

          <div className="project-content">
            <span>03 — COMING SOON</span>

            <h3>Future Project</h3>

            <p>
  A new digital experience is currently in development.
  Stay tuned for something fresh, interactive and different.
</p>

            <button disabled>COMING SOON</button>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey">
        <span className="section-label">05 — JOURNEY</span>

        <h2>MY LEARNING JOURNEY.</h2>

        <div className="journey-list">
          <div className="journey-item">
            <span>2026</span>

            <div>
              <h3>STARTED WEB DEVELOPMENT</h3>

              <p>
                Started exploring HTML, CSS, JavaScript and modern
                web development.
              </p>
            </div>
          </div>

          <div className="journey-item">
            <span>2026</span>

            <div>
              <h3>BUILT MY FIRST PROJECTS</h3>

              <p>
                Created websites and started turning ideas into
                real digital projects.
              </p>
            </div>
          </div>

          <div className="journey-item">
            <span>NOW</span>

            <div>
              <h3>LEARNING REACT & CREATIVE TECH</h3>

              <p>
                Exploring React, animations, 3D experiences and
                advanced frontend development.
              </p>
            </div>
          </div>

          <div className="journey-item">
            <span>NEXT</span>

            <div>
              <h3>BUILD SOMETHING BIG</h3>

              <p>
                Continuing to learn, experiment and build better
                digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <span className="section-label">06 — CONTACT</span>

        <h2>LET'S BUILD SOMETHING.</h2>

        <p className="contact-text">
          Have an idea, project or collaboration in mind?
          Let's turn it into something real.
        </p>

        <a
          className="contact-button"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=shabanalam63@gmail.com"
        >
          GET IN TOUCH →
        </a>
      </section>
    </main>
  )
}

export default App