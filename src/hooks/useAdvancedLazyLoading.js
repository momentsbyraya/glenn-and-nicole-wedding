import { useEffect, useRef, useState, useCallback } from 'react'

export const useAdvancedLazyLoading = (options = {}) => {
  const {
    threshold = 0.5,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    delay = 100,
    onIntersect = null
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef(null)

  const handleIntersection = useCallback(([entry], observer) => {
    if (entry.isIntersecting && entry.intersectionRatio >= threshold && !hasTriggered) {
      setIsVisible(true)
      setHasTriggered(true)
      
      if (onIntersect) {
        onIntersect(entry)
      }
      
      // Mark as loaded after delay
      setTimeout(() => setIsLoaded(true), delay)
      
      // Disconnect observer if triggerOnce is true
      if (triggerOnce) {
        observer.disconnect()
      }
    }
  }, [threshold, hasTriggered, onIntersect, delay, triggerOnce])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      setHasTriggered(true)
      const timeoutId = window.setTimeout(() => setIsLoaded(true), delay)
      return () => window.clearTimeout(timeoutId)
    }

    const observer = new IntersectionObserver((entries) => handleIntersection(entries, observer), {
      threshold: threshold,
      rootMargin: rootMargin
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [handleIntersection, threshold, rootMargin])

  const reset = useCallback(() => {
    setIsVisible(false)
    setIsLoaded(false)
    setHasTriggered(false)
  }, [])

  return { 
    elementRef, 
    isVisible, 
    isLoaded, 
    hasTriggered,
    reset 
  }
} 
