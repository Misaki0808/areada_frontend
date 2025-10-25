import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ books, onSelectBook, onAddNew, children, currentView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const HamburgerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="layout-container">
      <button onClick={toggleSidebar} className="mobile-menu-button">
        <HamburgerIcon />
      </button>
      <Sidebar
        books={books}
        onSelectBook={onSelectBook}
        onAddNew={onAddNew}
        currentView={currentView}
        isOpen={isSidebarOpen}
        toggle={toggleSidebar}
      />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default Layout;