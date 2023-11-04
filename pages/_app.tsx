'use client';

import React from 'react';
// import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import theme from '@/helpers/ThemeProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { wrapper } from '@/store';
// import { storeMain } from '@/store';
// import { createStore } from '@reduxjs/toolkit';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  // <Provider store={storeMain}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  // </Provider>
  );
}
export default wrapper.withRedux(MyApp);
