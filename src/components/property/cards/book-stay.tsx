import { Calendar, CalendarCheck, ChevronDown, MessageCircle, Shield, Users } from "lucide-react";

const BookStay = () => {
    return (
        <div className="text-card-foreground sticky top-24 overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[#284E4C]"></div>
                <div className="relative p-6">
                    <h3 className="text-lg font-semibold text-[#FFFFFF] mb-1">Book Your Stay</h3>
                    <p className="text-sm text-[#D2DADA]">Select dates to see prices</p>
                </div>
            </div>
            <div className="p-6 pt-4">
                <div className="space-y-1"> 
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <div className="grid w-full h-full [&>button]:w-full [&>button]:justify-start [&>button]:text-left [&>button]:h-[42px] [&>button]:bg-[#F1F3EE] [&>button]:border-0 [&>button]:shadow-sm [&>button]:hover:bg-[#FFFDF6] [&>button]:rounded-l-md [&>button]:rounded-r-none">
                                <button
                                    className="inline-flex items-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input px-4 py-2 w-full h-full justify-start text-left font-normal bg-transparent border-0 shadow-none transition-colors rounded-none group hover:bg-transparent hover:text-current text-muted-foreground"
                                >
                                    <Calendar size={14} className="mr-2"/>
                                    <span>Select Dates</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-[120px]">
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:rj:"
                                aria-expanded="false"
                                className="flex w-full items-center justify-between rounded-md border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-[42px] bg-[#F1F3EE] border-0 shadow-sm hover:bg-[#FFFDF6] transition-colors text-[#333333] rounded-l-none rounded-r-md"
                            >
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="mr-2"/>
                                    <span className="pointer-events: none;">4</span>
                                </div>
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-6">
                    <button 
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 rounded-md px-8 w-full bg-[#284E4C] hover:bg-[#284E4C]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        disabled
                    >
                        <CalendarCheck size={14} className="mr-2"/>
                        Check Availability
                    </button>
                    <button
                        className="hover:cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-12 rounded-md px-8 w-full border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30"

                    >
                        <MessageCircle size={14} className="mr-2"/>
                        Send Inquiry
                    </button>
                </div>

                <p className="text-sm text-[#5C5C5A] text-center mt-4">
                    <span className="inline-flex items-center gap-1">
                        <Shield size={14}/>
                        Instant booking confirmation
                    </span>
                </p>
            </div>
        </div>
    )
}

export default BookStay;