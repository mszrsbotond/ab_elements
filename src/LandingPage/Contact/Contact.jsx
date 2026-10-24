import { useImperativeHandle, useRef, useState } from 'react'

import { AlertCircle, Check, CircleCheck, LoaderCircle } from 'lucide-react'

import './Contact.css'

import ServiceSelect from './ServiceSelect'
import { services } from '../services'
import { company, isPlaceholder } from '../../company'
import { legalLinks } from '../../legalLinks'

const serviceNames = services.map(service => service.title)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i

const validators = {
    name: v => v.trim() ? '' : 'Kérjük, adja meg a nevét.',
    email: v => {
        if (!v.trim()) return 'Kérjük, adja meg az e-mail címét.'
        return EMAIL_PATTERN.test(v.trim()) ? '' : 'Kérjük, érvényes e-mail címet adjon meg (pl. nev@ceg.hu).'
    },
    service: v => v ? '' : 'Kérjük, válasszon gyártási szolgáltatást.',
    message: v => v.trim() ? '' : 'Kérjük, írja meg üzenetét.',
    privacy: v => v ? '' : 'Az üzenet elküldéséhez kérjük, fogadja el az adatkezelési tájékoztatót.',
}

const emptyForm = { name: '', email: '', service: '', message: '', privacy: false }

export default function Contact({ ref }){
    const [values, setValues] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    // 'idle' | 'sending' | 'success' | 'error'
    const [status, setStatus] = useState('idle')
    const sectionRef = useRef(null)
    const formRef = useRef(null)
    const successRef = useRef(null)

    useImperativeHandle(ref, () => ({
        selectService(name){
            setStatus(prev => (prev === 'success' ? 'idle' : prev))
            setValues(prev => ({ ...prev, service: name }))
            setErrors(prev => ({ ...prev, service: '' }))
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

            const firstEmpty = ['name', 'email', 'message'].find(field => !values[field].trim()) ?? 'message'
            formRef.current?.querySelector(`[data-field="${firstEmpty}"]`)?.focus({ preventScroll: true })
        },
    }), [values, setStatus])

    const validateField = (field, value) => {
        setErrors(prev => ({ ...prev, [field]: validators[field](value) }))
    }

    const setField = (field, value) => {
        setValues(prev => ({ ...prev, [field]: value }))
        // once a field has shown an error, re-check as the user fixes it
        if (errors[field]) validateField(field, value)
        if (status === 'error') setStatus('idle')
    }

    const fieldProps = (field, extraClass = '') => ({
        name: field,
        value: values[field],
        onChange: e => setField(field, e.target.value),
        onBlur: e => { if (e.target.value) validateField(field, e.target.value) },
        'aria-required': true,
        'aria-invalid': errors[field] ? true : undefined,
        'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
        className: `contact-field ${extraClass}${errors[field] ? ' is-invalid' : ''}`,
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (status === 'sending') return

        const nextErrors = Object.fromEntries(
            Object.keys(validators).map(field => [field, validators[field](values[field])])
        )
        setErrors(nextErrors)

        const firstInvalid = Object.keys(nextErrors).find(field => nextErrors[field])
        if (firstInvalid){
            e.currentTarget
                .querySelector(`[data-field="${firstInvalid}"], [data-field-wrapper="${firstInvalid}"] [role="combobox"]`)
                ?.focus()
            return
        }

        const data = new FormData(e.currentTarget)
        data.set('privacy', `Elfogadva: ${new Date().toLocaleString('hu-HU')}`)

        setStatus('sending')
        try {
            const res = await fetch(company.formEndpoint, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: data,
            })
            const body = await res.json().catch(() => ({}))
            // FormSubmit answers 200 with success "false" too, e.g. before the inbox is activated
            if (!res.ok || String(body.success) !== 'true') throw new Error(body.message || res.statusText)

            setValues(emptyForm)
            setErrors({})
            setStatus('success')
            requestAnimationFrame(() => successRef.current?.focus())
        } catch {
            setStatus('error')
        }
    }

    const errorFor = (field) => errors[field] && (
        <p id={`contact-${field}-error`} className="contact-error" role="alert">{errors[field]}</p>
    )

    const sending = status === 'sending'

    return(
        <section className="contact" id="contact" ref={sectionRef}>
            <div className="contact-inner">
                <div className="contact-text">
                    <p className="contact-eyebrow">Lépjen velünk kapcsolatba</p>
                    <h2 className="contact-title">Készen áll elindítani projektjét?</h2>
                    <p className="contact-lead">
                        További információért gyártási szolgáltatásainkról, vagy ha árajánlatot
                        szeretne kérni a legközelebbi AB Element üzemtől, keressen minket most.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="contact-form contact-success" role="status" tabIndex={-1} ref={successRef}>
                        <CircleCheck className="contact-success-icon" size={56} strokeWidth={1.5} aria-hidden="true" />
                        <h3 className="contact-form-title">Köszönjük üzenetét!</h3>
                        <p className="contact-success-text">
                            Megkaptuk megkeresését, kollégánk hamarosan felveszi Önnel a kapcsolatot
                            a megadott e-mail címen.
                        </p>
                        <button type="button" className="contact-submit" onClick={() => setStatus('idle')}>
                            Új üzenet küldése
                        </button>
                    </div>
                ) : (
                    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate aria-busy={sending}>
                        <h3 className="contact-form-title">Lépjen velünk kapcsolatba</h3>
                        <p className="contact-required-note"><span aria-hidden="true">*</span> A csillaggal jelölt mezők kitöltése kötelező.</p>

                        <input type="hidden" name="_subject" value="Új árajánlatkérés az AB Elements weboldalról" />
                        <input type="hidden" name="_template" value="table" />
                        {/* honeypot: hidden from people, bots fill it and FormSubmit drops the message */}
                        <input type="text" name="_honey" className="contact-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                        <div className="contact-group">
                            <input {...fieldProps('name')} data-field="name" type="text" placeholder="Az Ön neve *" aria-label="Az Ön neve" autoComplete="name" />
                            {errorFor('name')}
                        </div>

                        <div className="contact-group">
                            <input {...fieldProps('email')} data-field="email" type="email" inputMode="email" placeholder="E-mail címe *" aria-label="E-mail címe" autoComplete="email" />
                            {errorFor('email')}
                        </div>

                        <div className="contact-group" data-field-wrapper="service">
                            <ServiceSelect
                                options={serviceNames}
                                value={values.service}
                                onChange={v => { setField('service', v); validateField('service', v) }}
                                placeholder="Gyártási szolgáltatás *"
                                label="Gyártási szolgáltatás"
                                invalid={Boolean(errors.service)}
                                describedBy={errors.service ? 'contact-service-error' : undefined}
                            />
                            <input type="hidden" name="service" value={values.service} />
                            {errorFor('service')}
                        </div>

                        <div className="contact-group">
                            <textarea {...fieldProps('message', 'contact-textarea')} data-field="message" placeholder="Üzenet *" aria-label="Üzenet" rows={4} />
                            {errorFor('message')}
                        </div>

                        <div className="contact-group">
                            <label className={`contact-consent${errors.privacy ? ' is-invalid' : ''}`}>
                                <input
                                    type="checkbox"
                                    name="privacy"
                                    data-field="privacy"
                                    className="contact-consent-input"
                                    checked={values.privacy}
                                    onChange={e => { setField('privacy', e.target.checked); validateField('privacy', e.target.checked) }}
                                    aria-required="true"
                                    aria-invalid={errors.privacy ? true : undefined}
                                    aria-describedby={errors.privacy ? 'contact-privacy-error' : undefined}
                                />
                                <span className="contact-consent-box" aria-hidden="true">
                                    <Check size={14} strokeWidth={3} />
                                </span>
                                <span className="contact-consent-text">
                                    Elolvastam és elfogadom az{' '}
                                    <a href={legalLinks.privacy.href} target="_blank" rel="noopener">adatkezelési tájékoztatót</a>,
                                    és hozzájárulok, hogy az AB Elements a megadott adataimat a megkeresés
                                    megválaszolása céljából kezelje. <span aria-hidden="true">*</span>
                                </span>
                            </label>
                            {errorFor('privacy')}
                        </div>

                        {status === 'error' && (
                            <div className="contact-alert" role="alert">
                                <AlertCircle size={20} strokeWidth={2} aria-hidden="true" />
                                <p>
                                    Az üzenet küldése nem sikerült. Kérjük, próbálja újra néhány perc múlva
                                    {isPlaceholder(company.email)
                                        ? '.'
                                        : <>, vagy írjon nekünk közvetlenül: <a href={`mailto:${company.email}`}>{company.email}</a>.</>}
                                </p>
                            </div>
                        )}

                        <button type="submit" className="contact-submit" disabled={sending}>
                            {sending && <LoaderCircle className="contact-spinner" size={20} strokeWidth={2.25} aria-hidden="true" />}
                            {sending ? 'Küldés folyamatban…' : 'Küldés'}
                        </button>

                        <p className="contact-note">
                            Az AB Elements számára fontos az Ön adatainak védelme. Minden megadott
                            információt bizalmasan, biztonságosan és kizárólag a megkeresés megválaszolására használunk.
                        </p>
                    </form>
                )}
            </div>
        </section>
    )
}
