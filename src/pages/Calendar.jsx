import React, {useCallback, useEffect} from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {StringParam, useQueryParam} from "use-query-params";
import CalendarData from "../ui-components/calendar/CalendarData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import {cancelEvent, bookBooth, useCalendarService} from "../utils/CalendarService";
import InstantBook from "../ui-components/calendar/InstantBook";
import Grid from "@mui/material/Grid";
import {useTheme} from "@emotion/react";
import {useSnackbar} from "notistack";

const CalendarContent = () => {
    const theme = useTheme();
    const [date] = useQueryParam('date', StringParam);
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

    return (
        <Grid item xs={12} md={10} lg={8}>
            <Grid container justifyContent="left" xs={{width: '90%'}} rowSpacing={theme.spacing(2)}>
                <Grid item xs={12} md={3}>
                    <InstantBook bookClick={bookClick}/>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        { calendarService && <>
                            <CalendarData calendarService={calendarService} bookClick={bookClick}
                                          deleteEventClick={deleteEventClick} />
                        </>
                        }
                    </Paper>
                </Grid>
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