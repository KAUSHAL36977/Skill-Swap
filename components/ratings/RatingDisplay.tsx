'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { type Rating } from '@/types'

interface RatingDisplayProps {
  rating: Rating & {
    fromUser: { name: string }
    toUser: { name: string }
  }
}

export default function RatingDisplay({ rating }: RatingDisplayProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-gray-900">{rating.fromUser.name}</p>
          <p className="text-sm text-gray-500">
            rated {rating.toUser.name}
          </p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            star <= rating.rating ? (
              <StarIcon key={star} className="h-4 w-4 text-yellow-400" />
            ) : (
              <StarOutlineIcon key={star} className="h-4 w-4 text-gray-300" />
            )
          ))}
        </div>
      </div>
      {rating.comment && (
        <p className="text-gray-600 text-sm mt-2">{rating.comment}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">
        {new Date(rating.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
