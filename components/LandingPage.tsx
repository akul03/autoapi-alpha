import React from 'react';
import { HeroScene } from './QuantumScene';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { EvervaultCard, Icon } from './ui/evervault-card';
import { EncryptedText } from './ui/encrypted-text';
import { AuthModal } from './AuthModal';
import { ArrowDown, Check, Shield, Zap, Layout, Code, Lock, Activity, Terminal, Cpu, Globe, Server, BookOpen } from 'lucide-react';

interface LandingPageProps {
    onNavigate: (page: string) => void;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: string }) => (
    <div className="flex flex-col group animate-fade-in-up items-start p-8 bg-stone-900/50 backdrop-blur-sm rounded-xl border border-stone-800 shadow-sm hover:shadow-glow transition-all duration-300 w-full hover:border-accent/50" style={{ animationDelay: delay }}>
        <div className="p-3 rounded-lg bg-stone-800 text-accent mb-4 group-hover:bg-accent/10 transition-colors shadow-glow">
            <Icon size={24} />
        </div>
        <h3 className="font-serif text-xl text-white mb-3">{title}</h3>
        <p className="text-sm text-stone-400 leading-relaxed">{description}</p>
    </div>
);

const PricingCard = ({ title, price, features, recommended = false, onSignup }: { title: string, price: string, features: string[], recommended?: boolean, onSignup: () => void }) => (
    <div className={`flex flex-col p-8 rounded-2xl border ${recommended ? 'border-accent shadow-glow relative overflow-hidden bg-stone-900' : 'border-stone-800 bg-stone-900/50'} transition-all duration-300 hover:shadow-lg`}>
        {recommended && (
            <div className="absolute top-0 right-0 bg-accent text-stone-900 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Popular
            </div>
        )}
        <h3 className="font-serif text-2xl text-white mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold text-white">{price}</span>
            {price !== 'Custom' && <span className="text-stone-500">/month</span>}
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-stone-400">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    {feature}
                </li>
            ))}
        </ul>
        <button
            onClick={onSignup}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${recommended ? 'bg-accent text-stone-900 hover:bg-cyan-400' : 'bg-stone-800 text-white hover:bg-stone-700'}`}
        >
            {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
        </button>
    </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-stone-800 last:border-0">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-white text-lg group-hover:text-accent transition-colors">{question}</span>
                <ArrowDown className={`text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} size={20} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-stone-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    const [isAuthOpen, setIsAuthOpen] = React.useState(false);
    const [authTab, setAuthTab] = React.useState<'login' | 'signup'>('login');

    const openAuth = (tab: 'login' | 'signup') => {
        setAuthTab(tab);
        setIsAuthOpen(true);
    };

    return (
        <div className="bg-[#020617] text-stone-200">
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultTab={authTab} />

            {/* Hero Section */}
            <header className="relative min-h-screen flex items-center justify-center overflow-x-hidden py-20">
                <HeroScene />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(2,6,23,0.8)_0%,rgba(2,6,23,0.95)_100%)]" />

                <div className="relative z-30 container mx-auto px-6 text-center">
                    <div className="inline-block mb-4 px-3 py-1 border border-accent/50 text-accent text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-accent/10 shadow-glow">
                        AI-Native API Platform
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[0.9] mb-8 text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        AutoAPI – <EncryptedText text="Autonomous" className="text-white" /> <br />
                        <span className="italic font-normal text-stone-400 text-4xl md:text-6xl block mt-4">API Lifecycle Management Platform</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-400 font-light leading-relaxed mb-12">
                        Auto-generate, monitor, secure, and govern APIs — driven entirely by AI.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => openAuth('signup')}
                            className="px-8 py-4 bg-accent text-stone-900 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-glow transform hover:-translate-y-1 z-20"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => openAuth('login')}
                            className="px-8 py-4 bg-transparent text-white border border-stone-600 rounded-full font-medium hover:bg-stone-800 hover:border-accent transition-all shadow-sm z-20"
                        >
                            Try Sandbox Environment
                        </button>
                    </div>
                </div>
            </header>

            {/* Problem Section (Text Left, Image Right) */}
            <section className="py-24 bg-[#020617] border-b border-stone-900 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block mb-4 px-3 py-1 bg-red-500/10 text-red-400 text-xs tracking-widest uppercase font-bold rounded-full border border-red-500/20">
                                The Problem
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white leading-tight">
                                API Development is <br /><span className="text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]">Broken</span>
                            </h2>
                            <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                                Developers spend <strong className="text-white">40% of their time</strong> writing repetitive boilerplate, debugging connection errors, and patching security holes. It's slow, expensive, and prone to human error.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-stone-400">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0 border border-red-500/20"><ArrowDown size={14} className="rotate-180" /></div>
                                    <span>Endless boilerplate code & documentation drift</span>
                                </li>
                                <li className="flex items-center gap-3 text-stone-400">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0 border border-red-500/20"><ArrowDown size={14} className="rotate-180" /></div>
                                    <span>Security vulnerabilities from manual config</span>
                                </li>
                                <li className="flex items-center gap-3 text-stone-400">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0 border border-red-500/20"><ArrowDown size={14} className="rotate-180" /></div>
                                    <span>Slow iteration cycles blocking product teams</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/50 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                            <img
                                src="/legacy_api_chaos.png"
                                alt="Legacy API Chaos"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section (Image Left, Text Right) */}
            <section className="py-24 bg-stone-950 border-b border-stone-900 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative h-[400px] w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/50 group">
                            <div className="absolute inset-0 bg-accent/5" />
                            <img
                                src="/api_docs_json.png"
                                alt="Autonomous API Intelligence"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-block mb-4 px-3 py-1 bg-accent/20 text-accent text-xs tracking-widest uppercase font-bold rounded-full border border-accent/20 shadow-glow">
                                The Solution
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white leading-tight">
                                Autonomous <br /><span className="text-accent drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">Intelligence</span>
                            </h2>
                            <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                                AutoAPI eliminates the grunt work. Our AI engine understands your data and business logic to build, secure, and maintain your API infrastructure <strong className="text-white">autonomously</strong>.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-stone-900/50 rounded-lg border border-stone-800">
                                    <div className="text-2xl font-bold text-white mb-1">10x</div>
                                    <div className="text-xs uppercase tracking-wider text-stone-500">Faster Ship Time</div>
                                </div>
                                <div className="p-4 bg-stone-900/50 rounded-lg border border-stone-800">
                                    <div className="text-2xl font-bold text-white mb-1">0%</div>
                                    <div className="text-xs uppercase tracking-wider text-stone-500">Boilerplate Code</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="py-24 bg-[#020617]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent border border-stone-800 group-hover:border-accent/50 group-hover:shadow-glow transition-all">
                                <Zap size={32} />
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-white">AI Autogenerates APIs</h3>
                            <p className="text-stone-400">Upload data → Get production-ready APIs instantly. No boilerplate code required.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent border border-stone-800 group-hover:border-accent/50 group-hover:shadow-glow transition-all">
                                <Activity size={32} />
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-white">AI Observability</h3>
                            <p className="text-stone-400">Detect failures, latency spikes, and anomalies automatically before they impact users.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent border border-stone-800 group-hover:border-accent/50 group-hover:shadow-glow transition-all">
                                <Shield size={32} />
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-white">Security Intelligence</h3>
                            <p className="text-stone-400">Find leaked keys, vulnerabilities, and shadow APIs with continuous AI scanning.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Demo Preview */}
            <section id="demo" className="py-24 bg-stone-950 text-stone-100 overflow-hidden relative border-y border-stone-900">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="w-96 h-96 rounded-full bg-accent blur-[150px] absolute top-[-100px] left-[-100px]"></div>
                    <div className="w-96 h-96 rounded-full bg-purple-600 blur-[150px] absolute bottom-[-100px] right-[-100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white drop-shadow-lg">Experience the Future</h2>
                        <p className="text-stone-400 max-w-2xl mx-auto">See how AutoAPI transforms your workflow in real-time.</p>
                    </div>

                    <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-800 bg-stone-950/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="ml-4 px-3 py-1 bg-stone-900 rounded text-xs text-stone-500 font-mono flex-1 text-center border border-stone-800">
                                dashboard.autoapi.com
                            </div>
                        </div>
                        <div className="p-8 min-h-[400px] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
                                <div className="space-y-4">
                                    {/* Metric Card 1 */}
                                    <div className="bg-stone-900/90 p-6 rounded-xl border border-stone-800 shadow-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-stone-400 text-sm font-medium">Total Requests</p>
                                                <h4 className="text-2xl font-bold text-white mt-1">2.4M</h4>
                                            </div>
                                            <div className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                                                <Activity size={12} /> +12%
                                            </div>
                                        </div>
                                        <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent w-[70%]"></div>
                                        </div>
                                    </div>

                                    {/* Metric Card 2 */}
                                    <div className="bg-stone-900/90 p-6 rounded-xl border border-stone-800 shadow-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-stone-400 text-sm font-medium">Avg. Latency</p>
                                                <h4 className="text-2xl font-bold text-white mt-1">42ms</h4>
                                            </div>
                                            <div className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check size={12} /> Optimal
                                            </div>
                                        </div>
                                        <div className="flex gap-1 h-8 items-end">
                                            {[40, 35, 55, 42, 38, 45, 42].map((h, i) => (
                                                <div key={i} className="flex-1 bg-stone-800 hover:bg-accent/50 transition-colors rounded-sm" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Live Logs */}
                                    <div className="bg-stone-950/80 p-6 rounded-xl border border-stone-800 shadow-lg font-mono text-xs h-full">
                                        <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-2">
                                            <span className="text-stone-400">Live Traffic</span>
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                                <span className="text-accent">Connected</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3 overflow-hidden">
                                            <div className="flex gap-3 text-stone-500">
                                                <span className="text-stone-600">10:42:01</span>
                                                <span className="text-emerald-400">GET</span>
                                                <span className="text-stone-300">/api/v1/users</span>
                                                <span className="ml-auto text-emerald-400">200 OK</span>
                                            </div>
                                            <div className="flex gap-3 text-stone-500">
                                                <span className="text-stone-600">10:42:03</span>
                                                <span className="text-blue-400">POST</span>
                                                <span className="text-stone-300">/api/v1/auth</span>
                                                <span className="ml-auto text-blue-400">201 Created</span>
                                            </div>
                                            <div className="flex gap-3 text-stone-500">
                                                <span className="text-stone-600">10:42:04</span>
                                                <span className="text-emerald-400">GET</span>
                                                <span className="text-stone-300">/api/v1/products</span>
                                                <span className="ml-auto text-emerald-400">200 OK</span>
                                            </div>
                                            <div className="flex gap-3 text-stone-500 opacity-50">
                                                <span className="text-stone-600">10:42:05</span>
                                                <span className="text-yellow-400">PUT</span>
                                                <span className="text-stone-300">/api/v1/settings</span>
                                                <span className="ml-auto text-yellow-400">202 Accepted</span>
                                            </div>
                                            <div className="flex gap-3 text-stone-500 opacity-30">
                                                <span className="text-stone-600">10:42:08</span>
                                                <span className="text-emerald-400">GET</span>
                                                <span className="text-stone-300">/api/v1/analytics</span>
                                                <span className="ml-auto text-emerald-400">200 OK</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-stone-800 bg-stone-950/50 text-center">
                            <button
                                onClick={() => onNavigate('dashboard')}
                                className="px-6 py-2 bg-accent text-stone-900 rounded-lg text-sm font-bold hover:bg-cyan-400 transition-colors shadow-glow"
                            >
                                Try Sandbox Environment
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-[#020617]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">How It Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-stone-800 -z-10"></div>

                        {[
                            { step: "01", title: "Upload", desc: "Connect your DB or upload code/JSON." },
                            { step: "02", title: "Generate", desc: "AI analyzes and builds the API instantly." },
                            { step: "03", title: "Monitor", desc: "Traffic is analyzed for anomalies." },
                            { step: "04", title: "Deploy", desc: "Push to production with one click." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center bg-[#020617]">
                                <div className="w-24 h-24 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center text-2xl font-serif font-bold text-accent shadow-glow mb-6 z-10">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                                <p className="text-sm text-stone-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid (Hover Effect) */}
            <section className="py-24 bg-stone-950 border-t border-stone-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Everything You Need</h2>
                        <p className="text-stone-400 max-w-2xl mx-auto">Complete toolkit for the modern API lifecycle.</p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <HoverEffect items={[
                            {
                                title: "AI Generates APIs Automatically",
                                description: "Upload a dataset, schema, model, or service → AutoAPI instantly creates production-ready APIs, routes, and docs. No boilerplate.",
                            },
                            {
                                title: "Autonomous Observability",
                                description: "Continuously monitors Traffic, Errors, Latency, Patterns, and Anomalies. It alerts you before an API breaks — not after.",
                            },
                            {
                                title: "AI-Powered Security Intelligence",
                                description: "Actively detects leaked keys, suspicious traffic, vulnerable endpoints, and shadow APIs. Like a security analyst built-in.",
                            },
                            {
                                title: "Auto-Documentation & SDKs",
                                description: "Generates Swagger/OpenAPI, Code samples, SDKs, and migration notes automatically. Documentation never becomes stale.",
                            },
                            {
                                title: "Visual API Composer",
                                description: "Combine APIs, transform data, and build workflows visually without writing a single line of backend code.",
                            },
                            {
                                title: "End-to-End Governance",
                                description: "Rate limits, access control, auth, versioning, deprecation, and lifecycle rules — all enforced automatically.",
                            }
                        ]} />
                    </div>
                </div>
            </section>
            {/* Pricing */}
            <section className="py-24 bg-[#020617]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Simple Pricing</h2>
                        <p className="text-stone-400">Start free, scale as you grow.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <PricingCard
                            title="Starter"
                            price="$0"
                            features={["1 Project", "Basic API Generator", "Limited Monitoring", "Community Support"]}
                            onSignup={() => onNavigate('signup')}
                        />
                        <PricingCard
                            title="Pro"
                            price="$29"
                            features={["Unlimited APIs", "Advanced Monitoring", "API Composer", "SDK Generator", "Email Support"]}
                            recommended={true}
                            onSignup={() => onNavigate('signup')}
                        />
                        <PricingCard
                            title="Enterprise"
                            price="Custom"
                            features={["SSO & Audit Logs", "On-prem / VPC", "SLA Guarantee", "Dedicated Account Manager", "24/7 Priority Support"]}
                            onSignup={() => onNavigate('signup')}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-stone-950 border-t border-stone-900">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-2">
                        <FAQItem question="How does the AI generator work?" answer="Our AI analyzes your data schema or code and automatically generates REST or GraphQL endpoints, complete with validation and documentation." />
                        <FAQItem question="Can I host on my own infrastructure?" answer="Yes! The Enterprise plan supports on-premise and VPC deployments for maximum security and compliance." />
                        <FAQItem question="What languages are supported for SDKs?" answer="We currently support TypeScript, Python, Go, Java, C#, PHP, and Ruby. More coming soon." />
                        <FAQItem question="Is there a free trial?" answer="Yes, the Starter plan is free forever. You can also try Pro features with a 14-day free trial." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#020617] text-stone-400 py-16 border-t border-stone-900">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="text-white font-serif font-bold text-2xl mb-4">AutoAPI</div>
                        <p className="text-sm mb-6">The first autonomous API lifecycle management platform driven by AI.</p>
                        <div className="flex gap-4">
                            {/* Social icons placeholders */}
                            <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center hover:bg-accent hover:text-stone-900 transition-colors cursor-pointer"><Globe size={16} /></div>
                            <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center hover:bg-accent hover:text-stone-900 transition-colors cursor-pointer"><Terminal size={16} /></div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-accent cursor-pointer transition-colors">Features</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Integrations</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Pricing</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Changelog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-accent cursor-pointer transition-colors">Documentation</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">API Reference</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Community</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Blog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Security</li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-12 pt-8 border-t border-stone-900 text-center text-xs text-stone-600">
                    © 2025 AutoAPI Inc. All rights reserved.
                </div>
            </footer>
        </div >
    );
};
