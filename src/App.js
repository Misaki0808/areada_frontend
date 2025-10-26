import React, { useState } from 'react';
import Layout from './components/Layout';
import PdfUploadForm from './components/PdfUploadForm';
import BookAnimation from './components/BookAnimation';
import ReadingPath from './components/ReadingPath';
import Carousel from './components/Carousel';
import QuizModal from './components/QuizModal';
import { getQuizForPage } from './data/quizData';

const MOCK_BOOKS = [
  { id: 1, name: "Statistics_Probability.pdf", status: 'ready' },
  { id: 2, name: "Machine_Learning_101.pdf", status: 'ready' },
];

const MOCK_SLIDES = [
    { 
        title: 'The Challenges of Customer Conversations', 
    },
    { 
        title: 'Avoiding Bad Data in Customer Conversations', 
    },
    { 
        title: 'Best Practices for Customer Conversations', 
    },
];


function App() {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [currentView, setCurrentView] = useState({ type: 'upload' });
  const [pendingFile, setPendingFile] = useState(null);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState(new Set()); // Tamamlanan quiz'leri takip et
  const [previousPageIndex, setPreviousPageIndex] = useState(null); // Önceki sayfa index'ini takip et

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
    // Şimdilik sadece 2. chapter (index 1) için sayfalar var
    let pages = [];
    
    if (selectedChapterIndex === 1) {
      // "Avoiding Bad Data in Customer Conversations" chapter'ının sayfaları
      pages = [
        {
          title: "The Difficulty of Effective Customer Conversations",
          content: "Talking to customers is hard. We know we ought to talk to customers. Many of us even do talk to customers. But we still end up building stuff nobody buys. Isn't that exactly what talking to people is meant to prevent? It turns out almost all of us are doing it wrong. I've made these mistakes myself and seen them happen a hundred times over with other founders."
        },
        {
          title: "The Consequences of Bad Customer Conversations",
          content: "Bad customer conversations aren't just useless. Worse, they convince you that you're on the right path. They give you a false positive which causes you to over-invest your cash, your time, and your team. Even when you're not actively screwing something up, those pesky customers seem hellbent on lying to you."
        },
        {
          title: "The Need for a Practical Approach",
          content: "This book is a practical how-to. The approach and tools within are gathered from a wide range of communities including Customer Development, Design Thinking, Lean Startup, User Experience, traditional sales and more. It's based on working with a bunch of founders and from my experiences both failing and succeeding at customer learning, as well as from the support of innumerable peers and mentors."
        },
        {
          title: "Chapter Checkpoint",
          content: "What did you learn from this chapter?",
          isCheckpoint: true // Bu sayfa bir checkpoint
        }
      ];
    }

    setChapterIndex(selectedChapterIndex); // Remember where we left off
    setPreviousPageIndex(null); // Yeni chapter'a geçerken sayfa index'ini sıfırla

    setCurrentView({
      type: 'pages',
      bookId: currentView.bookId,
      chapterIndex: selectedChapterIndex, // Know which chapter we came from
      pages: pages
    });
  };

  const handlePageChange = (newPageIndex) => {
    // İlk yüklemede quiz gösterme (previousPageIndex null ise)
    if (previousPageIndex === null) {
      setPreviousPageIndex(newPageIndex);
      return;
    }
    
    // Aynı sayfaya geçiş varsa ignore et
    if (previousPageIndex === newPageIndex) {
      return;
    }
    
    // Döngüsel geçiş durumunu kontrol et (son sayfadan ilk sayfaya)
    const totalPages = currentView.pages?.length || 0;
    const isWrappingToStart = newPageIndex === 0 && previousPageIndex === totalPages - 1;
    
    if (isWrappingToStart) {
      // Son sayfadan ilk sayfaya dönüyorsa, son sayfanın quiz'ini göster
      const lastPageIndex = totalPages - 1;
      const quiz = getQuizForPage(currentView.chapterIndex, lastPageIndex);
      
      if (quiz && !completedQuizzes.has(quiz.id)) {
        setCurrentQuiz(quiz);
      }
    } else if (newPageIndex > previousPageIndex) {
      // İleri gidiyoruz: Önceki sayfanın quiz'ini göster
      const quiz = getQuizForPage(currentView.chapterIndex, previousPageIndex);
      
      if (quiz && !completedQuizzes.has(quiz.id)) {
        setCurrentQuiz(quiz);
      }
    }
    
    // Yeni index'i kaydet
    setPreviousPageIndex(newPageIndex);
  };

  const handleQuizCorrect = () => {
    // Quiz doğru cevaplanınca, quiz'i tamamlandı olarak işaretle
    if (currentQuiz) {
      setCompletedQuizzes(prev => new Set([...prev, currentQuiz.id]));
    }
    // Quiz'i kapat
    setCurrentQuiz(null);
  };

  const handleQuizWrong = (referencePageIndex) => {
    // Quiz yanlış cevaplanınca, cevabın bulunduğu sayfaya yönlendir
    setCurrentQuiz(null);
    
    // Carousel'ı o sayfaya yönlendir
    if (currentView.type === 'pages') {
      // View'ı güncelle ve yeni başlangıç sayfasını set et
      setCurrentView({
        ...currentView,
        initialPageIndex: referencePageIndex,
        // Key'i değiştirmek için timestamp ekle
        timestamp: Date.now()
      });
    }
  };

  const handleCloseQuiz = () => {
    setCurrentQuiz(null);
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
          <>
            <Carousel 
              key={`pages-${currentView.chapterIndex}-${currentView.timestamp || 'initial'}`}
              slides={currentView.pages} 
              onExit={handleExitPages} 
              initialIndex={currentView.initialPageIndex || 0}
              onIndexChange={handlePageChange}
            />
            {currentQuiz && (
              <QuizModal
                quiz={currentQuiz}
                onCorrectAnswer={handleQuizCorrect}
                onWrongAnswer={handleQuizWrong}
                onClose={handleCloseQuiz}
              />
            )}
          </>
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