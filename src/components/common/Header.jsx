import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, User, LogOut, Menu, X, ChevronDown, Crown, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { cart, setIsCartOpen, user, logout, language, setLanguage, t } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 group shrink-0">
          <img 
            src="/logo.png" 
            alt="Edu Planner KZ" 
            className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://ui-avatars.com/api/?name=Edu+Planner&background=0A2A43&color=F5B041";
            }}
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm relative hidden md:block">
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/catalog" className="text-sm font-black text-gray-600 hover:text-accent transition-colors uppercase tracking-wider">{t.nav.catalog}</Link>
          <Link to="/pricing" className="text-sm font-black text-gray-600 hover:text-accent transition-colors uppercase tracking-wider">{t.nav.pricing}</Link>
          <Link to="/authors" className="text-sm font-black text-gray-600 hover:text-accent transition-colors uppercase tracking-wider">{t.nav.authors}</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLanguage(language === 'KZ' ? 'RU' : 'KZ')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all text-xs font-black text-primary border border-transparent hover:border-gray-200"
          >
            <Globe className="w-4 h-4 text-accent" />
            <span>{language}</span>
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all group"
          >
            <ShoppingCart className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xl">
                {cart.length}
              </span>
            )}
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 p-1.5 pl-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all bg-white">
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-sm font-bold text-primary leading-tight">{user?.name}</span>
                {user?.subscription === 'premium' && (
                  <span className="text-[9px] font-black text-secondary flex items-center gap-1 uppercase tracking-tighter">
                    <Crown className="w-2.5 h-2.5 fill-current" /> Premium
                  </span>
                )}
                {user?.subscription === 'standard' && (
                  <span className="text-[9px] font-black text-accent flex items-center gap-1 uppercase tracking-tighter">
                    <ShieldCheck className="w-2.5 h-2.5 fill-current" /> Standard
                  </span>
                )}
              </div>
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} alt="Avatar" />
                {user?.subscription && user.subscription !== 'none' && (
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.subscription === 'premium' ? 'bg-secondary' : 'bg-accent'}`}></div>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
            </button>
            
            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-60 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-3">
                <div className="px-4 py-2 border-b border-gray-50 mb-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Аккаунт</p>
                  <p className="text-sm font-bold text-primary truncate">{user?.email}</p>
                </div>
                
                {user?.subscription && user.subscription !== 'none' && (
                  <div className="px-4 py-3 bg-gray-50/50 mb-2">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Тариф</p>
                    <p className={`text-xs font-black uppercase tracking-wider ${user.subscription === 'premium' ? 'text-secondary' : 'text-accent'}`}>
                      {user.subscription}
                    </p>
                  </div>
                )}

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> {t.nav.logout}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl p-6 flex flex-col gap-4"
          >
            <Link to="/catalog" className="text-lg font-black text-primary p-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.catalog}</Link>
            <Link to="/pricing" className="text-lg font-black text-primary p-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.pricing}</Link>
            <Link to="/authors" className="text-lg font-black text-primary p-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.authors}</Link>
            <div className="h-px bg-gray-100 my-2"></div>
            <button onClick={handleLogout} className="flex items-center gap-3 text-lg font-black text-red-600 p-2">
              <LogOut className="w-5 h-5" /> {t.nav.logout}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
