import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import { WishlistProvider } from "@/context/WishlistContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { AuthProvider } from "@/context/AuthContext";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Chatbot from "@/components/chatbot/Chatbot";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Store",
  description: "In my my website we have electronics products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col  bg-white dark:bg-slate-900">

        <ThemeProvider>

          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CheckoutProvider>

                  {children}

                  <Chatbot />
                  
                  <Toaster
                    position="top-right"
                    richColors
                  />

                </CheckoutProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>

        </ThemeProvider>

      </body>
    </html>
  );
}
