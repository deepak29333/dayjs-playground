import React, { useEffect, useState } from 'react';

const sample = `const now = dayjs();
console.log('Current time:', now.format('YYYY-MM-DD HH:mm:ss'));
console.log('ISO format:', now.toISOString());
console.log('Unix timestamp:', now.unix());
console.log('Tomorrow:', now.add(1, 'day').format('MMMM D, YYYY'));
console.log('Last week:', now.subtract(1, 'week').fromNow());
`;

const CodeEditorIsland: React.FC = () => {
  const [Editor, setEditor] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    import('./CodeEditor').then((mod) => {
      if (active) {
        setEditor(() => mod.default);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (!Editor) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-6" aria-busy="true">
        <h2 className="text-2xl font-bold text-gray-900">Day.js Code Editor</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The editor loads in the browser. Until then, this sample shows the kind of Day.js you can
          run here. dayjs is already defined, and UTC, time zone, relative time, and duration
          plugins are already loaded.
        </p>
        <pre className="mt-4 bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
          <code>{sample}</code>
        </pre>
      </section>
    );
  }

  return <Editor />;
};

export default CodeEditorIsland;
