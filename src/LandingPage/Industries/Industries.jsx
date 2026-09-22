import { useEffect, useRef, useState } from 'react'

import './Industries.css'

import { industries } from '../industries'

// k: horizontal offset, y: vertical offset (both in card widths), s: scale — indexed by distance from center
const SLOTS = [
    { k: 0, y: 0, s: 1 },
    { k: 0.83, y: 0.13, s: 0.76 },
    { k: 1.44, y: 0.09, s: 0.76 },
    { k: 2.01, y: 0.04, s: 0.76 },
]

const AUTOPLAY_MS = 2000
const DRAG_THRESHOLD = 60
const WHEEL_LOCK_MS = 500

const mod = (a, n) => ((a % n) + n) % n

export default function Industries(){
    const [step, setStep] = useState(3)
    const [dir, setDir] = useState(0)
    const [dragging, setDragging] = useState(false)
    const stageRef = useRef(null)
    const drag = useRef({ down: false, x: 0, moved: false })
    const lastMove = useRef(0)

    const n = industries.length
    const half = Math.floor(n / 2)

    const move = (delta) => {
        if (delta === 0) return
        lastMove.current = Date.now()
        setDir(Math.sign(delta))
        setStep(s => s + delta)
    }

    useEffect(() => {
        lastMove.current = Date.now()
        const id = setInterval(() => {
            if (drag.current.down) return
            if (Date.now() - lastMove.current >= AUTOPLAY_MS) move(1)
        }, 100)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const endDrag = () => {
            drag.current.down = false
            setDragging(false)
        }
        window.addEventListener('pointerup', endDrag)
        window.addEventListener('pointercancel', endDrag)
        window.addEventListener('blur', endDrag)
        return () => {
            window.removeEventListener('pointerup', endDrag)
            window.removeEventListener('pointercancel', endDrag)
            window.removeEventListener('blur', endDrag)
        }
    }, [])

    useEffect(() => {
        const stage = stageRef.current
        let lockedUntil = 0

        // checked by position so it keeps working while cards slide under the cursor
        const isOverCenter = (e) => {
            const rect = stage.getBoundingClientRect()
            const card = stage.querySelector('.industry-card.is-active')
            const w = card.offsetWidth
            const h = card.offsetHeight
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            return Math.abs(e.clientX - cx) <= w / 2 && Math.abs(e.clientY - cy) <= h / 2
        }

        const onWheel = (e) => {
            const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
            if (!horizontal && !isOverCenter(e)) return
            e.preventDefault()
            // keep the page-level section scrolling from also reacting
            e.stopPropagation()
            const delta = horizontal ? e.deltaX : e.deltaY
            if (delta === 0 || Date.now() < lockedUntil) return
            lockedUntil = Date.now() + WHEEL_LOCK_MS
            move(Math.sign(delta))
        }

        stage.addEventListener('wheel', onWheel, { passive: false })
        return () => stage.removeEventListener('wheel', onWheel)
    }, [])

    const onPointerDown = (e) => {
        drag.current = { down: true, x: e.clientX, moved: false }
        setDragging(true)
    }

    const onPointerMove = (e) => {
        if (!drag.current.down) return
        const dx = e.clientX - drag.current.x
        if (Math.abs(dx) >= DRAG_THRESHOLD){
            move(-Math.sign(dx))
            drag.current = { down: true, x: e.clientX, moved: true }
        }
    }

    return(
        <section className="industries">
            <div className="industries-inner">
                <h2 className="industries-title">Kiszolgált iparágak</h2>
            </div>
            <div
                ref={stageRef}
                className={`industries-stage${dragging ? ' is-dragging' : ''}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
            >
                {dir !== 0 && (() => {
                    const i = mod(step + (dir > 0 ? half : -half), n)
                    const slot = SLOTS[half]
                    return(
                        <div
                            key={`leaving-${step}`}
                            className={`industry-card ${dir > 0 ? 'leave-left' : 'leave-right'}`}
                            style={{ '--k': -dir * slot.k, '--y': slot.y, '--s': slot.s, zIndex: 0 }}
                            aria-hidden="true"
                        >
                            <img {...industries[i].image} alt="" draggable={false} className="industry-img" loading="lazy" decoding="async" />
                            <span className="industry-label">{industries[i].name}</span>
                        </div>
                    )
                })()}
                {industries.map((industry, i) => {
                    const u = i - step + half
                    const d = mod(u, n) - half
                    const lap = Math.floor(u / n)
                    const slot = SLOTS[Math.abs(d)]
                    const active = d === 0
                    const entering = dir !== 0 && d === dir * half

                    const className = [
                        'industry-card',
                        active && 'is-active',
                        entering && (dir > 0 ? 'enter-right' : 'enter-left'),
                    ].filter(Boolean).join(' ')

                    return(
                        <button
                            key={`${i}-${lap}`}
                            type="button"
                            className={className}
                            style={{
                                '--k': Math.sign(d) * slot.k,
                                '--y': slot.y,
                                '--s': slot.s,
                                zIndex: 10 - Math.abs(d),
                            }}
                            aria-label={industry.name}
                            aria-current={active}
                            onClick={() => { if (!drag.current.moved) move(d) }}
                        >
                            <img {...industry.image} alt="" draggable={false} className="industry-img" loading="lazy" decoding="async" />
                            <span className="industry-label">{industry.name}</span>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}
