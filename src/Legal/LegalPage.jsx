import { ArrowLeft } from 'lucide-react'

import './Legal.css'
import '../LandingPage/Footer/Footer.css'

import { Imprint, Privacy, Terms } from './documents'
import { legalLinks } from '../legalLinks'
import { FooterBar } from '../LandingPage/Footer/Footer'
import CookieBanner from '../CookieBanner/CookieBanner'

import logo from '../assets/ABElementsMark.svg'

const documents = {
    privacy: { title: legalLinks.privacy.label, Content: Privacy },
    imprint: { title: legalLinks.imprint.label, Content: Imprint },
    terms: { title: 'Általános Szerződési Feltételek', Content: Terms },
}

export default function LegalPage({ page }){
    const { title, Content } = documents[page]

    return(
        <>
            <header className="legal-header">
                <div className="legal-header-inner">
                    <a href="/" className="legal-logo">
                        <img src={logo} alt="AB Elements – kezdőlap" width="120" height="59" />
                    </a>
                    <a href="/" className="legal-back">
                        <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
                        Vissza a főoldalra
                    </a>
                </div>
            </header>

            <main className="legal">
                <article className="legal-inner">
                    <h1 className="legal-title">{title}</h1>
                    <Content />
                </article>
            </main>

            <footer>
                <FooterBar />
            </footer>
            <CookieBanner />
        </>
    )
}
