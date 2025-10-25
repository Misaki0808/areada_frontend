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
    { title: 'Chapter 1: Introduction to Statistics', content: 'Understanding the fundamental concepts of statistics and probability theory. Learn the basics of data analysis and statistical thinking.' },
    { title: 'Chapter 2: Descriptive Statistics', content: 'Learn how to summarize and describe data using measures like mean, median, mode, variance, and standard deviation.' },
    { title: 'Chapter 3: Probability Theory', content: 'Explore the mathematical framework for quantifying uncertainty and randomness in statistical analysis.' },
    { title: 'Chapter 4: Random Variables', content: 'Understanding discrete and continuous random variables and their probability distributions.' },
    { title: 'Chapter 5: Statistical Inference', content: 'Learn how to make predictions and draw conclusions from sample data using estimation techniques.' },
    { title: 'Chapter 6: Hypothesis Testing', content: 'Master the process of testing claims about populations using sample statistics and p-values.' },
    { title: 'Chapter 7: Confidence Intervals', content: 'Construct and interpret confidence intervals for population parameters with various confidence levels.' },
    { title: 'Chapter 8: Regression Analysis', content: 'Explore relationships between variables using linear regression, correlation, and predictive modeling.' },
    { title: 'Chapter 9: ANOVA and Chi-Square', content: 'Analyze variance between groups and test independence in categorical data using statistical tests.' },
    { title: 'Chapter 10: Advanced Topics', content: 'Dive into Bayesian statistics, non-parametric methods, and modern machine learning applications.' },
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