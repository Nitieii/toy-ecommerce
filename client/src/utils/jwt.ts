// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { NodeJS } from 'node:types';

const handleTokenExpired = (exp: number): NodeJS.Timeout | undefined => {
  // const currentTime = Math.floor(Date.now() / 1000);
  // const timeLeft = exp - currentTime * 1000;
  //
  // return setTimeout(() => {
  //   localStorage.removeItem('access_token');
  //
  //   alert('Your session has expired. Please log in again.');
  //
  //   window.location.href = '/login';
  // }, timeLeft);
};

export default handleTokenExpired;
