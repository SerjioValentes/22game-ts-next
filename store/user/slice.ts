'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface DataOfUser {
  round: number,
  firstShows: string,
  firstCv1: string,
  savedNotes: [],
  firstApplications: string,
  firstCv2: string,
  firstBill: string,
  firstSells: string,
  firstRevenue: string,
  firstSpends: string,
  firstProfit: string,
  sellShows: string,
  sellCV1: string,
  sellApplications: string,
  sellCV2: string,
  sellSells: string,
  sellCV3: string,
  sellConstClients: string,
  sellTotalSells: string,
  sellRegularPay: string,
  sellBill: string,
  sellRevenue: string,
  varSells: string,
  varCosts: string,
  varMarketing: string,
  varTaxes: string,
  varTotalPercent: string,
  varTotalCosts: string,
  constFotOwner: string,
  constFot: string,
  constCreditAll: string,
  constCreditPay: string,
  constTotalCosts: string,
  mainCosts: string,
  PercentClearProfit: string,
  mainClearProfit: string,
  mainMoneyFor: string,
  mainPersonalCapital: string,
  constAddField: string,
}
interface UserInitialState {
  data: DataOfUser,
  savedNotes: any,
  allRoundsData: any,
}

const initialState: UserInitialState = {
  savedNotes: [],
  allRoundsData: [],
  data: {
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
    constAddField: '',
  },
};

export const userSlice = createSlice({
  name: 'UserData',
  initialState,
  reducers: {
    setEachPlayerData(state, action) {
      state.data = action.payload;
    },
    setAllRoundsData(state, action) {
      state.allRoundsData = action.payload;
    },
    setSavedNotes(state, action) {
      state.savedNotes = action.payload;
    },
  },
});
export const { setEachPlayerData, setAllRoundsData, setSavedNotes } = userSlice.actions;
export default userSlice.reducer;
