import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  category: string;
  description: string;
}

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

export default function RetailStorefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const itemsPerPage = 6;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'shopping' | 'paying' | 'success'>('shopping');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [orderId, setOrderId] = useState('');

  // Fetch products from FakeStore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Response failure');
        return res.json();
      })
      .then((data: FakeStoreProduct[]) => {
        const mapped: Product[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          rating: item.rating?.rate || 0,
          ratingCount: item.rating?.count || 0,
          image: item.image,
          category: item.category,
          description: item.description,
        }));
        setProducts(mapped);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch from Fake Store API:', err);
        // Fallback local items
        const fallback: Product[] = [
          {
            id: 101,
            title: 'Haptic Mechanical Keyboard',
            price: 189.00,
            rating: 4.9,
            ratingCount: 140,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
            category: 'electronics',
            description: 'Hot-swappable tactile switches, layout customized for developer efficiency.',
          },
          {
            id: 102,
            title: 'Precision Wireless Mouse',
            price: 99.00,
            rating: 4.8,
            ratingCount: 88,
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
            category: 'electronics',
            description: 'High DPI optical sensor with silent scroll wheel and ergonomic grip.',
          },
          {
            id: 103,
            title: 'Active ANC Headphones',
            price: 299.00,
            rating: 4.7,
            ratingCount: 210,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
            category: 'electronics',
            description: 'Hybrid noise-cancelling audio with dual ambient voice monitoring.',
          },
          {
            id: 104,
            title: 'Aluminum Laptop Stand',
            price: 49.00,
            rating: 4.6,
            ratingCount: 45,
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60',
            category: 'electronics',
            description: 'Sturdy elevation stand promoting perfect ergonomic typing angles.',
          },
        ];
        setProducts(fallback);
        setIsLoading(false);
      });
  }, []);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.08 * 100) / 100;
  const cartShipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0.00 : 15.00;
  const cartTotal = Math.round((cartSubtotal + cartTax + cartShipping) * 100) / 100;

  // Filter products by category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Pagination Math
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Checkout operations
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('paying');

    // Simulate transaction
    setTimeout(() => {
      setOrderId(`#TX-${(Math.random() * 1000000).toFixed(0)}`);
      setCheckoutStep('success');
      setCart([]);
    }, 2000);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop text-slate-800 font-sans">

      {/* Standalone Storefront Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between text-slate-900">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="material-symbols-outlined text-emerald-600 text-[20px] sm:text-[22px]">storefront</span>
          <span className="font-sans text-xs sm:text-sm font-black tracking-widest uppercase">AURA // RETAIL</span>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
            Live Storefront
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/projects"
            className="flex items-center gap-1 px-2.5 py-1.5 sm:gap-1.5 sm:px-3.5 sm:py-1.5 rounded-lg border border-slate-200 text-[10px] sm:text-xs font-sans text-slate-600 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-500/40 transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="inline sm:hidden">Portfolio</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-mono text-slate-400">
          <Link to="/projects" className="hover:text-emerald-600 transition-colors uppercase">
            Projects
          </Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-emerald-600 uppercase font-bold">eCommerce Storefront</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight mb-2 text-slate-900">
            Retail Digital Storefront
          </h1>
          <p className="font-body-md text-body-md text-slate-500 ">
            A fully simulated shopping environment loaded with FakeStore API assets, cart operations, and Stripe checkout models.
          </p>
        </div>

        {checkoutStep === 'success' ? (
          /* Payment Success Display */
          <div className="bg-white border border-slate-200/80 max-w-lg mx-auto rounded-3xl p-8 text-center shadow-lg animate-float mt-10">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold mb-3 text-slate-900">Order Confirmed!</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Your transaction was authorized successfully. Order ID <span className="font-mono text-emerald-600 font-semibold">{orderId}</span>. Thank you for your payment!
            </p>
            <button
              onClick={() => setCheckoutStep('shopping')}
              className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-label-lg cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : checkoutStep === 'paying' ? (
          /* Payment Loading / Spinner Screen */
          <div className="bg-white border border-slate-200/80 max-w-lg mx-auto rounded-3xl p-12 text-center shadow-md mt-10 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="font-headline-sm text-[20px] font-bold mb-2 text-slate-900">Authorizing Payment...</h2>
            <p className="text-xs text-slate-500 font-mono">Securing gateway handshake with Stripe API</p>
          </div>
        ) : (
          /* Standard Shopping Screen */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Products grid / skeleton loader */}
            {isLoading ? (
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-headline-sm text-[18px] font-bold text-slate-900 mb-6">Store Catalog</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm animate-pulse flex flex-col gap-4">
                      <div className="w-full h-40 bg-slate-100 rounded-xl"></div>
                      <div className="w-20 h-4 bg-slate-100 rounded"></div>
                      <div className="w-3/4 h-5 bg-slate-100 rounded"></div>
                      <div className="w-full h-10 bg-slate-100 rounded"></div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <div className="w-16 h-5 bg-slate-100 rounded"></div>
                        <div className="w-20 h-8 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">Store Catalog</h3>
                    <span className="text-xs text-slate-500 font-medium font-mono">
                      Showing {totalItems > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} items
                    </span>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex gap-1.5 border-b border-slate-100 pb-4 overflow-x-auto max-w-full whitespace-nowrap">
                    {[
                      { id: 'All', label: 'All Products' },
                      { id: 'electronics', label: 'Electronics' },
                      { id: 'jewelery', label: 'Jewelry' },
                      { id: "men's clothing", label: "Men's Clothing" },
                      { id: "women's clothing", label: "Women's Clothing" }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                        }}
                        className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-[10px] font-sans font-bold uppercase transition-all cursor-pointer ${selectedCategory === cat.id
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-emerald-600/60 hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Product Image */}
                        <div className="w-full h-40 border border-slate-100 rounded-xl bg-white flex items-center justify-center mb-4 p-4 overflow-hidden relative">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-[36px] text-slate-350">
                              shopping_bag
                            </span>
                          )}
                        </div>

                        {/* Category Badge */}
                        <span className="text-[9px] font-bold text-emerald-700 font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded tracking-wide inline-block mb-2">
                          {prod.category}
                        </span>

                        {/* Title */}
                        <h4
                          className="font-headline-sm text-sm font-bold mb-1 text-slate-900 line-clamp-1 hover:text-emerald-600 transition-colors"
                          title={prod.title}
                        >
                          {prod.title}
                        </h4>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <span className="material-symbols-outlined text-amber-500 text-[14px]">star</span>
                          <span className="text-[11px] font-bold text-slate-500 font-mono">
                            {prod.rating}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({prod.ratingCount})
                          </span>
                        </div>

                        {/* Description */}
                        <p
                          className="text-[11px] text-slate-500 mb-6 leading-relaxed line-clamp-2"
                          title={prod.description}
                        >
                          {prod.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <span className="text-sm font-bold text-emerald-600 font-mono">
                          ${prod.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(prod)}
                          className="bg-slate-900 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all text-xs font-label-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            add_shopping_cart
                          </span>
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10 pt-4">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className="p-2 border border-slate-200 rounded-lg hover:border-emerald-600 disabled:opacity-40 disabled:hover:border-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${currentPage === pageNum
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 bg-white text-slate-600'
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className="p-2 border border-slate-200 rounded-lg hover:border-emerald-600 disabled:opacity-40 disabled:hover:border-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Shopping Cart Drawer / Summary */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-fit">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">Your Cart</h3>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded font-bold font-mono text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-[48px] opacity-40">shopping_cart</span>
                    <p className="text-xs font-medium">Your shopping cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8 divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={item.id} className={`flex justify-between items-center gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold truncate text-slate-900" title={item.title}>
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-mono">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50 text-xs cursor-pointer text-slate-650"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold font-mono min-w-[12px] text-center text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-50 text-xs cursor-pointer text-slate-655 text-slate-650"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-655 hover:text-red-650 transition-colors ml-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-slate-100 pt-6">
                  {/* Pricing summary */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs text-slate-505 text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-mono text-slate-800">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-505 text-slate-500">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-mono text-slate-800">${cartTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-505 text-slate-500">
                      <span>Shipping</span>
                      <span className="font-mono text-slate-800">{cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}</span>
                    </div>
                    <div className="h-[1px] bg-slate-100 w-full my-2"></div>
                    <div className="flex justify-between text-sm font-bold text-slate-900">
                      <span>Order Total</span>
                      <span className="font-mono text-emerald-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Details Form */}
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide border-t border-slate-100 pt-4 mb-2">
                      Card Information
                    </h4>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Cardholder Name"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        pattern="\d{16}"
                        maxLength={16}
                        placeholder="Card Number (16 digits)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-emerald-600"
                      />
                      <input
                        type="password"
                        required
                        pattern="\d{3}"
                        maxLength={3}
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-emerald-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-lg transition-colors text-xs font-label-lg tracking-wide uppercase mt-4 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      Pay ${cartTotal.toFixed(2)}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
