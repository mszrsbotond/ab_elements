import './UsCards.css'

import { Drill, HeartHandshake, ShieldCheck, RefreshCcw, Target } from 'lucide-react'

const cards = [
    { icon: Drill, label: 'Korszerű CNC gépek' },
    { icon: HeartHandshake, label: 'Szűk tűréshatárú megmunkálás' },
    { icon: ShieldCheck, label: 'Megbízható átfutási idők' },
    { icon: RefreshCcw, label: 'Pontos folyamatok' },
    { icon: Target, label: 'Célorientált megközelítés' },
]

export default function UsCards(){

    return(
        <section className="us-cards-section">
            <div className="us-cards-inner">
                <div className="us-cards-text">
                    <p className="us-cards-eyebrow">Pontosságra, <br /> tapasztalatra és <br /> bizalomra építve</p>
                    <h2 className="us-cards-title">Pontosságra, <br /> tapasztalatra és <br /> bizalomra építve</h2>
                </div>
                <div className="us-cards">
                    {cards.map(({ icon: Icon, label }, i) => (
                        <div className="us-card" key={i}>
                            <Icon className="us-card-icon" strokeWidth={1.5} />
                            <span className="us-card-label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
