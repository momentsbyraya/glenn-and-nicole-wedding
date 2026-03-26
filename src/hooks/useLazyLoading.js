import { useEffect, useRef, useState } from 'react'

export const useLazyLoading = (threshold = 0.5) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      const timeoutId = window.setTimeout(() => setIsLoaded(true), 100)
      return () => window.clearTimeout(timeoutId)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is halfway visible (threshold = 0.5)
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setIsVisible(true)
          // Mark as loaded after a small delay to ensure smooth transition
          setTimeout(() => setIsLoaded(true), 100)
          // Disconnect observer once loaded
          observer.disconnect()
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before the element is fully visible
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { elementRef, isVisible, isLoaded }
} 
