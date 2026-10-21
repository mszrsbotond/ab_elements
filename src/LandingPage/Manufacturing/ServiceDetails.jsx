import { useEffect, useRef } from 'react'

// "Label: text" -> bold label, plain text
function Use({ text }){
    const i = text.indexOf(': ')
    if (i === -1) return <li>{text}</li>
    return <li><strong>{text.slice(0, i)}:</strong> {text.slice(i + 1)}</li>
}

function Machine({ machine }){
    return(
        <section className="service-machine">
            {machine.image && (
                <div className="service-machine-media">
                    <img {...machine.image} alt={machine.name} className="service-machine-img" loading="lazy" decoding="async" />
                </div>
            )}
            <h4 className="service-machine-name">{machine.name}</h4>
            <p className="service-machine-summary">{machine.summary}</p>
            <span className="service-machine-label">Milyen munkákhoz használható</span>
            <ul className="service-machine-uses">
                {machine.uses.map(use => <Use key={use} text={use} />)}
            </ul>
        </section>
    )
}

export default function ServiceDetails({ service, onClose, onRequestQuote }){
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (service && !dialog.open) dialog.showModal()
        if (!service && dialog.open) dialog.close()
    }, [service])

    const details = service?.details

    return(
        <dialog
            ref={dialogRef}
            className="service-dialog"
            aria-labelledby="service-dialog-title"
            onClose={onClose}
            // a click on the backdrop lands on the dialog element itself
            onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
            {details && (
                <div className="service-dialog-body">
                    <header className="service-dialog-header">
                        <span className="service-dialog-eyebrow">{service.title}</span>
                        <h3 id="service-dialog-title" className="service-dialog-title">{details.title}</h3>
                        <button type="button" className="service-dialog-close" aria-label="Bezárás" onClick={onClose}>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                        </button>
                    </header>
                    <div className="service-dialog-machines">
                        {details.machines.map(machine => <Machine key={machine.name} machine={machine} />)}
                    </div>
                    <footer className="service-dialog-footer">
                        <button
                            type="button"
                            className="service-dialog-cta"
                            onClick={() => {
                                // close first: closing hands focus back to the card, which would cut the scroll short
                                dialogRef.current.close()
                                onRequestQuote(service.title)
                            }}
                        >
                            Árajánlatot kérek
                        </button>
                    </footer>
                </div>
            )}
        </dialog>
    )
}
