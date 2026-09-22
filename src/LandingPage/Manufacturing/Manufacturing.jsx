import './Manufacturing.css'

import { services } from '../services'

export default function Manufacturing({ onSelectService }){

    return(
        <section className="manufacturing">
            <div className="manufacturing-inner">
                <h2 className="manufacturing-title">Gyártási szolgáltatásaink</h2>
                <div className="manufacturing-grid">
                    {services.map((service, i) => (
                        <a
                            className="service-card"
                            key={service.title}
                            href="#contact"
                            aria-label={`${service.title} – árajánlatkérés`}
                            onClick={e => {
                                e.preventDefault()
                                onSelectService(service.title)
                            }}
                        >
                            <div className="service-content">
                                <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-text">{service.text}</p>
                            </div>
                            <img {...service.image} alt="" className="service-img" loading="lazy" decoding="async" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
