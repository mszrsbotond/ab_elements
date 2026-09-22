import { useEffect, useRef, useState } from 'react'

import './CountUp.css'

const DURATION_MS = 1500
// decelerating ease: races up, then settles onto the final value
const easeOutCubic = t => 1 - (1 - t) ** 3

export default function CountUp({ value, suffix = '', className = '' }){
    const [shown, setShown] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
            setShown(value)
            return
        }

        let raf = 0
        const step = (start, now) => {
            const t = Math.min((now - start) / DURATION_MS, 1)
            setShown(Math.round(value * easeOutCubic(t)))
            if (t < 1) raf = requestAnimationFrame(next => step(start, next))
        }

        // count once, the first time the section scrolls into view
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            io.disconnect()
            const start = performance.now()
            raf = requestAnimationFrame(now => step(start, now))
        }, { threshold: 0.5 })

        io.observe(ref.current)
        return () => {
            io.disconnect()
            cancelAnimationFrame(raf)
        }
    }, [value])

    return (
        <span ref={ref} className={`count-up ${className}`}>
            <span aria-hidden="true">{shown}{suffix}</span>
            <span className="count-up-reserve">{value}{suffix}</span>
        </span>
    )
}
