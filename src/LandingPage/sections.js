export const sections = [
    { label: 'Kezdőlap', id: 'home' },
    { label: 'Rólunk', id: 'about' },
    { label: 'Miért minket', id: 'why-us' },
    { label: 'Szolgáltatások', id: 'services' },
    { label: 'Kiszolgált iparágak', id: 'industries' },
    { label: 'Kapcsolat', id: 'contact' },
]

export const scrollToSection = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
