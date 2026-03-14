interface JobFiltersProps {
  filters: {
    search: string
    location: string
    type: string
  }
  setFilters: (filters: any) => void
}

export const JobFilters = ({ filters, setFilters }: JobFiltersProps) => {
  const jobTypes = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'REMOTE', 'CONTRACT']

  return (
    <div className="card sticky top-24">
      <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            placeholder="Job title, keywords..."
            className="input-field"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="City, country..."
            className="input-field"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filters.type === type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {type.replace('_', ' ')}
                </span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value=""
                checked={filters.type === ''}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">All Types</span>
            </label>
          </div>
        </div>

        <button
          onClick={() => setFilters({ search: '', location: '', type: '' })}
          className="w-full text-center text-sm text-primary-600 hover:text-primary-700"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}
