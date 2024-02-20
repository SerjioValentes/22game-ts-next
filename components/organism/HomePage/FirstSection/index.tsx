'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box, Button, ButtonGroup, Card, CardMedia, Dialog, DialogTitle, Divider, Stack, TextField, Typography,
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
  const [dialogValue, setDialogValue] = useState('');
  const [dialogAmount, setDialogAmount] = useState('');
  const [dialogNote, setDialogNote] = useState('');
  // Accordion opening control
  const [isFirstAccOpen, setIsFirstAccOpen] = useState(false);
  const [isCardsAccOpen, setIsCardsAccOpen] = useState(false);
  const [isCubeRandom, setIsCubeRandom] = useState(false);

  const [randomCard, setRandomCard] = useState<string>('');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const eachUserData: any = useAppSelector((state) => state.user.data);
  const isMobileSize = useWindowSize();

  const textFieldOnChange = (value: string, functionConst: string) => {
    let disapatchCorrectValues = {
      ...eachUserData,
      [functionConst]: value.replaceAll(' ', '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };

    if (functionConst === 'nothing') {
      disapatchCorrectValues = {
        ...eachUserData,
        firstShows: '',
        firstCv1: '',
        firstCv2: '',
        firstBill: '',
      };
    }

    // Constants <<< ----------------------------------------------------
    const shows = getNormalNumber(disapatchCorrectValues.firstShows); // Показы - Разовая воронка
    const firstCv1 = getNormalNumber(disapatchCorrectValues.firstCv1); // CV1 - Разовая воронка
    const firstCv2 = getNormalNumber(disapatchCorrectValues.firstCv2); // CV2 - Разовая воронка
    let firstSells = getNormalNumber(disapatchCorrectValues.firstSells); // Продажи - Разовая воронка
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

    // Calculations <<< ----------------------------------------------------
    const firstApplications = Math.round((shows * firstCv1) / 100); // Заявки - Разовая воронка
    const applications = Math.round((sellCV1 * sellShows) / 100); // Заявки - Воронка продаж

    if (functionConst === 'shows' || functionConst === 'firstCv1' || functionConst === 'firstCv2' || functionConst === 'firstApplications') {
      firstSells = Math.round((firstCv2 * firstApplications) / 100); // Продажи - Разовая воронка
    }

    if (functionConst === 'firstSells') {
      firstSells = getNormalNumber(value.replaceAll(' ', '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')); // Продажи - Разовая воронка
    }

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

    const mainMoneyFor = Math.round(mainCostsFieldClearProfit * percClearProf + firstFunProfit); // Денег на расч / счете - Основное поле

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

  const getRandomInt = (max: any) => Math.floor(Math.random() * max) + 1;

  const handleChooseCard = (card: string) => {
    const randCard = getRandomInt(Object.keys(card).length);
    setRandomCard(`/assets/web/${card}/cards/${randCard}.jpg`);
  };

  useEffect(() => {
    textFieldOnChange('', 'nothing');
  }, [eachUserData?.round]);

  // ------------------------------- Random number for Cube calculation
  const getRandomNumber = () => setRandomNumber(Math.floor(Math.random() * 6 + 1));

  return (
    <Stack>
      <Stack
        direction={isMobileSize ? 'column' : 'row'}
        spacing={2}
      >
        {/* Start ---------------- РАЗОВАЯ ВОРОНКА --------------- Start */}
        <Stack minWidth={400} maxWidth={400}>
          <Accordion
            onChange={() => setIsFirstAccOpen(!isFirstAccOpen)}
            expanded={isFirstAccOpen}
            sx={{
              borderRadius: 1,
              backgroundColor: 'rgba(57, 105, 125, 0.5)',
              border: '1px solid white',
            }}
          >
            <AccordionSummary>
              <InputTitleWrapper>Разовая воронка</InputTitleWrapper>
            </AccordionSummary>
            <AccordionDetails>

              <Box sx={{
                borderRadius: 2,
              }}
              >
                {inputList.firstFunnel.map((item) => (
                  <MuiInputTextField
                    key={item.functionConst}
                    sx={styleWithoutArrows}
                    disabled={item.disabled}
                    value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
                    label={item.label}
                    onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
                  />

                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* End ---------------- РАЗОВАЯ ВОРОНКА --------------- End */}
          <Accordion
            onChange={() => setIsCardsAccOpen(!isCardsAccOpen)}
            expanded={isCardsAccOpen}
            sx={{
              borderRadius: 1,
              backgroundColor: 'rgba(57, 105, 125, 0.5)',
              mt: 2,
              border: '1px solid white',
            }}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <InputTitleWrapper>Карточки</InputTitleWrapper>
            </AccordionSummary>
            <AccordionDetails>

              <Box sx={{
                borderRadius: 2,
              }}
              >
                <Stack>

                  <ButtonGroup
                    orientation="vertical"
                    variant="contained"
                    fullWidth
                  >
                    <Button
                      sx={{
                        backgroundColor: randomCard.split('/').includes('brand') ? '#9a2a3b' : '#fff',
                        color: randomCard.split('/').includes('brand') ? '#fff' : '#000',
                        fontWeight: 'bold',
                      }}
                      variant="contained"
                      onClick={() => handleChooseCard('brand')}
                    >
                      Бренд
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: randomCard.split('/').includes('finance') ? '#295742' : '#fff',
                        color: randomCard.split('/').includes('finance') ? '#fff' : '#000',
                        fontWeight: 'bold',
                      }}
                      variant="contained"
                      onClick={() => handleChooseCard('finance')}
                    >
                      Финансы

                    </Button>
                    <Button
                      sx={{
                        backgroundColor: randomCard.split('/').includes('marketing') ? '#422e67' : '#fff',
                        color: randomCard.split('/').includes('marketing') ? '#fff' : '#000',
                        fontWeight: 'bold',
                      }}
                      variant="contained"
                      onClick={() => handleChooseCard('marketing')}
                    >
                      Маркетинг

                    </Button>
                    <Button
                      sx={{
                        backgroundColor: randomCard.split('/').includes('products') ? '#233c4f' : '#fff',
                        color: randomCard.split('/').includes('products') ? '#fff' : '#000',
                        fontWeight: 'bold',
                      }}
                      variant="contained"
                      onClick={() => handleChooseCard('products')}
                    >
                      Продукт

                    </Button>
                    <Button
                      sx={{
                        backgroundColor: randomCard.split('/').includes('sells') ? '#852c2f' : '#fff',
                        color: randomCard.split('/').includes('sells') ? '#fff' : '#000',
                        fontWeight: 'bold',
                      }}
                      variant="contained"
                      onClick={() => handleChooseCard('sells')}
                    >
                      Продажи

                    </Button>
                  </ButtonGroup>
                  <Box>
                    <Card sx={{
                      // maxWidth: 200,
                      mx: 'auto',
                      mt: 2,
                    }}
                    >
                      {randomCard

    && (
    <CardMedia
      sx={{ height: '550px' }}
      image={randomCard}
      title={randomCard}
    />
    )}
                    </Card>
                  </Box>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Start ---------------- Random Cube Accordion --------------- Start */}
          <Accordion
            onChange={() => setIsCubeRandom(!isCubeRandom)}
            expanded={isCubeRandom}
            sx={{
              borderRadius: 1,
              backgroundColor: 'rgba(57, 105, 125, 0.5)',
              mt: 2,
              border: '1px solid white',
            }}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <InputTitleWrapper>Кубик</InputTitleWrapper>
            </AccordionSummary>
            <AccordionDetails sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            >
              <Typography variant="h5" color="#fff">
                {randomNumber && randomNumber}
              </Typography>
              <Button variant="contained" onClick={getRandomNumber}>Бросить кубик</Button>
            </AccordionDetails>
          </Accordion>
          {/* End ---------------- Random Cube Accordion --------------- End */}

        </Stack>

        {/* Start ---------------- ВОРОНКА ПРОДАЖ --------------- Start */}
        <Stack
          sx={{
            px: isMobileSize ? 0 : 6,
          }}
        >
          <Stack maxWidth={200}>
            <Stack pb={2}>
              <InputTitleWrapper>Воронка продаж</InputTitleWrapper>
            </Stack>
            {inputList.sellFunnel_01.map((item) => (
              <MuiInputTextField
                key={item.functionConst}
                sx={styleWithoutArrows}
                disabled={item.disabled}
                label={item.label}
                value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />
            ))}

            {inputList.sellFunnel_02.map((item) => (
              <MuiInputTextField
                key={item.functionConst}
                sx={styleWithoutArrows}
                disabled={item.disabled}
                label={item.label}
                value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
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
                color="secondary"
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
                color="secondary"
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
                value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
                onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
              />
            ))}
          </Stack>

        </Stack>

        {/* End ---------------- ВОРОНКА ПРОДАЖ --------------- End */}

        {/* Start ---------------- ПЕРЕМЕННЫЕ РАСХОДЫ --------------- Start */}
        <Stack maxWidth={220}>
          <Stack pb={2}>
            <InputTitleWrapper>Переменные расходы</InputTitleWrapper>
          </Stack>
          {inputList.variableCosts.map((item) => (
            <MuiInputTextField
              key={item.functionConst}
              sx={styleWithoutArrows}
              disabled={item.disabled}
              label={item.label}
              value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
              onChange={(e) => textFieldOnChange(e.target.value, item.functionConst)}
            />
          ))}
          <Divider sx={{ backgroundColor: 'white', my: 2 }} />
          <div>

            {inputList.mainCostsField.map((item) => (
              <MuiInputTextField
                key={item.functionConst}
                sx={styleWithoutArrows}
                label={item.label}
                disabled={item.disabled}
                value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
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
            <Typography color="white" fontSize={15}>Денег на р/с:</Typography>
            <Typography color="white" fontSize={15}>
              {eachUserData?.mainMoneyForAll ? eachUserData.mainMoneyForAll : '0'}
            </Typography>
          </Stack>
          {/* Start ---------------- ДОБАВИТЬ/УБАВИТЬ - переменные расходы --------------- Start */}
          <Stack
            display="flex"
            direction="row"
            spacing={2}
          >

            <Button
              color="secondary"
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
              color="secondary"
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
        <Stack maxWidth={220}>
          <Stack pb={2}>
            <InputTitleWrapper>Постоянные расходы</InputTitleWrapper>
          </Stack>
          {inputList.constantCosts.map((item) => (
            <MuiInputTextField
              key={item.functionConst}
              sx={styleWithoutArrows}
              label={item.label}
              disabled={item.disabled}
              value={eachUserData && eachUserData[item.functionConst as keyof DataOfUser]}
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
