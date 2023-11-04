import React, { FC } from 'react';

import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type Props = {
  label: string;
};

const MuiInputTextField: FC<TextFieldProps & Props> = ({
  label,
  onChange,
  ...others
}) => (
  <TextField
    InputLabelProps={{
      style: {
        fontSize: 12,
      },
    }} // font size of input label
    fullWidth
    label={label}
    variant="filled"
    size="medium"
    onChange={onChange}
    {...others}
  />
);

export default MuiInputTextField;
