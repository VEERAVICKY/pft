import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ApiKey {
    id: number;
    name: string;
    key: string;
    created: string;
}

export default function Admin() {
    // Tabs: 'profile' | 'security' | 'api'
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'api'>('profile');

    // Profile states
    const [profileName, setProfileName] = useState('Veera Brahmam Chepuri');
    const [profileEmail, setProfileEmail] = useState('veeravicky17@gmail.com');
    const [profileBio, setProfileBio] = useState('Full Stack Software Engineer specializing in React, .NET Core, and SQL Server databases.');
    const [avatar, setAvatar] = useState('bolt');
    const [isSaved, setIsSaved] = useState(false);

    // Security states
    const [twoFactor, setTwoFactor] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState('30m');
    const [loginAlerts, setLoginAlerts] = useState(true);

    // API state
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        { id: 1, name: 'Production Client Sync', key: 'pk_live_51N8x...a91c', created: '2026-05-10' },
        { id: 2, name: 'Vercel Analytics Hook', key: 'sk_test_23Fd...f022', created: '2026-05-22' },
    ]);
    const [newKeyName, setNewKeyName] = useState('');
    const [generatedKey, setGeneratedKey] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleCreateApiKey = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeyName.trim()) return;

        const rawKey = `sk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
        const newKey: ApiKey = {
            id: Date.now(),
            name: newKeyName,
            key: `${rawKey.substring(0, 8)}...${rawKey.substring(rawKey.length - 4)}`,
            created: new Date().toISOString().split('T')[0],
        };

        setApiKeys(prev => [newKey, ...prev]);
        setGeneratedKey(rawKey);
        setNewKeyName('');
    };

    const handleDeleteKey = (id: number) => {
        setApiKeys(prev => prev.filter(k => k.id !== id));
        if (generatedKey) setGeneratedKey(null);
    };

    const copyToClipboard = (id: number, text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed"; // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
            document.body.removeChild(textArea);
        }
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="w-full bg-[#fafafa] min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop text-slate-800 font-sans">

            {/* Standalone Project Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#eaeaea] px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between text-[#111111]">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="material-symbols-outlined text-rose-600 text-[20px] sm:text-[22px]">admin_panel_settings</span>
                    <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">AdminConsole</span>
                    <span className="bg-rose-50 text-rose-700 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-100 font-bold hidden sm:inline-block">
                        v1.0.0
                    </span>
                </div>
                <Link
                    to="/projects"
                    className="flex items-center gap-1 px-2.5 py-1.5 sm:gap-1.5 sm:px-3.5 sm:py-1.5 rounded-lg border border-[#eaeaea] text-[10px] sm:text-xs font-sans text-slate-600 hover:bg-[#fafafa] hover:text-rose-600 hover:border-rose-500/40 transition-all"
                >
                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    <span className="hidden sm:inline">Back to Portfolio</span>
                    <span className="inline sm:hidden">Portfolio</span>
                </Link>
            </nav>

            <div className="max-w-[1200px] mx-auto">

                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-xs font-mono text-slate-400">
                    <Link to="/projects" className="hover:text-rose-600 transition-colors uppercase">
                        Projects
                    </Link>
                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                    <span className="text-rose-600 uppercase font-bold">Account Dashboard</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight mb-2 text-[#111111]">
                        Account &amp; Admin Panel
                    </h1>
                    <p className="font-body-md text-body-md text-slate-500 ">
                        Manage developer keys, edit credentials, adjust workspace security parameters, and review connections.
                    </p>
                </div>

                {/* Dashboard layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">

                    {/* Sidebar Tabs */}
                    <div className="flex flex-row md:flex-col gap-2 bg-white border border-[#eaeaea] rounded-2xl p-3 md:p-4 shadow-sm h-fit overflow-x-auto max-w-full whitespace-nowrap">
                        <button
                            onClick={() => { setActiveTab('profile'); setGeneratedKey(null); }}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-xs font-label-lg font-bold transition-all text-center md:text-left cursor-pointer flex-1 md:flex-initial ${activeTab === 'profile'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">person</span>
                            Profile Details
                        </button>
                        <button
                            onClick={() => { setActiveTab('security'); setGeneratedKey(null); }}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-xs font-label-lg font-bold transition-all text-center md:text-left cursor-pointer flex-1 md:flex-initial ${activeTab === 'security'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">security</span>
                            Security &amp; Auth
                        </button>
                        <button
                            onClick={() => { setActiveTab('api'); setGeneratedKey(null); }}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-xs font-label-lg font-bold transition-all text-center md:text-left cursor-pointer flex-1 md:flex-initial ${activeTab === 'api'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">key</span>
                            Developer APIs
                        </button>
                    </div>

                    {/* Main Panel */}
                    <div className="md:col-span-3 bg-white border border-[#eaeaea] rounded-2xl p-6 md:p-8 shadow-sm">

                        {/* Tab 1: Profile Details */}
                        {activeTab === 'profile' && (
                            <form onSubmit={handleProfileSave} className="space-y-6">
                                <div>
                                    <h3 className="font-headline-sm text-[18px] font-bold text-[#111111] mb-1">Developer Profile</h3>
                                    <p className="text-xs text-slate-400">Update user settings and avatar layout.</p>
                                </div>

                                {/* Avatar select */}
                                <div className="flex items-center gap-6 py-2">
                                    <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                                        <span className="material-symbols-outlined text-[36px]">{avatar}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-2 font-label-md">
                                            Select Icon Avatar
                                        </label>
                                        <div className="flex gap-2">
                                            {['bolt', 'code', 'database', 'terminal', 'rocket'].map(icon => (
                                                <button
                                                    key={icon}
                                                    type="button"
                                                    onClick={() => setAvatar(icon)}
                                                    className={`w-9 h-9 border rounded-lg flex items-center justify-center transition-all cursor-pointer ${avatar === icon
                                                        ? 'border-rose-600 text-rose-600 bg-rose-50 font-bold shadow-sm'
                                                        : 'border-[#eaeaea] text-slate-400 hover:text-slate-700 hover:border-slate-300'
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={profileName}
                                            onChange={(e) => setProfileName(e.target.value)}
                                            className="w-full bg-[#fafafa] border border-[#eaeaea] rounded-lg p-2.5 text-sm outline-none focus:border-rose-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={profileEmail}
                                            onChange={(e) => setProfileEmail(e.target.value)}
                                            className="w-full bg-[#fafafa] border border-[#eaeaea] rounded-lg p-2.5 text-sm outline-none focus:border-rose-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                        Biography
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={profileBio}
                                        onChange={(e) => setProfileBio(e.target.value)}
                                        className="w-full bg-[#fafafa] border border-[#eaeaea] rounded-lg p-2.5 text-sm outline-none focus:border-rose-500 resize-none leading-relaxed"
                                    ></textarea>
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-[#eaeaea]">
                                    <button
                                        type="submit"
                                        className="bg-rose-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors text-xs font-label-lg uppercase cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                    {isSaved && (
                                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            Profile saved successfully!
                                        </span>
                                    )}
                                </div>
                            </form>
                        )}

                        {/* Tab 2: Security & Auth */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-headline-sm text-[18px] font-bold text-[#111111] mb-1">Security Configuration</h3>
                                    <p className="text-xs text-slate-400">Update active authentication parameters.</p>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {/* Toggle 2FA */}
                                    <div className="flex justify-between items-center py-4">
                                        <div>
                                            <span className="text-xs font-bold text-slate-800 block">Two-Factor Authentication (2FA)</span>
                                            <span className="text-[11px] text-slate-500">Add key authentication token codes.</span>
                                        </div>
                                        <button
                                            onClick={() => setTwoFactor(prev => !prev)}
                                            className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${twoFactor ? 'bg-rose-600' : 'bg-slate-200'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'
                                                }`}></div>
                                        </button>
                                    </div>

                                    {/* Toggle Login alert notifications */}
                                    <div className="flex justify-between items-center py-4">
                                        <div>
                                            <span className="text-xs font-bold text-slate-800 block">Login Security Alerts</span>
                                            <span className="text-[11px] text-slate-500">Receive alerts on foreign browser access.</span>
                                        </div>
                                        <button
                                            onClick={() => setLoginAlerts(prev => !prev)}
                                            className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${loginAlerts ? 'bg-rose-600' : 'bg-slate-200'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${loginAlerts ? 'translate-x-6' : 'translate-x-0'
                                                }`}></div>
                                        </button>
                                    </div>

                                    {/* Dropdown Session Timeout */}
                                    <div className="flex justify-between items-center py-4">
                                        <div>
                                            <span className="text-xs font-bold text-slate-800 block">Session Idle Timeout</span>
                                            <span className="text-[11px] text-slate-500">Revoke browser session credentials.</span>
                                        </div>
                                        <select
                                            value={sessionTimeout}
                                            onChange={(e) => setSessionTimeout(e.target.value)}
                                            className="bg-white border border-[#eaeaea] rounded-lg p-2 text-xs font-semibold outline-none focus:border-rose-500 cursor-pointer"
                                        >
                                            <option value="15m">15 Minutes</option>
                                            <option value="30m">30 Minutes</option>
                                            <option value="1h">1 Hour</option>
                                            <option value="24h">24 Hours</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-[#fafafa] p-4 rounded-xl border border-[#eaeaea] flex items-start gap-3 mt-4">
                                    <span className="material-symbols-outlined text-rose-600 text-[20px]">info</span>
                                    <div className="text-xs leading-relaxed text-slate-500">
                                        Your security configs were updated <span className="font-bold">just now</span>. Any active API connections remain valid until manual key regeneration.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Developer APIs */}
                        {activeTab === 'api' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-headline-sm text-[18px] font-bold text-[#111111] mb-1">Developer API Keys</h3>
                                    <p className="text-xs text-slate-400">Create and revoke live authentication tokens.</p>
                                </div>

                                {/* API Key creator */}
                                <form onSubmit={handleCreateApiKey} className="flex flex-col sm:flex-row gap-3 sm:items-end bg-[#fafafa] border border-[#eaeaea] p-4 rounded-xl">
                                    <div className="w-full sm:flex-1">
                                        <label className="block text-[10px] font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                            New Key Alias
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Local Server Dev"
                                            value={newKeyName}
                                            onChange={(e) => setNewKeyName(e.target.value)}
                                            className="w-full bg-white border border-[#eaeaea] rounded-lg p-2 text-xs outline-none focus:border-rose-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-rose-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-rose-700 transition-colors text-xs font-label-lg uppercase h-fit cursor-pointer text-center"
                                    >
                                        Generate
                                    </button>
                                </form>

                                {/* Generated Key Alert Display */}
                                {generatedKey && (
                                    <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 flex flex-col gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-amber-700 text-[18px]">warning</span>
                                            <span className="text-xs font-bold font-sans">Save Key Secret! It won't be shown again.</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-white border border-amber-200 rounded-lg p-2.5">
                                            <span className="font-mono text-xs font-semibold text-slate-800 select-all truncate max-w-[80%]">
                                                {generatedKey}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(999, generatedKey)}
                                                className="text-rose-600 hover:underline text-xs font-bold font-label-md flex items-center gap-1 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">
                                                    {copiedId === 999 ? 'check' : 'content_copy'}
                                                </span>
                                                {copiedId === 999 ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* List of active keys */}
                                <div className="space-y-4 pt-2">
                                    <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wide">Active Workspace Tokens</h4>

                                    <div className="divide-y divide-slate-100">
                                        {apiKeys.map((key) => (
                                            <div key={key.id} className="flex justify-between items-center py-4 gap-4">
                                                <div className="min-w-0">
                                                    <span className="text-xs font-bold text-slate-800 block truncate">{key.name}</span>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="font-mono text-[10px] text-slate-500 font-medium bg-[#fafafa] border border-[#eaeaea] px-1.5 py-0.5 rounded">
                                                            {key.key}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-mono">{key.created}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => copyToClipboard(key.id, `mock_full_key_string_${key.id}`)}
                                                        className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                                        title="Copy Key"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">
                                                            {copiedId === key.id ? 'check' : 'content_copy'}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteKey(key.id)}
                                                        className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                                        title="Revoke Key"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}



                    </div>

                </div>

            </div>
        </div>
    );
}
