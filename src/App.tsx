import React, {useState, useEffect} from 'react';
import {Clock, Calendar, Code, Zap, Globe, Calculator, Terminal, Menu, X} from 'lucide-react';
import Header from './components/Header';
import LiveClock from './components/LiveClock';
import DateFormatter from './components/DateFormatter';
import DateManipulator from './components/DateManipulator';
import DateComparator from './components/DateComparator';
import RelativeTime from './components/RelativeTime';
import TimezoneConverter from './components/TimezoneConverter';
import CodeEditor from './components/CodeEditor';
import {Analytics} from '@vercel/analytics/react';

function App() {
  const [activeSection, setActiveSection] = useState('editor');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {id: 'timezone', title: 'Timezones', icon: Globe, component: TimezoneConverter},
    {id: 'editor', title: 'Code Editor', icon: Terminal, component: CodeEditor},
    {id: 'formatter', title: 'Format Dates', icon: Calendar, component: DateFormatter},
    {id: 'manipulator', title: 'Manipulate Dates', icon: Calculator, component: DateManipulator},
    {id: 'comparator', title: 'Compare Dates', icon: Zap, component: DateComparator},
    {id: 'relative', title: 'Relative Time', icon: Clock, component: RelativeTime},

  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Close mobile menu when section changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header/>
      <Analytics/>
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {sections.find(s => s.id === activeSection)?.title || 'Day.js Practice'}
          </h2>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Mobile Navigation Menu - Overlay */}
          <div className={`
            lg:hidden fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity duration-300
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}>
            <div className={`
              fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div className="p-4 overflow-y-auto max-h-screen">
                <LiveClock/>

                <nav className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600"/>
                    Practice Areas
                  </h3>
                  <div className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => handleSectionChange(section.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                            activeSection === section.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5"/>
                          {section.title}
                        </button>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <LiveClock/>

              <nav className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600"/>
                  Practice Areas
                </h3>
                <div className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5"/>
                        {section.title}
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {sections.map((section) => {
              const Component = section.component;
              return (
                <div
                  key={section.id}
                  className={`transition-all duration-300 ${
                    activeSection === section.id ? 'block' : 'hidden'
                  }`}
                >
                  <Component/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

