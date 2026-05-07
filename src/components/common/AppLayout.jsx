import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/30 selection:text-primary">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default AppLayout;
