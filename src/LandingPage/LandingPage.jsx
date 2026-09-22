import { useRef } from "react"

import TopLand from "./TopLand/TopLand"
import Partners from "./Partners/Partners"
import AboutCompany from "./AboutCompany/AboutCompany"
import UsCards from "./UsCards/UsCards"
import Manufacturing from "./Manufacturing/Manufacturing"
import Industries from "./Industries/Industries"
import Contact from "./Contact/Contact"
import Footer from "./Footer/Footer"
import useSectionScroll from "./useSectionScroll"

export default function LandingPage(){
    useSectionScroll()
    const contactRef = useRef(null)
    const selectService = name => contactRef.current.selectService(name)

    return(
        <>
            <div className="snap-section" id="home">
                <TopLand />
            </div>
            <div className="snap-section about-band" id="about">
                <AboutCompany />
                <Partners />
            </div>
            <div className="snap-section" id="why-us">
                <UsCards />
            </div>
            <div className="snap-section" id="services">
                <Manufacturing onSelectService={selectService} />
            </div>
            <div className="snap-section" id="industries">
                <Industries />
            </div>
            <div className="snap-section" id="contact">
                <Contact ref={contactRef} />
            </div>
            <Footer onSelectService={selectService} />
        </>
    )
}
