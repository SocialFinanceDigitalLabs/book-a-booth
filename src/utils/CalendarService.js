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
import {_gs} from "./GoSquared";


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

export const bookBooth = async (start, duration) => {
    _gs('event', 'Book', {duration});
    const startTime =  dayjs.unix(start).tz(calendarTimeZone);
    const endTime = startTime.add(duration, "minutes");
    const headers = {"Content-Type": "application/json"};
    const queryBody = {
        schedules: zoomBooths,
        startTime: {
            dateTime: startTime.format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        endTime: {
            dateTime: endTime.format(timeFormatNoTz),
            timeZone: calendarTimeZone,
        },
        availabilityViewInterval: duration
    }

    const boothResponse = await callMsGraph("/me/calendar/getSchedule",
        {method: "POST", headers, body: JSON.stringify(queryBody)});
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
        start: {dateTime: startTime.format(timeFormat), timeZone: calendarTimeZone},
        end: {dateTime: startTime.add(duration, "minutes").format(timeFormat), timeZone: calendarTimeZone},
        attendees: [{emailAddress: {address: selectedBooth.scheduleId}}]
    }
    const bookingResult = await callMsGraph("/me/calendar/events",
        {method: "POST", headers, body: JSON.stringify(body)});
    const bookingData = await bookingResult.json();
    return {boothId, boothName, boothNumber, bookingData}
}

export const cancelEvent = async eventId => {
    _gs('event', 'Cancel', {});
    const url = `/me/calendar/events/${eventId}`;
    return await callMsGraph(url, {method: "DELETE"});
}
