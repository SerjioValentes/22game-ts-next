import React, { useEffect, useState } from 'react';
import {
  Box, ImageList, ImageListItem,
} from '@mui/material';
import Image from 'next/image';
import fetchArrayOfImages from '@/helpers/utils/getImagesArray';

const ImagesGallery = ({ galleryName }: { galleryName: string }) => {
  const [imagesArray, setImagesArray] = useState<string[] | []>([]);

  useEffect(() => {
    fetchArrayOfImages(galleryName, setImagesArray);
  }, []);

  return (
    <div>
      <Box sx={{ height: 450 }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {imagesArray.map((item) => (
            <ImageListItem key={item}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                alt=""
                src={`${process.env.NEXT_PUBLIC_SANITY_HOST_NAME}/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${item}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

    </div>
  );
};

export default ImagesGallery;
