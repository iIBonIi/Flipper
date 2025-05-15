import React from 'react';
import { useStore } from '../store/useStore'; // Импортируем хранилище
import { Block } from '../types'; // Импортируем типы

// Компонент редактора блоков
export const Editor = () => {
  // Получаем данные из хранилища
  const { currentPageId, pages, updateBlock, addBlock } = useStore();

  // Находим текущую открытую страницу
  const page = pages.find(p => p.id === currentPageId);

  // Если страница не выбрана — показываем сообщение
  if (!page) {
    return (
      <div className="no-page">
        <p>Выберите страницу из левой панели</p>
      </div>
    );
  }

  // Функция добавления нового блока
  const handleAddBlock = () => {
    addBlock(page.id);
  };

  return (
    <div className="editor">
      {/* Кнопка для добавления нового блока */}
      <button className="add-block-btn" onClick={handleAddBlock}>
        + Добавить блок
      </button>

      {/* Список блоков на странице */}
      {page.blocks.map((block: Block) => (
        <div key={block.id} className="block">
          {/* Текстовое поле для редактирования блока */}
          <textarea
            className="block-editor"
            value={block.content}
            onChange={(e) => updateBlock(page.id, block.id, e.target.value)}
            placeholder="Начните печатать..."
          />
        </div>
      ))}
    </div>
  );
};