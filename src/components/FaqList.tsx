import React from 'react';
import { Faq } from '../seo/pages';

interface FaqListProps {
  faqs: Faq[];
}

const FaqList: React.FC<FaqListProps> = ({ faqs }) => {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mt-6" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-4">
        Common questions
      </h2>
      <div className="space-y-5">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
            <p className="mt-1 text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqList;
