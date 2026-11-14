import React from "react";
import Link from "next/link";
import { 
  Instagram, 
  ShieldCheck, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Award, 
  Headphones, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white pt-12 pb-8 border-t-4 border-[#F47B20]">
      {/* 1. Value Proposition Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F47B20]/10 border border-[#F47B20]/30 flex items-center justify-center text-[#F47B20] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Quality & Trust</h4>
              <p className="text-xs text-gray-400">100% verified premium products</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F47B20]/10 border border-[#F47B20]/30 flex items-center justify-center text-[#F47B20] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Tamil Nadu Express</h4>
              <p className="text-xs text-gray-400">Fast delivery across all districts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F47B20]/10 border border-[#F47B20]/30 flex items-center justify-center text-[#F47B20] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Best Price Promise</h4>
              <p className="text-xs text-gray-400">Competitive retail & online pricing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F47B20]/10 border border-[#F47B20]/30 flex items-center justify-center text-[#F47B20] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
              <p className="text-xs text-gray-400">Quick assistance on orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#F47B20] flex items-center justify-center text-white font-righteous text-2xl font-bold shadow-lg">
                VM
              </div>
              <div>
                <h3 className="font-righteous text-2xl font-bold tracking-tight text-white">
                  VMART
                </h3>
                <p className="text-xs font-semibold text-[#F47B20] tracking-wider uppercase">
                  Vela Mobile Accessories
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Your one-stop destination for premium mobile cases, accessories, everyday gadgets and lifestyle products. Driven by Quality and Trust.
            </p>

            <div className="inline-block py-1 px-2.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#F47B20]">
              ACCESSORIES | GADGETS | LIFESTYLE
            </div>

            {/* Official Instagram Box */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/vmart_velamobileaccessories/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#F47B20] to-[#E1306C] hover:opacity-95 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition shadow-md group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Follow @vmart_velamobileaccessories</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#F47B20] pl-2">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    href={`/products?category=${cat.id}`} 
                    className="hover:text-[#F47B20] transition flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#F47B20]" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Experience Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#F47B20] pl-2">
              Customer Hub
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/products" className="hover:text-[#F47B20] transition">
                  All Products Catalogue
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="hover:text-[#F47B20] transition">
                  Showcase & Collections
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#F47B20] transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#F47B20] transition">
                  Checkout Demo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F47B20] transition text-[#F47B20] font-semibold">
                  Admin Dashboard Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Retail Information & Tamil Nadu Roots */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#F47B20] pl-2">
              Store Information
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F47B20] shrink-0 mt-0.5" />
                <span>Serving Tamil Nadu, India (Chennai Mobiles, Poorvika style retail network)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F47B20] shrink-0" />
                <span>Mon – Sat: 9:30 AM – 9:30 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F47B20] shrink-0" />
                <span>Authorized Multi-Brand Accessories</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Demo Disclaimer & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10">
        <div className="bg-[#1f1f1f] rounded-xl p-4 mb-6 border border-white/5">
          <p className="text-[11px] text-gray-400 leading-relaxed text-center">
            <strong className="text-white">Demonstration Notice:</strong> This website is an independent digital storefront prototype for 
            <span className="text-[#F47B20] font-semibold"> VMart – Vela Mobile Accessories</span>. All product names, trademarks, images and prices are shown for demonstration and client presentation purposes. No actual commercial transactions or automated billing are processed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} VMart – Vela Mobile Accessories. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with Next.js, React & Tailwind CSS</span>
            <span>•</span>
            <span className="text-[#F47B20]">Driven by Quality and Trust</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

