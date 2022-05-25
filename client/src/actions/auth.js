import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "helpers/fetch";

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
      localStorage.setItem('user', JSON.stringify(result.data.user));

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
          error: result.error,
          user: null,
          isLoggedIn: false,
        },
      });
    }
  }
}

export const authLoginAdmin = (values) => {
  return async dispatch => {
    dispatch({
      type: types.authStartLogin
    });
    const result = await fetchWithoutToken("auth/login", values, "POST");
    if (!result.error) {
      if (result.data.user.role.name === "admin") {
        localStorage.setItem('access_token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

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
            error: "No admin",
            user: null,
            isLoggedIn: false,
          },
        });
      }
    } else {
      dispatch({
        type: types.authEndLogin,
        payload: {
          success: false,
          error: result.error,
          user: null,
          isLoggedIn: false,
        },
      });
    }
  }
}

export const authRenewToken = token => {
  return async dispatch => {
    const result = await fetchWithToken("auth/renewtoken", {}, "POST", token);
    if (!result.error) {
      localStorage.setItem('access_token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
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
      localStorage.removeItem('access_token');
      dispatch({
        type: types.authEndLogin,
        payload: {
          success: false,
          error: result.error,
          user: null,
          isLoggedIn: false,
        },
      });
    }
  }
}

export const authUpdateMe = (user, id) => {
  return async dispatch => {
    const result = await fetchWithoutToken("users/" + id, { fieldsToUpdate: user }, "PUT");
    if (!result.error) {
      localStorage.setItem('user', JSON.stringify(result.data.user));
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
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      dispatch({
        type: types.authEndLogin,
        payload: {
          success: false,
          error: result.error,
          user: null,
          isLoggedIn: false,
        },
      });
    }
  }
}

export const authLogout = token => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  return {
    type: types.authEndLogin,
    payload: {
      success: false,
      error: null,
      user: null,
      isLoggedIn: false,
    },
  };  
}