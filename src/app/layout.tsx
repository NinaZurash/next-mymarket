import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { UserProductsProvider } from "@/providers/UserProductsProvider";
import { WishlistProvider } from "@/providers/WishlistProvider";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <AuthProvider>
          <ReactQueryProvider>
            <CartProvider>
              <UserProductsProvider>
                <WishlistProvider>{children}</WishlistProvider>
              </UserProductsProvider>
            </CartProvider>
          </ReactQueryProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
