// src/App.js
import React, { useState } from 'react';
import Layout from './components/Layout';
import PdfUploadForm from './components/PdfUploadForm';
import Processing from './components/Processing';
import LearningPath from './components/LearningPath';

const MOCK_BOOKS = [
  { id: 1, name: "İstatistik_Olasılık.pdf", status: 'ready' },
  { id: 2, name: "Makine_Öğrenmesi_101.pdf", status: 'ready' },
];

function App() {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [currentView, setCurrentView] = useState({ type: 'upload' });

  const handleIngestionStart = (file, userGoal) => {
    const newBook = {
      id: Date.now(),
      name: file.name,
      status: 'processing',
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
    setCurrentView({ type: 'book', bookId: newBook.id });
    setTimeout(() => {
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === newBook.id ? { ...book, status: 'ready' } : book
        )
      );
    }, 5000);
  };

  const handleSelectBook = (bookId) => {
    setCurrentView({ type: 'book', bookId });
  };

  const handleAddNew = () => {
    setCurrentView({ type: 'upload' });
  };

  const renderContent = () => {
    if (currentView.type === 'upload') {
      return <PdfUploadForm onUploadTrigger={handleIngestionStart} />;
    }
    if (currentView.type === 'book') {
      const selectedBook = books.find(b => b.id === currentView.bookId);
      if (!selectedBook) {
        setCurrentView({ type: 'upload' });
        return null;
      }
      switch (selectedBook.status) {
        case 'processing':
          return <Processing />;
        case 'ready':
          return <LearningPath fileName={selectedBook.name} onReset={handleAddNew} />;
        default:
          return <div>Bilinmeyen kitap durumu</div>;
      }
    }
  };

  return (
    <Layout
      books={books}
      onSelectBook={handleSelectBook}
      onAddNew={handleAddNew}
      currentView={currentView}
    >
      {renderContent()}
    </Layout>
  );
}
export default App;