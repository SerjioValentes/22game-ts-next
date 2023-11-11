'use client';

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
    setIsDialogEndRoundOpen(false);
  };

  const endRound = () => {
    const constantClients = getNormalNumber(eachUserData.sellConstClients);
    const regularPayClients = getNormalNumber(eachUserData.sellRegularPay);

    const dateCountRoundPayClients = {
      ...eachUserData,
      sellRegularPay: regularPayClients + constantClients,
      round: eachUserData.round + 1,
      date: new Date().toISOString(),
    };

    window.localStorage.setItem('inputValues', JSON.stringify(dateCountRoundPayClients));

    dispatch(setEachPlayerData(dateCountRoundPayClients));
    dispatch(setAllRoundsData([...allRoundsData, dateCountRoundPayClients]));
    handleClose();
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
      <Typography sx={{
        whiteSpace: 'nowrap',
      }}
      >
        Ход №
        {' '}
        {eachUserData.round + 1}
      </Typography>
      <Button
        onClick={() => {
          console.log(allRoundsData);
        }}
      >
        show

      </Button>
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
