import { types } from "../types/types";

const initialState = {
  isLoggedIn: false,
  user: {},
  isRegistered: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authRegister:
      return {
        ...state,
        isRegistered: true
      };

    case types.authLogout:
      return {
        checking: false,
      };

    default:
      return state;
  }
};
