'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { BookOpen, Building2, Globe, Info, Mail } from 'lucide-react'
import Image from 'next/image'
import LanguageSelector from '../../data/LanguageSelector'

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const logoPath = "/logo.webp";
const scrolledLogo = "/logo-bw.webp"

export default function PropertyHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`w-full transition-colors duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 z-40 bg-[#284E4C] shadow-lg' : 'bg-transparent'}`}
        >
            <nav aria-label="Global" className="mx-auto flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <Image
                            alt="The Flex logo"
                            src={isScrolled ? scrolledLogo : logoPath}
                            width={100}
                            height={28}
                            className="h-7 w-auto object-contain"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${isScrolled ? 'text-white' : 'text-gray-700'}`}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:items-center lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton className={`flex items-center gap-x-2 text-sm/6 font-semibold transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                            <Building2 size={14} />
                            Landlords
                            <ChevronDownIcon aria-hidden="true" className={`size-5 flex-none transition-colors ${isScrolled ? 'text-gray-300' : 'text-gray-400'}`} />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >
                           
                        </PopoverPanel>
                    </Popover>

                    <a href="#" className={`flex items-center gap-x-2 text-sm/6 font-semibold transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                        <Info size={14} />
                        About Us 
                    </a>
                    <a href="#" className={`flex items-center gap-x-2 text-sm/6 font-semibold transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                        <BookOpen size={14} />
                        Careers
                    </a>
                    <a href="#" className={`flex items-center gap-x-2 text-sm/6 font-semibold transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                        <Mail size={14} />
                       Contact
                    </a>
                    <LanguageSelector isScrolled={isScrolled} />
                    <a href="#" className={`flex items-center gap-x-2 text-sm/6 font-semibold transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                        <span className='font-bold text-lg'>£</span>    
                        <span>GBP</span>
                    </a>
                </PopoverGroup>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">The Flex</span>
                        <Image
                            alt="The Flex logo"
                            src={logoPath}
                            width={100}
                            height={28}
                            className="h-7 w-auto"
                        />
                    </a>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            {/* Landlords Disclosure - kept for mobile convenience */}
                            <Disclosure as="div" className="-mx-3">
                                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                    <div className="flex items-center gap-x-3">
                                        <Building2 size={14} />
                                        Landlords
                                    </div>
                                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                                </DisclosureButton>
                                
                            </Disclosure>

                            <a
                                href="#"
                                className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                <Info size={14} />
                                About Us
                            </a>
                            <a
                                href="#"
                                className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                <BookOpen size={14} />
                                Careers
                            </a>
                            <a
                                href="#"
                                className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                <Mail size={14} />
                                Contact
                            </a>
                            <div className="px-3 py-2">
                                <LanguageSelector />
                            </div>
                            <a
                                href="#"
                                className="-mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                <span className='font-bold text-lg'>£</span>
                                <span>GBP</span>
                            </a>
                        </div>
                    </div>
                </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
