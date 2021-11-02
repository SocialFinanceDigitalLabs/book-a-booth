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
import {cancelEvent, useCalendarService} from "../utils/CalendarService";

const CalendarContent = () => {
    const [date] = useQueryParam('date', StringParam);
    const wide = useMediaQuery('(min-width:750px)');
    const calendarService = useCalendarService({startDate: date, days: wide ? 5 : 1});

    useEffect(() => {
        const timeoutId = setTimeout(() => calendarService.refresh(), 30*1000);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [calendarService])

    const cancelEventClick = useCallback(async eventId => {
        await cancelEvent(eventId);
        calendarService.refresh();
    }, [calendarService])

    return (
        <Paper>
            { calendarService && <>
                <CalendarData calendarService={calendarService} />
                <Button onClick={calendarService.refresh}>Refresh</Button>
                { calendarService.calendarData && calendarService.calendarData.map(event => {
                    return <li key={event.id}>
                        <Button onClick={() => cancelEventClick(event.id)}>Cancel {event.subject}</Button>
                    </li>
                })}
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