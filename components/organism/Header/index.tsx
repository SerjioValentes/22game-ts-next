'use client';

import RightMenuDrawer from '@/components/molecule/Drawer';
import { getNormalNumber } from '@/helpers/utils/restyling';
import useAppSelector from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/store';
import { setEachPlayerData } from '@/store/user/slice';
import {
  Avatar,
  Box, Button, Dialog, DialogTitle, IconButton, Menu, MenuItem, Stack, TextField, Tooltip, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/helpers/firebase/auth';
import CustomizedSwitches from '@/components/atom/Switch';
import { firebaseDb } from '@/helpers/firebase/config';
import {
  doc, setDoc,
} from 'firebase/firestore';
import theme from '@/helpers/ThemeProvider';
import FormWrapper from '../AuthForm/style';
import { IUserData } from '../AuthForm';

const Header = () => {
  const [isDialogEndRoundOpen, setIsDialogEndRoundOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<null | string | undefined>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [gameMainValues, setGameMainValues] = useState({
    name: '',
    bussiness: '',
    gamePlan: '',
    gameRequest: '',
  });

  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
  });
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [errors, setErrors] = useState([]);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // const { allRoundsData } = useAppSelector((state) => state.user);
  const eachUserData = useAppSelector((state) => state.user.data);

  const handleOnChange = (value: any, gameValue: string) => {
    setGameMainValues((prev: any) => ({
      ...prev,
      [gameValue]: value.target.value,
    }));

    window.localStorage.setItem('gameMainValues', JSON.stringify({
      ...gameMainValues,
      [gameValue]: value.target.value,
    }));
  };

  useEffect(() => {
    const localEachUserData = window.localStorage.getItem('inputValues');
    const localGameMainValues = window.localStorage.getItem('gameMainValues');
    const localUserEmail = window.localStorage.getItem('userEmail');
    setUserEmail(JSON.parse(localUserEmail as string));
    if (localEachUserData) {
      dispatch(setEachPlayerData(JSON.parse(localEachUserData as string)));
    }
    if (localGameMainValues) {
      setGameMainValues(JSON.parse(localGameMainValues as string));
    }
  }, [eachUserData.round]);

  const getEachUserData = () => {
    setIsDialogEndRoundOpen(true);
  };

  const handleClose = () => {
    setIsAuthDialogOpen(false);
    setIsDialogEndRoundOpen(false);
  };

  const setDataToFire = async (dateCountRoundPayClients: any) => {
    // const constantClients = getNormalNumber(eachUserData.sellConstClients);
    // const regularPayClients = getNormalNumber(eachUserData.sellRegularPay);

    // const dateCountRoundPayClients = {
    //   ...eachUserData,
    //   sellRegularPay: regularPayClients + constantClients,
    //   round: eachUserData.round + 1,
    //   date: new Date().toISOString(),
    // };

    // const newDateCountRoundPayClients = {
    // ...dateCountRoundPayClients,
    // allRoundsData: [...allRoundsData, dateCountRoundPayClients],
    // };

    try {
      const docRef = await setDoc(doc(firebaseDb, 'users', userEmail as string), dateCountRoundPayClients);
      console.log('Document written with ID: ', docRef);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // Problem resolved - but need to check with tests
  // Проблема в том что когда мы завершаем ход - у нас меняются клиенты которые платят регулярно и не пересчитываются
  // Возможно нам необходимо брать значения из всех раундов - последний массив, а в качестве стартовых значений брать из data:
  const endRound = () => {
    const constantClients = getNormalNumber(eachUserData.sellConstClients);
    const regularPayClients = getNormalNumber(eachUserData.sellRegularPay);
    const mainMoneyForAll = getNormalNumber(eachUserData.mainMoneyForAll);
    const mainMoneyFor = getNormalNumber(eachUserData.mainMoneyFor);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO - AllRounds data will add again in each round !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const dateCountRoundPayClients = {
      ...eachUserData,
      sellRegularPay: String(regularPayClients + constantClients),
      mainMoneyForAll: (mainMoneyFor + mainMoneyForAll).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      round: eachUserData.round + 1,
      date: new Date().toISOString(),
      allRoundsData: [...eachUserData.allRoundsData, ({
        ...eachUserData,
        sellRegularPay: String(regularPayClients + constantClients),
        mainMoneyForAll: (mainMoneyFor + mainMoneyForAll).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
        round: eachUserData.round + 1,
        date: new Date().toISOString(),
      })],
    };
    window.localStorage.setItem('inputValues', JSON.stringify(dateCountRoundPayClients));

    dispatch(setEachPlayerData(dateCountRoundPayClients));
    console.log(dateCountRoundPayClients);
    setDataToFire(dateCountRoundPayClients);
    handleClose();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogInUser = () => {
    setIsAuthDialogOpen(true);
    setAnchorElUser(null);
    // setIsNewUser(false);
  };

  const userDataOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setUserData((prev: IUserData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(setErrors, userData);
    handleCloseUserMenu();
  };

  const logIn = () => {
    signInWithEmailAndPassword(setErrors, userData, setUserEmail, setIsAuthDialogOpen);
    handleCloseUserMenu();
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUserEmail(null);
  };

  const headerInputs = [{
    name: 'name',
    label: 'Имя',
  },
  {
    name: 'bussiness',
    label: 'Бизнес',
  },
  {
    name: 'gamePlan',
    label: 'Цель на игру',
  },
  {
    name: 'gameRequest',
    label: 'Запрос на игру',
  }];

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      p: 2,
      gap: 1,
      backgroundColor: 'primary.main',
    }}
    >
      <Button
        color="secondary"
        sx={{
          fontSize: '12px',
          px: 4,
        }}
        variant="contained"
        onClick={getEachUserData}
      >
        {eachUserData.round === 0 ? 'Начать игру' : 'Завершить'}
      </Button>

      <RightMenuDrawer
        savedNotes={eachUserData.savedNotes}
      />
      {headerInputs.map((item: any) => (
        <TextField
          key={item.label}
          InputLabelProps={{
            style: {
              fontSize: 12,
            },
          }}
          label={item.label}
          value={gameMainValues[item.name as keyof typeof gameMainValues]}
          onChange={(e: any) => handleOnChange(e, item.name)}
        />
      ))}

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Настройки профиля">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{eachUserData.round}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!anchorElUser}
          onClose={handleCloseUserMenu}
        >
          {!userEmail
            ? (
              <MenuItem onClick={handleLogInUser}>
                <Typography onClick={handleLogInUser}>Войти</Typography>
              </MenuItem>
            )
            : (
              <>
                <MenuItem onClick={handleLogOut}>
                  <Typography onClick={handleLogOut}>Выйти</Typography>
                </MenuItem>
                {userEmail === 'admin@user.com'
                && (
                  <MenuItem>
                    <Typography>Управление</Typography>
                  </MenuItem>
                )}
              </>
            )}

        </Menu>
      </Box>
      <Dialog onClose={handleClose} open={isDialogEndRoundOpen}>
        <Box sx={{
          p: 4,
        }}
        >

          <DialogTitle>
            Завершить ход?
          </DialogTitle>
          <Stack direction="row" justifyContent="center" spacing={2}>

            <Button onClick={endRound} variant="contained">Завершить</Button>
            <Button onClick={handleClose} variant="contained">Отменить</Button>
          </Stack>
        </Box>
      </Dialog>

      {/* Start  ---- FireBase login form */}
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 30,
          },
        }}
        onClose={handleClose}
        open={isAuthDialogOpen}

      >
        <FormWrapper>
          <Stack
            spacing={2}
            sx={{
              p: 10,
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
        </FormWrapper>
      </Dialog>
      {/* End  ---- FireBase login form */}
    </Box>
  );
};
export default Header;
