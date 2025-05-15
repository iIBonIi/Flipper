import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../db.json');

function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function initDB() {
  console.log('JSON-База данных инициализирована');
  return {
    getNotes: () => readDB().notes,
    getNoteById: (id: number) => readDB().notes.find((n: any) => n.id === id),
    addNote: (note: any) => {
      const db = readDB();
      db.notes.push(note);
      writeDB(db);
    },
    updateNote: (id: number, updatedNote: any) => {
      const db = readDB();
      db.notes = db.notes.map((n: any) => n.id === id ? { ...n, ...updatedNote } : n);
      writeDB(db);
    },
    deleteNote: (id: number) => {
      const db = readDB();
      db.notes = db.notes.filter((n: any) => n.id !== id);
      writeDB(db);
    },
  };
}