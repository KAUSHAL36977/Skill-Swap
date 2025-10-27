export interface User {
  id: string
  clerkId: string
  email: string
  name: string
  bio?: string
  avatar?: string
  portfolioUrl?: string
  reputation: number
  completedSwaps: number
  skillsOffered: string[]
  skillsSought: string[]
  badges: string[]
}

export interface Listing {
  id: string
  userId: string
  type: 'offer' | 'request'
  title: string
  description: string
  skills: string[]
  category?: string
  urgency?: 'low' | 'medium' | 'high'
  active: boolean
  expiresAt?: Date
}

export interface Match {
  id: string
  listingId: string
  userId: string
  status: 'pending' | 'accepted' | 'completed' | 'rejected'
  createdAt: Date
}

export interface Message {
  id: string
  matchId: string
  senderId: string
  content: string
  read: boolean
  createdAt: Date
}

export interface Rating {
  id: string
  matchId: string
  fromUserId: string
  toUserId: string
  rating: number
  comment?: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: Date
}
