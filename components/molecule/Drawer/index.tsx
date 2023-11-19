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

export default function RightMenuDrawer({ savedNotes }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [whatToShow, setWhatToShow] = useState('articles');
  const { allRoundsData } = useAppSelector((state) => state.user.data);
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
    setWhatToShow(data);
  };

  return (
    <div>
      <Button onClick={openDrawer}>
        <MenuIcon color="secondary" />
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
            {/* <Button onClick={() => {
              console.log(allRoundsData);
            }}
            >
              show

            </Button> */}
            <Button color={whatToShow === 'allRounds' ? 'primary' : 'secondary'} variant="contained" fullWidth onClick={() => changeData('articles')}>Записи расходов</Button>
            <Button color={whatToShow === 'articles' ? 'primary' : 'secondary'} variant="contained" fullWidth onClick={() => changeData('allRounds')}>Все ходы</Button>
          </Stack>
          {whatToShow === 'articles' ? savedNotes?.map((item: any) => (
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
                  {item.note}
                </ListItem>
              </Box>
            </List>
          ))
          // TODO - add any interface props
            : allRoundsData?.map((itemRound: any) => (
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
                    {itemRound.mainClearProfit}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>
                    Денег на Расч/Счет
                  </Typography>
                  <Typography>
                    {itemRound.mainMoneyForAll}
                  </Typography>
                </Stack>
              </List>
            ))}
        </Box>
      </MuiDrawer>
    </div>
  );
}
