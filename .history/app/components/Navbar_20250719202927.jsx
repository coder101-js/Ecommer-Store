"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "./../context/CartContext";
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathName = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [navLinks, setNavLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 80], ["80px", "60px"]);
  const fontSize = useTransform(scrollY, [0, 80], ["1.75rem", "1.5rem"]);

  useEffect(() => {
    setMounted(true);
    setNavLinks(["Shop", "New Arrivals", "Men", "Women", "Sale"]);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <motion.nav
        style={{ height }}
        className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-neutral-800 backdrop-blur transition-colors mb-4"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Logo */}
          <motion.div
            style={{ fontSize }}
            className="font-extrabold tracking-tight text-black dark:text-white select-none"
          >
            <Link href="/">BOLT</Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link}
                whileHover={{ scale: 1.1 }}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                <Link
                  href={
                    link === "Men"
                      ? "/shop?category=mens-shoes"
                      : link === "Women"
                      ? "/shop?category=womens-shoes"
                      : `/${link.toLowerCase().replace(/ /g, "-")}`
                  }
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:space-x-4 justify-end">
            <motion.div whileTap={{ scale: 0.9 }} className="relative">
              <Link href="/cart">
                <ShoppingCartIcon className="h-6 w-6 text-black dark:text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/auth"
                className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                aria-label="Toggle Theme"
                whileTap={{ rotate: 20 }}
              >
                {resolvedTheme === "light" ? (
                  <MoonIcon className="h-5 w-5 text-black" />
                ) : (
                  <SunIcon className="h-5 w-5 text-white" />
                )}
              </motion.button>
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
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-6"
          >
            {navLinks.map((link) => (
              <motion.div key={link} whileHover={{ scale: 1.1 }}>
                <Link
                  href={
                    link === "Men"
                      ? "/shop?category=mens-shoes"
                      : link === "Women"
                      ? "/shop?category=womens-shoes"
                      : `/${link.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                href="/auth"
                className="px-6 py-2 bg-black text-white rounded-full font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
