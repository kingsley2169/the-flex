'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/hooks/zustand-hook';
import { customerCredentials, landlordCredentials } from '@/lib/authCredentials';
import Image from 'next/image';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const { login } = useStore();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (email === landlordCredentials.email && password === landlordCredentials.password) {
            login('landlord');
            router.push('/dashboard');
        } else if (email === customerCredentials.email && password === customerCredentials.password) {
            login('guest');
            router.push('/property/prop_001'); 
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="text-center">
                <Image
                    src="/logo.webp"
                    alt="The Flex Logo"
                    width={120}
                    height={34}
                    className="mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-sm text-gray-500">Sign in to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="my-1 block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black focus:border-2 sm:text-sm"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="my-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black focus:border-2 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#284E4C] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:cursor-pointer">
                        Sign In
                    </button>
                </div>
            </form>
            <div className="text-xs text-gray-500 text-center space-y-1 pt-4 border-t">
                <p className="font-semibold">For Demo:</p>
                <p><strong>Landlord:</strong> landlord@flexliving.com</p>
                <p><strong>Customer:</strong> customer@flexliving.com</p>
                <p><strong>Password:</strong> password123</p>
            </div>
        </div>
    );
}