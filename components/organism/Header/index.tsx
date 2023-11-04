'use client';

/* eslint-disable */

import RightMenuDrawer from '@/components/molecule/Drawer';
import { getNormalNumber } from '@/helpers/utils/restyling';
// import getNumberWithSpaces from '@/helpers/utils/restyling';
import useAppSelector from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/store';
import { setAllRoundsData, setEachPlayerData } from '@/store/user/slice';
import {
  Box, Button, Dialog, DialogTitle, Stack, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isDialogEndRoundOpen, setIsDialogEndRoundOpen] = useState(false);
  const [gameMainValues, setGameMainValues] = useState({
    name: '',
    bussiness: '',
    gamePlan: '',
    gameRequest: '',

  });
  const dispatch = useAppDispatch();
  const { allRoundsData, savedNotes } = useAppSelector((state) => state.user);
  const eachUserData = useAppSelector((state) => state.user.data);

  const handleOnChange = (value: any, gameValue: string) => {
    // TODO - check this function - maybe can change to dispatch and get values from there
    setGameMainValues((prev: any) => ({
      ...prev,
      [gameValue]: value.target.value,
    }));

    // dispatch(setHeaderMainPlayerData({
    //   ...gameMainValues,
    //   [gameValue]: value.target.value,
    // }));
    window.localStorage.setItem('gameMainValues', JSON.stringify({
      ...gameMainValues,
      [gameValue]: value.target.value,
    }));
  };

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('gameMainValues') as string);
    if (data) {
      setGameMainValues(data);
    }
  }, []);

  const getEachUserData = () => {
    setIsDialogEndRoundOpen(true);
  };

  const handleClose = () => {
    setIsDialogEndRoundOpen(false);
  };

  const endRound = () => {
    const constantClients = getNormalNumber(eachUserData.sellFunnel_02_ConstantClients);
    const regularPayClients = getNormalNumber(eachUserData.sellFunnel_02_RegularPayClients);
    // if (eachUserData.round === 1) {
    //   const dateCountRoundPayClientsCopy = {
    //     ...eachUserData,
    //     date: new Date().toISOString(),
    //   };
    //   dispatch(setAllRoundsData([dateCountRoundPayClientsCopy]));
    // }

    const dateCountRoundPayClients = {
      ...eachUserData,
      sellFunnel_02_RegularPayClients: regularPayClients + constantClients,
      round: eachUserData.round + 1,
      date: new Date().toISOString(),
    };

    window.localStorage.setItem('inputValue', JSON.stringify(eachUserData));

    dispatch(setEachPlayerData(dateCountRoundPayClients));
    dispatch(setAllRoundsData([...allRoundsData, dateCountRoundPayClients]));
    handleClose();
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      m: 'auto',
      p: 4,
      gap: 4,
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
        savedNotes={savedNotes}
      />
      {/* <Typography variant="h5">22Game.ru</Typography> */}

      <TextField
        label="Имя"
        value={gameMainValues.name}
        onChange={(e: any) => handleOnChange(e, 'name')}
      />
      <TextField
        label="Бизнес"
        value={gameMainValues.bussiness}
        onChange={(e: any) => handleOnChange(e, 'bussiness')}
      />
      <TextField
        label="Цель на игру"
        value={gameMainValues.gamePlan}
        onChange={(e: any) => handleOnChange(e, 'gamePlan')}
      />
      <TextField
        label="Запрос на игру"
        value={gameMainValues.gameRequest}
        onChange={(e: any) => handleOnChange(e, 'gameRequest')}
      />
      <Typography sx={{
        whiteSpace: 'nowrap',
      }}
      >
        Ход №
        {' '}
        {eachUserData.round + 1}
      </Typography>

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
