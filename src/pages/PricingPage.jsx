import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Star, Shield, Zap, Target, Rocket, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PricingPage = () => {
  const { t, setSubscription, user } = useApp();
  const [loading, setLoading] = useState(null);

  const handleSelect = (level) => {
    setLoading(level);
    setTimeout(() => {
      setSubscription(level);
      setLoading(null);
    }, 1500);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-20 font-sans">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-[#008B8B] mb-4 inline-block">Тарифтер</span>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0A2A43] mb-6 tracking-tight">
            Выберите подходящий <span className="text-[#008B8B]">пакет</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg italic">Присоединяйтесь к сообществу профессионалов сегодня</p>
          
          {user?.subscription && user.subscription !== 'none' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 inline-block px-6 py-3 bg-accent/10 rounded-2xl border border-accent/20"
            >
              <p className="text-accent font-black text-sm uppercase tracking-widest">
                Ваш текущий тариф: {user.subscription.toUpperCase()}
              </p>
            </motion.div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Standard */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white p-12 rounded-[3.5rem] border shadow-xl relative flex flex-col transition-all duration-500 ${user?.subscription === 'standard' ? 'border-accent ring-4 ring-accent/5' : 'border-gray-100'}`}
          >
            {user?.subscription === 'standard' && (
              <div className="absolute top-6 right-8 text-accent flex items-center gap-2">
                <Shield className="w-5 h-5 fill-current" />
                <span className="text-xs font-black uppercase tracking-widest">Активен</span>
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-3xl font-black text-[#0A2A43] mb-2">Standard пакет</h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Базовый уровень</p>
            </div>
            
            <div className="flex items-baseline gap-3 mb-12">
              <span className="text-6xl font-black text-[#0A2A43] tracking-tighter">5 000 ₸</span>
              <span className="text-gray-400 font-bold text-xl">/ ай</span>
            </div>

            <div className="h-px bg-gray-100 mb-12"></div>

            <ul className="space-y-6 mb-16 flex-1 text-[#0A2A43]">
              {[
                'Базалық әдістемелік материалдарға қол жеткізу',
                'Сабақ жоспарлары',
                'Презентациялар',
                'Пәндер бойынша іздеу',
                'Материалдарды жүктеп алу',
                'Рейтингтік жүйе',
                'Жеке кабинет',
                'Қазақ және орыс тілдеріндегі интерфейс'
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-bold opacity-80">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSelect('standard')}
              disabled={loading || user?.subscription === 'standard'}
              className="w-full py-6 rounded-[2rem] border-4 border-[#0A2A43] text-[#0A2A43] font-black text-lg hover:bg-[#0A2A43] hover:text-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading === 'standard' ? <Loader2 className="w-6 h-6 animate-spin" /> : user?.subscription === 'standard' ? 'Ағымдағы пакет' : 'Standard таңдау'}
            </button>
          </motion.div>

          {/* Premium */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-[#0A2A43] p-12 rounded-[3.5rem] border shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500 ${user?.subscription === 'premium' ? 'border-secondary ring-4 ring-secondary/20' : 'border-white/10'}`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B041] opacity-10 rotate-45 translate-x-32 -translate-y-32"></div>
            
            {user?.subscription === 'premium' && (
              <div className="absolute top-6 right-8 text-secondary flex items-center gap-2 z-20">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-xs font-black uppercase tracking-widest">Белсенді</span>
              </div>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2">Premium пакет</h3>
                  <p className="text-[#F5B041] font-bold uppercase tracking-widest text-[10px]">Максимальные возможности</p>
                </div>
                <div className="px-5 py-2 bg-[#F5B041] rounded-full text-[#0A2A43] text-[10px] font-black uppercase tracking-widest shadow-xl">Топ выбор</div>
              </div>

              <div className="flex items-baseline gap-3 mb-12">
                <span className="text-6xl font-black text-[#F5B041] tracking-tighter">10 000 ₸</span>
                <span className="text-white/40 font-bold text-xl">/ ай</span>
              </div>

              <div className="h-px bg-white/10 mb-12"></div>

              <ul className="space-y-6 mb-16">
                {[
                  'Standard-тың барлық мүмкіндіктері',
                  'Эксклюзивті материалдар',
                  'Авторлық әзірлемелер',
                  'Өз материалдарын сату мүмкіндігі',
                  'Жарияланымдарды жылжыту',
                  'Сату аналитикасы',
                  'Шексіз жүктеп алу',
                  'Вебинарлар',
                  'Видео-сабақтар',
                  'Басымдықты қолдау'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-[#F5B041]/20 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-[#F5B041] fill-current" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSelect('premium')}
                disabled={loading || user?.subscription === 'premium'}
                className="w-full py-6 rounded-[2rem] bg-[#F5B041] text-[#0A2A43] font-black text-lg hover:bg-[#D4AF37] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'premium' ? <Loader2 className="w-6 h-6 animate-spin" /> : user?.subscription === 'premium' ? 'Ағымдағы пакет' : (
                  <>Premium таңдау <ArrowRight className="w-6 h-6" /></>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">Доверяют более 5000 школ</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30">
            <Shield className="w-12 h-12" />
            <Zap className="w-12 h-12" />
            <Target className="w-12 h-12" />
            <Rocket className="w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
