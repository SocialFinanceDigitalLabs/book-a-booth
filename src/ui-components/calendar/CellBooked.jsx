import React from "react";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {blue} from "@mui/material/colors";

const CellBooked = ({day, deleteEventClick, sx}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleItemClick = () => {
        setAnchorEl(null);
        deleteEventClick(day.event[0].id)
    };
    return (
        <TableCell align="center" sx={{...sx, backgroundColor: blue[100]}}>
            <Button
                id={`menu-button-${day.timeslot}`}
                aria-controls={`menu-${day.timeslot}`}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="small"
            >{day.event[0].subject}</Button>
            <Menu
                id={`menu-${day.timeslot}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': `menu-button-${day.timeslot}`,
                }}
            >
                <MenuItem onClick={handleItemClick}>Cancel</MenuItem>
            </Menu>
        </TableCell>
        )
}

export default CellBooked;