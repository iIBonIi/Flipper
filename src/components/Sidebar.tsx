import React from 'react';
import { useStore } from '../store/useStore';
import { PageTree } from './PageTree'; // Импортируем дерево

export const Sidebar = () => {
  const { addPage } = useStore();

  return (
    <div className="sidebar">
      {/* Поиск */}
      <div className="search">
        <input type="text" placeholder="Поиск..." />
      </div>

      {/* Меню */}
      <nav>
        <h3>Orca AI</h3>
        <ul>
          <li>Главная</li>
          <li>Приватные заметки</li>
          <li>Настройки</li>
        </ul>
      </nav>

      {/* Дерево страниц */}
      <PageTree />

      {/* Кнопка добавления страницы */}
      <button onClick={() => addPage()}>+ Новая страница</button>
    </div>
  );
};