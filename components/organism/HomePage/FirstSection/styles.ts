import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const styleWithoutArrows = {
  my: 1,
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  input: {
    height: '17px',
    backgroundColor: 'white',
    borderRadius: 2,
  },
};

export const inputLastSymbolSx = {
  mx: 0,
  padding: '29.7px 14px',
  backgroundColor: 'white',
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
};

export const InputTitleWrapper = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: 'white',
});
