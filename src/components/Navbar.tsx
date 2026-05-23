import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
  ];

  const handleHireMe = () => {
    navigate('/resume');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop h-20 flex justify-between items-center">
        {/* Brand/Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[14px]">bolt</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary-container tracking-tighter font-bold">
            Veera
          </span>
          {/* <div className="hidden sm:block h-4 w-[1px] bg-outline-variant/50 mx-2"></div> */}
          {/* <span className="hidden sm:block font-label-md text-label-md text-on-surface-variant">
            Dev
          </span> */}
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-body-md text-body-md transition-colors pb-1 ${isActive
                  ? 'text-primary-container font-bold border-b-2 border-primary-container'
                  : 'text-on-surface-variant hover:text-primary-container'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <a
            href="mailto:veeravicky17@gmail.com"
            className="text-on-surface-variant font-body-md text-body-md hover:text-primary-container transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Action Button & Terminal/Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleHireMe}
            className="hidden sm:inline-block bg-primary text-on-primary px-6 py-2.5 font-label-lg text-label-lg rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-primary/10"
          >
            Hire Me
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden flex items-center justify-center p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
          }`}
      >
        <div className="px-margin-mobile py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium py-2 px-4 rounded-lg transition-colors ${isActive
                  ? 'bg-primary/5 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <a
            href="mailto:veeravicky17@gmail.com"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium py-2 px-4 rounded-lg transition-colors text-on-surface-variant hover:bg-surface-container hover:text-primary"
          >
            Contact
          </a>
          <button
            onClick={handleHireMe}
            className="w-full mt-2 bg-primary text-on-primary py-3 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}
