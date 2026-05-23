import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    assignee: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    date: string;
}

export default function RetailOps() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Verify warehouse inventory sync', assignee: 'Jane Cooper', priority: 'high', status: 'completed', date: '2026-05-23' },
        { id: 2, title: 'Authorize pending invoice transactions', assignee: 'Cody Fisher', priority: 'medium', status: 'in-progress', date: '2026-05-23' },
        { id: 3, title: 'Optimize DB indices for sales tables', assignee: 'Veera Brahmam', priority: 'high', status: 'pending', date: '2026-05-22' },
        { id: 4, title: 'Update shipping courier API endpoints', assignee: 'Esther Howard', priority: 'low', status: 'completed', date: '2026-05-21' },
        { id: 5, title: 'Draft server load balancing strategy', assignee: 'Veera Brahmam', priority: 'medium', status: 'in-progress', date: '2026-05-20' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');

    // Filter tasks based on search query and status filter
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // KPI Calculations
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
    const pendingCount = tasks.filter(t => t.status === 'pending').length;
    const completionRate = Math.round((completedCount / tasks.length) * 100) || 0;

    // Handlers
    const handleStatusChange = (id: number, nextStatus: Task['status']) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, status: nextStatus } : task));
    };

    const handleDeleteTask = (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const handleCreateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            assignee: newTaskAssignee.trim() || 'Unassigned',
            priority: newTaskPriority,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
        };

        setTasks(prev => [newTask, ...prev]);
        setNewTaskTitle('');
        setNewTaskAssignee('');
        setNewTaskPriority('medium');
    };

    return (
        <div className="w-full bg-slate-50 min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop text-slate-800 font-sans">

            {/* Standalone Project Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between text-slate-800">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="material-symbols-outlined text-amber-650 text-[20px] sm:text-[22px]">assignment_turned_in</span>
                    <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">RetailOps Portal</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
                        {tasks.length} Active Tickets
                    </span>
                </div>
                <Link
                    to="/projects"
                    className="flex items-center gap-1 px-2.5 py-1.5 sm:gap-1.5 sm:px-3.5 sm:py-1.5 rounded-lg border border-slate-200 text-[10px] sm:text-xs font-sans text-slate-600 hover:bg-slate-50 hover:text-amber-600 hover:border-amber-500/40 transition-all"
                >
                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    <span className="hidden sm:inline">Back to Portfolio</span>
                    <span className="inline sm:hidden">Portfolio</span>
                </Link>
            </nav>

            <div className="max-w-[1200px] mx-auto">

                {/* Navigation Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-xs font-mono text-slate-400">
                    <Link to="/projects" className="hover:text-amber-600 transition-colors uppercase">
                        Projects
                    </Link>
                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                    <span className="text-amber-600 uppercase font-bold">Business Portal</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight mb-2 text-slate-900">
                        Operations &amp; Workflows
                    </h1>
                    <p className="font-body-md text-body-md text-slate-500">
                        Streamlining daily administrative operations, log integrations, and critical support incident queues.
                    </p>
                </div>

                {/* Stats Summary Panel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Total Logs</span>
                        <p className="font-headline-md text-2xl font-bold text-slate-900">{tasks.length}</p>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Pending</span>
                        <p className="font-headline-md text-2xl font-bold text-rose-600">{pendingCount}</p>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">In Progress</span>
                        <p className="font-headline-md text-2xl font-bold text-amber-600">{inProgressCount}</p>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Completion Rate</span>
                        <p className="font-headline-md text-2xl font-bold text-emerald-600">{completionRate}%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Task Creator Form */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                        <h3 className="font-headline-sm text-[18px] font-bold text-slate-900 mb-6">Create Ops Ticket</h3>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                    Task Headline
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="e.g. Database health audit"
                                    className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-sm outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                    Assignee
                                </label>
                                <input
                                    type="text"
                                    value={newTaskAssignee}
                                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                                    placeholder="e.g. Veera Brahmam"
                                    className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-sm outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-label-md">
                                    Priority
                                </label>
                                <select
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                                    className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-sm outline-none focus:border-amber-500 transition-colors cursor-pointer"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors font-label-lg text-sm flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                Submit Ticket
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Workflow Table / List */}
                    <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                        {/* Table Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 w-full">
                            {/* Search input */}
                            <div className="relative w-full sm:max-w-xs">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">
                                    search
                                </span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search tickets or developers..."
                                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none bg-slate-50 focus:border-amber-500 transition-colors"
                                />
                            </div>

                            {/* Status Filters */}
                            <div className="flex gap-1.5 border border-slate-200/60 rounded-xl p-1 bg-slate-50 overflow-x-auto max-w-full whitespace-nowrap">
                                {(['all', 'pending', 'in-progress', 'completed'] as const).map((filterVal) => (
                                    <button
                                        key={filterVal}
                                        onClick={() => setStatusFilter(filterVal)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-label-md font-bold uppercase transition-all cursor-pointer ${statusFilter === filterVal
                                                ? 'bg-white text-amber-600 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-900'
                                            }`}
                                    >
                                        {filterVal}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* List Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200/60 text-xs font-semibold text-slate-500 uppercase font-label-md">
                                        <th className="pb-3">Task details</th>
                                        <th className="pb-3">Assignee</th>
                                        <th className="pb-3">Priority</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredTasks.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-slate-400">
                                                No workflow tickets match filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTasks.map((task) => (
                                            <tr key={task.id} className="group hover:bg-slate-50/55 transition-colors">
                                                <td className="py-4 pr-3">
                                                    <div className="font-semibold text-slate-900 leading-snug">{task.title}</div>
                                                    <span className="text-[10px] text-slate-400 font-mono">{task.date}</span>
                                                </td>
                                                <td className="py-4 text-slate-650 font-medium whitespace-nowrap">{task.assignee}</td>
                                                <td className="py-4 whitespace-nowrap">
                                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold font-label-md border ${task.priority === 'high'
                                                            ? 'bg-red-50 border-red-200 text-red-700'
                                                            : task.priority === 'medium'
                                                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                                                : 'bg-slate-100 border-slate-200 text-slate-700'
                                                        }`}>
                                                        {task.priority.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 whitespace-nowrap">
                                                    <select
                                                        value={task.status}
                                                        onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                                                        className="bg-transparent border-b border-dashed border-slate-300 outline-none text-xs font-semibold text-slate-800 cursor-pointer focus:border-amber-500"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </td>
                                                <td className="py-4 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleDeleteTask(task.id)}
                                                        className="text-slate-400 hover:text-red-650 hover:scale-105 transition-all cursor-pointer"
                                                        title="Delete task"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
