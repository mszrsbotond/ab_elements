import { useEffect, useId, useRef, useState } from 'react'

import { Check, ChevronDown } from 'lucide-react'

export default function ServiceSelect({ options, value, onChange, onBlur, placeholder, invalid, describedBy }){
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const rootRef = useRef(null)
    const listRef = useRef(null)
    const id = useId()

    const selectedIndex = options.indexOf(value)

    const openList = () => {
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
        setOpen(true)
    }

    const choose = (index) => {
        onChange(options[index])
        setOpen(false)
    }

    useEffect(() => {
        if (!open) return
        const onPointerDown = (e) => {
            if (!rootRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('pointerdown', onPointerDown)
        return () => document.removeEventListener('pointerdown', onPointerDown)
    }, [open])

    useEffect(() => {
        if (!open || activeIndex < 0) return
        listRef.current.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
    }, [open, activeIndex])

    const onKeyDown = (e) => {
        if (!open){
            if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)){
                e.preventDefault()
                openList()
            }
            return
        }
        switch (e.key){
            case 'ArrowDown':
                e.preventDefault()
                setActiveIndex(i => Math.min(options.length - 1, i + 1))
                break
            case 'ArrowUp':
                e.preventDefault()
                setActiveIndex(i => Math.max(0, i - 1))
                break
            case 'Home':
                e.preventDefault()
                setActiveIndex(0)
                break
            case 'End':
                e.preventDefault()
                setActiveIndex(options.length - 1)
                break
            case 'Enter':
            case ' ':
                e.preventDefault()
                choose(activeIndex)
                break
            case 'Escape':
                e.preventDefault()
                setOpen(false)
                break
            case 'Tab':
                setOpen(false)
                break
        }
    }

    return(
        <div ref={rootRef} className={`service-select${open ? ' is-open' : ''}`}>
            <button
                type="button"
                role="combobox"
                className={`contact-field service-select-trigger${value ? '' : ' is-placeholder'}${invalid ? ' is-invalid' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={`${id}-list`}
                aria-activedescendant={open && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                aria-label={placeholder}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={onKeyDown}
                onBlur={() => { setOpen(false); onBlur?.() }}
            >
                <span>{value || placeholder}</span>
                <ChevronDown className="service-select-chevron" size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>

            {open && (
                <ul
                    ref={listRef}
                    id={`${id}-list`}
                    role="listbox"
                    className="service-select-list"
                    // keep focus on the trigger so its blur doesn't close the list before the click lands
                    onMouseDown={e => e.preventDefault()}
                >
                    {options.map((option, i) => (
                        <li
                            key={option}
                            id={`${id}-opt-${i}`}
                            role="option"
                            aria-selected={option === value}
                            className={`service-select-option${i === activeIndex ? ' is-active' : ''}`}
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => choose(i)}
                        >
                            <span>{option}</span>
                            {option === value && <Check size={18} strokeWidth={2} aria-hidden="true" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
