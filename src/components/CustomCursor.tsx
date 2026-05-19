'use client'

import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 6
const MIN_DIST = 5

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)      // outer ring — fast
  const followerRef = useRef<HTMLDivElement>(null)  // inner ring — slow, lags behind
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const follower = followerRef.current
    const canvas = canvasRef.current
    if (!ring || !follower || !canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')!

    const trail: { x: number; y: number }[] = []
    const posHistory: { x: number; y: number }[] = []
    const FOLLOW_DELAY = 28   // frames the inner ring lags behind
    let mouseX = 0, mouseY = 0
    let rX = 0, rY = 0       // outer ring position
    let fX = 0, fY = 0       // follower position
    let lastTX = 0, lastTY = 0
    let decayTick = 0
    let animationId: number

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onResize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function animate() {
      // Outer ring: fast follow
      rX += (mouseX - rX) * 0.18
      rY += (mouseY - rY) * 0.18
      ring!.style.transform = `translate(${rX}px, ${rY}px) translate(-50%, -50%)`

      // Store outer ring history for the follower
      posHistory.push({ x: rX, y: rY })
      if (posHistory.length > FOLLOW_DELAY + 1) posHistory.shift()

      // Inner ring: tracks where the outer ring was FOLLOW_DELAY frames ago
      // → consistent spatial gap regardless of movement speed
      const target = posHistory[0] ?? { x: rX, y: rY }
      fX += (target.x - fX) * 0.35
      fY += (target.y - fY) * 0.35
      follower!.style.transform = `translate(${fX}px, ${fY}px) translate(-50%, -50%)`

      // Trail based on outer ring position
      const dx = rX - lastTX
      const dy = rY - lastTY
      if (dx * dx + dy * dy > MIN_DIST * MIN_DIST) {
        trail.push({ x: rX, y: rY })
        if (trail.length > TRAIL_LENGTH) trail.shift()
        lastTX = rX
        lastTY = rY
        decayTick = 0
      } else {
        decayTick++
        if (decayTick % 3 === 0 && trail.length > 0) trail.shift()
      }

      ctx.clearRect(0, 0, canvas!.width, canvas!.height)

      trail.forEach((point, i) => {
        const t = (i + 1) / trail.length
        ctx.beginPath()
        ctx.arc(point.x, point.y, 11, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(184, 124, 78, ${t * 0.38})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    function addHover() {
      ring?.classList.add('hover')
      follower?.classList.add('hover')
    }
    function removeHover() {
      ring?.classList.remove('hover')
      follower?.classList.remove('hover')
    }

    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    animate()

    const selector = 'a, button, .skill-tag, .project-card, .timeline-item, .btn-contact'
    function attachListeners() {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }
    attachListeners()

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9997 }}
      />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor" aria-hidden="true" />
    </>
  )
}
