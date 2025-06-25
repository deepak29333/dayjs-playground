import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Calendar, Copy, Check } from 'lucide-react';
import CodeExample from './CodeExample';

const DateFormatter: React.FC = () => {
  const [inputDate, setInputDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const formatExamples = [
    { format: 'YYYY-MM-DD', description: 'ISO Date' },
    { format: 'MM/DD/YYYY', description: 'US Format' },
    { format: 'DD/MM/YYYY', description: 'European Format' },
    { format: 'MMMM D, YYYY', description: 'Long Date' },
    { format: 'MMM D, YY', description: 'Short Date' },
    { format: 'dddd, MMMM Do YYYY', description: 'Full Date' },
    { format: 'HH:mm:ss', description: '24-hour Time' },
    { format: 'h:mm A', description: '12-hour Time' },
    { format: 'YYYY-MM-DD HH:mm:ss', description: 'DateTime' },
    {
      format: 'Unix Timestamp',
      description: 'Unix Timestamp (seconds)',
      custom: true,
      formatter: (date: dayjs.Dayjs) => date.unix().toString()
    },
    {
      format: 'Unix Milliseconds',
      description: 'Unix Milliseconds',
      custom: true,
      formatter: (date: dayjs.Dayjs) => date.valueOf().toString()
    },
    { format: 'YYYY-[W]WW', description: 'Week Format' },
  ];

  const selectedDate = dayjs(inputDate);

  const copyToClipboard = async (format: string, result: string) => {
    try {
      await navigator.clipboard.writeText(result);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Date Formatting</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a date to format:
          </label>
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formatExamples.map((example) => {
            const result = example.custom && example.formatter
              ? example.formatter(selectedDate)
              : selectedDate.format(example.format);

            return (
              <div
                key={example.format}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {example.description}
                  </span>
                  <button
                    onClick={() => copyToClipboard(example.format, result)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded"
                    title="Copy result"
                  >
                    {copiedFormat === example.format ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="font-mono text-lg text-gray-900 mb-1">{result}</div>
                <div className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {example.custom ? (
                    example.format === 'Unix Timestamp'
                      ? '.unix()'
                      : '.valueOf()'
                  ) : (
                    `.format('${example.format}')`
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CodeExample
        title="Format Examples"
        code={`import dayjs from 'dayjs';

const date = dayjs('${inputDate}');

// Basic formatting
console.log(date.format('YYYY-MM-DD')); // ${selectedDate.format('YYYY-MM-DD')}
console.log(date.format('MMMM D, YYYY')); // ${selectedDate.format('MMMM D, YYYY')}

// Time formatting
console.log(date.format('HH:mm:ss')); // ${selectedDate.format('HH:mm:ss')}
console.log(date.format('h:mm A')); // ${selectedDate.format('h:mm A')}

// Unix timestamps
console.log(date.unix()); // ${selectedDate.unix()} (seconds since Unix Epoch)
console.log(date.valueOf()); // ${selectedDate.valueOf()} (milliseconds since Unix Epoch)

// Week of year
console.log(date.format('YYYY-[W]WW')); // ${selectedDate.format('YYYY-[W]WW')}
`}
      />
    </div>
  );
};

export default DateFormatter;