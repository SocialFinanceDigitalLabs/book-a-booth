import {useCallback, useEffect, useState} from "react";
import dayjs from "dayjs";
import {callMsGraph, callMsGraphIter} from "./MsGraphApiCall";
import userTimezone from "./userTimezone";

export const timeFormat = "YYYY-MM-DDTHH:mmZ";
export const zoomBooths = [1, 2, 3].map(n => `zoombooth${n}@socialfinance.org.uk`);
export const interval = 30;
export const scheduleStart = 8, scheduleEnd = 19;

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

    return {
        dates,
        boothData,
        calendarData,
        refresh: () => {
            updateBoothData();
            updateCalendarData();
        }
    }
}

export const getDatePeriod = (date, days) => {
    const dates = []
    let nextDay = dayjs(date).hour(12).minute(0).second(0);
    const numDays = days && days > 0 ? days : 1;
    for (let i = 0; i < numDays; i++) {
        const today = getNextWorkingday(nextDay);
        dates.push(today);
        nextDay = today.add(1, "days")
    }
    const data = {
        dates,
        startTime: dates[0].hour(scheduleStart),
        endTime: dates[dates.length-1].hour(scheduleEnd),
        interval,
    };
    data.intervalCount = data.endTime.diff(data.startTime, "minutes") / interval;
    data.intervals = Array(data.intervalCount).fill(0).map(
        (el, ix) => data.startTime.add(ix*30, "minutes")
    );
    // Constructs an array of arrays for each date containing the indexes of the scheduling hours
    data.datesIndexes = dates.map(d =>
        data.intervals.map((v, ix) =>
            v.year() === d.year() && v.month() === d.month() && v.date() === d.date()
            && v.hour() >= scheduleStart && v.hour() < scheduleEnd
                ? ix : -1)
            .filter(v => v >= 0)
    )
    return data;
}

export const getNextWorkingday = date => {
    const dayOfWeek = date.day();
    if (dayOfWeek === 0) {
        return date.add(1, "day")
    } else if (dayOfWeek === 6) {
        return date.add(2, "day")
    }
    return date;
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


const transformBoothData = (boothData, intervals) => {
    const data = {
        ...boothData,
    };
    data.occupied = intervals.map((e, ix) =>
        zoomBooths.reduce((pv, cv, ci) =>
            pv + parseInt(data.value[ci].availabilityView[ix]), 0))
    data.available = intervals.map((e, ix) => zoomBooths.length - data.occupied[ix])
    return data;
}

const transformCalendarData = (calendarData) => {
    const enrichedData = calendarData
        .map(e => {
            e.booths = e.attendees.reduce(
                (obj, address) => {
                    if (zoomBooths.indexOf(address.emailAddress.address.toLowerCase()) >= 0) {
                        obj[address.emailAddress.address] = address;
                    }
                    return obj;
                },{});
            e.acceptedBooths = Object.values(e.booths)
                .filter(address => address.status.response.toLowerCase().indexOf("accepted") >= 0)
            return e;
        })

    const data = {
        "all": enrichedData.filter(e => Object.keys(e.booths).length > 0),
        "accepted": enrichedData.filter(e => Object.keys(e.acceptedBooths).length > 0),
    };
    return data;
}

const loadBoothData = async ({startTime, endTime, intervals}) => {
    const url = "/me/calendar/getSchedule";
    const headers = {"Content-Type": "application/json"};
    const body = {
        schedules: zoomBooths,
        startTime: {
            dateTime: startTime.format(timeFormat),
            timeZone: userTimezone,
        },
        endTime: {
            dateTime: endTime.format(timeFormat),
            timeZone: userTimezone,
        },
        availabilityViewInterval: interval
    }
    const boothData =  await callMsGraph(url, {method: "POST", headers, body: JSON.stringify(body)});
    return transformBoothData(await boothData.json(), intervals);
};

const loadCalendarData = async ({dates, startTime, endTime}) => {
    const url = `/me/calendar/calendarView?`
        + `startDateTime=${encodeURIComponent(dayjs(startTime).format(timeFormat))}&`
        + `endDateTime=${encodeURIComponent(dayjs(endTime).format(timeFormat))}&`
        + `$select=start,end,subject,attendees`
    const calendarData = await callMsGraphIter(url);
    return transformCalendarData(calendarData)
};

export const bookBooth = async (booth, startTime, endTime) => {
    const url = "/me/calendar/events";
    const headers = {"Content-Type": "application/json"};
    const body = {
        subject: "Booth Booking",
        start: {dateTime: startTime.format(timeFormat),timeZone: userTimezone},
        end: {dateTime: endTime.add(interval, "minutes").format(timeFormat),timeZone: userTimezone},
        attendees: [{emailAddress: {address: booth}}]
    }
    return await callMsGraph(url, {method: "POST", headers, body: JSON.stringify(body)});
}

export const cancelEvent = async eventId => {
    const url = `/me/calendar/events/${eventId}`;
    return await callMsGraph(url, {method: "DELETE"});
}
