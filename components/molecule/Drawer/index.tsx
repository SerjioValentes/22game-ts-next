'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
  ButtonGroup,
  Card,
  CardMedia,
  Divider,
  IconButton,
  List, ListItem, Drawer as MuiDrawer, Stack, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import useAppSelector from '@/hooks/useAppSelector';
// import ImageNext from '@/components/atom/Image';
import CloseIcon from '@mui/icons-material/Close';
import { FocusTrap } from '@mui/base/FocusTrap';

export default function RightMenuDrawer({ savedNotes }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [whatToShow, setWhatToShow] = useState('articles');
  const [randomCard, setRandomCard] = useState<string>('');
  const { allRoundsData } = useAppSelector((state) => state.user);
  const cards: any = useAppSelector((state) => state.cards);

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
  const getRandomInt = (max: any) => Math.floor(Math.random() * max) + 1;

  const handleChooseCard = (card: string) => {
    // console.log(card);
    // console.log(Object.keys(cards[card]).length);
    // console.log(getRandomInt(Object.keys(card).length));
    const randCard = getRandomInt(Object.keys(card).length);
    setRandomCard(`/assets/web/${card}/cards/${randCard}.jpg`);
    console.log(randomCard.split('/'));
  };

  return (
    <div>
      <Button onClick={openDrawer}>
        <MenuIcon color="secondary" />
      </Button>
      <FocusTrap disableEnforceFocus open={isDrawerOpen}>
        <MuiDrawer
          anchor="right"
          open={isDrawerOpen}
          onClose={closeDrawer}
        >
          <Box sx={{
            width: '550px',
          }}
          >
            {/* <IconButton
              onClick={closeDrawer}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton> */}
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{
                p: 2,
              }}
            >
              <Button
                sx={{
                  backgroundColor: whatToShow === 'articles' ? '#1665c0' : '#fff',
                }}
                variant="contained"
                fullWidth
                onClick={() => changeData('articles')}
              >
                Записи расходов
              </Button>
              <Button
                sx={{
                  backgroundColor: whatToShow === 'allRounds' ? '#1665c0' : '#fff',
                }}
                variant="contained"
                fullWidth
                onClick={() => changeData('allRounds')}
              >
                Все ходы
              </Button>
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
                    {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    {' '}
                    P
                  </ListItem>
                  <ListItem>
                    {item.note}
                  </ListItem>
                </Box>
              </List>
            ))
            // TODO - types
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
      </FocusTrap>
    </div>
  );
}
