import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
