import { useId, useState } from 'react'
import './Manufacturing.css'

import { services } from '../services'
import ServiceDetails from './ServiceDetails'

// on phones the blurb folds away behind an arrow; on wider screens the arrow is hidden and it all shows
function ServiceCard({ service, number, onSelectService, onShowDetails }){
    const [open, setOpen] = useState(false)
    const bodyId = useId()

    return(
        <article className={`service-card${open ? ' is-open' : ''}`}>
            <div className="service-content">
                <span className="service-number">{number}</span>
                <h3 className="service-title">
                    {/* stretched over the whole card, so the card stays one big link */}
                    <a
                        className="service-link"
                        href="#contact"
                        aria-label={`${service.title} – árajánlatkérés`}
                        onClick={e => {
                            e.preventDefault()
                            onSelectService(service.title)
                        }}
                    >
                        {service.title}
                    </a>
                </h3>
                <button
                    type="button"
                    className="service-toggle"
                    aria-expanded={open}
                    aria-controls={bodyId}
                    aria-label={`${service.title} – leírás`}
                    onClick={() => setOpen(o => !o)}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className="service-body" id={bodyId}>
                    <div className="service-body-inner">
                        <p className="service-text">{service.text}</p>
                        {service.details && (
                            <button
                                type="button"
                                className="service-more"
                                aria-haspopup="dialog"
                                onClick={() => onShowDetails(service)}
                            >
                                Gépeink
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <img {...service.image} alt="" className="service-img" loading="lazy" decoding="async" />
        </article>
    )
}

export default function Manufacturing({ onSelectService }){
    const [openService, setOpenService] = useState(null)

    return(
        <section className="manufacturing">
            <div className="manufacturing-inner">
                <h2 className="manufacturing-title">Gyártási szolgáltatásaink</h2>
                <div className="manufacturing-grid">
                    {services.map((service, i) => (
                        <ServiceCard
                            key={service.title}
                            service={service}
                            number={String(i + 1).padStart(2, '0')}
                            onSelectService={onSelectService}
                            onShowDetails={setOpenService}
                        />
                    ))}
                </div>
            </div>
            <ServiceDetails
                service={openService}
                onClose={() => setOpenService(null)}
                onRequestQuote={onSelectService}
            />
        </section>
    )
}
