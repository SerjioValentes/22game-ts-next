'use client';

import React from 'react';
import ImgMediaCard from '@/components/molecule/Card';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import FirstSectionWrapper from './style';
import '@splidejs/react-splide/css';

const CardsSection = () => {
  const IMG_TEMP_01 = 'assets/imgs/DSCF6614_result.jpg';
  const IMG_TEMP_02 = 'assets/imgs/33_result.jpg';
  const IMG_TEMP_03 = 'assets/imgs/nature_result.jpg';

  // TODO - will make a hook
  // const onlyLargeScreen = useMediaQuery(theme.breakpoints.down('xl'));
  // const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const options = {
    rewind: true,
    width: 1200,
    gap: '1rem',
    type: 'slide',
    perPage: 3,
    arrows: false,
    breakpoints: {
      1000: {
        rewind: true,
        width: 500,
        gap: '1rem',
        type: 'slide',
        perPage: 2,
        arrows: false,
      },
    },
  };

  return (
    <FirstSectionWrapper>
      <Splide options={options}>
        <SplideSlide>
          <ImgMediaCard image={IMG_TEMP_01} title="Street" />
        </SplideSlide>
        <SplideSlide>
          <ImgMediaCard image={IMG_TEMP_02} title="Portraits" />
        </SplideSlide>
        <SplideSlide>
          <ImgMediaCard image={IMG_TEMP_03} title="Nature" />
        </SplideSlide>
      </Splide>
    </FirstSectionWrapper>
  );
};

export default CardsSection;
