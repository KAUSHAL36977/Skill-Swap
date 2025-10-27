'use client'

import { type Match } from '@/types'

interface MessageListProps {
  matches: (Match & {
    listing: { title: string }
    matchedUser: { name: string; avatar?: string }
  })[]
  currentMatchId: string | null
  onSelectMatch: (matchId: string) => void
}

export default function MessageList({
  matches,
  currentMatchId,
  onSelectMatch,
}: MessageListProps) {
  return (
    <div className="w-full md:w-80 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
      </div>
      <div className="overflow-y-auto">
        {matches.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No messages yet</p>
          </div>
        ) : (
          <div>
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => onSelectMatch(match.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  currentMatchId === match.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {match.matchedUser.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900">
                      {match.matchedUser.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {match.listing.title}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(match.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
