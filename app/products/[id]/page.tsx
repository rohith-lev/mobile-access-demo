"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { getProductById, products, categories, Product } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  MapPin, 
  Share2, 
  Heart, 
  PackageOpen,
  ArrowLeft,
  Sparkles,
  Info
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const productId = params?.id as string;

  const product = useMemo(() => {
    return getProductById(productId);
  }, [productId]);

  // Gallery state
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    return [product.image];
  }, [product]);

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0] || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Initialize first option for each variant
  React.useEffect(() => {
    if (product && product.variants) {
      const initial: Record<string, string> = {};
      product.variants.forEach(v => {
        if (v.options && v.options.length > 0) {
          initial[v.name] = v.options[0];
        }
      });
      setSelectedVariants(initial);
    }
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-[#FFF1DF] rounded-full flex items-center justify-center mx-auto mb-4 text-[#F47B20]">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6 text-sm">The product you are looking for does not exist or has been removed.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F47B20] text-white rounded-xl text-xs font-bold hover:bg-[#D96A10] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryObj = categories.find(c => c.id === product.category);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariants);
    router.push("/checkout");
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("Delivery available in 1-2 business days across Tamil Nadu! Free express shipping on this order.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code (e.g. 600001).");
    }
  };

  const savings = product.originalPrice - product.price;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pb-16">
        
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-[#EEEEEE] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto no-scrollbar">
              <Link href="/" className="hover:text-[#F47B20] whitespace-nowrap">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <Link href="/products" className="hover:text-[#F47B20] whitespace-nowrap">Catalogue</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <Link href={`/products?category=${product.category}`} className="hover:text-[#F47B20] whitespace-nowrap">
                {categoryObj ? categoryObj.name : product.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details Main Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EEEEEE] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Image Gallery (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Main Image Stage */}
                <div className="relative aspect-square w-full bg-[#FAFAFA] rounded-2xl border border-[#EEEEEE] overflow-hidden flex items-center justify-center p-6 group">
                  <img
                    src={activeImage || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-[#F47B20] text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                      {product.discount}% OFF
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="absolute top-4 right-4 bg-[#171717] text-[#F47B20] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                </div>

                {/* Thumbnail selector */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {galleryImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-16 h-16 rounded-xl border-2 p-1 bg-[#FAFAFA] shrink-0 transition-all ${
                          activeImage === imgUrl
                            ? "border-[#F47B20] ring-2 ring-[#F47B20]/20"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Trust Highlights under images */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center text-[11px] text-gray-600">
                  <div className="p-2 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE]">
                    <ShieldCheck className="w-4 h-4 text-[#F47B20] mx-auto mb-1" />
                    <span className="font-semibold block">100% Genuine</span>
                    <span className="text-[10px] text-gray-400">Quality Verified</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE]">
                    <RotateCcw className="w-4 h-4 text-[#F47B20] mx-auto mb-1" />
                    <span className="font-semibold block">7-Day Return</span>
                    <span className="text-[10px] text-gray-400">Easy Replacement</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE]">
                    <Truck className="w-4 h-4 text-[#F47B20] mx-auto mb-1" />
                    <span className="font-semibold block">Tamil Nadu Fast</span>
                    <span className="text-[10px] text-gray-400">Express Courier</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Information, Pricing, Actions (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Brand & Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F47B20]">
                      {product.brand} Official
                    </span>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ● In Stock & Ready to Ship
                    </span>
                  </div>
                  <h1 className="font-righteous text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                    {product.name}
                  </h1>
                </div>

                {/* Ratings & Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-gray-900 ml-1.5">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Based on {product.reviewCount} customer reviews
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-[#F47B20] font-semibold">
                    Driven by Quality & Trust
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#FFF1DF]/40 border border-[#F47B20]/20 space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#171717]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-base text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="text-xs font-extrabold text-white bg-[#F47B20] px-2 py-0.5 rounded">
                        SAVE {product.discount}%
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-xs text-emerald-700 font-medium">
                      You save {formatPrice(savings)} inclusive of all demonstration taxes.
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1.5">
                    Product Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Variants Selector */}
                {product.variants && product.variants.map((v) => (
                  <div key={v.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900">Select {v.name}:</span>
                      <span className="text-[#F47B20] font-semibold">{selectedVariants[v.name]}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((option) => {
                        const isSelected = selectedVariants[v.name] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => setSelectedVariants(prev => ({ ...prev, [v.name]: option }))}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                              isSelected
                                ? "bg-[#171717] text-white border-[#171717] shadow-sm"
                                : "bg-white text-gray-700 border-gray-200 hover:border-[#F47B20]"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Quantity & CTA Buttons */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-900">Quantity:</span>
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-200 transition"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-xs font-bold text-gray-900 bg-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-white border-2 border-[#F47B20] text-[#F47B20] hover:bg-[#FFF1DF]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-[#F47B20] hover:bg-[#D96A10] text-white transition flex items-center justify-center gap-2 shadow-md shadow-[#F47B20]/25"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

                {/* PIN Code Delivery Estimator */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EEEEEE] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <MapPin className="w-4 h-4 text-[#F47B20]" />
                    <span>Check Delivery across Tamil Nadu</span>
                  </div>
                  <form onSubmit={handlePincodeCheck} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit Pincode (e.g. 600001)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength={6}
                      className="flex-1 bg-white border border-gray-200 focus:border-[#F47B20] px-3 py-2 rounded-xl text-xs outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#171717] text-white text-xs font-bold rounded-xl hover:bg-black transition"
                    >
                      Check
                    </button>
                  </form>
                  {pincodeStatus && (
                    <p className={`text-[11px] ${pincodeStatus.includes('valid') ? 'text-red-500' : 'text-emerald-700 font-medium'}`}>
                      {pincodeStatus}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* Specifications Section */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="font-righteous text-xl font-bold text-gray-900 mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] text-xs">
                      <span className="font-semibold text-gray-500">{key}</span>
                      <span className="font-bold text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Related Products Showcase */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                    Similar Picks
                  </span>
                  <h3 className="font-righteous text-2xl font-bold text-[#171717]">
                    Related Accessories
                  </h3>
                </div>
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-xs font-bold text-[#F47B20] hover:underline"
                >
                  View More in Category →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

