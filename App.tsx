
import React, { useState, useEffect, useCallback } from 'react';
import { diagrams } from './constants/diagrams';
import { Diagram } from './types';
import Sidebar from './components/Sidebar';
import MermaidRenderer from './components/MermaidRenderer';
import { initMermaid } from './utils/mermaid';
import { copyToClipboard, downloadSvg } from './utils/domHelpers';

const App: React.FC = () => {
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram>(diagrams[0]);
  const [svgContent, setSvgContent] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string>('Copy Mermaid');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    initMermaid(isDarkMode);
    // Force re-render of the current diagram when theme changes
    setSelectedDiagram(prev => ({...prev}));
  }, [isDarkMode]);

  const handleCopyToClipboard = useCallback(() => {
    copyToClipboard(selectedDiagram.code).then(success => {
      if (success) {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Mermaid'), 2000);
      } else {
        setCopyStatus('Failed!');
        setTimeout(() => setCopyStatus('Copy Mermaid'), 2000);
      }
    });
  }, [selectedDiagram.code]);

  const handleDownloadSvg = useCallback(() => {
    downloadSvg(selectedDiagram.title, svgContent);
  }, [selectedDiagram.title, svgContent]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-200">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Alie Network — UML Studio</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Marketing & Growth System Visualizer</p>
          </div>
          <div className="flex items-center gap-2">
             <button
              onClick={() => setIsDarkMode(v => !v)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Toggle dark mode"
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="hidden sm:block rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Copy Mermaid code"
            >
              {copyStatus}
            </button>
            <button
              onClick={handleDownloadSvg}
              className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              title="Export SVG"
            >
              Export SVG
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-screen-xl flex-col gap-6 p-4 md:flex-row">
        <Sidebar items={diagrams} currentId={selectedDiagram.id} onSelect={setSelectedDiagram} />

        <section className="flex w-full flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Diagram</div>
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">{selectedDiagram.title}</h2>
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-950">
                <MermaidRenderer key={selectedDiagram.id + (isDarkMode ? '-dark' : '-light')} code={selectedDiagram.code} onRender={setSvgContent} />
            </div>
          </div>

          <details className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <summary className="cursor-pointer text-sm font-semibold">Show Mermaid Source</summary>
            <pre className="mt-4 overflow-auto rounded-xl bg-gray-100 p-4 text-xs leading-relaxed dark:bg-gray-800 font-mono">{selectedDiagram.code}</pre>
          </details>
        </section>
      </main>

      <footer className="mx-auto max-w-screen-xl px-4 py-8 text-center text-xs text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} Alie Network • UML Studio
      </footer>
    </div>
  );
};

export default App;
