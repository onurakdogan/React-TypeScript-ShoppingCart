import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import useCustomHook from '../../app/customHook';

export interface productState {
  value: any;
  favorites: any;
  cart: any;
  filter: any
  darkMode: true | false;
  openModal: true | false;
  selectedItem:any;
  status: true | 'loading' | 'failed';
}

const initialState: productState = {
  value: [],
  favorites: [],
  cart: [],
  filter: [],
  darkMode: false,
  openModal:false,
  selectedItem:0,
  status: 'loading',
};

export const getData = createAsyncThunk(
  'product/fetchCount',
  useCustomHook
);

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    modal:(state, action: PayloadAction<any>) => {
      state.openModal = action.payload.modalVal;
      state.selectedItem = action.payload.item
    },
    theme: (state, action: PayloadAction<any>) => {
      state.darkMode = action.payload;
    },
    productFilter: (state, action: PayloadAction<any>) => {
      state.filter = state.value.filter((item: any) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      if (action.payload == "") {
        state.filter = [];
      }
    },
    priceFilter: (state, action: PayloadAction<any>) => {
      state.filter = state.value.sort((a: any, b: any) => {
        return action.payload == "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
    },
    ratingFilter: (state, action: PayloadAction<any>) => {
      state.filter = state.value.sort((a: any, b: any) => {
        return action.payload == "lowToHigh" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
      });
    },
    increment: (state, action: PayloadAction<any>) => {
      const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
      existingItem && existingItem.qty++
    },
    decrement: (state, action: PayloadAction<any>) => {
      const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
      existingItem.qty--
      if (existingItem.qty == 0) {
        state.cart = state.cart.filter((item: any) => item.id !== action.payload.id)
      }
    },
    addFavorite: (state, action: PayloadAction<any>) => {
      const existingItem = state.favorites.find((item: any) => item.id === action.payload.id);
      !existingItem && state.favorites.push(action.payload);
    },
    addCart: (state, action: PayloadAction<any>) => {

      const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
      existingItem ? existingItem.qty++ : state.cart.push({ ...action.payload, qty: 1 });
    },
    deleteProduct: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.filter((item: any) => item.id !== action.payload)
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = true;
        state.value = action.payload;
      })
      .addCase(getData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement,modal,
  deleteProduct, addFavorite, addCart, theme, productFilter, priceFilter, ratingFilter } = productSlice.actions;

export const selectCount = (state: RootState) => state.productReducer.value
export const myTheme = (state: RootState) => state.productReducer.darkMode;
export const openModal = (state: RootState) => state.productReducer.openModal;
export const myFavorites = (state: RootState) => state.productReducer.favorites;
export const selectedItem = (state: RootState) => state.productReducer.selectedItem; 
export const myCart = (state: RootState) => state.productReducer.cart;
export const myFilter = (state: RootState) => state.productReducer.filter;
export const statusCount = (state: RootState) => state.productReducer.status;

export default productSlice.reducer;
