import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { slidesReducer } from "./slidesReducer";
import { productsReducer } from "./productsReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  slides: slidesReducer,
  products: productsReducer,
});
