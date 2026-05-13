'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let curX = 0
    let curY = 0
    let animationId: number

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      curX += (mouseX - curX) * 0.18
      curY += (mouseY - curY) * 0.18
      cursor!.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
      animationId = requestAnimationFrame(animate)
    }

    function addHover() {
      cursor?.classList.add('hover')
    }

    function removeHover() {
      cursor?.classList.remove('hover')
    }

    document.addEventListener('mousemove', onMouseMove)
    animate()

    // Add hover effect to all interactive elements
    const selector = 'a, button, .skill-tag, .project-card, .timeline-item, .btn-contact'

    function attachListeners() {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }

    // Attach immediately and re-attach on DOM changes
    attachListeners()

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  )
}
