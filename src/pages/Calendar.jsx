import React, {useCallback} from "react";

// Msal imports
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import Paper from "@mui/material/Paper";
import CalendarData from "../ui-components/calendar/CalendarData";
import {cancelEvent, useCalendarService} from "../utils/CalendarService";
import Button from "@mui/material/Button";

const CalendarContent = () => {
    const calendarService = useCalendarService({days: 3});
    console.log("calendarService", calendarService)

    const cancelEventClick = useCallback(async eventId => {
        await cancelEvent(eventId);
        calendarService.refresh();
    }, [calendarService])

    return (
        <Paper>
            { calendarService && <>
                <CalendarData calendarService={calendarService} />
                <Button onClick={calendarService.refresh}>Refresh</Button>
                { calendarService.calendarData && calendarService.calendarData.all.map(event => {
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