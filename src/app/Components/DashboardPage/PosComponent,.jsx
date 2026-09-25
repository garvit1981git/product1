"use client";
import React, { useState } from "react";

// --- 20 DEMO CATEGORIES ---
const categories = [
  "All Items",
  "T-Shirts",
  "Jeans",
  "Sneakers",
  "Jackets",
  "Accessories",
  "Dresses",
  "Belts",
  "Boots",
  "Hats",
  "Socks",
  "Sweaters",
  "Activewear",
  "Swimwear",
  "Underwear",
  "Outerwear",
  "Bags",
  "Sunglasses",
  "Watches",
  "Jewelry",
];

// --- EXTENDED MOCK INVENTORY ---
const products = [
  {
    id: 1,
    name: "Premium Cotton Tee",
    price: 25,
    stock: 45,
    category: "T-Shirts",
  },
  {
    id: 2,
    name: "Vintage Wash Denim",
    price: 65,
    stock: 12,
    category: "Jeans",
  },
  {
    id: 3,
    name: "City Runner Pro",
    price: 120,
    stock: 5,
    category: "Sneakers",
  },
  {
    id: 4,
    name: "Heavyweight Parka",
    price: 180,
    stock: 0,
    category: "Jackets",
  },
  { id: 5, name: "Canvas Tote Bag", price: 35, stock: 30, category: "Bags" },
  {
    id: 6,
    name: "Linen Summer Dress",
    price: 55,
    stock: 8,
    category: "Dresses",
  },
  {
    id: 7,
    name: "Classic Leather Belt",
    price: 40,
    stock: 20,
    category: "Belts",
  },
  { id: 8, name: "All-Weather Boots", price: 145, stock: 2, category: "Boots" },
  { id: 9, name: "Ribbed Beanie", price: 15, stock: 18, category: "Hats" },
  {
    id: 10,
    name: "Polarized Aviators",
    price: 85,
    stock: 6,
    category: "Sunglasses",
  },
  {
    id: 11,
    name: "Minimalist Watch",
    price: 110,
    stock: 4,
    category: "Watches",
  },
  {
    id: 12,
    name: "Silver Link Chain",
    price: 70,
    stock: 15,
    category: "Jewelry",
  },
  {
    id: 13,
    name: "Gym Performance Top",
    price: 30,
    stock: 25,
    category: "Activewear",
  },
  {
    id: 14,
    name: "Ankle Socks (3-Pack)",
    price: 12,
    stock: 50,
    category: "Socks",
  },
  {
    id: 15,
    name: "Cashmere Sweater",
    price: 95,
    stock: 7,
    category: "Sweaters",
  },
];

const PosComponent = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [customerName, setCustomerName] = useState("");

  // Mode Switcher (Sale vs Order)
  const [transactionMode, setTransactionMode] = useState("sale");
  const [orderDueDate, setOrderDueDate] = useState("");

  const [showMissedSale, setShowMissedSale] = useState(false);

  // --- CART LOGIC ---
  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + amount;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // --- CALCULATIONS ---
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // --- CHECKOUT ACTIONS ---
  const handleSubmit = () => {
    if (cart.length === 0) return alert("Cart is empty.");
    if (!customerName) return alert("Please enter a customer name first.");

    if (transactionMode === "sale") {
      alert(
        `✅ Success: ${formatMoney(total)} paid. (Saved directly to Sales)`,
      );
    } else {
      if (!orderDueDate)
        return alert("Please enter a Due Date for this order.");
      alert(
        `📦 Order Created! Sent to To-Do List for ${customerName}. Due: ${orderDueDate}`,
      );
    }

    setCart([]);
    setCustomerName("");
    setOrderDueDate("");
  };

  // --- ADVANCED FILTERING ---
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    const matchesCat =
      activeCategory === "All Items" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    // Natural page scroll layout (no locked heights, lets parent scroll freely)
    <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto text-gray-900 font-sans pb-12">
      {/* =================================================== */}
      {/* TOP SECTION: CHECKOUT / CART (THE REGISTER)          */}
      {/* =================================================== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-100 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Current Transaction
            </h2>
            <p className="text-sm text-gray-500">
              Select items from the inventory below to build a cart.
            </p>
          </div>

          {/* TOP TOGGLE: Sale vs Order */}
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 w-full md:w-auto">
            <button
              onClick={() => setTransactionMode("sale")}
              className={`flex-1 md:flex-none px-5 py-2 text-sm font-bold rounded-lg transition-colors ${
                transactionMode === "sale"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Instant Sale
            </button>
            <button
              onClick={() => setTransactionMode("order")}
              className={`flex-1 md:flex-none px-5 py-2 text-sm font-bold rounded-lg transition-colors ${
                transactionMode === "order"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Future Order
            </button>
          </div>
        </div>

        {/* Customer & Order Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Customer Name (Required)"
            className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-colors"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          {transactionMode === "order" && (
            <input
              type="text"
              placeholder="When is it due? (e.g. Tomorrow 4PM)"
              className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-colors"
              value={orderDueDate}
              onChange={(e) => setOrderDueDate(e.target.value)}
            />
          )}
        </div>

        {/* Cart Items List */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Cart Items
          </h3>
          {cart.length === 0 ? (
            <div className="py-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-center text-sm text-gray-400">
              Cart is empty. Tap items from the inventory below to add them.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatMoney(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 h-8">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-indigo-600"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-gray-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-indigo-600"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-16 text-right">
                      {formatMoney(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals & Submit Action */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-sm w-full md:w-auto justify-between md:justify-start">
            <div>
              <span className="text-gray-500 block text-xs">Subtotal</span>
              <span className="font-bold text-gray-900">
                {formatMoney(subtotal)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs">Tax (8%)</span>
              <span className="font-bold text-gray-900">
                {formatMoney(tax)}
              </span>
            </div>
            <div className="pl-4 border-l border-gray-200">
              <span className="text-gray-500 block text-xs">Total Amount</span>
              <span className="font-extrabold text-indigo-600 text-xl">
                {formatMoney(total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleSubmit}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              {transactionMode === "sale"
                ? "Complete & Pay Now"
                : "Save as Future Order"}
            </button>
            <button
              onClick={() => setShowMissedSale(true)}
              className="px-5 py-3.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-sm font-semibold rounded-xl transition-colors"
            >
              Log Walk-out
            </button>
          </div>
        </div>
      </div>

      {/* =================================================== */}
      {/* BOTTOM SECTION: INVENTORY, SEARCH & CATEGORIES      */}
      {/* =================================================== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Inventory Catalog
            </h2>
            <p className="text-sm text-gray-500">
              Click any product to add it to the cart above.
            </p>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by product name or category..."
            className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Ribbon */}
        <div className="flex overflow-x-auto py-2 gap-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid (Expands naturally downward, no inner scroll traps) */}
        <div className="pt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                  product.stock === 0
                    ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
                    : "bg-white border-gray-200 hover:border-indigo-600 hover:shadow-md active:scale-95"
                }`}
              >
                <span className="text-xs font-medium text-gray-400 mb-1">
                  {product.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3 flex-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-end w-full pt-2 border-t border-gray-50">
                  <span className="text-base font-bold text-gray-900">
                    {formatMoney(product.price)}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {product.stock} left
                  </span>
                </div>
              </button>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="w-full py-12 text-center text-gray-400 text-sm">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* =================================================== */}
      {/* MISSED SALE MODAL                                   */}
      {/* =================================================== */}
      {showMissedSale && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Log Walk-out
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Track customer demand for your AI inventory reports.
            </p>

            <input
              type="text"
              placeholder="What item did they want?"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:border-indigo-600"
            />

            <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm mb-6 focus:outline-none focus:border-indigo-600 cursor-pointer text-gray-700">
              <option value="">Reason for leaving?</option>
              <option value="stock">Out of stock</option>
              <option value="price">Too expensive</option>
              <option value="catalog">We don't carry it</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMissedSale(false)}
                className="flex-1 py-2.5 bg-gray-50 text-gray-700 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowMissedSale(false);
                  alert("Logged to AI reports.");
                }}
                className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosComponent;
