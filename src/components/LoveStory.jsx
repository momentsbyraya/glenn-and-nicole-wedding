import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const polaroidImages = [
  '/assets/images/couple-1.jpg',
  '/assets/images/couple-2.jpg',
  '/assets/images/couple-3.jpg',
  '/assets/images/couple-4.jpg',
  '/assets/images/couple-5.jpg',
  '/assets/images/couple-6.jpg',
]

const LoveStory = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const summaryBlockRef = useRef(null)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalOverlayRef = useRef(null)
  const modalContentRef = useRef(null)
  const photoModalOverlayRef = useRef(null)
  const photoModalContentRef = useRef(null)

  const summary = loveStory.content
  const timeline = loveStory.timeline || []

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }
    if (summaryBlockRef.current) {
      gsap.set(summaryBlockRef.current, { opacity: 0, y: 24 })
      ScrollTrigger.create({
        trigger: summaryBlockRef.current,
        start: "top 85%",
        animation: gsap.to(summaryBlockRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
        toggleActions: "play none none reverse"
      })
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (trigger.vars.trigger === titleRef.current || trigger.vars.trigger === summaryBlockRef.current)) {
          trigger.kill()
        }
      })
    }
  }, [])

  const openStoryModal = () => setIsStoryModalOpen(true)
  const closeStoryModal = () => setIsStoryModalOpen(false)

  const openPhotoModal = (index) => {
    setCurrentImageIndex(index)
    setIsPhotoModalOpen(true)
  }
  const closePhotoModal = () => setIsPhotoModalOpen(false)
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)

  useEffect(() => {
    if (!isPhotoModalOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closePhotoModal()
      else if (e.key === 'ArrowLeft') prevImage()
      else if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPhotoModalOpen])

  useEffect(() => {
    const open = isStoryModalOpen || isPhotoModalOpen
    if (open) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isStoryModalOpen, isPhotoModalOpen])

  useEffect(() => {
    if (isStoryModalOpen && modalOverlayRef.current && modalContentRef.current) {
      gsap.set([modalOverlayRef.current, modalContentRef.current], { opacity: 0 })
      gsap.set(modalContentRef.current, { y: 20 })
      gsap.to(modalOverlayRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
      gsap.to(modalContentRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
    }
  }, [isStoryModalOpen])

  useEffect(() => {
    if (isPhotoModalOpen && photoModalOverlayRef.current && photoModalContentRef.current) {
      gsap.set([photoModalOverlayRef.current, photoModalContentRef.current], { opacity: 0 })
      gsap.set(photoModalContentRef.current, { scale: 0.95 })
      gsap.to(photoModalOverlayRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
      gsap.to(photoModalContentRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" })
    }
  }, [isPhotoModalOpen])

  const PolaroidFrame = ({ image, rotation = 0, index, onClick, size = 'normal' }) => {
    const maxWidth = size === 'small' ? '120px' : size === 'large' ? '280px' : '200px'
    return (
      <div
        className="bg-white shadow-lg relative"
        style={{
          border: '4px solid white',
          borderBottom: '12px solid white',
          transform: `rotate(${rotation}deg)`,
          maxWidth,
          width: '100%',
          padding: '2px 2px 8px 2px',
          cursor: onClick ? 'pointer' : 'default'
        }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        aria-label={onClick ? `View photo ${index + 1}` : undefined}
      >
        <div className="relative">
          <img
            src={image}
            alt={`Love story ${index + 1}`}
            className="w-full aspect-square object-cover"
            style={{ border: '2px solid #FFFBFB', borderBottom: 'none', display: 'block' }}
          />
          <img
            src="/assets/images/graphics/stamp.png"
            alt=""
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: '-8%', width: '20%', height: 'auto', pointerEvents: 'none' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex justify-center mb-4">
          <img src="/assets/images/graphics/heart.png" alt="" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain" />
        </div>
        <h3 ref={titleRef} className="relative inline-block px-6 py-3">
          <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize" style={{ color: themeConfig.text.wine }}>
            {loveStory.title}
          </span>
        </h3>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div ref={summaryBlockRef} className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center justify-center">
          <div className="flex-shrink-0 flex justify-center">
            <PolaroidFrame image={polaroidImages[0]} rotation={-2} index={0} size="large" onClick={() => openPhotoModal(0)} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm sm:text-base font-albert font-thin text-burgundy-dark leading-relaxed">
              {summary}
            </p>
            <button
              type="button"
              onClick={openStoryModal}
              className="mt-6 px-6 py-3 rounded-full border-2 font-albert text-sm sm:text-base transition-colors duration-200"
              style={{ borderColor: themeConfig.text.wine, color: themeConfig.text.wine }}
              aria-label="Read our full story"
            >
              Read our full story
            </button>
          </div>
        </div>
      </div>

      {/* Full story modal */}
      {isStoryModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ position: 'fixed' }}>
          <div ref={modalOverlayRef} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeStoryModal} aria-hidden />
          <button
            onClick={closeStoryModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div
            ref={modalContentRef}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl"
            style={{ color: '#1e3a5f' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur py-4 px-6 border-b border-gray-200/80 rounded-t-2xl z-10">
              <h3 className="font-foglihten text-2xl sm:text-3xl text-center" style={{ color: themeConfig.text.wine }}>{loveStory.title}</h3>
            </div>
            <div className="p-6 pb-10">
              {/* Old design: alternating polaroid + text rows */}
              <div className="flex flex-col gap-10 sm:gap-14">
                {/* Row 1: polaroid left, summary right */}
                <div className="grid w-full gap-4 sm:gap-6 md:gap-8 items-center min-h-0" style={{ gridTemplateColumns: '2fr 3fr' }}>
                  <div className="flex justify-center min-w-0">
                    <PolaroidFrame image={polaroidImages[0]} rotation={-3} index={0} onClick={() => { closeStoryModal(); openPhotoModal(0); }} />
                  </div>
                  <div className="flex items-center min-w-0">
                    <p className="text-sm sm:text-base font-albert font-thin text-burgundy-dark leading-relaxed text-left w-full">{summary}</p>
                  </div>
                </div>
                {timeline.map((item, i) => {
                  const photoLeft = i % 2 === 0
                  const imageIndex = (i + 1) % polaroidImages.length
                  return (
                    <div
                      key={i}
                      className="grid w-full gap-4 sm:gap-6 md:gap-8 items-center min-h-0"
                      style={{ gridTemplateColumns: photoLeft ? '3fr 2fr' : '2fr 3fr' }}
                    >
                      {photoLeft ? (
                    <>
                      <div className="flex items-center min-w-0 order-2 sm:order-1">
                        <div>
                          <h4 className="font-boska text-lg text-burgundy-dark">{item.title}</h4>
                          {item.date && <p className="text-xs font-albert text-gray-500 mt-0.5">{item.date}</p>}
                          {item.description && <p className="text-sm font-albert font-thin text-burgundy-dark mt-2 leading-relaxed">{item.description}</p>}
                        </div>
                      </div>
                      <div className="flex justify-center min-w-0 order-1 sm:order-2">
                        <PolaroidFrame image={polaroidImages[imageIndex]} rotation={3} index={imageIndex} onClick={() => { closeStoryModal(); openPhotoModal(imageIndex); }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center min-w-0">
                        <PolaroidFrame image={polaroidImages[imageIndex]} rotation={-3} index={imageIndex} onClick={() => { closeStoryModal(); openPhotoModal(imageIndex); }} />
                      </div>
                      <div className="flex items-center min-w-0">
                        <div>
                          <h4 className="font-boska text-lg text-burgundy-dark">{item.title}</h4>
                          {item.date && <p className="text-xs font-albert text-gray-500 mt-0.5">{item.date}</p>}
                          {item.description && <p className="text-sm font-albert font-thin text-burgundy-dark mt-2 leading-relaxed">{item.description}</p>}
                        </div>
                      </div>
                    </>
                  )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Single photo modal (from polaroid click) */}
      {isPhotoModalOpen && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          <div ref={photoModalOverlayRef} className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closePhotoModal} aria-hidden />
          <button onClick={closePhotoModal} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer" aria-label="Close">
            <X className="w-6 h-6 text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer" aria-label="Previous">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer" aria-label="Next">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div ref={photoModalContentRef} className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none">
            <img src={polaroidImages[currentImageIndex]} alt={`Photo ${currentImageIndex + 1}`} className="max-w-full max-h-[90vh] object-contain rounded" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm pointer-events-none">
            <span className="text-white text-sm font-albert">{currentImageIndex + 1} / {polaroidImages.length}</span>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default LoveStory
