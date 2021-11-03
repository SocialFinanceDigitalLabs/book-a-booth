import React, {useCallback} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import IconButton from "@mui/material/IconButton";
import {zoomBooths} from "../../utils/CalendarDataUtil";

const CellAvailable = ({day, bookClick}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const book = useCallback((duration) => {
        bookClick(day.start, duration).then(result =>
            setAnchorEl(null)
        )}, [day, bookClick]);

    const backgroundColor = `rgba(76,175,80,${day.available/zoomBooths.length})`;
    let Icon;
    if (day.available === 0) {
        Icon = SentimentVeryDissatisfiedIcon;
    } else if (day.available <= 2) {
        Icon = SentimentNeutralIcon;
    } else {
        Icon = SentimentVerySatisfiedIcon;
    }
    return (
        <TableCell sx={{backgroundColor}} align="center">
            <IconButton
                id={`menu-button-${day.timeslot}`}
                aria-controls={`menu-${day.timeslot}`}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="small"
            >
                <Icon fontSize="small" />
            </IconButton>
            <Menu
                id={`menu-${day.timeslot}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': `menu-button-${day.timeslot}`,
                }}
            >
                <MenuItem onClick={() => book(30)}>30 min</MenuItem>
                <MenuItem onClick={() => book(60)}>60 min</MenuItem>
                <MenuItem onClick={() => book(90)}>90 min</MenuItem>
                <MenuItem onClick={() => book(120)}>120 min</MenuItem>
            </Menu>
        </TableCell>
    );
};

export default CellAvailable;