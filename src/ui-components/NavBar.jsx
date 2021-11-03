import {AppBar, Toolbar, Link, Typography} from "@mui/material";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import useStyles from "../styles/useStyles";
import { Link as RouterLink } from "react-router-dom";
import SFLogo from "./SFLogo";

const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title}>
                    <Link component={RouterLink} to="/" color="inherit" variant="h6" sx={{display: 'flex', alignItems: 'center'}}>
                        <SFLogo width={75} showText={false} color='#FFF'/> Booth Booking
                    </Link>
                </Typography>
                <WelcomeName />
                <SignInSignOutButton />
            </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;