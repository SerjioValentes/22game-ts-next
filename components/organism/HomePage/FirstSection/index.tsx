'use client';

import {
  Box, Button, Dialog, DialogTitle, Grid, InputAdornment, Stack, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.scss';
import MuiInputTextField from '@/components/atom/Input';
import inputList from '@/helpers/utils/inputs';
import { useAppDispatch } from '@/store';
import { setEachPlayerData, setSavedNotes as dispatchSetSavedNotes, DataOfUser } from '@/store/user/slice';
import useAppSelector from '@/hooks/useAppSelector';
import { getNormalNumber } from '@/helpers/utils/restyling';
import { InputTitleWrapper, inputLastSymbolSx, styleWithoutArrows } from './styles';

const FirstSection = () => {
  const [inputValues, setInputValues] = useState({
    round: 0,
    savedNotes: [],
    firstShows: '',
    firstCv1: '',
    firstApplications: '',
    firstCv2: '',
    firstSells: '',
    firstBill: '',
    firstRevenue: '',
    firstSpends: '',
    firstProfit: '',
    sellShows: '',
    sellCV1: '',
    sellApplications: '',
    sellCV2: '',
    sellSells: '',
    sellCV3: '',
    sellConstClients: '',
    sellTotalSells: '',
    sellRegularPay: '0',
    sellBill: '',
    sellRevenue: '',
    varSells: '',
    varCosts: '',
    varMarketing: '',
    varTaxes: '',
    varTotalPercent: '',
    varTotalCosts: '',
    constFotOwner: '',
    constFot: '',
    constCreditAll: '',
    constCreditPay: '',
    constTotalCosts: '',
    mainCosts: '',
    PercentClearProfit: '',
    mainClearProfit: '',
    mainMoneyFor: '',
    mainPersonalCapital: '',
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState('');
  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');

  const dispatch = useAppDispatch();
  // const eachUserData: any = useAppSelector((state) => state.user.data);
  // const savedNotes = useAppSelector((state) => state.user.savedNotes);

  const textFieldOnChange = (value: string, functionConst: string) => {
    let disapatchCorrectValues = {
      ...inputValues,
      [functionConst]: value.replaceAll(' ', '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };

    // Constants <<< ----------------------------------------------------
    const shows = getNormalNumber(disapatchCorrectValues.firstShows); // Показы - Разовая воронка
    const firstCv1 = getNormalNumber(disapatchCorrectValues.firstCv1); // CV1 - Разовая воронка
    const firstCv2 = getNormalNumber(disapatchCorrectValues.firstCv2); // CV2 - Разовая воронка
    const firstBill = getNormalNumber(disapatchCorrectValues.firstBill); // Средний чек - Разовая воронка
    const sellCV1 = getNormalNumber(disapatchCorrectValues.sellCV1); // CV1 - Воронка продаж
    const sellFunnelCv2 = getNormalNumber(disapatchCorrectValues.sellCV2); // CV2 - Воронка продаж
    const funnelCv3 = getNormalNumber(disapatchCorrectValues.sellCV3); // CV3 - Воронка продаж
    const sellShows = getNormalNumber(disapatchCorrectValues.sellShows); // Показы - Воронка продаж
    const sellBill = getNormalNumber(disapatchCorrectValues.sellBill);
    const obligations = getNormalNumber(disapatchCorrectValues.varCosts); // Исполнение обязательств
    const marketing = getNormalNumber(disapatchCorrectValues.varMarketing);
    const constantCostsFotOwner = getNormalNumber(disapatchCorrectValues.constFotOwner);
    const constantCostsFot = getNormalNumber(disapatchCorrectValues.constFot);
    const constCreditAll = getNormalNumber(disapatchCorrectValues.constCreditAll);
    const sells = getNormalNumber(disapatchCorrectValues.varSells); // Продажи - Переменные расходы
    const taxes = getNormalNumber(disapatchCorrectValues.varTaxes); // Налоги - Переменные расходы

    const sellRegularPayClients = getNormalNumber(disapatchCorrectValues.sellRegularPay);

    // Calculations <<< ----------------------------------------------------
    const firstApplications = (shows * firstCv1) / 100; // Заявки - Разовая воронка
    const firstSells = (firstCv2 * firstApplications) / 100; // Продажи - Разовая воронка
    const applications = (sellCV1 * sellShows) / 100; // Заявки - Воронка продаж
    const funnelSell = (applications * sellFunnelCv2) / 100; // Продажи - Воронка продаж
    const onceEarning = firstSells * firstBill; // Выручка - Разовая воронка
    const sellConstantClients = (funnelCv3 * funnelSell) / 100; // Постоянные клиенты - Воронка продаж
    const revenue = sellBill * (sellRegularPayClients + funnelSell + sellConstantClients); // Выручка - Воронка продаж
    const varCostsTotalPercent = sells + obligations + marketing + taxes; // Итого от выручки - Переменные расходы
    const varCostsTotalCosts = (varCostsTotalPercent * revenue) / 100; // Итого - Переменные расходы
    const firstFunVariableCosts = (varCostsTotalPercent * onceEarning) / 100; // Переменные расходы - Разовая воронка
    const firstFunProfit = onceEarning - firstFunVariableCosts; // Прибыль - Разовая воронка
    const constantCostsCreditPay = constCreditAll / 10; // Кредит платеж - Постоянные расходы
    const totalCosts = constantCostsFotOwner + constantCostsFot + constantCostsCreditPay; // Итого - Постоянные расходы
    const mainCostsFieldClearProfit = revenue - (varCostsTotalCosts + totalCosts); // Чистая прибыль - Основное поле

    disapatchCorrectValues = {
      ...disapatchCorrectValues,
      firstApplications: (Math.round(firstApplications)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstSells: Math.round(firstSells).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstRevenue: (Math.round(onceEarning)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellApplications: (Math.round(applications)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellSells: (Math.round(funnelSell)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellConstClients: (Math.round(sellConstantClients)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellRevenue: (Math.round(revenue)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      varTotalPercent: (Math.round(varCostsTotalPercent)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      varTotalCosts: (Math.round(varCostsTotalCosts)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      mainCosts: (Math.round(varCostsTotalCosts + totalCosts)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      mainClearProfit: (Math.round(mainCostsFieldClearProfit)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstSpends: (Math.round(firstFunVariableCosts)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstProfit: (Math.round(firstFunProfit)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      mainMoneyFor: (Math.round(mainCostsFieldClearProfit + firstFunProfit)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      constCreditPay: (Math.round(constantCostsCreditPay)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      constTotalCosts: (Math.round(totalCosts)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };

    inputValues.savedNotes.map((item: any) => {
      if (item.whatHappened === 'Убавить') {
        disapatchCorrectValues = {
          ...disapatchCorrectValues,
          mainMoneyFor: String(getNormalNumber(disapatchCorrectValues.mainMoneyFor) - getNormalNumber(item.amount)),
        };
      }
      if (item.whatHappened === 'Добавить') {
        disapatchCorrectValues = {
          ...disapatchCorrectValues,
          mainMoneyFor: String(getNormalNumber(disapatchCorrectValues.mainMoneyFor) + getNormalNumber(item.amount)),
        };
      }
    });

    setInputValues(() => ({
      ...disapatchCorrectValues,
    }));
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

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addValueTomainCostsFieldMoneyFor = (whatToDo: string) => {
    if (whatToDo === 'increase') {
      setDialogValue('Добавить');
    }

    if (whatToDo === 'decrease') {
      setDialogValue('Убавить');
    }
    setOpenDialog(true);
  };
  const saveNote = () => {
    const moneyFor = inputValues.mainMoneyFor;
    const newSaveNote: any = inputValues.savedNotes;
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

    setInputValues((prev: any) => ({
      ...prev,
      savedNotes: [...newSaveNote, newSavedNoteValue],
      mainMoneyFor: (Math.round(totalMoney)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    }));

    window.localStorage.setItem('savedNotes', JSON.stringify([...newSaveNote, newSavedNoteValue]));
    handleClose();
  };

  const addClientsRegularPay = (isIncrease: boolean) => {
    if (isIncrease) {
      setInputValues((prev: any) => ({
        ...prev,
        sellRegularPay: String(getNormalNumber(inputValues.sellRegularPay) + 1),
      }));
    }

    if (inputValues.sellRegularPay === '0') {
      return;
    }

    if (!isIncrease) {
      setInputValues((prev: any) => ({
        ...prev,
        sellRegularPay: String(getNormalNumber(inputValues.sellRegularPay) - 1),
      }));
    }
  };

  return (
    <div>
      {/* <Button onClick={() => {
        console.log('savedNotes', inputValues.savedNotes);
        console.log('mainMoneyFor', inputValues.mainMoneyFor);
      }}
      >
        showMeMore

      </Button> */}
      <Grid container spacing={2}>
        {/* Start ---------------- РАЗОВАЯ ВОРОНКА --------------- Start */}
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
                value={inputValues[item.functionConst as keyof DataOfUser]}
                label={item.label}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />

            ))}
          </Box>
        </Grid>
        {/* End ---------------- РАЗОВАЯ ВОРОНКА --------------- End */}

        {/* Start ---------------- ВОРОНКА ПРОДАЖ --------------- Start */}
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
              value={inputValues[item.functionConst as keyof DataOfUser]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}

          {inputList.sellFunnel_02.map((item) => (
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
              value={inputValues[item.functionConst as keyof DataOfUser]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
          {/* Start ---------------- ДОБАВИТЬ / УБАВИТЬ - воронка продаж --------------- Start */}
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
          {/* End ---------------- ДОБАВИТЬ / УБАВИТЬ - воронка продаж --------------- End */}
          {inputList.sellFunnel_03.map((item) => (
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
              label={item.label}
              disabled={item.disabled}
              value={inputValues[item.functionConst as keyof DataOfUser]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
        </Grid>
        {/* End ---------------- ВОРОНКА ПРОДАЖ --------------- End */}

        {/* Start ---------------- ПЕРЕМЕННЫЕ РАСХОДЫ --------------- Start */}
        <Grid
          xs={3}
          item
        >
          <InputTitleWrapper>Переменные расходы</InputTitleWrapper>
          {inputList.variableCosts.map((item) => (
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
              value={inputValues[item.functionConst as keyof DataOfUser]}
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
                value={inputValues[item.functionConst as keyof DataOfUser]}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />
            ))}
            {/* Start ---------------- ДОБАВИТЬ/УБАВИТЬ - переменные расходы --------------- Start */}
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
            {/* End ---------------- ДОБАВИТЬ / УБАВИТЬ - переменные расходы --------------- End */}
          </Grid>
          {/* End ---------------- ПЕРЕМЕННЫЕ РАСХОДЫ --------------- End */}
        </Grid>
        <Grid
          xs={3}
          item
        >
          <InputTitleWrapper>Постоянные расходы</InputTitleWrapper>
          {inputList.constantCosts.map((item) => (
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
              label={item.label}
              disabled={item.disabled}
              value={inputValues[item.functionConst as keyof DataOfUser]}
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
    </div>
  );
};

export default FirstSection;
