import DashboardLayout from '@/components/layout/DashboardLayout'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.firstName || 'User'}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Active Listings
            </h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Skills you're offering</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending Matches
            </h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500 mt-2">Awaiting your response</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your Reputation
            </h3>
            <p className="text-3xl font-bold text-purple-600">0.0</p>
            <p className="text-sm text-gray-500 mt-2">Average rating</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/listings/create"
              className="bg-blue-600 text-white rounded-lg px-6 py-4 text-center hover:bg-blue-700 transition-colors"
            >
              Create New Listing
            </a>
            <a
              href="/marketplace"
              className="bg-gray-100 text-gray-900 rounded-lg px-6 py-4 text-center hover:bg-gray-200 transition-colors"
            >
              Browse Marketplace
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
