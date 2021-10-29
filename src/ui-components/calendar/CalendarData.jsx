import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const CalendarData = ({calendarData}) => {
    const displayData = calendarData['intervals'].map((v, ix) => {return {
        "time": v,
        "available": calendarData['available'][ix],
    }})
    console.log("displayData", displayData)
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
                    {calendarData.datesIndexes[0].map((ix) => (
                        <TableRow
                            key={ix}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {calendarData.intervals[ix].format("HH:mm")}
                            </TableCell>
                            {calendarData.datesIndexes.map(dates =>
                                <TableCell key={dates} align="center">{calendarData.available[dates[ix]]}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>    )
}

export default CalendarData;