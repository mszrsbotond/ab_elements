import './Partners.css'

import audi from '../../assets/audi-new-logo.svg'
import bmw from '../../assets/bmw-7.svg'
import bosch from '../../assets/bosch-logo-simple.svg'
import ferrari from '../../assets/ferrari-ges.svg'
import maersk from '../../assets/maersk-group-logo.svg'
import mercedes from '../../assets/mercedes-benz-9.svg'
import nasa from '../../assets/nasa-6.svg'
import siemens from '../../assets/siemens.svg'
import spacex from '../../assets/spacex.svg'

const logos = [
    { src: audi, alt: 'Audi' },
    { src: bmw, alt: 'BMW' },
    { src: bosch, alt: 'Bosch' },
    { src: ferrari, alt: 'Ferrari' },
    { src: maersk, alt: 'Maersk' },
    { src: mercedes, alt: 'Mercedes-Benz' },
    { src: nasa, alt: 'NASA' },
    { src: siemens, alt: 'Siemens' },
    { src: spacex, alt: 'SpaceX' },
]

export default function Partners(){

    return(
        <section className="partners">
            <h2 className="partners-title">Partnereink</h2>
            <p className="partners-subtitle">Országszerte a legnagyobb vállalatokkal dolgozunk együtt</p>
            <div className="partners-marquee">
                <div className="partners-track partners-track--gray">
                    {logos.map((logo, i) => (
                        <span key={`a-${i}`} className="logo-wrap">
                            <img src={logo.src} alt={logo.alt} className="logo" loading="lazy" decoding="async" />
                        </span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`b-${i}`} className="logo-wrap" aria-hidden="true">
                            <img src={logo.src} alt={logo.alt} className="logo" loading="lazy" decoding="async" />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
