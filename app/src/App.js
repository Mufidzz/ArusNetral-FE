import "date-fns"
import React, {Suspense} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {ThemeProvider } from '@material-ui/core/styles';

import {Router} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {createBrowserHistory} from 'history'

import routes from './routes';
import theme from "./theme";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";


import './assets/scss/index.scss';
import LinearProgress from "@material-ui/core/LinearProgress";

const history = createBrowserHistory();

function App() {
  return (
      <Suspense fallback={<LinearProgress/>}>
          <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Router history={history}>
                      {renderRoutes(routes)}
                  </Router>
              </MuiPickersUtilsProvider>
          </ThemeProvider>
      </Suspense>
  );
}

export default App;
