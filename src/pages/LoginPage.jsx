import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, t, language, setLanguage } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Даурен', email: 'user@example.com', role: 'teacher' });
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left side: Banner */}
      <div className="lg:w-1/2 relative bg-primary overflow-hidden hidden lg:flex flex-col justify-center p-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 border-[40px] border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border-[20px] border-secondary rounded-full"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4 mb-12">
            <img src="/logo.png" alt="Logo" className="h-24 w-auto object-contain" />
          </div>
          
          <h2 className="text-5xl font-black text-white leading-tight mb-8">
            {t.hero.title}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-lg mb-12 font-medium">
            {t.hero.desc}
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-primary bg-gray-200 overflow-hidden shadow-xl">
                  <img src={`https://ui-avatars.com/api/?name=U${i}&background=random`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-white/80 font-bold italic">Более 10,000 учителей уже с нами</p>
          </div>
        </motion.div>
        
        <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-20 transform translate-x-1/4 translate-y-1/4">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop" alt="Edu" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-20 relative">
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => setLanguage(language === 'KZ' ? 'RU' : 'KZ')}
            className="px-6 py-3 bg-white rounded-2xl font-black text-sm text-primary hover:shadow-xl transition-all border border-gray-100 flex items-center gap-3"
          >
            <span className={language === 'KZ' ? 'text-accent' : ''}>KZ</span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className={language === 'RU' ? 'text-accent' : ''}>RU</span>
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-12">
            <h3 className="text-4xl font-black text-primary mb-4 tracking-tight">
              {isRegister ? t.auth.registerTitle : t.auth.loginTitle}
            </h3>
            <p className="text-gray-500 font-medium">
              {isRegister ? 'Создайте аккаунт в Edu Planner KZ' : t.auth.welcome}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Полное имя"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4.5 pl-12 pr-4 focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all font-bold"
                  required
                />
              </div>
            )}
            
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors w-5 h-5" />
              <input 
                type="email" 
                placeholder={t.auth.email}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4.5 pl-12 pr-4 focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all font-bold"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors w-5 h-5" />
              <input 
                type="password" 
                placeholder={t.auth.password}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4.5 pl-12 pr-4 focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all font-bold"
                required
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-accent focus:ring-accent cursor-pointer transition-all" />
                <span className="text-sm text-gray-500 group-hover:text-primary transition-colors font-bold">Запомнить меня</span>
              </label>
              <a href="#" className="text-sm font-black text-accent hover:underline decoration-2 underline-offset-4">Забыли пароль?</a>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl hover:bg-primary-light shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-4 mt-4 active:scale-95"
            >
              {isRegister ? t.nav.register : t.auth.submit}
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-500 font-bold">
              {isRegister ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="ml-3 font-black text-accent hover:underline decoration-2 underline-offset-4"
              >
                {isRegister ? t.nav.login : t.nav.register}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
