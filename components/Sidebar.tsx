
import React, { useMemo } from 'react';
import { Diagram, DiagramGroup } from '../types';

interface SidebarProps {
  items: Diagram[];
  currentId: string;
  onSelect: (diagram: Diagram) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, currentId, onSelect }) => {
  const groups: DiagramGroup[] = useMemo(() => {
    const map = new Map<string, Diagram[]>();
    items.forEach((d) => {
      if (!map.has(d.group)) {
        map.set(d.group, []);
      }
      map.get(d.group)?.push(d);
    });
    return Array.from(map.entries());
  }, [items]);

  return (
    <aside className="w-full md:w-80 lg:w-96 shrink-0 space-y-4">
      {groups.map(([group, ds]) => (
        <div key={group} className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:bg-gray-900 dark:border-gray-700">
          <div className="px-3 mb-2 text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400">{group}</div>
          <ul className="space-y-1">
            {ds.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => onSelect(d)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    currentId === d.id
                      ? "bg-gray-900 text-white dark:bg-indigo-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {d.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
