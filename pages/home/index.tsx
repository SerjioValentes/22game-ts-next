'use client';

import React from 'react';
import { Box, Stack } from '@mui/material';
import FirstSection from '@/components/organism/HomePage/FirstSection';
import Header from '@/components/organism/Header';

const HomePage = () => (
  <Box sx={{
    backgroundImage: 'url(/assets/bg/background.jpg)',
    backgroundSize: 'cover',
    minHeight: '100vh',
  }}
  >
    <Stack>
      <Box>
        <Header />
      </Box>
      <Box sx={{
        pt: 1.5,
        pb: 10,
      }}
      >
        <div>
          <FirstSection />
        </div>
      </Box>
    </Stack>
  </Box>
);
export default HomePage;
