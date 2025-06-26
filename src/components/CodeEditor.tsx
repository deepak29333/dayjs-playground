import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, AlertCircle, CheckCircle, Maximize2, Minimize2 } from 'lucide-react';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import MonacoEditor from '@monaco-editor/react';

// Extend dayjs with plugins for the editor
// (do this only once, before component definition)
dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);
dayjs.extend(minMax);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`// Welcome to the Day.js Code Editor!
// All common Day.js plugins (e.g. localizedFormat, relativeTime, utc, timezone) are preloaded.
// No need to import or require them—just use dayjs().
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
console.log('Localized:', now.local().format('LLLL'));

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
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            <button
              onClick={resetCode}
              className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />} Copy
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-4 bg-gray-900">
            <MonacoEditor
              height={fullscreen ? '80vh' : '400px'}
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={value => setCode(value || '')}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                formatOnType: true,
                formatOnPaste: true,
                tabSize: 2,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                matchBrackets: 'always',
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                contextmenu: true,
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {exampleSnippets.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(ex)}
                  className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded text-blue-800 font-mono"
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-gray-50 border-l">
            <div className="mb-2 flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-700">Output</span>
            </div>
            <div className="bg-white rounded p-3 min-h-[120px] font-mono text-sm text-gray-800 overflow-auto">
              {error ? (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              ) : output.length > 0 ? (
                output.map((line, i) => (
                  <div key={i}>{line}</div>
                ))
              ) : (
                <span className="text-gray-400">No output yet.</span>
              )}
            </div>
            {output.length > 0 && !error && (
              <div className="flex items-center gap-2 mt-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Code ran successfully!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
