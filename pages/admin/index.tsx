'use client';

import { firebaseDb } from '@/helpers/firebase/config';
import {
  Box,
  Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography,
} from '@mui/material';
import {
  collection, doc, getDocs, setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AdminPage = () => {
  const [roomName, setRoomName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState<any>([]);
  const [allUsersData, setAllUsersData] = useState<any>([]);

  const createGameRoom = async (data: any) => {
    try {
      await setDoc(doc(firebaseDb, 'rooms', roomName), data);
      // console.log('Document written with ID: ', docRef);
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
      querySnapshot.forEach((docItem: any) => {
        usersArray.push(docItem.id as string);
      });
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
    // console.log(newSavedUsers);
    setSavedUsers(newSavedUsers);
  };

  const handleShowPlayerResults = async () => {
    let usersData: any = [];
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, 'users'));
      querySnapshot.forEach((docItem: any) => {
        // console.log(docItem.data());
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

  return (
    <Box>
      <Box sx={{
        p: 4,
        border: '1px solid black',
      }}
      >
        <Button onClick={handleCreateRoom}>Create new game room</Button>
        <Button onClick={getUsers}>get users for useEffct</Button>
        <Button onClick={() => {
          console.log(allUsersData);
        }}
        >
          CHECK SOME DATA

        </Button>
      </Box>
      <Stack
        spacing={2}
        sx={{
          p: 4,
          // border: '1px solid black',
        }}
      >
        <TextField
          label="Название комнаты"
          onChange={(e) => setRoomName(e.target.value)}
        />
      </Stack>
      <Stack
        spacing={2}
        sx={{
          p: 4,
        }}
      >

        <InputLabel
          id="select-label"
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
        <Stack sx={{
          py: 4,
        }}
        >
          <Typography
            sx={{
              my: 1,
            }}
            variant="h5"
          >
            Список пользователей

          </Typography>
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
        </Stack>
      </Stack>
      <Button onClick={handleCreateRoom} fullWidth variant="contained">Create room</Button>
      <Button onClick={handleShowPlayerResults} fullWidth variant="contained">Reload players results</Button>

      <Grid container>
        <Grid item xs={1}>
          <Stack
            spacing={4}
            sx={{
              pt: 4,
              pl: 4,
            }}
          >
            <div>Ход</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </Stack>
        </Grid>
        <Grid item xs={11}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              p: 4,
            }}
          >

            {allUsersData && allUsersData.map((eachUserData: any) => (
              <Box
                key={eachUserData.email}
              >
                <Stack direction="column" spacing={2}>
                  <Typography fontWeight={800}>
                    {eachUserData.email}
                  </Typography>
                  <Stack spacing={1}>
                    {eachUserData.data.allRoundsData.map((item: any) => (
                      <Stack
                        key={item.date}
                      >
                        <TextField
                          label={`Ход: ${item.round}`}
                          disabled
                          value={item.mainMoneyFor}
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
    </Box>
  );
};

export default AdminPage;
