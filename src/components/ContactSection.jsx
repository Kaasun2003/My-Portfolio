import { useState } from 'react'
import { Download, Mail, Send } from 'lucide-react'
import { profile } from '../data/siteData'
import Section from './Section'
import SocialLinks from './SocialLinks'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate({ name, email, message }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).'
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address, like name@example.com.'
  if (message.trim().length < 10) errors.message = 'Write a message of at least 10 characters.'
  return errors
}

export default function ContactSection({ reducedMotion }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', text: '' })

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus({ state: 'error', text: 'Fix the highlighted fields and try again.' })
      return
    }

    if (!ENDPOINT) {
      setStatus({
        state: 'error',
        text: 'Your message was not sent. This form is not connected to a sending service yet (see README, "Contact form"). Please email directly instead.',
      })
      return
    }

    setStatus({ state: 'sending', text: 'Sending your message…' })
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      setValues({ name: '', email: '', message: '' })
      setStatus({ state: 'success', text: 'Message sent. Thank you, I will reply as soon as I can.' })
    } catch {
      setStatus({ state: 'error', text: 'Your message could not be sent. Check your connection and try again.' })
    }
  }

  const err = (field) => (errors[field] ? { 'aria-invalid': true, 'aria-describedby': `${field}-error` } : {})

  return (
    <Section id="contact" title="Get in touch" lead="Open to internships, collaboration and conversations about networking and security." reducedMotion={reducedMotion}>
      <div className="contact">
        <div className="contact__info">
          <p className="contact__mail">
            <Mail size={18} aria-hidden="true" />
            {profile.email.startsWith('[') ? (
              <span className="ph" title="Placeholder: replace in src/data/siteData.js">
                {profile.email.slice(1, -1)}
              </span>
            ) : (
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            )}
          </p>
          <SocialLinks />
          <a className="btn btn--ghost" href={profile.cv} download="Kasun Sampath Weerasinghe CV.pdf">
            <Download size={18} aria-hidden="true" /> Download CV
          </a>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={onChange} {...err('name')} />
            {errors.name && <p className="field__error" id="name-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} {...err('email')} />
            {errors.email && <p className="field__error" id="email-error">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} value={values.message} onChange={onChange} {...err('message')} />
            {errors.message && <p className="field__error" id="message-error">{errors.message}</p>}
          </div>

          <button className="btn btn--primary" type="submit" disabled={status.state === 'sending'}>
            <Send size={18} aria-hidden="true" /> {status.state === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <p className={`form__status form__status--${status.state}`} role={status.state === 'error' ? 'alert' : 'status'} aria-live="polite">
            {status.text}
          </p>
        </form>
      </div>
    </Section>
  )
}
