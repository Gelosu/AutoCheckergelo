"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Provider from './provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AUTO CHECKER',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('loading');
    };

    window.addEventListener('routeChangeStart', handleRouteChange); 

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChange);
    };
  }, []);
  useEffect(() =>{
    import("bootstrap/dist/js/bootstrap"); 
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
        </body>
    </html>
  )
}
