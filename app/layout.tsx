'use client';

import React from 'react';
import Head from 'next/head';
import './globals.css';
import Script from 'next/script';
import ThemeRegistry from '@/app/ThemeRegistry';
import { storeMain } from '@/store';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const THEME_COLOR = 'fff';

  return (
    <html lang="en">
      <Head>
        <title />
        <meta charSet="utf-8" />
        <meta
          httpEquiv="X-UA-Compatible"
          content="IE=edge"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <meta
          name="description"
          content="content"
        />

        <link
          rel="mask-icon"
          href="/"
          color="fff"
        />
        <meta
          name="msapplication-TileColor"
          content={THEME_COLOR}
        />
        <meta
          name="theme-color"
          content={THEME_COLOR}
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/"
        />
      </Head>
      <Script
        id="1"
        strategy="afterInteractive"
      />
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Provider store={storeMain}>
            {children}
          </Provider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
