import { useEffect, useState } from 'react'

import { Menu, X } from 'lucide-react'

import './TopLand.css'

import { sections, scrollToSection } from '../sections'

import logo from '../../assets/ABElementsMark.svg'

export default function TopLand(){
    // only ever visible on phones, where the link row collapses behind the toggle
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        if (!menuOpen) return
        const onKeyDown = e => { if (e.key === 'Escape') setMenuOpen(false) }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [menuOpen])

    return(
        <div className="hero">
            <div className="hero-inner">
                <div className="top-row">
                    <h1 className="logo">
                        <img src={logo} alt="AB Elements" className="logo-img" />
                    </h1>
                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
                        aria-expanded={menuOpen}
                        aria-controls="main-menu"
                        onClick={() => setMenuOpen(open => !open)}
                    >
                        {menuOpen
                            ? <X size={28} strokeWidth={2} aria-hidden="true" />
                            : <Menu size={28} strokeWidth={2} aria-hidden="true" />}
                    </button>
                    <ul className="menu-buttons" id="main-menu" data-open={menuOpen}>
                        {sections.map(({ label, id }, i) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={i === sections.length - 1 ? 'cta' : undefined}
                                    onClick={e => {
                                        scrollToSection(e, id)
                                        setMenuOpen(false)
                                    }}
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
                    <a href="#contact" className="hero-cta" onClick={e => scrollToSection(e, 'contact')}>Kapcsolat</a>
                </div>
            </div>
        </div>
    )
}
