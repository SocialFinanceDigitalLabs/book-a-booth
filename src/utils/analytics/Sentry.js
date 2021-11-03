import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/react";

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;

export const init = () => {
    if (!SENTRY_DSN) {
        return;
    }
    Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 0.1,
    });
}