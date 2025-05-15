import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { AIPanel } from './AIPanel';
import { PageTree } from './PageTree';
import { RecentNotes } from './RecentNotes';

export const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'notes'>('home');
  const { addPage } = useStore();

  return (
    <div className="left-sidebar">
      {/* Верхняя часть */}
      <div className="sidebar-header">
        <button
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          Private
        </button>
      </div>

      {/* Содержимое вкладок */}
      <div className="sidebar-content">
        {activeTab === 'home' && (
          <>
            {/* Поиск */}
            <div className="search">
              <input type="text" placeholder="Поиск по Notion..." />
            </div>

            {/* Недавние заметки */}
            <RecentNotes />

            {/* ИИ-панель */}
            <AIPanel text="Пример текста" onResult={(res) => console.log(res)} />
          </>
        )}

        {activeTab === 'notes' && (
          <>
            {/* Дерево заметок */}
            <PageTree />
            <button className="add-page-btn" onClick={() => addPage()}>
              + Новая заметка
            </button>
          </>
        )}
      </div>

      {/* Настройки внизу */}
      <div className="sidebar-footer">
        <button className="settings-btn">⚙️ Настройки</button>
      </div>
    </div>
  );
};