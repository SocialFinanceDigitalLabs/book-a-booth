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

const CalendarContent = () => {
    const [date] = useQueryParam('date', StringParam);
    const narrow = useMediaQuery('(max-width:750px)');
    const calendarService = useCalendarService({startDate: date, days: narrow ? 1 : 5});

    useEffect(() => {
        const timeoutId = setTimeout(() => calendarService.refresh(), 15*1000);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [calendarService])

    const bookClick = useCallback(async (startTime, duration) => {
        const bookingResult = await bookBooth(startTime, duration);
        setTimeout(() => calendarService.refresh(), 3000);
        setTimeout(() => calendarService.refresh(), 6000);
        setTimeout(() => calendarService.refresh(), 9000);
        return bookingResult;
    }, [calendarService])

    const deleteEventClick = useCallback(async eventId => {
        await cancelEvent(eventId);
        setTimeout(() => calendarService.refresh(), 2000);
        setTimeout(() => calendarService.refresh(), 4000);
        setTimeout(() => calendarService.refresh(), 6000);
    }, [calendarService])

    return (
        <Paper>
            { calendarService && <>
                <InstantBook bookClick={bookClick}/>
                <CalendarData calendarService={calendarService} bookClick={bookClick}
                              deleteEventClick={deleteEventClick} />
                <Button onClick={calendarService.refresh}>Refresh</Button>
            </>
            }
        </Paper>

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