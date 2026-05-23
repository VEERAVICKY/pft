import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import OmniAnalytics from './pages/ProjectsDemo/OmniAnalytics';
import RetailOps from './pages/ProjectsDemo/RetailOps';
import RetailStorefront from './pages/ProjectsDemo/RetailStorefront';
import Admin from './pages/ProjectsDemo/Admin';
import DataViz from './pages/ProjectsDemo/DataViz';

// Layout wrapping the portfolio site pages to show the global navbar & footer
function PortfolioLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Integrated Portfolio Site Route Group */}
        <Route element={<PortfolioLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Route>

        {/* Standalone Project Demos (independent layouts, themes, and navbars) */}
        <Route path="/projects/omnianalytics" element={<OmniAnalytics />} />
        <Route path="/projects/business-portal" element={<RetailOps />} />
        <Route path="/projects/retail-storefront" element={<RetailStorefront />} />
        <Route path="/projects/admin" element={<Admin />} />
        <Route path="/projects/data-viz" element={<DataViz />} />
      </Routes>
    </Router>
  );
}
