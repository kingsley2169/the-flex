'use client'

import { useState } from 'react'
import {
    Popover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'
import { CountryData, CountryDataType } from '@/data/country-data'

interface LanguageSelectorProps {
    isScrolled?: boolean;
}

export default function LanguageSelector({ isScrolled }: LanguageSelectorProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountryDataType>(() => {
        return CountryData.find(c => c.iso2 === 'GB') || CountryData[0];
    });

    return (
        <Popover className="relative">
            <PopoverButton className={`flex items-center gap-x-2 text-sm/6 font-semibold transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                <span className="flex-shrink-0">{selectedCountry.emoji}</span>
                <span className="w-20 text-left">{selectedCountry.language}</span>
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute right-0 z-10 mt-4 w-64 origin-top-right overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
                {({ close }) => (
                    <div className="p-2 max-h-60 overflow-y-auto">
                        {CountryData.map((country) => (
                            <div
                                key={country.id}
                                onClick={() => {
                                    setSelectedCountry(country);
                                    close();
                                }}
                                className="group relative flex cursor-pointer items-center gap-x-4 rounded-lg p-2 text-sm/6 hover:bg-gray-50"
                            >
                                <span>{country.emoji}</span>
                                <span className="flex-auto font-semibold text-gray-900">
                                    {country.language}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </PopoverPanel>
        </Popover>
    )
}