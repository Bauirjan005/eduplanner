import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Download, FileText, User, ArrowLeft, Shield } from 'lucide-react';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useApp();
  const product = products.find(p => p.id === Number(id)) || products[0];

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Назад в каталог
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 p-8 lg:p-12">
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-accent transition-colors">
                  <img src={product.image} alt="Preview" className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">{product.category}</span>
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-dark text-[10px] font-black uppercase tracking-widest">{product.type}</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-black text-primary mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-5 h-5 ${i <= Math.floor(product.rating) ? 'fill-current' : ''}`} />)}
                </div>
                <span className="font-bold text-primary">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews} отзывов)</span>
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Download className="w-4 h-4" /> 1,240 скачиваний
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description} Это полноценный учебный материал, разработанный в соответствии с государственными стандартами образования Республики Казахстан.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">Формат файла:</span>
                <span className="flex items-center gap-2 font-bold text-primary"><FileText className="w-4 h-4 text-accent" /> PDF, DOCX (5.4 MB)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Язык обучения:</span>
                <span className="font-bold text-primary">{product.language === 'KZ' ? 'Казахский' : 'Русский'}</span>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Стоимость материала:</p>
                  <p className="text-4xl font-black text-primary">{product.price.toLocaleString()} ₸</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-500 font-bold flex items-center gap-1 justify-end">
                    <Shield className="w-3 h-3" /> Безопасная покупка
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">Доступен мгновенно после оплаты</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 btn btn-primary py-5 rounded-2xl text-lg font-black"
                >
                  <ShoppingCart className="w-6 h-6" /> Добавить в корзину
                </button>
                <button className="px-6 rounded-2xl border-2 border-gray-200 hover:border-accent hover:text-accent transition-all">
                  <Star className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Section */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-bold text-2xl">
              {product.author[0]}
            </div>
            <div>
              <h3 className="font-bold text-primary text-xl mb-1">{product.author}</h3>
              <p className="text-gray-500 text-sm">Автор 150+ материалов • На сайте с 2024 года</p>
            </div>
          </div>
          <button className="btn-outline px-6 py-2.5 rounded-xl text-sm font-bold">Смотреть все работы</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
