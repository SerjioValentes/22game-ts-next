'use client';

import React, { useEffect, useState } from 'react';
import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';
import FirstSection from '@/components/organism/HomePage/FirstSection';
import Header from '@/components/organism/Header';
import { firebaseDb } from '@/helpers/firebase/config';
import { setAllRoundsData, setEachPlayerData, setMainUserInfo } from '@/store/user/slice';
import { getDoc, doc } from 'firebase/firestore';
import { useAppDispatch } from '@/store';
import CustomizedSwitches from '@/components/atom/Switch';
import theme from '@/helpers/ThemeProvider';
import { IUserData } from '@/components/organism/AuthForm';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@/helpers/firebase/auth';

type TUserOptions = 'logged' | 'download' | 'notlogged';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState([]);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  // const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const [isUserLogged, setIsUserLogged] = useState<TUserOptions>('download');
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
  });

  const getSomeInfo = async () => {
    setIsUserLogged('download');
    const userEmailL: any = window.localStorage.getItem('userEmail');
    const LUserEmail = JSON.parse(userEmailL) || undefined;
    if (LUserEmail) {
      const docRef = doc(firebaseDb, 'users', LUserEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { data, allRoundsData, mainUserInfo } = docSnap.data();
        dispatch(setEachPlayerData(data));
        dispatch(setAllRoundsData(allRoundsData));
        dispatch(setMainUserInfo(mainUserInfo));
        setIsUserLogged('logged');
      } else {
        setIsUserLogged('logged');
        console.log('No such document!');
      }
    } else {
      // console.log('No such document!');
      setIsUserLogged('notlogged');
    }
  };

  useEffect(() => {
    getSomeInfo();
  }, []);

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
    signInWithEmailAndPassword(setErrors, userData, setIsUserLogged, getSomeInfo);
  };

  if (isUserLogged === 'notlogged') {
    return (
      <Box>
        <Stack
          spacing={2}
          sx={{
            p: 1,
          }}
        >
          <TextField label="Почта" name="email" onChange={userDataOnChange} />
          <TextField
            name="password"
            label="Пароль"
            onChange={userDataOnChange}
          />
          {errors.map((error: string) => (
            <div key={error}>
              <Typography
                fontWeight={300}
                fontSize="0.8rem"
                sx={{
                  color: theme.palette.error.main,
                }}
              >
                *
                {error}
              </Typography>
            </div>
          ))}

          <CustomizedSwitches
            firstLabel="Войти"
            secondLabel="Зарегистрироваться"
            setIsNewUser={setIsNewUser}
            isNewUser={isNewUser}
          />
          {isNewUser
            ? (
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  py: 2,
                  fontWeight: 600,
                }}
                onClick={logIn}
              >
                Войти
              </Button>
            )
            : (
              <Button
                color="secondary"
                sx={{
                  py: 2,
                  fontWeight: 600,
                }}
                variant="contained"
                onClick={createAccount}
              >
                Зарегистрироваться
              </Button>
            )}
        </Stack>
      </Box>
    );
  }
  if (isUserLogged === 'download') {
    return (
      <Box>
        <Typography
          sx={{
            pt: '30%',
          }}
          justifyContent="center"
          align="center"
          variant="h6"
        >
          Загрузка данных...
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'inline-block',
      minWidth: '100%',
      backgroundSize: 'cover',
      backgroundImage: 'url(/assets/bg/background.jpg)',
    }}
    >
      <div>
        <div>
          <Header setIsUserLogged={setIsUserLogged} />
        </div>
        <Box sx={{
          pt: 1.5,
          pb: 10,
        }}
        >
          <Box sx={{
            px: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <FirstSection />
          </Box>
        </Box>
      </div>
    </Box>
  );
};
export default HomePage;
