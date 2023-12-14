'use client';

import { createSlice } from '@reduxjs/toolkit';

interface UserInitialState {
  brand: {}[];
  finance: {}[];
  marketing: {}[];
  products: {}[];
  sells: {}[];
}

const initialState: UserInitialState = {
  products: [
    {
      id: 1,
      url: 'assets/web/products/cards/1.jpg',
    },
    {
      id: 2,
      url: 'assets/web/products/cards/2.jpg',
    },
    {
      id: 3,
      url: 'assets/web/products/cards/3.jpg',
    },
    {
      id: 4,
      url: 'assets/web/products/cards/4.jpg',
    },
    {
      id: 5,
      url: 'assets/web/products/cards/5.jpg',
    },
    {
      id: 6,
      url: 'assets/web/products/cards/6.jpg',
    },
    {
      id: 7,
      url: 'assets/web/products/cards/7.jpg',
    },
    {
      id: 8,
      url: 'assets/web/products/cards/8.jpg',
    },
    {
      id: 9,
      url: 'assets/web/products/cards/9.jpg',
    },
    {
      id: 10,
      url: 'assets/web/products/cards/10.jpg',
    },
    {
      id: 11,
      url: 'assets/web/products/cards/11.jpg',
    },
    {
      id: 12,
      url: 'assets/web/products/cards/12.jpg',
    },
    {
      id: 13,
      url: 'assets/web/products/cards/13.jpg',
    },
    {
      id: 14,
      url: 'assets/web/products/cards/14.jpg',
    },
    {
      id: 15,
      url: 'assets/web/products/cards/15.jpg',
    },
    {
      id: 16,
      url: 'assets/web/products/cards/16.jpg',
    },
    {
      id: 17,
      url: 'assets/web/products/cards/17.jpg',
    },
    {
      id: 18,
      url: 'assets/web/products/cards/18.jpg',
    },
  ],
  sells: [
    {
      id: 1,
      url: 'assets/web/sells/cards/1.jpg',
    },
    {
      id: 2,
      url: 'assets/web/sells/cards/2.jpg',
    },
    {
      id: 3,
      url: 'assets/web/sells/cards/3.jpg',
    },
    {
      id: 4,
      url: 'assets/web/sells/cards/4.jpg',
    },
    {
      id: 5,
      url: 'assets/web/sells/cards/5.jpg',
    },
    {
      id: 6,
      url: 'assets/web/sells/cards/6.jpg',
    },
    {
      id: 7,
      url: 'assets/web/sells/cards/7.jpg',
    },
    {
      id: 8,
      url: 'assets/web/sells/cards/8.jpg',
    },
    {
      id: 9,
      url: 'assets/web/sells/cards/9.jpg',
    },
    {
      id: 10,
      url: 'assets/web/sells/cards/10.jpg',
    },
    {
      id: 11,
      url: 'assets/web/products/cards/11.jpg',
    },
    {
      id: 12,
      url: 'assets/web/products/cards/12.jpg',
    },
    {
      id: 13,
      url: 'assets/web/products/cards/13.jpg',
    },
    {
      id: 14,
      url: 'assets/web/products/cards/14.jpg',
    },
    {
      id: 15,
      url: 'assets/web/products/cards/15.jpg',
    },
    {
      id: 16,
      url: 'assets/web/products/cards/16.jpg',
    },
    {
      id: 17,
      url: 'assets/web/products/cards/17.jpg',
    },
    {
      id: 18,
      url: 'assets/web/products/cards/18.jpg',
    },
  ],
  finance: [
    {
      id: 1,
      url: 'assets/web/finance/cards/1.jpg',
    },
    {
      id: 2,
      url: 'assets/web/finance/cards/2.jpg',
    },
    {
      id: 3,
      url: 'assets/web/finance/cards/3.jpg',
    },
    {
      id: 4,
      url: 'assets/web/finance/cards/4.jpg',
    },
    {
      id: 5,
      url: 'assets/web/finance/cards/5.jpg',
    },
    {
      id: 6,
      url: 'assets/web/finance/cards/6.jpg',
    },
    {
      id: 7,
      url: 'assets/web/finance/cards/7.jpg',
    },
    {
      id: 8,
      url: 'assets/web/finance/cards/8.jpg',
    },
    {
      id: 9,
      url: 'assets/web/finance/cards/9.jpg',
    },
    {
      id: 10,
      url: 'assets/web/finance/cards/10.jpg',
    },
    {
      id: 11,
      url: 'assets/web/products/cards/11.jpg',
    },
    {
      id: 12,
      url: 'assets/web/products/cards/12.jpg',
    },
    {
      id: 13,
      url: 'assets/web/products/cards/13.jpg',
    },
    {
      id: 14,
      url: 'assets/web/products/cards/14.jpg',
    },
    {
      id: 15,
      url: 'assets/web/products/cards/15.jpg',
    },
    {
      id: 16,
      url: 'assets/web/products/cards/16.jpg',
    },
    {
      id: 17,
      url: 'assets/web/products/cards/17.jpg',
    },
    {
      id: 18,
      url: 'assets/web/products/cards/18.jpg',
    },
  ],
  marketing: [
    {
      id: 1,
      url: 'assets/web/marketing/cards/1.jpg',
    },
    {
      id: 2,
      url: 'assets/web/marketing/cards/2.jpg',
    },
    {
      id: 3,
      url: 'assets/web/marketing/cards/3.jpg',
    },
    {
      id: 4,
      url: 'assets/web/marketing/cards/4.jpg',
    },
    {
      id: 5,
      url: 'assets/web/marketing/cards/5.jpg',
    },
    {
      id: 6,
      url: 'assets/web/marketing/cards/6.jpg',
    },
    {
      id: 7,
      url: 'assets/web/marketing/cards/7.jpg',
    },
    {
      id: 8,
      url: 'assets/web/marketing/cards/8.jpg',
    },
    {
      id: 9,
      url: 'assets/web/marketing/cards/9.jpg',
    },
    {
      id: 10,
      url: 'assets/web/marketing/cards/10.jpg',
    },
    {
      id: 11,
      url: 'assets/web/products/cards/11.jpg',
    },
    {
      id: 12,
      url: 'assets/web/products/cards/12.jpg',
    },
    {
      id: 13,
      url: 'assets/web/products/cards/13.jpg',
    },
    {
      id: 14,
      url: 'assets/web/products/cards/14.jpg',
    },
    {
      id: 15,
      url: 'assets/web/products/cards/15.jpg',
    },
    {
      id: 16,
      url: 'assets/web/products/cards/16.jpg',
    },
    {
      id: 17,
      url: 'assets/web/products/cards/17.jpg',
    },
    {
      id: 18,
      url: 'assets/web/products/cards/18.jpg',
    },
  ],
  brand: [
    {
      id: 1,
      url: 'assets/web/brand/cards/1.jpg',
    },
    {
      id: 2,
      url: 'assets/web/brand/cards/2.jpg',
    },
    {
      id: 3,
      url: 'assets/web/brand/cards/3.jpg',
    },
    {
      id: 4,
      url: 'assets/web/brand/cards/4.jpg',
    },
    {
      id: 5,
      url: 'assets/web/brand/cards/5.jpg',
    },
    {
      id: 6,
      url: 'assets/web/brand/cards/6.jpg',
    },
    {
      id: 7,
      url: 'assets/web/brand/cards/7.jpg',
    },
    {
      id: 8,
      url: 'assets/web/brand/cards/8.jpg',
    },
    {
      id: 9,
      url: 'assets/web/brand/cards/9.jpg',
    },
    {
      id: 10,
      url: 'assets/web/brand/cards/10.jpg',
    },
    {
      id: 11,
      url: 'assets/web/products/cards/11.jpg',
    },
    {
      id: 12,
      url: 'assets/web/products/cards/12.jpg',
    },
    {
      id: 13,
      url: 'assets/web/products/cards/13.jpg',
    },
    {
      id: 14,
      url: 'assets/web/products/cards/14.jpg',
    },
    {
      id: 15,
      url: 'assets/web/products/cards/15.jpg',
    },
    {
      id: 16,
      url: 'assets/web/products/cards/16.jpg',
    },
    {
      id: 17,
      url: 'assets/web/products/cards/17.jpg',
    },
    {
      id: 18,
      url: 'assets/web/products/cards/18.jpg',
    },
  ],
};

export const userSlice = createSlice({
  name: 'UserData',
  initialState,
  reducers: {
    // setData: (state, action) => {
    //   state.data = action.payload;
    // },
  },
});
// export const {
// } = userSlice.actions;
export default userSlice.reducer;
