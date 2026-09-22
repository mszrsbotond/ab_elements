import './Footer.css'

import { services } from '../services'
import { industries } from '../industries'
import { sections, scrollToSection } from '../sections'

export default function Footer({ onSelectService }){

    return(
        <footer className="footer">
            <div className="footer-copyright">
                <p>
                    © {new Date().getFullYear()} AB Elements. A weboldal tartalma és felépítése az
                    AB Elements Kft. tulajdona, minden jog fenntartva.
                </p>
            </div>

            <div className="footer-main">
                <div className="footer-inner">
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

                    <div className="footer-column">
                        <h2 className="footer-title">Kapcsolat</h2>
                        <ul className="footer-list">
                            <li>
                                <a href="#contact" className="footer-link" onClick={e => scrollToSection(e, 'contact')}>
                                    Árajánlatkérés
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
