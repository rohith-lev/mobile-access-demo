"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { products as initialProducts, categories, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Search, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Layers,
  Eye,
  RefreshCw
} from "lucide-react";

interface DemoOrder {
  orderId: string;
  date: string;
  customerName: string;
  mobile: string;
  city: string;
  itemsCount: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
}

const initialDemoOrders: DemoOrder[] = [
  {
    orderId: "VMT89472911",
    date: "13 Nov 2026",
    customerName: "Karthik Subramanian",
    mobile: "9840123456",
    city: "Chennai",
    itemsCount: 2,
    total: 2298,
    status: "Delivered",
  },
  {
    orderId: "VMT89472912",
    date: "13 Nov 2026",
    customerName: "Priya Natarajan",
    mobile: "9443198765",
    city: "Coimbatore",
    itemsCount: 1,
    total: 1299,
    status: "Shipped",
  },
  {
    orderId: "VMT89472913",
    date: "12 Nov 2026",
    customerName: "Ramesh Kannan",
    mobile: "9789123890",
    city: "Madurai",
    itemsCount: 3,
    total: 4497,
    status: "Processing",
  },
  {
    orderId: "VMT89472914",
    date: "12 Nov 2026",
    customerName: "Deepa Senthil",
    mobile: "9894123000",
    city: "Salem",
    itemsCount: 1,
    total: 2499,
    status: "Pending",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");
  const [productList, setProductList] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<DemoOrder[]>(initialDemoOrders);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    category: "cases",
    brand: "Spigen",
    price: 999,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80",
    description: "Premium high-grade accessory curated by VMart.",
    inStock: true,
  });

  // Load products from localStorage or initial
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vmart-admin-products");
      if (saved) {
        setProductList(JSON.parse(saved));
      } else {
        setProductList(initialProducts);
      }

      const userOrders = localStorage.getItem("vmart-orders");
      if (userOrders) {
        const parsed = JSON.parse(userOrders);
        const mappedUserOrders: DemoOrder[] = parsed.map((o: any) => ({
          orderId: o.orderId,
          date: o.date,
          customerName: o.shipping?.fullName || "Guest Customer",
          mobile: o.shipping?.mobile || "9876543210",
          city: o.shipping?.city || "Chennai",
          itemsCount: o.items?.length || 1,
          total: o.total || 1999,
          status: "Pending" as const,
        }));
        setOrdersList([...mappedUserOrders, ...initialDemoOrders]);
      }
    } catch {
      setProductList(initialProducts);
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProductList(newProducts);
    try {
      localStorage.setItem("vmart-admin-products", JSON.stringify(newProducts));
    } catch {}
  };

  // KPIs
  const totalRevenue = useMemo(() => {
    return ordersList.reduce((sum, o) => sum + o.total, 0);
  }, [ordersList]);

  const lowStockCount = useMemo(() => {
    return productList.filter(p => !p.inStock).length;
  }, [productList]);

  // Handlers
  const handleToggleStock = (id: string) => {
    const updated = productList.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    saveProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this product from the demo catalogue?")) {
      const updated = productList.filter(p => p.id !== id);
      saveProducts(updated);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      category: "cases",
      brand: "Generic",
      price: 499,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80",
      description: "Authentic mobile accessory, driven by quality and trust.",
      inStock: true,
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      description: product.description,
      inStock: product.inStock,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.max(0, Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100));

    if (editingProduct) {
      const updated = productList.map(p => 
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              brand: formData.brand,
              price: Number(formData.price),
              originalPrice: Number(formData.originalPrice),
              discount,
              image: formData.image,
              description: formData.description,
              inStock: formData.inStock,
            }
          : p
      );
      saveProducts(updated);
    } else {
      const newProduct: Product = {
        id: "p" + (Date.now().toString().slice(-4)),
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discount,
        rating: 4.5,
        reviewCount: 1,
        image: formData.image,
        description: formData.description,
        inStock: formData.inStock,
        specifications: {
          "Warranty": "1 Year Replacement",
          "Origin": "India",
        },
      };
      saveProducts([newProduct, ...productList]);
    }

    setIsAddModalOpen(false);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: DemoOrder["status"]) => {
    setOrdersList(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productList;
    const q = searchQuery.toLowerCase();
    return productList.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    );
  }, [productList, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      
      {/* Admin Top Header */}
      <header className="bg-[#171717] text-white border-b-2 border-[#F47B20] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F47B20] text-white flex items-center justify-center font-righteous text-lg font-bold">
              VM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-righteous text-lg font-bold">VMART ADMIN</span>
                <span className="text-[10px] bg-white/10 text-[#F47B20] px-2 py-0.5 rounded font-mono font-bold">
                  Demo Dashboard
                </span>
              </div>
              <p className="text-[10px] text-gray-400">Vela Mobile Accessories Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-[#EEEEEE] sticky top-[61px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-[#F47B20] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-[#F47B20] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Management ({productList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-[#F47B20] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Demo Orders ({ordersList.length})</span>
          </button>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Products */}
              <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Products</span>
                  <h3 className="font-righteous text-3xl font-bold text-[#171717] mt-1">{productList.length}</h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">Across 10 Categories</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF1DF] text-[#F47B20] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Demo Orders</span>
                  <h3 className="font-righteous text-3xl font-bold text-[#171717] mt-1">{ordersList.length}</h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">Simulated checkouts</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              {/* Revenue */}
              <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Demo Gross Revenue</span>
                  <h3 className="font-righteous text-2xl font-bold text-[#171717] mt-1">{formatPrice(totalRevenue)}</h3>
                  <p className="text-[11px] text-gray-400 mt-1">Simulated volume</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              {/* Out of Stock Alert */}
              <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Stock Alerts</span>
                  <h3 className="font-righteous text-3xl font-bold text-amber-600 mt-1">{lowStockCount}</h3>
                  <p className="text-[11px] text-amber-600 font-semibold mt-1">Items out of stock</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Category Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Category Breakdown (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#EEEEEE] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-righteous text-base font-bold text-gray-900">
                    Catalogue Inventory Distribution
                  </h3>
                  <button 
                    onClick={() => setActiveTab("products")}
                    className="text-xs text-[#F47B20] font-bold hover:underline"
                  >
                    Manage All →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const count = productList.filter(p => p.category === cat.id).length;
                    return (
                      <div key={cat.id} className="p-3 bg-[#FAFAFA] rounded-xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-800 truncate">{cat.name}</p>
                        <p className="text-[11px] text-[#F47B20] font-extrabold mt-1">{count} items</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Orders Preview (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#EEEEEE] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-righteous text-base font-bold text-gray-900">
                    Latest Orders Preview
                  </h3>
                  <button 
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#F47B20] font-bold hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {ordersList.slice(0, 4).map((o) => (
                    <div key={o.orderId} className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-xl text-xs">
                      <div>
                        <span className="font-mono font-bold text-gray-900 block">{o.orderId}</span>
                        <span className="text-gray-500 text-[11px]">{o.customerName} • {o.city}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#F47B20] block">{formatPrice(o.total)}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          o.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                          o.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                          o.status === "Processing" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search catalogue by name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gray-200 pl-9 pr-4 py-2 rounded-xl text-xs outline-none focus:border-[#F47B20]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveProducts(initialProducts)}
                  className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                  title="Reset catalogue to default seed data"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                  <span>Reset Seed Data</span>
                </button>

                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#EEEEEE] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171717] text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Brand</th>
                      <th className="py-3 px-4">Selling Price</th>
                      <th className="py-3 px-4">Original</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition">
                        
                        {/* Name and Image */}
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-10 h-10 object-contain rounded-lg bg-gray-50 border p-1"
                          />
                          <div className="min-w-0 max-w-xs">
                            <p className="font-bold text-gray-900 truncate">{p.name}</p>
                            <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 text-gray-700 capitalize">
                          {p.category}
                        </td>

                        {/* Brand */}
                        <td className="py-3 px-4 font-semibold text-gray-800">
                          {p.brand}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-extrabold text-[#171717]">
                          {formatPrice(p.price)}
                        </td>

                        {/* Original Price */}
                        <td className="py-3 px-4 text-gray-400 line-through">
                          {formatPrice(p.originalPrice)}
                        </td>

                        {/* Stock Toggle */}
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleStock(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition flex items-center gap-1 ${
                              p.inStock
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-emerald-500" : "bg-red-500"}`}></span>
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 text-gray-500 hover:text-[#F47B20] transition rounded-lg hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: DEMO ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EEEEEE] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-righteous text-base font-bold text-gray-900">
                    Demonstration Orders Log
                  </h3>
                  <p className="text-xs text-gray-500">
                    Simulated customer checkouts captured via frontend checkout.
                  </p>
                </div>
                <span className="text-xs bg-[#FFF1DF] text-[#F47B20] font-bold px-3 py-1 rounded-full">
                  {ordersList.length} Demo Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171717] text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ordersList.map((order) => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono font-bold text-gray-900">
                          {order.orderId}
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {order.date}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-gray-900">{order.customerName}</p>
                          <span className="text-[10px] text-gray-400">{order.mobile}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {order.city}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-700">
                          {order.itemsCount}
                        </td>
                        <td className="py-3 px-4 font-extrabold text-[#171717]">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                            order.status === "Processing" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value as any)}
                            className="bg-[#FAFAFA] border border-gray-200 text-[11px] rounded-lg px-2 py-1 outline-none font-semibold text-gray-700"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal: Add or Edit Product */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-righteous text-xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add Demo Product"}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Spigen Rugged Armor Case"
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Spigen, boAt, Anker"
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#F47B20]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="stockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-[#F47B20] rounded"
                />
                <label htmlFor="stockCheck" className="font-semibold text-gray-800">
                  Item is currently In Stock
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F47B20] hover:bg-[#D96A10] text-white font-bold shadow"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

