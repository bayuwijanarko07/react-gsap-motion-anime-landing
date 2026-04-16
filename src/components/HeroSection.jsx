import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef(null)
  return (
    <section className="hero" ref={containerRef} id="hero">
    </section>
  )
}
