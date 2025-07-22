import "./globals.css";
import "./tailwind-out.css";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import NavbarWrapper from "./components/NavbarWrapper";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "./providers/SessionWrapper";
import Footer from "./components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "BoltForm",
  description: "Next-gen footwear built for speed ⚡",
  icons: {
    icon: ["/favicon.ico"],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionWrapper>
            {" "}
            <CartProvider>
              <header className="max-h-screen overflow-hidden">
                <nav>
                  <NavbarWrapper />{" "}
                </nav>
              </header>
              <main>
                <Toaster position="top-right" />
                {children}
              </main>
              <footer>
                <Footer />
              </footer>
            </CartProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
