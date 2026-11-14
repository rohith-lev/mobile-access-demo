import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "VMart – Vela Mobile Accessories | Premium Mobile Cases & Gadgets",
  description: "Your one-stop destination for premium mobile cases, accessories, gadgets and lifestyle products. Driven by Quality and Trust.",
  keywords: "mobile cases, mobile accessories, gadgets, earbuds, chargers, power banks, smartwatches, Tamil Nadu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#FAFAFA] text-[#171717] antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
