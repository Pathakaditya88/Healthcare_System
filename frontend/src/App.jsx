import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          {/* Landing / Login Page */}
          <Route path="/" element={<Login />} />

          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Catch-all: Redirect unknown URLs to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;