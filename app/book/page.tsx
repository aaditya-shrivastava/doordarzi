'use client'

import { useState } from 'react'
import { MobileAppShell } from '@/components/mobile-app-shell'
import { ArrowLeft, ArrowRight, Check, MapPin, Shirt, Sparkles, Scissors } from 'lucide-react'

const options = [
  { id: 'tailoring', icon: Scissors, title: 'Tailoring', copy: 'A new piece, made for you' },
  { id: 'alterations', icon: Shirt, title: 'Alterations', copy: 'Make an existing piece fit' },
  { id: 'care', icon: Sparkles, title: 'Garment care', copy: 'Clean, press or restore' },
]

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [details, setDetails] = useState('')
  const [booked, setBooked] = useState(false)
  const next = () => { if (step === 1 && service) setStep(2); else if (step === 2 && details) setStep(3); else if (step === 3) setBooked(true) }
  return <><MobileAppShell initialView="book" /><main className="portal"><header className="portal-header"><a href="/" className="brand"><span className="brand-mark">DD</span> Door Darzi</a><span className="portal-label">Book a collection</span><a href="/" className="back-link"><ArrowLeft size={15} /> Exit</a></header><div className="portal-main"><div className="portal-progress"><span className="active">01 Service</span><span className={step >= 2 ? 'active' : ''}>02 Details</span><span className={step >= 3 ? 'active' : ''}>03 Time & place</span></div>{booked ? <section className="success-panel"><div className="success-icon"><Check /></div><p className="eyebrow">Collection requested</p><h1>We&apos;ll take it<br /><em>from here.</em></h1><p>Our team will call you shortly to confirm your collection window and answer any questions.</p><a className="button button-dark" href="/track">Track my request <ArrowRight size={16} /></a></section> : <section className="booking-panel"><p className="eyebrow">Step {String(step).padStart(2, '0')}</p>{step === 1 && <><h1>What can we<br /><em>help with?</em></h1><div className="portal-options">{options.map(({ id, icon: Icon, title, copy }) => <button className={service === id ? 'portal-option selected' : 'portal-option'} key={id} onClick={() => setService(id)}><Icon /><span><strong>{title}</strong><small>{copy}</small></span>{service === id && <Check />}</button>)}</div></>}{step === 2 && <><h1>Tell us about<br /><em>your garments.</em></h1><textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="For example: 2 shirts need sleeve alterations, 1 silk saree needs delicate cleaning..." /><p className="field-help">The more detail you share, the better we can prepare.</p></>}{step === 3 && <><h1>Where should we<br /><em>meet you?</em></h1><div className="address-card"><MapPin /><div><strong>Vijay Nagar, Indore</strong><small>Collection available · 2.5 km away</small></div><button>Change</button></div><div className="slot-card"><strong>Choose a collection window</strong><button className="slot selected">Tomorrow · 10:00–12:00 <Check /></button><button className="slot">Tomorrow · 16:00–18:00</button></div></> }<div className="portal-actions">{step > 1 && <button className="button button-quiet" onClick={() => setStep(step - 1)}>Back</button>}<button className="button button-dark" onClick={next}>{step === 3 ? 'Request collection' : 'Continue'} <ArrowRight size={16} /></button></div></section>}</div></main></>
}
