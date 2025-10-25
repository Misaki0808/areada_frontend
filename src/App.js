import React, { useState } from 'react';
import Layout from './components/Layout';
import PdfUploadForm from './components/PdfUploadForm';
import BookAnimation from './components/BookAnimation';
import ReadingPath from './components/ReadingPath';
import Carousel from './components/Carousel';

const MOCK_BOOKS = [
  { id: 1, name: "Statistics_Probability.pdf", status: 'ready' },
  { id: 2, name: "Machine_Learning_101.pdf", status: 'ready' },
];

const MOCK_SLIDES = [
    { title: 'Chapter 1: Introduction to Statistics', content: 'Understanding the fundamental concepts of statistics and probability theory. Read the basics of data analysis and statistical thinking.', pageCount: 25 },
    { title: 'Chapter 2: Descriptive Statistics', content: 'Read how to summarize and describe data using measures like mean, median, mode, variance, and standard deviation.', pageCount: 32 },
    { title: 'Chapter 3: Probability Theory', content: 'Explore the mathematical framework for quantifying uncertainty and randomness in statistical analysis.', pageCount: 28 },
    { title: 'Chapter 4: Random Variables', content: 'Understanding discrete and continuous random variables and their probability distributions.', pageCount: 35 },
    { title: 'Chapter 5: Statistical Inference', content: 'Read how to make predictions and draw conclusions from sample data using estimation techniques.', pageCount: 22 },
    { title: 'Chapter 6: Hypothesis Testing', content: 'Master the process of testing claims about populations using sample statistics and p-values.', pageCount: 30 },
    { title: 'Chapter 7: Confidence Intervals', content: 'Construct and interpret confidence intervals for population parameters with various confidence levels.', pageCount: 18 },
    { title: 'Chapter 8: Regression Analysis', content: 'Explore relationships between variables using linear regression, correlation, and predictive modeling.', pageCount: 38 },
    { title: 'Chapter 9: ANOVA and Chi-Square', content: 'Analyze variance between groups and test independence in categorical data using statistical tests.', pageCount: 27 },
    { title: 'Chapter 10: Advanced Topics', content: 'Dive into Bayesian statistics, non-parametric methods, and modern machine reading applications.', pageCount: 40 },
];


function App() {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [currentView, setCurrentView] = useState({ type: 'upload' });
  const [pendingFile, setPendingFile] = useState(null);
  const [chapterIndex, setChapterIndex] = useState(0);

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

  const handleStartReading = (bookId) => {
      setCurrentView({ type: 'chapters', bookId: bookId });
  };

  const handleChapterSelect = (selectedChapterIndex) => {
    const selectedChapter = MOCK_SLIDES[selectedChapterIndex];
    const pageCount = selectedChapter.pageCount || 20;
    const pages = Array.from({ length: pageCount }, (_, i) => ({
      title: `${selectedChapter.title} - Page ${i + 1}`,
      content: `This is page ${i + 1} of ${selectedChapter.title.toLowerCase()}. Here you will find detailed information and reading materials specific to this chapter.`
    }));

    setChapterIndex(selectedChapterIndex); // Remember where we left off

    setCurrentView({
      type: 'pages',
      bookId: currentView.bookId,
      chapterIndex: selectedChapterIndex, // Know which chapter we came from
      pages: pages
    });
  };

  const handleExitPages = () => {
    setCurrentView({ type: 'chapters', bookId: currentView.bookId });
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
          return <ReadingPath fileName={selectedBook.name} onReset={handleAddNew} onStart={() => handleStartReading(selectedBook.id)} />;
        default:
          return <div>Unknown book status</div>;
      }
    }

    if (currentView.type === 'chapters') {
        return (
          <Carousel 
            key={`chapters-${currentView.bookId}`}
            slides={MOCK_SLIDES} 
            onSlideClick={handleChapterSelect}
            initialIndex={chapterIndex}
            onIndexChange={setChapterIndex}
          />
        );
    }

    if (currentView.type === 'pages') {
        return (
          <Carousel 
            key={`pages-${currentView.chapterIndex}`}
            slides={currentView.pages} 
            onExit={handleExitPages} 
            initialIndex={0} // Always start from the first page
          />
        );
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