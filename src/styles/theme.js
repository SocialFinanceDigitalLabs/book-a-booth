import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles';
import {blue, red, green} from "@mui/material/colors";

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green[800],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFF',
    },
  },
});
