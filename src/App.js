import React, { useState } from 'react';
import Layout from './components/Layout';
import PdfUploadForm from './components/PdfUploadForm';
import BookAnimation from './components/BookAnimation';
import LearningPath from './components/LearningPath';

const MOCK_BOOKS = [
  { id: 1, name: "Statistics_Probability.pdf", status: 'ready' },
  { id: 2, name: "Machine_Learning_101.pdf", status: 'ready' },
];

function App() {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [currentView, setCurrentView] = useState({ type: 'upload' });
  const [pendingFile, setPendingFile] = useState(null);

  const handleFileSelect = (file) => {
    setPendingFile(file);
    setCurrentView({ type: 'uploading' });

    setTimeout(() => {
      setCurrentView({ type: 'prompt' });
    }, 2000);
  };

  const handleIngestionStart = (userGoal) => {
    if (!pendingFile) return;

    const newBook = {
      id: Date.now(),
      name: pendingFile.name,
      status: 'processing',
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
    setCurrentView({ type: 'book', bookId: newBook.id });
    setPendingFile(null);

    setTimeout(() => {
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === newBook.id ? { ...book, status: 'ready' } : book
        )
      );
    }, 10000);
  };

  const handleSelectBook = (bookId) => {
    setCurrentView({ type: 'book', bookId });
  };

  const handleAddNew = () => {
    setCurrentView({ type: 'upload' });
    setPendingFile(null);
  };

  const renderContent = () => {
    if (currentView.type === 'upload') {
        return (
            <PdfUploadForm
            onFileSelect={handleFileSelect}
            showPrompt={false}
            />
        );
    }
    
    if (currentView.type === 'uploading') {
        return <BookAnimation title="Uploading your book..." subtitle={pendingFile?.name} />;
    }

    if (currentView.type === 'prompt') {
      return (
        <PdfUploadForm
          onUploadTrigger={handleIngestionStart}
          showPrompt={true}
          fileName={pendingFile?.name}
        />
      );
    }

    if (currentView.type === 'book') {
      const selectedBook = books.find(b => b.id === currentView.bookId);
      if (!selectedBook) {
        setCurrentView({ type: 'upload' });
        return null;
      }
      switch (selectedBook.status) {
        case 'processing':
          return <BookAnimation type="pages" title="Processing your book..." subtitle={selectedBook.name} />;
        case 'ready':
          return <LearningPath fileName={selectedBook.name} onReset={handleAddNew} />;
        default:
          return <div>Unknown book status</div>;
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