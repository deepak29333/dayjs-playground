import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Calculator, Plus, Minus } from 'lucide-react';
import CodeExample from './CodeExample';

const DateManipulator: React.FC = () => {
  const [baseDate, setBaseDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState<'day' | 'week' | 'month' | 'year' | 'hour' | 'minute'>('day');

  const units = [
    { value: 'minute', label: 'Minutes' },
    { value: 'hour', label: 'Hours' },
    { value: 'day', label: 'Days' },
    { value: 'week', label: 'Weeks' },
    { value: 'month', label: 'Months' },
    { value: 'year', label: 'Years' },
  ];

  const selectedDate = dayjs(baseDate);
  const result = operation === 'add' 
    ? selectedDate.add(amount, unit)
    : selectedDate.subtract(amount, unit);

  const manipulationExamples = [
    { operation: 'add', amount: 1, unit: 'day', description: 'Tomorrow' },
    { operation: 'subtract', amount: 1, unit: 'day', description: 'Yesterday' },
    { operation: 'add', amount: 1, unit: 'week', description: 'Next week' },
    { operation: 'add', amount: 1, unit: 'month', description: 'Next month' },
    { operation: 'add', amount: 1, unit: 'year', description: 'Next year' },
    { operation: 'subtract', amount: 6, unit: 'month', description: '6 months ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Date Manipulation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Date
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operation
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setOperation('add')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  operation === 'add'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  operation === 'subtract'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Minus className="w-4 h-4" />
                Subtract
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {units.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Original Date</div>
              <div className="text-xl font-mono font-bold text-gray-900">
                {selectedDate.format('MMMM D, YYYY')}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">
                After {operation === 'add' ? 'adding' : 'subtracting'} {amount} {unit}(s)
              </div>
              <div className="text-xl font-mono font-bold text-purple-600">
                {result.format('MMMM D, YYYY')}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {manipulationExamples.map((example, index) => {
              const exampleResult = example.operation === 'add'
                ? selectedDate.add(example.amount, example.unit as any)
                : selectedDate.subtract(example.amount, example.unit as any);
              
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {example.description}
                  </div>
                  <div className="font-mono text-sm text-gray-900">
                    {exampleResult.format('MMM D, YYYY')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CodeExample
        title="Manipulation Examples"
        code={`import dayjs from 'dayjs';

const date = dayjs('${baseDate}');

// Adding time
console.log(date.add(1, 'day')); // ${selectedDate.add(1, 'day').format('YYYY-MM-DD')}
console.log(date.add(2, 'week')); // ${selectedDate.add(2, 'week').format('YYYY-MM-DD')}
console.log(date.add(3, 'month')); // ${selectedDate.add(3, 'month').format('YYYY-MM-DD')}

// Subtracting time
console.log(date.subtract(1, 'day')); // ${selectedDate.subtract(1, 'day').format('YYYY-MM-DD')}
console.log(date.subtract(6, 'month')); // ${selectedDate.subtract(6, 'month').format('YYYY-MM-DD')}

// Current operation
console.log(date.${operation}(${amount}, '${unit}')); // ${result.format('YYYY-MM-DD')}`}
      />
    </div>
  );
};

export default DateManipulator;