import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const timeFormat = "YYYY-MM-DDTHH:mmZ";
export const timeFormatNoTz = "YYYY-MM-DDTHH:mm";

export const calendarTimeZone = "Europe/London";
export const zoomBooths = [1, 2, 3].map(n => `zoombooth${n}@socialfinance.org.uk`);
export const interval = 30;
export const scheduleStart = 8, scheduleEnd = 19;

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDatePeriod = (date, days) => {
    const dates = []
    let nextDay = dayjs(date).hour(12);
    const numDays = days > 0 ? days : 1;
    for (let i = 0; i < numDays; i++) {
        nextDay = getNextWorkingday(nextDay);
        dates.push({
            date: nextDay.format("YYYY-MM-DD"),
            noon: nextDay.hour(12).unix(),
            startTime: nextDay.hour(scheduleStart).unix(),
            endTime: nextDay.hour(scheduleEnd).unix()
        });
        nextDay = nextDay.add(1, "days")
    }
    const data = {
        dates,
        startTime: dates[0].startTime,
        endTime: dates[dates.length-1].endTime,
        interval,
    };
    data.intervalCount = (data.endTime - data.startTime) / (interval*60);
    data.intervals = Array(Math.ceil(data.intervalCount)).fill(0).map(
        (el, ix) => data.startTime + ix * interval * 60
    );
    // Constructs an array of arrays for each date containing the indexes of the scheduling hours
    data.datesIndexes = dates.map(d =>
        data.intervals.map((v, ix) =>
            v >= d.startTime && v < d.endTime ? ix : -1).filter(v => v >= 0)
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

export const transformBoothData = (boothData, dates) => {
    const {intervals} = dates;
    const data = {
        ...boothData,
    };
    data.occupied = intervals.map((e, ix) =>
        zoomBooths.reduce((pv, cv, ci) =>
            pv + parseInt(data.value[ci].availabilityView[ix]), 0))
    data.available = intervals.map((e, ix) => zoomBooths.length - data.occupied[ix])
    return data;
}

export const transformCalendarData = (calendarData, dates) => {
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

    const data =  {
        "all": enrichedData.filter(e => Object.keys(e.booths).length > 0),
        "accepted": enrichedData.filter(e => Object.keys(e.acceptedBooths).length > 0),
    };

    data.intervals = []
    data.all.forEach(event => {
        event.startTime = dayjs.tz(event.start.dateTime, event.start.timeZone);
        event.endTime = dayjs.tz(event.end.dateTime, event.end.timeZone);
        event.startIndex = (event.startTime.unix()  - dates.startTime.unix()) / 1800;
        event.endIndex = (event.endTime.unix()  - dates.startTime.unix() - 1) / 1800;
        for (let i=event.startIndex; i<=event.endIndex; i++) {
            data.intervals[Math.floor(i)] = event.id;
        }
    });

    console.log("EVENTS", data.all);

    return data;
}

