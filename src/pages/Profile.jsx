import {useCallback, useEffect, useState} from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData } from "../ui-components/ProfileData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { callMsGraph } from "../utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";

const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [calendarData, setCalendarData] = useState(null);

    const loginErrorHandler = useCallback(e => {
        if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
                ...loginRequest,
                account: instance.getActiveAccount()
            });
        }
    }, [instance]);

    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph("/me").then(response => setGraphData(response)).catch(loginErrorHandler);
        }
    }, [inProgress, graphData, instance, loginErrorHandler]);

    useEffect(() => {
        if (!calendarData && inProgress === InteractionStatus.None) {
            callMsGraph("/me/calendar").then(response => setCalendarData(response)).catch(loginErrorHandler);
        }
    }, [inProgress, calendarData, instance, loginErrorHandler]);

    return (
        <Paper>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </Paper>
    );
};

export function Profile() {
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
            <ProfileContent />
        </MsalAuthenticationTemplate>
      )
};