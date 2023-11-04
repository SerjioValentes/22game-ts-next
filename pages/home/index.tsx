'use client';

import React from 'react';
import { Box } from '@mui/material';
import FirstSection from '@/components/organism/HomePage/FirstSection';

const HomePage = () => (
  <Box sx={{
    backgroundImage: 'url(/assets/bg/background.jpg)',
    width: '100%',
  }}
  >
    <Box sx={{ p: 4 }}>
      <FirstSection />
    </Box>
  </Box>
);
export default HomePage;
