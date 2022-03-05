import { types } from "../types/types";

const initialState = {
  isLoggedIn: false,
  user: null,
  register: {
    success: false,
    isLoading: false,
    error: null,
    isTouched: false,
  },
  login: {
    success: false,
    isLoading: false,
    error: null,
    isTouched: false,
  }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authStartRegister:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: true,
          isTouched: true,
        }
      };
    case types.authEndRegister:
      return {
        ...state,
        register: {
          success: action.payload.success,
          error: action.payload.error,
          isLoading: false,
          isTouched: true,
        }
      };

    case types.authStartLogin:
      return {
        ...state,
        login: {
          ...state.register,
          isLoading: true,
          isTouched: true,
        }
      };
    case types.authEndLogin:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
        login: {
          success: action.payload.success,
          error: action.payload.error,
          isLoading: false,
          isTouched: true,
        }
      };

    default:
      return state;
  }
};
