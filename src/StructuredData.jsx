import { company, isPlaceholder } from './company'

// schema.org data for search results (name, address, phone, opening hours). It stays out
// of the page until company.js holds real values: placeholder data is worse than none.
export default function StructuredData(){
    const fields = [company.address, company.phone, company.email, company.siteUrl]
    if (fields.some(isPlaceholder)) return null

    const data = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: company.legalName,
        url: company.siteUrl,
        telephone: company.phone,
        email: company.email,
        address: company.address,
        vatID: isPlaceholder(company.taxNumber) ? undefined : company.taxNumber,
        sameAs: isPlaceholder(company.linkedin) ? undefined : [company.linkedin],
    }

    return <script type="application/ld+json">{JSON.stringify(data)}</script>
}
