import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { slidesReducer } from "./slidesReducer";
import { productsReducer } from "./productsReducer";
import { authReducer } from "./authReducer";
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  slides: slidesReducer,
  products: productsReducer,
  auth: authReducer,
  users: usersReducer,
});
