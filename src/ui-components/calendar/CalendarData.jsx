import React, {useCallback, useMemo, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import {Typography} from "@mui/material";
import useStyles from "../../styles/useStyles";

const availableColors = [
    "#EF9A9A",
    "#FFCC80",
    "#FFF59D",
]


const CalendarData = ({calendarService, bookClick, deleteEventClick}) => {
    const {dates, boothData, calendarData} = calendarService;
    const calendarView = useMemo(() => {
        if (dates && dates.datesIndexes) {
            return dates.datesIndexes[0].map(timeslotIndex => {
                return {
                    time: dates.intervals[timeslotIndex],
                    days: dates.datesIndexes.map(dateIndex => {
                        const timeslot = dateIndex[timeslotIndex];
                        return {
                            timeslot,
                            start: dates.intervals[timeslot],
                            end: dates.intervals[timeslot] + dates.interval,
                            available: boothData ? boothData.available[timeslot] : -1,
                            event: calendarData ? calendarData.filter(e => e.id === calendarData.intervals[timeslot]) : [],
                        }
                    })
                };
            })
        } else {
            return [];
        }
    }, [dates, boothData, calendarData])

    console.log(calendarView)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        {dates.dates.map(d =>
                            <TableCell key={d.noon} align="center">
                                {dayjs.unix(d.noon).format("ddd, D MMM")}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {calendarView.map((row, rowIndex) => {
                        const borderBottom = rowIndex % 2 === 0 ? 0 : '1px solid #eee';
                        return (
                            <TableRow
                                key={row.time}
                                sx={{
                                    'td,th': { borderBottom, borderRight: '1px solid #eee' },
                                    '&:last-child td, &:last-child th': { borderBottom: 0 }
                                }}
                                >
                                <TableCell component="th" scope="row">
                                    { dayjs.unix(row.time).format("HH:mm") }
                                </TableCell>
                                { row.days.map(day => <CalendarCell
                                    key={day.timeslot} day={day} bookClick={bookClick}
                                    deleteEventClick={deleteEventClick}
                                />) }
                            </TableRow>
                        )})}
                </TableBody>
            </Table>
        </TableContainer>
    )};
export default CalendarData;

const CalendarCell = ({day, bookClick, deleteEventClick}) => {
    const [mode, setMode] = useState("normal")

    const myBookClick = useCallback(async (time, duration) => {
        const result = await bookClick(time, duration);
        setMode("normal");
        return result;
    }, [bookClick])

    const click = useCallback(() => {
        if (mode === "normal") {
            setMode("selected")
        }
    }, [mode]);

    if (day.end < Date.now() / 1000) {
        return <TableCell />
    } else if (day.event && day.event.length > 0) {
        return <BookedCell day={day} deleteEventClick={deleteEventClick} />
    } else if (mode === "normal") {
        return <AvailabilityCell day={day} onClick={click} />
    } else {
        return <BookingCell day={day} onCancel={() => setMode("normal")} bookClick={myBookClick} align="center"/>
    }
}

const BookedCell = ({day, deleteEventClick}) => {
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [deleteRequested, setDeleteRequested] = useState(false);
    if (clicked) {
        return (
            <TableCell align="center"  className={classes.bookingCell}>
                <div>
                    <Button variant="contained" color="error" onClick={() => {
                        setDeleteRequested(true);
                        setClicked(false);
                        deleteEventClick(day.event[0].id)
                    }}>
                        Cancel {day.event[0].subject}
                    </Button>
                    <Button variant="outlined"  onClick={() => setClicked(false)}>Leave as is</Button>
                </div>
            </TableCell>
        )
    }
    return (
        <TableCell align="center" onClick={() => setClicked(true)}>
            { deleteRequested && "Cancelling "}
            {day.event[0].subject}
        </TableCell>
    )
}

const AvailabilityCell = ({day, onClick}) => {
    const backgroundColor = day.available >= availableColors.length ? "#A5D6A7" : availableColors[day.available];
    let Icon;
    if (day.available === 0) {
        Icon = SentimentVeryDissatisfiedIcon;
    } else if (day.available <= 2) {
        Icon = SentimentNeutralIcon;
    } else {
        Icon = SentimentVerySatisfiedIcon;
    }
    return (
        <TableCell sx={{backgroundColor}} align="center" onClick={onClick}>
            <Icon />
        </TableCell>
    );
};

const BookingCell = ({day, onCancel, bookClick}) => {
    const classes = useStyles();
    const [booking, setBooking] = useState(false);
    const book = useCallback((duration) => {
        setBooking(true);
        bookClick(day.start, duration).then(result =>
            setBooking(false)
        )}, [day, bookClick])

    if (booking) {
        return (
            <TableCell align="center" className={classes.bookingCell}>
                Sending Booking Request...
            </TableCell>
        )
    }

    return (
        <TableCell align="center" className={classes.bookingCell}>
            <div>
                <Typography>Book Booth</Typography>
                <Button variant="outlined" onClick={() => book(30)}>30 min</Button>
                <Button variant="outlined" onClick={() => book(60)}>60 min</Button>
                <Button variant="outlined" onClick={() => book(90)}>90 min</Button>
                <Button variant="outlined" onClick={() => book(120)}>120 min</Button>
                <Button variant="contained" onClick={onCancel} >Cancel</Button>
            </div>
        </TableCell>
    );
};
