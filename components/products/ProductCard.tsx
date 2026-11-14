"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Check, Eye, Sparkles, ShieldCheck } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className={`group bg-white rounded-xl border border-[#EEEEEE] hover:border-[#F47B20]/40 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden relative ${
      featured ? "ring-2 ring-[#F47B20]/20" : ""
    }`}>
      
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.discount > 0 && (
          <span className="bg-[#F47B20] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
            {product.discount}% OFF
          </span>
        )}
        {product.isTrending && (
          <span className="bg-[#171717] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-[#F47B20]" />
            Trending
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-[#FFF1DF] text-[#F47B20] border border-[#F47B20]/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Bestseller
          </span>
        )}
        {product.isNew && (
          <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            New Arrival
          </span>
        )}
      </div>

      {/* Product Image Area */}
      <Link 
        href={`/products/${product.id}`}
        className="block relative w-full pt-[100%] bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#F47B20]" />
            Quick View
          </span>
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        
        {/* Brand & Stock Status */}
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="uppercase font-semibold tracking-wider text-[#777777]">
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            In Stock
          </span>
        </div>

        {/* Product Name */}
        <Link 
          href={`/products/${product.id}`}
          className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#F47B20] transition-colors line-clamp-2 leading-snug mb-2"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-gray-800 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price Row */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-extrabold text-[#171717]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.id}`}
            className="w-full text-center py-2 px-2 rounded-lg border border-[#EEEEEE] hover:border-[#F47B20] hover:text-[#F47B20] text-xs font-semibold text-gray-700 transition"
          >
            Details
          </Link>
          
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#F47B20] hover:bg-[#D96A10] text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

