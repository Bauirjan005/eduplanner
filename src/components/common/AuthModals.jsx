import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AuthModals = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('teacher'); // 'teacher' or 'author'

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Даурен', email: 'dauren@example.com', role });
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black text-primary mb-2">
                  {isRegister ? 'Регистрация' : 'С возвращением'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {isRegister ? 'Создайте аккаунт и начните путь' : 'Войдите в свой аккаунт Edu Planner'}
                </p>
              </div>
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 pt-4">
              {/* Tabs for Registration */}
              {isRegister && (
                <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
                  <button 
                    onClick={() => setRole('teacher')}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${role === 'teacher' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}
                  >
                    Я ищу материалы
                  </button>
                  <button 
                    onClick={() => setRole('author')}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${role === 'author' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}
                  >
                    Я хочу продавать
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Полное имя"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      required
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    required
                  />
                </div>

                {isRegister && (
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="tel" 
                      placeholder="Телефон"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    placeholder="Пароль"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    required
                  />
                </div>

                {!isRegister && (
                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded text-accent focus:ring-accent" />
                      <span className="text-xs text-gray-500 group-hover:text-primary transition-colors">Запомнить меня</span>
                    </label>
                    <a href="#" className="text-xs font-bold text-accent hover:underline">Забыли пароль?</a>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-primary-light shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 mt-6"
                >
                  {isRegister ? 'Создать аккаунт' : 'Войти'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
                  <button 
                    onClick={() => setIsRegister(!isRegister)}
                    className="ml-2 font-black text-accent hover:underline"
                  >
                    {isRegister ? 'Войти' : 'Зарегистрироваться'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModals;
