import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Zap, Calendar, ArrowRight } from 'lucide-react';
import CodeExample from './CodeExample';

const DateComparator: React.FC = () => {
  const [date1, setDate1] = useState(dayjs().format('YYYY-MM-DD'));
  const [date2, setDate2] = useState(dayjs().add(1, 'day').format('YYYY-MM-DD'));

  const firstDate = dayjs(date1);
  const secondDate = dayjs(date2);

  const comparisons = [
    {
      method: 'isSame',
      result: firstDate.isSame(secondDate),
      description: 'Are the dates exactly the same?',
      code: `date1.isSame(date2)`,
    },
    {
      method: 'isBefore',
      result: firstDate.isBefore(secondDate),
      description: 'Is date1 before date2?',
      code: `date1.isBefore(date2)`,
    },
    {
      method: 'isAfter',
      result: firstDate.isAfter(secondDate),
      description: 'Is date1 after date2?',
      code: `date1.isAfter(date2)`,
    },
    {
      method: 'diff (days)',
      result: secondDate.diff(firstDate, 'days'),
      description: 'Difference in days',
      code: `date2.diff(date1, 'days')`,
    },
    {
      method: 'diff (hours)',
      result: secondDate.diff(firstDate, 'hours'),
      description: 'Difference in hours',
      code: `date2.diff(date1, 'hours')`,
    },
    {
      method: 'diff (milliseconds)',
      result: secondDate.diff(firstDate),
      description: 'Difference in milliseconds',
      code: `date2.diff(date1)`,
    },
  ];

  const unitComparisons = ['year', 'month', 'day', 'hour', 'minute'].map(unit => ({
    unit,
    isSame: firstDate.isSame(secondDate, unit as any),
    isBefore: firstDate.isBefore(secondDate, unit as any),
    isAfter: firstDate.isAfter(secondDate, unit as any),
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-6 h-6 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">Date Comparison</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Date
            </label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <div className="mt-2 text-sm text-gray-600">
              {firstDate.format('dddd, MMMM D, YYYY')}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Date
            </label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <div className="mt-2 text-sm text-gray-600">
              {secondDate.format('dddd, MMMM D, YYYY')}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-medium text-gray-900">{firstDate.format('MMM D')}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="text-center">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="font-medium text-gray-900">{secondDate.format('MMM D')}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {comparisons.map((comparison, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {comparison.description}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  typeof comparison.result === 'boolean'
                    ? comparison.result
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {comparison.result.toString()}
                </span>
              </div>
              <div className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">
                {comparison.code}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Unit-based Comparisons</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-700">Unit</th>
                  <th className="text-center p-3 font-medium text-gray-700">Same</th>
                  <th className="text-center p-3 font-medium text-gray-700">Before</th>
                  <th className="text-center p-3 font-medium text-gray-700">After</th>
                </tr>
              </thead>
              <tbody>
                {unitComparisons.map((comp, index) => (
                  <tr key={comp.unit} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 font-medium capitalize">{comp.unit}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        comp.isSame ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {comp.isSame.toString()}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        comp.isBefore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {comp.isBefore.toString()}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        comp.isAfter ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {comp.isAfter.toString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CodeExample
        title="Comparison Examples"
        code={`import dayjs from 'dayjs';

const date1 = dayjs('${date1}');
const date2 = dayjs('${date2}');

// Basic comparisons
console.log(date1.isSame(date2)); // ${firstDate.isSame(secondDate)}
console.log(date1.isBefore(date2)); // ${firstDate.isBefore(secondDate)}
console.log(date1.isAfter(date2)); // ${firstDate.isAfter(secondDate)}

// Differences
console.log(date2.diff(date1, 'days')); // ${secondDate.diff(firstDate, 'days')}
console.log(date2.diff(date1, 'hours')); // ${secondDate.diff(firstDate, 'hours')}

// Unit-based comparisons
console.log(date1.isSame(date2, 'year')); // ${firstDate.isSame(secondDate, 'year')}
console.log(date1.isSame(date2, 'month')); // ${firstDate.isSame(secondDate, 'month')}`}
      />
    </div>
  );
};

export default DateComparator;