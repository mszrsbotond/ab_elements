import './Partners.css'

import adda from '../../assets/adda.svg'
import claas from '../../assets/claas.svg'
import barcelona from '../../assets/fc_barcelona.svg'
import ferrari from '../../assets/ferrari.svg'
import gorter from '../../assets/gorter_group.svg'
import invent from '../../assets/invent.svg'
import magnus from '../../assets/magnus.svg'
import mercedes from '../../assets/mercedes.svg'
import mobis from '../../assets/mobis.svg'
import pipistrel from '../../assets/pipistrel.svg'
import redexim from '../../assets/redexim.svg'
import samsung from '../../assets/samsung.svg'
import stalWest from '../../assets/stal-west.svg'
import teConnectivity from '../../assets/te_connectivity.svg'
import volkswagen from '../../assets/wolkswagen.svg'
import bosch from '../../assets/bosch.svg'
import audi from '../../assets/audi.svg'
import bmw from '../../assets/bmw.svg'
import siemens from '../../assets/siemens.svg'

// ratio = width / height of each (tightly cropped) svg
const logos = [
    { src: adda, ratio: 2.737, alt: 'ADDA' },
    { src: claas, ratio: 5.683, alt: 'Claas' },
    { src: barcelona, ratio: 0.988, alt: 'FC Barcelona' },
    { src: ferrari, ratio: 0.72, alt: 'Ferrari' },
    { src: gorter, ratio: 2.347, alt: 'Gorter Group' },
    { src: invent, ratio: 2.79, alt: 'Invent Mérnökiroda' },
    { src: magnus, ratio: 2.681, alt: 'Magnus' },
    { src: mercedes, ratio: 1.011, alt: 'Mercedes-Benz' },
    { src: mobis, ratio: 2.898, alt: 'Hyundai Mobis' },
    { src: pipistrel, ratio: 11.237, alt: 'Pipistrel' },
    { src: redexim, ratio: 3.559, alt: 'Redexim' },
    { src: samsung, ratio: 6.493, alt: 'Samsung' },
    { src: stalWest, ratio: 4.649, alt: 'Stal-West' },
    { src: teConnectivity, ratio: 1.904, alt: 'TE Connectivity' },
    { src: volkswagen, ratio: 1, alt: 'Volkswagen' },
    { src: bosch, ratio: 4.474, alt: 'Bosch' },
    { src: audi, ratio: 2.883, alt: 'Audi' },
    { src: bmw, ratio: 1, alt: 'BMW' },
    { src: siemens, ratio: 6.044, alt: 'Siemens' },
]

// scale height by 1/sqrt(ratio) so every logo covers roughly the same area:
// wide wordmarks get shorter, square/tall marks get taller
const logoStyle = (ratio) => ({ '--logo-scale': (1 / Math.sqrt(ratio)).toFixed(3) })

export default function Partners(){

    return(
        <section className="partners">
            <h2 className="partners-title">Partnereink</h2>
            <p className="partners-subtitle">Országszerte a legnagyobb vállalatokkal dolgozunk együtt</p>
            <div className="partners-marquee">
                <div className="partners-track partners-track--gray">
                    {logos.map((logo, i) => (
                        <span key={`a-${i}`} className="logo-wrap">
                            <img src={logo.src} alt={logo.alt} className="logo" style={logoStyle(logo.ratio)} loading="lazy" decoding="async" />
                        </span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`b-${i}`} className="logo-wrap" aria-hidden="true">
                            <img src={logo.src} alt={logo.alt} className="logo" style={logoStyle(logo.ratio)} loading="lazy" decoding="async" />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
