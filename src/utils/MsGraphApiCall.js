import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "./MSALSetup";
import {InteractionRequiredAuthError} from "@azure/msal-browser";

export const callMsGraphIter = async (url, opts) => {
    let result = await callMsGraph(url, opts);
    result = await result.json()
    const values = result.value
    while (result['@odata.nextLink']) {
        result = await callMsGraph(result['@odata.nextLink']);
        result = await result.json()
        values.push(...result.value)
    }
    return values;
}

export const callMsGraph = async (url, opts) => {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
    });

    const headers = new Headers(opts?.headers);
    const bearer = `Bearer ${response.accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        ...opts,
        headers: headers,
    };

    const fetchUrl = url.startsWith("http") ? url : `${graphConfig.apiBase}${url}`;

    return fetch(fetchUrl, options)
        .catch(MSALErrorHandler(msalInstance));
}

export const MSALErrorHandler = instance => e => {
    if (e instanceof InteractionRequiredAuthError) {
        instance.acquireTokenRedirect({
            ...loginRequest,
            account: instance.getActiveAccount()
        });
    } else {
        throw e;
    }
}

