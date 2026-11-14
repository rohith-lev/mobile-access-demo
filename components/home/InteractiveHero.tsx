"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Smartphone, 
  ShoppingCart, 
  Check, 
  Star, 
  Flame, 
  ChevronRight, 
  ChevronLeft,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Award
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/data/products";

interface HeroSlide {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  description: string;
  productId: string;
  productName: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  bgImage: string;
  specs: string[];
}

const heroSlides: HeroSlide[] = [
  {
    id: "cases",
    categoryKey: "cases",
    categoryLabel: "Drop Armor Cases",
    tagline: "MILITARY-GRADE MIL-STD-810G PROTECTION",
    headline: "Everything Your Mobile Needs,",
    headlineAccent: "All in One Place.",
    description: "Discover shock-absorbing air cushion armor, crystal-clear backs, and premium leather covers precision-fitted for iPhone 15, Galaxy S24 & OnePlus.",
    productId: "p001",
    productName: "Spigen Tough Armor Case for Samsung S24",
    brand: "Spigen Official",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80",
    bgImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=80",
    specs: ["Dual-Layer TPU + PC", "Air Cushion Corners", "Wireless Charging Ready"],
  },
  {
    id: "chargers",
    categoryKey: "chargers",
    categoryLabel: "65W GaN Chargers",
    tagline: "NEXT-GEN GaN III FAST POWER DELIVERY",
    headline: "Pocket-Sized Powerhouse,",
    headlineAccent: "Zero Overheating.",
    description: "Charge your smartphone, tablet and Type-C laptop simultaneously from 0% to 80% in 35 minutes with active thermal protection.",
    productId: "p009",
    productName: "Anker 65W GaN USB-C Fast Charger",
    brand: "Anker Tech",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.7,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80",
    specs: ["65W Max PD 3.0", "Foldable Pin Design", "Universal Device Support"],
  },
  {
    id: "audio",
    categoryKey: "earbuds",
    categoryLabel: "Active Noise Cancellation",
    tagline: "49dB HYBRID ANC • HI-RES AUDIO",
    headline: "Immersive Soundstage,",
    headlineAccent: "Pure Studio Silence.",
    description: "Shut out city noise and traffic with 49dB deep noise cancelling, 42-hour battery longevity, and low-latency gaming beast mode.",
    productId: "p019",
    productName: "boAt Airdopes 141 TWS Earbuds",
    brand: "boAt Audio",
    price: 999,
    originalPrice: 2499,
    discount: 60,
    rating: 4.3,
    reviews: 15678,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    bgImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=80",
    specs: ["42H Total Playtime", "IPX4 Sweat Resistance", "Instant Fast Pair"],
  },
  {
    id: "watches",
    categoryKey: "watches",
    categoryLabel: "AMOLED Smartwatches",
    tagline: "1.43\" AMOLED DISPLAY • BLUETOOTH CALLING",
    headline: "Fitness & Communication,",
    headlineAccent: "Right on Your Wrist.",
    description: "Track workouts with 100+ sports modes, monitor real-time heart rate & SpO2, and make crystal-clear calls on an always-on display.",
    productId: "p026",
    productName: "Fire-Boltt Phoenix Ultra Smartwatch",
    brand: "Fire-Boltt",
    price: 2499,
    originalPrice: 7999,
    discount: 69,
    rating: 4.3,
    reviews: 8923,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80",
    specs: ["HD Bluetooth Calling", "7-Day Battery Life", "IP67 Water Resistant"],
  },
];

const deviceCatalog: Record<string, string[]> = {
  Apple: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Series", "iPhone 13 Series"],
  Samsung: ["Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23 FE", "Galaxy A55 5G", "Galaxy M34"],
  OnePlus: ["OnePlus 12", "OnePlus 12R", "OnePlus Nord CE 4", "OnePlus 11"],
  Realme: ["Realme 12 Pro+", "Realme 12 Pro", "Realme Narzo 70", "Realme 11"],
  Xiaomi: ["Redmi Note 13 Pro+", "Redmi Note 13", "Xiaomi 14", "Redmi 13C"],
};

export default function InteractiveHero() {
  const router = useRouter();
  const { addItem } = useCart();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Quick Device Finder state
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro Max");

  const slide = heroSlides[currentSlideIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(deviceCatalog[brand][0] || "");
  };

  const handleDeviceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(`${selectedBrand} ${selectedModel}`)}`);
  };

  const handleHeroAddToCart = (slideData: HeroSlide) => {
    const prod = getProductById(slideData.productId) || {
      id: slideData.productId,
      name: slideData.productName,
      category: slideData.categoryKey,
      brand: slideData.brand,
      image: slideData.image,
      description: slideData.description,
      price: slideData.price,
      originalPrice: slideData.originalPrice,
      discount: slideData.discount,
      rating: slideData.rating,
      reviewCount: slideData.reviews,
      inStock: true,
      specifications: {},
    };

    addItem(prod, 1);
    setAddedItems((prev) => ({ ...prev, [slideData.productId]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [slideData.productId]: false }));
    }, 2000);
  };

  return (
    <section 
      className="relative text-white overflow-hidden py-10 md:py-16 border-b-4 border-[#D96A10] bg-[#F47B20]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 1. IMAGE-BASED BACKGROUND COVERED BY RICH VIBRANT BRAND ORANGE UP TO ALL CORNERS */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url('${slide.bgImage}')` }}
      ></div>

      {/* Edge-to-edge Brand Orange gradient wash covering up to every corner */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F47B20]/95 via-[#E86E15]/92 to-[#C95304]/96 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[#F47B20]/75 mix-blend-color"></div>

      {/* Subtle depth lighting across corners */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* INTERACTIVE CATEGORY TABS BAR AT TOP OF HERO */}
        <div className="flex items-center justify-between pb-5 border-b border-white/25 mb-8 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-2">
            {heroSlides.map((s, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#171717] text-white shadow-2xl scale-105"
                      : "bg-black/20 hover:bg-black/30 text-white border border-white/20 backdrop-blur-md"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? "bg-[#F47B20] animate-pulse" : "bg-white/60"}`}></span>
                  <span>{s.categoryLabel}</span>
                  {isActive && (
                    <span className="text-[10px] bg-white/20 text-[#FFF1DF] px-1.5 py-0.5 rounded-full font-mono">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Carousel Next / Prev Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition border border-white/20 backdrop-blur-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
              className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition border border-white/20 backdrop-blur-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HERO MAIN STAGE: LEFT CONTENT + RIGHT INTERACTIVE PRODUCT CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Trust badges, and CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] text-[#FFF1DF] text-[11px] font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F47B20]" />
              <span className="tracking-wide uppercase">{slide.tagline}</span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="font-righteous text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              {slide.headline}{" "}
              <span className="text-[#FFF1DF] underline decoration-white/40 block sm:inline">
                {slide.headlineAccent}
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed drop-shadow-sm">
              {slide.description}
            </p>

            {/* Feature Specs Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {slide.specs.map((spec, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-black/25 border border-white/25 text-white backdrop-blur-md shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFF1DF]" />
                  <span>{spec}</span>
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={`/products?category=${slide.categoryKey}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#171717] hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-2xl transition-all flex items-center justify-center gap-2 group border border-black/40"
              >
                <span>Shop {slide.categoryLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F47B20]" />
              </Link>

              <Link
                href="/showcase"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#171717] hover:bg-white/90 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#F47B20]" />
                <span>Explore All Collections</span>
              </Link>
            </div>

            {/* Regional Trust Bar */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/20 text-xs font-semibold text-white">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Check className="w-4 h-4 text-[#FFF1DF]" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-[#FFF1DF]" />
                <span>Tamil Nadu Express</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#FFF1DF]" />
                <span>Quality Tested</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Product Stage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Crisp White Card Container on Radiant Orange BG */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-white/40 text-[#171717] space-y-4">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F47B20] flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    Featured Spotlight
                  </span>
                  <span className="bg-[#F47B20] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                    SAVE {slide.discount}%
                  </span>
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-square w-full rounded-2xl bg-[#FAFAFA] overflow-hidden p-4 flex items-center justify-center group border border-gray-100">
                  <img
                    src={slide.image}
                    alt={slide.productName}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#171717]/90 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{slide.rating}</span>
                    <span className="text-gray-400 text-[10px]">({slide.reviews})</span>
                  </div>

                  <Link 
                    href={`/products/${slide.productId}`}
                    className="absolute top-3 right-3 text-xs bg-[#171717] hover:bg-[#F47B20] text-white px-3 py-1 rounded-full font-semibold transition shadow"
                  >
                    View Details →
                  </Link>
                </div>

                {/* Product Info & Direct Add to Cart Action */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      {slide.brand}
                    </span>
                    <h3 className="font-righteous text-base font-bold text-gray-900 line-clamp-1">
                      {slide.productName}
                    </h3>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-righteous text-2xl font-bold text-[#171717]">
                        {formatPrice(slide.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(slide.originalPrice)}
                      </span>
                    </div>

                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      In Stock
                    </span>
                  </div>

                  {/* Interactive Quick Add To Cart Button right inside Hero */}
                  <button
                    onClick={() => handleHeroAddToCart(slide)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md ${
                      addedItems[slide.productId]
                        ? "bg-emerald-600 text-white"
                        : "bg-[#F47B20] hover:bg-[#D96A10] text-white shadow-[#F47B20]/25"
                    }`}
                  >
                    {addedItems[slide.productId] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart ({formatPrice(slide.price)})</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 3. INTERACTIVE DEVICE COMPATIBILITY QUICK FINDER AT BOTTOM OF HERO */}
        <div className="mt-10 bg-[#171717]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <form onSubmit={handleDeviceSearch} className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 w-full lg:w-auto text-left">
              <div className="w-10 h-10 rounded-xl bg-[#F47B20] text-white flex items-center justify-center shrink-0 shadow">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-righteous text-sm font-bold text-white leading-tight">
                  Find Gear for Your Smartphone
                </h4>
                <p className="text-[11px] text-gray-300">
                  Select your model to see exact-fit cases, screen guards & chargers.
                </p>
              </div>
            </div>

            {/* Interactive Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-2.5 w-full lg:w-auto flex-1 max-w-xl">
              
              {/* Brand Selector */}
              <div className="flex-1">
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full bg-[#222222] text-white border border-white/20 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#F47B20]"
                >
                  {Object.keys(deviceCatalog).map((b) => (
                    <option key={b} value={b}>
                      Brand: {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Selector */}
              <div className="flex-1">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-[#222222] text-white border border-white/20 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#F47B20]"
                >
                  {(deviceCatalog[selectedBrand] || []).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="sm:col-span-2 lg:col-span-1 px-5 py-2.5 bg-[#F47B20] hover:bg-[#D96A10] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find Matching Gear</span>
              </button>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
