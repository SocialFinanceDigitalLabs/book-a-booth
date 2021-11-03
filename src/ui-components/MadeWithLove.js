import React from "react";
import {Typography} from "@mui/material";
import {Link} from "@mui/material";


const MadeWithLove = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Made with ❤️ by '}
            <Link color="inherit" href="https://github.com/kws" sx={{textDecoration: 'none'}}>
                Kaj
            </Link>
        </Typography>
    );
};

export default MadeWithLove;