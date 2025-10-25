import React, { useState } from 'react'; // useState import et
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ books, onSelectBook, onAddNew, children, currentView }) => {
  // YENİ: Sidebar'ın durumunu tutan state. Başlangıçta açık (true).
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // YENİ: State'i tersine çeviren fonksiyon
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-container">
      <Sidebar
        books={books}
        onSelectBook={onSelectBook}
        onAddNew={onAddNew}
        currentView={currentView}
        // YENİ: State ve fonksiyonu Sidebar bileşenine prop olarak gönder
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