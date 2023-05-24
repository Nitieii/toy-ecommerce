import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  name: string;
  email: string;
  is_admin: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
}

interface UserState {
  user: User | null;
  users: User[];
  currentPage: number;
  totalLength: number;
  totalPages: number;
  loadingUser: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  users: [],
  currentPage: 1,
  totalLength: 0,
  totalPages: 0,
  loadingUser: false,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action: PayloadAction<User | null>) => {
      console.log('SET_USER', action.payload);
      state.user = action.payload;
    },

    SET_USERS: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    SET_TOTAL_LENGTH: (state, action: PayloadAction<number>) => {
      state.totalLength = action.payload;
    },

    SET_TOTAL_PAGES: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    SET_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    HANDLE_LOADING_USER: (state, action: PayloadAction<boolean>) => {
      state.loadingUser = action.payload;
    },

    HANDLE_AUTHENTICATED: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const {
  HANDLE_AUTHENTICATED,
  SET_USER,
  SET_USERS,
  SET_TOTAL_LENGTH,
  SET_TOTAL_PAGES,
  SET_CURRENT_PAGE,
  HANDLE_LOADING_USER,
} = actions;

export type { UserState, User };

export default reducer;
