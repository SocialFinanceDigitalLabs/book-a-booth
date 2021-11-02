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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import Button from "@mui/material/Button";
import {bookBooth} from "../../utils/CalendarService";
import {zoomBooths} from "../../utils/CalendarDataUtil";
import dayjs from "dayjs";

const availableColors = [
    "#EF9A9A",
    "#FFCC80",
    "#FFF59D",
]

const getAvailableIcon = day => {
    if (day.selected) {
        return ['#CCC', ScheduleSendIcon];
    }
    if (day.events !== undefined && day.events !== -1) {
        return ['#00F', EventAvailableIcon];
    }
    const color = day.available >= availableColors.length ? "#A5D6A7" : availableColors[day.available];
    if (day.available === 0) {
        return [color, SentimentVeryDissatisfiedIcon];
    } else if (day.available <= 2) {
        return [color, SentimentNeutralIcon];
    } else {
        return [color, SentimentVerySatisfiedIcon];
    }
}



const CalendarData = ({calendarService}) => {
    const [selected, setSelected] = useState([]);
    const [groups, setGroups] = useState([])
    const {dates, boothData, calendarData, refresh} = calendarService;

    const selectCell = useCallback(cellIndex => {
        const arrayIndex = selected.indexOf(cellIndex);
        const newArray = [...selected]

        if (arrayIndex < 0) {
            newArray.push(cellIndex);
            newArray.sort((a, b) => a - b);
        } else {
            newArray.splice(arrayIndex, 1);
        }

        const groups = Array(newArray.length).fill(-1).map((v, ix) => {
            const prevValue = newArray[ix] - 1;
            return newArray.indexOf(prevValue);
        }).reduce((pv, cv, ci, arr) => {
            if (cv < 0) {
                pv.push([newArray[ci]])
            } else {
                pv[pv.length-1].push(newArray[ci])
            }
            return pv;
        }, []).map((arr, ix) => {
            return {
                start: dates.intervals[arr[0]],
                end: dates.intervals[arr[arr.length-1]],
                cells: arr,
            }
        });

        setSelected(newArray);
        setGroups(groups);
    }, [selected, dates]);


    const bookBoothClick = useCallback(g => {
        bookBooth(zoomBooths[0], g.start, g.end).then((result) => {
            refresh();
            setSelected(selected.filter(x => !g.cells.includes(x)));
        })
    }, [refresh, selected]);

    const calendarView = useMemo(() => {
        if (dates && dates.datesIndexes) {
            return dates.datesIndexes[0].map(timeslotIndex => {
                return {
                    time: dates.intervals[timeslotIndex],
                    days: dates.datesIndexes.map(dateIndex => {
                        const timeslot = dateIndex[timeslotIndex];
                        return {
                            timeslot,
                            available: boothData ? boothData.available[timeslot] : -1,
                            events: calendarData ? calendarData.intervals[timeslot] : -1,
                            selected: selected.indexOf(timeslot) >=0,
                        }
                    })
                };
            })
        } else {
            return [];
        }
    }, [dates, boothData, calendarData, selected])

    console.log("calendarView", calendarView);

    return (
        <>
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
                                { row.days.map(day => {
                                    const [backgroundColor, Icon] = getAvailableIcon(day);
                                    return (
                                        <TableCell key={day.timeslot} sx={{backgroundColor}}
                                                   onClick={() => selectCell(day.timeslot)}
                                                   align="center">
                                            <Icon />
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )})}
                </TableBody>
            </Table>
        </TableContainer>
        {groups && groups.map((g, ix) =>
            <Paper key={ix}><Button onClick={() => bookBoothClick(g)}>Book</Button></Paper>
        )}
        </>
    )};

export default CalendarData;