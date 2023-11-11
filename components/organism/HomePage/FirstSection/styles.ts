import styled from '@emotion/styled';

export const styleWithoutArrows = {
  my: 1,
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
};

export const inputLastSymbolSx = {
  mx: 0,
  backgroundColor: 'white',
  padding: '29.7px 14px',
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
};

export const InputTitleWrapper = styled('div')({
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
});
