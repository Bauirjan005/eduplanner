import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState('KZ'); // 'KZ' or 'RU'
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[language];

  const login = (userData) => {
    const userWithSub = { ...userData, subscription: userData.subscription || 'none' };
    setUser(userWithSub);
    localStorage.setItem('edu_user', JSON.stringify(userWithSub));
  };

  const setSubscription = (level) => {
    if (!user) return;
    const updatedUser = { ...user, subscription: level };
    setUser(updatedUser);
    localStorage.setItem('edu_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edu_user');
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        language,
        setLanguage,
        isCartOpen,
        setIsCartOpen,
        t,
        setSubscription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
