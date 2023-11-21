'use client';

import React from 'react';
import { Box } from '@mui/material';
import FirstSection from '@/components/organism/HomePage/FirstSection';
import Header from '@/components/organism/Header';

const HomePage = () => (
  <Box sx={{
    minHeight: '100vh',
    display: 'inline-block',
    minWidth: '100%',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/bg/background.jpg)',
  }}
  >
    <div>
      <div>
        <Header />
      </div>
      <Box sx={{
        pt: 1.5,
        pb: 10,
      }}
      >
        <Box sx={{
          px: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <FirstSection />
        </Box>
      </Box>
    </div>
  </Box>
);
export default HomePage;
