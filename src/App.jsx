import { useRef, useEffect } from 'react'
import music from './assets/audios/a-well-earned-celebration.mp3'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './App.scss'
import HeroSection from './components/HeroSection'
import Preloader from './components/Preloader'
import CloudBackground from './components/CloudBackground'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const audioRef = useRef(null)

  const playMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0
    audio.play().then(() => {
      gsap.to(audio, {
        volume: 1,
        duration: 2,
        ease: 'power2.out'
      })
    }).catch(() => { })
  }

  useGSAP(() => {
    const sections = gsap.utils.toArray('.dummy-section')

    sections.forEach((section, i) => {
      const title = section.querySelector('h2')

      gsap.fromTo(title,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            markers: true,
            id: `dummy-${i + 1}`,
          }
        }
      )
    })

    // cleanup (penting biar gak numpuk trigger)
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, { scope: containerRef })

  return (
    <div className="app" ref={containerRef}>

      <Preloader onFinish={playMusic} />

      <HeroSection />

      <audio ref={audioRef} src={music} loop />
    </div>
  )
}

export default App