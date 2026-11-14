import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import InteractiveHero from "@/components/home/InteractiveHero";
import { 
  categories, 
  products, 
  getFeaturedProducts, 
  getTrendingProducts, 
  getBestsellers, 
  getNewArrivals,
  getProductsByCategory 
} from "@/data/products";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  Instagram, 
  Smartphone, 
  Shield, 
  Zap, 
  Cable, 
  Battery, 
  Headphones, 
  Volume2, 
  Watch, 
  Monitor, 
  Package, 
  Clock, 
  CheckCircle2,
  Flame,
  Star,
  ExternalLink
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

const categoryIconMap: Record<string, React.ReactNode> = {
  cases: <Smartphone className="w-6 h-6" />,
  screen: <Shield className="w-6 h-6" />,
  chargers: <Zap className="w-6 h-6" />,
  cables: <Cable className="w-6 h-6" />,
  powerbanks: <Battery className="w-6 h-6" />,
  earbuds: <Headphones className="w-6 h-6" />,
  speakers: <Volume2 className="w-6 h-6" />,
  watches: <Watch className="w-6 h-6" />,
  stands: <Monitor className="w-6 h-6" />,
  other: <Package className="w-6 h-6" />,
};

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const trending = getTrendingProducts().slice(0, 4);
  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  const specialOffers = products.filter(p => p.discount >= 45).slice(0, 4);
  const premiumCases = getProductsByCategory("cases").slice(0, 4);
  const gadgets = products.filter(p => ["earbuds", "speakers", "watches", "powerbanks"].includes(p.category)).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1">
        
        {/* 8. INTERACTIVE PROMOTIONAL HERO BANNER WITH IMAGE BG & INTERACTIVE ELEMENTS */}
        <InteractiveHero />

        {/* 9. SHOP BY CATEGORY SECTION */}
        <section className="py-12 bg-white border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#F47B20] uppercase tracking-wider mb-1">
                  <Package className="w-4 h-4" />
                  <span>Explore Our Catalogue</span>
                </div>
                <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717]">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#F47B20] hover:text-[#D96A10] flex items-center gap-1 group"
              >
                <span>View All 10 Categories</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {categories.map((cat) => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="group bg-[#FAFAFA] hover:bg-[#FFF1DF] border border-[#EEEEEE] hover:border-[#F47B20]/40 rounded-xl p-4 text-center transition-all duration-200 flex flex-col items-center justify-center hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#F47B20] group-hover:scale-110 group-hover:bg-[#F47B20] group-hover:text-white transition-all duration-200 mb-2">
                      {categoryIconMap[cat.id] || <Package className="w-5 h-5" />}
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#F47B20] transition-colors leading-tight mb-1">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {count} items
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. FEATURED PRODUCTS SECTION */}
        <section className="py-12 bg-[#FAFAFA] border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                  Handpicked For You
                </span>
                <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717]">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/showcase?tab=featured"
                className="text-xs font-bold text-[#F47B20] hover:text-[#D96A10] flex items-center gap-1 group"
              >
                <span>Browse Featured</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} featured={true} />
              ))}
            </div>
          </div>
        </section>

        {/* 14. SPECIAL OFFERS / DEAL OF THE DAY PROMO BANNER */}
        <section className="py-10 bg-[#FFF1DF] border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#F47B20]/20 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47B20] text-white text-xs font-extrabold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    Deal of the Day — Limited Demo Stock
                  </div>
                  <h3 className="font-righteous text-2xl sm:text-4xl font-bold text-[#171717]">
                    Mega Electronics & Accessories Savings
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777777] max-w-xl">
                    Up to 65% OFF on boAt Earbuds, Anker Fast Chargers, Fire-Boltt Smartwatches and Spigen Cases. Unmatched prices across Tamil Nadu.
                  </p>
                  
                  {/* Countdown simulation timer */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                      <Clock className="w-4 h-4 text-[#F47B20]" />
                      <span>Offer Ends In:</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#171717]">
                      <span className="bg-[#171717] text-white px-2 py-1 rounded">11h</span>
                      <span>:</span>
                      <span className="bg-[#171717] text-white px-2 py-1 rounded">42m</span>
                      <span>:</span>
                      <span className="bg-[#F47B20] text-white px-2 py-1 rounded">18s</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 text-center lg:text-right">
                  <Link
                    href="/products?sort=discount"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] text-white font-bold text-sm shadow-md transition"
                  >
                    <span>Claim Deals Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

              {/* Special offers products row */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {specialOffers.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. TRENDING PRODUCTS */}
        <section className="py-12 bg-white border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Popular This Week
                </span>
                <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717]">
                  Trending Products
                </h2>
              </div>
              <Link
                href="/showcase?tab=trending"
                className="text-xs font-bold text-[#F47B20] hover:text-[#D96A10] flex items-center gap-1 group"
              >
                <span>View All Trending</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trending.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 15. PREMIUM MOBILE CASES SHOWCASE SPOTLIGHT */}
        <section className="py-14 bg-gradient-to-r from-orange-50 via-white to-orange-50 border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#171717] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#F47B20] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Smartphone className="w-3.5 h-3.5" />
                    Flagship Category
                  </div>
                  <h2 className="font-righteous text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    Premium Mobile Cases & Covers
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed">
                    Ultra-protective armor cases, crystal-clear transparent backs, executive leather flip covers and designer prints. Precision molded for iPhone 15, Samsung Galaxy S24, OnePlus, Realme and Redmi.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/products?category=cases"
                      className="px-6 py-3 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] text-white font-bold text-xs shadow-md transition"
                    >
                      Browse All Cases
                    </Link>
                    <Link
                      href="/products?category=screen"
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
                    >
                      Screen Protectors
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  {premiumCases.slice(0, 2).map((p) => (
                    <div key={p.id} className="bg-white rounded-xl p-3 text-[#171717]">
                      <img src={p.image} alt={p.name} className="w-full h-32 object-contain rounded-lg mb-2" />
                      <h4 className="text-xs font-bold truncate">{p.name}</h4>
                      <p className="text-[11px] text-[#F47B20] font-extrabold mt-1">{formatPrice(p.price)}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Cases products grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {premiumCases.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 12. BESTSELLING PRODUCTS */}
        <section className="py-12 bg-white border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#F47B20]" />
                  Customer Favorites
                </span>
                <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717]">
                  Bestselling Products
                </h2>
              </div>
              <Link
                href="/showcase?tab=bestsellers"
                className="text-xs font-bold text-[#F47B20] hover:text-[#D96A10] flex items-center gap-1 group"
              >
                <span>View All Bestsellers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 16. GADGETS AND LIFESTYLE COLLECTION */}
        <section className="py-12 bg-[#FAFAFA] border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                  Everyday Tech Upgrades
                </span>
                <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717]">
                  Gadgets & Lifestyle Collection
                </h2>
              </div>
              <Link
                href="/products?category=earbuds"
                className="text-xs font-bold text-[#F47B20] hover:text-[#D96A10] flex items-center gap-1 group"
              >
                <span>Explore Audio & Wearables</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {gadgets.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 13. NEW ARRIVALS */}
        <section className="py-12 bg-white border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                  Fresh Inventory
                </span>
                <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717]">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/showcase?tab=new"
                className="text-xs font-bold text-[#F47B20] hover:text-[#D96A10] flex items-center gap-1 group"
              >
                <span>View All New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 17. BRAND INTRODUCTION */}
        <section className="py-14 bg-[#FFF1DF]/40 border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEEEEE] shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#F47B20] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Our Brand Story</span>
                  </div>

                  <h2 className="font-righteous text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
                    VMart – Vela Mobile Accessories: <br />
                    <span className="text-[#F47B20]">Driven by Quality and Trust.</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                    VMart – Vela Mobile Accessories was established to deliver genuine, high-grade mobile protection and premium electronics accessories. Just like Tamil Nadu’s trusted electronics hubs (Poorvika, Chennai Mobiles, iMobile), we prioritize customer satisfaction, authentic build quality, and honest retail pricing.
                  </p>

                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                    From tough military-standard phone cases and tempered glass guards to 65W GaN ultra-fast charging docks and immersive ANC earbuds, every item in our catalogue is curated to safeguard your smartphone investment.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F47B20]" />
                      <span>Premium Cases</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F47B20]" />
                      <span>Wide Range of Accessories</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F47B20]" />
                      <span>One-Stop Gadget Shop</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#FFF1DF] rounded-2xl p-6 border border-[#F47B20]/20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#F47B20] flex items-center justify-center text-white font-righteous text-3xl font-bold mx-auto shadow-md">
                    VM
                  </div>
                  <div>
                    <h4 className="font-righteous text-xl font-bold text-[#171717]">VMART</h4>
                    <p className="text-xs font-semibold text-[#F47B20]">Vela Mobile Accessories</p>
                  </div>
                  <p className="text-[11px] text-[#777777]">
                    ACCESSORIES | GADGETS | LIFESTYLE
                  </p>
                  <Link
                    href="/products"
                    className="inline-block w-full py-2.5 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-xl transition"
                  >
                    Explore Full Store
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 18. WHY CHOOSE VMART SECTION */}
        <section className="py-14 bg-white border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                The VMart Standard
              </span>
              <h2 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Why Customers Choose VMart
              </h2>
              <p className="text-xs sm:text-sm text-[#777777] mt-2">
                We combine brick-and-mortar retail trust with a seamless digital shopping experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-[#F47B20]/40 transition hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#FFF1DF] text-[#F47B20] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Guaranteed Quality</h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Every product undergoes strict inspection for durability, fit, and electrical safety standards before dispatch.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-[#F47B20]/40 transition hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#FFF1DF] text-[#F47B20] flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Tamil Nadu Express</h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Fast delivery across Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, and all districts in Tamil Nadu.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-[#F47B20]/40 transition hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#FFF1DF] text-[#F47B20] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Best Price Promise</h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Direct sourcing and competitive multi-brand wholesale tie-ups mean you get premium accessories at real retail value.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-[#F47B20]/40 transition hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#FFF1DF] text-[#F47B20] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Dedicated Customer Care</h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  Friendly support for compatibility checks, order inquiries, and replacement queries.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 19. INSTAGRAM INTEGRATION SECTION */}
        <section className="py-14 bg-gradient-to-b from-[#FAFAFA] to-white border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#171717] to-[#262626] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                    <Instagram className="w-4 h-4" />
                    <span>Official Instagram Feed</span>
                  </div>
                  <h3 className="font-righteous text-2xl sm:text-3xl font-bold text-white">
                    Join Our Mobile Community
                  </h3>
                  <p className="text-xs text-gray-400">
                    Follow <strong className="text-white">@vmart_velamobileaccessories</strong> for daily drops, customer unboxings & exclusive deals.
                  </p>
                </div>

                <a
                  href="https://www.instagram.com/vmart_velamobileaccessories/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F47B20] to-[#E1306C] hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              {/* Instagram Photos Simulation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { title: "Shockproof Armor Case", tag: "#SpigenTough", img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80" },
                  { title: "65W GaN Fast Charger", tag: "#FastCharge", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80" },
                  { title: "True Wireless Sound", tag: "#boAtAudio", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80" },
                  { title: "AMOLED Calling Watch", tag: "#Smartwatch", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80" },
                  { title: "Tempered Edge Glass", tag: "#ScreenGuard", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80" },
                  { title: "Bluetooth Speaker", tag: "#PartySound", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80" },
                ].map((post, idx) => (
                  <a
                    key={idx}
                    href="https://www.instagram.com/vmart_velamobileaccessories/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-xl overflow-hidden aspect-square bg-gray-800 border border-white/10 block"
                  >
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                      <Instagram className="w-5 h-5 text-[#F47B20] mb-1" />
                      <span className="text-[10px] font-bold text-white leading-tight">{post.title}</span>
                      <span className="text-[9px] text-[#F47B20] mt-0.5">{post.tag}</span>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 20. COMPLETE FOOTER */}
      <Footer />
    </div>
  );
}
