import { useImperativeHandle, useRef, useState } from 'react'

import './Contact.css'

import ServiceSelect from './ServiceSelect'
import { services } from '../services'

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
}

const emptyForm = { name: '', email: '', service: '', message: '' }

export default function Contact({ ref }){
    const [values, setValues] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const sectionRef = useRef(null)
    const formRef = useRef(null)

    useImperativeHandle(ref, () => ({
        selectService(name){
            setValues(prev => ({ ...prev, service: name }))
            setErrors(prev => ({ ...prev, service: '' }))
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

            const firstEmpty = ['name', 'email', 'message'].find(field => !values[field].trim()) ?? 'message'
            formRef.current.querySelector(`[data-field="${firstEmpty}"]`).focus({ preventScroll: true })
        },
    }), [values])

    const validateField = (field, value) => {
        setErrors(prev => ({ ...prev, [field]: validators[field](value) }))
    }

    const setField = (field, value) => {
        setValues(prev => ({ ...prev, [field]: value }))
        // once a field has shown an error, re-check as the user fixes it
        if (errors[field]) validateField(field, value)
    }

    const fieldProps = (field, extraClass = '') => ({
        name: field,
        value: values[field],
        onChange: e => setField(field, e.target.value),
        onBlur: e => { if (e.target.value) validateField(field, e.target.value) },
        'aria-invalid': errors[field] ? true : undefined,
        'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
        className: `contact-field ${extraClass}${errors[field] ? ' is-invalid' : ''}`,
    })

    const onSubmit = (e) => {
        e.preventDefault()
        const nextErrors = Object.fromEntries(
            Object.keys(validators).map(field => [field, validators[field](values[field])])
        )
        setErrors(nextErrors)

        const firstInvalid = Object.keys(nextErrors).find(field => nextErrors[field])
        if (firstInvalid){
            e.currentTarget
                .querySelector(`[data-field="${firstInvalid}"], [data-field-wrapper="${firstInvalid}"] [role="combobox"]`)
                ?.focus()
        }
    }

    const errorFor = (field) => errors[field] && (
        <p id={`contact-${field}-error`} className="contact-error" role="alert">{errors[field]}</p>
    )

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

                <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
                    <h3 className="contact-form-title">Lépjen velünk kapcsolatba</h3>

                    <div className="contact-group">
                        <input {...fieldProps('name')} data-field="name" type="text" placeholder="Az Ön neve" aria-label="Az Ön neve" autoComplete="name" />
                        {errorFor('name')}
                    </div>

                    <div className="contact-group">
                        <input {...fieldProps('email')} data-field="email" type="email" inputMode="email" placeholder="E-mail címe" aria-label="E-mail címe" autoComplete="email" />
                        {errorFor('email')}
                    </div>

                    <div className="contact-group" data-field-wrapper="service">
                        <ServiceSelect
                            options={serviceNames}
                            value={values.service}
                            onChange={v => { setField('service', v); validateField('service', v) }}
                            placeholder="Gyártási Szolgáltatás"
                            invalid={Boolean(errors.service)}
                            describedBy={errors.service ? 'contact-service-error' : undefined}
                        />
                        <input type="hidden" name="service" value={values.service} />
                        {errorFor('service')}
                    </div>

                    <div className="contact-group">
                        <textarea {...fieldProps('message', 'contact-textarea')} data-field="message" placeholder="Üzenet" aria-label="Üzenet" rows={4} />
                        {errorFor('message')}
                    </div>

                    <button type="submit" className="contact-submit">Küldés</button>

                    <p className="contact-note">
                        *** Az AB Elements számára fontos az Ön adatainak védelme. Minden megadott
                        információt bizalmasan, biztonságosan és kizárólag belső felhasználásra kezelünk. ***
                    </p>
                </form>
            </div>
        </section>
    )
}
