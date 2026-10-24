import { useSyncExternalStore } from 'react'

// The site itself sets no cookies. The only optional category is external media: the
// Google Maps embed in the footer, which drops Google's own cookies once it loads.
const STORAGE_KEY = 'ab-cookie-consent'
const VERSION = 1

const read = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
        return saved?.version === VERSION ? saved : null
    } catch {
        return null
    }
}

let state = { consent: read(), bannerOpen: false }
state.bannerOpen = !state.consent

const listeners = new Set()
const emit = () => listeners.forEach(listener => listener())

const subscribe = listener => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

export const saveConsent = ({ external }) => {
    const consent = { version: VERSION, external, decidedAt: new Date().toISOString() }
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {
        // storage blocked: the choice still holds for this visit
    }
    state = { consent, bannerOpen: false }
    emit()
}

export const openCookieSettings = () => {
    state = { ...state, bannerOpen: true }
    emit()
}

export default function useConsent(){
    return useSyncExternalStore(subscribe, () => state, () => state)
}
