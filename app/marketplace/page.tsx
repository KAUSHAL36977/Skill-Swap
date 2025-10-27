import DashboardLayout from '@/components/layout/DashboardLayout'

export default function MarketplacePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <input
            type="text"
            placeholder="Search skills..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {item}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">React Code Review</h3>
                  <p className="text-sm text-gray-500">by John Doe</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Looking for someone to review my React portfolio project. Will help with 
                your JavaScript in return.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  React
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  JavaScript
                </span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
