import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  name: string;
  email: string;
  token: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
}

interface UserState {
  user: User | null;
  loadingUser: boolean;
}

const initialState: UserState = {
  user: null,
  loadingUser: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    LOGOUT_USER: (state) => {
      state.user = initialState.user;
    },

    HANDLE_LOADING_USER: (state, action: PayloadAction<boolean>) => {
      state.loadingUser = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_USER, LOGOUT_USER, HANDLE_LOADING_USER } = actions;

export type { UserState, User };

export default reducer;
