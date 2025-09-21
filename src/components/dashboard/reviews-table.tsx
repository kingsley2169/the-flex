"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { NormalizedReview } from "@/lib/reviewService";

interface ReviewsTableProps {
    reviews: NormalizedReview[];
    sortConfig: { key: keyof NormalizedReview, direction: 'asc' | 'desc' } | null;
    setSortConfig: (config: { key: keyof NormalizedReview, direction: 'asc' | 'desc' } | null) => void;
    onTogglePublic: (reviewId: string) => void;
}

const columns: { key: keyof NormalizedReview, label: string, sortable: boolean }[] = [
    { key: 'propertyName', label: 'Property', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true },
    { key: 'content', label: 'Review', sortable: false },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'isPublic', label: 'Public', sortable: true },
];

export default function ReviewsTable({ reviews, sortConfig, setSortConfig, onTogglePublic }: ReviewsTableProps) {
    const requestSort = (key: keyof NormalizedReview) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof NormalizedReview) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ChevronDown className="size-4 text-gray-400" />;
        }
        return sortConfig.direction === 'asc' ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col.sortable ? (
                                        <button type="button" onClick={() => requestSort(col.key)} className="flex items-center gap-1 hover:text-gray-700">
                                            {col.label} {getSortIcon(col.key)}
                                        </button>
                                    ) : ( col.label )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.propertyName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.rating.toFixed(1)} ★</td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-sm"><p className="truncate">{review.content}</p></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.channel}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(review.date).toISOString().split('T')[0]}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button type="button" onClick={() => onTogglePublic(review.id)} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FFFDF6] focus:ring-offset-2 ${review.isPublic ? 'bg-green-600' : 'bg-gray-200'}`}>
                                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${review.isPublic ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {reviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">No reviews match the current filters.</div>
            )}
        </div>
    );
}