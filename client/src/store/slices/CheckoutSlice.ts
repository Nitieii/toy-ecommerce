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
    // disable eslint for this line
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RESET_FORM_DATA: () => {
      return initialState;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_FORM_DATA, RESET_FORM_DATA } = actions;

export default reducer;
