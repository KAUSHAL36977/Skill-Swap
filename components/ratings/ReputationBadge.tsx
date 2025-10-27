'use client'

import { StarIcon } from '@heroicons/react/24/solid'

interface ReputationBadgeProps {
  reputation: number
  completedSwaps: number
  badges: string[]
  size?: 'sm' | 'md' | 'lg'
}

export default function ReputationBadge({
  reputation,
  completedSwaps,
  badges,
  size = 'md',
}: ReputationBadgeProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const badgeSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <div className={`flex items-center gap-2 ${sizeClasses[size]}`}>
      <div className="flex items-center gap-1">
        <StarIcon className={`${badgeSizeClasses[size]} text-yellow-400`} />
        <span className="font-semibold text-gray-900">
          {reputation.toFixed(1)}
        </span>
      </div>
      <span className="text-gray-500">·</span>
      <span className="text-gray-600">
        {completedSwaps} {completedSwaps === 1 ? 'swap' : 'swaps'}
      </span>
      {badges.length > 0 && (
        <>
          <span className="text-gray-500">·</span>
          <div className="flex gap-1">
            {badges.slice(0, 3).map((badge, idx) => (
              <span
                key={idx}
                className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
