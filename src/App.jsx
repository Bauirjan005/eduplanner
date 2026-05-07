import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import AppLayout from './components/common/AppLayout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import AuthorsPage from './pages/AuthorsPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

// Public Route Wrapper (redirect to home if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useApp();
  if (user) return <Navigate to="/home" replace />;
  return children;
};

// Stubs for other pages
const Placeholder = ({ title }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl font-black text-primary mb-4 tracking-tight">{title}</h1>
    <p className="text-gray-400 font-bold italic">Эта страница находится в разработке.</p>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route path="home" element={<Home />} />
            <Route path="catalog" element={<Marketplace />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="authors" element={<AuthorsPage />} />
            <Route path="webinars" element={<Placeholder title="Вебинары" />} />
            <Route path="reviews" element={<Placeholder title="Пікірлер" />} />
            <Route path="contacts" element={<Placeholder title="Контактілер" />} />
            <Route path="dashboard" element={<Placeholder title="Личный кабинет" />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
