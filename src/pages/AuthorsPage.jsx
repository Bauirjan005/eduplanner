import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, TrendingUp, DollarSign, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthorsPage = () => {
  const { t } = useApp();

  const authorSteps = [
    { icon: <Users />, title: 'Регистрация', desc: 'Создайте профиль автора за 2 минуты' },
    { icon: <Award />, title: 'Публикация', desc: 'Загрузите свои лучшие материалы' },
    { icon: <TrendingUp />, title: 'Продвижение', desc: 'Ваши работы увидят тысячи учителей' },
    { icon: <DollarSign />, title: 'Доход', desc: 'Получайте выплаты с каждой продажи' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero for Authors */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-secondary font-black uppercase tracking-widest text-xs mb-6 inline-block">Станьте частью Edu Planner KZ</span>
              <h1 className="text-4xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
                {t.authors.title}
              </h1>
              <p className="text-gray-300 text-xl font-medium mb-12 leading-relaxed">
                Помогайте коллегам и развивайте свой личный бренд, превращая многолетний опыт в качественные цифровые продукты.
              </p>
              <button className="bg-secondary text-primary px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-secondary-dark transition-all shadow-2xl shadow-secondary/20 flex items-center gap-3">
                {t.authors.cta} <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
            
            <div className="relative hidden lg:block">
              <div className="w-full aspect-square rounded-[4rem] overflow-hidden border-8 border-white/5 relative">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop" alt="Teacher" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60"></div>
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-[280px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Рост продаж</p>
                    <p className="text-2xl font-black text-primary">+145%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">Ваши материалы востребованы по всему Казахстану.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Authors */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-8 tracking-tight">Что вы получите?</h2>
            <p className="text-gray-500 font-bold text-lg">{t.authors.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.authors.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 hover:shadow-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-lg font-black text-primary leading-snug">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-black text-primary mb-12 tracking-tight leading-tight">Простой путь от педагога к <span className="text-accent">цифровому автору</span></h2>
              <div className="space-y-12">
                {authorSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                      {React.cloneElement(step.icon, { className: 'w-8 h-8' })}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-primary mb-2 group-hover:text-accent transition-colors">{step.title}</h4>
                      <p className="text-gray-500 font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              <div className="space-y-6 translate-y-12">
                <div className="h-64 bg-secondary/10 rounded-[3rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Auth" />
                </div>
                <div className="h-80 bg-accent/10 rounded-[3rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Auth" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-80 bg-primary/10 rounded-[3rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Auth" />
                </div>
                <div className="h-64 bg-gray-100 rounded-[3rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Auth" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Author */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-accent rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-20 pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">Готовы поделиться своим опытом?</h2>
              <p className="text-white/80 text-xl font-bold mb-12">Ваши знания бесценны. Сделайте их доступными для коллег и начните зарабатывать на том, что любите.</p>
              <button className="bg-white text-accent px-12 py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl transition-all active:scale-95">
                Зарегистрироваться как автор
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorsPage;
