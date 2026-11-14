"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Heart, 
  ChevronDown,
  Sparkles,
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
  Layers,
  ShoppingBag
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { categories, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const categoryIconMap: Record<string, React.ReactNode> = {
  cases: <Smartphone className="w-4 h-4" />,
  screen: <Shield className="w-4 h-4" />,
  chargers: <Zap className="w-4 h-4" />,
  cables: <Cable className="w-4 h-4" />,
  powerbanks: <Battery className="w-4 h-4" />,
  earbuds: <Headphones className="w-4 h-4" />,
  speakers: <Volume2 className="w-4 h-4" />,
  watches: <Watch className="w-4 h-4" />,
  stands: <Monitor className="w-4 h-4" />,
  other: <Package className="w-4 h-4" />,
};

export default function Header() {
  const router = useRouter();
  const { totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions on query change
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matches = products.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.brand.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchSuggestions(matches);
      setIsSearchOpen(true);
    } else {
      setSearchSuggestions([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#EEEEEE]">
      {/* 1. Promotional Announcement Bar */}
      <div className="bg-[#171717] text-white text-xs py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1.5 text-[#F47B20] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              SPECIAL OFFER:
            </span>
            <span className="text-gray-300">
              Free Express Delivery across Tamil Nadu on orders above ₹499!
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <span className="hidden md:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F47B20]" />
              Driven by Quality and Trust
            </span>
            <span className="hidden sm:inline">|</span>
            <a 
              href="https://www.instagram.com/vmart_velamobileaccessories/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#F47B20] hover:underline flex items-center gap-1 font-medium"
            >
              @vmart_velamobileaccessories
            </a>
            <span className="hidden sm:inline">|</span>
            <Link href="/admin" className="hover:text-white transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile menu toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#F47B20] rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* VMart Official Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-[#F47B20] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                <span className="font-righteous tracking-tighter">VM</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-righteous text-2xl font-bold tracking-tight text-[#171717] group-hover:text-[#F47B20] transition-colors">
                    VMART
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFF1DF] text-[#F47B20] border border-[#F47B20]/20 uppercase">
                    Original
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777777] -mt-1">
                  Vela Mobile Accessories
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search phone cases, 65W chargers, earbuds, smartwatches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
                className="w-full bg-[#FAFAFA] border border-[#EEEEEE] focus:border-[#F47B20] focus:bg-white pl-4 pr-12 py-2.5 rounded-full text-sm outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F47B20] text-white flex items-center justify-center hover:bg-[#D96A10] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#EEEEEE] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium px-3">
                  <span>Suggested Products</span>
                  <span>Press enter to see all</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                  {searchSuggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-3 hover:bg-[#FFF1DF]/40 transition group"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-11 h-11 rounded-lg object-cover border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-900 group-hover:text-[#F47B20] truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2">
                          <span className="capitalize">{product.brand}</span>
                          <span>•</span>
                          <span className="font-bold text-[#F47B20]">{formatPrice(product.price)}</span>
                          <span className="line-through text-gray-400">{formatPrice(product.originalPrice)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="block text-center py-2.5 bg-gray-50 hover:bg-[#FFF1DF] text-xs font-bold text-[#F47B20] border-t border-gray-100 transition"
                >
                  View all matching results for &quot;{searchQuery}&quot; →
                </Link>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick Catalog / Showcase Link */}
            <Link 
              href="/showcase" 
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-gray-700 hover:text-[#F47B20] hover:bg-[#FFF1DF]/50 transition"
            >
              <Layers className="w-4 h-4 text-[#F47B20]" />
              <span>Showcase</span>
            </Link>

            {/* Account Dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
                aria-label="Account Menu"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">Welcome</span>
                  <span className="text-xs font-semibold text-gray-800 leading-tight">My Account</span>
                </div>
                <ChevronDown className="hidden xl:block w-3.5 h-3.5 text-gray-500" />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#EEEEEE] py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Demo Customer</p>
                    <p className="text-sm font-bold text-gray-900">Guest User</p>
                    <span className="inline-block mt-1 text-[10px] bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded">
                      Demo Account Active
                    </span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-[#FFF1DF] hover:text-[#F47B20] transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    My Orders & Cart ({totalItems})
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-[#FFF1DF] hover:text-[#F47B20] transition"
                  >
                    <Layers className="w-4 h-4" />
                    Browse All Products
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-[#FFF1DF] hover:text-[#F47B20] transition border-t border-gray-100"
                  >
                    <Sparkles className="w-4 h-4 text-[#F47B20]" />
                    Admin Dashboard (Demo)
                  </Link>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2.5 bg-[#F47B20] text-white px-3.5 py-2 rounded-lg hover:bg-[#D96A10] transition-colors shadow-sm relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#F47B20] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#F47B20] shadow-sm">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-white/80 uppercase font-semibold leading-none">Cart</span>
                <span className="text-xs font-bold leading-none mt-1">
                  {totalPrice > 0 ? formatPrice(totalPrice) : "₹0"}
                </span>
              </div>
            </Link>

          </div>
        </div>

        {/* Mobile Search Bar (visible on small screens) */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search accessories, cases, gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-[#EEEEEE] focus:border-[#F47B20] pl-4 pr-10 py-2 rounded-full text-xs outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#F47B20] text-white flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Product Category Navigation Bar */}
      <nav className="bg-[#FFF1DF]/40 border-t border-[#EEEEEE] hidden lg:block overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1.5 overflow-x-auto no-scrollbar">
            <Link
              href="/products"
              className="px-3 py-1.5 rounded-md text-xs font-bold text-gray-800 hover:text-[#F47B20] hover:bg-white transition whitespace-nowrap flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-[#F47B20]" />
              All Categories
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 hover:text-[#F47B20] hover:bg-white transition whitespace-nowrap flex items-center gap-1.5"
              >
                <span className="text-gray-500 group-hover:text-[#F47B20]">
                  {categoryIconMap[cat.id] || <Package className="w-3.5 h-3.5" />}
                </span>
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center text-xs font-semibold text-[#F47B20] pl-4">
            <Link href="/showcase" className="flex items-center gap-1 hover:underline">
              <span>Trending Deals</span>
              <span className="bg-[#F47B20] text-white text-[9px] px-1 rounded uppercase">Hot</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col z-50">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#171717] text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#F47B20] flex items-center justify-center font-righteous text-white font-bold text-base">
                  VM
                </div>
                <div>
                  <h3 className="font-righteous text-lg font-bold">VMART</h3>
                  <p className="text-[10px] text-gray-400">Vela Mobile Accessories</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#777777] uppercase tracking-wider px-2">Navigation</p>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-[#FFF1DF] hover:text-[#F47B20]"
                >
                  <span>Home</span>
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-[#FFF1DF] hover:text-[#F47B20]"
                >
                  <Layers className="w-4 h-4 text-[#F47B20]" />
                  <span>All Products Catalogue</span>
                </Link>
                <Link
                  href="/showcase"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-[#FFF1DF] hover:text-[#F47B20]"
                >
                  <Sparkles className="w-4 h-4 text-[#F47B20]" />
                  <span>Product Showcase</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-[#FFF1DF] hover:text-[#F47B20]"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-[#F47B20]" />
                    <span>Shopping Cart</span>
                  </div>
                  <span className="bg-[#F47B20] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {totalItems}
                  </span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-[#FFF1DF] hover:text-[#F47B20]"
                >
                  <Monitor className="w-4 h-4 text-[#F47B20]" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-100">
                <p className="text-[11px] font-bold text-[#777777] uppercase tracking-wider px-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-[#FFF1DF] hover:text-[#F47B20]"
                  >
                    <span className="text-[#F47B20]">
                      {categoryIconMap[cat.id] || <Package className="w-3.5 h-3.5" />}
                    </span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>

              {/* Instagram link in drawer */}
              <div className="p-3 bg-[#FFF1DF] rounded-xl text-center space-y-1">
                <p className="text-xs font-bold text-[#171717]">Follow Us on Instagram</p>
                <a
                  href="https://www.instagram.com/vmart_velamobileaccessories/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#F47B20] hover:underline block"
                >
                  @vmart_velamobileaccessories
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
              Driven by Quality and Trust • Tamil Nadu, India
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

