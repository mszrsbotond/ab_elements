import { useEffect } from 'react'

// the page must sit still this long before a snap is considered (trackpad momentum fires every ~16ms)
const IDLE_MS = 140
// fraction of the viewport: only clip when the nearest edge is already closer than this
const SNAP_RATIO = 0.1
// closer than this and the position is already right
const MIN_SNAP_PX = 2

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const easeOutCubic = t => 1 - (1 - t) ** 3

export default function useSectionScroll(selector = '.snap-section'){
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let raf = 0
        let anim = null
        let idleTimer = 0

        const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

        // a section sits flush either with its top at the viewport top, or with its bottom at the viewport bottom
        const snapPoints = () => {
            const vh = window.innerHeight
            const max = maxScroll()
            const tops = [...document.querySelectorAll(selector)].map(el => el.getBoundingClientRect().top + window.scrollY)
            const points = []
            tops.forEach((top, i) => {
                points.push(clamp(top, 0, max))
                // only sections taller than the viewport have a bottom edge of their own to clip to
                if (i > 0 && top - vh > tops[i - 1]) points.push(clamp(top - vh, 0, max))
            })
            return points
        }

        const cancel = () => {
            cancelAnimationFrame(raf)
            raf = 0
            anim = null
        }

        const frame = (now) => {
            if (!anim) return
            const t = clamp((now - anim.start) / anim.duration, 0, 1)
            // the user (or anything else) scrolled mid-flight: hand control straight back
            if (Math.abs(window.scrollY - anim.written) > 3){
                cancel()
                return
            }
            const pos = anim.from + (anim.to - anim.from) * easeOutCubic(t)
            window.scrollTo(0, pos)
            anim.written = window.scrollY
            if (t === 1) cancel()
            else raf = requestAnimationFrame(frame)
        }

        const settle = () => {
            if (anim) return
            const from = window.scrollY
            const vh = window.innerHeight
            let to = from
            let best = Infinity
            for (const p of snapPoints()){
                const d = Math.abs(p - from)
                if (d < best){ best = d; to = p }
            }
            // far from any edge means the user is reading somewhere in the middle: leave them alone
            if (best > vh * SNAP_RATIO || best < MIN_SNAP_PX) return
            anim = { from, to, start: performance.now(), duration: clamp(best * 2.2, 180, 360), written: from }
            raf = requestAnimationFrame(frame)
        }

        const onScroll = () => {
            if (anim) return
            clearTimeout(idleTimer)
            idleTimer = setTimeout(settle, IDLE_MS)
        }

        const interrupt = () => {
            cancel()
            clearTimeout(idleTimer)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('wheel', cancel, { passive: true })
        window.addEventListener('touchstart', interrupt, { passive: true })
        window.addEventListener('keydown', interrupt)
        window.addEventListener('pointerdown', interrupt)
        window.addEventListener('resize', interrupt)
        return () => {
            cancel()
            clearTimeout(idleTimer)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('wheel', cancel)
            window.removeEventListener('touchstart', interrupt)
            window.removeEventListener('keydown', interrupt)
            window.removeEventListener('pointerdown', interrupt)
            window.removeEventListener('resize', interrupt)
        }
    }, [selector])
}
