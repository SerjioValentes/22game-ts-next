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
  };

  const getUsers = async () => {
    const usersArray: any = [];
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, 'users'));
      console.log(querySnapshot);

      // querySnapshot.forEach((docItem: any) => {
      //   usersArray.push(docItem.id as string);
      // });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setAllUsers(usersArray);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const newSavedUsers = [...savedUsers, event.target.value];
    setSavedUsers([...newSavedUsers]);
  };

  const handlerDeleteUser = (item: string) => {
    const newSavedUsers = savedUsers.filter((savedUsersItem: string) => savedUsersItem !== item);
    setSavedUsers(newSavedUsers);
  };

  const handleShowPlayerResults = async () => {
    let usersData: any = [];
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, 'users'));
      querySnapshot.forEach((docItem: any) => {
        usersData = [...usersData, {
          email: docItem.id,
          data: docItem.data(),
        }];
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setAllUsersData(usersData);
  };
  const [dialogCreateNew, setDialogCreateNew] = useState(false);

  const backPrevPage = (e: any) => {
    e.preventDefault();
    router.push('/');
  };

  const handleSelectRoom = () => {

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
        <Button onClick={handleShowPlayerResults} variant="contained">Обновить результаты</Button>
      </Stack>
      <Button onClick={handleSelectRoom}>Выбрать команту</Button>

      <Grid container>
        {
           allUsersData.length > 0
          && (
          <Grid item xs={1}>
            <Stack
              spacing={4}
              sx={{
                pt: 4,
                pl: 4,
              }}
            >
              <div>Ход</div>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((item) => (
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
            {allUsersData && allUsersData.map((eachUser: any) => (
              <Box
                key={eachUser.email}
              >
                <Stack direction="column" spacing={2}>
                  <Typography fontWeight={800}>
                    {eachUser.email}
                  </Typography>
                  <Stack spacing={1}>
                    {eachUser.data.allRoundsData.map((item: any) => (
                      <Stack
                        key={item.date}
                      >
                        <TextField
                          // label={`Ход: ${item.round}`}
                          disabled
                          value={item.mainMoneyForAll}
                        />
                        {/* <Button variant="contained" onClick={() => console.log(item)}>show</Button> */}
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
                    onChange={handleSelectChange}
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
