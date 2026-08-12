// Domain types for Door Darzi MVP
// Core entities: users, services, zones, slots, orders, status history, leads

export type UserRole = 'customer' | 'admin' | 'staff'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
  // Customer-specific
  address?: string
  zone?: string
}

export type ServiceType = 'tailoring' | 'alterations' | 'garment-care' | 'repair' | 'custom-design'

export interface Service {
  id: string
  name: string
  type: ServiceType
  description: string
  basePrice: number
  estimatedDays: number
  createdAt: Date
  updatedAt: Date
}

export interface Zone {
  id: string
  name: string
  pincode: string
  city: string
  status: 'active' | 'inactive'
  deliveryCharge: number
  createdAt: Date
  updatedAt: Date
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface Slot {
  id: string
  zoneId: string
  dayOfWeek: DayOfWeek
  startTime: string // HH:mm
  endTime: string // HH:mm
  maxCapacity: number
  currentBookings: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus =
  | 'pending-details'
  | 'pending-confirmation'
  | 'confirmed'
  | 'picked-up'
  | 'in-progress'
  | 'ready'
  | 'delivered'
  | 'cancelled'

export interface Order {
  id: string
  customerId: string
  serviceId: string
  zoneId: string
  slotId: string
  status: OrderStatus
  garmentDetails: string
  specialInstructions?: string
  estimatedCompletionDate: Date
  scheduledPickupDate: Date
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
}

export interface OrderStatusHistory {
  id: string
  orderId: string
  previousStatus: OrderStatus
  newStatus: OrderStatus
  changedBy: string
  reason?: string
  timestamp: Date
}

export interface ServiceInterestLead {
  id: string
  name: string
  phone: string
  email?: string
  zone: string
  serviceType: ServiceType
  interest: string
  createdAt: Date
}

// API request/response types
export interface BookingRequest {
  serviceId: string
  zoneId: string
  slotId: string
  garmentDetails: string
  specialInstructions?: string
}

export interface StatusUpdateRequest {
  orderId: string
  newStatus: OrderStatus
  reason?: string
}

export interface ZoneSlotData {
  zone: Zone
  slots: Slot[]
}
