"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [theme, setTheme] = (useState < "light") | ("dark" > "light");
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0); // replace with real cart logic

  // Fix hydration mismatch
  useEffect(() => {
    const [theme, setTheme] = useState("light");
    const initialTheme = stored || "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-black dark:text-white"
          >
            ⚡ BoltForm
          </Link>

          {/* Navigation Links & Search */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/shop"
              className="hover:underline text-gray-700 dark:text-gray-300"
            >
              Shop
            </Link>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-8 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span className="absolute right-2 top-1.5 text-gray-500 dark:text-gray-400 text-sm">
                🔍
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Sign In */}
            <Link
              href="/auth"
              className="hidden sm:block px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Sign In
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                ) : (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
