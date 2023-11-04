'use client';

import { createTheme, Theme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin'],
});

const theme: Theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#000',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    fontSize: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 760,
      lg: 1024,
      xl: 1250,
    },
  },
  palette: {
    primary: {
      main: '#42a5f5',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#000',
    },
  },
});

export default theme;
