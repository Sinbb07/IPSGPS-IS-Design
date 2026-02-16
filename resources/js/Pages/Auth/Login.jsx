import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }) {
    const [isLogin, setIsLogin] = useState(true);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const registerForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submitLogin = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const submitRegister = (e) => {
        e.preventDefault();
        registerForm.post(route('register'));
    };

    return (
        <>
            <Head title={isLogin ? "Log in" : "Sign Up"} />
            
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header with Logo */}
                <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Simple Text Logo */}
                            <div className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    YourApp
                                </span>
                            </div>
                            {/* Navigation Buttons */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                        isLogin 
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                        !isLogin 
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                    <div className="w-full sm:max-w-md">
                        {/* Welcome Text */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-600 text-lg">Sign in to your account or create a new one</p>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white shadow-xl rounded-2xl px-8 py-8">
                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                            {/* Login Form */}
                            {isLogin ? (
                                <form onSubmit={submitLogin}>
                                    {/* Email Field */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium mb-2" />
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">☑️</span>
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                                placeholder="you@example.com"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium mb-2" />
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">☑️</span>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Remember Me and Forgot Password */}
                                    <div className="flex items-center justify-between mb-8">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-center">
                                        <PrimaryButton
                                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 transition-all"
                                            disabled={processing}
                                        >
                                            Log In
                                        </PrimaryButton>
                                    </div>
                                </form>
                            ) : (
                                /* Registration Form */
                                <form onSubmit={submitRegister}>
                                    {/* Full Name Field */}
                                    <div className="mb-6">
                                        <h2 className="text-gray-700 font-medium mb-2">Full Name</h2>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">- [x]</span>
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={registerForm.data.name}
                                                className="mt-1 block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                                placeholder="John Doe"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => registerForm.setData('name', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={registerForm.errors.name} className="mt-2" />
                                    </div>

                                    {/* Email Field */}
                                    <div className="mb-6">
                                        <h2 className="text-gray-700 font-medium mb-2">Email</h2>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">- [ ]</span>
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={registerForm.data.email}
                                                className="mt-1 block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                                placeholder="you@example.com"
                                                autoComplete="username"
                                                onChange={(e) => registerForm.setData('email', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={registerForm.errors.email} className="mt-2" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-6">
                                        <h2 className="text-gray-700 font-medium mb-2">Password</h2>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">- [ ]</span>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={registerForm.data.password}
                                                className="mt-1 block w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                                placeholder="Create a password"
                                                autoComplete="new-password"
                                                onChange={(e) => registerForm.setData('password', e.target.value)}
                                            />
                                            <span className="absolute right-4 top-3.5 text-gray-400">(🔒)</span>
                                        </div>
                                        <InputError message={registerForm.errors.password} className="mt-2" />
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="mb-6">
                                        <h2 className="text-gray-700 font-medium mb-2">Confirm Password</h2>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">- [ ]</span>
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={registerForm.data.password_confirmation}
                                                className="mt-1 block w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                                placeholder="Confirm your password"
                                                autoComplete="new-password"
                                                onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                            />
                                            <span className="absolute right-4 top-3.5 text-gray-400">(🔒)</span>
                                        </div>
                                        <InputError message={registerForm.errors.password_confirmation} className="mt-2" />
                                    </div>

                                    {/* Terms Agreement */}
                                    <div className="mb-8">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="terms"
                                                checked={registerForm.data.terms}
                                                onChange={(e) => registerForm.setData('terms', e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                I agree to the <Link href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                                            </span>
                                        </label>
                                        <InputError message={registerForm.errors.terms} className="mt-2" />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-center">
                                        <PrimaryButton
                                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 transition-all"
                                            disabled={registerForm.processing}
                                        >
                                            Create Account
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white/80 backdrop-blur-sm py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-gray-500">
                            © 2026 YourApp. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}