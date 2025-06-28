import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import { eras } from '@/lib/fonts';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CRAFTZ - Tienda de ropa y productos personalizados",
    template: "%s | CRAFTZ",
  },
  description: "Tienda de ropa, productos y accesorios personalizados, incluyendo tazas, termos, textiles y más.",
  keywords: 'ropa personalizada, playeras personalizadas, calacas chidas, fashion',
  authors: [{ name: 'Francisco Garcia Solis - Upstagebunion', url: 'https://github.com/upstagebunion' }],
  openGraph: {
    title: 'Craftz | Crea tu estilo',
    description: 'Tienda de ropa, productos y accesorios personalizados, incluyendo tazas, termos, textiles y más.',
    url: 'https://new.craftzstore.com',
    siteName: 'Craftz',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  //manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eras.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className='flex-grow'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
