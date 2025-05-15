import { Editor } from './components/Editor';
import { LeftSidebar } from './components/LeftSidebar';
import { useStore } from './store/useStore';

function App() {
  const { currentPageId, pages } = useStore();
  const currentPage = pages.find(p => p.id === currentPageId);

  return (
    <div className="app">
      <LeftSidebar />
      <div className="main">
        {currentPage ? <Editor /> : <p>Выберите заметку</p>}
      </div>
    </div>
  );
}

export default App;