import { useState } from 'react';
import { Link } from 'react-router-dom';

type TimeRange = '24h' | '7d' | '30d';
type MetricType = 'views' | 'conversions' | 'revenue';

interface ChartPoint {
  label: string;
  views: number;
  conversions: number;
  revenue: number;
}

export default function OmniAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [activeMetric, setActiveMetric] = useState<MetricType>('views');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // High-fidelity mockup data
  const data: Record<TimeRange, ChartPoint[]> = {
    '24h': [
      { label: '00:00', views: 120, conversions: 12, revenue: 150 },
      { label: '04:00', views: 80, conversions: 8, revenue: 95 },
      { label: '08:00', views: 250, conversions: 35, revenue: 420 },
      { label: '12:00', views: 480, conversions: 62, revenue: 780 },
      { label: '16:00', views: 390, conversions: 48, revenue: 590 },
      { label: '20:00', views: 210, conversions: 28, revenue: 340 },
    ],
    '7d': [
      { label: 'Mon', views: 1200, conversions: 154, revenue: 1950 },
      { label: 'Tue', views: 1450, conversions: 182, revenue: 2300 },
      { label: 'Wed', views: 1100, conversions: 128, revenue: 1600 },
      { label: 'Thu', views: 1900, conversions: 245, revenue: 3100 },
      { label: 'Fri', views: 2200, conversions: 290, revenue: 3800 },
      { label: 'Sat', views: 1600, conversions: 198, revenue: 2500 },
      { label: 'Sun', views: 1300, conversions: 162, revenue: 2100 },
    ],
    '30d': [
      { label: 'W1', views: 7200, conversions: 890, revenue: 11500 },
      { label: 'W2', views: 8900, conversions: 1120, revenue: 14800 },
      { label: 'W3', views: 9500, conversions: 1240, revenue: 16200 },
      { label: 'W4', views: 11200, conversions: 1510, revenue: 19800 },
    ],
  };

  const currentPoints = data[timeRange];
  const maxValue = Math.max(...currentPoints.map(p => p[activeMetric]));

  // SVG dimensions
  const width = 600;
  const height = 240;
  const padding = 40;

  // Chart coordinates calculator
  const pointsCoords = currentPoints.map((p, index) => {
    const x = padding + (index * (width - 2 * padding)) / (currentPoints.length - 1);
    const y = height - padding - (p[activeMetric] / maxValue) * (height - 2 * padding);
    return { x, y, ...p };
  });

  // SVG Path generator
  let pathD = '';
  if (pointsCoords.length > 0) {
    pathD = `M ${pointsCoords[0].x} ${pointsCoords[0].y} ` +
      pointsCoords.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  }

  // Quick stats summary calculations
  const totalViews = currentPoints.reduce((acc, p) => acc + p.views, 0);
  const totalConversions = currentPoints.reduce((acc, p) => acc + p.conversions, 0);
  const totalRevenue = currentPoints.reduce((acc, p) => acc + p.revenue, 0);

  const trafficSources = [
    { name: 'Organic Search', value: 45, color: 'bg-cyan-500' },
    { name: 'Direct Traffic', value: 30, color: 'bg-blue-500' },
    { name: 'Social Referral', value: 15, color: 'bg-purple-500' },
    { name: 'Email Campaign', value: 10, color: 'bg-slate-700' },
  ];

  const recentEvents = [
    { id: 1, type: 'conversion', text: 'New order placed #1084', time: '2 mins ago', icon: 'shopping_cart' },
    { id: 2, type: 'signup', text: 'User registration completed', time: '12 mins ago', icon: 'person_add' },
    { id: 3, type: 'alert', text: 'Spike in API traffic detected', time: '45 mins ago', icon: 'error_outline' },
    { id: 4, type: 'report', text: 'Weekly analytics report generated', time: '1 hr ago', icon: 'analytics' },
  ];

  return (
    <div className="w-full bg-slate-950 min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop text-slate-100 font-sans">

      {/* Standalone Project Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between text-slate-100">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="material-symbols-outlined text-cyan-400 text-[20px] sm:text-[22px]">monitoring</span>
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">OMNI // ANALYTICS</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </div>
        <Link 
          to="/projects" 
          className="flex items-center gap-1 px-2.5 py-1.5 sm:gap-1.5 sm:px-3.5 sm:py-1.5 rounded-lg border border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="inline sm:hidden">Portfolio</span>
        </Link>
      </nav>

      <div className="max-w-[1200px] mx-auto">

        {/* Navigation Breadcrumb styled for dark theme */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-slate-500">
          <Link to="/projects" className="hover:text-cyan-400 transition-colors uppercase">
            Projects
          </Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-cyan-400 uppercase font-bold">OmniAnalytics</span>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight mb-2 text-slate-50">
              OmniAnalytics Engine
            </h1>
            <p className="font-body-md text-body-md text-slate-400 ">
              Real-time user engagement and core product sales metrics visualizer. Toggle active metrics and time scales.
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-sm">
            {(['24h', '7d', '30d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => { setTimeRange(range); setHoveredIndex(null); }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Main KPIs Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

          {/* Views KPI */}
          <div
            onClick={() => setActiveMetric('views')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${activeMetric === 'views'
                ? 'bg-slate-900/50 border-cyan-500 shadow-md shadow-cyan-500/5'
                : 'bg-slate-900/20 border-slate-900 hover:border-slate-800 hover:bg-slate-900/30'
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-md text-label-md text-slate-400 uppercase tracking-wider">Page Views</span>
              <span className="material-symbols-outlined text-cyan-400 text-[20px]">visibility</span>
            </div>
            <p className="font-headline-md text-headline-md font-bold text-slate-100">{totalViews.toLocaleString()}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-emerald-500 font-label-md text-[11px] font-bold">↑ 12.4%</span>
              <span className="text-slate-500 font-body-sm text-[11px]">vs last period</span>
            </div>
          </div>

          {/* Conversions KPI */}
          <div
            onClick={() => setActiveMetric('conversions')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${activeMetric === 'conversions'
                ? 'bg-slate-900/50 border-cyan-500 shadow-md shadow-cyan-500/5'
                : 'bg-slate-900/20 border-slate-900 hover:border-slate-800 hover:bg-slate-900/30'
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-md text-label-md text-slate-400 uppercase tracking-wider">Conversions</span>
              <span className="material-symbols-outlined text-cyan-400 text-[20px]">leaderboard</span>
            </div>
            <p className="font-headline-md text-headline-md font-bold text-slate-100">{totalConversions.toLocaleString()}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-emerald-500 font-label-md text-[11px] font-bold">↑ 8.1%</span>
              <span className="text-slate-500 font-body-sm text-[11px]">vs last period</span>
            </div>
          </div>

          {/* Revenue KPI */}
          <div
            onClick={() => setActiveMetric('revenue')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${activeMetric === 'revenue'
                ? 'bg-slate-900/50 border-cyan-500 shadow-md shadow-cyan-500/5'
                : 'bg-slate-900/20 border-slate-900 hover:border-slate-800 hover:bg-slate-900/30'
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-md text-label-md text-slate-400 uppercase tracking-wider">Gross Revenue</span>
              <span className="material-symbols-outlined text-cyan-400 text-[20px]">payments</span>
            </div>
            <p className="font-headline-md text-headline-md font-bold text-slate-100">${totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-emerald-500 font-label-md text-[11px] font-bold">↑ 15.7%</span>
              <span className="text-slate-500 font-body-sm text-[11px]">vs last period</span>
            </div>
          </div>

        </div>

        {/* Visual Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Chart Container */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-50 capitalize">
                {activeMetric} trend line
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
                <span className="font-label-md text-label-md text-slate-400">Active Metric</span>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="relative w-full h-[260px] flex items-center justify-center">
              <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
                {/* Horizontal Guide Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                  const y = padding + ratio * (height - 2 * padding);
                  const val = maxValue * (1 - ratio);
                  return (
                    <g key={index} className="opacity-20">
                      <line
                        x1={padding}
                        y1={y}
                        x2={width - padding}
                        y2={y}
                        stroke="#475569"
                        strokeWidth="1"
                        strokeDasharray="4"
                      />
                      <text
                        x={padding - 10}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-slate-400 font-mono text-[9px]"
                      >
                        {activeMetric === 'revenue' ? `$${Math.round(val)}` : Math.round(val)}
                      </text>
                    </g>
                  );
                })}

                {/* Connection Path */}
                {pathD && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data Points Hover Circles */}
                {pointsCoords.map((pt, index) => (
                  <g key={index}>
                    {/* Vertical hover guide bar */}
                    {hoveredIndex === index && (
                      <line
                        x1={pt.x}
                        y1={padding}
                        x2={pt.x}
                        y2={height - padding}
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        strokeDasharray="2"
                        className="opacity-50"
                      />
                    )}
                    {/* Visual point dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredIndex === index ? 6 : 4}
                      className={`${hoveredIndex === index
                          ? 'fill-cyan-400 stroke-slate-950'
                          : 'fill-slate-950 stroke-cyan-400'
                        } cursor-pointer transition-all`}
                      strokeWidth="2.5"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                    {/* Axis Labels */}
                    <text
                      x={pt.x}
                      y={height - padding + 18}
                      textAnchor="middle"
                      className="fill-slate-400 font-label-md text-[10px]"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Dynamic Interactive Tooltip Box */}
              {hoveredIndex !== null && (
                <div
                  className="absolute bg-slate-900/95 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl shadow-lg flex flex-col gap-1 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 text-slate-100"
                  style={{
                    left: `${((pointsCoords[hoveredIndex].x - padding) / (width - 2 * padding)) * 88 + 6}%`,
                    top: `${((pointsCoords[hoveredIndex].y - padding) / (height - 2 * padding)) * 70 + 10}%`,
                  }}
                >
                  <span className="font-label-md text-[10px] text-slate-400 uppercase tracking-wider">
                    {pointsCoords[hoveredIndex].label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="font-body-md text-[13px] font-bold text-slate-50">
                      {activeMetric === 'revenue' ? '$' : ''}
                      {pointsCoords[hoveredIndex][activeMetric].toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Traffic Sources & Info Panels */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-50 mb-6">Traffic Channels</h3>
              <div className="flex flex-col gap-5">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-200">{source.name}</span>
                      <span className="text-slate-400">{source.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden w-full border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${source.color}`}
                        style={{ width: `${source.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-5 mt-6">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Top Region: North America</span>
                <span className="text-cyan-400 font-bold font-mono">54% Share</span>
              </div>
            </div>
          </div>

        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 shadow-sm mt-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h3 className="font-headline-sm text-[18px] font-bold text-slate-200">Live Event Stream</h3>
            </div>
            <span className="text-[11px] font-bold font-label-md text-cyan-400 tracking-wider uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              System Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentEvents.map((evt) => (
              <div key={evt.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">{evt.icon}</span>
                </div>
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  <p className="text-xs font-semibold text-slate-200 truncate leading-tight">{evt.text}</p>
                  <span className="font-label-md text-[10px] text-slate-500">{evt.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
