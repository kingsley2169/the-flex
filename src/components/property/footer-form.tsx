import { ChevronDown, Send } from "lucide-react";

const SubscribeForm = () => {
    return (
        <form action="" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input 
                    type="text"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
                    placeholder="First Name"
                />
                <input 
                    type="text"
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
                    placeholder="Last Name" 
                />
            </div>
            <input 
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
                placeholder="Email Address"
                type="email"
            />
            <div className="flex gap-2">
                <button
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[120px] h-10 min-h-[40px] bg-white/10 border-white/20 text-white font-sans"
                    role="combobox"
                    data-state="closed"
                >
                    <div className="flex items-center gap-1 font-sans">
                        🇬🇧
                        <span className="font-sans">+44</span>
                    </div>
                    <ChevronDown size={14} />
                </button>
                <select 
                    style={{
                        position: 'absolute',
                        border: '0px',
                        width: '1px',
                        height: '1px',
                        padding: '0px',
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0px, 0px, 0px, 0px)',
                        whiteSpace: 'nowrap',
                        overflowWrap: 'normal',
                    }}
                >
                    <option value="+44">UK (+44)</option>
                    <option value="+1">US (+1)</option>
                </select>
                <input 
                    type="tel"
                    className="flex w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 h-10 min-h-[40px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans"
                    placeholder="Phone Number"
                />
            </div>
            <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 w-full bg-white text-primary hover:bg-gray-100 transition-colors font-sans hover:cursor-pointer"
                type="submit"
            >
                <Send size={14} className="mr-2"/>
                <span className="font-sans">Subscribe</span>
            </button>
        </form>
    )
}

export default SubscribeForm;