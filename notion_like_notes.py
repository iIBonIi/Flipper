import json
import os
from typing import List

DATA_DIR = 'notes'

class Note:
    def __init__(self, title: str):
        self.title = title
        self.blocks: List[dict] = []  # each block has type and content

    def add_text(self, text: str):
        self.blocks.append({'type': 'text', 'content': text})

    def add_bullet(self, text: str):
        self.blocks.append({'type': 'bullet', 'content': text})

    def add_checkbox(self, text: str, checked: bool = False):
        self.blocks.append({'type': 'checkbox', 'content': text, 'checked': checked})

    def to_dict(self):
        return {'title': self.title, 'blocks': self.blocks}

    @staticmethod
    def from_dict(data: dict):
        note = Note(data['title'])
        note.blocks = data.get('blocks', [])
        return note

def save_note(note: Note):
    os.makedirs(DATA_DIR, exist_ok=True)
    path = os.path.join(DATA_DIR, f"{note.title}.json")
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(note.to_dict(), f, ensure_ascii=False, indent=2)


def load_note(title: str) -> Note:
    path = os.path.join(DATA_DIR, f"{title}.json")
    if not os.path.exists(path):
        raise FileNotFoundError(f"Note '{title}' not found")
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return Note.from_dict(data)


def list_notes() -> List[str]:
    if not os.path.isdir(DATA_DIR):
        return []
    return [f[:-5] for f in os.listdir(DATA_DIR) if f.endswith('.json')]


def display_note(note: Note):
    print(f"# {note.title}\n")
    for block in note.blocks:
        if block['type'] == 'text':
            print(block['content'])
        elif block['type'] == 'bullet':
            print(f"- {block['content']}")
        elif block['type'] == 'checkbox':
            check = '[x]' if block.get('checked') else '[ ]'
            print(f"{check} {block['content']}")
        print()


def interactive():
    print("Simple Notion-like Notes")
    while True:
        cmd = input("Enter command (new/list/open/quit): ").strip().lower()
        if cmd == 'new':
            title = input("Title: ")
            note = Note(title)
            while True:
                block_type = input("Add block (text/bullet/checkbox/done): ").strip().lower()
                if block_type == 'done':
                    break
                elif block_type == 'text':
                    note.add_text(input("Text: "))
                elif block_type == 'bullet':
                    note.add_bullet(input("Bullet: "))
                elif block_type == 'checkbox':
                    note.add_checkbox(input("Task: "))
                else:
                    print("Unknown block type")
            save_note(note)
        elif cmd == 'list':
            notes = list_notes()
            if not notes:
                print("No notes available")
            for n in notes:
                print(n)
        elif cmd == 'open':
            title = input("Title: ")
            try:
                note = load_note(title)
                display_note(note)
            except FileNotFoundError as e:
                print(e)
        elif cmd == 'quit':
            break
        else:
            print("Unknown command")

if __name__ == '__main__':
    interactive()
