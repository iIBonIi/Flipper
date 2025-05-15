import React from 'react';
import { useStore } from '../store/useStore';

export const PageTree = () => {
  const { pages, currentPageId, setCurrentPage, addSubpage } = useStore();

  const renderNodes = (parentId: string | null = null) => {
    return pages
      .filter(p => p.parentId === parentId)
      .map((page) => (
        <div key={page.id} className="page-node">
          <div
            className={`page-title ${currentPageId === page.id ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage(page.id);
              useStore.getState().markVisited(page.id);
            }}
          >
            {page.title}
          </div>
          <button
            className="add-subpage-btn"
            onClick={() => addSubpage(page.id)}
          >
            + Подстраница
          </button>
          <div className="children">{renderNodes(page.id)}</div>
        </div>
      ));
  };

  return (
    <div className="page-tree">
      {renderNodes()}
    </div>
  );
};