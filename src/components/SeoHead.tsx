import React from 'react';
import { Helmet } from 'react-helmet-async';
import { absoluteUrl, Faq, PageMeta, SITE_NAME, SITE_ORIGIN } from '../seo/pages';

interface SeoHeadProps {
  page: PageMeta;
  noindex?: boolean;
}

function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function faqEntities(faqs: Faq[]) {
  return faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));
}

function buildGraph(page: PageMeta) {
  const url = absoluteUrl(page.path);
  const crumbs = [
    { name: 'Home', item: absoluteUrl('/') },
    ...(page.path === '/' ? [] : [{ name: page.h1, item: url }]),
  ];

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
      description:
        'Free browser tools for time zones, Unix timestamps, date formatting, date math, and Day.js code.',
      inLanguage: 'en',
      publisher: {
        '@type': 'Person',
        name: 'Deepak',
        url: 'https://github.com/deepak29333',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      inLanguage: 'en',
      about: ['Day.js', 'date and time'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    },
  ];

  if (page.path === '/') {
    graph.push({
      '@type': 'ItemList',
      name: 'Day.js Playground tools',
      itemListElement: [
        '/timezone-converter',
        '/date-formatter',
        '/date-calculator',
        '/date-difference',
        '/relative-time',
        '/code-playground',
      ].map((path, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(path),
      })),
    });
  } else {
    graph.push({
      '@type': 'WebApplication',
      name: page.h1,
      url,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires a modern web browser. Page text is available without JavaScript.',
      description: page.description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    });
  }

  if (page.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqEntities(page.faqs),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

const SeoHead: React.FC<SeoHeadProps> = ({ page, noindex = false }) => {
  const url = absoluteUrl(page.path);
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Deepak" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <script type="application/ld+json">{jsonLd(buildGraph(page))}</script>
    </Helmet>
  );
};

export default SeoHead;
