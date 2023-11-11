'use client';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.scss';
import MuiInputTextField from '@/components/atom/Input';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/store';
import {
  setEachPlayerData,
  setSavedNotes as dispatchSetSavedNotes,
  DataOfUser,
} from '@/store/user/slice';
import useAppSelector from '@/hooks/useAppSelector';
import {
  getNormalNumber,
  getNumberWithSpaces,
} from '@/helpers/utils/restyling';
import {
  COPY_INPUTS, COPY_TEXT_FIELD,
} from './inputList';
import dependenceInputFields from './dependenceInputFields';

const MainCalc = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState('');

  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');

  const dispatch = useAppDispatch();
  const eachUserData: DataOfUser = useAppSelector((state) => state.user.data);
  const savedNotes = useAppSelector((state) => state.user.savedNotes);

  const textFieldOnChange = (value: any, functionConst: string) => {
    let disapatchCorrectValues = {
      ...eachUserData,
      [functionConst]: value,
    };

    const totalCost = getNormalNumber(
      disapatchCorrectValues.constTotalCosts,
    );
    const earnings = getNormalNumber(
      disapatchCorrectValues.sellRevenue,
    );
    const sells = getNormalNumber(disapatchCorrectValues.varSells);
    const taxes = getNormalNumber(disapatchCorrectValues.varTaxes);
    const obligations = getNormalNumber(
      disapatchCorrectValues.varCosts,
    );
    const marketing = getNormalNumber(
      disapatchCorrectValues.varMarketing,
    );
    const onceEarning = getNormalNumber(
      disapatchCorrectValues.firstRevenue,
    );
    const totalCosts = getNormalNumber(
      disapatchCorrectValues.constTotalCosts,
    );
    const firstCv1 = getNormalNumber(disapatchCorrectValues.firstCv1);
    const firstCv2 = getNormalNumber(disapatchCorrectValues.firstCv2);
    const firstShows = getNormalNumber(
      disapatchCorrectValues.sellShows,
    );
    const applications = getNormalNumber(
      disapatchCorrectValues.sellApplications,
    );
    const funnelSell = getNormalNumber(
      disapatchCorrectValues.sellSells,
    );
    const funnelCv3 = getNormalNumber(disapatchCorrectValues.sellCV3);
    const shows = getNormalNumber(disapatchCorrectValues.firstApplications);
    const firstFunSells = getNormalNumber(
      disapatchCorrectValues.firstSells,
    );
    const sellFunnelCv2 = getNormalNumber(
      disapatchCorrectValues.sellCV2,
    );
    const constantCostsFotOwner = getNormalNumber(
      disapatchCorrectValues.constFotOwner,
    );
    const constantCostsFot = getNormalNumber(
      disapatchCorrectValues.constFot,
    );
    const sellBill = getNormalNumber(
      disapatchCorrectValues.sellBill,
    );
    const sellRegularPayClients = getNormalNumber(
      disapatchCorrectValues.sellRegularPay,
    );
    const sellConstantClients = getNormalNumber(
      disapatchCorrectValues.sellConstClients,
    );

    if (dependenceInputFields.applications.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        firstApplications: String((shows * firstCv1) / 100),
      };
    }

    if (dependenceInputFields.oncePayment.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        firstSells: String(
          (getNormalNumber(disapatchCorrectValues.firstApplications)
            * firstCv2)
          / 100,
        ),
        firstRevenue: String(
          firstFunSells
          * getNormalNumber(disapatchCorrectValues.firstBill),
        ),
      };
    }

    if (dependenceInputFields.sellsApplication.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellApplications: String(
          (getNormalNumber(disapatchCorrectValues.sellCV1)
            * firstShows)
          / 100,
        ),
      };
    }

    if (dependenceInputFields.sellsAmount.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellSells: String(
          (sellFunnelCv2 * getNormalNumber(applications)) / 100,
        ),
      };
    }

    if (dependenceInputFields.clients.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellConstClients: String(
          Math.round((funnelCv3 * funnelSell) / 100),
        ),
      };
    }

    if (dependenceInputFields.earning.includes(functionConst)) {
      const revenue = sellBill * (sellRegularPayClients + funnelSell + sellConstantClients);

      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellRevenue: String(revenue),
      };
    }

    if (dependenceInputFields.totalInProfit.includes(functionConst)) {
      const varCostsTotalPercent = sells + obligations + marketing + taxes;
      const varCostsTotalCosts = (varCostsTotalPercent * earnings) / 100;
      const firstFunVariableCosts = (varCostsTotalPercent * onceEarning) / 100;
      const mainCostsFieldClearProfit = earnings - (varCostsTotalCosts + totalCost);
      const firstFunProfit = onceEarning - firstFunVariableCosts;

      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        varTotalPercent: String(varCostsTotalPercent),
        varTotalCosts: String(varCostsTotalCosts),
        mainCosts: String(varCostsTotalCosts + totalCosts),
        mainClearProfit: String(mainCostsFieldClearProfit),
        firstSpends: String(firstFunVariableCosts),
        firstProfit: String(firstFunProfit),
        mainMoneyFor: String(
          mainCostsFieldClearProfit + firstFunProfit,
        ),
      };
    }

    if (dependenceInputFields.totalConst.includes(functionConst)) {
      const constantCostsCreditPay = getNormalNumber(disapatchCorrectValues.constCreditAll) / 10;
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        constCreditPay: String(constantCostsCreditPay),
        constTotalCosts: String(
          constantCostsFotOwner + constantCostsFot + constantCostsCreditPay,
        ),
      };
    }
    dispatch(setEachPlayerData(disapatchCorrectValues));
  };

  useEffect(() => {
    const winLocal = JSON.parse(window.localStorage.getItem('inputValue') as string);
    const localStorageSavedNotes = JSON.parse(window.localStorage.getItem('savedNotes') as string);
    if (winLocal) {
      dispatch(setEachPlayerData(winLocal));
    }
    if (localStorageSavedNotes) {
      dispatch(
        dispatchSetSavedNotes(localStorageSavedNotes),
      );
    }
  }, []);

  const InputTitleWrapper = styled('div')({
    margin: '10px 0 0 0',
    fontWeight: 'bold',
    display: 'flex',
    color: 'white',
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addValueTomainCostsFieldMoneyFor = (whatToDo: string) => {
    setOpenDialog(true);
    if (whatToDo === 'increase') {
      setDialogValue('Добавить');
    }

    if (whatToDo === 'decrease') {
      setDialogValue('Убавить');
    }
  };
  const saveNote = () => {
    const moneyFor = eachUserData.mainMoneyFor;
    const newSaveNote: any = savedNotes;
    let totalMoney = 0;

    const newSavedNoteValue = {
      date: new Date().toISOString(),
      amount: dialogAmount,
      note: dialogNote,
      whatHappened: dialogValue,
    };

    if (dialogValue === 'Убавить') {
      totalMoney = getNormalNumber(moneyFor) - getNormalNumber(dialogAmount);
    }
    if (dialogValue === 'Добавить') {
      totalMoney = getNormalNumber(moneyFor) + getNormalNumber(dialogAmount);
    }

    dispatch(
      setEachPlayerData({
        ...eachUserData,
        mainMoneyFor: getNumberWithSpaces(totalMoney),
      }),
    );
    window.localStorage.setItem(
      'savedNotes',
      JSON.stringify([...newSaveNote, newSavedNoteValue]),
    );
    dispatch(dispatchSetSavedNotes([...newSaveNote, newSavedNoteValue]));
    handleClose();
  };

  const styleWithoutArrows = {
    my: 1,
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
    },
    input: {
      backgroundColor: 'white',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
  };

  const inputLastSymbolSx = {
    mx: 0,
    backgroundColor: 'white',
    padding: '29.7px 14px',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  };

  const addClientsRegularPay = (isIncrease: boolean) => {
    if (isIncrease) {
      return dispatch(
        setEachPlayerData({
          ...eachUserData,
          sellRegularPay: getNormalNumber(
            eachUserData.sellRegularPay + 1,
          ),
        }),
      );
    }
    if (eachUserData.sellRegularPay === '0') {
      return console.log('');
    }
    return dispatch(
      setEachPlayerData({
        ...eachUserData,
        sellRegularPay:
          getNormalNumber(eachUserData.sellRegularPay) - 1,
      }),
    );
  };

  return (
    <Stack display="flex" direction="row">
      <div>
        {COPY_INPUTS.map((item: any) => (
          <Box key={item.label}>
            <InputTitleWrapper>{item.title}</InputTitleWrapper>
            <Grid container>
              <Grid xs={3} item>
                {item.inputList?.map((inputListItem: any) => (
                  <MuiInputTextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={inputLastSymbolSx}
                          position="end"
                        >
                          {inputListItem.inputProps}
                        </InputAdornment>),
                    }}
                    sx={styleWithoutArrows}
                    disabled={inputListItem.disabled}
                    value={eachUserData[inputListItem.functionConst as keyof DataOfUser] || ''}
                    label={inputListItem.label}
                    onChange={(e) => textFieldOnChange(e.target.value, inputListItem.functionConst)}
                  />
                ))}
              </Grid>
              <Grid xs={3} item>
                {item.inputListSec?.map((inputListItem: any) => (
                  <MuiInputTextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={inputLastSymbolSx}
                          position="end"
                        >
                          {inputListItem.inputProps}
                        </InputAdornment>),
                    }}
                    sx={styleWithoutArrows}
                    disabled={inputListItem.disabled}
                    value={eachUserData[inputListItem.functionConst as keyof DataOfUser] || ''}
                    label={inputListItem.label}
                    onChange={(e) => textFieldOnChange(e.target.value, inputListItem.functionConst)}
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
        ))}
      </div>
      <Stack border="1px solid white" borderRadius={2} p={2}>
        {COPY_TEXT_FIELD.map((item: any) => (
          <Box key={item.title}>
            <InputTitleWrapper>{item.title}</InputTitleWrapper>
            <Divider
              color="white"
              sx={{
                mb: 2,
              }}
            />
            {item.inputList.map((inputListItem: any) => (
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Typography
                  color="white"
                >
                  {inputListItem.label}
                </Typography>
                <Divider color="white" />
                <Typography
                  color="white"
                  fontWeight="bold"
                >
                  {getNumberWithSpaces(
                    Number(eachUserData[inputListItem.functionConst as keyof DataOfUser]),
                  )}
                </Typography>
              </Stack>
            ))}
          </Box>
        ))}
      </Stack>
      {/* Start ---------------- ДОБАВИТЬ/УБАВИТЬ - переменные расходы --------------- Start */}
      {/* <Stack
          display="flex"
          direction="row"
          spacing={2}
        >

          <Button
            sx={{
              fontSize: 10,
            }}
            size="small"
            onClick={() => addValueTomainCostsFieldMoneyFor('increase')}
            variant="contained"
          >
            Добавить

          </Button>
          <Button
            sx={{
              fontSize: 10,
            }}
            onClick={() => addValueTomainCostsFieldMoneyFor('decrease')}
            variant="contained"
          >
            Убавить
          </Button>
        </Stack> */}
      {/* End ---------------- ДОБАВИТЬ / УБАВИТЬ - переменные расходы --------------- End */}

      <Dialog
        onClose={handleClose}
        open={openDialog}
      >
        <Box
          sx={{
            p: 4,
          }}
        >
          <DialogTitle>
            {dialogValue}
            {' '}
            к расчетному счету
          </DialogTitle>
          <TextField
            onChange={(e) => setDialogAmount(e.target.value)}
            value={dialogAmount}
            type="number"
            label="Количество"
            fullWidth
            autoFocus
            variant="outlined"
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                display: 'none',
              },
            }}
          />
          <TextField
            onChange={(e) => setDialogNote(e.target.value)}
            value={dialogNote}
            label="Заметка кому и на что"
            fullWidth
            autoFocus
            variant="outlined"
            sx={{
              my: 2,
            }}
          />

          <Button
            onClick={saveNote}
            variant="contained"
          >
            {dialogValue}
          </Button>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default MainCalc;
