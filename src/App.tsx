import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Anfrage from './pages/Anfrage';
import Danke from './pages/Danke';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white font-inter">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/danke" element={<Danke />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;