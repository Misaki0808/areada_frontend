import React from 'react';
import '../styles/Sidebar.css';

const StatusIcon = ({ status }) => {
  if (status === 'processing') return <div className="status-spinner"></div>;
  if (status === 'ready') return <span className="status-ready">✓</span>;
  return null;
};

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.14 12.94C19.76 12.39 20.53 12.3 21.22 12.63L22 13V11C22 9.9 21.1 9 20 9H18C17.4 9 17 8.6 16.8 8.12C16.4 7.15 15.82 6.26 15.06 5.5C14.69 5.12 14.24 4.82 13.76 4.61C13.29 4.4 12.79 4.26 12.28 4.19C12 4.16 11.72 4.13 11.43 4.11C11.15 4.09 10.86 4.08 10.57 4.08C10.28 4.08 10 4.09 9.72 4.11C9.43 4.13 9.15 4.16 8.87 4.19C8.36 4.26 7.86 4.4 7.39 4.61C6.91 4.82 6.46 5.12 6.09 5.5C5.32 6.26 4.74 7.15 4.34 8.12C4.14 8.6 3.7 9 3.1 9H2C0.9 9 0 9.9 0 11V13C0 14.1 0.9 15 2 15H4C4.6 15 5 15.4 5.2 15.88C5.6 16.85 6.18 17.74 6.94 18.5C7.31 18.88 7.76 19.18 8.24 19.39C8.71 19.6 9.21 19.74 9.72 19.81C10 19.84 10.28 19.87 10.57 19.89C10.85 19.91 11.14 19.92 11.43 19.92C11.72 19.92 12 19.91 12.28 19.89C12.57 19.87 12.85 19.84 13.13 19.81C13.64 19.74 14.14 19.6 14.61 19.39C15.09 19.18 15.54 18.88 15.91 18.5C16.68 17.74 17.26 16.85 17.66 15.88C17.86 15.4 18.3 15 18.9 15H20C21.1 15 22 14.1 22 13L21.22 12.63C20.53 12.3 19.76 12.39 19.14 12.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const Sidebar = ({ books, onSelectBook, onAddNew, currentView, isOpen, toggle }) => {
  const handleItemClick = (handler, ...args) => {
    if (window.innerWidth <= 768) {
      toggle();
    }
    handler(...args);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-top">
        <button onClick={toggle} className="sidebar-button toggle-button">
          <HamburgerIcon />
        </button>
        <button onClick={() => handleItemClick(onAddNew)} className="sidebar-button add-new-button">
          <EditIcon />
          <span className="button-text">Upload New Book</span>
        </button>
        <nav className="book-list">
          <ul>
            {books.map((book) => (
              <li
                key={book.id}
                className={currentView.type === 'book' && currentView.bookId === book.id ? 'active' : ''}
                onClick={() => handleItemClick(onSelectBook, book.id)}
              >
                <span className="book-name">{book.name}</span>
                <StatusIcon status={book.status} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-bottom">
        <button className="sidebar-button settings-button">
          <SettingsIcon />
          <span className="button-text">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;