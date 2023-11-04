'use client';

import theme from '@/helpers/ThemeProvider';
import styled from '@emotion/styled';

const FormWrapper = styled('div')({
  padding: '20px',
  background: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  border: '1px solid black',
  borderRadius: 4,
});

export default FormWrapper;
