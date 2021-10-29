import React from "react";
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

const getAvailableIcon = available => {
    const colors = [
        "#EF9A9A",
        "#FFCC80",
        "#FFF59D",
    ]
    const color = available >= colors.length ? "#A5D6A7" : colors[available];

    if (available === 0) {
        return [color, SentimentVeryDissatisfiedIcon];
    } else if (available <= 2) {
        return [color, SentimentNeutralIcon];
    } else {
        return [color, SentimentVerySatisfiedIcon];
    }
}

const CalendarData = ({calendarData}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        {calendarData.dates.map(d =>
                            <TableCell key={d} align="center">{d.format("ddd, D MMM")}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {calendarData.datesIndexes[0].map((ix) => {
                        const borderBottom = ix % 2 === 0 ? 0 : '1px solid #eee';
                        return (
                            <TableRow
                                key={ix}
                                sx={{
                                    'td,th': { borderBottom },
                                    td: { borderRight: '1px solid #eee' },
                                    '&:last-child td, &:last-child th': { borderBottom: 0 }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {calendarData.intervals[ix].format("HH:mm")}
                                </TableCell>
                                {calendarData.datesIndexes.map(dates => {
                                    const available = calendarData.available[dates[ix]];
                                    const [backgroundColor, Icon] = getAvailableIcon(available);
                                    return (
                                        <TableCell key={dates} sx={{backgroundColor}}
                                                   align="center"><Icon /></TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )};

export default CalendarData;