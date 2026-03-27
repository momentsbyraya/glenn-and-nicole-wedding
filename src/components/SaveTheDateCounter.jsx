import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getTimeUntilWedding } from '../utils/countdown'
import { couple, prenupImages } from '../data'

/** Same palette as `Hero.jsx` */
const HERO_BLUE_PRIMARY = '#103A8C'
const HERO_PINK_ACCENT = '#B03060'
const HERO_BLUE_STRONG = '#0B2F73'
const HERO_TEXT_SHADOW = '0 1px 2px rgba(255,255,255,0.9), 0 3px 12px rgba(255,255,255,0.6)'
import PhotoWatermark from './PhotoWatermark'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const SaveTheDateCounter = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const countdownRef = useRef(null)
  const countdownLabelsRef = useRef(null)

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Scroll-triggered animations
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Animate countdown labels (Days, Hours, etc.) on scroll
    if (countdownLabelsRef.current) {
      const labels = countdownLabelsRef.current.querySelectorAll('.text-center > div:last-child')
      if (labels.length) {
        gsap.set(labels, { opacity: 0, y: 12 })
        ScrollTrigger.create({
          trigger: countdownLabelsRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(labels, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06 })
          },
          toggleActions: 'play none none reverse'
        })
      }
    }

    // Don't animate countdown numbers with ScrollTrigger - reversing would hide them again
    if (countdownRef.current) {
      const els = countdownRef.current.querySelectorAll('.countdown-number')
      if (els.length) {
        gsap.set(els, { opacity: 1, y: 0 })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const formatDate = () => {
    const { month, day, year } = couple.wedding
    return `${month} ${day}, ${year}`
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center"
      style={{ backgroundColor: '#F4C6CF' }}
      aria-label="Save the date"
    >
      {/* Background photo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={prenupImages.saveTheDate}
          alt=""
          className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-[58%_center] scale-[1.06] sm:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        {/* Soft rose tint so countdown stays readable */}
        <div
          className="absolute inset-0 bg-[#F4C6CF]/82 sm:bg-[#F4C6CF]/76 md:bg-[#F4C6CF]/70"
          aria-hidden
        />
        <PhotoWatermark variant="section" />
      </div>

      {/* SVG Overlay at Top */}
      <svg className="absolute top-0 left-0 w-full h-32 sm:h-40 md:h-48 z-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#topGradient)" />
      </svg>

      {/* SVG Overlay at Bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-32 sm:h-40 md:h-48 z-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bottomGradient)" />
      </svg>

      <div className="relative z-20 max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        {/* Title */}
        <div className="text-center">
          <h2
            ref={titleRef}
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize"
            style={{ color: HERO_BLUE_PRIMARY, textShadow: HERO_TEXT_SHADOW }}
          >
            Save The Date
          </h2>
        </div>

        {/* Countdown Timer */}
        <div ref={countdownLabelsRef}>
        <div ref={countdownRef} className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6 px-4">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: HERO_BLUE_PRIMARY, textShadow: HERO_TEXT_SHADOW }}>
              {countdown.days}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: HERO_PINK_ACCENT, textShadow: HERO_TEXT_SHADOW }}>Days</div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: HERO_BLUE_STRONG, textShadow: HERO_TEXT_SHADOW }}>:</div>
          
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: HERO_BLUE_PRIMARY, textShadow: HERO_TEXT_SHADOW }}>
              {countdown.hours}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: HERO_PINK_ACCENT, textShadow: HERO_TEXT_SHADOW }}>Hours</div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: HERO_BLUE_STRONG, textShadow: HERO_TEXT_SHADOW }}>:</div>
          
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: HERO_BLUE_PRIMARY, textShadow: HERO_TEXT_SHADOW }}>
              {countdown.minutes}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: HERO_PINK_ACCENT, textShadow: HERO_TEXT_SHADOW }}>Minutes</div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: HERO_BLUE_STRONG, textShadow: HERO_TEXT_SHADOW }}>:</div>
          
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: HERO_BLUE_PRIMARY, textShadow: HERO_TEXT_SHADOW }}>
              {countdown.seconds}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: HERO_PINK_ACCENT, textShadow: HERO_TEXT_SHADOW }}>Seconds</div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default SaveTheDateCounter
