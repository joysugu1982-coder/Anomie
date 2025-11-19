import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import localFont from "next/font/local";
import { getCart } from 'lib/shopify';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';

const { SITE_NAME } = process.env;

const Gafiton = localFont({
  src: "/fonts/Gafiton-Rounded.ttf",
  variable: "--font-gafiton",
  weight: "400",
});


export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const cartPromise = getCart();

  return (
    <html lang="en" className={Gafiton.variable}>
      <body className="font-gafiton bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
        <CartProvider cartPromise={cartPromise}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
