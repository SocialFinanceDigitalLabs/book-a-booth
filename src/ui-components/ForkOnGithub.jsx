import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        display: 'flex',
        bottom: 50,
        right: -130,
        width: '400px',
        padding: '2px 1px 1px 1px',
        background: '#FFF',
        overflow: 'hidden',
        transform: 'rotate(-45deg)',
        '-webkit-transform':' rotate(-45deg)',
        '-ms-transform': 'rotate(-45deg)',
        '-moz-transform': 'rotate(-45deg)',
        '-o-transform': 'rotate(-45deg)',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        "& a": {
            width: '100%',
            background: '#000',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'arial, sans-serif',
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '5px 40px',
            fontSize: '1rem',
            lineHeight: '2rem',
            position: 'relative',
            transition: '0.5s',
            "&:hover": {
                background: 'cornflowerblue',
                color: '#fff'
            }
        },
        "& a::before, a::after": {
            content: '',
            width: '100%',
            display: 'block',
            position: 'absolute',
            top: '1px',
            left: 0,
            height: '1px',
            background: '#fff',
        },
        "& a::after": {
            bottom: '1px',
            top: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            "& a": {
                fontSize: '0.5rem',
                lineHeight: '1rem',
            },
            bottom: 20,
            right: -170,

        },
    },
}));

const ForkOnGithub = ({repoUrl}) => {
    const classes = useStyles();
    return (
        <span className={classes.root}>
            <a href={repoUrl}>Fork me on GitHub</a>
        </span>
    )
}

export default ForkOnGithub;