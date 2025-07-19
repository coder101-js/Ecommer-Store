"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(1); // Mocked for demo

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className="w-full transition-colors duration-500 
      bg-gradient-to-r from-[#f8f9fa] via-[#e0e0e0] to-[#cfd8dc] 
      dark:from-[#1e1e2f] dark:via-[#1a1a2e] dark:to-[#121212] 
      text-black dark:text-white shadow-md backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent"
          >
            ⚡ BoltForm
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/shop"
              className="hover:underline text-black dark:text-gray-300 transition-colors"
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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center ">
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
            mounted? (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "light" ? "dark" : "light")
              }
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "light" ? (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              ) : (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              )}
            </button>
            :<></>)
          </div>
        </div>
      </div>
    </nav>
  );
}
