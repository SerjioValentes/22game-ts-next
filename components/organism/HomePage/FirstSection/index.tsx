'use client';

import {
  Box, Button, Dialog, DialogTitle, Grid, Stack, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.scss';
import MuiInputTextField from '@/components/atom/Input';
import inputList from '@/helpers/utils/inputs';
import { useAppDispatch } from '@/store';
import { setEachPlayerData, DataOfUser } from '@/store/user/slice';
import useAppSelector from '@/hooks/useAppSelector';
import { getNormalNumber } from '@/helpers/utils/restyling';
import { InputTitleWrapper, styleWithoutArrows } from './styles';

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
    percentClearProfit: '1',
    mainClearProfit: '',
    mainMoneyFor: '',
    mainPersonalCapital: '',
    constAddField: '',
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState('');
  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');

  const dispatch = useAppDispatch();
  const eachUserData: any = useAppSelector((state) => state.user.data);

  const neverFunc = () => {};

  const textFieldOnChange = (value: string, functionConst: string) => {
    let disapatchCorrectValues = {
      ...eachUserData,
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
    const percClearProf = getNormalNumber(disapatchCorrectValues.percentClearProfit); // Коэффициент ЧП - Переменные расходы
    const obligations = getNormalNumber(disapatchCorrectValues.varCosts); // Исполнение обязательств
    const marketing = getNormalNumber(disapatchCorrectValues.varMarketing);
    const constantCostsFotOwner = getNormalNumber(disapatchCorrectValues.constFotOwner);
    const constAddField = getNormalNumber(disapatchCorrectValues.constAddField); // Дополнительное поле - Постоянные расходы
    const constantCostsFot = getNormalNumber(disapatchCorrectValues.constFot);
    const constCreditAll = getNormalNumber(disapatchCorrectValues.constCreditAll);
    const sells = getNormalNumber(disapatchCorrectValues.varSells); // Продажи - Переменные расходы
    const taxes = getNormalNumber(disapatchCorrectValues.varTaxes); // Налоги - Переменные расходы
    const sellRegularPayClients = getNormalNumber(disapatchCorrectValues.sellRegularPay); // Клиенты (платят регулярно) - Воронка продаж
    let mainMoneyFor = getNormalNumber(disapatchCorrectValues.mainMoneyFor); // Денег на расч / счете - Основное поле

    // Calculations <<< ----------------------------------------------------
    const firstApplications = Math.round((shows * firstCv1) / 100); // Заявки - Разовая воронка
    const firstSells = Math.round((firstCv2 * firstApplications) / 100); // Продажи - Разовая воронка
    const applications = Math.round((sellCV1 * sellShows) / 100); // Заявки - Воронка продаж
    const funnelSell = Math.round((applications * sellFunnelCv2) / 100); // Продажи - Воронка продаж
    const onceEarning = Math.round(firstSells * firstBill); // Выручка - Разовая воронка

    const sellConstantClients = Math.round((funnelCv3 * funnelSell) / 100); // Постоянные клиенты - Воронка продаж
    const revenue = Math.round(sellBill * (sellRegularPayClients + funnelSell + sellConstantClients)); // Выручка - Воронка продаж
    const varCostsTotalPercent = Math.round(sells + obligations + marketing + taxes); // Итого от выручки - Переменные расходы
    const varCostsTotalCosts = Math.round((varCostsTotalPercent * revenue) / 100); // Итого - Переменные расходы
    const firstFunVariableCosts = Math.round((varCostsTotalPercent * onceEarning) / 100); // Переменные расходы - Разовая воронка
    const firstFunProfit = Math.round(onceEarning - firstFunVariableCosts); // Прибыль - Разовая воронка
    const constantCostsCreditPay = Math.round(constCreditAll / 10); // Кредит платеж - Постоянные расходы
    const totalCosts = Math.round(constantCostsFotOwner + constantCostsFot + constantCostsCreditPay + constAddField); // Итого - Постоянные расходы
    const mainCostsFieldClearProfit = Math.round(revenue - (varCostsTotalCosts + totalCosts)); // Чистая прибыль - Основное поле

    if (disapatchCorrectValues.round !== 0) {
      mainMoneyFor = Math.round(mainCostsFieldClearProfit + firstFunProfit); // Денег на расч / счете - Основное поле
    }

    disapatchCorrectValues = {
      ...disapatchCorrectValues,
      firstApplications: firstApplications.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstSells: firstSells.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstRevenue: onceEarning.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellApplications: applications.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellSells: funnelSell.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellConstClients: sellConstantClients.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      sellRevenue: revenue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      varTotalPercent: varCostsTotalPercent.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      varTotalCosts: varCostsTotalCosts.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      mainCosts: (Math.round(varCostsTotalCosts + totalCosts)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      mainClearProfit: (Math.round(mainCostsFieldClearProfit * percClearProf)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstSpends: firstFunVariableCosts.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      firstProfit: firstFunProfit.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      mainMoneyFor: mainMoneyFor.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      constCreditPay: constantCostsCreditPay.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      constTotalCosts: totalCosts.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };

    if (disapatchCorrectValues.round !== 0) {
      inputValues.savedNotes.map((item: any) => {
        if (item.whatHappened === 'Убавить') {
          disapatchCorrectValues = {
            ...disapatchCorrectValues,
            mainMoneyFor: (getNormalNumber(disapatchCorrectValues.mainMoneyFor) - getNormalNumber(item.amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
          };
        }
        if (item.whatHappened === 'Добавить') {
          disapatchCorrectValues = {
            ...disapatchCorrectValues,
            mainMoneyFor: (getNormalNumber(disapatchCorrectValues.mainMoneyFor) + getNormalNumber(item.amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
          };
        }
        return neverFunc();
      });
    }

    setInputValues(() => ({
      ...disapatchCorrectValues,
    }));

    dispatch(setEachPlayerData({
      ...disapatchCorrectValues,
    }));
  };

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
    dispatch(setEachPlayerData({
      ...eachUserData,
      savedNotes: [...newSaveNote, newSavedNoteValue],
      mainMoneyFor: (Math.round(totalMoney)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    }));

    handleClose();
  };

  const addClientsRegularPay = (isIncrease: boolean) => {
    if (isIncrease) {
      setInputValues((prev: any) => ({
        ...prev,
        sellRegularPay: String(getNormalNumber(inputValues.sellRegularPay) + 1),
      }));
      dispatch(setEachPlayerData({
        ...eachUserData,
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
      dispatch(setEachPlayerData({
        ...eachUserData,
        sellRegularPay: String(getNormalNumber(inputValues.sellRegularPay) - 1),
      }));
    }
  };

  useEffect(() => {
    // const localInputValues = window.localStorage.getItem('inputValues');
    // dispatch(setEachPlayerData(JSON.parse(localInputValues as string)));
  }, []);

  return (
    <div>
      <Button onClick={() => console.log(eachUserData)}>show</Button>
      <Grid container spacing={1}>
        {/* Start ---------------- РАЗОВАЯ ВОРОНКА --------------- Start */}
        <Grid
          xs={3}
          item
        >
          <InputTitleWrapper>Разовая воронка</InputTitleWrapper>
          <Box sx={{
            border: '1px solid white',
            borderRadius: 2,
            p: 2,
          }}
          >
            {inputList.firstFunnel.map((item) => (
              <MuiInputTextField
                key={item.functionConst}
                sx={styleWithoutArrows}
                disabled={item.disabled}
                value={eachUserData[item.functionConst as keyof DataOfUser]}
                label={item.label}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />

            ))}
          </Box>
        </Grid>
        {/* End ---------------- РАЗОВАЯ ВОРОНКА --------------- End */}

        {/* Start ---------------- ВОРОНКА ПРОДАЖ --------------- Start */}
        <Grid
          xs
          item
        >
          <InputTitleWrapper>Воронка продаж</InputTitleWrapper>
          <Box sx={{
            px: 4,
          }}
          >

            {inputList.sellFunnel_01.map((item) => (

              <MuiInputTextField
                key={item.functionConst}
                sx={styleWithoutArrows}
                disabled={item.disabled}
                label={item.label}
                value={eachUserData[item.functionConst as keyof DataOfUser]}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />
            ))}

            {inputList.sellFunnel_02.map((item) => (
              <MuiInputTextField
                key={item.functionConst}
                sx={styleWithoutArrows}
                disabled={item.disabled}
                label={item.label}
                value={eachUserData[item.functionConst as keyof DataOfUser]}
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
                  fontWeight: 600,
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
                  fontWeight: 600,
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
                key={item.functionConst}
                sx={styleWithoutArrows}
                label={item.label}
                disabled={item.disabled}
                value={eachUserData[item.functionConst as keyof DataOfUser]}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />
            ))}
          </Box>
        </Grid>

        {/* End ---------------- ВОРОНКА ПРОДАЖ --------------- End */}

        {/* Start ---------------- ПЕРЕМЕННЫЕ РАСХОДЫ --------------- Start */}
        <Grid
          xs={2}
          item
        >
          <InputTitleWrapper>Переменные расходы</InputTitleWrapper>
          {inputList.variableCosts.map((item) => (
            <MuiInputTextField
              key={item.functionConst}
              sx={styleWithoutArrows}
              disabled={item.disabled}
              label={item.label}
              value={eachUserData[item.functionConst as keyof DataOfUser]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
          <hr />
          {inputList.mainCostsField.map((item) => (
            <MuiInputTextField
              key={item.functionConst}
              sx={styleWithoutArrows}
              label={item.label}
              disabled={item.disabled}
              value={eachUserData[item.functionConst as keyof DataOfUser]}
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
                fontWeight: 600,
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
                fontWeight: 600,
              }}
              onClick={() => addValueTomainCostsFieldMoneyFor('decrease')}
              variant="contained"
            >
              Убавить
            </Button>
          </Stack>
          {/* End ---------------- ДОБАВИТЬ / УБАВИТЬ - переменные расходы --------------- End */}
          {/* End ---------------- ПЕРЕМЕННЫЕ РАСХОДЫ --------------- End */}
        </Grid>
        <Grid
          xs={2}
          item
        >
          <InputTitleWrapper>Постоянные расходы</InputTitleWrapper>
          {inputList.constantCosts.map((item) => (
            <MuiInputTextField
              key={item.functionConst}
              sx={styleWithoutArrows}
              label={item.label}
              disabled={item.disabled}
              value={eachUserData[item.functionConst as keyof DataOfUser]}
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
