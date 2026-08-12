"use client"

import { useMemo, useState } from 'react'
import { ArrowUpRight, CalendarDays, Check, ChevronDown, IndianRupee, MapPin, MoreHorizontal, Package, Search, Users } from 'lucide-react'

type Section = 'Overview' | 'Orders' | 'Customers' | 'Slots & zones'
type Order = { id: string; customer: string; service: string; status: string; created: string; amount: string }

const orders: Order[] = [
  { id: 'DD-1048', customer: 'Aarav Mehta', service: 'Alterations', status: 'Collection requested', created: 'Today, 9:42 AM', amount: '₹1,250' },
  { id: 'DD-1047', customer: 'Nisha Jain', service: 'Tailoring', status: 'In progress', created: 'Today, 9:18 AM', amount: '₹3,400' },
  { id: 'DD-1046', customer: 'Rohan Verma', service: 'Garment care', status: 'Ready to return', created: 'Yesterday, 6:24 PM', amount: '₹850' },
  { id: 'DD-1045', customer: 'Meera Shah', service: 'Alterations', status: 'Collected', created: 'Yesterday, 4:10 PM', amount: '₹1,800' },
]
const customers = [['Aarav Mehta', '4 orders', '₹6,240', 'Vijay Nagar'], ['Nisha Jain', '2 orders', '₹4,100', 'Saket'], ['Rohan Verma', '7 orders', '₹12,850', 'Rau'], ['Meera Shah', '3 orders', '₹5,600', 'Palasia']]
const slots = [{ day: 'Today · 12 Aug', windows: ['10:00 – 12:00', '12:00 – 14:00', '16:00 – 18:00'], booked: [true, true, false] }, { day: 'Tomorrow · 13 Aug', windows: ['10:00 – 12:00', '12:00 – 14:00', '16:00 – 18:00'], booked: [false, true, false] }, { day: 'Friday · 14 Aug', windows: ['10:00 – 12:00', '12:00 – 14:00', '16:00 – 18:00'], booked: [false, false, false] }]

function Sidebar({ section, setSection }: { section: Section; setSection: (value: Section) => void }) {
  return <aside className="admin-sidebar"><a className="brand" href="/"><span className="brand-mark">DD</span> Door Darzi</a><p className="admin-kicker">Operations</p>{(['Overview', 'Orders', 'Customers', 'Slots & zones'] as Section[]).map((item) => <button className={section === item ? 'admin-nav active' : 'admin-nav'} onClick={() => setSection(item)} key={item}>{item}</button>)}<div className="admin-sidebar-bottom"><span className="admin-avatar">RS</span><span><strong>Riya Sharma</strong><small>Administrator</small></span></div></aside>
}

function OrdersView({ onUpdate }: { onUpdate: (id: string) => void }) {
  return <section className="admin-card full-card"><div className="admin-card-head"><div><h2>Orders</h2><p>Manage every garment from collection to return.</p></div><a className="text-action" href="/book">New booking <ArrowUpRight size={14} /></a></div><div className="admin-toolbar"><div className="search-box"><Search size={15} /><input placeholder="Search order or customer" /></div><button className="filter-button">All statuses <ChevronDown size={14} /></button></div><div className="order-table"><div className="table-row table-head"><span>Order</span><span>Customer</span><span>Service</span><span>Status</span><span>Created</span><span /></div>{orders.map((order) => <div className="table-row" key={order.id}><strong>{order.id}</strong><span>{order.customer}</span><span>{order.service}</span><button className="pill pill-button" onClick={() => onUpdate(order.id)}>{order.status}</button><small>{order.created}</small><button className="icon-button" aria-label={`Open ${order.id}`}><MoreHorizontal size={16} /></button></div>)}</div></section>
}

function CustomersView() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => customers.filter(([name, , , area]) => `${name} ${area}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <section className="admin-card full-card"><div className="admin-card-head"><div><h2>Customers</h2><p>People who trust Door Darzi with their wardrobe.</p></div><span className="count-label">186 active</span></div><div className="admin-toolbar"><div className="search-box"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers or neighbourhood" /></div></div><div className="customer-list">{filtered.map(([name, ordersCount, spend, area]) => <div className="customer-row" key={name}><span className="customer-avatar">{name.split(' ').map((word) => word[0]).join('')}</span><div><strong>{name}</strong><small>{area}</small></div><span>{ordersCount}</span><span>{spend}</span><button className="icon-button" aria-label={`Open ${name}`}><MoreHorizontal size={16} /></button></div>)}</div></section>
}

function SlotsView() {
  const [slotState, setSlotState] = useState(slots)
  function toggleSlot(dayIndex: number, slotIndex: number) { setSlotState((current) => current.map((day, index) => index === dayIndex ? { ...day, booked: day.booked.map((booked, innerIndex) => innerIndex === slotIndex ? !booked : booked) } : day)) }
  return <section className="admin-card full-card"><div className="admin-card-head"><div><h2>Slots & zones</h2><p>Control collection capacity across Indore.</p></div><button className="text-action" onClick={() => setSlotState(slots)}>Reset demo slots</button></div><div className="zone-banner"><MapPin size={17} /><span><strong>Indore core zone</strong><small>Vijay Nagar · Saket · Palasia · Rau</small></span><span className="zone-status">Active</span></div><div className="slot-manager">{slotState.map((day, dayIndex) => <div className="day-row" key={day.day}><strong>{day.day}</strong><div className="slot-options">{day.windows.map((window, slotIndex) => <button className={day.booked[slotIndex] ? 'slot-toggle booked' : 'slot-toggle'} onClick={() => toggleSlot(dayIndex, slotIndex)} key={window}>{day.booked[slotIndex] ? <Check size={14} /> : <span />} {window}<small>{day.booked[slotIndex] ? 'Booked' : 'Available'}</small></button>)}</div></div>)}</div></section>
}

function Overview({ goTo }: { goTo: (section: Section) => void }) {
  return <><div className="metric-grid"><div className="metric"><span><Package /></span><small>Open orders</small><strong>24</strong><em>+4 this week</em></div><div className="metric"><span><CalendarDays /></span><small>Today&apos;s collections</small><strong>08</strong><em>3 slots remaining</em></div><div className="metric"><span><IndianRupee /></span><small>Revenue this month</small><strong>₹48,620</strong><em>+18.4% vs July</em></div><div className="metric"><span><Users /></span><small>Active customers</small><strong>186</strong><em>+12 this month</em></div></div><div className="admin-grid"><section className="admin-card orders"><div className="admin-card-head"><div><h2>Recent orders</h2><p>Everything that needs your attention.</p></div><button className="text-action" onClick={() => goTo('Orders')}>View all <ArrowUpRight size={14} /></button></div><div className="order-table">{orders.map((order) => <div className="table-row" key={order.id}><strong>{order.id}</strong><span>{order.customer}</span><span>{order.service}</span><span className="pill">{order.status}</span><small>{order.created}</small><MoreHorizontal size={16} /></div>)}</div></section><section className="admin-card capacity"><div className="admin-card-head"><div><h2>Today&apos;s capacity</h2><p>Collection windows in Indore.</p></div><button className="text-action" onClick={() => goTo('Slots & zones')}>Manage <ArrowUpRight size={14} /></button></div><div className="capacity-body"><strong>8 <small>/ 12</small></strong><span>collections booked</span><div className="capacity-bar"><i /></div><p>3 slots remaining today</p></div></section></div></>
}

export default function AdminPage() {
  const [section, setSection] = useState<Section>('Overview')
  const [notice, setNotice] = useState('')
  function updateOrder(id: string) { setNotice(`${id} moved to the next stage.`); window.setTimeout(() => setNotice(''), 2500) }
  return <main className="admin"><Sidebar section={section} setSection={setSection} /><section className="admin-content"><header className="admin-top"><div><p className="eyebrow">Wednesday, 12 August 2026</p><h1>{section === 'Overview' ? 'Good morning, Riya.' : section}</h1></div><a className="button button-dark" href="/book">New booking <ArrowUpRight size={15} /></a></header>{notice && <div className="admin-notice"><Check size={15} /> {notice}</div>}{section === 'Overview' && <Overview goTo={setSection} />}{section === 'Orders' && <OrdersView onUpdate={updateOrder} />}{section === 'Customers' && <CustomersView />}{section === 'Slots & zones' && <SlotsView />}</section></main>
}
