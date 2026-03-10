import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from './Hero3D';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef();
    const title1Ref = useRef();
    const title2Ref = useRef();
    const contentRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial state
            gsap.set([title1Ref.current, title2Ref.current, contentRef.current], {
                y: 50,
                opacity: 0,
                filter: "blur(10px)"
            });

            // Animation sequence
            tl.to([title1Ref.current, title2Ref.current], {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.2,
                stagger: 0.2,
                delay: 0.2
            })
                .to(contentRef.current, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                }, "-=0.6")
                .fromTo('.hero-cta > *',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
                    "-=0.4"
                );

            // Space background parallax blur and scale
            gsap.to('.hero-canvas-container', {
                scale: 0.5,
                opacity: 0.1,
                filter: "blur(20px)",
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5
                }
            });

            // Continuous float for the glass panel
            gsap.to(contentRef.current, {
                y: -10,
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 2
            });

            // Mouse Parallax Effect
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 20;
                const yPos = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to('.hero-text', {
                    x: xPos,
                    y: yPos,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-section" ref={heroRef}>
            <Hero3D />

            <div className="container hero-content-wrapper">
                <div className="hero-text">
                    <h2 className="hero-subtitle text-gradient" ref={title1Ref}>
                        VOTRE STOCK
                    </h2>
                    <h1 className="hero-title text-brand" ref={title2Ref}>
                        N9ITASTOCK
                    </h1>

                    <div className="hero-description glass-panel" ref={contentRef}>
                        <p className="hero-lead">
                            <strong>N9ITASTOCK</strong> est une solution complète dédiée à la gestion intelligente et l'optimisation de vos inventaires.
                        </p>
                        <div className="hero-divider"></div>
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

            <style>{`
        .fixed-hero-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px; /* Space for navbar */
          overflow: hidden;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr;
        }

        @media (min-width: 992px) {
          .hero-content-wrapper {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }

        .hero-text {
          max-width: 650px;
        }

        .hero-subtitle {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          margin-bottom: 0.5rem;
          font-weight: 500;
          letter-spacing: 2px;
        }

        .hero-title {
          font-size: clamp(2rem, 9vw, 5rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 2.5rem;
          text-shadow: 0 0 40px rgba(240, 106, 30, 0.4);
          word-break: break-word;
          hyphens: auto;
        }

        .hero-description {
          padding: 2.5rem;
          position: relative;
        }

        .hero-description::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--color-brand);
          border-radius: 4px 0 0 4px;
        }

        .hero-lead {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .hero-divider {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin: 1.5rem 0;
        }

        .hero-subtext {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          line-height: 1.8;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 576px) {
          .hero-description {
            padding: 1.5rem;
          }
          .hero-cta {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta > * {
            text-align: center;
            width: 100%;
          }
        }
      `}</style>
        </section>
    );
};

export default HeroSection;
