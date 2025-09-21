import { Ban, CalendarClock, Clock, PartyPopper, PawPrint, Shield } from "lucide-react";
import { Property } from "@/types/property";
import React from "react";

interface StayPoliciesProps {
    property: Property;
}

const getHouseRuleIcon = (rule: string) => {
    const lowerCaseRule = rule.toLowerCase();
    if (lowerCaseRule.includes('smoking')) return <Ban size={20} className="text-[#284E4C]"/>;
    if (lowerCaseRule.includes('pet')) return <PawPrint size={20} className="text-[#284E4C]"/>;
    if (lowerCaseRule.includes('part')) return <PartyPopper size={20} className="text-[#284E4C]"/>;
    return <Shield size={20} className="text-[#284E4C]"/>;
};

const StayPolicies = ({ property }: StayPoliciesProps) => {
    return (
        <div className="rounded-lg text-card-foreground p-6 mb-8 bg-white border-0 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-[#333333]">
                Stay Policies
            </h2>
            <div className="space-y-8">
                <div className="bg-[#F1F3EE] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full">
                            <Clock size={20} className="text-[#284E4C]"/>
                        </div>
                        <h3 className="font-semibold text-lg text-[#333333]">
                            Check-in & Check-out
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-[#5C5C5A]">
                                Check-in Time 
                            </p>
                            <p className="font-semibold text-lg text-[#333333]">
                                {property.stayPolicy.checkIn}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-[#5C5C5A]">
                                Check-out Time 
                            </p>
                            <p className="font-semibold text-lg text-[#333333]">
                                {property.stayPolicy.checkOut}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F1F3EE] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full">
                            <Shield size={20} className="text-[#284E4C]"/>
                        </div>
                        <h3 className="font-semibold text-lg text-[#333333]">
                            House Rules
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.stayPolicy.houseRules.map((rule) => (
                            <div key={rule} className="flex items-center gap-3 bg-white rounded-lg p-4">
                                {getHouseRuleIcon(rule)}
                                <p className="font-medium text-[#333333]">
                                    {rule}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#F1F3EE] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-full">
                            <CalendarClock size={20} className="text-[#284E4C]"/>
                        </div>
                        <h3 className="font-semibold text-lg text-[#333333]">
                            Cancellation Policy
                        </h3>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <p>{property.stayPolicy.cancellationPolicy}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StayPolicies;