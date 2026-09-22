import './TopLand.css'

import { sections, scrollToSection } from '../sections'

export default function TopLand(){

    return(
        <div className="hero">
            <div className="hero-inner">
                <div className="top-row">
                    <h1 className="logo">Logó</h1>
                    <ul className="menu-buttons">
                        {sections.map(({ label, id }, i) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={i === sections.length - 1 ? 'cta' : undefined}
                                    onClick={e => scrollToSection(e, id)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hero-text">
                    <p className="eyebrow">Üdvözöljük az AB Elements-nél</p>
                    <h2 className="hero-title">Gyors és precíz <br /> megoldás minden <br /> gyártási igényre</h2>
                </div>
            </div>
        </div>
    )
}
