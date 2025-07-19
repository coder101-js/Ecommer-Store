"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // keepin' it realistic 😎

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "light" ? "dark" : "light");

  return (
    <nav className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-neutral-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-black dark:text-white">
          BOLT
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/shop"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Shop
          </Link>

          {pathName === "/shop" && (
            <input
              type="text"
              placeholder="Search products"
              className="text-sm px-4 py-1.5 rounded-full border bg-gray-100 dark:bg-neutral-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-black dark:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          <Link
            href="/auth"
            className="px-4 py-1.5 rounded-full text-sm font-semibold bg-black text-white hover:bg-neutral-900 transition dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            Sign In
          </Link>

          {/* Theme Toggle */}
          {mounted ? (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "light" ? (
                <MoonIcon className="h-5 w-5 text-black" />
              ) : (
                <SunIcon className="h-5 w-5 text-white" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6 text-black dark:text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-white dark:bg-black">
          <Link
            href="/shop"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Shop
          </Link>
          <Link
            href="/auth"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
