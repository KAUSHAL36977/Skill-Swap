import DashboardLayout from '@/components/layout/DashboardLayout'
import ReputationBadge from '@/components/ratings/ReputationBadge'
import { currentUser } from '@clerk/nextjs/server'

export default async function ProfilePage() {
  const user = await currentUser()

  // Mock data - replace with actual data fetching
  const mockReputation = 4.5
  const mockCompletedSwaps = 12
  const mockBadges = ['Top Contributor', 'Verified', 'Helpful Helper']

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user?.imageUrl || '/placeholder-avatar.png'}
              alt={user?.firstName || 'User'}
              className="h-24 w-24 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
              <div className="mt-2">
                <ReputationBadge
                  reputation={mockReputation}
                  completedSwaps={mockCompletedSwaps}
                  badges={mockBadges}
                  size="lg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills You Offer
              </label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  React Development
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Resume Writing
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  + Add Skill
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills You're Seeking
              </label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Python
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Data Analysis
                </span>
                <button className="text-green-600 hover:text-green-700 text-sm">
                  + Add Skill
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio URL
              </label>
              <input
                type="url"
                placeholder="https://your-portfolio.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
