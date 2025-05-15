import { create } from 'zustand';
import { Block, Page, Section } from '../types';

interface Store {
  pages: Page[];
  sections: Section[];
  currentPageId: string | null;
  addPage: (parentId?: string) => void;
  setCurrentPage: (id: string) => void;
  updateBlock: (pageId: string, blockId: string, content: string) => void;
  addBlock: (pageId: string) => void;
  addSubpage: (parentId: string) => void;
  markVisited: (pageId: string) => void;
}

export const useStore = create<Store>((set) => ({
  pages: [],
  sections: [
    {
      id: 'private',
      name: 'Private',
      pages: [],
    },
    {
      id: 'recent',
      name: 'Recently Visited',
      pages: [],
    },
  ],
  currentPageId: null,

  addPage: (parentId) => {
    const newPage: Page = {
      id: crypto.randomUUID(),
      title: 'Новая заметка',
      blocks: [],
      parentId,
      lastVisited: new Date(),
    };
    set((state) => ({
      pages: [...state.pages, newPage],
      sections: state.sections.map(sec =>
        sec.id === 'private'
          ? { ...sec, pages: [...sec.pages, newPage.id] }
          : sec
      ),
    }));
  },

  setCurrentPage: (id) => {
    set((state) => {
      const updatedSections = state.sections.map(sec =>
        sec.id === 'recent' && !sec.pages.includes(id)
          ? { ...sec, pages: [id, ...sec.pages.slice(0, 9)] }
          : sec
      );
      return {
        currentPageId: id,
        sections: updatedSections,
      };
    });
  },

  updateBlock: (pageId, blockId, content) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              blocks: page.blocks.map((b) =>
                b.id === blockId ? { ...b, content } : b
              ),
              lastVisited: new Date(),
            }
          : page
      ),
    })),

  addBlock: (pageId) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type: 'text',
      content: 'Новый текст',
    };
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId
          ? { ...page, blocks: [...page.blocks, newBlock] }
          : page
      ),
    }));
  },

  addSubpage: (parentId) => {
    const newPage: Page = {
      id: crypto.randomUUID(),
      title: 'Подстраница',
      blocks: [],
      parentId,
      lastVisited: new Date(),
    };
    set((state) => ({
      pages: [...state.pages, newPage],
      sections: state.sections.map(sec =>
        sec.id === 'private'
          ? { ...sec, pages: [...sec.pages, newPage.id] }
          : sec
      ),
    }));
  },

  markVisited: (pageId) => {
    set((state) => {
      const updatedSections = state.sections.map(sec =>
        sec.id === 'recent' && !sec.pages.includes(pageId)
          ? { ...sec, pages: [pageId, ...sec.pages.slice(0, 9)] }
          : sec
      );
      return { sections: updatedSections };
    });
  },
}));