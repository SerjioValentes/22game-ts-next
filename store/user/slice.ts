'use client';

import { createSlice } from '@reduxjs/toolkit';

interface UserInitialState {
  data: any,
  allRoundsData: any,
  savedNotes: any,
}

const initialState: UserInitialState = {
  savedNotes: [],
  allRoundsData: [],
  data: {
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
  },
};

export const userSlice = createSlice({
  name: 'data',
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
