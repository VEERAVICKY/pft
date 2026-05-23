import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[14px]">bolt</span>
          </div>
          <span className="text-headline-sm text-on-surface font-bold tracking-tight">
            Veera
          </span>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">
          &copy; {new Date().getFullYear()} Veera. Crafted for precision development.
        </p>

        <div className="flex gap-8">
          <a
            href="https://github.com/VEERAVICKY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/veera-brahmam-chepuri-435015247"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors"
          >
            LinkedIn
          </a>
          <Link
            to="/resume"
            className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
