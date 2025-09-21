"use client";

import Image from "next/image";

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 h-full w-64 
                border-r-2 border-black bg-white p-6 text-black 
                transition-transform duration-300 ease-in-out 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            style={{ backgroundColor: "#fffdf6" }}
        >
            <Image
                src="/logo.webp"
                alt="The Flex Logo"
                width={120}
                height={34}
                className="mx-auto mb-12"
            />
            <nav className="space-y-4">
                <a href="#" className="block hover:text-gray-300">Home</a>
                <a href="#" className="block hover:text-gray-300">Analytics</a>
                <a href="#" className="block hover:text-gray-300">Orders</a>
                <a href="#" className="block hover:text-gray-300">Settings</a>
            </nav>
        </aside>
    );
}
