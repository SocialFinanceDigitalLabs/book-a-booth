import {useCallback, useEffect, useMemo, useState} from "react";
import {callMsGraph, callMsGraphIter} from "./MsGraphApiCall";
import {
    calendarTimeZone, enrichCalendarData, findBooths,
    getDatePeriod,
    interval,
    timeFormat,
    timeFormatNoTz, transformBoothData,
    zoomBooths
} from "./CalendarDataUtil";
import dayjs from "dayjs";


export const useCalendarService = ({startDate, days}) => {
    const [dates, setDates] = useState({dates: []});
    const [boothData, updateBoothData] =
        useApiData(async () => dates.dates.length > 0 && loadBoothData(dates), [dates])
    const [calendarData, updateCalendarData] =
        useApiData(async () => dates.dates.length > 0  && loadCalendarData(dates), [dates])

    useEffect(() => {
        setDates(getDatePeriod(startDate, days));
    }, [startDate, days])

    useEffect(() => {
        updateBoothData();
    }, [updateBoothData])

    useEffect(() => {
        updateCalendarData();
    }, [updateCalendarData])


    const service = useMemo(() => {
        return {
            dates,
            boothData,
            calendarData,
            refresh: () => {
                updateBoothData();
                updateCalendarData();
            }
        }
    }, [dates, boothData, calendarData, updateBoothData, updateCalendarData])

    return service;
}

const useApiData = (callback, deps) => {
    const [data, setData] = useState(null);
    const loadData = useCallback(() => {
        if (callback) {
            callback().then(result => setData(result))
        }
    }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps
    return [data, loadData]
}


const loadBoothData = async (dates) => {
    const url = "/me/calendar/getSchedule";
    const headers = {"Content-Type": "application/json"};
    const body = {
        schedules: zoomBooths,
        startTime: {
            dateTime: dayjs.unix(dates.startTime).tz(calendarTimeZone).format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        endTime: {
            dateTime: dayjs.unix(dates.endTime).tz(calendarTimeZone).format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        availabilityViewInterval: Math.round(interval / 60)
    }
    const boothData = await callMsGraph(url, {method: "POST", headers, body: JSON.stringify(body)});
    return transformBoothData(await boothData.json(), dates);
};

const loadCalendarData = async dates => {
    const url = `/me/calendar/calendarView?`
        + `startDateTime=${encodeURIComponent(dayjs.unix(dates.startTime).format(timeFormat))}&`
        + `endDateTime=${encodeURIComponent(dayjs.unix(dates.endTime).format(timeFormat))}&`
        + `$select=start,end,subject,attendees&`
        + `$top=50`
    const calendarData = findBooths(await callMsGraphIter(url))
        .filter(e => e.acceptedBooths.length > 0);
    return enrichCalendarData(calendarData, dates);
};

export const bookBooth = async (booth, startTime, endTime) => {
    const url = "/me/calendar/events";
    const headers = {"Content-Type": "application/json"};
    const body = {
        subject: "Booth Booking",
        start: {dateTime: dayjs.unix(startTime).tz(calendarTimeZone).format(timeFormat), timeZone: calendarTimeZone},
        end: {dateTime: dayjs.unix(endTime).tz(calendarTimeZone).add(interval, "seconds").format(timeFormat),
            timeZone: calendarTimeZone},
        attendees: [{emailAddress: {address: booth}}]
    }
    return await callMsGraph(url, {method: "POST", headers, body: JSON.stringify(body)});
}

export const cancelEvent = async eventId => {
    const url = `/me/calendar/events/${eventId}`;
    return await callMsGraph(url, {method: "DELETE"});
}
