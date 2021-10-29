import {useEffect, useState} from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData } from "../ui-components/ProfileData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import {callMsGraph, useMSALErrorHandler} from "../utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";

const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const errorHandler = useMSALErrorHandler(instance);

    console.log("Profile", graphData, inProgress)

    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph("/me").then(response => setGraphData(response)).catch(errorHandler);
        }
    }, [inProgress, graphData, instance, errorHandler]);


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