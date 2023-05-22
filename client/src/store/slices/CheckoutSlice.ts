import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  [key: string]: string;
}

const initialState: FormData = {};

const slice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SET_FORM_DATA: (state, action: PayloadAction<FormData>) => {
      const { step, data } = action.payload;
      state[step] = data;
    },

    RESET_FORM_DATA: (state) => {
      state = {};
    },
  },
});

const { reducer, actions } = slice;

export const { SET_FORM_DATA, RESET_FORM_DATA } = actions;

export default reducer;
