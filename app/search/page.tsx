"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, searchProducts } from "@/data/products";
import { 
  Search as SearchIcon, 
  X, 
  Sparkles, 
  PackageOpen, 
  ArrowRight, 
  Layers, 
  SlidersHorizontal 
} from "lucide-react";

const searchSuggestions = [
  "iPhone 15 Case",
  "65W GaN Charger",
  "boAt Earbuds",
  "20000mAh Power Bank",
  "Tempered Glass",
  "Samsung Charger",
  "Fire-Boltt Watch",
  "Car Phone Mount",
  "Type C Cable",
  "Bluetooth Speaker",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("relevance");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    let list = searchProducts(query.trim());

    if (selectedCategory !== "all") {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (selectedSort === "price-low") list.sort((a, b) => a.price - b.price);
    if (selectedSort === "price-high") list.sort((a, b) => b.price - a.price);
    if (selectedSort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [query, selectedCategory, selectedSort]);

  const trendingPicks = useMemo(() => {
    return products.filter(p => p.isTrending || p.isBestseller).slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pb-16">
        
        {/* Search Header Hero */}
        <div className="bg-[#171717] text-white py-10 border-b border-[#EEEEEE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F47B20] uppercase tracking-wider">
              <SearchIcon className="w-4 h-4" />
              <span>Catalog Search Portal</span>
            </div>
            <h1 className="font-righteous text-3xl sm:text-4xl font-bold">
              Find Exact Accessories & Gadgets
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              Search across our verified inventory of cases, fast chargers, power banks, earphones and wearables.
            </p>

            {/* Main Interactive Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto pt-2">
              <input
                type="text"
                placeholder="Search by brand, phone model, or accessory type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white text-gray-900 border-2 border-transparent focus:border-[#F47B20] pl-5 pr-14 py-3.5 rounded-2xl text-sm font-medium shadow-xl outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#F47B20] text-white flex items-center justify-center hover:bg-[#D96A10] transition shadow-md"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            </form>

            {/* Popular Search Suggestions Pills */}
            <div className="pt-2 flex items-center justify-center gap-1.5 flex-wrap text-xs">
              <span className="text-gray-400 font-semibold mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F47B20]" />
                Try:
              </span>
              {searchSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
                  }}
                  className="bg-white/10 hover:bg-[#F47B20] text-gray-200 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition text-[11px]"
                >
                  {suggestion}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Results Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {query.trim() ? (
            <>
              {/* Results Control Strip */}
              <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Results for &quot;<span className="text-[#F47B20]">{query}</span>&quot;
                  </h2>
                  <p className="text-xs text-gray-500">
                    Found {results.length} matching items in catalogue
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#FAFAFA] border border-[#EEEEEE] text-xs font-semibold rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-[#FAFAFA] border border-[#EEEEEE] text-xs font-semibold rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Grid or Empty */}
              {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#EEEEEE] max-w-xl mx-auto space-y-4">
                  <div className="w-16 h-16 bg-[#FFF1DF] rounded-full flex items-center justify-center mx-auto text-[#F47B20]">
                    <PackageOpen className="w-8 h-8" />
                  </div>
                  <h3 className="font-righteous text-xl font-bold text-gray-900">
                    No Matching Products Found
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    We couldn&apos;t find any item matching &quot;{query}&quot;. Try checking for typos or browse our popular categories below.
                  </p>
                  
                  {/* Category Suggestions */}
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    {categories.slice(0, 5).map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setQuery(cat.name);
                          router.push(`/search?q=${encodeURIComponent(cat.name)}`);
                        }}
                        className="text-xs bg-[#FAFAFA] hover:bg-[#FFF1DF] hover:text-[#F47B20] border border-[#EEEEEE] px-3 py-1.5 rounded-xl font-semibold transition"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Idle State: Browse Popular Categories & Trending Picks */
            <div className="space-y-12">
              <div>
                <h3 className="font-righteous text-xl font-bold text-gray-900 mb-4">
                  Browse by Popular Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setQuery(cat.name);
                        router.push(`/search?q=${encodeURIComponent(cat.name)}`);
                      }}
                      className="p-4 bg-white hover:bg-[#FFF1DF] rounded-2xl border border-[#EEEEEE] hover:border-[#F47B20] text-center transition group shadow-sm"
                    >
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#F47B20]">
                        {cat.name}
                      </h4>
                      <span className="text-[10px] text-gray-400">Search category</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-righteous text-xl font-bold text-gray-900">
                    Trending Search Picks
                  </h3>
                  <span className="text-xs text-[#F47B20] font-bold">Frequently Viewed</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {trendingPicks.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

