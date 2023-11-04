'use client';

import React from 'react';
import type { AppProps } from 'next/app';
import theme from '@/helpers/ThemeProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { wrapper } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default wrapper.withRedux(MyApp);
