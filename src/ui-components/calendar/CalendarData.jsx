import React, {useCallback, useState} from "react";
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
import {bookBooth, zoomBooths} from "../../utils/CalendarService";

const availableColors = [
    "#EF9A9A",
    "#FFCC80",
    "#FFF59D",
]

const getAvailableIcon = available => {
    const color = available >= availableColors.length ? "#A5D6A7" : availableColors[available];
    if (available === 0) {
        return [color, SentimentVeryDissatisfiedIcon];
    } else if (available <= 2) {
        return [color, SentimentNeutralIcon];
    } else {
        return [color, SentimentVerySatisfiedIcon];
    }
}



const CalendarData = ({calendarService}) => {
    const [selected, setSelected] = useState([]);
    const [groups, setGroups] = useState([])
    const {dates, boothData, refresh} = calendarService;

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

    if (!boothData) {
        return [];
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        {dates.dates.map(d =>
                            <TableCell key={d} align="center">{d.format("ddd, D MMM")}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dates.datesIndexes[0].map((slots, rowIndex) => {
                        const borderBottom = rowIndex % 2 === 0 ? 0 : '1px solid #eee';
                        return (
                            <TableRow
                                key={rowIndex}
                                sx={{
                                    'td,th': { borderBottom },
                                    td: { borderRight: '1px solid #eee' },
                                    '&:last-child td, &:last-child th': { borderBottom: 0 }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {dates.intervals[slots].format("HH:mm")}
                                </TableCell>
                                {dates.datesIndexes.map((dateIndexes, dix) => {
                                    const cellIndex = dateIndexes[rowIndex]
                                    const available = boothData.available[cellIndex];
                                    const [color, Icon] = getAvailableIcon(available);
                                    const backgroundColor = selected.indexOf(cellIndex) < 0 ? color : '#ccc';
                                    return (
                                        <TableCell key={dix} sx={{backgroundColor}}
                                                   onClick={() => selectCell(cellIndex)}
                                                   align="center"><Icon /></TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        {groups && groups.map((g, ix) =>
            <Paper key={ix}><Button onClick={() => bookBoothClick(g)}>Book</Button></Paper>
        )}
        </>
    )};

export default CalendarData;