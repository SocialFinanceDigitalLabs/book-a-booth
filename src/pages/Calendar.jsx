import React, {useCallback, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";

import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CalendarData from "../ui-components/calendar/CalendarData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import {cancelEvent, bookBooth, useCalendarService} from "../utils/CalendarService";
import InstantBook from "../ui-components/calendar/InstantBook";
import Grid from "@mui/material/Grid";
import {useSnackbar} from "notistack";
import useStyles from "../styles/useStyles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TodayIcon from '@mui/icons-material/Today';
import dayjs from "dayjs";

const CalendarContent = () => {
    const classes = useStyles();
    const history = useHistory()
    const { date } = useParams();
    const narrow = useMediaQuery('(max-width:750px)');
    const calendarService = useCalendarService({startDate: date, days: narrow ? 2 : 5});
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const timeoutId = setTimeout(() => calendarService.refresh(), 15*1000);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [calendarService])

    const bookClick = useCallback(async (startTime, duration) => {
        enqueueSnackbar("Sending booking")
        const bookingResult = await bookBooth(startTime, duration);
        enqueueSnackbar("Booking sent. It can take a minute or so before appearing in calendar",
            {variant: "success"})
        setTimeout(() => calendarService.refresh(), 3000);
        setTimeout(() => calendarService.refresh(), 6000);
        setTimeout(() => calendarService.refresh(), 9000);
        return bookingResult;
    }, [calendarService, enqueueSnackbar])

    const deleteEventClick = useCallback(async eventId => {
        enqueueSnackbar("Sending deletion request")
        await cancelEvent(eventId);
        enqueueSnackbar("Deletion sent. It can take a minute or so before appearing in calendar.",
            {variant: "success"})
        setTimeout(() => calendarService.refresh(), 2000);
        setTimeout(() => calendarService.refresh(), 4000);
        setTimeout(() => calendarService.refresh(), 6000);
    }, [calendarService, enqueueSnackbar])

    const navigate = useCallback((e) => {
        const targetId = e.currentTarget.id;
        if (targetId === "btn-next") {
            const day = dayjs.unix(calendarService.dates.endTime)
                .add(1, "days").format("YYYY-MM-DD")
            history.push(`/date/${day}`)
        } else if (targetId === "btn-prev") {
            const day = dayjs.unix(calendarService.dates.startTime)
                .subtract(calendarService.dates.dates.length+2, "days").format("YYYY-MM-DD")
            history.push(`/date/${day}`)
        } else {
            history.push('/')
        }
    }, [calendarService, history]);

    return (
        <Grid item xs={12} md={10} lg={8}>
            <Grid container className={classes.pageContainer}>
                <Grid item xs={10}>
                    <InstantBook calendarService={calendarService} bookClick={bookClick}/>
                </Grid>
                <Grid item xs={2} sx={{display: 'flex', justifyContent: 'right'}}>
                    <IconButton id="btn-prev" onClick={navigate}><ArrowBackIcon /></IconButton>
                    <IconButton id="btn-tday" onClick={navigate}><TodayIcon /></IconButton>
                    <IconButton id="btn-next" onClick={navigate}><ArrowForwardIcon /></IconButton>
                </Grid>
            </Grid>
            <Grid container className={classes.pageContainer}>
                <Grid item xs={12}>
                    <Paper>
                        { calendarService && <>
                            <CalendarData calendarService={calendarService} bookClick={bookClick}
                                          deleteEventClick={deleteEventClick} />
                        </>
                        }
                    </Paper>
                </Grid>
            </Grid>
            <Grid container className={classes.pageContainer}>
                <Grid item xs={12} md={3}>
                    <Button variant="outlined" color="secondary" onClick={() => calendarService.refresh()}>Refresh</Button>
                </Grid>
            </Grid>
        </Grid>

    );
};

export function Calendar() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
        >
            <CalendarContent />
        </MsalAuthenticationTemplate>
      )
};