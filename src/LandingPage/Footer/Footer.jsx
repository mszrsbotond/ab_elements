import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import './Footer.css'

import { services } from '../services'
import { industries } from '../industries'
import { sections, scrollToSection } from '../sections'
import { company, mapsQuery, telHref } from '../../company'
import { legalLinks } from '../../legalLinks'
import useConsent, { openCookieSettings, saveConsent } from '../../consent'

import logo from '../../assets/ABElementsMark.svg'

// lucide dropped its brand icons, so the LinkedIn glyph is drawn here
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
)

function FooterMap(){
    const { consent } = useConsent()
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`

    // the embed sets Google cookies, so it only loads once external media is allowed
    if (consent?.external){
        return(
            <iframe
                className="footer-map"
                title={`${company.brand} telephelye a térképen`}
                src={`https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        )
    }

    return(
        <div className="footer-map footer-map-placeholder">
            <MapPin size={28} strokeWidth={1.75} aria-hidden="true" />
            <p>A térkép a Google Maps szolgáltatásával töltődik be, amely sütiket helyezhet el.</p>
            <div className="footer-map-actions">
                <button type="button" className="footer-map-btn" onClick={() => saveConsent({ external: true })}>
                    Térkép betöltése
                </button>
                <a href={mapsLink} className="footer-link" target="_blank" rel="noopener noreferrer">
                    Megnyitás a Google Térképen
                </a>
            </div>
        </div>
    )
}

// shared with the legal pages, which close on the same bar
export function FooterBar(){
    return(
        <div className="footer-copyright">
            <p>
                © {new Date().getFullYear()} {company.brand}. A weboldal tartalma és felépítése az
                {' '}{company.legalName} tulajdona, minden jog fenntartva.
            </p>
            <nav className="footer-legal" aria-label="Jogi információk">
                {Object.values(legalLinks).map(link => (
                    <a key={link.href} href={link.href}>{link.label}</a>
                ))}
                <button type="button" onClick={openCookieSettings}>Süti beállítások</button>
            </nav>
        </div>
    )
}

export default function Footer({ onSelectService }){

    return(
        <footer className="footer">
            <div className="footer-main">
                <div className="footer-inner footer-company-row">
                    <div className="footer-column footer-brand">
                        <img src={logo} alt={company.brand} className="footer-logo" width="120" height="59" loading="lazy" />
                        <dl className="footer-company">
                            <dt>Cégnév</dt><dd>{company.legalName}</dd>
                            <dt>Székhely</dt><dd>{company.seat}</dd>
                            <dt>Adószám</dt><dd>{company.taxNumber}</dd>
                            <dt>Cégjegyzékszám</dt><dd>{company.registrationNumber}</dd>
                            <dt>Cégbíróság</dt><dd>{company.registryCourt}</dd>
                        </dl>
                        <a href={company.linkedin} className="footer-social" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon />
                            <span>Kövessen minket a LinkedInen</span>
                        </a>
                    </div>

                    <address className="footer-column footer-contact">
                        <h2 className="footer-title">Kapcsolat</h2>
                        <ul className="footer-list">
                            <li className="footer-contact-item">
                                <MapPin size={20} strokeWidth={1.75} aria-hidden="true" />
                                <span>{company.address}</span>
                            </li>
                            <li className="footer-contact-item">
                                <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
                                <a href={telHref(company.phone)} className="footer-link">{company.phone}</a>
                            </li>
                            <li className="footer-contact-item">
                                <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
                                <a href={`mailto:${company.email}`} className="footer-link">{company.email}</a>
                            </li>
                            <li className="footer-contact-item">
                                <Clock size={20} strokeWidth={1.75} aria-hidden="true" />
                                <dl className="footer-hours">
                                    {company.openingHours.map(({ days, hours }) => (
                                        <div key={days}><dt>{days}</dt><dd>{hours}</dd></div>
                                    ))}
                                </dl>
                            </li>
                        </ul>
                        <a href="#contact" className="footer-cta" onClick={e => scrollToSection(e, 'contact')}>
                            Árajánlatkérés
                        </a>
                    </address>

                    <div className="footer-column footer-map-column">
                        <FooterMap />
                    </div>
                </div>

                <div className="footer-inner footer-links-row">
                    <nav className="footer-column" aria-labelledby="footer-links-title">
                        <h2 id="footer-links-title" className="footer-title">Hasznos linkek</h2>
                        <ul className="footer-list">
                            {sections.map(link => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`} className="footer-link" onClick={e => scrollToSection(e, link.id)}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav className="footer-column" aria-labelledby="footer-services-title">
                        <h2 id="footer-services-title" className="footer-title">Szolgáltatásaink</h2>
                        <ul className="footer-list">
                            {services.map(service => (
                                <li key={service.title}>
                                    <a
                                        href="#contact"
                                        className="footer-link"
                                        onClick={e => {
                                            e.preventDefault()
                                            onSelectService(service.title)
                                        }}
                                    >
                                        {service.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav className="footer-column" aria-labelledby="footer-industries-title">
                        <h2 id="footer-industries-title" className="footer-title">Kiszolgált iparágak</h2>
                        <ul className="footer-list">
                            {industries.map(industry => (
                                <li key={industry.name}>
                                    <a href="#industries" className="footer-link" onClick={e => scrollToSection(e, 'industries')}>
                                        {industry.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <FooterBar />
        </footer>
    )
}
