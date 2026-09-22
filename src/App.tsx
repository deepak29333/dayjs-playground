import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Calendar, Calculator, Clock, Code, Globe, Home, Menu, Terminal, X, Zap } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import LiveClock from './components/LiveClock';
import DateFormatter from './components/DateFormatter';
import DateManipulator from './components/DateManipulator';
import DateComparator from './components/DateComparator';
import RelativeTime from './components/RelativeTime';
import TimezoneConverter from './components/TimezoneConverter';
import CodeEditorIsland from './components/CodeEditorIsland';
import SiteFooter from './components/SiteFooter';
import ToolPage from './components/ToolPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { toolPages } from './seo/pages';

const toolViews: Record<string, React.ComponentType> = {
  '/timezone-converter': TimezoneConverter,
  '/date-formatter': DateFormatter,
  '/date-calculator': DateManipulator,
  '/date-difference': DateComparator,
  '/relative-time': RelativeTime,
  '/code-playground': CodeEditorIsland,
};

const navItems = [
  { path: '/', title: 'Overview', icon: Home },
  { path: '/timezone-converter', title: 'Timezones', icon: Globe },
  { path: '/code-playground', title: 'Code Editor', icon: Terminal },
  { path: '/date-formatter', title: 'Format Dates', icon: Calendar },
  { path: '/date-calculator', title: 'Manipulate Dates', icon: Calculator },
  { path: '/date-difference', title: 'Compare Dates', icon: Zap },
  { path: '/relative-time', title: 'Relative Time', icon: Clock },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="mt-4 sm:mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6" aria-label="Playground tools">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <Code className="w-5 h-5 text-blue-600" aria-hidden="true" />
        Tools
      </h2>
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 text-sm sm:text-base ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
              {item.title}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = location.pathname.length > 1 ? location.pathname.replace(/\/$/, '') : location.pathname;
  const currentNav = navItems.find((item) => item.path === pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ScrollToTop />
      <Header />
      <Analytics />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate mr-2">
            {currentNav?.title || 'Day.js Playground'}
          </h2>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          <div
            className={`
            lg:hidden fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity duration-300
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          >
            <div
              className={`
              fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            >
              <div className="p-3 sm:p-4 overflow-y-auto max-h-screen">
                <LiveClock />
                <SideNav onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <LiveClock />
              <SideNav />
            </div>
          </div>

          <main id="main-content" className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {toolPages.map((page) => {
                const View = toolViews[page.path];
                if (!View) {
                  return null;
                }
                return (
                  <Route
                    key={page.path}
                    path={page.path}
                    element={
                      <ToolPage page={page}>
                        <View />
                      </ToolPage>
                    }
                  />
                );
              })}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;
