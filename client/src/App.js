import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';

import { store } from "./store/store";
import { chartjs } from "./helpers";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import { validators } from "./common/validators";
import Routes from "./Routes";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

validate.validators = {
  ...validate.validators,
  ...validators,
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      	<CssBaseline />
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}
