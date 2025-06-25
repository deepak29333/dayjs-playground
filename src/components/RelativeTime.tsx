import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Clock, RefreshCw } from 'lucide-react';
import CodeExample from './CodeExample';

dayjs.extend(relativeTime);

const RelativeTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [customDate, setCustomDate] = useState(dayjs().subtract(2, 'hours').format('YYYY-MM-DDTHH:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const customDateTime = dayjs(customDate);

  const relativeExamples = [
    { date: dayjs().subtract(30, 'seconds'), description: '30 seconds ago' },
    { date: dayjs().subtract(2, 'minutes'), description: '2 minutes ago' },
    { date: dayjs().subtract(1, 'hour'), description: '1 hour ago' },
    { date: dayjs().subtract(1, 'day'), description: '1 day ago' },
    { date: dayjs().subtract(1, 'week'), description: '1 week ago' },
    { date: dayjs().subtract(1, 'month'), description: '1 month ago' },
    { date: dayjs().subtract(1, 'year'), description: '1 year ago' },
    { date: dayjs().add(30, 'seconds'), description: '30 seconds from now' },
    { date: dayjs().add(2, 'minutes'), description: '2 minutes from now' },
    { date: dayjs().add(1, 'hour'), description: '1 hour from now' },
    { date: dayjs().add(1, 'day'), description: '1 day from now' },
    { date: dayjs().add(1, 'week'), description: '1 week from now' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Relative Time</h2>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Live Relative Time</h3>
            <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Current Time</div>
              <div className="font-mono text-lg font-bold text-gray-900">
                {currentTime.format('HH:mm:ss')}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Custom Date/Time</div>
              <input
                type="datetime-local"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Relative to now:</div>
            <div className="text-2xl font-bold text-green-600">
              {customDateTime.fromNow()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {customDateTime.to(currentTime)}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Relative Time Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relativeExamples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {example.description}
                </div>
                <div className="font-mono text-sm text-green-600 mb-1">
                  {example.date.fromNow()}
                </div>
                <div className="text-xs text-gray-500">
                  {example.date.format('MMM D, YYYY HH:mm')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Methods Available:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <code className="bg-white px-2 py-1 rounded text-blue-600">.fromNow()</code>
              <span className="text-gray-600">Relative to current time</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-white px-2 py-1 rounded text-blue-600">.from(date)</code>
              <span className="text-gray-600">Relative to specific date</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-white px-2 py-1 rounded text-blue-600">.toNow()</code>
              <span className="text-gray-600">From current time</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-white px-2 py-1 rounded text-blue-600">.to(date)</code>
              <span className="text-gray-600">To specific date</span>
            </div>
          </div>
        </div>
      </div>

      <CodeExample
        title="Relative Time Examples"
        code={`import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const now = dayjs();
const pastDate = dayjs('${customDate}');

// Relative to now
console.log(pastDate.fromNow()); // ${customDateTime.fromNow()}
console.log(now.to(pastDate)); // ${currentTime.to(customDateTime)}

// Common patterns
console.log(dayjs().subtract(1, 'hour').fromNow()); // ${dayjs().subtract(1, 'hour').fromNow()}
console.log(dayjs().add(2, 'days').fromNow()); // ${dayjs().add(2, 'days').fromNow()}

// Without suffix
console.log(pastDate.fromNow(true)); // ${customDateTime.fromNow(true)}`}
      />
    </div>
  );
};

export default RelativeTime;