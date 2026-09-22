import React from 'react';
import { Link } from 'react-router-dom';
import FaqList from './FaqList';
import SeoHead from './SeoHead';
import { PageMeta, toolPages } from '../seo/pages';

interface ToolPageProps {
  page: PageMeta;
  children: React.ReactNode;
}

const ToolPage: React.FC<ToolPageProps> = ({ page, children }) => {
  const related = toolPages.filter((item) => item.path !== page.path);

  return (
    <article>
      <SeoHead page={page} />
      <header className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-3">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-gray-700">{page.navTitle}</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{page.h1}</h1>
        <p className="mt-3 text-gray-700 leading-relaxed">{page.intro}</p>
      </header>
      {children}
      <FaqList faqs={page.faqs} />
      <nav className="bg-white rounded-xl shadow-lg p-6 mt-6" aria-label="Other tools">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Other Day.js tools</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {related.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="text-blue-600 hover:text-blue-700">
                {item.h1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
};

export default ToolPage;
