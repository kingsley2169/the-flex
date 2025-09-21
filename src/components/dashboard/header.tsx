"use client";

import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import useStore from "@/hooks/zustand-hook";

interface DashboardHeaderProps {
    toggleSidebar: () => void;
}

export default function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
	const router = useRouter();
	const logout = useStore((state) => state.logout);

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<header className="sticky top-0 z-40 border-b-2 border-black h-16 flex items-center justify-between px-6 shadow-sm" style={{ backgroundColor: "#fffdf6" }}>
			<div className="flex items-center gap-4">
				<button onClick={toggleSidebar} type="button" className="p-1 rounded-md hover:bg-gray-100 hover:cursor-pointer">
					<Menu size={24} />
				</button>
			</div>
			<div className="flex items-center space-x-4">
				<button onClick={handleLogout} type="button" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:cursor-pointer">
					<LogOut className="size-4" />
					<span>Logout</span>
				</button>
			</div>
		</header>
	);
}
