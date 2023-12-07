'use client';

import RightMenuDrawer from '@/components/molecule/Drawer';
import { getNormalNumber } from '@/helpers/utils/restyling';
import useAppSelector from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/store';
import { setAllRoundsData, setEachPlayerData, setMainUserInfo } from '@/store/user/slice';
import {
  Avatar,
  Box, Button, Dialog, DialogTitle, IconButton, Menu, MenuItem, Stack, TextField, Tooltip, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { firebaseDb } from '@/helpers/firebase/config';
import {
  doc, setDoc,
} from 'firebase/firestore';

const Header = ({ setIsUserLogged }: any) => {
  const [isDialogEndRoundOpen, setIsDialogEndRoundOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<null | string | undefined>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const { allRoundsData, mainUserInfo } = useAppSelector((state) => state.user);
  const eachUserData = useAppSelector((state) => state.user.data);

  const handleOnChange = (value: any, gameValue: string) => {
    dispatch(setMainUserInfo({
      ...mainUserInfo,
      [gameValue]: value.target.value,
    }));

    window.localStorage.setItem('gameMainValues', JSON.stringify({
      ...mainUserInfo,
      [gameValue]: value.target.value,
    }));
  };

  useEffect(() => {
    const localUserEmail = window.localStorage.getItem('userEmail');
    setUserEmail(JSON.parse(localUserEmail as string));
  }, []);

  const getEachUserData = () => {
    setIsDialogEndRoundOpen(true);
  };

  const handleClose = () => {
    setIsDialogEndRoundOpen(false);
  };

  const setDataToFire = async (dateCountRoundPayClients: any) => {
    try {
      await setDoc(doc(firebaseDb, 'users', userEmail as string), dateCountRoundPayClients);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const endRound = () => {
    const constantClients = getNormalNumber(eachUserData.sellConstClients);
    const regularPayClients = getNormalNumber(eachUserData.sellRegularPay);
    const mainMoneyForAll = getNormalNumber(eachUserData.mainMoneyForAll);
    const mainMoneyFor = getNormalNumber(eachUserData.mainMoneyFor);

    const eachUser = {
      ...eachUserData,
      sellRegularPay: String(regularPayClients + constantClients),
      mainMoneyForAll: (mainMoneyFor + mainMoneyForAll).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      round: eachUserData.round + 1,
      date: new Date().toISOString(),
    };

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO - AllRounds data will add again in each round !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const allRoundsDataL = [...allRoundsData, eachUser];
    // ...eachUserData,

    // TODO - Doesn't have free space in localStorage - resolve with firestore DB maybe
    window.localStorage.setItem('inputValues', JSON.stringify(eachUser));

    dispatch(setEachPlayerData(eachUser));
    dispatch(setAllRoundsData(allRoundsDataL));
    setDataToFire({
      data: eachUser,
      allRoundsData: allRoundsDataL,
      mainUserInfo,
    });
    handleClose();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogInUser = () => {
    setAnchorElUser(null);
    // setIsNewUser(false);
  };

  const handleLogOut = () => {
    const resetMainInfo = {
      mainUserInfo: {
        name: '',
        bussiness: '',
        gamePlan: '',
        gameRequest: '',
      },
    };
    const resetEachPlayer = {
      round: 0,
      date: '',
      savedNotes: [],
      firstShows: '',
      firstCv1: '',
      firstApplications: '',
      firstCv2: '',
      firstSells: '',
      firstBill: '',
      firstRevenue: '',
      firstSpends: '',
      firstProfit: '',
      sellShows: '',
      sellCV1: '',
      sellApplications: '',
      sellCV2: '',
      sellSells: '',
      sellCV3: '',
      sellConstClients: '',
      sellTotalSells: '',
      sellRegularPay: '0',
      sellBill: '',
      sellRevenue: '',
      varSells: '',
      varCosts: '',
      varMarketing: '',
      varTaxes: '',
      varTotalPercent: '',
      varTotalCosts: '',
      constFotOwner: '',
      constFot: '',
      constCreditAll: '',
      constCreditPay: '',
      constTotalCosts: '',
      mainCosts: '',
      percentClearProfit: '1',
      mainClearProfit: '',
      mainMoneyFor: '',
      mainMoneyForAll: '',
      mainPersonalCapital: '',
      constAddField: '',
      nothing: '',
    };
    dispatch(setMainUserInfo(resetMainInfo));
    dispatch(setEachPlayerData(resetEachPlayer));
    setUserEmail(null);
    localStorage.clear();
    setIsUserLogged('notlogged');
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

  const goToAdminPage = (e: any) => {
    e.preventDefault();
    // router.push('/admin');
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      p: 2,
      gap: 1,
      height: '75px',
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
        {eachUserData?.round === 0 ? 'Начать игру' : 'Завершить'}
      </Button>

      {headerInputs.map((item: any) => (
        <TextField
          key={item.label}
          InputLabelProps={{
            style: {
              fontSize: 12,
            },
          }}
          label={item.label}
          value={mainUserInfo && mainUserInfo[item.name as keyof typeof mainUserInfo]}
          onChange={(e: any) => handleOnChange(e, item.name)}
        />
      ))}
      <RightMenuDrawer
        savedNotes={eachUserData?.savedNotes}
      />
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Настройки профиля">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{eachUserData?.round}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
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
                  <MenuItem onClick={goToAdminPage}>
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
    </Box>
  );
};
export default Header;
