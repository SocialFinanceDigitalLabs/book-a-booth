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

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <Router>
            <ThemeProvider theme={theme}>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <App pca={msalInstance} />
                </QueryParamProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
