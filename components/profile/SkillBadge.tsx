'use client'

interface SkillBadgeProps {
  skill: string
  onRemove?: () => void
  variant?: 'offer' | 'seek'
}

export default function SkillBadge({ skill, onRemove, variant = 'offer' }: SkillBadgeProps) {
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium inline-flex items-center'
  const colorClasses =
    variant === 'offer'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800'

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-gray-500 hover:text-gray-700"
          aria-label={`Remove ${skill}`}
        >
          ×
        </button>
      )}
    </span>
  )
}
