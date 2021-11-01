// If you need to support IE11 uncomment the imports below
//import "react-app-polyfill/ie11";
//import "core-js/stable"; 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { theme } from "./styles/theme";
import App from './App';
import {msalInstance} from "./utils/MSALSetup";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider theme={theme}>
                <App pca={msalInstance} />
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
