import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, t, user } = useApp();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const phoneNumber = '77752390692'; // From footer contacts
    const userName = user?.name || 'Клиент';
    
    let message = `Сәлеметсіз бе! Мен Edu Planner KZ сайтынан тапсырыс бергім келеді.\n\n`;
    message += `Аты-жөні: ${userName}\n`;
    message += `Тапсырыс тізімі:\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ${item.price.toLocaleString()} ₸\n`;
    });
    
    message += `\nЖалпы сомасы: ${total.toLocaleString()} ₸`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-primary tracking-tight">Корзина</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cart.length} материала(ов)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-3 rounded-2xl hover:bg-gray-100 transition-all active:scale-90"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-5 group"
                  >
                    <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden bg-gray-100 shrink-0 shadow-inner border border-gray-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-black text-primary line-clamp-2 leading-snug group-hover:text-accent transition-colors">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-auto">{item.type} • {item.language}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xl font-black text-primary tracking-tighter">{item.price.toLocaleString()} ₸</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                  </div>
                  <p className="font-black text-primary text-xl mb-2">Корзина пуста</p>
                  <p className="text-sm text-gray-400 font-medium">Ваши покупки появятся здесь</p>
                </div>
              )}
            </div>

            <div className="p-10 bg-gray-50/80 backdrop-blur-md border-t border-gray-100">
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Промежуточный итог:</span>
                  <span className="text-primary">{total.toLocaleString()} ₸</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-500">
                  <span>Скидка:</span>
                  <span className="text-green-500">0 ₸</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-primary pt-6 border-t border-gray-200">
                  <span>Итого:</span>
                  <span className="text-accent tracking-tighter">{total.toLocaleString()} ₸</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg hover:bg-primary-light shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                Оформить заказ 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-8 font-black uppercase tracking-widest opacity-50">
                Заказ будет отправлен менеджеру в WhatsApp
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
