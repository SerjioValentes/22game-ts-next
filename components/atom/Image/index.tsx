import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

type Props = {
  width: string;
  height: string;
  imgSrc: string;
  alt: string;
};

const ImageNext = ({
  width, height, imgSrc, alt,
}: Props) => (
  <Box sx={{
    width,
    height,
  }}
  >
    <Image
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      alt={alt}
      src={imgSrc}
    />
  </Box>
);
export default ImageNext;
