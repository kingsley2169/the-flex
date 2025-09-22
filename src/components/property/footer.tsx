import SubscribeForm from "./footer-form";
import { Facebook, Headphones, Instagram, Linkedin, Mail } from "lucide-react";


export const PropertyFooter = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="w-full">
            <footer className="bg-[#284E4C] text-white font-sans mt-0">
                <div className="mx-auto px-8 py-16 font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                        <div className="lg:col-span-4 space-y-6">
                            <div>
                                <h3 
                                    className="text-lg md:text-xl font-bold mb-2 font-sans" 
                                >
                                    Join The Flex.
                                </h3>
                                <p className="text-gray-300 mb-6 font-sans">
                                    Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!
                                </p>

                            </div>
                            <SubscribeForm />
                        </div>

                        <div className="lg:col-span-2">
                            <h3 
                                className="text-lg md:text-xl font-bold mb-4 font-sans"
                                style={{
                                    font: 'Helvetica Neue, Arial, sans-serif',
                                }}
                            >
                                The Flex
                            </h3>
                            <p className="mb-4 text-gray-300 font-sans">
                                Professional property management services for landlords, flexible corporate lets for businesses and quality accommodations for short-term and long-term guests.
                            </p>
                            <div
                                className="flex space-x-4"
                            >
                                <a 
                                    href="https://www.facebook.com/theflexliving/"
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <Facebook size={20} />
                                </a>
                                <a 
                                    href="https://www.instagram.com/theflex.global/?locale=us&hl=en"
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <Instagram size={20} />
                                </a>
                                <a 
                                    href="https://www.linkedin.com/company/theflexliving"
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h3
                                className="text-lg md:text-xl font-bold mb-4 font-sans"
                                style={{
                                    font: 'Helvetica Neue, Arial, sans-serif',
                                }}
                            >
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a className="text-gray-300 hover:text-white transition-colors font-sans hover:cursor-pointer">Blog</a>
                                </li>
                                <li>
                                    <a className="text-gray-300 hover:text-white transition-colors font-sans hover:cursor-pointer">Careers</a>
                                </li>
                                <li>
                                    <a className="text-gray-300 hover:text-white transition-colors font-sans hover:cursor-pointer">Terms & Conditions</a>
                                </li>
                                <li>
                                    <a className="text-gray-300 hover:text-white transition-colors font-sans hover:cursor-pointer">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h3
                                className="text-lg md:text-xl font-bold mb-4 font-sans"
                                style={{
                                    font: 'Helvetica Neue, Arial, sans-serif',
                                }}
                            >
                                Locations
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <div className="text-gray-300 hover:text-white transition-colors font-sans cursor-pointer">London</div>
                                </li>
                                <li>
                                    <div className="text-gray-300 hover:text-white transition-colors font-sans cursor-pointer">Paris</div>
                                </li>
                                <li>
                                    <div className="text-gray-300 hover:text-white transition-colors font-sans cursor-pointer">Algiers</div>
                                </li>
                                
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
                                Contact Us
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <div className="flex items-center mb-2">
                                        <Headphones size={20} className="mr-2" />
                                        <span className="font-medium font-sans">Support Numbers</span>
                                    </div>
                                    <ul className="space-y-2">
                                        <li>
                                            <a 
                                                href="tel:+447723745646"
                                                className="flex items-center group text-gray-300 hover:text-white transition-colors"
                                            >
                                                <span className="mr-2">🇬🇧</span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium font-sans">
                                                        United Kingdom
                                                    </span>
                                                    <span className="text-sm group-hover:text-gray-100 font-sans">
                                                        +44 772 374 5646
                                                    </span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a 
                                                href="tel:+33757592241"
                                                className="flex items-center group text-gray-300 hover:text-white transition-colors"
                                            >
                                                <span className="mr-2">🇩🇿</span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium font-sans">
                                                        Algeria
                                                    </span>
                                                    <span className="text-sm group-hover:text-gray-100 font-sans">
                                                        +33 7 57 59 22 41
                                                    </span>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a 
                                                href="tel:+33644645717"
                                                className="flex items-center group text-gray-300 hover:text-white transition-colors"
                                            >
                                                <span className="mr-2">🇫🇷</span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium font-sans">
                                                        France
                                                    </span>
                                                    <span className="text-sm group-hover:text-gray-100 font-sans">
                                                        +33 6 44 64 57 17
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>  
                                </li>
                                <li className="flex items-center">
                                    <Mail size={20} className="mr-2" />
                                <a href="mailto:info@theflex.global" className="text-gray-300 hover:text-white transition-colors font-sans">info@theflex.global</a>
                                </li>                                
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-white">
                        <p className="font-sans">© {year} The Flex. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}