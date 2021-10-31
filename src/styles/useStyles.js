import { makeStyles } from '@mui/styles';

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
}));

export default useStyles;