import DashboardLayout from '@/components/layout/DashboardLayout'

export default function MatchesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-8">
            You don't have any matches yet. Start browsing the marketplace to find skill partners!
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
