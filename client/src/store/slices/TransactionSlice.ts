import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  paymentMethod: string;
  status: string;
  timestamp: string;
  orderId:string;
}

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  currentPage: number;
  totalPage: number;
  totalLength: number;
  totalTransaction: number;
  loadingTransaction: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  currentPage: 1,
  totalLength: 0,
  totalPage: 0,
  totalTransaction: 0,
  loadingTransaction: false,
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    SET_TRANSACTIONS: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    SET_TRANSACTION: (state, action: PayloadAction<Transaction>) => {
      state.transaction = action.payload;
    },
    SET_TOTAL_PAGE: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },

    SET_TOTAL_LENGTH: (state, action: PayloadAction<number>) => {
      state.totalLength = action.payload;
    },

    SET_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loadingTransaction = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export type { Transaction, TransactionState };

export const {
    SET_TRANSACTIONS,
    SET_TRANSACTION,
    SET_TOTAL_PAGE,
    SET_TOTAL_LENGTH,
    SET_CURRENT_PAGE,
    HANDLE_LOADING,
} = actions;

export default reducer;
