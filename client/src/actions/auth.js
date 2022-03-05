import { types } from "../types/types";
import { fetchWithoutToken } from "helpers/fetch";

export const authRegister = (values) => {
  return async dispatch => {
    dispatch({
      type: types.authStartRegister
    });
    const result = await fetchWithoutToken("auth/register", values, "POST");
    if (!result.error) {
      dispatch({
        type: types.authEndRegister,
        payload: {
          success: true,
          error: null
        },
      });
    } else {
      dispatch({
        type: types.authEndRegister,
        payload: {
          success: false,
          error: result.error
        },
      });
    }
  }
}

export const authLogin = (values) => {
  return async dispatch => {
    dispatch({
      type: types.authStartLogin
    });
    const result = await fetchWithoutToken("auth/login", values, "POST");
    if (!result.error) {
      localStorage.setItem('access_token', result.data.token);

      dispatch({
        type: types.authEndLogin,
        payload: {
          success: true,
          error: null,
          user: result.data.user,
          isLoggedIn: true,
        },
      });
    } else {
      dispatch({
        type: types.authEndLogin,
        payload: {
          success: false,
          error: result.data.error,
          user: null,
          isLoggedIn: false,
        },
      });
    }
  }
}