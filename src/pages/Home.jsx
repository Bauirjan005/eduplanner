import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Zap, Star, ShieldCheck, Download, ArrowRight, Check, Users, Target, Rocket, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { t } = useApp();

  const teamMembers = [
    { name: 'Қарасай Аяулым', role: t.team.roles.frontend, img: 'https://ui-avatars.com/api/?name=Karasay+Ayaulym&background=0A2A43&color=fff&size=200' },
    { name: 'Оңайбаева Аида', role: t.team.roles.ux, img: 'https://ui-avatars.com/api/?name=Onaybaeva+Aida&background=F5B041&color=0A2A43&size=200' },
    { name: 'Сапар Хафиза', role: t.team.roles.pm, img: 'https://ui-avatars.com/api/?name=Sapar+Khafiza&background=008B8B&color=fff&size=200' },
  ];

  const benefitIcons = [BookOpen, Clock, Zap, Target, Users, Download];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary opacity-5 skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-light text-xs font-black uppercase tracking-widest mb-6 border border-accent/30">
                {t.hero.tag}
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                {t.hero.title}
              </h1>
              <p className="text-gray-300 text-xl mb-6 font-bold">
                {t.hero.subtitle}
              </p>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                {t.hero.desc}
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/catalog" className="btn bg-accent text-white px-10 py-5 text-lg font-black rounded-2xl hover:bg-accent-light shadow-2xl shadow-accent/20 transition-all flex items-center gap-3 active:scale-95">
                  {t.hero.ctaPrimary} <ArrowRight className="w-6 h-6" />
                </Link>
                <Link to="/authors" className="btn bg-white/10 text-white px-10 py-5 text-lg font-black rounded-2xl hover:bg-white/20 backdrop-blur-xl border border-white/10 transition-all active:scale-95">
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/5 rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop" 
                  alt="Education"
                  className="w-full object-cover aspect-[4/5]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6 tracking-tight">{t.benefits.title}</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.benefits.items.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-8 border border-gray-50 group-hover:bg-accent group-hover:text-white transition-all">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-primary mb-4">{b.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6 tracking-tight">{t.pricing.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Standard */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl flex flex-col"
            >
              <h3 className="text-2xl font-black text-primary mb-2">{t.pricing.standard.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black text-accent">{t.pricing.standard.price}</span>
                <span className="text-gray-400 font-bold">{t.pricing.standard.period}</span>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {t.pricing.standard.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <Check className="w-5 h-5 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl border-2 border-primary text-primary font-black hover:bg-primary hover:text-white transition-all">
                {t.pricing.standard.cta}
              </button>
            </motion.div>

            {/* Premium */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-primary p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rotate-45 translate-x-16 -translate-y-16"></div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-secondary text-primary text-[10px] font-black uppercase tracking-widest mb-6">Самый популярный</div>
                <h3 className="text-2xl font-black text-white mb-2">{t.pricing.premium.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-secondary">{t.pricing.premium.price}</span>
                  <span className="text-gray-400 font-bold">{t.pricing.premium.period}</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {t.pricing.premium.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                      <Check className="w-5 h-5 text-secondary" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 rounded-2xl bg-secondary text-primary font-black hover:bg-secondary-dark transition-all">
                  {t.pricing.premium.cta}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Preview */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6 tracking-tight">{t.catalog.title}</h2>
            <p className="text-lg text-primary font-bold mb-4">{t.catalog.subtitle}</p>
            <p className="text-gray-500 font-medium">{t.catalog.desc}</p>
          </div>
          <Link to="/catalog" className="btn bg-accent text-white px-12 py-5 text-xl font-black rounded-2xl hover:bg-accent-light shadow-xl shadow-accent/20 transition-all inline-flex items-center gap-3">
            {t.catalog.cta} <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Authors CTA */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-6xl font-black text-primary mb-8 tracking-tight">{t.authors.title}</h2>
              <p className="text-xl text-gray-500 font-bold mb-10">{t.authors.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-6 mb-12">
                {t.authors.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-primary">
                    <div className="w-2 h-2 bg-accent rounded-full"></div> {item}
                  </li>
                ))}
              </ul>
              <button className="btn bg-accent text-white px-10 py-5 text-lg font-black rounded-2xl hover:bg-accent-light shadow-xl transition-all">
                {t.authors.cta}
              </button>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="w-full aspect-square bg-gray-100 rounded-[3rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" alt="Author" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Expanded */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6">{t.about.title}</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-primary mb-8 tracking-tight leading-tight">
                {t.about.subtitle}
              </h3>
              <p className="text-xl text-gray-500 leading-relaxed font-medium mb-12">
                {t.about.desc}
              </p>
              
              <div className="space-y-12">
                <div>
                  <h4 className="text-lg font-black text-primary mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-accent" /> {t.about.mission.title}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {t.about.mission.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-xs font-black text-primary border border-gray-100">
                        <Check className="w-4 h-4 text-green-500" /> {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-primary mb-6 flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-secondary" /> {t.about.values.title}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {t.about.values.items.map((item, i) => (
                      <span key={i} className="px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" alt="Team" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-32 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6 tracking-tight">{t.team.title}</h2>
            <p className="text-gray-500 font-medium text-lg">{t.team.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-48 h-48 rounded-[3rem] overflow-hidden mb-8 relative border-4 border-white shadow-xl">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-black text-primary mb-2 tracking-tight group-hover:text-accent transition-colors">{member.name}</h3>
                <span className="px-4 py-1.5 rounded-full bg-white text-gray-400 text-xs font-black uppercase tracking-widest shadow-sm border border-gray-50">{member.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
