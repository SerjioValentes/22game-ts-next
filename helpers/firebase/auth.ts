import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase } from 'firebase/auth';
import { auth } from '@/helpers/firebase/config';

type AuthProps = {
  email: string;
  password: string;
};

const errorValidation = (errorCode: string) => {
  const errorArray = [];

  if (errorCode === 'auth/email-already-in-use') {
    errorArray.push('Email already in use. If you have any account just checkIn');
  }

  if (errorCode === 'auth/user-not-found') {
    errorArray.push('User not found');
  }

  if (errorCode === 'auth/weak-password') {
    errorArray.push('Weak password');
  }

  if (errorCode === 'auth/wrong-password') {
    errorArray.push('Wrong password');
  }

  if (errorCode === 'auth/missing-password') {
    errorArray.push('Missing password');
  }

  if (errorCode === 'auth/invalid-email') {
    errorArray.push('Invalid email');
  }
  return errorArray;
};

export const createUserWithEmailAndPassword = (setErrors: any, { email, password }: AuthProps) => {
  createUserWithEmailAndPasswordFirebase(auth, email, password)
    .then((userCredential: any) => {
      // console.log(userCredential.user.accessToken);
      window.localStorage.setItem('accessToken', JSON.stringify(userCredential.user.accessToken));
      return userCredential;
    })
    .catch((error) => {
      // console.log(error.code, '<< ========== Check it');
      const errors = errorValidation(error.code);
      setErrors(errors);
    });
};

export const signInWithEmailAndPassword = (setErrors: any, { email, password }: AuthProps) => {
  signInWithEmailAndPasswordFirebase(auth, email, password)
    .then((userCredential: any) => {
      // console.log(userCredential.user.accessToken);
      window.localStorage.setItem('accessToken', JSON.stringify(userCredential.user.accessToken));
    })
    .catch((error) => {
      // console.log(error.code, '<< ========== Check it');
      const errors = errorValidation(error.code);
      setErrors(errors);
    });
};
