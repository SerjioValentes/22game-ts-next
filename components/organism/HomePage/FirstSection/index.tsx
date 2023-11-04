'use client';

import {
  Box, Button, Dialog, DialogTitle, Grid, InputAdornment, Stack, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.scss';
import MuiInputTextField from '@/components/atom/Input';
import inputList from '@/helpers/utils/inputs';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/store';
import { setEachPlayerData, setSavedNotes as dispatchSetSavedNotes } from '@/store/user/slice';
import useAppSelector from '@/hooks/useAppSelector';
import { getNormalNumber, getNumberWithSpaces } from '@/helpers/utils/restyling';
import dependenceInputFields from './dependenceInputFields';

const FirstSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState('');

  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');

  const dispatch = useAppDispatch();
  const eachUserData = useAppSelector((state) => state.user.data);
  const savedNotes = useAppSelector((state) => state.user.savedNotes);

  // TODO - change func name without set
  // const dispatchHelper = (functionConst: string, value: number) => {
  //   console.log(value);
  //   console.log(functionConst);
  //   dispatch(setEachPlayerData({
  //     ...eachUserData,
  //     [functionConst]: getNumberWithSpaces(Math.round(value) || value),
  //   }));
  // };

  const textFieldOnChange = (value: any, functionConst: string) => {
    let disapatchCorrectValues = {
      ...eachUserData,
      [functionConst]: value,
    };

    const totalCost = getNormalNumber(disapatchCorrectValues.constantCosts_TotalCosts);
    const earnings = getNormalNumber(disapatchCorrectValues.sellFunnel_03_Revenue);
    const sells = getNormalNumber(disapatchCorrectValues.variableCosts_Sells);
    const taxes = getNormalNumber(disapatchCorrectValues.variableCosts_Taxes);
    const obligations = getNormalNumber(disapatchCorrectValues.variableCosts_Exec);
    const marketing = getNormalNumber(disapatchCorrectValues.variableCosts_Marketing);
    const onceEarning = getNormalNumber(disapatchCorrectValues.firstFun_OnceRevenue);
    const totalCosts = getNormalNumber(disapatchCorrectValues.constantCosts_TotalCosts);
    const firstCv1 = getNormalNumber(disapatchCorrectValues.firstFun_CV1);
    const firstCv2 = getNormalNumber(disapatchCorrectValues.firstFun_CV2);
    const firstShows = getNormalNumber(disapatchCorrectValues.sellFunnel_01_Shows);
    const applications = getNormalNumber(disapatchCorrectValues.sellFunnel_01_Applications);
    const funnelSell = getNormalNumber(disapatchCorrectValues.sellFunnel_01_Sells);
    const funnelCv3 = getNormalNumber(disapatchCorrectValues.sellFunnel_02_CV3);
    const shows = getNormalNumber(disapatchCorrectValues.firstFun_Shows);
    const firstFunSells = getNormalNumber(disapatchCorrectValues.firstFun_Sells);
    const sellFunnelCv2 = getNormalNumber(disapatchCorrectValues.sellFunnel_01_CV2);
    const constantCostsFotOwner = getNormalNumber(disapatchCorrectValues.constantCosts_FotOwner);
    const constantCostsFot = getNormalNumber(disapatchCorrectValues.constantCosts_Fot);
    const sellBill = getNormalNumber(disapatchCorrectValues.sellFunnel_03_MedBill);
    const sellRegularPayClients = getNormalNumber(disapatchCorrectValues.sellFunnel_02_RegularPayClients);
    const sellConstantClients = getNormalNumber(disapatchCorrectValues.sellFunnel_02_ConstantClients);

    if (dependenceInputFields.applications.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        firstFun_Applications: (shows * firstCv1) / 100,
      };
    }

    if (dependenceInputFields.oncePayment.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        firstFun_Sells: (getNormalNumber(disapatchCorrectValues.firstFun_Applications) * firstCv2) / 100,
        firstFun_OnceRevenue: firstFunSells * getNormalNumber(disapatchCorrectValues.firstFun_MedBill),
      };
    }

    if (dependenceInputFields.sellsApplication.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellFunnel_01_Applications: (getNormalNumber(disapatchCorrectValues.sellFunnel_01_CV1) * firstShows) / 100,
      };
    }

    if (dependenceInputFields.sellsAmount.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellFunnel_01_Sells: (sellFunnelCv2 * getNormalNumber(applications)) / 100,
      };
    }

    if (dependenceInputFields.clients.includes(functionConst)) {
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellFunnel_02_ConstantClients: Math.round((funnelCv3 * funnelSell) / 100),
      };
    }

    if (dependenceInputFields.earning.includes(functionConst)) {
      const revenue = sellBill * (sellRegularPayClients + funnelSell + sellConstantClients);

      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        sellFunnel_03_Revenue: revenue,
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
        variableCosts_TotalPercent: varCostsTotalPercent,
        variableCosts_TotalCosts: varCostsTotalCosts,
        mainCostsField_Costs: (varCostsTotalCosts + totalCosts),
        mainCostsField_ClearProfit: mainCostsFieldClearProfit,
        firstFun_VariableCosts: firstFunVariableCosts,
        firstFun_Profit: firstFunProfit,
        mainCostsField_MoneyFor: mainCostsFieldClearProfit + firstFunProfit,
      };
    }

    if (dependenceInputFields.totalConst.includes(functionConst)) {
      const constantCostsCreditPay = getNormalNumber(disapatchCorrectValues.constantCosts_CreditAll) / 10;
      disapatchCorrectValues = {
        ...disapatchCorrectValues,
        constantCosts_CreditPay: constantCostsCreditPay,
        constantCosts_TotalCosts: constantCostsFotOwner + constantCostsFot + constantCostsCreditPay,
      };
    }
    dispatch(setEachPlayerData(disapatchCorrectValues));
  };

  useEffect(() => {
    const winLocal = window.localStorage.getItem('inputValue');
    const localStorageSavedNotes = window.localStorage.getItem('savedNotes');
    if (winLocal) {
      dispatch(setEachPlayerData(winLocal as string));
    }
    if (localStorageSavedNotes) {
      dispatch(dispatchSetSavedNotes(JSON.parse(localStorageSavedNotes as string)));
    }
  }, []);

  const InputTitleWrapper = styled('div')({
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
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
    const moneyFor = eachUserData.mainCostsField_MoneyFor;
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

    dispatch(setEachPlayerData({
      ...eachUserData,
      mainCostsField_MoneyFor: getNumberWithSpaces(totalMoney),
    }));
    window.localStorage.setItem('savedNotes', JSON.stringify([...newSaveNote, newSavedNoteValue]));
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
      return dispatch(setEachPlayerData({
        ...eachUserData,
        sellFunnel_02_RegularPayClients: getNormalNumber((eachUserData.sellFunnel_02_RegularPayClients) + 1),
      }));
    }
    if (eachUserData.sellFunnel_02_RegularPayClients === 0) {
      return console.log('');
    }
    return dispatch(setEachPlayerData({
      ...eachUserData,
      sellFunnel_02_RegularPayClients: getNormalNumber((eachUserData.sellFunnel_02_RegularPayClients) - 1),
    }));
  };
  return (
    <Grid container spacing={2}>
      <Grid xs={3} item>
        <InputTitleWrapper>Разовая воронка</InputTitleWrapper>
        <Box sx={{
          border: '1px solid white',
          borderRadius: 2,
          p: 2,
          mt: 1,
        }}
        >
          {inputList.firstFunnel.map((item) => (
            <MuiInputTextField
              key={item.label}
              InputProps={{
                endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
              }}
              sx={styleWithoutArrows}
              disabled={item.disabled}
              value={eachUserData[item.functionConst]}
              label={item.label}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
        </Box>
      </Grid>

      <Grid xs={3} item>
        <InputTitleWrapper>Воронка продаж</InputTitleWrapper>
        {inputList.sellFunnel_01.map((item) => (
          <MuiInputTextField
            key={item.label}
            InputProps={{
              endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            disabled={item.disabled}
            label={item.label}
            value={eachUserData[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}

        {inputList.sellFunnel_02.map((item) => (
          <MuiInputTextField
            InputProps={{
              endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            disabled={item.disabled}
            label={item.label}
            value={eachUserData[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}
        <Stack
          direction="row"
          spacing={2}
          display="flex"
        >

          <Button
            sx={{
              fontSize: 10,
            }}
            size="small"
            onClick={() => addClientsRegularPay(true)}
            variant="contained"
          >
            Добавить
          </Button>
          <Button
            sx={{
              fontSize: 10,
            }}
            onClick={() => addClientsRegularPay(false)}
            variant="contained"
          >
            Убавить
          </Button>
        </Stack>

        {inputList.sellFunnel_03.map((item) => (
          <MuiInputTextField
            InputProps={{
              endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            label={item.label}
            disabled={item.disabled}
            value={eachUserData[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}
      </Grid>

      <Grid
        xs={3}
        item
      >
        <InputTitleWrapper>Переменные расходы</InputTitleWrapper>
        {inputList.variableCosts.map((item) => (
          <MuiInputTextField
            InputProps={{
              endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            disabled={item.disabled}
            label={item.label}
            value={eachUserData[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}
        <hr />
        <Grid
          xs={12}
          item
        >
          {inputList.mainCostsField.map((item) => (
            <MuiInputTextField
              InputProps={{
                endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
              }}
              sx={styleWithoutArrows}
              key={item.label}
              label={item.label}
              disabled={item.disabled}
              value={eachUserData[item.functionConst]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
          <Stack
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
          </Stack>
        </Grid>
      </Grid>
      <Grid
        xs={3}
        item
      >
        <InputTitleWrapper>Постоянные расходы</InputTitleWrapper>
        {inputList.constantCosts.map((item) => (
          <MuiInputTextField
            InputProps={{
              endAdornment:
  <InputAdornment
    sx={inputLastSymbolSx}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            label={item.label}
            disabled={item.disabled}
            value={eachUserData[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}
      </Grid>

      <Dialog onClose={handleClose} open={openDialog}>
        <Box sx={{
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
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
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

          <Button onClick={saveNote} variant="contained">{dialogValue}</Button>
        </Box>
      </Dialog>

    </Grid>
  );
};

export default FirstSection;
