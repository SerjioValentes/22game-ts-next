'use client';

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/helpers/firebase/auth';
import CustomizedSwitches from '@/components/atom/Switch';
import FormWrapper from './style';

interface IUserData {
  email: string;
  password: string;
}

function AuthForm() {
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [isNewUser, setIsNewUser] = useState(true);

  const userDataOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setUserData((prev: IUserData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(setErrors, userData);
  };

  const logIn = () => {
    signInWithEmailAndPassword(setErrors, userData);
  };

  return (
    <FormWrapper>
      <TextField name="email" placeholder="email" onChange={userDataOnChange} />
      <TextField name="password" placeholder="password" onChange={userDataOnChange} />
      {errors.map((error: string) => <div key={error}>{error}</div>)}
      <CustomizedSwitches firstLabel="Log In" secondLabel="Create account" setIsNewUser={setIsNewUser} />
      {isNewUser
        ? <Button variant="contained" onClick={logIn}>LogIn</Button>
        : <Button variant="contained" onClick={createAccount}>Create account</Button>}
    </FormWrapper>
  );
}
export default AuthForm;
