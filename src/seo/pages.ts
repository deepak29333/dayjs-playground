export const SITE_ORIGIN = 'https://dayjs-playground.vercel.app';
export const SITE_NAME = 'Day.js Playground';

export interface Faq {
  question: string;
  answer: string;
}

export interface PageMeta {
  path: string;
  navTitle: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  intro: string;
  faqs: Faq[];
}

export const homePage: PageMeta = {
  path: '/',
  navTitle: 'Overview',
  title: 'Day.js Playground | Free Date & Time Tools',
  description:
    'Free Day.js playground for time zones, Unix timestamps, date formatting, date math, and relative time. Run Day.js in the browser with no install.',
  h1: 'Day.js Playground',
  summary:
    'Free browser tools for converting, formatting, comparing, and calculating dates with Day.js.',
  intro:
    'Day.js Playground is a free set of date and time tools that run in your browser. Convert time zones, turn Unix timestamps into calendar dates, format dates with Day.js tokens, add or subtract time, compare two dates, and run Day.js code without creating a project.',
  faqs: [
    {
      question: 'What is the Day.js Playground?',
      answer:
        'It is a free website of interactive date and time tools built with Day.js, a small JavaScript date library. You can convert time zones, format dates, calculate differences, and try Day.js code in the browser.',
    },
    {
      question: 'Do I need to install Day.js to use these tools?',
      answer:
        'No. The converters and the code playground run in your browser. The code playground already loads common Day.js plugins, including UTC, time zone, relative time, duration, and localized formats.',
    },
    {
      question: 'Is the Day.js Playground free?',
      answer:
        'Yes. Every tool on this site is free to use. Nothing is uploaded to a server when you convert a date; the calculation happens in your browser.',
    },
    {
      question: 'How is Day.js related to Moment.js?',
      answer:
        'Day.js uses a similar API to Moment.js for parsing, formatting, and manipulating dates, in a much smaller package. Methods you may already know, such as format, add, subtract, diff, and fromNow, work the same way here.',
    },
  ],
};

export const toolPages: PageMeta[] = [
  {
    path: '/timezone-converter',
    navTitle: 'Timezones',
    title: 'Time Zone Converter & Unix Timestamp | Day.js',
    description:
      'Convert a date and time between IANA time zones, check a world clock, and turn Unix timestamps in seconds or milliseconds into readable dates.',
    h1: 'Time Zone and Unix Timestamp Converter',
    summary:
      'Convert a civil time between IANA time zones and decode Unix timestamps.',
    intro:
      'Pick a date and time, choose a source time zone and a target time zone, and see the converted clock time. The world clock shows the same moment in UTC, New York, Los Angeles, London, Paris, Tokyo, Shanghai, and Sydney. Further down this page, the timestamp converter accepts a Unix timestamp in seconds or milliseconds and displays that instant in any IANA time zone.',
    faqs: [
      {
        question: 'How do I convert a time between time zones?',
        answer:
          'Enter the local date and time, select the time zone that date belongs to, then select the time zone you want. The result is the same instant shown on the other clock. Names follow the IANA time zone database, such as America/New_York and Asia/Tokyo, so daylight saving time is included.',
      },
      {
        question: 'What is a Unix timestamp?',
        answer:
          'A Unix timestamp counts time from 00:00:00 UTC on 1 January 1970. Timestamps in seconds are 10 digits for current dates. Timestamps in milliseconds are 13 digits and are what JavaScript Date.now() returns. Paste either value, choose seconds or milliseconds, and pick a time zone for the calendar date.',
      },
      {
        question: 'Why do two cities differ by a different number of hours in summer?',
        answer:
          'Many regions observe daylight saving time and some do not. A conversion that uses IANA zones applies the offset that is correct for that date, not a fixed hour difference. For example, New York and London are 5 hours apart in winter and 4 hours apart during US daylight saving time.',
      },
    ],
  },
  {
    path: '/date-formatter',
    navTitle: 'Format Dates',
    title: 'Date Formatter | Day.js Format Tokens Online',
    description:
      'Format any date with Day.js tokens. See ISO, US, European, long-form dates, 12-hour and 24-hour times, week numbers, and Unix timestamps.',
    h1: 'Date Formatter',
    summary: 'See one date written with the Day.js format tokens you will use in code.',
    intro:
      'Choose a date and compare common Day.js format strings side by side. Each row shows the token, a short name, and the formatted result you can copy. Patterns include ISO dates (YYYY-MM-DD), US and European numeric dates, long and short month names, 24-hour and 12-hour times, week numbers, and Unix time in seconds or milliseconds.',
    faqs: [
      {
        question: 'Which format tokens does Day.js use?',
        answer:
          'Day.js uses the same tokens as Moment.js. YYYY is the four-digit year, MM is the month, DD is the day of the month, HH is hours from 00 to 23, mm is minutes, and ss is seconds. MMMM is the full month name and dddd is the weekday name.',
      },
      {
        question: 'How do I format a date as ISO 8601?',
        answer:
          'Use the token YYYY-MM-DD for a calendar date. For a date and time in UTC, call toISOString() on a Day.js object. The formatter on this page shows YYYY-MM-DD and YYYY-MM-DD HH:mm:ss for the date you select.',
      },
      {
        question: 'How do I get a Unix timestamp from a date?',
        answer:
          'Call unix() for seconds since the Unix epoch, or valueOf() for milliseconds. This formatter prints both for the selected date so you can copy them into an API request or a database field.',
      },
    ],
  },
  {
    path: '/date-calculator',
    navTitle: 'Manipulate Dates',
    title: 'Date Calculator | Add or Subtract Time with Day.js',
    description:
      'Add or subtract minutes, hours, days, weeks, months, and years from any date. Free Day.js date calculator that runs in your browser.',
    h1: 'Date Calculator',
    summary: 'Add or subtract minutes, hours, days, weeks, months, or years from a date.',
    intro:
      'Start from any calendar date, choose add or subtract, then enter an amount and a unit. The calculator uses Day.js add and subtract, so month and year steps follow calendar rules rather than a fixed number of hours. Quick examples cover tomorrow, yesterday, next week, next month, next year, and six months ago.',
    faqs: [
      {
        question: 'How do I add days to a date?',
        answer:
          'Select the starting date, choose Add, enter the number of days, and set the unit to Days. The result is the calendar date that many days later. The same form subtracts time when you choose Subtract.',
      },
      {
        question: 'What happens when I add one month to 31 January?',
        answer:
          'Day.js moves to the last valid day of the target month when the starting day does not exist there. Adding one month to 31 January lands on 28 February, or 29 February in a leap year, instead of overflowing into March.',
      },
      {
        question: 'Which units can I add or subtract?',
        answer:
          'The calculator supports minutes, hours, days, weeks, months, and years. In Day.js those units are the strings minute, hour, day, week, month, and year, passed to add or subtract.',
      },
    ],
  },
  {
    path: '/date-difference',
    navTitle: 'Compare Dates',
    title: 'Date Difference Calculator | Compare Two Dates',
    description:
      'Find the difference between two dates in days, hours, and milliseconds. Check whether one date is before, after, or the same as another.',
    h1: 'Date Difference Calculator',
    summary: 'Compare two dates and read the gap in days, hours, and milliseconds.',
    intro:
      'Enter two dates to see whether the first is before, after, or the same as the second. The calculator also shows date2.diff(date1) in days, hours, and milliseconds, and repeats the comparison by year, month, day, hour, and minute. A positive day count means the second date is later.',
    faqs: [
      {
        question: 'How do I calculate the number of days between two dates?',
        answer:
          'Put the earlier date in the first field and the later date in the second field, then read Difference in days. That value is the Day.js call date2.diff(date1, "days"). Swap the dates and the number becomes negative.',
      },
      {
        question: 'What is the difference between isBefore and diff?',
        answer:
          'isBefore, isAfter, and isSame answer a yes or no question. diff returns a number: how many whole units separate the two dates. Use isSame(other, "day") when you only care that both values fall on the same calendar day.',
      },
      {
        question: 'Does the day count include the end date?',
        answer:
          'diff counts the distance between the two instants. From 1 January to 2 January is 1 day, not 2. If you need a count of calendar days that includes both ends, add 1 to a positive day difference.',
      },
    ],
  },
  {
    path: '/relative-time',
    navTitle: 'Relative Time',
    title: 'Relative Time Converter | Day.js fromNow',
    description:
      'Turn a date into relative time such as “2 hours ago” or “in 3 days”. Try Day.js fromNow, toNow, from, and to in the browser.',
    h1: 'Relative Time',
    summary: 'Describe a timestamp as “2 hours ago” or “in 3 days” with Day.js.',
    intro:
      'Relative time describes a moment compared with now, or compared with another date. Pick a date and time to see fromNow() and to() update as the clock runs. The examples cover seconds, minutes, hours, days, weeks, months, and years in the past and in the future. The relativeTime plugin is what adds these methods to Day.js.',
    faqs: [
      {
        question: 'What does fromNow() return?',
        answer:
          'fromNow() returns a short phrase such as “a few seconds ago”, “2 hours ago”, or “in 3 days”. Pass true, as in fromNow(true), when you want the phrase without the “ago” or “in” suffix.',
      },
      {
        question: 'How do I show “2 hours ago” in Day.js?',
        answer:
          'Extend Day.js with the relativeTime plugin, then call dayjs(date).fromNow(). A time two hours before the current time reads “2 hours ago”. Use from(otherDate) when the reference point is not the current time.',
      },
      {
        question: 'Which methods are available for relative time?',
        answer:
          'The plugin adds fromNow and toNow, which compare against the current time, and from and to, which compare against a date you pass in. Each method accepts an optional boolean that removes the suffix.',
      },
    ],
  },
  {
    path: '/code-playground',
    navTitle: 'Code Editor',
    title: 'Day.js Code Playground | Run Day.js Online',
    description:
      'Write and run Day.js in the browser. Formatting, time zones, relative time, duration, and localized format plugins are already loaded.',
    h1: 'Day.js Code Playground',
    summary: 'Run Day.js in the browser with the common plugins already loaded.',
    intro:
      'The editor is a JavaScript scratchpad with Day.js in scope. You do not need import or require. Plugins already loaded include UTC, timezone, relativeTime, duration, customParseFormat, localizedFormat, advancedFormat, weekOfYear, isoWeek, quarterOfYear, dayOfYear, isLeapYear, and minMax. Run a snippet to print formatted dates, differences, and time zone conversions in the output panel.',
    faqs: [
      {
        question: 'Can I run Day.js without installing it?',
        answer:
          'Yes. This playground evaluates your code in the browser and passes in the dayjs function. Write Day.js calls, press run or wait for the snippet to run, and read console.log output beside the editor.',
      },
      {
        question: 'Which Day.js plugins are already loaded?',
        answer:
          'UTC, timezone, relativeTime, duration, customParseFormat, localizedFormat, advancedFormat, weekOfYear, isoWeek, quarterOfYear, dayOfYear, isLeapYear, and minMax are extended before your code runs. Call dayjs.utc, dayjs.tz, fromNow, and duration without loading them yourself.',
      },
      {
        question: 'How do I print a value from my snippet?',
        answer:
          'Use console.log for each value you want to inspect. You can also end the snippet with a return statement. The returned value is shown at the bottom of the output panel.',
      },
    ],
  },
];

export const indexablePages: PageMeta[] = [homePage, ...toolPages];

export function absoluteUrl(path: string): string {
  if (path === '/') {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}${path}`;
}

export function renderSitemap(lastmod: string): string {
  const urls = indexablePages
    .map((page) => {
      const priority = page.path === '/' ? '1.0' : '0.8';
      return `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function renderLlmsTxt(): string {
  const toolLines = toolPages
    .map((page) => `- [${page.h1}](${absoluteUrl(page.path)}): ${page.summary} ${page.intro}`)
    .join('\n');

  return `# ${SITE_NAME}

> ${homePage.summary}

${homePage.intro}

Day.js is a small JavaScript date library with an API similar to Moment.js. These pages explain each tool in plain language and include a live calculator. Calculations run in the browser.

## Tools

${toolLines}

## Questions these pages answer

${indexablePages
  .flatMap((page) => page.faqs.map((faq) => `- ${faq.question} (${absoluteUrl(page.path)})`))
  .join('\n')}

## Optional

- [Day.js documentation](https://day.js.org/docs/en/parse/parse): Official Day.js parse, format, manipulate, and display docs.
- [Source on GitHub](https://github.com/deepak29333): Author profile for this playground.
`;
}
