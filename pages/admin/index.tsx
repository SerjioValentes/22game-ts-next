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
// import { ResponsiveLine } from '@nivo/line';
import dynamic from 'next/dynamic';

const ResponsiveLine = dynamic(() => import('@nivo/line').then((m) => m.ResponsiveLine), { ssr: false });

const AdminPage = () => {
  const [roomName, setRoomName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState<any>([]);
  const [allUsersData, setAllUsersData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);
  const [rounds, setRounds] = useState<any>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

  const [chartData, setChartData] = useState<any>([]);
  // Create new room dialog
  const [dialogCreateNew, setDialogCreateNew] = useState(false);

  const router = useRouter();
  const HELPER_VAR = [
    {
      id: 'japan',
      color: 'hsl(35, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 15,
        },
        {
          x: 'helicopter',
          y: 80,
        },
        {
          x: 'boat',
          y: 32,
        },
        {
          x: 'train',
          y: 256,
        },
        {
          x: 'subway',
          y: 114,
        },
        {
          x: 'bus',
          y: 127,
        },
        {
          x: 'car',
          y: 42,
        },
        {
          x: 'moto',
          y: 185,
        },
        {
          x: 'bicycle',
          y: 72,
        },
        {
          x: 'horse',
          y: 43,
        },
        {
          x: 'skateboard',
          y: 28,
        },
        {
          x: 'others',
          y: 282,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(221, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 198,
        },
        {
          x: 'helicopter',
          y: 187,
        },
        {
          x: 'boat',
          y: 55,
        },
        {
          x: 'train',
          y: 134,
        },
        {
          x: 'subway',
          y: 167,
        },
        {
          x: 'bus',
          y: 222,
        },
        {
          x: 'car',
          y: 129,
        },
        {
          x: 'moto',
          y: 8,
        },
        {
          x: 'bicycle',
          y: 286,
        },
        {
          x: 'horse',
          y: 113,
        },
        {
          x: 'skateboard',
          y: 148,
        },
        {
          x: 'others',
          y: 211,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(259, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 130,
        },
        {
          x: 'helicopter',
          y: 172,
        },
        {
          x: 'boat',
          y: 96,
        },
        {
          x: 'train',
          y: 158,
        },
        {
          x: 'subway',
          y: 191,
        },
        {
          x: 'bus',
          y: 30,
        },
        {
          x: 'car',
          y: 37,
        },
        {
          x: 'moto',
          y: 290,
        },
        {
          x: 'bicycle',
          y: 44,
        },
        {
          x: 'horse',
          y: 86,
        },
        {
          x: 'skateboard',
          y: 108,
        },
        {
          x: 'others',
          y: 153,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(203, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 88,
        },
        {
          x: 'helicopter',
          y: 107,
        },
        {
          x: 'boat',
          y: 59,
        },
        {
          x: 'train',
          y: 198,
        },
        {
          x: 'subway',
          y: 195,
        },
        {
          x: 'bus',
          y: 119,
        },
        {
          x: 'car',
          y: 5,
        },
        {
          x: 'moto',
          y: 136,
        },
        {
          x: 'bicycle',
          y: 166,
        },
        {
          x: 'horse',
          y: 226,
        },
        {
          x: 'skateboard',
          y: 124,
        },
        {
          x: 'others',
          y: 177,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(207, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 246,
        },
        {
          x: 'helicopter',
          y: 269,
        },
        {
          x: 'boat',
          y: 50,
        },
        {
          x: 'train',
          y: 42,
        },
        {
          x: 'subway',
          y: 43,
        },
        {
          x: 'bus',
          y: 120,
        },
        {
          x: 'car',
          y: 85,
        },
        {
          x: 'moto',
          y: 275,
        },
        {
          x: 'bicycle',
          y: 10,
        },
        {
          x: 'horse',
          y: 206,
        },
        {
          x: 'skateboard',
          y: 276,
        },
        {
          x: 'others',
          y: 59,
        },
      ],
    },
  ];
  const getChart = (data: any) => {
    let HELPER = {
      id: 'email',
      color: 'hsl(2, 10%, 40%)',
      data: [
        {
          x: 0,
          y: 0, // how much his win
        },
      ],
    };

    const result: any = [];

    data.map((eachUserM: any, i: any) => {
      HELPER = {
        ...HELPER,
        id: eachUserM.email,
        color: `hsl(${i}, 10%, 40%)`,
      };
      eachUserM.data.allRoundsData.map((round: any) => {
        HELPER = {
          ...HELPER,
          data: [
            ...HELPER.data,
            {
              x: round.round,
              y: Number(round.mainMoneyForAll.replaceAll(' ', '')),
            },
          ],
        };
      });
      result.push(HELPER);
    });
    setChartData(result);
    console.log(result);
  };
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
    getChart(usersData);

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
        <Button
          variant="contained"
          // onClick={getChart}
          onClick={() => {
            console.log(HELPER_VAR);
          }}
        >
          showRes
        </Button>

        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
            <InputLabel
              sx={{
                pt: 10,
                pl: 2,
              }}
              id="select-label"
            >
              Выберете комнату

            </InputLabel>
            <Select
              variant="outlined"
              defaultValue="sd"
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

      <Box sx={{
        p: 4,
        height: ' 700px',
      }}
      >
        Chart
        <ResponsiveLine
          data={chartData}
          margin={{
            top: 50, right: 110, bottom: 50, left: 60,
          }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>

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
                    {eachUser.data.allRoundsData.map((item: any) => (
                      <Stack
                        key={item.date}
                      >
                        <TextField
                          // label={`Ход: ${item.round}`}
                          disabled
                          value={item.mainMoneyForAll}
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
