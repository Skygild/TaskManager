import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import logo from "@/assets/logo.jpeg";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LTask",
  description: "LTask",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-slate-600 text-white p-4 w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Image src={logo} alt="Logo" className="mr-2 rounded-xl" width={50} height={50} />
          </div>
        </header>
        {children}
        {/* Footer */}
        <footer className="py-4 text-black text-center bg-white">
          <p className="text-black">© 2024 LTask. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
