'use client';

import React from 'react';
import { Box, Stack } from '@mui/material';
import FirstSection from '@/components/organism/HomePage/FirstSection';
import Header from '@/components/organism/Header';

const HomePage = () => (
  <Box sx={{
    backgroundImage: 'url(/assets/bg/background.jpg)',
    width: '100%',
    height: '100vh',
  }}
  >
    <Stack>
      <Box>
        <Header />
      </Box>
      <Box sx={{
        p: 4,
      }}
      >
        <FirstSection />
      </Box>
    </Stack>
  </Box>
);
export default HomePage;
