import './AboutCompany.css'

import CountUp from '../CountUp/CountUp'

import { image } from '../../images'

export default function AboutCompany(){

    return(
        <section className="about">
            <div className="about-inner">
                <h2 className="about-title">Cégünkről</h2>
                <div className="about-grid">
                    <div className="about-media-left">
                        <img {...image('about-main')} alt="Autógyártás robotkarral" className="about-img-main" loading="lazy" decoding="async" />
                        <div className="about-badge">
                            <span className="about-badge-label">Alapítva</span>
                            <span className="about-badge-year">2018</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <p className="about-text">
                            2018-es alapítása óta az AB Elements kiemelt hangsúlyt fektet a kiszolgálásra,
                            a minőségre, az árazásra és a határidők pontos betartására. Kezdetben abban
                            voltunk piaci résen, hogy a félvezetőipar rendkívül magas felületminőségi
                            elvárásainak is megfeleltünk.
                        </p>
                        <div className="right-bottom">
                            <div className="about-stats">
                                <div className="stat">
                                    <CountUp className="stat-number" value={5} suffix="+" />
                                    <span className="stat-label">Év tapasztalat</span>
                                </div>
                                <div className="stat">
                                    <CountUp className="stat-number" value={500} suffix="+" />
                                    <span className="stat-label">Sikeres projekt</span>
                                </div>
                            </div>
                            <img {...image('about-secondary')} alt="CNC forgácsológép" className="about-img-secondary" loading="lazy" decoding="async" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
