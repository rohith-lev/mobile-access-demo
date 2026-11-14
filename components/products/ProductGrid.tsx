import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: "normal" | "compact";
}

export default function ProductGrid({ 
  products, 
  emptyMessage = "No products found matching your criteria.",
  columns = "normal" 
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-[#EEEEEE] my-6">
        <div className="w-16 h-16 bg-[#FFF1DF] rounded-full flex items-center justify-center mx-auto mb-4 text-[#F47B20]">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#171717] mb-1">No Products Found</h3>
        <p className="text-sm text-[#777777] max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  const gridCols = columns === "compact"
    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-3 sm:gap-4 md:gap-5`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

