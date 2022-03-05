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