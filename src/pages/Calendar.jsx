import React from "react";

// Msal imports
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import Paper from "@mui/material/Paper";
import {useZoomAvailability} from "../utils/BoothAvailabilityApiCall";
import CalendarData from "../ui-components/calendar/CalendarData";

const CalendarContent = () => {
    const calendarData = useZoomAvailability({start: "2021-10-27", days: 5})
    console.log("Calendar", calendarData)

    return (
        <Paper>
            { calendarData ? <CalendarData calendarData={calendarData}/>: null }
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