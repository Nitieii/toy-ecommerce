// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { NodeJS } from 'node:types';

const handleTokenExpired = (exp: number): NodeJS.Timeout | undefined => {
  if (!exp) return;

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeft = exp - currentTime * 1000;

  if (timeLeft < 0) {
    // empty local storage
    localStorage.clear();

    return;
  }

  return setTimeout(() => {
    localStorage.removeItem('access_token');

    alert('Your session has expired. Please log in again.');

    window.location.href = '/login';
  }, timeLeft);
};

export default handleTokenExpired;
