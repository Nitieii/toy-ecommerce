import jwtDecode, { JwtPayload } from "jwt-decode";
import { verify, sign } from "jsonwebtoken";

// ---------------------------------------------------------------------

interface DecodedToken extends JwtPayload {
  id: string;
  exp: number;
}

const isValidToken = (accessToken: string) => {
  if (!accessToken) return false;

  const decodedToken: Record<string, any> = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
};

const handleTokenExpired = (exp: number): void => {
  let expiredTimer: number | undefined = undefined;

  window.clearTimeout(expiredTimer);

  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeft = (exp - currentTime) * 1000;

  expiredTimer = window.setTimeout(() => {
    console.log("expired token");
    localStorage.removeItem("accessToken");
  }, timeLeft);
};

const getIdByToken = (accessToken: string): string | false => {
  const decodedToken = jwtDecode<DecodedToken>(accessToken);

  const { id } = decodedToken;

  if (!id) return false;

  return id;
};

const setSession = (accessToken: string): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    const { exp } = jwtDecode<DecodedToken>(accessToken);

    handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
  }
};

export { isValidToken, setSession, verify, sign, getIdByToken };
