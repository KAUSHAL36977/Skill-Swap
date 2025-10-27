'use client'

import { type Listing } from '@/types'

interface ListingCardProps {
  listing: Listing & { user: { name: string; reputation: number } }
  onView: () => void
}

export default function ListingCard({ listing, onView }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
          <p className="text-sm text-gray-500">by {listing.user.name}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            listing.type === 'offer'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {listing.type === 'offer' ? 'Offer' : 'Request'}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {listing.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {listing.skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        onClick={onView}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        View Details
      </button>
    </div>
  )
}
