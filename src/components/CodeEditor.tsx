import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, AlertCircle, CheckCircle, Maximize2, Minimize2 } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins for the editor
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`// Welcome to the Day.js Code Editor!
// Try writing some Day.js code below:

const now = dayjs();
console.log('Current time:', now.format('YYYY-MM-DD HH:mm:ss'));

const tomorrow = now.add(1, 'day');
console.log('Tomorrow:', tomorrow.format('MMMM D, YYYY'));

const lastWeek = now.subtract(1, 'week');
console.log('Last week was:', lastWeek.fromNow());

// Try different formats
console.log('ISO format:', now.toISOString());
console.log('Unix timestamp:', now.unix());

// Date manipulation
const birthday = dayjs('1990-05-15');
console.log('Age in years:', now.diff(birthday, 'year'));

return now.format('dddd, MMMM Do YYYY, h:mm:ss a');`);

  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const exampleSnippets = [
    {
      title: 'Basic Formatting',
      code: `const date = dayjs();
console.log('Default:', date.format());
console.log('Custom:', date.format('YYYY-MM-DD HH:mm:ss'));
console.log('Readable:', date.format('MMMM Do YYYY, h:mm:ss a'));
return date.format('dddd, MMMM Do YYYY');`
    },
    {
      title: 'Date Manipulation',
      code: `const now = dayjs();
const future = now.add(2, 'months').add(3, 'days');
const past = now.subtract(1, 'year');

console.log('Now:', now.format('YYYY-MM-DD'));
console.log('Future:', future.format('YYYY-MM-DD'));
console.log('Past:', past.format('YYYY-MM-DD'));

return \`Difference: \${future.diff(past, 'days')} days\`;`
    },
    {
      title: 'Relative Time',
      code: `const now = dayjs();
const dates = [
  now.subtract(30, 'minutes'),
  now.subtract(2, 'hours'),
  now.subtract(1, 'day'),
  now.add(3, 'hours'),
  now.add(2, 'days')
];

dates.forEach((date, i) => {
  console.log(\`Date \${i + 1}:\`, date.fromNow());
});

return 'Check console for relative times!';`
    },
    {
      title: 'Date Comparison',
      code: `const date1 = dayjs('2024-01-15');
const date2 = dayjs('2024-02-20');

console.log('Is same?', date1.isSame(date2));
console.log('Is before?', date1.isBefore(date2));
console.log('Is after?', date1.isAfter(date2));
console.log('Difference in days:', date2.diff(date1, 'days'));
console.log('Same month?', date1.isSame(date2, 'month'));

return \`\${date1.format('MMM D')} vs \${date2.format('MMM D')}\`;`
    },
    {
      title: 'Timezone Conversion',
      code: `const utcTime = dayjs.utc();
console.log('UTC:', utcTime.format());

// Note: Timezone conversion might be limited in browser
try {
  const tokyo = utcTime.tz('Asia/Tokyo');
  const newYork = utcTime.tz('America/New_York');
  
  console.log('Tokyo:', tokyo.format('HH:mm'));
  console.log('New York:', newYork.format('HH:mm'));
  
  return 'Timezone conversion successful!';
} catch (e) {
  console.log('Timezone data limited in browser');
  return 'UTC: ' + utcTime.format('HH:mm:ss');
}`
    }
  ];

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput([]);

    // Create a custom console that captures output
    const capturedLogs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        capturedLogs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      },
      error: (...args: any[]) => {
        capturedLogs.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
      },
      warn: (...args: any[]) => {
        capturedLogs.push('WARN: ' + args.map(arg => String(arg)).join(' '));
      }
    };

    try {
      // Create a function that has access to dayjs and console
      const func = new Function('dayjs', 'console', code);
      const result = func(dayjs, customConsole);
      
      if (result !== undefined) {
        capturedLogs.push('→ ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)));
      }
      
      setOutput(capturedLogs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(exampleSnippets[0].code);
    setOutput([]);
    setError(null);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadExample = (example: typeof exampleSnippets[0]) => {
    setCode(example.code);
    setOutput([]);
    setError(null);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  // Auto-run code when it changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (code.trim()) {
        runCode();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${fullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Day.js Code Editor</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {fullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={resetCode}
              className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors text-xs sm:text-sm"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {isRunning ? (
                <>
                  <span className="hidden sm:inline">Running...</span>
                  <span className="sm:hidden">Run</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Run Code</span>
                  <span className="sm:hidden">Run</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px] sm:h-[500px] md:h-[600px]">
          {/* Code Input */}
          <div className="border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="h-full flex flex-col">
              <div className="px-4 py-2 bg-gray-800 text-gray-200 text-sm font-medium">
                JavaScript Code
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-sm sm:text-base bg-gray-900 text-gray-100 resize-none focus:outline-none"
                placeholder="Write your Day.js code here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output */}
          <div className="h-full flex flex-col">
            <div className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium flex items-center gap-2">
              Output
              {error && <AlertCircle className="w-4 h-4 text-red-500" />}
              {!error && output.length > 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
            <div className="flex-1 p-4 bg-gray-50 overflow-auto">
              {error ? (
                <div className="text-red-600 font-mono text-sm bg-red-50 p-3 rounded border border-red-200">
                  <div className="font-semibold mb-1">Error:</div>
                  {error}
                </div>
              ) : output.length > 0 ? (
                <div className="space-y-1">
                  {output.map((line, index) => (
                    <div
                      key={index}
                      className={`font-mono text-sm sm:text-base ${
                        line.startsWith('→') 
                          ? 'text-blue-600 font-semibold bg-blue-50 p-2 rounded' 
                          : line.startsWith('ERROR:')
                          ? 'text-red-600 bg-red-50 p-2 rounded'
                          : line.startsWith('WARN:')
                          ? 'text-yellow-600 bg-yellow-50 p-2 rounded'
                          : 'text-gray-700'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm italic">
                  Output will appear here when you run your code...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Example Snippets */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Snippets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {exampleSnippets.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example)}
              className="text-left p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
            >
              <div className="font-medium text-gray-900 mb-2">{example.title}</div>
              <div className="text-xs sm:text-sm text-gray-600 font-mono bg-white p-2 rounded overflow-hidden">
                {example.code.split('\n')[0]}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <div className="font-medium mb-1">Available Functions:</div>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>• <code className="bg-white px-1 rounded">dayjs()</code> - Current date/time</li>
              <li>• <code className="bg-white px-1 rounded">dayjs(string)</code> - Parse date string</li>
              <li>• <code className="bg-white px-1 rounded">console.log()</code> - Print to output</li>
              <li>• <code className="bg-white px-1 rounded">return value</code> - Show final result</li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-1">Available Plugins:</div>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>• <code className="bg-white px-1 rounded">relativeTime</code> - .fromNow(), .to()</li>
              <li>• <code className="bg-white px-1 rounded">utc</code> - .utc(), .local()</li>
              <li>• <code className="bg-white px-1 rounded">timezone</code> - .tz() (limited)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;