"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Delivery calculation: Free above ₹499, else ₹49
  const freeDeliveryThreshold = 499;
  const isFreeDelivery = totalPrice >= freeDeliveryThreshold;
  const deliveryCharge = items.length === 0 ? 0 : (isFreeDelivery ? 0 : 49);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - totalPrice);
  const deliveryProgress = Math.min(100, Math.round((totalPrice / freeDeliveryThreshold) * 100));

  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const finalPayable = Math.max(0, totalPrice - discountAmount + deliveryCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "VMART10") {
      setDiscountPercent(10);
      setCouponMessage({ text: "Coupon 'VMART10' applied! You get 10% demo discount.", isError: false });
    } else if (code === "VELA20") {
      setDiscountPercent(20);
      setCouponMessage({ text: "VIP Coupon 'VELA20' applied! 20% discount unlocked.", isError: false });
    } else {
      setCouponMessage({ text: "Invalid demo code. Try 'VMART10' or 'VELA20'.", isError: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pb-16">
        
        {/* Cart Header */}
        <div className="bg-[#171717] text-white py-8 border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-righteous text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <span>Shopping Cart</span>
                  <span className="text-xs font-sans font-bold bg-[#F47B20] text-white px-2.5 py-1 rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Review your selected mobile accessories before proceeding to checkout.
                </p>
              </div>

              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-[#EEEEEE] shadow-sm max-w-xl mx-auto my-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FFF1DF] text-[#F47B20] flex items-center justify-center mx-auto">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <h2 className="font-righteous text-2xl font-bold text-gray-900">
                Your Shopping Cart is Empty
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                Looks like you haven&apos;t added any phone cases, chargers or gadgets yet. Explore our fresh collection!
              </p>
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] text-white font-bold text-xs shadow-md transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Catalogue</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Active Cart: Left Items List + Right Order Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Cart Items (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Free delivery tracker banner */}
                <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-gray-800">
                      <Truck className="w-4 h-4 text-[#F47B20]" />
                      {isFreeDelivery ? (
                        <span className="text-emerald-600 font-extrabold">
                          🎉 Congratulations! You unlocked FREE Delivery across Tamil Nadu!
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-[#F47B20]">{formatPrice(amountNeededForFreeDelivery)}</strong> more for FREE Delivery!
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-gray-500">{deliveryProgress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isFreeDelivery ? "bg-emerald-500" : "bg-[#F47B20]"
                      }`}
                      style={{ width: `${deliveryProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-white rounded-3xl border border-[#EEEEEE] shadow-sm divide-y divide-gray-100 overflow-hidden">
                  {items.map(({ product, quantity, selectedVariants }) => {
                    const itemTotal = product.price * quantity;
                    return (
                      <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        
                        {/* Thumbnail */}
                        <Link 
                          href={`/products/${product.id}`}
                          className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAFAFA] rounded-2xl p-2 shrink-0 border border-gray-100 block"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-bold text-[#F47B20]">
                            {product.brand}
                          </span>
                          <Link 
                            href={`/products/${product.id}`}
                            className="text-xs sm:text-sm font-bold text-gray-900 hover:text-[#F47B20] block truncate"
                          >
                            {product.name}
                          </Link>

                          {/* Selected Variants */}
                          {selectedVariants && Object.keys(selectedVariants).length > 0 && (
                            <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 mt-1">
                              {Object.entries(selectedVariants).map(([k, v]) => (
                                <span key={k} className="bg-gray-100 px-2 py-0.5 rounded">
                                  {k}: <strong className="text-gray-700">{v}</strong>
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-1.5 text-xs">
                            <span className="font-extrabold text-[#171717]">{formatPrice(product.price)}</span>
                            {product.originalPrice > product.price && (
                              <span className="line-through text-gray-400 text-[11px]">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity and Subtotal Controls */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="px-2.5 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200"
                              title="Decrease"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-gray-900 bg-white">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="px-2.5 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200"
                              title="Increase"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-gray-900 sm:text-right">
                              {formatPrice(itemTotal)}
                            </span>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Remove Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Continue Shopping button */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#F47B20] hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Continue Browsing Products</span>
                  </Link>
                </div>

              </div>

              {/* Right Column: Order Summary (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Promo Code Box */}
                <div className="bg-white rounded-3xl p-5 border border-[#EEEEEE] shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#F47B20]" />
                    <span>Apply Promo Code</span>
                  </h3>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'VMART10' or 'VELA20'"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#FAFAFA] border border-gray-200 focus:border-[#F47B20] px-3 py-2 rounded-xl text-xs uppercase font-mono outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#171717] text-white text-xs font-bold rounded-xl hover:bg-black transition"
                    >
                      Apply
                    </button>
                  </form>
                  {couponMessage && (
                    <p className={`text-[11px] font-medium ${couponMessage.isError ? 'text-red-500' : 'text-emerald-600'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                {/* Order Summary Breakdown Box */}
                <div className="bg-white rounded-3xl p-6 border border-[#EEEEEE] shadow-sm space-y-4">
                  <h3 className="font-righteous text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                    Order Summary
                  </h3>

                  <div className="space-y-2.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Cart Subtotal ({totalItems} items)</span>
                      <span className="font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Coupon Discount ({discountPercent}%)</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span>Delivery Fee</span>
                      <span>
                        {deliveryCharge === 0 ? (
                          <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                        ) : (
                          <span className="font-bold text-gray-900">{formatPrice(deliveryCharge)}</span>
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>Estimated GST</span>
                      <span>Included in Price</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Total Amount</span>
                      <span className="text-[10px] text-gray-400">Inclusive of all taxes</span>
                    </div>
                    <span className="font-righteous text-2xl font-bold text-[#171717]">
                      {formatPrice(finalPayable)}
                    </span>
                  </div>

                  {/* Proceed to checkout CTA */}
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] text-white font-bold text-xs shadow-lg shadow-[#F47B20]/25 transition flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Trust guarantees */}
                  <div className="pt-3 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F47B20]" />
                      <span>100% Genuine Mobile Accessories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#F47B20]" />
                      <span>Delivery in 1-2 Days across Tamil Nadu</span>
                    </div>
                  </div>

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

