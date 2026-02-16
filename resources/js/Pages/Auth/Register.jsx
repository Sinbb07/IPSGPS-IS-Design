import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Sign Up" />
            
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-xl rounded-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600 text-lg">Sign in to your account or create a new one</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8">
                        <Link
                            href={route('login')}
                            className="flex-1 text-center py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                        >
                            Log In
                        </Link>
                        <Link
                            href={route('register')}
                            className="flex-1 text-center py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <form onSubmit={submit}>
                        {/* Full Name Field */}
                        <div className="mb-6">
                            <h2 className="text-gray-700 font-medium mb-2">Full Name</h2>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">- [x]</span>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.name} className="mt-2" />
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
                                    value={data.email}
                                    className="mt-1 block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                    placeholder="you@example.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
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
                                    value={data.password}
                                    className="mt-1 block w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400">(🔒)</span>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
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
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400">(🔒)</span>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Terms Agreement */}
                        <div className="mb-8">
                            <label className="flex items-center">
                                <Checkbox
                                    name="terms"
                                    checked={data.terms}
                                    onChange={(e) => setData('terms', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    I agree to the <Link href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                                </span>
                            </label>
                            <InputError message={errors.terms} className="mt-2" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-center">
                            <PrimaryButton
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 transition-all"
                                disabled={processing}
                            >
                                Create Account
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}