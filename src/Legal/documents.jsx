import { company, telHref } from '../company'
import { legalLinks } from '../legalLinks'
import { openCookieSettings } from '../consent'

// Templates drafted from the site's actual data flows. They name every processor the site
// really uses, but a lawyer should still review them before launch.
const UPDATED = '2026. október 24.'

const CompanyBlock = () => (
    <dl className="legal-data">
        <dt>Cégnév</dt><dd>{company.legalName}</dd>
        <dt>Székhely</dt><dd>{company.seat}</dd>
        <dt>Cégjegyzékszám</dt><dd>{company.registrationNumber}</dd>
        <dt>Nyilvántartó bíróság</dt><dd>{company.registryCourt}</dd>
        <dt>Adószám</dt><dd>{company.taxNumber}</dd>
        <dt>Képviseli</dt><dd>{company.representative}</dd>
        <dt>Telefon</dt><dd><a href={telHref(company.phone)}>{company.phone}</a></dd>
        <dt>E-mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd>
    </dl>
)

export function Privacy(){
    return(
        <>
            <p className="legal-lead">
                Jelen tájékoztató bemutatja, hogyan kezeli az {company.legalName} (a továbbiakban: Adatkezelő)
                a weboldalán keresztül megadott személyes adatokat, az Európai Parlament és a Tanács (EU)
                2016/679 rendelete (GDPR) és az információs önrendelkezési jogról és az információszabadságról
                szóló 2011. évi CXII. törvény (Infotv.) alapján.
            </p>

            <h2>1. Az adatkezelő</h2>
            <CompanyBlock />

            <h2>2. Kapcsolatfelvétel és árajánlatkérés</h2>
            <table className="legal-table">
                <tbody>
                    <tr><th scope="row">Kezelt adatok</th><td>név, e-mail cím, választott gyártási szolgáltatás, az üzenet tartalma, a hozzájárulás időpontja</td></tr>
                    <tr><th scope="row">Az adatkezelés célja</th><td>a megkeresés megválaszolása, árajánlat készítése, kapcsolattartás</td></tr>
                    <tr><th scope="row">Jogalap</th><td>az érintett hozzájárulása (GDPR 6. cikk (1) a)), illetve a szerződés megkötését megelőző lépések megtétele az érintett kérésére (GDPR 6. cikk (1) b))</td></tr>
                    <tr><th scope="row">Időtartam</th><td>a megkeresés lezárásától számított [1 év], vagy a hozzájárulás visszavonásáig. Ha a megkeresésből szerződés jön létre, a számviteli bizonylatnak minősülő iratokat a számvitelről szóló 2000. évi C. törvény alapján 8 évig őrizzük.</td></tr>
                </tbody>
            </table>
            <p>
                Az adatok megadása önkéntes, de nélkülük a megkeresést nem tudjuk megválaszolni.
                Kérjük, az üzenetben ne adjon meg a szükségesnél több személyes adatot.
            </p>

            <h2>3. Adatfeldolgozók és címzettek</h2>
            <ul>
                <li>
                    <strong>FormSubmit</strong> (formsubmit.co) – az űrlapon megadott adatokat e-mailben
                    továbbítja az Adatkezelő postafiókjába. A szolgáltató az Európai Gazdasági Térségen kívül
                    is kezelhet adatokat; [a továbbítás garanciáit a szolgáltató feltételei alapján ellenőrizni kell].
                </li>
                <li><strong>Tárhelyszolgáltató</strong> – {company.hosting}</li>
                <li><strong>E-mail szolgáltató</strong> – [az Adatkezelő által használt levelezőrendszer szolgáltatója]</li>
                <li>
                    <strong>Google Ireland Ltd.</strong> (Gordon House, Barrow Street, Dublin 4, Írország) – a
                    láblécben található térképet a Google Maps jeleníti meg, kizárólag az Ön hozzájárulása után.
                </li>
            </ul>
            <p>Személyes adatait harmadik félnek nem adjuk el, és marketing célra nem használjuk.</p>

            <h2>4. Sütik és helyi tárolás</h2>
            <p>
                A weboldal saját sütit nem használ, és nem alkalmaz látogatottságmérő vagy hirdetési
                eszközöket. A böngésző helyi tárolójában (localStorage) egyetlen bejegyzést helyezünk el:
                az Ön sütikkel kapcsolatos döntését, hogy a tájékoztató sávot ne kelljen újra megjelenítenünk.
                Ez a weboldal működéséhez szükséges.
            </p>
            <p>
                Ha engedélyezi a külső tartalmakat, a Google Maps térkép betöltésekor a Google saját sütiket
                helyezhet el. Döntését bármikor módosíthatja a{' '}
                <button type="button" className="legal-inline-btn" onClick={openCookieSettings}>Süti beállítások</button>{' '}
                menüpontban.
            </p>

            <h2>5. Az Ön jogai</h2>
            <p>Az adatkezeléssel kapcsolatban Ön jogosult:</p>
            <ul>
                <li>tájékoztatást kérni és hozzáférni a kezelt adataihoz (GDPR 15. cikk),</li>
                <li>adatai helyesbítését kérni (16. cikk),</li>
                <li>adatai törlését kérni (17. cikk),</li>
                <li>az adatkezelés korlátozását kérni (18. cikk),</li>
                <li>adatait tagolt, géppel olvasható formában megkapni (adathordozhatóság, 20. cikk),</li>
                <li>tiltakozni az adatkezelés ellen (21. cikk),</li>
                <li>hozzájárulását bármikor visszavonni, ami nem érinti a visszavonás előtti adatkezelés jogszerűségét (7. cikk (3)).</li>
            </ul>
            <p>
                Kérelmét a <a href={`mailto:${company.email}`}>{company.email}</a> címre küldheti el; azt legkésőbb
                egy hónapon belül megválaszoljuk.
            </p>

            <h2>6. Jogorvoslat</h2>
            <p>
                Ha úgy véli, hogy adatai kezelése sérti a jogszabályokat, panaszt tehet a Nemzeti
                Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.;
                postacím: 1363 Budapest, Pf. 9.; telefon: +36 1 391 1400; e-mail: ugyfelszolgalat@naih.hu;
                {' '}<a href="https://naih.hu" target="_blank" rel="noopener noreferrer">naih.hu</a>), vagy
                bírósághoz fordulhat. A pert lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is
                megindíthatja.
            </p>

            <h2>7. Adatbiztonság</h2>
            <p>
                A weboldal titkosított (HTTPS) kapcsolaton keresztül érhető el. A beérkezett megkeresésekhez
                csak azok a munkatársaink férnek hozzá, akiknek az ügyintézéshez erre szükségük van.
            </p>

            <p className="legal-updated">Hatályos: {UPDATED}</p>
        </>
    )
}

export function Imprint(){
    return(
        <>
            <p className="legal-lead">
                Az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő
                szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény 4. §-a szerinti adatok.
            </p>

            <h2>Üzemeltető</h2>
            <CompanyBlock />

            <h2>Tárhelyszolgáltató</h2>
            <p>{company.hosting}</p>

            <h2>Szerzői jog</h2>
            <p>
                A weboldal tartalma (szövegek, fotók, grafikai elemek, logó) az {company.legalName} vagy a
                jogosult harmadik felek szellemi tulajdona. Felhasználásuk kizárólag előzetes írásbeli
                engedéllyel lehetséges. A partnerlogók a megnevezett cégek védjegyei.
            </p>

            <p className="legal-updated">Utolsó frissítés: {UPDATED}</p>
        </>
    )
}

export function Terms(){
    return(
        <>
            <p className="legal-lead">
                Jelen Általános Szerződési Feltételek (ÁSZF) az {company.legalName} (a továbbiakban: Gyártó)
                és megrendelői (a továbbiakban: Megrendelő) között létrejövő bérgyártási és megmunkálási
                szerződésekre vonatkoznak, amennyiben a felek egyedi szerződése másként nem rendelkezik.
            </p>

            <h2>1. A Gyártó adatai</h2>
            <CompanyBlock />

            <h2>2. Ajánlatkérés</h2>
            <p>
                A weboldalon keresztül küldött megkeresés ajánlatkérésnek minősül, szerződést nem hoz létre.
                A Gyártó a megkapott műszaki dokumentáció (rajz, 3D modell, darabszám, anyagminőség, tűrések,
                felületkezelési igény) alapján írásos árajánlatot ad.
            </p>

            <h2>3. Árajánlat és megrendelés</h2>
            <ul>
                <li>Az árajánlat a kiállításától számított [30 napig] érvényes.</li>
                <li>A szerződés a Megrendelő írásos megrendelésével és annak a Gyártó általi írásos visszaigazolásával jön létre.</li>
                <li>Az árak nettó árak, az általános forgalmi adót a hatályos jogszabályok szerint kell felszámítani.</li>
                <li>A megrendelés visszaigazolását követő műszaki változtatások az árat és a határidőt módosíthatják.</li>
            </ul>

            <h2>4. Teljesítés és szállítás</h2>
            <p>
                A teljesítési határidőt a visszaigazolás tartalmazza. A teljesítés helye [a Gyártó telephelye],
                eltérő megállapodás hiányában. [Szállítási paritás, csomagolás, kárveszély átszállása.]
            </p>

            <h2>5. Minőség és reklamáció</h2>
            <p>
                A Gyártó a termékeket a Megrendelő által jóváhagyott dokumentáció szerint gyártja. A Megrendelő
                az átvételkor köteles a termékeket mennyiségi és látható minőségi szempontból megvizsgálni, és
                az eltérést [8 munkanapon] belül írásban jelezni.
            </p>

            <h2>6. Fizetési feltételek</h2>
            <p>[Fizetési határidő, előleg, késedelmi kamat.]</p>

            <h2>7. Szellemi tulajdon és titoktartás</h2>
            <p>
                A Megrendelő által átadott rajzok, modellek és műszaki információk a Megrendelő tulajdonában
                maradnak. A Gyártó azokat bizalmasan kezeli, kizárólag a megrendelés teljesítésére használja,
                és harmadik félnek nem adja át.
            </p>

            <h2>8. Felelősség</h2>
            <p>[A felelősség korlátozása, vis maior.]</p>

            <h2>9. Záró rendelkezések</h2>
            <p>
                A jelen ÁSZF-ben nem szabályozott kérdésekben a Polgári Törvénykönyvről szóló 2013. évi V. törvény
                rendelkezései az irányadók. A személyes adatok kezeléséről
                az <a href={legalLinks.privacy.href}>{legalLinks.privacy.label.toLowerCase()}</a> rendelkezik.
            </p>

            <p className="legal-updated">Hatályos: {UPDATED}</p>
        </>
    )
}
