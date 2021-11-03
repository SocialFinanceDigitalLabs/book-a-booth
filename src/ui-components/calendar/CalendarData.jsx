import React, {useMemo} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import CellAvailable from "./CellAvailable";
import CellBooked from "./CellBooked";
import {blueGrey} from "@mui/material/colors";


const CalendarData = ({calendarService, bookClick, deleteEventClick}) => {
    const {dates, boothData, calendarData} = calendarService;
    const calendarView = useMemo(() => {
        if (dates && dates.datesIndexes) {
            const daysOfWeek = dates.dates.map(d => dayjs.unix(d.noon).day());
            return dates.datesIndexes[0].map(timeslotIndex => {
                return {
                    time: dates.intervals[timeslotIndex],
                    days: dates.datesIndexes.map((dateIndex, dayIndex) => {
                        const timeslot = dateIndex[timeslotIndex];
                        return {
                            timeslot,
                            start: dates.intervals[timeslot],
                            end: dates.intervals[timeslot] + dates.interval,
                            available: boothData ? boothData.available[timeslot] : -1,
                            event: calendarData ? calendarData.filter(e => e.id === calendarData.intervals[timeslot]) : [],
                            weekSlot: dayIndex,
                            dayOfWeek: daysOfWeek[dayIndex],
                        }
                    })
                };
            })
        } else {
            return [];
        }
    }, [dates, boothData, calendarData])
    return (
        <TableContainer component={Paper}>
            <Table sx={{}} size="small">
                <TableHead>
                    <TableRow sx={{backgroundColor: blueGrey[300]}}>
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
                                <TableCell component="th" scope="row" sx={{backgroundColor: blueGrey[300]}}>
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
    const sx = {};
    if (day.dayOfWeek === 1 && day.weekSlot > 0) {
        sx.borderLeft = '6px solid #eee'
    }
    if (day.end < Date.now() / 1000) {
        return <TableCell sx={{...sx, backgroundColor: blueGrey[100]}} />
    } else if (day.event && day.event.length > 0) {
        return <CellBooked sx={sx} day={day} deleteEventClick={deleteEventClick} />
    } else {
        return <CellAvailable sx={sx} day={day} bookClick={bookClick}/>
    }
}

