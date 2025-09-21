interface DashboardFiltersProps {
    properties: { id: string; name: string; }[];
    selectedProperty: string;
    setSelectedProperty: (value: string) => void;
    channels: string[];
    selectedChannel: string;
    setSelectedChannel: (value: string) => void;
    selectedRating: number;
    setSelectedRating: (value: number) => void;
    dateRange: { start: string; end: string };
    setDateRange: (value: { start: string; end: string }) => void;
}

export default function DashboardFilters({ 
    properties, selectedProperty, setSelectedProperty,
    channels, selectedChannel, setSelectedChannel,
    selectedRating, setSelectedRating,
    dateRange, setDateRange
}: DashboardFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="property-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Property
                    </label>
                    <select
                        id="property-filter"
                        value={selectedProperty}
                        onChange={(e) => setSelectedProperty(e.target.value)}
                        className="w-full rounded-md border-black border-1 shadow-sm focus:border-black focus:ring-black sm:text-sm py-4 pl-1"
                    >
                        <option value="all">All Properties</option>
                        {properties.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Min Rating
                    </label>
                    <select
                        id="rating-filter"
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(Number(e.target.value))}
                        className="w-full rounded-md border-black border-1 shadow-sm focus:border-black focus:ring-black sm:text-sm py-4 pl-1"
                    >
                        <option value={0}>All Ratings</option>
                        <option value={5}>5 stars</option>
                        <option value={4}>4+ stars</option>
                        <option value={3}>3+ stars</option>
                        <option value={2}>2+ stars</option>
                        <option value={1}>1+ star</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="channel-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Channel
                    </label>
                    <select
                        id="channel-filter"
                        value={selectedChannel}
                        onChange={(e) => setSelectedChannel(e.target.value)}
                        className="w-full rounded-md border-black border-1 shadow-sm focus:border-black focus:ring-black sm:text-sm py-4 pl-1"
                    >
                        {channels.map(c => (
                            <option key={c} value={c}>{c === 'all' ? 'All Channels' : c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex items-center space-x-2">
                        <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            className="w-full rounded-md border-black border-1 shadow-sm focus:border-black focus:ring-black sm:text-sm py-4 pl-1"
                        />
                        <span className="text-gray-500 text-sm">-</span>
                        <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            className="w-full rounded-md border-black border-1 shadow-sm focus:border-black focus:ring-black sm:text-sm py-4 pl-1"
                            min={dateRange.start}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}