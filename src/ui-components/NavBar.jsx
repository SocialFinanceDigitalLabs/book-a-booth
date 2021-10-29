import {AppBar, Toolbar, Link, Typography} from "@mui/material";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import useStyles from "../styles/useStyles";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title}>
                    <Link component={RouterLink} to="/" color="inherit" variant="h6">MS Identity Platform</Link>
                </Typography>
                <WelcomeName />
                <SignInSignOutButton />
            </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;