import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

    // Reset tab when modal opens/closes if needed, or just keep state
    // For now, we'll let the user switch tabs freely.

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-stone-950 border border-stone-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Header / Tabs */}
                            <div className="flex border-b border-stone-800">
                                <button
                                    onClick={() => setActiveTab('login')}
                                    className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'login' ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                                        }`}
                                >
                                    Login
                                    {activeTab === 'login' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('signup')}
                                    className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'signup' ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                                        }`}
                                >
                                    Sign Up
                                    {activeTab === 'signup' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-serif text-white mb-2">
                                        {activeTab === 'login' ? 'Welcome Back' : 'Start Building'}
                                    </h2>
                                    <p className="text-stone-400 text-sm">
                                        {activeTab === 'login'
                                            ? 'Enter your credentials to access your dashboard.'
                                            : 'Create an account to automate your API lifecycle.'}
                                    </p>
                                </div>

                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    {activeTab === 'signup' && (
                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-wider text-stone-500 font-bold">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full bg-stone-900/50 border border-stone-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-stone-500 font-bold">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                                            <input
                                                type="email"
                                                placeholder="name@company.com"
                                                className="w-full bg-stone-900/50 border border-stone-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-stone-500 font-bold">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full bg-stone-900/50 border border-stone-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button className="w-full bg-accent text-stone-900 font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 mt-6">
                                        {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight size={18} />
                                    </button>
                                </form>

                                <div className="mt-6 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-stone-800"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-stone-950 px-2 text-stone-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 py-2.5 border border-stone-800 rounded-lg text-stone-400 hover:bg-stone-900 hover:text-white transition-colors">
                                        <Github size={18} />
                                        <span className="text-sm font-medium">GitHub</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-2.5 border border-stone-800 rounded-lg text-stone-400 hover:bg-stone-900 hover:text-white transition-colors">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="text-sm font-medium">Google</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
