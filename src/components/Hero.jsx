import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Play, Pause } from 'lucide-react'
import { couple, venues, prenupImages } from '../data'
import PhotoWatermark from './PhotoWatermark'
import { useAudio } from '../contexts/AudioContext'

// Hero text — vibrant blue / soft pink, solid colors (no shadows)
const HERO_BLUE_PRIMARY = '#4A90E2'
const HERO_PINK_ACCENT = '#FF8FA3'
/** Slightly stronger blue for small caps “AND” readability */
const HERO_BLUE_STRONG = '#3A7BD5'

const Hero = () => {
  const { play, pause, isPlaying } = useAudio()

  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)
  const playButtonRef = useRef(null)

  const formatDate = () => {
    const { month, day, year } = couple.wedding
    const dayNum = parseInt(String(day), 10)
    return `${month}.${dayNum}.${year}`
  }

  // Split full name into first line (all but last word) and last name for hero display
  const splitFullName = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return { first: '', last: '' }
    const parts = fullName.trim().split(/\s+/)
    if (parts.length === 1) return { first: parts[0], last: '' }
    const last = parts.pop()
    return { first: parts.join(' '), last }
  }

  const groomName = splitFullName(couple.groom.fullName)
  const brideName = splitFullName(couple.bride.fullName)

  /* Ceremony under hero date: optional two-line array, else single fallback string */
  const heroCeremonyLines = Array.isArray(venues.heroCeremonyLines)
    ? venues.heroCeremonyLines.map((s) => String(s).trim()).filter(Boolean)
    : []
  const ceremonyLocationLine =
    (venues.heroReceptionLine && String(venues.heroReceptionLine).trim()) ||
    [venues.ceremony?.name, venues.ceremony?.city].filter((s) => s && String(s).trim()).join(', ') ||
    venues.ceremony?.name ||
    ''

  /** Same track as envelope autoplay: pause while playing; resume (no restart) when paused. */
  const handleHeroMusicButton = () => {
    if (isPlaying) {
      pause()
    } else {
      play(false)
    }
  }

  useEffect(() => {
    // Set initial hidden states
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })
    gsap.set(venueRef.current, { opacity: 0, y: 20 })
    gsap.set(playButtonRef.current, { opacity: 0, scale: 0.8 })

    // Create timeline for sequential animations (top → bottom: date, then names)
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Date (top)
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
    }

    // 2. Ceremony location (under date)
    if (venueRef.current) {
      tl.to(venueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 3. Groom's name
    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(groomLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 4. "AND"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 5. Bride's name
    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(brideLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 6. Play button
    if (playButtonRef.current) {
      tl.to(playButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2")
    }
  }, [])

  return (
    <div
      className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-[#e8eef5]"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      }}
    >
      {/* Music: single AudioContext player (starts on envelope; button syncs to isPlaying) */}

      {/* Full-bleed banner: overflow hidden + slight scale removes edge gaps (letterboxing / subpixel) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={prenupImages.hero}
          alt="Hero"
          className="absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover max-[480px]:object-[50%_42%] object-[50%_50%] sm:object-[50%_52%] md:object-[50%_54%] lg:object-[50%_55%] scale-[1.03] sm:scale-[1.02] md:scale-[1.015] lg:scale-100"
          style={{ maxWidth: 'none' }}
        />
        <PhotoWatermark variant="hero" />
      </div>
      
      {/* Safe-area: solid strip so status bar / notch never shows a gap above the fade */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-[11] -translate-x-1/2 bg-white"
        style={{ width: '120vw', height: 'env(safe-area-inset-top, 0px)', minHeight: 'max(env(safe-area-inset-top), 0px)' }}
        aria-hidden
      />

      {/* Top banner: short gradient — only behind date + brief fade into photo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 max-w-none -translate-x-1/2"
        style={{
          width: '120vw',
          height: 'clamp(9.5rem, calc(env(safe-area-inset-top, 0px) + 3.75rem + 11vh), 13.5rem)',
          background:
            'linear-gradient(to bottom, #ffffff 0%, #ffffff 8%, rgba(255,255,255,0.88) 22%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.18) 72%, rgba(255,255,255,0) 100%)',
        }}
        aria-hidden
      />
      
      {/* Date + ceremony — top (under gradient) */}
      <div
        className="absolute top-0 left-0 right-0 px-4 sm:px-6 md:px-8 z-20 pb-1"
        style={{ paddingTop: 'max(0.5rem, calc(env(safe-area-inset-top, 0px) + 0.9rem))' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p ref={dateRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-foglihten leading-none sm:leading-tight" style={{ color: HERO_BLUE_PRIMARY }}>
            {formatDate()}
          </p>
          <div
            ref={venueRef}
            className="flex flex-col items-center text-xs sm:text-sm md:text-base font-albert mt-0.5 sm:mt-1 max-w-xl mx-auto leading-tight text-center"
            style={{ color: HERO_PINK_ACCENT }}
          >
            {heroCeremonyLines.length >= 2 ? (
              <>
                <span className="block max-w-full">{heroCeremonyLines[0]}</span>
                <span className="block max-w-full">{heroCeremonyLines[1]}</span>
              </>
            ) : (
              <span className="block max-w-full text-center px-2">{ceremonyLocationLine}</span>
            )}
          </div>
        </div>
      </div>

      {/* Home indicator / bottom safe area */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-[11] -translate-x-1/2 bg-white"
        style={{ width: '120vw', height: 'env(safe-area-inset-bottom, 0px)', minHeight: 'max(env(safe-area-inset-bottom), 0px)' }}
        aria-hidden
      />

      {/* Bottom banner: opaque white at the true bottom edge */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 max-w-none -translate-x-1/2"
        style={{
          width: '120vw',
          height: 'min(48vh, 34rem)',
          minHeight: '12rem',
          background:
            'linear-gradient(to top, #ffffff 0%, #ffffff 6%, rgba(255,255,255,0.96) 16%, rgba(255,255,255,0.72) 38%, rgba(255,255,255,0.28) 65%, rgba(255,255,255,0) 100%)',
        }}
        aria-hidden
      />

      {/* Music control — reflects autoplay; pauses same track, resumes without restarting */}
      <button
        type="button"
        ref={playButtonRef}
        onClick={handleHeroMusicButton}
        className="absolute bottom-32 sm:bottom-28 md:bottom-8 right-4 sm:right-6 md:right-8 z-30 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 flex items-center justify-center shadow-lg cursor-pointer"
        style={{ pointerEvents: 'auto' }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Pause size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5a7a9a]" fill="#5a7a9a" />
        ) : (
          <Play size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5a7a9a] ml-1" fill="#5a7a9a" />
        )}
      </button>

      {/* Couple names — bottom (white gradient behind text, extra padding so faces stay clear) */}
      <div className="absolute bottom-0 left-0 right-0 pb-14 sm:pb-16 md:pb-20 lg:pb-24 pt-[min(22vh,8rem)] px-4 sm:px-6 md:px-8 z-20 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center pointer-events-auto">
          <div className="flex flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr] md:grid-rows-2 md:items-end md:gap-x-3 md:gap-y-1">
            <p
              ref={groomFirstNameRef}
              className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl normal-case leading-tight tracking-wide whitespace-nowrap md:col-start-1 md:row-start-1 md:justify-self-end"
              style={{ color: HERO_BLUE_PRIMARY }}
            >
              {groomName.first}
            </p>
            <p
              ref={groomLastNameRef}
              className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl normal-case leading-tight -mt-1 sm:-mt-2 md:mt-0 tracking-wide whitespace-nowrap md:col-start-1 md:row-start-2 md:justify-self-end"
              style={{ color: HERO_PINK_ACCENT }}
            >
              {groomName.last}
            </p>
            <p
              ref={andRef}
              className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3 md:my-0 md:col-start-2 md:row-start-1 md:row-span-2 md:self-center"
              style={{ color: HERO_BLUE_STRONG }}
            >
              AND
            </p>
            <p
              ref={brideFirstNameRef}
              className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl normal-case leading-tight tracking-wide whitespace-nowrap md:col-start-3 md:row-start-1 md:justify-self-start"
              style={{ color: HERO_BLUE_PRIMARY }}
            >
              {brideName.first}
            </p>
            <p
              ref={brideLastNameRef}
              className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl normal-case leading-tight -mt-1 sm:-mt-2 md:mt-0 tracking-wide whitespace-nowrap md:col-start-3 md:row-start-2 md:justify-self-start"
              style={{ color: HERO_PINK_ACCENT }}
            >
              {brideName.last}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
