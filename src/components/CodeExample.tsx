import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

interface CodeExampleProps {
  title: string;
  code: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ title, code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-gray-200">{title}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-4">
        <pre className="text-sm text-gray-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeExample;