'use client'

import { useState } from 'react'
import { MobileAppShell } from '@/components/mobile-app-shell'
import { ArrowRight, Check, ChevronDown, Clock3, LocateFixed, MapPin, Menu, Scissors, Shirt, Sparkles, X } from 'lucide-react'

const services = [
  { icon: Scissors, title: 'Tailoring', copy: 'Made-to-measure pieces with a fit that feels like it was always yours.', price: 'From ₹799' },
  { icon: Shirt, title: 'Alterations', copy: 'Waist, length, sleeves, structure — precise adjustments without leaving home.', price: 'From ₹199' },
  { icon: Sparkles, title: 'Garment care', copy: 'Delicate cleaning, pressing and restoration for the pieces you keep.', price: 'From ₹149' },
]

const steps = [
  ['01', 'Tell us what needs doing', 'Choose a service and share a few details. No jargon, no guesswork.'],
  ['02', 'We come to your door', 'Pick a convenient collection window in your neighbourhood.'],
  ['03', 'Wear it beautifully', 'Your finished garments return carefully checked, pressed and ready.'],
]

const mobileServices = [
  { icon: Scissors, label: 'Tailoring', tone: 'pink' },
  { icon: Sparkles, label: 'Garment care', tone: 'purple' },
  { icon: Shirt, label: 'Alterations', tone: 'orange' },
  { icon: MapPin, label: 'Collection', tone: 'blue' },
]

function MobileAppHome() {
  return <main className="mobile-app-home" aria-label="Door Darzi mobile app home">
    <div className="mobile-app-topbar"><div className="mobile-location"><MapPin size={15} fill="currentColor" /> <span>Indore</span><ChevronDown size={12} /></div><span className="mobile-time">9:41</span></div>
    <div className="mobile-app-content">
      <div className="mobile-search"><span><span className="mobile-search-icon">⌕</span> Search for a service</span></div>
      <div className="mobile-service-row">{mobileServices.map(({ icon: Icon, label, tone }) => <a href="#book" className="mobile-service" key={label}><span className={`mobile-service-icon ${tone}`}><Icon /></span><span>{label}</span></a>)}</div>
      <a href="#book" className="mobile-banner"><span className="mobile-banner-copy"><small>DOORSTEP CARE</small><strong>Good clothes.<br />Good care.</strong><em>Book a collection →</em></span><span className="mobile-banner-art"><Scissors size={54} /></span></a>
      <section className="mobile-membership"><div><p className="eyebrow">Your wardrobe membership</p><h2>Care that comes<br />back to you.</h2><strong>Flat 15% off</strong><p>Save more when your wardrobe stays in our care.</p></div><div className="mobile-membership-mark"><Shirt size={38} /></div></section>
      <section className="mobile-recommendations"><div className="mobile-section-heading"><h2>Popular with Indore</h2><a href="#services">See all</a></div><div className="mobile-scroll-cards"><a href="#book" className="mobile-rec-card"><div className="mobile-rec-image tailoring"><Scissors /></div><strong>Fit & alterations</strong><small>From ₹199 · At your door</small></a><a href="#book" className="mobile-rec-card"><div className="mobile-rec-image care"><Sparkles /></div><strong>Garment care</strong><small>From ₹149 · Hand-finished</small></a><a href="#book" className="mobile-rec-card"><div className="mobile-rec-image collection"><MapPin /></div><strong>Book a collection</strong><small>Choose your time slot</small></a></div></section>
      <div className="mobile-app-cta"><div><strong>Ready when you are.</strong><span>Tell us what needs doing.</span></div><a href="#book" aria-label="Book a collection"><ArrowRight /></a></div>
    </div>
    <nav className="mobile-bottom-nav" aria-label="App navigation"><a className="active" href="#top"><span>⌂</span>Home</a><a href="#services"><Scissors />Services</a><a href="#book"><MapPin />Book</a><a href="/track"><span>◷</span>Orders</a></nav>
  </main>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [locationStatus, setLocationStatus] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('Location detection is not supported here. Please enter your address manually.')
      return
    }
    setLocationStatus('Requesting your location…')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setAddress(`Location detected near ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}. Please add your building or landmark.`)
        setLocationStatus('Location detected. Add a landmark so our darzi can find you.')
      },
      () => setLocationStatus('We could not access your location. Please enter your address manually.'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function submitInterest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (address.trim()) setSubmitted(true)
  }

  return (
    <>
      <MobileAppShell />
      <main className="desktop-site min-h-screen overflow-hidden bg-background text-foreground">
      <div className="announcement"><span className="announcement-dot" /> Now serving Indore · Doorstep collection is here</div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Door Darzi home"><span className="brand-mark">DD</span><span>Door Darzi</span></a>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our standard</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions"><a className="text-link" href="#contact">Sign in</a><a className="button button-dark" href="#book">Book a collection <ArrowRight size={16} /></a></div>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">The personal tailor, at your door</p>
          <h1>Clothes that fit your life.<em>Perfectly.</em></h1>
          <p className="hero-lede">Tailoring, alterations and garment care — thoughtfully done and collected from home across Indore.</p>
          <div className="hero-actions"><a className="button button-dark" href="#book">Start with a collection <ArrowRight size={17} /></a><a className="button button-quiet" href="#how-it-works">See how it works <ChevronDown size={16} /></a></div>
          <div className="trust-row"><span><Check size={15} /> Fit-first service</span><span><Check size={15} /> Transparent pricing</span><span><Check size={15} /> Human support</span></div>
        </div>
        <div className="hero-art" aria-label="Tailoring details arranged on a table">
          <div className="art-note">A better relationship<br />with your wardrobe.</div><div className="art-stamp">Made<br />for you</div><div className="art-tape">DOOR DARZI</div><div className="art-caption"><span>01 / 03</span><span>Considered craft, delivered.</span></div>
        </div>
      </section>

      <section id="services" className="section shell"><div className="section-intro"><p className="eyebrow">What we do</p><h2>The small things make<br />the biggest difference.</h2><p>Every service starts with a conversation. Every finish is checked by a person who cares about the details.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, copy, price }) => <article className="service-card" key={title}><div className="service-icon"><Icon /></div><h3>{title}</h3><p>{copy}</p><span>{price}</span><a href="#book" aria-label={`Book ${title}`}>Explore <ArrowRight size={15} /></a></article>)}</div></section>

      <section id="how-it-works" className="dark-band"><div className="shell"><div className="section-intro light"><p className="eyebrow">How it works</p><h2>Simple from the<br />very first stitch.</h2></div><div className="steps">{steps.map(([number, title, copy]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

      <section id="about" className="quote-section shell"><div className="quote-mark">“</div><blockquote>We believe getting dressed should feel easy. So we made the care of your clothes feel that way too.</blockquote><div className="quote-byline"><span className="line" /> Door Darzi, Indore <span className="line" /></div></section>

      <section id="book" className="booking shell"><div><p className="eyebrow">Start here</p><h2>Let&apos;s make your<br /><em>wardrobe work harder.</em></h2><p className="booking-copy">Tell us where to find you and we&apos;ll take it from there. Collection is currently available across select Indore neighbourhoods.</p><div className="location-note"><MapPin size={18} /><span><strong>Currently in Indore</strong><br />Vijay Nagar · Saket · Palasia · Rau</span></div></div><form className="booking-form" onSubmit={submitInterest}><label htmlFor="address">Your collection address</label><textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House / flat, street, neighbourhood, Indore" rows={3} required /><button className="detect-location" type="button" onClick={detectLocation}><LocateFixed size={15} /> Autodetect my location</button>{locationStatus && <p className="location-status" role="status">{locationStatus}</p>}<button className="button button-dark full" type="submit">{submitted ? "You're on the list" : 'Check my area'} <ArrowRight size={16} /></button><p className="form-note"><Clock3 size={13} /> Enter manually or use autodetect. A real person will get back to you shortly.</p></form></section>

      <footer id="contact" className="footer"><div className="shell footer-inner"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">DD</span><span>Door Darzi</span></a><p>Good clothes deserve good care.</p></div><div className="footer-links"><div><span>Explore</span><a href="#services">Services</a><a href="#how-it-works">How it works</a></div><div><span>Say hello</span><a href="mailto:hello@doordarzi.in">hello@doordarzi.in</a><a href="tel:+917312345678">+91 731 234 5678</a></div></div></div><div className="shell footer-bottom"><span>© 2026 Door Darzi</span><span>Made with care in Indore</span></div></footer>
      </main>
    </>
  )
}
