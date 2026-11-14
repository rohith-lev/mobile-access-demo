"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { categories, products, Product } from "@/data/products";
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Search, 
  RotateCcw,
  Sparkles,
  Info,
  Check,
  ChevronDown
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "featured";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [catalogueSearch, setCatalogueSearch] = useState<string>("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category param if query changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // All available unique brands
  const allBrands = useMemo(() => {
    const set = new Set(products.map(p => p.brand));
    return Array.from(set).sort();
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setPriceRange([0, 25000]);
    setSelectedSort("featured");
    setInStockOnly(false);
    setMinRating(0);
    setCatalogueSearch("");
  };

  const hasActiveFilters = 
    selectedCategory !== "all" ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 25000 ||
    inStockOnly ||
    minRating > 0 ||
    catalogueSearch.trim().length > 0;

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Internal search
      if (catalogueSearch.trim()) {
        const q = catalogueSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === "price-low") return a.price - b.price;
      if (selectedSort === "price-high") return b.price - a.price;
      if (selectedSort === "rating") return b.rating - a.rating;
      if (selectedSort === "discount") return b.discount - a.discount;
      if (selectedSort === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default featured
    });
  }, [selectedCategory, selectedBrands, priceRange, inStockOnly, minRating, catalogueSearch, selectedSort]);

  const activeCategoryObj = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pb-16">
        
        {/* Top Header Banner */}
        <div className="bg-[#171717] text-white py-8 border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F47B20] uppercase tracking-wider mb-1">
                  <span>Product Catalogue</span>
                  <span>•</span>
                  <span>{activeCategoryObj ? activeCategoryObj.name : "All Categories"}</span>
                </div>
                <h1 className="font-righteous text-2xl sm:text-4xl font-bold">
                  {activeCategoryObj ? activeCategoryObj.name : "Explore All Mobile Accessories"}
                </h1>
                <p className="text-xs text-gray-400 mt-1 max-w-xl">
                  Browse authentic cases, screen guards, high-wattage chargers, power banks and audio gear.
                </p>
              </div>

              {/* Demo Data Disclaimer Badge */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-gray-300 max-w-sm">
                <div className="flex items-center gap-1.5 text-[#F47B20] font-bold mb-0.5">
                  <Info className="w-4 h-4" />
                  <span>Demonstration Data</span>
                </div>
                <span>Catalog items, specifications and ₹ prices represent client prototype demonstration inventory.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area: Sidebar Filters + Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Top Control Bar: Search, Mobile Filter Toggle, Sort */}
          <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quick in-page search input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by name, brand or spec..."
                value={catalogueSearch}
                onChange={(e) => setCatalogueSearch(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EEEEEE] focus:border-[#F47B20] pl-9 pr-8 py-2 rounded-xl text-xs outline-none"
              />
              {catalogueSearch && (
                <button
                  onClick={() => setCatalogueSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results count & Mobile filter trigger & Sort */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <p className="text-xs text-gray-500 hidden md:block">
                Showing <strong className="text-gray-900">{filteredProducts.length}</strong> products
              </p>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] text-xs font-bold text-gray-800 hover:border-[#F47B20]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#F47B20]" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#F47B20]"></span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-[#FAFAFA] border border-[#EEEEEE] text-xs font-semibold text-gray-800 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap mb-6 bg-[#FFF1DF]/40 p-3 rounded-xl border border-[#F47B20]/20">
              <span className="text-xs font-bold text-[#F47B20]">Active Filters:</span>
              
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#EEEEEE] px-2.5 py-1 rounded-full text-gray-800 font-medium">
                  Category: {activeCategoryObj?.name}
                  <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                </span>
              )}

              {selectedBrands.map(b => (
                <span key={b} className="inline-flex items-center gap-1 text-xs bg-white border border-[#EEEEEE] px-2.5 py-1 rounded-full text-gray-800 font-medium">
                  {b}
                  <button onClick={() => toggleBrand(b)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                </span>
              ))}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#EEEEEE] px-2.5 py-1 rounded-full text-gray-800 font-medium">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#EEEEEE] px-2.5 py-1 rounded-full text-gray-800 font-medium">
                  Rating: {minRating}+ Stars
                  <button onClick={() => setMinRating(0)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                </span>
              )}

              {catalogueSearch && (
                <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#EEEEEE] px-2.5 py-1 rounded-full text-gray-800 font-medium">
                  &quot;{catalogueSearch}&quot;
                  <button onClick={() => setCatalogueSearch("")}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#F47B20] hover:underline flex items-center gap-1 ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All
              </button>
            </div>
          )}

          {/* Grid Layout: Left Sidebar + Right Products */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block space-y-6">
              
              {/* Categories Filter Box */}
              <div className="bg-white rounded-2xl p-5 border border-[#EEEEEE] shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center justify-between">
                  <span>Categories</span>
                  <span className="text-[10px] text-gray-400">({categories.length})</span>
                </h3>
                <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                      selectedCategory === "all"
                        ? "bg-[#FFF1DF] text-[#F47B20] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] text-gray-400">{products.length}</span>
                  </button>

                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat.id).length;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                          isSelected
                            ? "bg-[#FFF1DF] text-[#F47B20] font-bold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] text-gray-400 ml-2">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands Filter Box */}
              <div className="bg-white rounded-2xl p-5 border border-[#EEEEEE] shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center justify-between">
                  <span>Brands</span>
                  {selectedBrands.length > 0 && (
                    <button 
                      onClick={() => setSelectedBrands([])}
                      className="text-[10px] text-[#F47B20] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </h3>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {allBrands.map((brand) => {
                    const isChecked = selectedBrands.includes(brand);
                    const brandCount = products.filter(p => p.brand === brand).length;
                    return (
                      <label
                        key={brand}
                        className="flex items-center justify-between text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 rounded text-[#F47B20] focus:ring-[#F47B20] border-gray-300"
                          />
                          <span>{brand}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">({brandCount})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter Box */}
              <div className="bg-white rounded-2xl p-5 border border-[#EEEEEE] shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Price Range
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPriceRange([0, 500])}
                      className="py-1.5 px-2 rounded-lg border border-[#EEEEEE] hover:border-[#F47B20] text-center"
                    >
                      Under ₹500
                    </button>
                    <button
                      onClick={() => setPriceRange([500, 1500])}
                      className="py-1.5 px-2 rounded-lg border border-[#EEEEEE] hover:border-[#F47B20] text-center"
                    >
                      ₹500 – ₹1,500
                    </button>
                    <button
                      onClick={() => setPriceRange([1500, 3000])}
                      className="py-1.5 px-2 rounded-lg border border-[#EEEEEE] hover:border-[#F47B20] text-center"
                    >
                      ₹1,500 – ₹3,000
                    </button>
                    <button
                      onClick={() => setPriceRange([3000, 25000])}
                      className="py-1.5 px-2 rounded-lg border border-[#EEEEEE] hover:border-[#F47B20] text-center"
                    >
                      Above ₹3,000
                    </button>
                  </div>
                </div>
              </div>

              {/* Rating & Availability */}
              <div className="bg-white rounded-2xl p-5 border border-[#EEEEEE] shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Customer Rating & Stock
                </h3>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-[#F47B20] focus:ring-[#F47B20] border-gray-300"
                    />
                    <span>In Stock Products Only</span>
                  </label>
                  
                  <div className="pt-2">
                    <span className="text-[11px] text-gray-500 font-semibold block mb-1">Minimum Rating:</span>
                    <div className="flex gap-1.5">
                      {[4, 4.2, 4.5].map(stars => (
                        <button
                          key={stars}
                          onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                          className={`text-xs px-2.5 py-1 rounded-lg border ${
                            minRating === stars
                              ? "bg-[#F47B20] text-white border-[#F47B20]"
                              : "border-[#EEEEEE] text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {stars}★+
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </aside>

            {/* Products Grid Area (3 Columns on desktop) */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#EEEEEE]">
                  <p className="text-base font-bold text-gray-800 mb-2">No matching accessories found</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Try adjusting or clearing your filters to see more products in our catalogue.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-[#F47B20] text-white text-xs font-bold rounded-xl hover:bg-[#D96A10] transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Filter Slide-Over Modal */}
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-xs bg-white h-full flex flex-col p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="font-bold text-sm text-gray-900">Filter Products</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-900 mb-2">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-gray-200"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-900 mb-2">Brands</h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {allBrands.map(b => (
                      <label key={b} className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(b)}
                          onChange={() => toggleBrand(b)}
                          className="w-3.5 h-3.5 text-[#F47B20]"
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#F47B20]"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <button
                  onClick={resetFilters}
                  className="w-1/2 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#F47B20] text-white text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalogue...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

