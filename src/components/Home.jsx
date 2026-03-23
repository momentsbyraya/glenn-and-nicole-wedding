import React from 'react'
import Hero from './Hero'
import Venue from './Venue'
import Schedule from './Schedule'
import EntourageSection from './EntourageSection'
import RSVPSection from './RSVPSection'
import Gallery from './Gallery'
import GiftRegistry from './GiftRegistry'
import DressCode from './DressCode'
import FAQ from './FAQ'
import SaveTheDateCounter from './SaveTheDateCounter'
import Divider from './Divider'
import './pages/Details.css'

const Home = ({ onOpenRSVP }) => {
  return (
    <div className="relative w-full bg-transparent">
      {/* Hero Section */}
      <Hero />

      {/* Our Moments */}
      <div className="relative z-20 flex items-center justify-center pt-12 pastel-watercolor-bg">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <Gallery />
        </div>
      </div>

      {/* Flower Banner - Top (Where to go) */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/for%20flower-banner.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Venue Section */}
          <Venue />
        </div>
      </div>

      {/* Flower Banner - Bottom (Where to go) */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/for%20flower-banner.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />
        </div>
      </div>

      {/* Entourage Section - soft pastel background */}
      <div className="pastel-watercolor-bg">
        <EntourageSection />
      </div>

      {/* Content - soft pastel background for remaining sections */}
      <div className="relative z-20 flex items-center justify-center pt-12 pastel-watercolor-bg">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Dress Code Section */}
          <DressCode />

          {/* Notes on Gifts */}
          <GiftRegistry />

          {/* RSVP Section */}
          <RSVPSection onOpenRSVP={onOpenRSVP} />
        </div>
      </div>

      {/* FAQ Section - soft pastel background */}
      <div className="pastel-watercolor-bg">
        <FAQ />
      </div>

      {/* Save The Date Counter Section */}
      <SaveTheDateCounter />
    </div>
  )
}

export default Home
