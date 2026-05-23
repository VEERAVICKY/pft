import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface TimeDataPoint {
  name: string;
  sales: number;
  orders: number;
  users: number;
}

interface CategoryDataPoint {
  name: string;
  value: number;
  percentage: number;
}

interface RegionDataPoint {
  name: string;
  revenue: number;
  growth: number;
}

export default function DataViz() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<string>('Electronics');

  // Sales Trend Mock Data
  const trendData: Record<'weekly' | 'monthly' | 'yearly', TimeDataPoint[]> = {
    weekly: [
      { name: 'Mon', sales: 4000, orders: 240, users: 1800 },
      { name: 'Tue', sales: 3000, orders: 198, users: 1600 },
      { name: 'Wed', sales: 2000, orders: 150, users: 1400 },
      { name: 'Thu', sales: 2780, orders: 220, users: 2000 },
      { name: 'Fri', sales: 1890, orders: 120, users: 1200 },
      { name: 'Sat', sales: 2390, orders: 170, users: 1500 },
      { name: 'Sun', sales: 3490, orders: 210, users: 1700 },
    ],
    monthly: [
      { name: 'Jan', sales: 18400, orders: 1120, users: 8900 },
      { name: 'Feb', sales: 22100, orders: 1340, users: 9500 },
      { name: 'Mar', sales: 15200, orders: 980, users: 7800 },
      { name: 'Apr', sales: 29800, orders: 1850, users: 11200 },
      { name: 'May', sales: 25400, orders: 1620, users: 10400 },
      { name: 'Jun', sales: 31000, orders: 2010, users: 12500 },
      { name: 'Jul', sales: 38200, orders: 2450, users: 14800 },
    ],
    yearly: [
      { name: '2022', sales: 182000, orders: 12400, users: 78000 },
      { name: '2023', sales: 245000, orders: 16800, users: 94000 },
      { name: '2024', sales: 320000, orders: 21500, users: 112000 },
      { name: '2025', sales: 412000, orders: 28900, users: 135000 },
    ],
  };

  // Product Categories Distribution Mock Data
  const categoryData: CategoryDataPoint[] = [
    { name: 'Electronics', value: 45000, percentage: 40 },
    { name: 'Office Supplies', value: 33750, percentage: 30 },
    { name: 'Furniture', value: 22500, percentage: 20 },
    { name: 'Accessories', value: 11250, percentage: 10 },
  ];

  // Region Revenue Mock Data
  const regionData: RegionDataPoint[] = [
    { name: 'North Region', revenue: 42000, growth: 12 },
    { name: 'East Region', revenue: 38000, growth: 18 },
    { name: 'West Region', revenue: 29000, growth: 8 },
    { name: 'South Region', revenue: 15000, growth: -5 },
  ];

  const categoryColorMap: Record<string, string> = {
    'Electronics': '#6366f1',
    'Office Supplies': '#8b5cf6',
    'Furniture': '#ec4899',
    'Accessories': '#f43f5e',
  };

  const activePoints = trendData[timeframe];
  const activeCategoryInfo = categoryData.find(cat => cat.name === selectedCategory) || categoryData[0];

  const totalSalesVal = activePoints.reduce((sum, p) => sum + p.sales, 0);
  const totalOrdersVal = activePoints.reduce((sum, p) => sum + p.orders, 0);
  const totalUsersVal = activePoints[activePoints.length - 1]?.users || 0;

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop text-slate-800 font-sans">

      {/* Standalone Project Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between text-slate-855">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="material-symbols-outlined text-indigo-600 text-[20px] sm:text-[22px]">bubble_chart</span>
          <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">DataViz Center</span>
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-100 font-bold hidden sm:inline-block">
            Analytics Module
          </span>
        </div>
        <Link
          to="/projects"
          className="flex items-center gap-1 px-2.5 py-1.5 sm:gap-1.5 sm:px-3.5 sm:py-1.5 rounded-lg border border-slate-200 text-[10px] sm:text-xs font-sans text-slate-600 hover:bg-slate-100 hover:text-indigo-650 hover:border-indigo-500/40 transition-all"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="inline sm:hidden">Portfolio</span>
        </Link>
      </nav>

      <div className="max-w-[1200px] mx-auto">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-slate-400">
          <Link to="/projects" className="hover:text-indigo-600 transition-colors uppercase">
            Projects
          </Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-indigo-600 uppercase font-bold">Data Viz Dashboard</span>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight mb-2 text-slate-900">
              Business Performance Center
            </h1>
            <p className="font-body-md text-body-md text-slate-500">
              High-fidelity analytical dashboards powered by Recharts. Explore trend areas, distribution slices, and regional growths.
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {(['weekly', 'monthly', 'yearly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-label-md text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${timeframe === t
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Cumulative Sales</span>
            <p className="font-headline-md text-3xl font-bold text-indigo-600">${totalSalesVal.toLocaleString()}</p>
            <span className="text-[11px] font-bold text-emerald-600">↑ 18.2% vs last year</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Orders Fulfilled</span>
            <p className="font-headline-md text-3xl font-bold text-slate-900">{totalOrdersVal.toLocaleString()}</p>
            <span className="text-[11px] font-bold text-emerald-600">↑ 14.5% fulfillment efficiency</span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <span className="font-label-md text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Active User Sessions</span>
            <p className="font-headline-md text-3xl font-bold text-slate-900">{totalUsersVal.toLocaleString()}</p>
            <span className="text-[11px] font-bold text-indigo-650 font-mono">LIVE tracking enabled</span>
          </div>
        </div>

        {/* Charts Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Area Chart Widget */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">Revenue &amp; Orders Trend</h3>
              <p className="text-xs text-slate-500">Continuous sales growth over the selected timeframe.</p>
            </div>

            <div className="w-full overflow-x-auto flex justify-center py-2">
              <AreaChart width={680} height={300} data={activePoints} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" vertical={false} />
                <XAxis dataKey="name" stroke="#777587" fontSize={11} fontStyle="JetBrains Mono" tickLine={false} />
                <YAxis stroke="#777587" fontSize={11} fontStyle="JetBrains Mono" tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e7ff', fontSize: '12px' }}
                  labelStyle={{ fontWeight: 'bold', color: '#131b2e' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="sales" name="Sales ($)" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="orders" name="Orders Count" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOrders)" />
              </AreaChart>
            </div>
          </div>

          {/* Regional Performance Bar Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-900 mb-1">Region Revenues</h3>
              <p className="text-xs text-slate-500 mb-6">Distribution and performance indexes.</p>
            </div>

            <div className="w-full overflow-x-auto flex justify-center py-2">
              <BarChart width={310} height={240} data={regionData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" vertical={false} />
                <XAxis dataKey="name" stroke="#777587" fontSize={10} tickLine={false} />
                <YAxis stroke="#777587" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e7ff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </div>

            <div className="border-t border-slate-200/60 pt-4 mt-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Growth Leaders</span>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-on-surface">East Region</span>
                <span className="text-emerald-600 font-mono">+18% Year/Year</span>
              </div>
            </div>
          </div>

        </div>

        {/* Product Category breakdown pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">

          {/* Pie Chart interactive slice widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-between">
            <div className="w-full text-left">
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-900 mb-1">Catalog Categories</h3>
              <p className="text-xs text-slate-500">Click segments to update detail reports.</p>
            </div>

            <div className="w-full h-[220px] flex items-center justify-center relative">
              <PieChart width={220} height={220}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  onClick={(data) => {
                    const name = data?.name || data?.payload?.name;
                    if (name) {
                      setSelectedCategory(name);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={categoryColorMap[entry.name]}
                      stroke={selectedCategory === entry.name ? '#131b2e' : 'none'}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value !== undefined && value !== null ? `$${Number(value).toLocaleString()}` : ''} />
              </PieChart>
              {/* Dynamic Center Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] text-slate-500 uppercase font-label-md font-bold">Category</span>
                <span className="text-[13px] font-bold text-indigo-650 truncate max-w-[110px]">{selectedCategory}</span>
              </div>
            </div>

            {/* Labels Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center w-full pt-4 border-t border-slate-200/60">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedCategory(cat.name)}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: categoryColorMap[cat.name] }}></span>
                  <span className={`text-[10px] font-semibold ${selectedCategory === cat.name ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive details side-card */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">Category Detail Report</h3>
                  <p className="text-xs text-slate-500">Insights for the active selection segment.</p>
                </div>
                <span className="px-3 py-1 text-[11px] font-bold text-white rounded-lg font-label-md" style={{ background: categoryColorMap[selectedCategory] }}>
                  {selectedCategory.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-slate-200/60 mb-6">
                <div>
                  <span className="text-[11px] text-slate-500 font-label-md uppercase tracking-wider block mb-1">Segment Value</span>
                  <p className="text-xl font-bold font-mono">${activeCategoryInfo.value.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-label-md uppercase tracking-wider block mb-1">Catalog Share</span>
                  <p className="text-xl font-bold font-mono">{activeCategoryInfo.percentage}%</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-label-md uppercase tracking-wider block mb-1">Growth Forecast</span>
                  <p className="text-xl font-bold text-emerald-600 font-mono">+24%</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-500">
                The <span className="font-bold text-slate-900">{selectedCategory}</span> sector represents {activeCategoryInfo.percentage}% of all catalog activities. Market projections estimate sales totals to increase significantly within the East Region distribution sectors over the coming fiscal quarters.
              </p>
            </div>

            <button
              onClick={() => alert(`Exporting spreadsheet raw data for category: ${selectedCategory}`)}
              className="mt-6 w-full sm:w-fit bg-indigo-650 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-xs font-bold font-label-lg uppercase flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export Segment Ledger
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
