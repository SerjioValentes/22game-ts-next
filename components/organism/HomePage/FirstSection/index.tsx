'use client';

import {
  Box, Button, Dialog, DialogTitle, Divider, Grid, Stack, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style.scss';
import MuiInputTextField from '@/components/atom/Input';
import inputList from '@/helpers/utils/inputs';
import { useAppDispatch } from '@/store';
import { setEachPlayerData, DataOfUser } from '@/store/user/slice';
import useAppSelector from '@/hooks/useAppSelector';
import { getNormalNumber } from '@/helpers/utils/restyling';
import useWindowSize from '@/hooks/useWindowSize';
import { InputTitleWrapper, styleWithoutArrows } from './styles';

const FirstSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  // const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [dialogValue, setDialogValue] = useState('');
  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');

  const dispatch = useAppDispatch();
  const eachUserData: any = useAppSelector((state) => state.user.data);
  const isMobileSize = useWindowSize();
  // const neverFunc = () => {};

  const textFieldOnChange = (value: string, functionConst: string) => {
    let disapatchCorrectValues = {
      ...eachUserData,
      [functionConst]: value.replaceAll(' ', '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };

    if (functionConst === 'nothing') {
      const localEachUserData = window.localStorage.getItem('inputValues');
      if (localEachUserData) {
        disapatchCorrectValues = {
          ...JSON.parse(localEachUserData as string),
          firstShows: '',
          firstCv1: '',
          firstCv2: '',
          firstBill: '',
        };
      }
    }

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
    // let mainMoneyFor = getNormalNumber(disapatchCorrectValues.mainMoneyFor); // Денег на расч / счете - Основное поле
    // const mainMoneyForAll = getNormalNumber(disapatchCorrectValues.mainMoneyForAll); // Денег на расч / счете подсчитанное значени - Основное поле

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

    // if (disapatchCorrectValues.round !== 0) {
    const mainMoneyFor = Math.round(mainCostsFieldClearProfit * percClearProf + firstFunProfit); // Денег на расч / счете - Основное поле
    // }

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
    const moneyFor = eachUserData.mainMoneyForAll;
    const newSaveNote: any = eachUserData.savedNotes;
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
      savedNotes: [...newSaveNote, newSavedNoteValue],
      mainMoneyForAll: (Math.round(totalMoney)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    }));

    handleClose();
  };

  const addClientsRegularPay = (isIncrease: boolean) => {
    if (isIncrease) {
      dispatch(setEachPlayerData({
        ...eachUserData,
        sellRegularPay: String(getNormalNumber(eachUserData.sellRegularPay) + 1),
      }));
    }

    if (eachUserData.sellRegularPay === '0') {
      return;
    }

    if (!isIncrease) {
      dispatch(setEachPlayerData({
        ...eachUserData,
        sellRegularPay: String(getNormalNumber(eachUserData.sellRegularPay) - 1),
      }));
    }
  };

  useEffect(() => {
  // const localEachUserData = window.localStorage.getItem('inputValues');
  // if (localEachUserData) {
  //   dispatch(setEachPlayerData(JSON.parse(localEachUserData as string)));
  // }
    // if (!isFirstLoad) {
    textFieldOnChange('', 'nothing');
    // }
    // setIsFirstLoad(false);
  }, [eachUserData.round]);

  return (
    <Stack>
      <Stack
        direction={isMobileSize ? 'column' : 'row'}
        spacing={2}
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {/* Start ---------------- РАЗОВАЯ ВОРОНКА --------------- Start */}
        <Stack minWidth={250}>
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
        </Stack>
        {/* End ---------------- РАЗОВАЯ ВОРОНКА --------------- End */}

        {/* Start ---------------- ВОРОНКА ПРОДАЖ --------------- Start */}
        <Stack
          sx={{
            px: 6,
          }}
        >
          <Stack minWidth={250}>
            <InputTitleWrapper>Воронка продаж</InputTitleWrapper>
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
          </Stack>

        </Stack>

        {/* End ---------------- ВОРОНКА ПРОДАЖ --------------- End */}

        {/* Start ---------------- ПЕРЕМЕННЫЕ РАСХОДЫ --------------- Start */}
        <Stack minWidth={250}>
          <div>

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
          </div>
          <Divider sx={{ backgroundColor: 'white', my: 2 }} />
          <div>

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

          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              mb: 1,
            }}
          >
            <Typography color="white" fontSize={15}>На счете</Typography>
            <Typography color="white" fontSize={15}>
              {eachUserData.mainMoneyForAll ? eachUserData.mainMoneyForAll : '0'}
            </Typography>
          </Stack>
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
        </Stack>
        <Stack minWidth={250}>
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
        </Stack>
      </Stack>
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
    </Stack>
  );
};

export default FirstSection;
