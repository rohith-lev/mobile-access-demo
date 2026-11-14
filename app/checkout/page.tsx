"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingBag,
  Info,
  Calendar,
  Sparkles,
  MapPin,
  Phone,
  User,
  Mail,
  Home
} from "lucide-react";

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    date: string;
    items: typeof items;
    total: number;
    shipping: FormData;
    payment: string;
  } | null>(null);

  const deliveryCharge = totalPrice >= 499 ? 0 : (items.length > 0 ? 49 : 0);
  const finalPayable = totalPrice + deliveryCharge;

  const validate = (): boolean => {
    const err: FormErrors = {};

    if (!formData.fullName.trim()) {
      err.fullName = "Full name is required";
    }

    if (!formData.mobile.trim()) {
      err.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      err.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.email.trim()) {
      err.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      err.address = "Delivery address is required";
    }

    if (!formData.city.trim()) {
      err.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      err.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      err.pincode = "Enter a valid 6-digit PIN code";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network processing
    setTimeout(() => {
      const orderId = generateOrderId();
      const orderDetails = {
        orderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        items: [...items],
        total: finalPayable,
        shipping: { ...formData },
        payment: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI (Demo)" : "Online Card (Demo)",
      };

      // Save order to demo localStorage orders
      try {
        const existing = JSON.parse(localStorage.getItem("vmart-orders") || "[]");
        localStorage.setItem("vmart-orders", JSON.stringify([orderDetails, ...existing]));
      } catch {}

      setConfirmedOrder(orderDetails);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  // If order is placed, show simulated Order Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header />

        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#EEEEEE] shadow-lg text-center space-y-6">
            
            {/* Success Icon */}
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Simulated Order Confirmed
              </span>
              <h1 className="font-righteous text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Thank You for Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Your demonstration order has been created. A simulated tracking confirmation has been logged.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="bg-[#FFF1DF] rounded-2xl p-4 border border-[#F47B20]/20 flex flex-col sm:flex-row items-center justify-between text-left gap-3">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Demo Order ID</span>
                <p className="font-mono text-base font-extrabold text-[#F47B20]">{confirmedOrder.orderId}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Order Date</span>
                <p className="text-xs font-bold text-gray-900">{confirmedOrder.date}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Estimated Delivery</span>
                <p className="text-xs font-bold text-emerald-700">Within 2 Days (Tamil Nadu)</p>
              </div>
            </div>

            {/* Demonstration Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 text-left flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Client Presentation Prototype Notice:</strong>
                <span>This was a simulated checkout flow. No payment was charged, no real bank API was contacted, and no physical package will be shipped. Cart state has been reset.</span>
              </div>
            </div>

            {/* Order Details Breakdown */}
            <div className="border border-gray-100 rounded-2xl p-4 text-left divide-y divide-gray-100 text-xs">
              <div className="pb-3 flex justify-between font-bold text-gray-900">
                <span>Shipping To:</span>
                <span className="text-gray-700 font-normal">
                  {confirmedOrder.shipping.fullName}, {confirmedOrder.shipping.address}, {confirmedOrder.shipping.city}, {confirmedOrder.shipping.state} – {confirmedOrder.shipping.pincode}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold text-gray-900">{confirmedOrder.payment}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Items Ordered:</span>
                <span className="font-bold text-gray-900">{confirmedOrder.items.length} items</span>
              </div>
              <div className="pt-3 flex justify-between text-sm font-extrabold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-[#F47B20] font-righteous text-lg">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-[#F47B20] text-white font-bold text-xs hover:bg-[#D96A10] transition text-center shadow"
              >
                Continue Shopping
              </Link>
              <Link
                href="/admin"
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition text-center"
              >
                View in Admin Dashboard
              </Link>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // If cart is empty and user visits /checkout
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-[#FFF1DF] rounded-full flex items-center justify-center mx-auto mb-4 text-[#F47B20]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6 text-sm">Please add accessories to your cart before proceeding to checkout.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F47B20] text-white rounded-xl text-xs font-bold hover:bg-[#D96A10] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pb-16">
        
        {/* Checkout Header */}
        <div className="bg-[#171717] text-white py-8 border-b border-[#EEEEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-righteous text-2xl sm:text-3xl font-bold">
              Secure Demo Checkout
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Provide delivery details for prompt dispatch across Tamil Nadu districts.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Fields (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Customer & Delivery Address Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEEEEE] shadow-sm space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                    <MapPin className="w-5 h-5 text-[#F47B20]" />
                    <h2 className="font-righteous text-lg font-bold text-gray-900">
                      1. Delivery Address & Contact
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#F47B20]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anand Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full bg-[#FAFAFA] border rounded-xl px-3.5 py-2.5 text-xs outline-none transition ${
                          errors.fullName ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#F47B20]"
                        }`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#F47B20]" />
                        <span>Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        maxLength={10}
                        className={`w-full bg-[#FAFAFA] border rounded-xl px-3.5 py-2.5 text-xs outline-none transition ${
                          errors.mobile ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#F47B20]"
                        }`}
                      />
                      {errors.mobile && <p className="text-[10px] text-red-500">{errors.mobile}</p>}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#F47B20]" />
                        <span>Email Address (for simulated order receipt) *</span>
                      </label>
                      <input
                        type="email"
                        placeholder="anand@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#FAFAFA] border rounded-xl px-3.5 py-2.5 text-xs outline-none transition ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#F47B20]"
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                    </div>

                    {/* Delivery Address */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-[#F47B20]" />
                        <span>Door / Flat / Street Address *</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Door No, Street Name, Landmark"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full bg-[#FAFAFA] border rounded-xl px-3.5 py-2.5 text-xs outline-none transition ${
                          errors.address ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#F47B20]"
                        }`}
                      />
                      {errors.address && <p className="text-[10px] text-red-500">{errors.address}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">City / District *</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#F47B20]"
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Salem">Salem</option>
                        <option value="Tirunelveli">Tirunelveli</option>
                        <option value="Erode">Erode</option>
                        <option value="Vellore">Vellore</option>
                        <option value="Thanjavur">Thanjavur</option>
                        <option value="Other Tamil Nadu District">Other TN District</option>
                      </select>
                    </div>

                    {/* State */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">State *</label>
                      <input
                        type="text"
                        value={formData.state}
                        readOnly
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-700 font-semibold"
                      />
                    </div>

                    {/* PIN Code */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">6-Digit PIN Code *</label>
                      <input
                        type="text"
                        placeholder="e.g. 600001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        maxLength={6}
                        className={`w-full bg-[#FAFAFA] border rounded-xl px-3.5 py-2.5 text-xs outline-none transition ${
                          errors.pincode ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#F47B20]"
                        }`}
                      />
                      {errors.pincode && <p className="text-[10px] text-red-500">{errors.pincode}</p>}
                    </div>

                    {/* Delivery Instructions */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Delivery Notes (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Leave with security"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#F47B20]"
                      >
                      </input>
                    </div>

                  </div>
                </div>

                {/* 2. Payment Method Selector Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEEEEE] shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                    <Banknote className="w-5 h-5 text-[#F47B20]" />
                    <h2 className="font-righteous text-lg font-bold text-gray-900">
                      2. Payment Method (Demonstration)
                    </h2>
                  </div>

                  <div className="space-y-3">
                    
                    {/* Cash on Delivery */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === "cod" ? "border-[#F47B20] bg-[#FFF1DF]/40" : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="text-[#F47B20] focus:ring-[#F47B20]"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</p>
                          <p className="text-[11px] text-gray-500">Pay cash upon delivery at your doorstep.</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Available
                      </span>
                    </label>

                    {/* UPI Demo */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === "upi" ? "border-[#F47B20] bg-[#FFF1DF]/40" : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="text-[#F47B20] focus:ring-[#F47B20]"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">UPI / QR Code (Demo Simulation)</p>
                          <p className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm simulation.</p>
                        </div>
                      </div>
                      <QrCode className="w-5 h-5 text-gray-500" />
                    </label>

                    {/* Cards Demo */}
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === "card" ? "border-[#F47B20] bg-[#FFF1DF]/40" : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="text-[#F47B20] focus:ring-[#F47B20]"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">Credit / Debit Card (Demo Simulation)</p>
                          <p className="text-[11px] text-gray-500">Visa, Mastercard, RuPay simulation.</p>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-gray-500" />
                    </label>

                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F47B20] shrink-0" />
                    <span>No actual banking gateway is contacted. Orders are simulated with local state.</span>
                  </div>

                </div>

              </div>

              {/* Right Column: Order Summary Sidebar (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="bg-white rounded-3xl p-6 border border-[#EEEEEE] shadow-sm space-y-4 sticky top-24">
                  <h3 className="font-righteous text-lg font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>Order Review</span>
                    <span className="text-xs font-sans font-bold text-[#F47B20]">
                      {items.length} {items.length === 1 ? "Product" : "Products"}
                    </span>
                  </h3>

                  {/* Items mini list */}
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 pr-1">
                    {items.map(({ product, quantity, selectedVariants }) => (
                      <div key={product.id} className="py-2.5 flex items-center gap-3 text-xs">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1 border" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                          <span className="text-gray-400 text-[10px]">Qty: {quantity}</span>
                        </div>
                        <span className="font-bold text-gray-900">{formatPrice(product.price * quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delivery (Tamil Nadu)</span>
                      <span>
                        {deliveryCharge === 0 ? (
                          <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                        ) : (
                          <span className="font-bold text-gray-900">{formatPrice(deliveryCharge)}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>Taxes & GST</span>
                      <span>Included</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-gray-900">Total Payable</span>
                    <span className="font-righteous text-2xl font-bold text-[#171717]">
                      {formatPrice(finalPayable)}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] disabled:bg-gray-400 text-white font-bold text-xs shadow-lg shadow-[#F47B20]/25 transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Placing Demo Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Place Simulated Order ({formatPrice(finalPayable)})</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[10px] text-gray-400">
                    Driven by Quality and Trust • VMart – Vela Mobile Accessories
                  </div>

                </div>

              </div>

            </div>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}

