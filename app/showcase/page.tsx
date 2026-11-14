"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { 
  products, 
  getTrendingProducts, 
  getBestsellers, 
  getNewArrivals, 
  getProductsByCategory 
} from "@/data/products";
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Tag, 
  ThumbsUp, 
  Smartphone, 
  Filter, 
  Layers 
} from "lucide-react";

type CollectionType = 
  | "trending" 
  | "cases" 
  | "new" 
  | "bestsellers" 
  | "offers" 
  | "recommended";

interface CollectionMeta {
  id: CollectionType;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  bgGradient: string;
}

const collectionsList: CollectionMeta[] = [
  {
    id: "trending",
    title: "Trending Accessories",
    tagline: "The fastest moving mobile gear and viral phone accessories right now.",
    icon: <Sparkles className="w-5 h-5" />,
    bgGradient: "from-orange-500 to-amber-600",
  },
  {
    id: "cases",
    title: "Premium Mobile Cases",
    tagline: "Engineered shockproof drop protection, slim covers and designer cases.",
    icon: <Smartphone className="w-5 h-5" />,
    bgGradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "new",
    title: "New Arrivals",
    tagline: "Latest additions to the VMart showroom fresh from top tech brands.",
    icon: <Clock className="w-5 h-5" />,
    bgGradient: "from-emerald-600 to-teal-700",
  },
  {
    id: "bestsellers",
    title: "Bestselling Gadgets",
    tagline: "Customer-tested favorites with the highest ratings and verified reviews.",
    icon: <Flame className="w-5 h-5" />,
    bgGradient: "from-rose-600 to-red-700",
  },
  {
    id: "offers",
    title: "Special Offers & Deals",
    tagline: "Exclusive discounts up to 69% off original retail price for a limited time.",
    icon: <Tag className="w-5 h-5" />,
    bgGradient: "from-purple-600 to-indigo-800",
  },
  {
    id: "recommended",
    title: "Recommended Products",
    tagline: "Expert-selected gear driven by build quality, performance and value.",
    icon: <ThumbsUp className="w-5 h-5" />,
    bgGradient: "from-amber-600 to-orange-700",
  },
];

export default function ShowcasePage() {
  const [activeCollection, setActiveCollection] = useState<CollectionType>("trending");
  const [brandFilter, setBrandFilter] = useState<string>("all");

  const currentMeta = collectionsList.find(c => c.id === activeCollection) || collectionsList[0];

  const collectionProducts = useMemo(() => {
    let list: typeof products = [];
    switch (activeCollection) {
      case "trending":
        list = getTrendingProducts();
        break;
      case "cases":
        list = getProductsByCategory("cases");
        break;
      case "new":
        list = getNewArrivals();
        break;
      case "bestsellers":
        list = getBestsellers();
        break;
      case "offers":
        list = products.filter(p => p.discount >= 40);
        break;
      case "recommended":
        list = products.filter(p => p.rating >= 4.4);
        break;
    }

    if (brandFilter !== "all") {
      list = list.filter(p => p.brand.toLowerCase() === brandFilter.toLowerCase());
    }

    return list;
  }, [activeCollection, brandFilter]);

  const availableBrands = useMemo(() => {
    let list: typeof products = [];
    switch (activeCollection) {
      case "trending": list = getTrendingProducts(); break;
      case "cases": list = getProductsByCategory("cases"); break;
      case "new": list = getNewArrivals(); break;
      case "bestsellers": list = getBestsellers(); break;
      case "offers": list = products.filter(p => p.discount >= 40); break;
      case "recommended": list = products.filter(p => p.rating >= 4.4); break;
    }
    const brands = Array.from(new Set(list.map(p => p.brand)));
    return brands.sort();
  }, [activeCollection]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pb-16">
        {/* Showcase Hero Banner */}
        <div className={`bg-gradient-to-r ${currentMeta.bgGradient} text-white py-12 md:py-16 transition-colors duration-300 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/15"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white/80 mb-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Curated Showcases • VMart Vela</span>
            </div>
            <h1 className="font-righteous text-3xl sm:text-5xl font-bold tracking-tight mb-3">
              {currentMeta.title}
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl">
              {currentMeta.tagline}
            </p>
          </div>
        </div>

        {/* Collection Selector Tabs */}
        <div className="bg-white border-b border-[#EEEEEE] sticky top-[69px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
              {collectionsList.map((col) => {
                const isActive = activeCollection === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setActiveCollection(col.id);
                      setBrandFilter("all");
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                      isActive
                        ? "bg-[#F47B20] text-white shadow-md shadow-[#F47B20]/20"
                        : "bg-[#FAFAFA] text-gray-700 hover:bg-[#FFF1DF] hover:text-[#F47B20] border border-[#EEEEEE]"
                    }`}
                  >
                    <span>{col.icon}</span>
                    <span>{col.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Showcase Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Brand quick filter pills */}
          {availableBrands.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                Brand:
              </span>
              <button
                onClick={() => setBrandFilter("all")}
                className={`text-xs px-3 py-1 rounded-full font-semibold transition ${
                  brandFilter === "all"
                    ? "bg-[#171717] text-white"
                    : "bg-white text-gray-700 border border-[#EEEEEE] hover:border-gray-400"
                }`}
              >
                All Brands ({collectionProducts.length})
              </button>
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setBrandFilter(brand)}
                  className={`text-xs px-3 py-1 rounded-full font-semibold transition whitespace-nowrap ${
                    brandFilter === brand
                      ? "bg-[#F47B20] text-white"
                      : "bg-white text-gray-700 border border-[#EEEEEE] hover:border-[#F47B20]"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}

          {/* Result Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-xs text-[#777777]">
              Showing <strong className="text-[#171717]">{collectionProducts.length}</strong> products in{" "}
              <span className="text-[#F47B20] font-semibold">{currentMeta.title}</span>
            </p>
          </div>

          {/* Product Grid */}
          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#EEEEEE]">
              <p className="text-sm text-gray-500">No products found for the selected brand in this showcase.</p>
              <button
                onClick={() => setBrandFilter("all")}
                className="mt-3 text-xs font-bold text-[#F47B20] underline"
              >
                Clear Brand Filter
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

