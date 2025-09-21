import { ReactNode } from "react";

interface KpiCardProps {
    title: string;
    value: string;
    icon: ReactNode;
}

export default function KpiCard({ title, value, icon }: KpiCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}