import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API, POST_API } from '../constants/api.js';

import { SET_USER, HANDLE_LOADING_USER } from '../store/slices/UserSlice.js';

import axios from '../utils/axios.js';

const useUser = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useAlert();

  const { user, loadingUser } = useSelector((state: any) => state.user);

  const handleGetUser = async () => {
    try {
      dispatch(HANDLE_LOADING_USER(true));

      const { data } = await axios.get(GET_API('', 1).GET_USER);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING_USER(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      dispatch(SET_USER(data.user));
      dispatch(HANDLE_LOADING_USER(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING_USER(false));

      return enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      dispatch(HANDLE_LOADING_USER(true));

      const { data } = await axios.post(POST_API().LOGIN, { email, password });

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING_USER(false));
        return alert(data.message);
      }

      dispatch(SET_USER(data.user));
      dispatch(HANDLE_LOADING_USER(false));

      // Set user to local storage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Set token to local storage
      localStorage.setItem('access_token', data.access_token);

      // Set refresh token to local storage
      localStorage.setItem('refresh_token', data.refresh_token);

      // calculate the expires at from expires_in
      const expiresAt = new Date().getTime() + data.expires_in * 1000;

      // Set expires at to local storage
      localStorage.setItem('expires_at', expiresAt.toString());

      alert('Login successfully!');

      return window.location.replace('/');
    } catch (error: any) {
      dispatch(HANDLE_LOADING_USER(false));

      return alert(error.message);
    }
  };

  const handleRegister = async (
    fullname: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch(HANDLE_LOADING_USER(true));

      const { data } = await axios.post(POST_API().SIGNUP, {
        fullname,
        email,
        password,
      });

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING_USER(false));
        return alert(data.message);
      }

      dispatch(SET_USER(data.user));
      dispatch(HANDLE_LOADING_USER(false));

      alert('Register successfully!');

      return window.location.replace('/');
    } catch (error: any) {
      dispatch(HANDLE_LOADING_USER(false));

      return alert(error.message);
    }
  };

  return {
    user,
    loadingUser,
    handleGetUser,
    handleLogin,
    handleRegister,
  };
};

export default useUser;
