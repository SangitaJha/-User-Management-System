import React, { useState } from 'react';
import './App.css';
import UserManagement from './components/UserManagement';
import AddressManagement from './components/AddressManagement';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>👥 User Management System</h1>
        <p>Complete CRUD Operations for Users and Addresses</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👤 Users
        </button>
        <button
          className={`nav-tab ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          📍 Addresses
        </button>
      </nav>

      <div className="content-area">
        {activeTab === 'users' ? <UserManagement /> : <AddressManagement />}
      </div>
    </div>
  );
}

export default App;
