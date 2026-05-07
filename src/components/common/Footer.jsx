import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, FacebookIcon, Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Footer = () => {
  const { user, t } = useApp();
  const homePath = user ? "/home" : "/";
  const socialUrl = "https://www.instagram.com/eduplanner_kz?igsh=MWJncm1ib2Q5Y2d1Zw==";

  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to={homePath} className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              {t.footer.brandDesc}
            </p>
            <div className="flex gap-5">
              <a href={socialUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/5">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={socialUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/5">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://wa.me/77752390692" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/5">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-secondary">Меню</h3>
            <ul className="space-y-4">
              {[
                { label: t.nav.home, path: homePath },
                { label: t.nav.catalog, path: "/catalog" },
                { label: t.nav.pricing, path: "/pricing" },
                { label: t.nav.authors, path: "/authors" },
                { label: t.nav.webinars, path: "/webinars" },
                { label: t.nav.reviews, path: "/reviews" },
                { label: t.nav.contacts, path: "/contacts" },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-all"></span> 
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Info */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-secondary">{t.footer.support}</h3>
            <ul className="space-y-4">
              {t.footer.supportItems.map((item, i) => (
                <li key={i}>
                  <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-all"></span> 
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-secondary">Контакты</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-sm text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <MapPin className="w-5 h-5 text-accent group-hover:text-white" />
                </div>
                <span className="leading-relaxed font-medium">Казахстан, г. Актау</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent group-hover:text-white" />
                </div>
                <span className="font-bold">+7 775 239 0692</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent group-hover:text-white" />
                </div>
                <span className="font-medium">info@eduplannerkz.kz</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-400 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                  <Clock className="w-5 h-5 text-secondary group-hover:text-primary" />
                </div>
                <span className="font-medium">09:00 – 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
            © 2026 Edu Planner KZ. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
