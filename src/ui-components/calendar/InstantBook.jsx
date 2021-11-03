import React, {useCallback} from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {Menu} from "@mui/material";

const InstantBook = ({bookClick, calendarService}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const currentInterval = Math.floor((Date.now()/1000 - calendarService.dates.startTime) / calendarService.dates.interval);
    const availableNow = calendarService.boothData?.available ? calendarService.boothData.available[currentInterval] : -1;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const book = useCallback(async (duration) => {
        setAnchorEl(null);
        await bookClick(Math.floor(Date.now() / 1000), duration)
    }, [bookClick])

    return  <>
        <Button variant="contained"
                color="secondary"
                disabled={availableNow === undefined || availableNow < 1}
                id={`menu-button-instant`}
                aria-controls={`menu-instant`}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
        >Instant Book</Button>
        <Menu
            id={`menu-instant`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': `menu-button-instant`,
            }}
        >
            <MenuItem onClick={() => book(30)}>30 min</MenuItem>
            <MenuItem onClick={() => book(60)}>60 min</MenuItem>
            <MenuItem onClick={() => book(90)}>90 min</MenuItem>
            <MenuItem onClick={() => book(120)}>120 min</MenuItem>
        </Menu>
    </>

}
export default InstantBook;