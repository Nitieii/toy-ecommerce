import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API, POST_API } from '../constants/api.js';

import {
  SET_USER,
  HANDLE_LOADING_USER,
  HANDLE_AUTHENTICATED,
} from '../store/slices/UserSlice.js';

import axios from '../utils/axios.js';

const useUser = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useAlert();

  const { user, loadingUser, isAuthenticated } = useSelector(
    (state: any) => state.user
  );

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
      localStorage.setItem('access_token', data.token.access_token);

      // Set refresh token to local storage
      localStorage.setItem('refresh_token', data.token.refresh_token);

      // Set expires at to local storage
      convertExpiresInToExpiresAt(data.token.expires_in);

      alert('Login successfully!');

      const redirectPath = localStorage.getItem('redirect_url');

      if (redirectPath) {
        localStorage.removeItem('redirect_url');
        return window.location.replace(redirectPath);
      }

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

      // Set user to local storage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Set token to local storage
      localStorage.setItem('access_token', data.token.access_token);

      // Set refresh token to local storage
      localStorage.setItem('refresh_token', data.token.refresh_token);

      // Set expires at to local storage
      convertExpiresInToExpiresAt(data.token.expires_in);

      const redirectPath = localStorage.getItem('redirect_url');

      if (redirectPath) {
        localStorage.removeItem('redirect_url');
        return window.location.replace(redirectPath);
      }

      return window.location.replace('/');
    } catch (error: any) {
      dispatch(HANDLE_LOADING_USER(false));

      return alert(error.message);
    }
  };

  const handleAuthenticated = () => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      return dispatch(HANDLE_AUTHENTICATED(true));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');

    dispatch(SET_USER(null));
    dispatch(HANDLE_AUTHENTICATED(false));

    return window.location.replace('/login');
  };

  const convertExpiresInToExpiresAt = (exp: string): void => {
    const currentDate = new Date();
    const expiresIn = parseInt(exp);
    const unit = exp.slice(-1);

    let expiresAt: number;
    switch (unit) {
      case 's':
        expiresAt = currentDate.setSeconds(
          currentDate.getSeconds() + expiresIn
        );
        break;
      case 'm':
        expiresAt = currentDate.setMinutes(
          currentDate.getMinutes() + expiresIn
        );
        break;
      case 'h':
        expiresAt = currentDate.setHours(currentDate.getHours() + expiresIn);
        break;
      case 'd':
        expiresAt = currentDate.setDate(currentDate.getDate() + expiresIn);
        break;
      case 'w':
        expiresAt = currentDate.setDate(currentDate.getDate() + expiresIn * 7);
        break;
      default:
        throw new Error('Invalid expires in');
    }

    localStorage.setItem('expires_at', expiresAt.toString());
  };

  return {
    user,
    loadingUser,
    isAuthenticated,
    handleGetUser,
    handleLogin,
    handleRegister,
    handleAuthenticated,
    handleLogout,
  };
};

export default useUser;
