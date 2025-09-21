import { ReactNode } from "react";
import PropertyHeader from "./header";
import { PropertyFooter } from "./footer";

interface PropertyLayoutProps {
    children: ReactNode;
}

export default function PropertyLayout({ children }: PropertyLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <PropertyHeader />
            <main className="flex-grow p-6">{children}</main>
            <PropertyFooter />
        </div>
    )
}