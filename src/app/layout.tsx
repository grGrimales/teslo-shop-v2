import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";

import { Providers } from "./components";



export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Clothing store for men, children and women",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://teslo-shop.vercel.app/",
    images: "https://res.cloudinary.com/dcxto1nnl/image/upload/v1716248276/teslo-shop/Sin_t%C3%ADtulo_byptio.png",
  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  );
}
