"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import DashboardHeader from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="min-h-screen bg-[#fffdf6]">
            <Sidebar isOpen={isSidebarOpen} />

            <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <main className="p-6">
                    {children}
                </main>
            </div>

            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-30 md:hidden"
                ></div>
            )}
        </div>
    );
}
