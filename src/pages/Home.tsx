import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden bg-background">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-container blur-[100px] rounded-full animate-float"></div>
        </div>

        <div className="max-w-container-max mx-auto w-full relative z-10 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container-low border border-outline-variant/40 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
            </span>
            <span className="font-label-md text-label-md text-primary-container tracking-wider uppercase">
              Active &amp; Available for Projects
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8 leading-tight">
            Building Powerful <br />
            <span className="text-primary-container">Full-Stack Apps</span> <br />
            with React &amp; .NET Core.
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-3xl">
            Engineering high-performance web applications that combine responsive user interfaces with reliable server-side logic and seamless data management.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="bg-primary-container text-on-primary px-8 py-4 font-label-lg text-label-lg font-bold rounded-xl hover:shadow-lg hover:shadow-primary-container/20 transition-all flex items-center gap-2"
            >
              View Projects <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
            <Link
              to="/resume"
              className="border border-outline-variant text-on-surface px-8 py-4 font-label-lg text-label-lg font-bold rounded-xl hover:bg-surface-container-low transition-all"
            >
              View CV
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low/80 ">
        <div className="max-w-container-max mx-auto">
          <div className="mb-16 text-center mx-auto">
            <h2 className="font-headline-md  text-headline-md text-on-surface mb-4">Core Tech Skills</h2>
            <p className="font-body-md text-body-md text-on-surface-variant ">
              Focused on building interactive interfaces and efficient data solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {/* React Card */}
            <div className="glass-panel p-8 rounded-xl border border-outline-variant/40 hover:border-primary-container/50 transition-all group">
              <div className="w-12 h-12 mb-6 bg-primary-container/5 rounded-lg flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[32px]">web</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">User Interfaces</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Highly responsive React components designed for optimal user engagement.
              </p>
            </div>

            {/* .NET Card */}
            <div className="glass-panel p-8 rounded-xl border border-outline-variant/40 hover:border-primary-container/50 transition-all group">
              <div className="w-12 h-12 mb-6 bg-primary-container/5 rounded-lg flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[32px]">settings_input_component</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">.NET Core</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Clean server-side development for secure and efficient business logic.
              </p>
            </div>

            {/* SQL Server */}
            <div className="glass-panel p-8 rounded-xl border border-outline-variant/40 hover:border-primary-container/50 transition-all group">
              <div className="w-12 h-12 mb-6 bg-primary-container/5 rounded-lg flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[32px]">database</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Data Management</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Expert database design and optimization using SQL Server for data integrity.
              </p>
            </div>

            {/* Fullstack */}
            <div className="glass-panel p-8 rounded-xl border border-outline-variant/40 hover:border-primary-container/50 transition-all group">
              <div className="w-12 h-12 mb-6 bg-primary-container/5 rounded-lg flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[32px]">layers</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Full-Stack Flow</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Streamlined integration between frontend views and backend data sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="font-headline-sm text-headline-sm text-primary-container mb-2 text-center leading-tight">Responsive Design</div>
              <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Mobile-first builds</div>
            </div>
            <div className="text-center">
              <div className="font-headline-sm text-headline-sm text-primary-container mb-2 text-center leading-tight">Data Visualization</div>
              <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Interactive insights</div>
            </div>
            <div className="text-center">
              <div className="font-headline-sm text-headline-sm text-primary-container mb-2 text-center leading-tight">Fullstack Development</div>
              <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">End-to-end builds</div>
            </div>
            <div className="text-center">
              <div className="font-headline-sm text-headline-sm text-primary-container mb-2 text-center leading-tight">Server Logic</div>
              <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Secure data handling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Gallery */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low/80">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Selected Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Full-stack dashboards and administrative tools.
              </p>
            </div>
            <Link
              to="/projects"
              className="font-label-lg text-label-lg text-primary-container flex items-center gap-2 hover:underline font-bold"
            >
              Explore All <span className="material-symbols-outlined">north_east</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project 1 Visualization */}
            <Link to="/projects/omnianalytics" className="group block text-left">
              <div className="relative aspect-video mb-8 overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02] duration-300">
                {/* SVG Line Chart Mockup */}
                <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                  <rect className="text-primary/5" fill="currentColor" height="200" rx="12" width="400" x="0" y="0"></rect>
                  <g className="text-outline-variant">
                    <line stroke="currentColor" strokeDasharray="4" x1="0" x2="400" y1="180" y2="180"></line>
                    <line stroke="currentColor" strokeDasharray="4" x1="0" x2="400" y1="140" y2="140"></line>
                    <line stroke="currentColor" strokeDasharray="4" x1="0" x2="400" y1="100" y2="100"></line>
                    <line stroke="currentColor" strokeDasharray="4" x1="0" x2="400" y1="60" y2="60"></line>
                  </g>
                  <path
                    className="text-primary fill-none"
                    d="M0 180 L50 140 L100 160 L150 100 L200 120 L250 40 L300 80 L350 20 L400 60"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  ></path>
                  <circle className="text-primary" cx="250" cy="40" fill="white" r="6" stroke="currentColor" strokeWidth="2"></circle>
                </svg>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-[11px] text-primary border border-primary/20 font-bold">
                    REACT
                  </span>
                  <span className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-[11px] text-primary border border-primary/20 font-bold">
                    TYPESCRIPT
                  </span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors mb-3 flex items-center gap-2">
                OmniAnalytics Engine
                <span className="material-symbols-outlined text-[20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_right_alt</span>
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                High-fidelity visualization engine processing complex user interaction data. Optimized for real-time reporting.
              </p>
            </Link>

            {/* Project 2 Visualization */}
            <Link to="/projects/retail-storefront" className="group block text-left">
              <div className="relative aspect-video mb-8 overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02] duration-300">
                {/* SVG eCommerce / Shopping Bag / Payment Mockup */}
                <svg className="w-full h-full drop-shadow-sm text-primary" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                  <rect className="text-primary/5" fill="currentColor" height="200" rx="12" width="400" x="0" y="0"></rect>
                  {/* Shopping Bag Icon Grid */}
                  <g transform="translate(160, 45)" className="text-primary">
                    <rect x="15" y="30" width="50" height="55" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M25 35 C25 15, 55 15, 55 35" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="30" cy="45" r="3" fill="currentColor" />
                    <circle cx="50" cy="45" r="3" fill="currentColor" />
                    <path d="M35 55 Q40 60 45 55" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  {/* Floating cards */}
                  <rect x="70" y="110" width="110" height="50" rx="6" fill="white" stroke="#c7c4d8" strokeWidth="1.5" />
                  <circle cx="95" cy="135" r="10" fill="var(--color-primary-fixed)" />
                  <path d="M91 135 L94 138 L99 133" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="115" y="125" width="50" height="6" rx="3" fill="#e2e7ff" />
                  <rect x="115" y="137" width="30" height="5" rx="2.5" fill="#e2e7ff" />

                  <rect x="220" y="110" width="110" height="50" rx="6" fill="white" stroke="#c7c4d8" strokeWidth="1.5" />
                  <rect x="235" y="125" width="45" height="6" rx="3" fill="var(--color-primary-fixed)" />
                  <rect x="235" y="137" width="25" height="5" rx="2.5" fill="#e2e7ff" />
                  <text x="315" y="138" textAnchor="end" className="font-mono text-[11px] font-bold fill-primary">$299.00</text>
                </svg>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-[11px] text-primary border border-primary/20 font-bold">
                    REACT
                  </span>
                  <span className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-[11px] text-primary border border-primary/20 font-bold">
                    STRIPE
                  </span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors mb-3 flex items-center gap-2">
                Retail Storefront
                <span className="material-symbols-outlined text-[20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_right_alt</span>
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Feature-rich digital storefront with fully integrated secure checkout, dynamic product catalog, and real-time inventory synchronization.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
