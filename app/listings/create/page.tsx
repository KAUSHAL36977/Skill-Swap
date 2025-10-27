import DashboardLayout from '@/components/layout/DashboardLayout'

export default function CreateListingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" name="type" value="offer" className="mr-2" />
                  <span className="text-gray-700">I want to offer a skill</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="type" value="request" className="mr-2" />
                  <span className="text-gray-700">I need a skill</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="e.g., I'll review your React code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe what you're offering or need..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <input
                type="text"
                placeholder="React, TypeScript, Resume Writing"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
