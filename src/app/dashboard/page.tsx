import DashboardClient from "@/components/dashboard/dashboard-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    
}
const DashboardHome = () => {
    return (
        <DashboardClient />
    );
}

export default DashboardHome;