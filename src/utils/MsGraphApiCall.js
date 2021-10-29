import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../index";
import {InteractionRequiredAuthError} from "@azure/msal-browser";

export async function callMsGraph(url, opts) {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
    });

    const headers = opts?.headers || new Headers();
    const bearer = `Bearer ${response.accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        ...opts,
        headers: headers,
    };

    const errorHandler = MSALErrorHandler(msalInstance);

    return fetch(`${graphConfig.apiBase}${url}`, options)
        .then(response => response.json())
        .catch(errorHandler);
}

export const MSALErrorHandler = instance => e => {
    if (e instanceof InteractionRequiredAuthError) {
        instance.acquireTokenRedirect({
            ...loginRequest,
            account: instance.getActiveAccount()
        });
    } else {
        console.error(e)
    }
}

