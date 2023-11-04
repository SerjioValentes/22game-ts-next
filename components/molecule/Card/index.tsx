'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

type Props = {
  image: string;
  title: string;
};

const ImgMediaCard = ({ image, title = '' }: Props) => (
  <Card>
    <Typography
      variant="h3"
      fontWeight={900}
      color="primary.dark"
      sx={{
        position: 'absolute',
        top: '480px',
      }}
    >
      {title}
    </Typography>
    <CardMedia
      component="img"
      alt="equador"
      image={image}
      sx={{
        maxHeight: '540px',
      }}
    />

    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);

export default ImgMediaCard;
