// Every public company detail lives here: the footer, the legal pages and the structured
// data all read from this one object. Values in [square brackets] are placeholders that
// still need the real data before launch.
export const company = {
    brand: 'AB Elements',
    legalName: 'AB Elements Kft.',
    seat: '[irányítószám, település, utca, házszám]',
    // the plant, if it differs from the registered seat
    address: '[irányítószám, település, utca, házszám]',
    taxNumber: '[12345678-1-12]',
    registrationNumber: '[01-09-123456]',
    registryCourt: '[Fővárosi Törvényszék Cégbírósága]',
    representative: '[ügyvezető neve]',
    phone: '[+36 30 123 4567]',
    email: '[info@abelements.hu]',
    linkedin: '[https://www.linkedin.com/company/ab-elements]',
    siteUrl: '[https://www.abelements.hu]',
    hosting: '[tárhelyszolgáltató neve, címe, e-mail címe]',
    openingHours: [
        { days: 'Hétfő – Péntek', hours: '[7:00 – 16:00]' },
        { days: 'Szombat – Vasárnap', hours: 'Zárva' },
    ],
    // FormSubmit forwards the contact form to this inbox
    formEndpoint: 'https://formsubmit.co/ajax/botond00723@gmail.com',
}

export const isPlaceholder = value => typeof value === 'string' && value.startsWith('[')

export const telHref = phone => `tel:${phone.replace(/[^\d+]/g, '')}`

export const mapsQuery = encodeURIComponent(`${company.legalName}, ${company.address}`)

if (import.meta.env.DEV){
    const missing = Object.entries(company).filter(([, v]) => isPlaceholder(v)).map(([k]) => k)
    if (missing.length) console.warn(`company.js: placeholder values still need real data: ${missing.join(', ')}`)
}
