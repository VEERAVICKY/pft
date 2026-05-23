import { useState } from 'react';
import { Link } from 'react-router-dom';

type ProjectCategory = 'all' | 'dashboard' | 'webapp' | 'dataviz';

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  version?: string;
  description: string;
  tags: string[];
  metaIcon: string;
  metaText: string;
  visualType: 'bars' | 'line' | 'grid-icons' | 'progress' | 'opacity-grid' | 'ecommerce';
  isLive?: boolean;
  link: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filterButtons: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Dashboards', value: 'dashboard' },
    { label: 'Web Apps', value: 'webapp' },
    { label: 'Data Viz', value: 'dataviz' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'OmniAnalytics',
      category: 'dashboard',
      categoryLabel: 'Dashboard',
      description: 'High-fidelity visualization engine processing complex user interaction data. Built with React and optimized for real-time reporting.',
      tags: ['React', 'TypeScript', 'Recharts'],
      metaIcon: 'query_stats',
      metaText: 'Data Insights',
      visualType: 'bars',
      isLive: true,
      link: '/projects/omnianalytics',
    },
    {
      id: 2,
      title: 'Business Portal',
      category: 'webapp',
      categoryLabel: 'Web Application',
      description: 'Intuitive management suite for streamlining daily operational workflows. Focuses on seamless user experience and accessibility.',
      tags: ['React.js', 'Tailwind'],
      metaIcon: 'security',
      metaText: 'User Management',
      visualType: 'line',
      link: '/projects/business-portal',
    },
    {
      id: 3,
      title: 'Retail Storefront',
      category: 'webapp',
      categoryLabel: 'eCommerce',
      description: 'Feature-rich digital storefront with fully integrated secure checkout, dynamic product catalog, and real-time inventory synchronization.',
      tags: ['React.js', 'Redux Toolkit', 'Stripe'],
      metaIcon: 'shopping_bag',
      metaText: 'Seamless Payments',
      visualType: 'ecommerce',
      isLive: false,
      link: '/projects/retail-storefront',
    },
    {
      id: 4,
      title: 'Account Dashboard',
      category: 'dashboard',
      categoryLabel: 'Admin',
      description: 'User-centric profile and setting management dashboard featuring a clean layout and comprehensive accessibility support.',
      tags: ['React', 'Recharts'],
      metaIcon: 'lock_open',
      metaText: 'User Access',
      visualType: 'opacity-grid',
      link: '/projects/admin',
    },
    {
      id: 5,
      title: 'Data Viz Center',
      category: 'dataviz',
      categoryLabel: 'Data Visualization',
      description: 'Sophisticated real-time charting dashboard rendering warehouse metrics, distribution channels, and sales performance indicators using Recharts.',
      tags: ['React', 'Recharts', 'TypeScript'],
      metaIcon: 'analytics',
      metaText: 'Visual Reports',
      visualType: 'grid-icons',
      link: '/projects/data-viz',
      isLive: false,
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-24 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-[1200px] mx-auto">

        {/* Header Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="">
              <div className="inline-block px-3 py-1 bg-primary-fixed-dim/30 text-primary font-label-md text-label-md rounded-full mb-4">
                GALLERY
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 tracking-tight ">
                Technical Portfolio
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                Developing modern web applications with minimalist precision. Explore my recent work in interface design, data visualization, and frontend development.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-6 py-2.5 rounded-full font-label-lg text-label-lg cursor-pointer transition-all duration-300 ${filter === btn.value
                    ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20'
                    : 'border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary'
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={project.link}
              className="aura-card flex flex-col h-full overflow-hidden rounded-2xl group transition-all duration-500 opacity-100 transform translate-y-0 text-left"
            >
              {/* Visual Container */}
              <div
                className={`h-56 overflow-hidden relative chart-visual-container ${project.visualType === 'bars'
                  ? 'flex items-end justify-around p-8'
                  : project.visualType === 'line'
                    ? 'flex items-center justify-center p-8'
                    : project.visualType === 'grid-icons'
                      ? 'flex items-center justify-center grid-visual p-8'
                      : project.visualType === 'progress'
                        ? 'flex flex-col items-center justify-center gap-4 p-8'
                        : project.visualType === 'opacity-grid'
                          ? 'flex flex-wrap p-4 gap-2 justify-center items-center'
                          : project.visualType === 'ecommerce'
                            ? 'flex items-center justify-center p-6 bg-surface-container-low'
                            : ''
                  }`}
              >
                {project.isLive && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-primary/20 shadow-sm font-label-md text-primary font-bold text-[10px] tracking-wider">
                    LIVE NOW
                  </div>
                )}

                {/* Bars Visual */}
                {project.visualType === 'bars' && (
                  <>
                    <div className="bar h-[40%]"></div>
                    <div className="bar h-[70%]"></div>
                    <div className="bar h-[55%]"></div>
                    <div className="bar h-[90%]"></div>
                    <div className="bar h-[65%]"></div>
                  </>
                )}

                {/* Line Visual */}
                {project.visualType === 'line' && (
                  <svg className="w-full h-32 px-4" viewBox="0 0 400 100">
                    <path
                      className="line-graph"
                      d="M0,80 L50,60 L100,75 L150,30 L200,45 L250,15 L300,40 L350,20 L400,35"
                    ></path>
                    <circle cx="50" cy="60" fill="#4f46e5" r="4"></circle>
                    <circle cx="150" cy="30" fill="#4f46e5" r="4"></circle>
                    <circle cx="250" cy="15" fill="#4f46e5" r="4"></circle>
                  </svg>
                )}

                {/* Grid Icons Visual */}
                {project.visualType === 'grid-icons' && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-surface-container-lowest/40 border border-primary/20 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">hub</span>
                    </div>
                    <div className="w-12 h-12 bg-surface-container-lowest/40 border border-primary/20 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">database</span>
                    </div>
                    <div className="w-12 h-12 bg-surface-container-lowest/40 border border-primary/20 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">sync</span>
                    </div>
                  </div>
                )}

                {/* Progress Visual */}
                {project.visualType === 'progress' && (
                  <div className="w-full px-8 flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <div className="h-1 bg-primary/20 w-full rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-3/4"></div>
                      </div>
                      <div className="h-1 bg-primary/20 w-full rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2"></div>
                      </div>
                      <div className="h-1 bg-primary/20 w-full rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-5/6"></div>
                      </div>
                    </div>
                    <div className="text-label-md text-primary/60 font-bold tracking-wider text-center">
                      LOAD PERFORMANCE: 98/100
                    </div>
                  </div>
                )}

                {/* Opacity Grid Visual */}
                {project.visualType === 'opacity-grid' && (
                  <>
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/40 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/80 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/30 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/60 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/90 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/20 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/50 border border-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20"></div>
                  </>
                )}

                {/* eCommerce Visual */}
                {project.visualType === 'ecommerce' && (
                  <div className="w-full flex items-center justify-center h-full relative">
                    <div className="w-56 bg-white border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col gap-2 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[18px]">shopping_bag</span>
                          <span className="text-[11px] font-bold text-on-surface/80 tracking-wide">Cart Items</span>
                        </div>
                        <span className="text-[12px] font-mono font-bold text-primary">$299.00</span>
                      </div>
                      <div className="h-[1px] bg-outline-variant/60 w-full my-1"></div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[16px]">credit_card</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-on-surface">Secure Checkout</span>
                            <span className="text-[8px] text-on-surface-variant font-mono">Stripe API</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-primary bg-primary-fixed-dim/30 px-2 py-0.5 rounded font-label-md font-bold">READY</span>
                      </div>
                      <div className="mt-1 w-full bg-primary text-on-primary text-[10px] font-bold text-center py-2 rounded-lg transition-colors flex items-center justify-center gap-1 hover:bg-primary-container">
                        <span>Checkout</span>
                        <span className="material-symbols-outlined text-[12px]">arrow_right_alt</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Information */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 bg-surface-container-high text-on-surface font-label-md text-label-md rounded uppercase tracking-wider">
                    {project.categoryLabel}
                  </span>
                  {project.version && (
                    <span className="text-on-surface-variant/40 font-label-md text-label-md">
                      {project.version}
                    </span>
                  )}
                </div>

                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white border border-outline-variant rounded-full font-label-md text-label-md text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-outline-variant mt-auto">
                  <span className="text-on-surface-variant font-label-md text-label-md flex items-center gap-2 font-semibold">
                    <span className="material-symbols-outlined text-[18px]">
                      {project.metaIcon}
                    </span>
                    {project.metaText}
                  </span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                    arrow_right_alt
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
