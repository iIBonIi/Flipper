export type BlockType = 'text' | 'heading' | 'list' | 'table' | 'divider';

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  children?: Block[];
}

export interface Page {
  id: string;
  title: string;
  emoji?: string;
  blocks: Block[];
  parentId?: string | null;
  lastVisited?: Date;
}

export interface Section {
  id: string;
  name: string;
  pages: string[]; // ID страниц
}