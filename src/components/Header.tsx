import React from 'react';
import { Calendar, Github, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Day.js Practice</h1>
              <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Interactive learning playground for Day.js</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://day.js.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Day.js Docs</span>
              <span className="sm:hidden">Docs</span>
            </a>
            <a
              href="https://github.com/deepak29333"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;