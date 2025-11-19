import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Chrome } from 'lucide-react';

interface AuthProps {
    initialView?: 'login' | 'signup';
    onLogin: () => void;
    onNavigate: (page: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ initialView = 'login', onLogin, onNavigate }) => {
    const [view, setView] = useState<'login' | 'signup'>(initialView);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate auth
        setTimeout(() => {
            onLogin();
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <button
                    onClick={() => onNavigate('landing')}
                    className="flex items-center text-stone-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-3xl text-white mb-2">
                            {view === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-stone-400">
                            {view === 'login' ? 'Enter your credentials to access your dashboard.' : 'Start building autonomous APIs in seconds.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {view === 'signup' && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500" size={18} />
                                    <input
                                        type="text"
                                        className="w-full bg-stone-950 border border-stone-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-stone-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-stone-950 border border-stone-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-stone-600"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-stone-950 border border-stone-800 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-stone-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent text-stone-900 font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all shadow-glow mt-6"
                        >
                            {view === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-stone-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-stone-900 px-2 text-stone-500">Or continue with</span>
                        </div>
                    </div>

                    <button className="w-full bg-stone-950 border border-stone-800 text-white font-medium py-3 rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                        <Chrome size={20} />
                        Google
                    </button>

                    <div className="text-center mt-8">
                        <p className="text-stone-400 text-sm">
                            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                                className="text-accent hover:text-cyan-300 font-medium transition-colors"
                            >
                                {view === 'login' ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
