'use client'

import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, Home, LocateFixed, MapPin, Package, Scissors, Search, Shirt, Sparkles, UserRound } from 'lucide-react'

type MobileView = 'home' | 'services' | 'book' | 'orders' | 'login'

const services = [
  { icon: Scissors, title: 'Tailoring', copy: 'Made-to-measure pieces', tone: 'pink' },
  { icon: Sparkles, title: 'Garment care', copy: 'Clean, press or restore', tone: 'purple' },
  { icon: Shirt, title: 'Alterations', copy: 'Make it fit beautifully', tone: 'orange' },
  { icon: MapPin, title: 'Collection', copy: 'We come to your door', tone: 'blue' },
]

function Header() { return <div className="mobile-app-topbar"><span className="mobile-time">9:41</span><div className="mobile-location"><MapPin size={15} fill="currentColor" /> Indore <ChevronDown size={12} /></div><a className="mobile-profile-link" href="/login" aria-label="Sign in"><UserRound size={16} /></a></div> }
function SearchBar() { return <div className="mobile-search"><Search size={16} /> <span>Search for a service</span></div> }
function ServicesView({ go }: { go: (view: MobileView) => void }) { return <section className="mobile-view"><div className="mobile-view-heading"><p className="eyebrow">Door Darzi services</p><h1>Good clothes.<br /><em>Good care.</em></h1><p>Choose what your wardrobe needs and we&apos;ll bring the next step to your door.</p></div><div className="mobile-service-list">{services.map(({ icon: Icon, title, copy, tone }) => <button className="mobile-service-list-item" key={title} onClick={() => go('book')}><span className={`mobile-service-icon ${tone}`}><Icon /></span><span><strong>{title}</strong><small>{copy}</small></span><ArrowRight /></button>)}</div></section> }
function BookView() {
  const [locating, setLocating] = useState(false)
  const [locationStatus, setLocationStatus] = useState('')
  function useMyLocation() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationStatus('Location is not supported on this device. Please enter your address when booking.')
      return
    }
    setLocating(true)
    setLocationStatus('Requesting your location…')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false)
        setLocationStatus(`Location found near ${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}. We'll confirm your collection area.`)
      },
      () => {
        setLocating(false)
        setLocationStatus('We could not access your location. Please allow location access or enter your address manually.')
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }
  return <section className="mobile-view"><p className="eyebrow">Book a collection</p><h1>Tell us what<br /><em>needs doing.</em></h1><p className="mobile-view-copy">Select a service, share a little detail and choose a convenient time.</p><div className="mobile-book-card"><strong>Start your request</strong><span>Our team will guide you through the details.</span><a className="mobile-primary-action" href="/book">Open booking <ArrowRight /></a></div><button type="button" className="mobile-location-action" onClick={useMyLocation} disabled={locating}><LocateFixed size={16} /> {locating ? 'Locating…' : 'Use my location'}</button>{locationStatus && <p className="mobile-location-status" role="status">{locationStatus}</p>}</section>
}
function OrdersView() { return <section className="mobile-view"><p className="eyebrow">My orders</p><h1>Your garments are<br /><em>in good hands.</em></h1><div className="mobile-order-card"><div className="mobile-order-status"><span>DD-1048</span><strong><i /> Collection requested</strong></div><div className="mobile-order-progress"><span className="done"><Check /></span><span /><span /><span /></div><div className="mobile-order-labels"><strong>Collection requested</strong><small>Next: collected from your door</small></div><a href="/track" className="mobile-primary-action">View full tracking <ArrowRight /></a></div><div className="mobile-login-prompt"><UserRound size={18} /><span><strong>Want to see all your orders?</strong><small>Sign in to keep everything together.</small></span><a href="/login">Sign in</a></div></section> }
function LoginView() { return <section className="mobile-view"><p className="eyebrow">Welcome back</p><h1>Your wardrobe,<br /><em>in one place.</em></h1><div className="mobile-login-form"><label htmlFor="mobile-email">Email or mobile number</label><input id="mobile-email" placeholder="you@example.com" /><label htmlFor="mobile-password">Password</label><input id="mobile-password" type="password" placeholder="Enter password" /><button className="mobile-primary-action">Sign in <ArrowRight /></button><a href="/book">Continue as a guest</a></div></section> }

export function MobileAppShell({ initialView = 'home' }: { initialView?: MobileView }) {
  const [view, setView] = useState<MobileView>(initialView)
  const go = (next: MobileView) => setView(next)
  return <main className="mobile-route-shell" aria-label="Door Darzi mobile app"><Header /><div className="mobile-app-content">{view === 'home' && <><SearchBar /><div className="mobile-service-row">{services.map(({ icon: Icon, title, tone }) => <button className="mobile-service" key={title} onClick={() => go(title === 'Collection' ? 'book' : 'services')}><span className={`mobile-service-icon ${tone}`}><Icon /></span><span>{title}</span></button>)}</div><button className="mobile-banner" onClick={() => go('book')}><span className="mobile-banner-copy"><small>DOORSTEP CARE</small><strong>Good clothes.<br />Good care.</strong><em>Book a collection →</em></span><span className="mobile-banner-art"><Scissors size={54} /></span></button><section className="mobile-membership"><div><p className="eyebrow">Your wardrobe membership</p><h2>Care that comes<br />back to you.</h2><strong>Flat 15% off</strong><p>Save more when your wardrobe stays in our care.</p></div><div className="mobile-membership-mark"><Shirt size={38} /></div></section><section className="mobile-recommendations"><div className="mobile-section-heading"><h2>Popular with Indore</h2><button onClick={() => go('services')}>See all</button></div><div className="mobile-scroll-cards">{services.slice(0, 3).map(({ icon: Icon, title, tone }) => <button className="mobile-rec-card" key={title} onClick={() => go('book')}><div className={`mobile-rec-image ${tone}`}><Icon /></div><strong>{title}</strong><small>At your door</small></button>)}</div></section><button className="mobile-app-cta" onClick={() => go('book')}><span><strong>Ready when you are.</strong><small>Tell us what needs doing.</small></span><ArrowRight /></button></>}{view === 'services' && <><SearchBar /><ServicesView go={go} /></>}{view === 'book' && <BookView />}{view === 'orders' && <OrdersView />}{view === 'login' && <LoginView />}</div><nav className="mobile-bottom-nav" aria-label="App navigation"><button className={view === 'home' ? 'active' : ''} onClick={() => go('home')} aria-label="Home" aria-current={view === 'home' ? 'page' : undefined}><Home /></button><button className={view === 'services' ? 'active' : ''} onClick={() => go('services')} aria-label="Services" aria-current={view === 'services' ? 'page' : undefined}><Scissors /></button><button className={view === 'book' ? 'active' : ''} onClick={() => go('book')} aria-label="Book" aria-current={view === 'book' ? 'page' : undefined}><MapPin /></button><button className={view === 'orders' ? 'active' : ''} onClick={() => go('orders')} aria-label="Orders" aria-current={view === 'orders' ? 'page' : undefined}><Package /></button></nav></main>
}
