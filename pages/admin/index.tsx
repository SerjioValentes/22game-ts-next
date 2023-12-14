'use client';

import { firebaseDb } from '@/helpers/firebase/config';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography,
} from '@mui/material';
import {
  collection, doc, getDocs, setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const [roomName, setRoomName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState<any>([]);
  const [allUsersData, setAllUsersData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);
  const [rounds, setRounds] = useState<any>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

  // Create new room dialog
  const [dialogCreateNew, setDialogCreateNew] = useState(false);

  const router = useRouter();

  const createGameRoom = async (data: any) => {
    try {
      await setDoc(doc(firebaseDb, 'rooms', roomName), data);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const handleCreateRoom = () => {
    const roomData = {
      roomName,
      usersAccess: savedUsers,
    };
    createGameRoom(roomData);
    setDialogCreateNew(false);
  };

  const handlerDeleteUser = (item: string) => {
    const newSavedUsers = savedUsers.filter((savedUsersItem: string) => savedUsersItem !== item);
    setSavedUsers(newSavedUsers);
  };

  const handleShowPlayerResults = async () => {
    let usersData: any = [];
    const usersArray: any = [];
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, 'users'));
      querySnapshot.forEach((docItem: any) => {
        usersArray.push(docItem.id as string);
        usersData = [...usersData, {
          email: docItem.id,
          data: docItem.data(),
        }];
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setAllUsers(usersArray);
    setAllUsersData(usersData);

    let bigRound = 0;
    usersData.map((item: any) => {
      if (item?.data?.allRoundsData?.length > bigRound) {
        bigRound = item.data.allRoundsData.length;
        return bigRound;
      }
      return console.log('ok');
    });
    const roundsL = [];
    for (let i = 0; i < bigRound; i += 1) {
      roundsL.push(String(i + 1));
    }
    setRounds(roundsL);
  };

  const backPrevPage = (e: any) => {
    e.preventDefault();
    router.push('/');
  };

  const getRoomsData = (roomNameL: string) => {
    const room = rooms.filter((item: any) => item.roomName === roomNameL);
    const newAllUsersData = allUsersData.filter((item: any) => room[0].usersAccess.includes(item.email));
    setTableData(newAllUsersData);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    getRoomsData(event.target.value);
    setRoomName(event.target.value);
  };

  const handleCreateRoomSelect = (event: SelectChangeEvent) => {
    const newSavedUsers = [...savedUsers, event.target.value];
    setSavedUsers([...newSavedUsers]);
  };

  const getRoomsNames = async () => {
    let roomsL: any = [];
    try {
      // TODO - have to use like this
      // const docRef = doc(firebaseDb, 'users', LUserEmail);
      // const docSnap = await getDoc(docRef);
      const querySnapshot = await getDocs(collection(firebaseDb, 'rooms'));
      querySnapshot.forEach((docItem: any) => {
        roomsL = [...roomsL, docItem.data()];
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setRooms(roomsL);
  };

  useEffect(() => {
    getRoomsNames();
    handleShowPlayerResults();
  }, []);

  const handleRefreshResults = async () => {
    // console.log(roomName);
    // TODO - have to add state for e,terget.value select and after put this state to func bellow
    if (!roomName) return;
    getRoomsData(roomName);

    getRoomsNames();
    handleShowPlayerResults();
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 4,
          border: '1px solid black',
        }}
      >

        <Button component="label" variant="contained" startIcon={<ArrowBackIosIcon />} onClick={backPrevPage}>
          Назад
        </Button>
        <Button variant="contained" onClick={() => setDialogCreateNew(true)}>Создать комнату</Button>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
            <InputLabel
              sx={{
                fontWeight: 'bold',
                fontSize: '0.7rem',
                // pt: 10,
                pl: 1,
              }}
              id="select-label"
            >
              Выберете комнату
            </InputLabel>
            <Select
              labelId="select-label"
              variant="outlined"
              defaultValue=""
              onChange={handleSelectChange}
            >
              {rooms && rooms.map((item: any) => (
                <MenuItem
                  key={item.roomName}
                  value={item?.roomName}
                >
                  {item.roomName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button onClick={handleRefreshResults} variant="contained">Обновить результаты</Button>
      </Stack>

      <Grid container>
        {
           tableData.length > 0
          && (
          <Grid item xs={1}>
            <Stack
              spacing={4.85}
              sx={{
                pt: 4,
                pl: 4,
              }}
            >
              <div>Ход</div>
              {rounds.map((item: string) => (
                <Typography key={item} fontWeight={800}>{item}</Typography>
              ))}
            </Stack>
          </Grid>
          )
          }
        <Grid item xs={11}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              p: 4,
            }}
          >
            {tableData && tableData.map((eachUser: any) => (
              <Box
                key={eachUser.email}
              >
                <Stack direction="column" spacing={2}>
                  <Typography fontWeight={800}>
                    {eachUser.email}
                  </Typography>
                  <Stack spacing={1}>
                    {eachUser.data.allRoundsData && eachUser.data.allRoundsData.map((item: any) => (
                      <Stack
                        key={item.date}
                      >
                        <TextField
                          disabled
                          label={item.mainMoneyForAll}
                          value={item.mainClearProfit}
                          // value={item.mainMoneyForAll}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 30,
          },
        }}
        open={dialogCreateNew}
        onClose={() => setDialogCreateNew(!dialogCreateNew)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack sx={{
          p: 10,
        }}
        >
          <DialogTitle
            sx={{
              py: 4,

            }}
            align="center"
            fontWeight={800}
          >
            Создать новую комнату
          </DialogTitle>
          <DialogContent>
            {/* Start ---------------- First Section */}
            <Stack spacing={2}>
              <Stack>
                <TextField
                  label="Название комнаты"
                  onChange={(e) => setRoomName(e.target.value)}
                />

                <InputLabel
                  variant="outlined"
                  sx={{
                    my: 3,
                    fontSize: '1.2rem',
                  }}
                >
                  Выберете пользователей

                </InputLabel>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    id="select-label"
                    variant="outlined"
                    defaultValue="sd"
                    onChange={handleCreateRoomSelect}
                  >
                    {allUsers && allUsers.map((item: any) => (
                      <MenuItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Start -------- List of users */}
              <Stack>
                <Accordion>
                  <AccordionSummary>

                    <Typography>
                      Список пользователей
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {savedUsers.map((item: any) => (
                      <Stack
                        key={item}
                        direction="row"
                        spacing={4}
                      >
                        <div>
                          {item}
                        </div>
                        <IconButton onClick={() => handlerDeleteUser(item)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Stack>

              {/* End -------- List of users */}
            </Stack>
            {/* End ---------------- First Section */}
          </DialogContent>
          <DialogActions>
            <Button
              color="info"
              sx={{
                mt: 4,
                py: 2,
              }}
              fullWidth
              variant="contained"
              onClick={handleCreateRoom}
            >
              Создать новую комнату
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
