// If you need to support IE11 uncomment the imports below
//import "react-app-polyfill/ie11";
//import "core-js/stable"; 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {CssBaseline, ThemeProvider} from '@mui/material';
import { QueryParamProvider } from 'use-query-params';
import { theme } from "./styles/theme";
import App from './App';
import {msalInstance} from "./utils/MSALSetup";
import {SnackbarProvider} from "notistack";
import {init} from "./utils/analytics/Sentry";

init();

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <Router>
            <ThemeProvider theme={theme}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <SnackbarProvider maxSnack={3}>
                        <App pca={msalInstance} />
                    </SnackbarProvider>
                </QueryParamProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
