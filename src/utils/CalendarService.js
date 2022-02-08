import {useCallback, useEffect, useMemo, useState} from "react";
import * as Sentry from "@sentry/react";
import {callMsGraph, callMsGraphIter} from "./MsGraphApiCall";
import {
    calendarTimeZone, enrichCalendarData, findBooths,
    getDatePeriod,
    interval,
    timeFormat,
    timeFormatNoTz, transformBoothData,
    zoomBooths,
    gapBefore
} from "./CalendarDataUtil";
import dayjs from "dayjs";
import {_gs} from "./analytics/GoSquared";

function ResponseError(...args) {
    const instance = Reflect.construct(Error, args);
    Reflect.setPrototypeOf(instance, Reflect.getPrototypeOf(this));
    args[1].text().then(message => {
        instance.message += " - " + message
        Sentry.captureException(instance, {contexts: {message}});
    })
    return instance;
}
ResponseError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
Reflect.setPrototypeOf(ResponseError, Error);

const raiseForStatus = response => {
    if (!response.ok) {
        throw new ResponseError(`Request return non-success error code ${response.status} - ${response.statusText}`, response);
    }
}

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
    raiseForStatus(boothData)
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

export const bookBooth = async (start, duration) => {
    const startTime =  dayjs.unix(start).tz(calendarTimeZone);
    const endTime = startTime.add(duration, "minutes");
    const headers = {"Content-Type": "application/json"};
    const queryBody = {
        schedules: zoomBooths,
        startTime: {
            dateTime: startTime.subtract(gapBefore, 'minutes').format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        endTime: {
            dateTime: endTime.add(gapBefore, 'minutes').format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        availabilityViewInterval: duration + 2*gapBefore
    }

    const boothResponse = await callMsGraph("/me/calendar/getSchedule",
        {method: "POST", headers, body: JSON.stringify(queryBody)});
    raiseForStatus(boothResponse)
    const boothData = await boothResponse.json();
    const availableBooths = boothData.value.filter(e => e.availabilityView === "0");
    if (availableBooths.length === 0) {
        return {error: "nobooth"};
    }

    const selectedBooth = availableBooths[Math.floor(Math.random() * availableBooths.length)];
    const boothId = selectedBooth.scheduleId;
    const boothName = boothId.split("@")[0];
    const boothNumber = boothName.replace("zoombooth", '');

    const body = {
        subject: `Booth ${boothNumber}`,
        start: {dateTime: startTime.add(0, "minutes").format(timeFormat), timeZone: calendarTimeZone},
        end: {dateTime: startTime.add(duration, "minutes").format(timeFormat), timeZone: calendarTimeZone},
        attendees: [{emailAddress: {address: selectedBooth.scheduleId}}]
    }
    const bookingResult = await callMsGraph("/me/calendar/events",
        {method: "POST", headers, body: JSON.stringify(body)});
    raiseForStatus(bookingResult)
    const bookingData = await bookingResult.json();
    return {boothId, boothName, boothNumber, bookingData}
}

export const cancelEvent = async eventId => {
    _gs('event', 'Cancel', {});
    const url = `/me/calendar/events/${eventId}`;
    const result = await callMsGraph(url, {method: "DELETE"});
    raiseForStatus(result)
    return result
}
