import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const CAROUSEL_SPEED_PX_PER_SEC = 36
const CAROUSEL_RESUME_DELAY_MS = 2500

const VENUE_IMAGES = [
  '/assets/images/venues/recep1.jpg',
  '/assets/images/venues/recep2.jpg',
  '/assets/images/venues/recep3.jpg',
  '/assets/images/venues/recep4.jpg',
  '/assets/images/venues/recep5.jpg',
  '/assets/images/venues/recep6.jpg',
]

const Venue = () => {
  const venueSectionRef = useRef(null)
  const venueTitleRef = useRef(null)
  const venueCardsContainerRef = useRef(null)
  const venueDetailsRef = useRef(null)

  // Infinite carousel (mobile): same as gift section
  const carouselTrackRef = useRef(null)
  const carouselFirstSetRef = useRef(null)
  const setWidthRef = useRef(0)
  const scrollOffsetRef = useRef(0)
  const rafRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)
  const touchStartOffsetRef = useRef(0)
  const didHorizontalRef = useRef(false)
  const carouselViewportRef = useRef(null)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  // Infinite carousel: measure, auto-scroll, touch/mouse (same as gift)
  useEffect(() => {
    const measureSetWidth = () => {
      if (carouselFirstSetRef.current) {
        setWidthRef.current = carouselFirstSetRef.current.offsetWidth
      }
    }
    measureSetWidth()
    requestAnimationFrame(measureSetWidth)
    const resizeObserver = new ResizeObserver(measureSetWidth)
    if (carouselFirstSetRef.current) {
      resizeObserver.observe(carouselFirstSetRef.current)
    }

    const tick = () => {
      const setWidth = setWidthRef.current
      const track = carouselTrackRef.current
      if (!track || setWidth <= 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (!isCarouselPaused) {
        scrollOffsetRef.current += CAROUSEL_SPEED_PX_PER_SEC / 60
        if (scrollOffsetRef.current >= setWidth) {
          scrollOffsetRef.current -= setWidth
        }
        if (scrollOffsetRef.current < 0) {
          scrollOffsetRef.current += setWidth
        }
      }
      track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
      resizeObserver.disconnect()
    }
  }, [isCarouselPaused])

  const handleCarouselTouchStart = (e) => {
    setIsCarouselPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
    touchStartOffsetRef.current = scrollOffsetRef.current
    didHorizontalRef.current = false
  }

  const handleCarouselTouchMove = (e) => {
    const setWidth = setWidthRef.current
    const track = carouselTrackRef.current
    if (!track || setWidth <= 0) return
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    const dx = Math.abs(x - touchStartXRef.current)
    const dy = Math.abs(y - touchStartYRef.current)
    if (!didHorizontalRef.current && (dx > 10 || dy > 10)) {
      didHorizontalRef.current = dx > dy
    }
    if (didHorizontalRef.current && dx > 2) {
      e.preventDefault()
    }
    const delta = touchStartXRef.current - x
    let next = touchStartOffsetRef.current + delta
    while (next >= setWidth) next -= setWidth
    while (next < 0) next += setWidth
    scrollOffsetRef.current = next
    track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
  }

  const carouselTouchMoveRef = useRef(handleCarouselTouchMove)
  carouselTouchMoveRef.current = handleCarouselTouchMove

  useEffect(() => {
    const viewport = carouselViewportRef.current
    if (!viewport) return
    const onTouchMove = (e) => {
      carouselTouchMoveRef.current(e)
    }
    viewport.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => viewport.removeEventListener('touchmove', onTouchMove)
  }, [])

  const handleCarouselTouchEnd = () => {
    const setWidth = setWidthRef.current
    if (setWidth > 0) {
      let o = scrollOffsetRef.current
      o = ((o % setWidth) + setWidth) % setWidth
      scrollOffsetRef.current = o
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
      }
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsCarouselPaused(false)
    }, CAROUSEL_RESUME_DELAY_MS)
  }

  const handleCarouselMouseDown = (e) => {
    if (e.button !== 0) return
    setIsCarouselPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    touchStartXRef.current = e.clientX
    touchStartOffsetRef.current = scrollOffsetRef.current
    const onMouseMove = (e2) => {
      const setWidth = setWidthRef.current
      const track = carouselTrackRef.current
      if (!track || setWidth <= 0) return
      const delta = touchStartXRef.current - e2.clientX
      let next = touchStartOffsetRef.current + delta
      touchStartOffsetRef.current = next
      touchStartXRef.current = e2.clientX
      while (next >= setWidth) next -= setWidth
      while (next < 0) next += setWidth
      scrollOffsetRef.current = next
      track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
    }
    const onMouseUp = () => {
      const setWidth = setWidthRef.current
      if (setWidth > 0) {
        let o = scrollOffsetRef.current
        o = ((o % setWidth) + setWidth) % setWidth
        scrollOffsetRef.current = o
        if (carouselTrackRef.current) {
          carouselTrackRef.current.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
        }
      }
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      pauseTimeoutRef.current = setTimeout(() => setIsCarouselPaused(false), CAROUSEL_RESUME_DELAY_MS)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  useEffect(() => {
    if (!venueSectionRef.current) return

    if (venueTitleRef.current) gsap.set(venueTitleRef.current, { opacity: 0, y: 24 })
    const cards = venueCardsContainerRef.current?.querySelectorAll('.venue-image-card') || []
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 28 })
    })
    const detailBlocks = venueDetailsRef.current?.querySelectorAll('.venue-details > div') || []
    detailBlocks.forEach((block) => {
      gsap.set(block, { opacity: 0, y: 28 })
    })

    ScrollTrigger.create({
      trigger: venueSectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (venueTitleRef.current) {
          gsap.to(venueTitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        }
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            delay: 0.5 + i * 0.25,
          })
        })
        const cardsEndDelay = 0.5 + cards.length * 0.25
        detailBlocks.forEach((block, j) => {
          gsap.to(block, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            delay: cardsEndDelay + 0.15 + j * 0.2,
          })
        })
      },
      toggleActions: 'play none none reverse',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === venueSectionRef.current) trigger.kill()
      })
    }
  }, [])

  const venueCardContent = (src, index, prefix = '') => (
    <div
      key={`${prefix}-${src}`}
      className="venue-image-card flex-shrink-0 w-[85vw] min-w-[260px] max-w-[280px]"
    >
      <img
        src={src}
        alt={`${reception.name} view ${index + 1}`}
        className="w-full h-48 object-cover rounded-lg border-2 border-burgundy-wine/20 select-none"
        draggable={false}
      />
    </div>
  )

  return (
    <div ref={venueSectionRef} className="relative">
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text">
            WHERE TO GO
          </span>
        </h3>
      </div>

      <div className="relative overflow-visible flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Mobile: infinite auto-scroll carousel (same moving behavior as gift) */}
        <div
          ref={carouselViewportRef}
          className="venue-carousel-viewport md:hidden overflow-hidden touch-pan-y w-full"
          onTouchStart={handleCarouselTouchStart}
          onTouchEnd={handleCarouselTouchEnd}
          onMouseDown={handleCarouselMouseDown}
        >
          <div
            ref={carouselTrackRef}
            className="venue-carousel-track flex gap-4 flex-nowrap will-change-transform"
          >
            <div ref={carouselFirstSetRef} className="flex gap-4 flex-shrink-0">
              {VENUE_IMAGES.map((src, index) => venueCardContent(src, index, 'a'))}
            </div>
            <div className="flex gap-4 flex-shrink-0">
              {VENUE_IMAGES.map((src, index) => venueCardContent(src, index, 'b'))}
            </div>
          </div>
        </div>

        {/* Desktop: static row with stagger animation */}
        <div
          ref={venueCardsContainerRef}
          className="hidden md:block w-full overflow-x-auto overflow-y-hidden venue-cards-container -mx-4 sm:mx-0 px-4 sm:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          <div className="flex gap-4 md:gap-6 min-w-min justify-center py-2">
            {VENUE_IMAGES.map((src, index) => (
              <div
                key={src}
                className="venue-image-card flex-shrink-0 snap-center snap-always sm:w-[280px] md:w-[300px]"
              >
                <img
                  src={src}
                  alt={`${reception.name} view ${index + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg border-2 border-burgundy-wine/20"
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={venueDetailsRef} className="venue-details w-full flex flex-col gap-4 px-2 mt-6 text-center max-w-md mx-auto">
          <div className="text-lg sm:text-xl font-boska text-burgundy-dark">
            {reception.name}
          </div>
          <div className="text-sm sm:text-base font-albert font-thin text-burgundy-dark space-y-1">
            <p>Ceremony: {ceremony.time}</p>
            <p>Reception: {reception.time}</p>
          </div>
          <div className="flex justify-center">
            <SecondaryButton
              href={reception.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={ArrowRight}
            >
              Get Direction
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Venue
