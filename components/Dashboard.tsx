import React, { useState } from 'react';
import {
    LayoutDashboard,
    FileCode,
    Activity,
    BookOpen,
    Shield,
    Settings,
    LogOut,
    Plus,
    Search,
    Bell,
    ChevronDown,
    Upload,
    Database,
    Code,
    CheckCircle,
    AlertTriangle,
    Key
} from 'lucide-react';

interface DashboardProps {
    onLogout: () => void;
}

const StatCard = ({ title, value, change, positive }: { title: string, value: string, change: string, positive: boolean }) => (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl shadow-sm hover:shadow-glow transition-all">
        <h3 className="text-stone-400 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
                {change}
            </div>
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'builder', icon: FileCode, label: 'API Builder' },
        { id: 'monitoring', icon: Activity, label: 'Monitoring' },
        { id: 'docs', icon: BookOpen, label: 'Documentation' },
        { id: 'security', icon: Shield, label: 'Security' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-[#020617] text-stone-200 overflow-hidden">
            {/* Sidebar */}
            <aside className={`bg-stone-900 border-r border-stone-800 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <div className="font-serif font-bold text-2xl text-white tracking-tight">AutoAPI</div>
                    ) : (
                        <div className="font-serif font-bold text-xl text-white">A</div>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-stone-500 hover:text-white">
                        <ChevronDown className={`transform transition-transform ${isSidebarOpen ? 'rotate-90' : '-rotate-90'}`} size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${activeTab === item.id
                                    ? 'bg-accent/10 text-accent border border-accent/20 shadow-glow'
                                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
                            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-stone-800">
                    <button
                        onClick={onLogout}
                        className={`w-full flex items-center px-3 py-3 rounded-lg text-stone-400 hover:bg-red-500/10 hover:text-red-400 transition-colors ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} className={isSidebarOpen ? 'mr-3' : ''} />
                        {isSidebarOpen && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-stone-900/50 backdrop-blur-md border-b border-stone-800 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center bg-stone-950 border border-stone-800 rounded-lg px-4 py-2 w-96 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
                        <Search size={18} className="text-stone-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Search APIs, logs, or documentation..."
                            className="bg-transparent border-none focus:outline-none text-sm text-white w-full placeholder-stone-600"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-stone-900"></span>
                        </button>
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-stone-900 font-bold text-xs shadow-glow">
                            JD
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"></div>
                    </div>

                    <div className="relative z-10">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fade-in-up">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-serif font-bold text-white mb-1">Dashboard Overview</h1>
                                        <p className="text-stone-400">Welcome back, John. System status is normal.</p>
                                    </div>
                                    <button className="bg-accent text-stone-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-glow">
                                        <Plus size={18} />
                                        New Project
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <StatCard title="Total APIs" value="12" change="+2 this week" positive={true} />
                                    <StatCard title="Requests Today" value="1.2M" change="+15% vs yesterday" positive={true} />
                                    <StatCard title="Avg. Latency" value="45ms" change="-12ms improvement" positive={true} />
                                    <StatCard title="Error Rate" value="0.02%" change="Stable" positive={true} />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-sm">
                                        <h3 className="font-bold text-white mb-6">Request Volume</h3>
                                        <div className="h-64 flex items-end gap-2">
                                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                                <div key={i} className="flex-1 bg-stone-800 rounded-t-sm hover:bg-accent transition-colors group relative" style={{ height: `${h}%` }}>
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-700">
                                                        {h * 1000} reqs
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-sm">
                                        <h3 className="font-bold text-white mb-6">Recent Activity</h3>
                                        <div className="space-y-6">
                                            {[
                                                { action: 'API Deployed', target: 'User Service v2', time: '2m ago', icon: CheckCircle, color: 'text-green-400' },
                                                { action: 'High Latency', target: 'Payment Gateway', time: '15m ago', icon: AlertTriangle, color: 'text-yellow-400' },
                                                { action: 'New Key', target: 'Frontend App', time: '1h ago', icon: Key, color: 'text-blue-400' },
                                                { action: 'Schema Update', target: 'Order Service', time: '3h ago', icon: FileCode, color: 'text-purple-400' },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className={`mt-1 ${item.color}`}>
                                                        <item.icon size={16} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-white">{item.action}</div>
                                                        <div className="text-xs text-stone-500">{item.target} • {item.time}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'builder' && (
                            <div className="max-w-4xl mx-auto animate-fade-in-up">
                                <div className="text-center mb-12">
                                    <h1 className="text-3xl font-serif font-bold text-white mb-4">Create New API</h1>
                                    <p className="text-stone-400">Upload your data source or schema, and AI will generate the rest.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <button className="bg-stone-900 border border-stone-800 p-8 rounded-xl hover:border-accent/50 hover:bg-stone-800 transition-all group text-left">
                                        <div className="w-12 h-12 bg-stone-800 rounded-lg flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-stone-900 transition-colors shadow-glow">
                                            <Database size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">Connect Database</h3>
                                        <p className="text-sm text-stone-400">PostgreSQL, MongoDB, MySQL, or Redis.</p>
                                    </button>
                                    <button className="bg-stone-900 border border-stone-800 p-8 rounded-xl hover:border-accent/50 hover:bg-stone-800 transition-all group text-left">
                                        <div className="w-12 h-12 bg-stone-800 rounded-lg flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-stone-900 transition-colors shadow-glow">
                                            <Code size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">Paste JSON / Schema</h3>
                                        <p className="text-sm text-stone-400">OpenAPI, GraphQL, or raw JSON data.</p>
                                    </button>
                                </div>

                                <div className="border-2 border-dashed border-stone-800 rounded-xl p-12 text-center hover:border-accent/50 hover:bg-stone-900/50 transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-500">
                                        <Upload size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">Drag and drop files here</h3>
                                    <p className="text-sm text-stone-500 mb-6">Support for .json, .yaml, .sql, .csv</p>
                                    <button className="bg-stone-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-stone-700 transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            </div>
                        )}

                        {['monitoring', 'docs', 'security', 'settings'].includes(activeTab) && (
                            <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fade-in-up">
                                <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center text-stone-600 mb-6 border border-stone-800">
                                    <Settings size={40} />
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-white mb-2">Work in Progress</h2>
                                <p className="text-stone-400 max-w-md">
                                    This section is currently being built by our autonomous agents. Check back soon.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
