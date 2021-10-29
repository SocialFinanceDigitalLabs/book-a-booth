import {useEffect, useState} from "react";
import {useMsal} from "@azure/msal-react";
import {InteractionStatus} from "@azure/msal-browser";
import {callMsGraph} from "./MsGraphApiCall";
import dayjs from "dayjs";

const timeFormat = "YYYY-MM-DDTHH:mm:ss";
const timeZone = "Europe/London";
const zoomBooths = [1,2,3,4,5,6].map(n => `zoombooth${n}@socialfinance.org.uk`);
const interval = 30;
const scheduleStart = 8, scheduleEnd = 18;

const transformResponse = (response, dates, startDate, endDate) => {
    const data = {
        ...response,
        dates,
        startDate,
        endDate,
        interval,
        intervalCount: (1 + endDate.diff(startDate, "minutes")) / interval,
    };
    data['intervals'] = Array(data.intervalCount).fill(0).map(
        (el, ix) => startDate.add(ix*30, "minutes")
    );
    data['occupied'] = data.intervals.map((e, ix) =>
        zoomBooths.reduce((pv, cv, ci) =>
            pv + parseInt(data.value[ci].availabilityView[ix]), 0))
    data['available'] = data.intervals.map((e, ix) => zoomBooths.length - data['occupied'][ix])

    data['datesIndexes'] = dates.map(d =>
        data.intervals.map((v, ix) =>
            v.year() === d.year() && v.month() === d.month() && v.date() === d.date()
                && v.hour() >= scheduleStart && v.hour() <= scheduleEnd
                ? ix : -1)
            .filter(v => v >= 0)
    )

    return data;
}

export const useZoomAvailability = ({start, days}) => {
    const { instance, inProgress } = useMsal();
    const [calendarData, setCalendarData] = useState(null);

    useEffect(() => {
        if (!calendarData && inProgress === InteractionStatus.None) {
            const startDate = dayjs(start).hour(scheduleStart).minute(0).second(0);
            const dates = [startDate]
            while (dates.length < days) {
                const previousDate = dates[dates.length - 1];
                const previousDay = previousDate.day();
                const offset = previousDay >= 5 ? 8-previousDay : 1;
                dates.push(previousDate.add(offset, "days"))
            }
            dates[days-1] = dates[days-1].hour(scheduleEnd).minute(59).second(59)
            const endDate = dates[days-1]

            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            callMsGraph(
                "/me/calendar/getSchedule", {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        schedules: zoomBooths,
                        startTime: {
                            dateTime: startDate.format(timeFormat),
                            timeZone: timeZone
                        },
                        endTime: {
                            dateTime: endDate.format(timeFormat),
                            timeZone: timeZone
                        },
                        availabilityViewInterval: interval
                    }),
                }
            ).then(data => transformResponse(data, dates, startDate, endDate)
            ).then(data => setCalendarData(data))

        }
    }, [inProgress, calendarData, instance, start, days]);

    return calendarData;
}