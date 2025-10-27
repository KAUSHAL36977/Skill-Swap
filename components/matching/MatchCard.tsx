'use client'

import { type Listing } from '@/types'

interface MatchCardProps {
  listing: Listing & { user: { name: string; reputation: number } }
  score: number
  reasons: string[]
  onMatch: () => void
}

export default function MatchCard({ listing, score, reasons, onMatch }: MatchCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{listing.title}</h3>
          <p className="text-sm text-gray-500">by {listing.user.name}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            {(score * 100).toFixed(0)}%
          </div>
          <p className="text-xs text-gray-500">Match Score</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{listing.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {listing.skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-1 mb-4 text-sm text-gray-600">
        {reasons.map((reason, idx) => (
          <div key={idx} className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {reason}
          </div>
        ))}
      </div>

      <button
        onClick={onMatch}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Request Match
      </button>
    </div>
  )
}
