import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';

import { store } from "./store/store";
import theme from "./theme";
import "./assets/scss/index.scss";
import Routes from "./Routes";

const browserHistory = createBrowserHistory();

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
