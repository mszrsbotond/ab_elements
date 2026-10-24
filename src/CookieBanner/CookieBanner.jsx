import { Cookie } from 'lucide-react'

import './CookieBanner.css'

import useConsent, { saveConsent } from '../consent'
import { legalLinks } from '../legalLinks'

export default function CookieBanner(){
    const { bannerOpen } = useConsent()
    if (!bannerOpen) return null

    return(
        <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-text">
            <Cookie className="cookie-banner-icon" size={28} strokeWidth={1.75} aria-hidden="true" />
            <div className="cookie-banner-body">
                <h2 id="cookie-banner-title" className="cookie-banner-title">Sütik és külső tartalmak</h2>
                <p id="cookie-banner-text" className="cookie-banner-text">
                    Weboldalunk csak a működéshez feltétlenül szükséges adatokat tárolja. A lábléc
                    térképe a Google Maps szolgáltatásával jelenik meg, amely saját sütiket helyezhet el
                    – ezt csak az Ön hozzájárulásával töltjük be. Részletek
                    az <a href={legalLinks.privacy.href}>adatkezelési tájékoztatóban</a>.
                </p>
            </div>
            <div className="cookie-banner-actions">
                <button type="button" className="cookie-banner-btn is-secondary" onClick={() => saveConsent({ external: false })}>
                    Csak a szükségesek
                </button>
                <button type="button" className="cookie-banner-btn" onClick={() => saveConsent({ external: true })}>
                    Elfogadom
                </button>
            </div>
        </div>
    )
}
