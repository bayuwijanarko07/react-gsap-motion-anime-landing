import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/* Simple SVG icons as components */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hero__btn-arrow">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const ReactIcon = () => (
  <svg className="hero__tech-icon" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
  </svg>
)

const GsapIcon = () => (
  <svg className="hero__tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" />
    <path d="M12 8v4l3 3" />
  </svg>
)

const ViteIcon = () => (
  <svg className="hero__tech-icon" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12,2 2,22 22,22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/* Particle positions - deterministic for consistent rendering */
const PARTICLES = [
  { left: '10%', top: '20%', delay: 0 },
  { left: '25%', top: '70%', delay: 0.5 },
  { left: '40%', top: '15%', delay: 1.2 },
  { left: '55%', top: '80%', delay: 0.8 },
  { left: '70%', top: '30%', delay: 1.5 },
  { left: '85%', top: '60%', delay: 0.3 },
  { left: '15%', top: '50%', delay: 1.8 },
  { left: '90%', top: '15%', delay: 2.0 },
  { left: '50%', top: '45%', delay: 0.7 },
  { left: '75%', top: '85%', delay: 1.1 },
  { left: '35%', top: '35%', delay: 1.6 },
  { left: '60%', top: '55%', delay: 0.2 },
]

export default function HeroSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    })

    /* 1. Background orbs fade in and float */
    tl.to('.hero__orb', {
      opacity: 1,
      duration: 2,
      stagger: 0.3,
    })

    /* 2. Grid overlay */
    tl.to('.hero__grid', {
      opacity: 1,
      duration: 1.5,
    }, '<0.5')

    /* 3. Badge slides down */
    tl.fromTo('.hero__badge',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '<0.3'
    )

    /* 4. Title lines stagger in */
    tl.fromTo('.hero__title',
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      '<0.2'
    )
    tl.fromTo('.hero__title-line',
      { opacity: 0, y: 60, skewY: 3 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      },
      '<'
    )

    /* 5. Subtitle fades in */
    tl.fromTo('.hero__subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )

    /* 6. CTA buttons */
    tl.fromTo('.hero__actions',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    )

    /* 7. Tech stack */
    tl.fromTo('.hero__tech-stack',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )

    /* 8. Scroll indicator */
    tl.fromTo('.hero__scroll',
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.2'
    )

    /* 9. Particle floating animation (infinite) */
    gsap.utils.toArray('.hero__particle').forEach((particle, i) => {
      gsap.to(particle, {
        opacity: gsap.utils.random(0.2, 0.6),
        y: gsap.utils.random(-60, -120),
        x: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(3, 6),
        delay: PARTICLES[i]?.delay || 0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    /* 10. Subtle floating animation on orbs */
    gsap.to('.hero__orb--purple', {
      y: -20,
      x: 10,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.hero__orb--blue', {
      y: 15,
      x: -15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.hero__orb--cyan', {
      y: -10,
      x: 20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

  }, { scope: containerRef })

  return (
    <section className="hero" ref={containerRef} id="hero">
      {/* Background Effects */}
      <div className="hero__orb hero__orb--purple" />
      <div className="hero__orb hero__orb--blue" />
      <div className="hero__orb hero__orb--cyan" />
      <div className="hero__grid" />

      {/* Floating Particles */}
      <div className="hero__particles">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="hero__particle"
            style={{ left: p.left, top: p.top }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          React × GSAP Showcase
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">Motion Brings</span>
          <span className="hero__title-line">
            Interfaces <span className="hero__title-accent">To Life</span>
          </span>
        </h1>

        <p className="hero__subtitle">
          Crafting fluid, cinematic web experiences with React and GSAP.
          Where every transition tells a story and every animation has purpose.
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" id="btn-explore">
            Explore Animations
            <ArrowRight />
          </button>
          <button className="hero__btn hero__btn--secondary" id="btn-source">
            View Source
          </button>
        </div>

        <div className="hero__tech-stack">
          <div className="hero__tech-item">
            <ReactIcon />
            React
          </div>
          <div className="hero__tech-divider" />
          <div className="hero__tech-item">
            <GsapIcon />
            GSAP
          </div>
          <div className="hero__tech-divider" />
          <div className="hero__tech-item">
            <ViteIcon />
            Vite
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll">
        <span className="hero__scroll-text">Asd</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
