import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toolPages } from '../seo/pages';

const NotFoundPage: React.FC = () => {
  return (
    <article className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <Helmet>
        <title>Page not found | Day.js Playground</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-700 leading-relaxed">
        That address is not one of the Day.js tools. Choose a tool below or go back to the overview.
      </p>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Day.js Playground overview
          </Link>
        </li>
        {toolPages.map((tool) => (
          <li key={tool.path}>
            <Link to={tool.path} className="text-blue-600 hover:text-blue-700">
              {tool.h1}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default NotFoundPage;
