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
import { setAllRoundsData, setEachPlayerData, setSavedNotes as dispatchSetSavedNotes } from '@/store/user/slice';
import useAppSelector from '@/hooks/useAppSelector';
import { getNormalNumber, getNumberWithSpaces } from '@/helpers/utils/restyling';
import dependenceInputFields from './dependenceInputFields';

const FirstSection = () => {
  const [inputValue, setInputValue] = useState<any>({
    round: 0,
    firstFun_Shows: '',
    firstFun_CV1: '',
    firstFun_Applications: '',
    firstFun_CV2: '',
    firstFun_Sells: '',
    firstFun_MedBill: '',
    firstFun_OnceRevenue: '',
    firstFun_VariableCosts: '',
    firstFun_Profit: '',
    sellFunnel_01_Shows: '',
    sellFunnel_01_CV1: '',
    sellFunnel_01_Applications: '',
    sellFunnel_01_CV2: '',
    sellFunnel_01_Sells: '',
    sellFunnel_02_CV3: '',
    sellFunnel_02_ConstantClients: '',
    sellFunnel_02_TotalSells: '',
    sellFunnel_03_MedBill: '',
    sellFunnel_03_Revenue: '',
    variableCosts_Sells: '',
    variableCosts_Exec: '',
    variableCosts_Marketing: '',
    variableCosts_Taxes: '',
    variableCosts_TotalPercent: '',
    variableCosts_TotalCosts: '',
    constantCosts_FotOwner: '',
    constantCosts_Fot: '',
    constantCosts_CreditAll: '',
    constantCosts_CreditPay: '',
    constantCosts_TotalCosts: '',
    mainCostsField_Costs: '',
    mainCostsField_CoeffClearProfit: '',
    mainCostsField_ClearProfit: '',
    mainCostsField_MoneyFor: '',
    mainCostsField_PersonalCapital: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState('');

  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');

  const dispatch = useAppDispatch();
  const allRoundsData = useAppSelector((state) => state.user.allRoundsData);
  const eachUserData = useAppSelector((state) => state.user.data);
  const savedNotes = useAppSelector((state) => state.user.savedNotes);

  // TODO - change func name without set
  const setStateHelper = (functionConst: string, value: number) => {
    setInputValue((prev: any) => ({
      ...prev,
      [functionConst]: getNumberWithSpaces(Math.round(value) || value),
    }));
    // dispatch(setEachPlayerData({
    //   ...eachUserData,
    //   [functionConst]: getNumberWithSpaces(Math.round(value) || value),
    // }));
  };

  const textFieldOnChange = (value: any, functionConst: string) => {
    setStateHelper(functionConst, value);
    const object = {
      ...inputValue,
      [functionConst]: value,
    };

    let copyDisapatch = {
      ...inputValue,
      [functionConst]: value,
    };

    const totalCost = getNormalNumber(object.constantCosts_TotalCosts);
    const earnings = getNormalNumber(object.sellFunnel_03_Revenue);
    const sells = getNormalNumber(object.variableCosts_Sells);
    const taxes = getNormalNumber(object.variableCosts_Taxes);
    const obligations = getNormalNumber(object.variableCosts_Exec);
    const marketing = getNormalNumber(object.variableCosts_Marketing);
    const onceEarning = getNormalNumber(object.firstFun_OnceRevenue);
    const totalCosts = getNormalNumber(object.constantCosts_TotalCosts);
    const firstCv1 = getNormalNumber(object.firstFun_CV1);
    const firstCv2 = getNormalNumber(object.firstFun_CV2);
    const firstShows = getNormalNumber(object.sellFunnel_01_Shows);
    const applications = getNormalNumber(object.sellFunnel_01_Applications);
    const funnelSell = getNormalNumber(object.sellFunnel_01_Sells);
    const funnelCv3 = getNormalNumber(object.sellFunnel_02_CV3);
    const shows = getNormalNumber(object.firstFun_Shows);
    const firstFunSells = getNormalNumber(object.firstFun_Sells);
    const sellFunnelCv2 = getNormalNumber(object.sellFunnel_01_CV2);
    const constantCostsFotOwner = getNormalNumber(object.constantCosts_FotOwner);
    const constantCostsFot = getNormalNumber(object.constantCosts_Fot);
    const sellBill = getNormalNumber(object.sellFunnel_03_MedBill);
    const sellRegularPayClients = getNormalNumber(object.sellFunnel_02_RegularPayClients);
    const sellConstantClients = getNormalNumber(object.sellFunnel_02_ConstantClients);

    if (dependenceInputFields.applications.includes(functionConst)) {
      setStateHelper(
        'firstFun_Applications',
        (shows * getNormalNumber(firstCv1)) / 100,
      );
      copyDisapatch = {
        ...copyDisapatch,
        firstFun_Applications: (shows * getNormalNumber(firstCv1)) / 100,
      };
    }

    if (dependenceInputFields.oncePayment.includes(functionConst)) {
      setStateHelper(
        'firstFun_Sells',
        (getNormalNumber(object.firstFun_Applications) * firstCv2) / 100,
      );

      setStateHelper(
        'firstFun_OnceRevenue',
        getNormalNumber(object.firstFun_Sells) * getNormalNumber(object.firstFun_MedBill),
      );
      copyDisapatch = {
        ...copyDisapatch,
        firstFun_Sells: (getNormalNumber(object.firstFun_Applications) * firstCv2) / 100,
        firstFun_OnceRevenue: firstFunSells * getNormalNumber(object.firstFun_MedBill),
      };
    }

    if (dependenceInputFields.sellsApplication.includes(functionConst)) {
      setStateHelper(
        'sellFunnel_01_Applications',
        (getNormalNumber(object.sellFunnel_01_CV1) * firstShows) / 100,
      );
      copyDisapatch = {
        ...copyDisapatch,
        sellFunnel_01_Applications: (getNormalNumber(object.sellFunnel_01_CV1) * firstShows) / 100,
      };
    }

    if (dependenceInputFields.sellsAmount.includes(functionConst)) {
      setStateHelper(
        'sellFunnel_01_Sells',
        (getNormalNumber(object.sellFunnel_01_CV2) * getNormalNumber(applications)) / 100,
      );
      copyDisapatch = {
        ...copyDisapatch,
        sellFunnel_01_Sells: (sellFunnelCv2 * getNormalNumber(applications)) / 100,
      };
    }

    if (dependenceInputFields.clients.includes(functionConst)) {
      setStateHelper(
        'sellFunnel_02_ConstantClients',
        Math.round((funnelCv3 * funnelSell) / 100),
      );
      copyDisapatch = {
        ...copyDisapatch,
        sellFunnel_02_ConstantClients: Math.round((funnelCv3 * funnelSell) / 100),
      };
    }

    if (dependenceInputFields.earning.includes(functionConst)) {
      const revenue = sellBill * (sellRegularPayClients + funnelSell + sellConstantClients);
      setStateHelper('sellFunnel_03_Revenue', getNormalNumber(object.sellFunnel_03_MedBill) * (getNormalNumber(object.sellFunnel_02_RegularPayClients) + getNormalNumber(object.sellFunnel_01_Sells) + getNormalNumber(object.sellFunnel_02_ConstantClients)));
      copyDisapatch = {
        ...copyDisapatch,
        sellFunnel_03_Revenue: revenue,
      };
    }

    if (dependenceInputFields.totalInProfit.includes(functionConst)) {
      const varCostsTotalPercent = sells + obligations + marketing + taxes;
      const varCostsTotalCosts = (varCostsTotalPercent * earnings) / 100;
      const firstFunVariableCosts = (varCostsTotalPercent * onceEarning) / 100;
      const mainCostsFieldClearProfit = earnings - (varCostsTotalCosts + totalCost);
      const firstFunProfit = onceEarning - firstFunVariableCosts;

      setStateHelper('variableCosts_TotalPercent', varCostsTotalPercent);
      setStateHelper('variableCosts_TotalCosts', varCostsTotalCosts);
      setStateHelper('mainCostsField_Costs', (varCostsTotalCosts + totalCosts));
      setStateHelper('mainCostsField_ClearProfit', mainCostsFieldClearProfit);
      setStateHelper('firstFun_VariableCosts', firstFunVariableCosts);
      setStateHelper('firstFun_Profit', firstFunProfit);
      setStateHelper('mainCostsField_MoneyFor', mainCostsFieldClearProfit + firstFunProfit);

      copyDisapatch = {
        ...copyDisapatch,
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
      const constantCostsCreditPay = getNormalNumber(object.constantCosts_CreditAll) / 10;
      setStateHelper('constantCosts_CreditPay', constantCostsCreditPay);
      setStateHelper('constantCosts_TotalCosts', getNormalNumber(object.constantCosts_FotOwner) + getNormalNumber(object.constantCosts_Fot) + constantCostsCreditPay);
      copyDisapatch = {
        ...copyDisapatch,
        constantCosts_CreditPay: constantCostsCreditPay,
        constantCosts_TotalCosts: constantCostsFotOwner + constantCostsFot + constantCostsCreditPay,
      };
    }
    dispatch(setEachPlayerData(copyDisapatch));
  };

  const endRound = () => {
    const constantClients = getNormalNumber(inputValue.sellFunnel_02_ConstantClients);
    const regularPayClients = getNormalNumber(inputValue.sellFunnel_02_RegularPayClients);
    const dateCountRoundPayClients = {
      ...inputValue,
      sellFunnel_02_RegularPayClients: regularPayClients + constantClients,
      round: inputValue.round + 1,
      date: new Date().toISOString(),
    };

    window.localStorage.setItem('inputValue', JSON.stringify(inputValue));

    setInputValue((prev: any) => ({
      ...prev,
      sellFunnel_02_RegularPayClients: regularPayClients + constantClients,
      round: inputValue.round + 1,
    }));

    dispatch(setEachPlayerData(dateCountRoundPayClients));
    dispatch(setAllRoundsData([...allRoundsData, dateCountRoundPayClients]));
  };

  useEffect(() => {
    const winLocal = window.localStorage.getItem('inputValue');
    const localStorageSavedNotes = window.localStorage.getItem('savedNotes');
    if (winLocal) {
      setInputValue(JSON.parse(winLocal as string));
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
    const moneyFor = inputValue.mainCostsField_MoneyFor;
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

    setStateHelper('mainCostsField_MoneyFor', totalMoney);
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

  const addClientsRegularPay = (isIncrease: boolean) => {
    if (isIncrease) {
      return setStateHelper('sellFunnel_02_RegularPayClients', getNormalNumber(inputValue.sellFunnel_02_RegularPayClients) + 1);
    }
    if (inputValue.sellFunnel_02_RegularPayClients === '0') {
      return console.log('');
    }
    return setStateHelper('sellFunnel_02_RegularPayClients', getNormalNumber(inputValue.sellFunnel_02_RegularPayClients) - 1);
  };

  return (
    <Grid container spacing={2}>
      {/* <Button onClick={() => {
        console.log(savedNotes);
      }}
      >
        show

      </Button> */}
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
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
              }}
              sx={styleWithoutArrows}
              disabled={item.disabled}
              value={inputValue[item.functionConst]}
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
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            disabled={item.disabled}
            label={item.label}
            value={inputValue[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}

        {inputList.sellFunnel_02.map((item) => (
          <MuiInputTextField
            InputProps={{
              endAdornment:
  <InputAdornment
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            disabled={item.disabled}
            label={item.label}
            value={inputValue[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: 'flex',
          }}
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
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            label={item.label}
            disabled={item.disabled}
            value={inputValue[item.functionConst]}
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
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            disabled={item.disabled}
            label={item.label}
            value={inputValue[item.functionConst]}
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
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
              }}
              sx={styleWithoutArrows}
              key={item.label}
              label={item.label}
              disabled={item.disabled}
              value={inputValue[item.functionConst]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
            }}
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
    sx={{
      mx: 0,
      backgroundColor: 'white',
      padding: '29.7px 14px',
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    }}
    position="end"
  >
    {item.inputProps}
  </InputAdornment>,
            }}
            sx={styleWithoutArrows}
            key={item.label}
            label={item.label}
            disabled={item.disabled}
            value={inputValue[item.functionConst]}
            onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
          />
        ))}
      </Grid>

      <Button
        variant="contained"
        onClick={endRound}
        fullWidth
        sx={{
          my: 4,
        }}
      >
        Завершить ход
      </Button>
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
