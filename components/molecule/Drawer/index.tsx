'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
  Divider,
  List, ListItem, Drawer as MuiDrawer, Stack, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import useAppSelector from '@/hooks/useAppSelector';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { setSavedNotes as dispatchSetSavedNotes } from '@/store/user/slice';
// import { useAppDispatch } from '@/store';

// export default function RightMenuDrawer({ savedNotes, setSavedNotes }: any) {
export default function RightMenuDrawer({ savedNotes }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [whatToShow, setWhatToShow] = useState('articles');
  const allRoundsData = useAppSelector((state) => state.user.allRoundsData);
  // const dispatch = useAppDispatch();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Delete array function ---  !!!!
  // const deleteNote = (date: string) => {
  //   const newSavedNotes = savedNotes.filter((item: any) => item.date !== date);
  //   dispatch(dispatchSetSavedNotes(newSavedNotes));
  // };
  const changeData = (data: string) => {
    if (data === 'articles') {
      return setWhatToShow('articles');
    }
    return setWhatToShow('allRounds');
  };

  return (
    <div>
      <Button onClick={openDrawer}>
        <MenuIcon color="primary" />
      </Button>

      <MuiDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Box sx={{
          width: '550px',
        }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            sx={{
              p: 2,
            }}
          >
            <Button color={whatToShow === 'articles' ? 'secondary' : 'primary'} variant="contained" fullWidth onClick={() => changeData('articles')}>Записи расходов</Button>
            <Button color={whatToShow === 'articles' ? 'primary' : 'secondary'} variant="contained" fullWidth onClick={() => changeData('allRounds')}>Все ходы</Button>
          </Stack>
          {whatToShow === 'articles' ? savedNotes.map((item: any) => (
            <List
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 2,
                alignItems: 'center',
              }}
              key={item.date}
            >
              <Box>
                <ListItem sx={{
                  px: 10,
                  backgroundColor: item.whatHappened === 'Убавить' ? '#FF5A33' : '#B4CF66',
                  color: item.whatHappened === 'Убавить' ? '#fff' : 'black',
                  borderRadius: 3,
                  fontWeight: 'bold',
                }}
                >
                  {item.whatHappened === 'Убавить' ? '-' : '+'}
                  {item.amount}
                </ListItem>
                <ListItem>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, odio?
                  {item.note}
                </ListItem>
              </Box>
            </List>
          ))
          // TODO - add any interface props
            : allRoundsData.map((itemRound: any) => (
              <List
                sx={{
                  justifyContent: 'space-between',
                  p: 2,
                  alignItems: 'center',
                }}
                key={itemRound.round}
              >
                <Typography variant="h6" fontWeight="bold">
                  {itemRound.round}
                </Typography>
                <Divider />

                <Stack
                  sx={{
                    my: 1,
                  }}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography>
                    Чистая прибыль
                  </Typography>
                  <Typography>
                    {itemRound.mainCostsField_ClearProfit}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    Денег на Расч/Счет
                  </Typography>
                  <Typography>
                    {itemRound.mainCostsField_MoneyFor}
                  </Typography>
                </Stack>
              </List>
            ))}
        </Box>
      </MuiDrawer>
    </div>
  );
}
