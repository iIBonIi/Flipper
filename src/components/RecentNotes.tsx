import React from 'react';
import { useStore } from '../store/useStore';

export const RecentNotes = () => {
  const { pages, sections, setCurrentPage } = useStore();

  const recentPageIds = sections.find(s => s.id === 'recent')?.pages || [];

  return (
    <div className="recent-notes">
      <h4>Недавно открывал</h4>
      <ul>
        {recentPageIds.map(id => {
          const page = pages.find(p => p.id === id);
          if (!page) return null;
          return (
            <li key={id} onClick={() => setCurrentPage(page.id)}>
              {page.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};