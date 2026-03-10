import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero3D from './Hero3D'
import './HeroSection.css'

gsap.registerPlugin(ScrollTrigger)

function HeroSection() {
  const heroRef = useRef()
  const subtitleRef = useRef()
  const titleRef = useRef()
  const cardRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // start hidden
      gsap.set([subtitleRef.current, titleRef.current, cardRef.current], {
        y: 50, opacity: 0, filter: 'blur(10px)'
      })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to([subtitleRef.current, titleRef.current], {
        y: 0, opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.2,
        delay: 0.2
      })
        .to(cardRef.current, {
          y: 0, opacity: 1,
          filter: 'blur(0px)',
          duration: 1
        }, '-=0.6')
        .fromTo('.hero-cta > *',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.4'
        )

      // shrink background on scroll
      gsap.to('.hero-canvas-container', {
        scale: 0.5,
        opacity: 0.1,
        filter: 'blur(20px)',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5
        }
      })

      // subtle card float
      gsap.to(cardRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2
      })

      // text parallax on mouse
      const handleMouse = e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        gsap.to('.hero-text', { x, y, duration: 1, ease: 'power2.out' })
      }
      window.addEventListener('mousemove', handleMouse)
      return () => window.removeEventListener('mousemove', handleMouse)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section" ref={heroRef}>
      <Hero3D />

      <div className="container hero-content-wrapper">
        <div className="hero-text">
          <h2 className="hero-subtitle text-gradient" ref={subtitleRef}>
            VOTRE STOCK
          </h2>
          <h1 className="hero-title text-brand" ref={titleRef}>
            N9ITASTOCK
          </h1>

          <div className="hero-description glass-panel" ref={cardRef}>
            <p className="hero-lead">
              <strong>N9ITASTOCK</strong> est une solution complète dédiée à la gestion intelligente et l'optimisation de vos inventaires.
            </p>
            <div className="hero-divider" />
            <p className="hero-subtext">
              INTAJ WRI9A, TA7TA ISHRAAF WA TAD9I9 N9ITA
            </p>
            <div className="hero-cta">
              <a href="#services" className="btn-primary">Découvrir nos services</a>
              <a href="#mission" className="btn-secondary">En savoir plus</a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
