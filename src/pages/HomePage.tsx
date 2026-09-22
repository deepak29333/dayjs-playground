import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Calculator, Clock, Globe, Terminal, Zap } from 'lucide-react';
import FaqList from '../components/FaqList';
import SeoHead from '../components/SeoHead';
import { homePage, toolPages } from '../seo/pages';

const icons = [Globe, Calendar, Calculator, Zap, Clock, Terminal];

const HomePage: React.FC = () => {
  return (
    <article>
      <SeoHead page={homePage} />
      <header className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{homePage.h1}</h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">{homePage.intro}</p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Day.js is a small JavaScript date library with an API similar to Moment.js. This site uses
          it in the browser, so you can format, compare, and convert dates without setting up a
          project. Each tool has its own page, a short explanation, and answers to the questions
          people usually ask while writing date code.
        </p>
      </header>

      <section className="mt-6" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Date and time tools
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolPages.map((tool, index) => {
            const Icon = icons[index];
            return (
              <li key={tool.path}>
                <Link
                  to={tool.path}
                  className="block h-full bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-gray-900">{tool.h1}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{tool.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-6 mt-6" aria-labelledby="use-heading">
        <h2 id="use-heading" className="text-2xl font-bold text-gray-900 mb-4">
          What you can do here
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
          <li>Convert a meeting time from one IANA time zone to another, including daylight saving time.</li>
          <li>Turn a Unix timestamp in seconds or milliseconds into a readable date.</li>
          <li>Compare Day.js format tokens such as YYYY-MM-DD, MMMM D, YYYY, and HH:mm:ss.</li>
          <li>Add or subtract days, weeks, months, and years from a date.</li>
          <li>Measure the gap between two dates in days, hours, and milliseconds.</li>
          <li>Phrase a timestamp as relative time, such as “2 hours ago” or “in 3 days”.</li>
          <li>Run Day.js snippets in a code editor with the common plugins already loaded.</li>
        </ul>
      </section>

      <FaqList faqs={homePage.faqs} />
    </article>
  );
};

export default HomePage;
