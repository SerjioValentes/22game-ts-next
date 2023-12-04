import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase } from 'firebase/auth';
import { auth } from '@/helpers/firebase/config';

type AuthProps = {
  email: string;
  password: string;
};

const errorValidation = (errorCode: string) => {
  const errorArray = [];

  if (errorCode === 'auth/email-already-in-use') {
    // errorArray.push('Email already in use. If you have any account just checkIn');
    errorArray.push('Почта уже занята. Проверьте, возможно у вас уже есть аккаунт');
  }

  if (errorCode === 'auth/user-not-found') {
    // errorArray.push('User not found');
    errorArray.push('Пользователь не найден');
  }

  if (errorCode === 'auth/weak-password') {
    // errorArray.push('Weak password');
    errorArray.push('Слабый пароль');
  }

  if (errorCode === 'auth/wrong-password') {
    // errorArray.push('Wrong password');
    errorArray.push('Неверный email или пароль');
  }

  if (errorCode === 'auth/missing-password') {
    // errorArray.push('Missing password');
    errorArray.push('Отсутствует пароль');
  }

  if (errorCode === 'auth/invalid-email') {
    // errorArray.push('Invalid email');
    errorArray.push('Неверный email или пароль');
  }
  return errorArray;
};

export const createUserWithEmailAndPassword = (setErrors: any, { email, password }: AuthProps) => {
  createUserWithEmailAndPasswordFirebase(auth, email, password)
    .then((userCredential: any) => {
      window.localStorage.setItem('accessToken', JSON.stringify(userCredential.user.accessToken));
      return userCredential;
    })
    .catch((error) => {
      // console.log(error.code, '<< ========== Check it');
      const errors = errorValidation(error.code);
      setErrors(errors);
    });
};

export const signInWithEmailAndPassword = (setErrors: any, { email, password }: AuthProps, setIsUserLogged: any, getSomeInfo: any) => {
  setIsUserLogged('download');
  signInWithEmailAndPasswordFirebase(auth, email, password)
    .then((userCredential: any) => {
      window.localStorage.setItem('accessToken', JSON.stringify(userCredential.user.accessToken));
      window.localStorage.setItem('userEmail', JSON.stringify(userCredential.user.email));
      getSomeInfo();
    })
    .catch((error) => {
      // console.log(error.code, '<< ========== Check it');
      const errors = errorValidation(error.code);
      setIsUserLogged('notlogged');
      setErrors(errors);
    });
};
