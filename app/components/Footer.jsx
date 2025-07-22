"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();

    if (pathname !== "/" && pathname !== "/shop") return null;

    return (
        <footer
        >
            <div
                className={`
          w-full text-center px-4 py-4 border-t shadow-inner
          border-white/10
          bg-[radial-gradient(circle_at_top_left,_#00b1ff22,_transparent_70%),_radial-gradient(circle_at_bottom_right,_#00dfd822,_transparent_70%)]
          dark:bg-[radial-gradient(circle_at_top_left,_#00b1ff33,_transparent_70%),_radial-gradient(circle_at_bottom_right,_#00dfd033,_transparent_70%)]
          dark:bg-slate-900/80 bg-slate-100/60
        `}
            >
                <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-300">
                    ⚡{" "}
                    <span className="text-blue-700 dark:text-yellow-400 font-bold tracking-wide">
                        Exclusively designed & built by Wahb Amir
                    </span>{" "}
                    — © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
