import React, { useState } from 'react';
import Layout from './components/Layout';
import PdfUploadForm from './components/PdfUploadForm';
import BookAnimation from './components/BookAnimation';
import LearningPath from './components/LearningPath';
import Carousel from './components/Carousel';

const MOCK_BOOKS = [
  { id: 1, name: "Statistics_Probability.pdf", status: 'ready' },
  { id: 2, name: "Machine_Learning_101.pdf", status: 'ready' },
];

const MOCK_SLIDES = [
    { title: 'Introduction to Areada', content: 'This is the first part of your learning path. Swipe to continue.' },
    { title: 'Core Concepts', content: 'Here we dive into the main topics of the selected chapter.' },
    { title: 'Practical Examples', content: 'Let\'s see how these concepts are applied in real-world scenarios.' },
    { title: 'Quiz Time', content: 'Test your knowledge with a quick quiz.' },
    { title: 'Summary', content: 'Here is a summary of what you have learned in this section.' },
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
    }, 5000); // 5 saniye bekleme
  };

  const handleSelectBook = (bookId) => {
    setCurrentView({ type: 'book', bookId });
  };

  const handleAddNew = () => {
    setCurrentView({ type: 'upload' });
    setPendingFile(null);
  };

  const handleStartLearning = (bookId) => {
      setCurrentView({ type: 'learning', bookId: bookId });
  };

  const handleExitLearning = () => {
    setCurrentView({ type: 'book', bookId: currentView.bookId });
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
          return <LearningPath fileName={selectedBook.name} onReset={handleAddNew} onStart={() => handleStartLearning(selectedBook.id)} />;
        default:
          return <div>Unknown book status</div>;
      }
    }

    if (currentView.type === 'learning') {
        return <Carousel slides={MOCK_SLIDES} onExit={handleExitLearning} />;
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