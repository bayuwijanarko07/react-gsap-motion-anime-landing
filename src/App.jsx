import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './App.scss'
import HeroSection from './components/HeroSection'
import Preloader from './components/Preloader'

function App() {
  const hasSeen = sessionStorage.getItem('loading-sequence-seen') === 'true';
  const containerRef = useRef(null)

  useGSAP(() => {
    // Add scroll triggers for dummy sections to test scrolling and markers
    gsap.utils.toArray('.dummy-section').forEach((section, i) => {
      gsap.fromTo(section.querySelector('h2'), 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            markers: true, // Show debug markers
            id: `dummy-${i + 1}`,
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <div className="app" ref={containerRef}>
       {!hasSeen && <Preloader />}
      <HeroSection />
      
      {/* Dummy Sections for debugging scroll */}
      <section className="dummy-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px dashed #444', backgroundColor: '#0a0a0a', color: '#fff' }}>
        <h2 style={{ fontSize: '3rem' }}>Section 1</h2>
      </section>
      
      <section className="dummy-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px dashed #444', backgroundColor: '#111', color: '#fff' }}>
        <h2 style={{ fontSize: '3rem' }}>Section 2</h2>
      </section>
      
      <section className="dummy-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px dashed #444', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <h2 style={{ fontSize: '3rem' }}>Section 3</h2>
      </section>
    </div>
  )
}

export default App
