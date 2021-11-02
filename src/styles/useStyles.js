import { makeStyles } from '@mui/styles';
import {grey} from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      '& a': {
          textDecoration: 'none',
      },
    },
    bookingCell: {
        backgroundColor: grey.A400,
        "& div": {
            display: "flex",
            flexDirection: "column",
            width: "100%",
        }
    }
}));

export default useStyles;