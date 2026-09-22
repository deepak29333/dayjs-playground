import React from 'react';
import { Link } from 'react-router-dom';
import { toolPages } from '../seo/pages';

const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t mt-8 text-gray-600 text-sm">
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-700">
          Day.js Playground is a free set of browser tools for time zones, Unix timestamps, date
          formatting, and Day.js code.
        </p>
        <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Overview
          </Link>
          {toolPages.map((tool) => (
            <Link key={tool.path} to={tool.path} className="text-blue-600 hover:text-blue-700">
              {tool.navTitle}
            </Link>
          ))}
          <a
            href="https://day.js.org/"
            className="text-blue-600 hover:text-blue-700"
            rel="noopener noreferrer"
          >
            Day.js docs
          </a>
        </nav>
        <p className="mt-4">© {new Date().getFullYear()} Deepak — Software Engineer</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
