import {useEffect, useState} from "react";
import {useMsal} from "@azure/msal-react";
import {InteractionStatus} from "@azure/msal-browser";
import {callMsGraph} from "./MsGraphApiCall";


export const useZoomAvailability = async (date, loginErrorHandler) => {
    const { instance, inProgress } = useMsal();
    const [calendarData, setCalendarData] = useState(null);

    useEffect(() => {
        if (!calendarData && inProgress === InteractionStatus.None) {
            const postData = {
                "schedules": [
                    "zoombooth1@socialfinance.org.uk",
                    "zoombooth2@socialfinance.org.uk",
                    "zoombooth3@socialfinance.org.uk",
                    "zoombooth4@socialfinance.org.uk",
                    "zoombooth5@socialfinance.org.uk",
                    "zoombooth6@socialfinance.org.uk"
                ],
                "startTime": {
                "dateTime": "2021-10-28T00:00:00",
                    "timeZone": "Europe/London"
                },
                "endTime": {
                "dateTime": "2021-11-01T21:00:00",
                    "timeZone": "Europe/London"
                },
                "availabilityViewInterval": 15
            }

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            callMsGraph(
                "/me/calendar/getSchedule", {
                    method: "POST",
                    headers,
                    body: JSON.stringify(postData),
                }
            ).then(response => setCalendarData(response)).catch(loginErrorHandler);
        }
    }, [inProgress, calendarData, instance, loginErrorHandler]);

    return calendarData;
}