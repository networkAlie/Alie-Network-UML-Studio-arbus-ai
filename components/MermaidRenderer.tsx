
import React, { useEffect, useRef } from 'react';
import mermaid from "mermaid";

interface MermaidRendererProps {
  code: string;
  onRender: (svg: string) => void;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ code, onRender }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    if (ref.current) {
        ref.current.innerHTML = '<div class="flex justify-center items-center p-8"><svg class="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>';
    }
    const id = `mmd_${Math.random().toString(36).slice(2)}`;
    
    mermaid.render(id, code)
      .then(({ svg }) => {
        if (!active) return;
        if (ref.current) {
          ref.current.innerHTML = svg;
          // Ensure SVG scales correctly
          const svgEl = ref.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
          }
        }
        onRender(svg);
      })
      .catch((err) => {
        if (!active) return;
        if (ref.current) {
          const safeCode = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          ref.current.innerHTML = `<div class="p-4 bg-red-50 text-red-700 rounded-lg"><h4 class="font-bold mb-2">Mermaid Render Error</h4><p class="text-sm mb-4">${String(err)}</p><pre class='text-xs bg-red-100 p-2 rounded whitespace-pre-wrap font-mono'>${safeCode}</pre></div>`;
        }
      });

    return () => {
      active = false;
    };
  }, [code, onRender]);

  return <div ref={ref} className="w-full flex justify-center items-center" />;
};

export default MermaidRenderer;
