import {useCallback, useEffect, useMemo, useState} from "react";
import {callMsGraph, callMsGraphIter} from "./MsGraphApiCall";
import {
    calendarTimeZone,
    getDatePeriod,
    interval,
    timeFormat,
    timeFormatNoTz, transformBoothData,
    transformCalendarData,
    zoomBooths
} from "./CalendarDataUtil";


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
    console.log("QUERYING BOOTH", dates.startTime)
    const body = {
        schedules: zoomBooths,
        startTime: {
            dateTime: dates.startTime.format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        endTime: {
            dateTime: dates.endTime.format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        availabilityViewInterval: interval
    }
    const boothData =  await callMsGraph(url, {method: "POST", headers, body: JSON.stringify(body)});
    return transformBoothData(await boothData.json(), dates);
};

const loadCalendarData = async (dates) => {
    const url = `/me/calendar/calendarView?`
        + `startDateTime=${encodeURIComponent(dates.startTime.format(timeFormat))}&`
        + `endDateTime=${encodeURIComponent(dates.endTime.format(timeFormat))}&`
        + `$select=start,end,subject,attendees&`
        + `$top=50`
    const calendarData = await callMsGraphIter(url);
    return transformCalendarData(calendarData, dates)
};

export const bookBooth = async (booth, startTime, endTime) => {
    const url = "/me/calendar/events";
    const headers = {"Content-Type": "application/json"};
    const body = {
        subject: "Booth Booking",
        start: {dateTime: startTime.format(timeFormat), timeZone: calendarTimeZone},
        end: {dateTime: endTime.add(interval, "minutes").format(timeFormat), timeZone: calendarTimeZone},
        attendees: [{emailAddress: {address: booth}}]
    }
    return await callMsGraph(url, {method: "POST", headers, body: JSON.stringify(body)});
}

export const cancelEvent = async eventId => {
    const url = `/me/calendar/events/${eventId}`;
    return await callMsGraph(url, {method: "DELETE"});
}
