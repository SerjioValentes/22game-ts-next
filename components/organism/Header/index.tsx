'use client';

import RightMenuDrawer from '@/components/molecule/Drawer';
import { getNormalNumber } from '@/helpers/utils/restyling';
import useAppSelector from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/store';
import { setAllRoundsData, setEachPlayerData } from '@/store/user/slice';
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
import FormWrapper from '../AuthForm/style';
import { IUserData } from '../AuthForm';

const Header = () => {
  const [isDialogEndRoundOpen, setIsDialogEndRoundOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<null | string>(null);
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
  const [isNewUser, setIsNewUser] = useState(true);

  const dispatch = useAppDispatch();
  const { allRoundsData } = useAppSelector((state) => state.user);
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
  }, []);

  const getEachUserData = () => {
    setIsDialogEndRoundOpen(true);
  };

  const handleClose = () => {
    setIsAuthDialogOpen(false);
    setIsDialogEndRoundOpen(false);
  };

  const endRound = () => {
    const constantClients = getNormalNumber(eachUserData.sellConstClients);
    const regularPayClients = getNormalNumber(eachUserData.sellRegularPay);

    const dateCountRoundPayClients = {
      ...eachUserData,
      sellRegularPay: String(regularPayClients + constantClients),
      round: eachUserData.round + 1,
      date: new Date().toISOString(),
      // allRoundsData: [...allRoundsData, dateCountRoundPayClients]
    };

    window.localStorage.setItem('inputValues', JSON.stringify(dateCountRoundPayClients));

    dispatch(setEachPlayerData(dateCountRoundPayClients));
    dispatch(setAllRoundsData([...allRoundsData, dateCountRoundPayClients]));
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
    signInWithEmailAndPassword(setErrors, userData, setUserEmail);
    handleCloseUserMenu();
  };

  const setDataToFire = async () => {
    const constantClients = getNormalNumber(eachUserData.sellConstClients);
    const regularPayClients = getNormalNumber(eachUserData.sellRegularPay);

    const dateCountRoundPayClients = {
      ...eachUserData,
      sellRegularPay: regularPayClients + constantClients,
      round: eachUserData.round + 1,
      date: new Date().toISOString(),
    };

    const newDateCountRoundPayClients = {
      ...dateCountRoundPayClients,
      allRoundsData: [...allRoundsData, dateCountRoundPayClients],
    };

    try {
      const docRef = await setDoc(doc(firebaseDb, 'users', userEmail as string), newDateCountRoundPayClients);
      console.log('Document written with ID: ', docRef);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUserEmail(null);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      p: 4,
      gap: 4,
      backgroundColor: 'secondary.main',
    }}
    >
      <Button
        sx={{
          fontSize: '12px',
          px: 4,
        }}
        variant="contained"
        onClick={getEachUserData}
      >
        Завершить

      </Button>

      <RightMenuDrawer
        savedNotes={eachUserData.savedNotes}
      />
      {
        [{
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
        }].map((item: any) => (
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
        ))
      }

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
                <Typography onClick={handleLogInUser}>LogIn</Typography>
              </MenuItem>
            )
            : (
              <>
                <MenuItem onClick={handleLogOut}>
                  <Typography onClick={handleLogOut}>LogOut</Typography>
                </MenuItem>
                {userEmail === 'admin@user.com'
                && (
                  <MenuItem>
                    <Typography>admin page</Typography>
                  </MenuItem>
                )}
              </>
            )}

        </Menu>
      </Box>
      <Dialog onClose={handleClose} open={isAuthDialogOpen}>
        <FormWrapper>
          <TextField name="email" placeholder="email" onChange={userDataOnChange} />
          <TextField name="password" placeholder="password" onChange={userDataOnChange} />
          {errors.map((error: string) => <div key={error}>{error}</div>)}
          <CustomizedSwitches firstLabel="Log In" secondLabel="Create account" setIsNewUser={setIsNewUser} />
          {isNewUser
            ? <Button variant="contained" onClick={logIn}>LogIn</Button>
            : <Button variant="contained" onClick={createAccount}>Create account</Button>}
        </FormWrapper>
      </Dialog>
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
    </Box>
  );
};
export default Header;
