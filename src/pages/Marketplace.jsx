import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Star, ShoppingCart, Info, X, Check, Download } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Marketplace = () => {
  const { addToCart, t, user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(20000);
  const [selectedLangs, setSelectedLangs] = useState(['KZ', 'RU']);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const f = t.catalog.filters;

  const handleAction = (product, isFree) => {
    if (isFree) {
      alert(t.language === 'KZ' ? 'Материал жүктелуде...' : 'Материал загружается...');
      return;
    }
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesPrice = p.price <= priceRange;
      const matchesLang = (selectedLangs.includes('KZ') && p.language === 'KZ') || 
                        (selectedLangs.includes('RU') && p.language === 'RU');
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(p.level);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.type);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesLang && matchesLevel && matchesType;
    });
  }, [searchQuery, selectedCategory, priceRange, selectedLangs, selectedLevels, selectedTypes]);

  const toggleItem = (list, setList, item) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="bg-bg-light min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-primary">{t.nav.catalog}</h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 font-bold text-sm"
          >
            <Filter className="w-4 h-4 text-accent" /> {f.apply}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className={`
            fixed lg:sticky lg:top-28 inset-0 z-[60] lg:z-0
            ${isSidebarOpen ? 'flex' : 'hidden lg:block'}
            w-full lg:w-80 flex-col
          `}>
            <div className="lg:hidden absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>

            <div className="relative bg-white h-full lg:h-auto overflow-y-auto lg:rounded-[2.5rem] lg:shadow-xl lg:shadow-gray-200/50 border border-gray-100 p-8 flex flex-col gap-10 scrollbar-hide">
              <div className="flex justify-between items-center lg:hidden">
                <h3 className="font-black text-2xl text-primary">{f.apply}</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
              </div>

              {/* Price */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">{f.price} (₸)</label>
                <div className="flex justify-between text-xs font-black text-primary mb-4">
                  <span>0 ₸</span>
                  <span className="text-accent">{priceRange.toLocaleString()} ₸</span>
                </div>
                <input 
                  type="range" min="0" max="20000" step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">{f.language}</label>
                <div className="space-y-3">
                  {Object.entries(f.languages).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedLangs.includes(key.toUpperCase())}
                        onChange={() => toggleItem(selectedLangs, setSelectedLangs, key.toUpperCase())}
                        className="w-5 h-5 rounded border-gray-200 text-accent focus:ring-accent"
                      />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">{f.category}</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                  >
                    {f.categories.all}
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                    >
                      {f.categories[cat.id] || cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">Уровень / Звено</label>
                <div className="space-y-3">
                  {Object.entries(f.levels).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedLevels.includes(key)}
                        onChange={() => toggleItem(selectedLevels, setSelectedLevels, key)}
                        className="w-5 h-5 rounded border-gray-200 text-accent focus:ring-accent"
                      />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">{f.type}</label>
                <div className="space-y-3">
                  {Object.entries(f.types).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(label)}
                        onChange={() => toggleItem(selectedTypes, setSelectedTypes, label)}
                        className="w-5 h-5 rounded border-gray-200 text-accent focus:ring-accent"
                      />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange(20000);
                  setSelectedLangs(['KZ', 'RU']);
                  setSelectedLevels([]);
                  setSelectedTypes([]);
                  setSearchQuery('');
                }}
                className="w-full py-4 bg-gray-50 text-xs font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest rounded-2xl"
              >
                {f.clear}
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <div>
                <h1 className="text-4xl font-black text-primary mb-2 tracking-tight">{t.catalog.title}</h1>
                <p className="text-gray-400 font-bold text-sm">Найдено {filteredProducts.length} материалов</p>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => {
                  // Subscription logic
                  const isStandardFree = user?.subscription === 'standard' && product.type === 'Standard';
                  const isPremiumFree = user?.subscription === 'premium' && (product.type === 'Standard' || product.type === 'Premium');
                  const isFree = isStandardFree || isPremiumFree;

                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={product.id}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 border border-gray-100 group flex flex-col h-full"
                    >
                      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden block">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <span className={`px-3 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg ${product.type === 'Premium' ? 'bg-secondary text-primary' : 'bg-accent'}`}>
                            {product.type}
                          </span>
                          <span className="px-3 py-1.5 rounded-xl bg-white/95 text-primary text-[10px] font-black tracking-widest shadow-lg">
                            {product.language}
                          </span>
                        </div>
                      </Link>

                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-1.5 mb-3 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-black text-primary">{product.rating}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1">({product.reviews})</span>
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-black text-primary text-lg mb-3 line-clamp-2 hover:text-accent transition-colors leading-tight">
                            {product.title}
                          </h3>
                        </Link>
                        
                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Цена:</p>
                            <div className="flex flex-col">
                              {isFree ? (
                                <>
                                  <span className="text-lg font-black text-gray-300 line-through decoration-red-500/50">{product.price.toLocaleString()} ₸</span>
                                  <span className="text-2xl font-black text-green-500 tracking-tighter">0 ₸</span>
                                </>
                              ) : (
                                <span className="text-2xl font-black text-primary tracking-tighter">{product.price.toLocaleString()} ₸</span>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleAction(product, isFree)}
                            className={`w-14 h-14 rounded-2xl transition-all flex items-center justify-center shadow-xl active:scale-90 ${
                              isFree 
                              ? 'bg-primary text-white hover:bg-primary-light' 
                              : addedItems[product.id] 
                                ? 'bg-green-500 text-white' 
                                : 'bg-accent text-white hover:bg-accent-light'
                            }`}
                          >
                            {isFree ? <Download className="w-7 h-7" /> : addedItems[product.id] ? <Check className="w-7 h-7" /> : <ShoppingCart className="w-7 h-7" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[4rem] border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <Search className="w-12 h-12 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-primary mb-3">Ничего не найдено</h3>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
