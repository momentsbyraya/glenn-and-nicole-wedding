import React from 'react'
import { watermark } from '../data'

/**
 * Subtle corner watermark for photos. Configure text in src/data/watermark.json.
 * Parent must be `position: relative` (or absolute/fixed with inset).
 */
const PhotoWatermark = ({ variant = 'thumb', className = '' }) => {
  if (!watermark?.enabled) return null
  const main = (watermark.text || '').trim()
  const sub = (watermark.subtext || '').trim()
  if (!main && !sub) return null

  const variants = {
    hero: 'bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 text-[0.65rem] sm:text-xs md:text-sm',
    section: 'bottom-2 right-2 sm:bottom-3 sm:right-3 text-[0.6rem] sm:text-[0.7rem]',
    thumb: 'bottom-1 right-1 text-[0.55rem] sm:text-[0.62rem] leading-tight',
    lightbox: 'bottom-4 right-4 sm:bottom-6 sm:right-6 text-xs sm:text-sm',
    polaroid: 'bottom-0.5 right-0.5 text-[0.45rem] sm:text-[0.5rem] leading-none max-w-[90%]',
  }

  const base =
    'pointer-events-none absolute z-[6] text-right font-albert font-medium tracking-wide select-none'

  return (
    <div
      className={`${base} ${variants[variant] || variants.thumb} ${className}`}
      style={{
        color: 'rgba(255, 255, 255, 0.92)',
        textShadow:
          '0 1px 2px rgba(0,0,0,0.85), 0 0 10px rgba(0,0,0,0.45), 0 0 1px rgba(0,0,0,0.9)',
      }}
      aria-hidden
    >
      {main && <span className="block">{main}</span>}
      {sub && (
        <span className="mt-0.5 block font-normal opacity-90" style={{ fontSize: '0.92em' }}>
          {sub}
        </span>
      )}
    </div>
  )
}

export default PhotoWatermark
