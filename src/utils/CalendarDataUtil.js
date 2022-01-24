import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const timeFormat = "YYYY-MM-DDTHH:mmZ";
export const timeFormatNoTz = "YYYY-MM-DDTHH:mm";

export const calendarTimeZone = "Europe/London";
export const zoomBooths = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `zoombooth${n}@socialfinance.org.uk`);
export const interval = 30*60; // in seconds
export const scheduleStart = 8, scheduleEnd = 19;
export const gapBefore = 25;

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Takes a dayjs object and returns the same day if a working day, or the next working day if a weekend.
 *
 * <code>
 * getNextWorkingday(&lt;a Friday>) => &lt;a Friday>
 *
 * getNextWorkingday(&lt;a Saturday>) => &lt;a Monday>
 * </code>
 *
 * @param date
 * @returns date - the same dayjs passed in, or one representing the next working day.
 */
export const getNextWorkingday = date => {
    const dayOfWeek = date.day();
    if (dayOfWeek === 0) {
        return date.add(1, "day")
    } else if (dayOfWeek === 6) {
        return date.add(2, "day")
    }
    return date;
}

/**
 * Takes a start date (defaults to today) and a number of days (defaults to 1) and calculates a complex object
 * to help paint the calendar and fetch availability data.
 *
 * The return object has the following structure:
 *
 * <pre>
 * {
 *    "dates": [
 *        {
 *            "date": "2021-10-29",
 *            "noon": 1635505200,
 *            "startTime": 1635490800,
 *            "endTime": 1635530400
 *        }
 *    ],
 *    "startTime": 1635490800,
 *    "endTime": 1635530400,
 *    "interval": 1800,
 *    "intervalCount": 22,
 *    intervals: [
 *      1635490800, 1635492600,
 *      ...
 *      1635526800, 1635528600
 *    ],
 *    datesIndexes: [
 *      [
 *         0,  1,  2,  3,  4,  5,  6,
 *         7,  8,  9, 10, 11, 12, 13,
 *        14, 15, 16, 17, 18, 19, 20,
 *        21
 *      ]
 *    ]
 * }
 * </pre>
 *
 * Interval length is measured in seconds. The intervals are the start times (unix epoch - seconds) of each interval.
 *
 * The date indexes refer to the indexes
 * @param date
 * @param days
 * @returns {{dates: *[], startTime, endTime, interval, intervalCount: number, intervals: number[], datesIndexes: *[]}}
 */
export const getDatePeriod = (date, days) => {
    const dates = []
    let nextDay = dayjs(date).tz(calendarTimeZone).hour(12).minute(0).second(0);
    const numDays = days > 0 ? days : 1;
    for (let i = 0; i < numDays; i++) {
        nextDay = getNextWorkingday(nextDay);
        const nextDayFmt = nextDay.format("YYYY-MM-DD");
        dates.push({
            date: nextDayFmt,
            noon: dayjs.tz(`${nextDayFmt}T12:00:00`, calendarTimeZone).unix(),
            startTime: dayjs.tz(`${nextDayFmt}T${scheduleStart}:00:00`, calendarTimeZone).unix(),
            endTime: dayjs.tz(`${nextDayFmt}T${scheduleEnd}:00:00`, calendarTimeZone).unix(),
        });
        nextDay = nextDay.add(1, "days")
    }
    const data = {
        dates,
        startTime: dates[0].startTime,
        endTime: dates[dates.length-1].endTime,
        interval,
    };
    data.intervalCount = (data.endTime - data.startTime) / (interval);
    data.intervals = Array(Math.ceil(data.intervalCount)).fill(0).map(
        (el, ix) => data.startTime + ix * interval
    );
    // Constructs an array of arrays for each date containing the indexes of the scheduling hours
    data.datesIndexes = dates.map(d =>
        data.intervals.map((v, ix) =>
            v >= d.startTime && v < d.endTime ? ix : -1).filter(v => v >= 0)
    )
    return data;
}

/**
 * Processes the data return from the MS Graph Booth Schedule call. The API result contains a list of
 * schedules for each requested resource:
 *
 * <pre>
 * {
 *     "value": [
 *         {
 *             "scheduleId": "user@domain.com",
 *             "availabilityView": "000111001111..."
 *         }
 *     ]
 * }
 * </pre>
 *
 * This function combines each individual availabilityView into a combined one for the whole query by adding
 * them together, and then then inverts this by taking the total number of schedules and removing the number of
 * occupied:
 *
 * <pre>
 * {
 *     "value": [
 *         ...
 *     ],
 *     "occupied": [0, 1, 2, 2, 3, 3, 1, 1],
 *     "available": [3, 2, 1, 1, 0, 0, 2 ,2]
 * }
 * </pre>
 *
 * @param boothData
 * @param dates
 * @returns {*}
 */
export const transformBoothData = (boothData) => {
    const data = {
        ...boothData,
    };
    const intervals = data.value[0].availabilityView.split("");
    data.occupied = intervals.map((e, ix) =>
        data.value.reduce((pv, cv) =>
            pv + parseInt(cv.availabilityView[ix]), 0))
    data.available = intervals.map((e, ix) => data.value.length - data.occupied[ix])
    return data;
}

/**
 * Processes the data return from the MS Graph Booth Schedule call. The API result contains a list of
 * events for the calendar:
 * <pre>
 * [
 *   {
 *     "id": "...",
 *     "subject": "...",
 *     "start": {"dateTime": "2021-11-02T14:00", "timeZone": "UTC"},
 *     "end": {"dateTime": "2021-11-02T14:00", "timeZone": "UTC"},
 *     "attendees": [
 *        {
 *           "emailAddress": {"name": "...", "address": "..."},
 *           "status": {"response": "accepted"},
 *           "type": "required"
 *        },
 *        ...
 *     ]
 *   },
 *   ...
 * ]
 * </pre>
 *
 * Filters the attendee data to add two properties, booths and acceptedBooths that holds the list for
 * "booth attendees" and "booth attendees with accepted status" only.
 *
 * @param calendarData
 * @returns *[]
 */
export const findBooths = calendarData => {
    return calendarData
        .map(e => {
            e = {...e}
            e.booths = e.attendees.filter(address =>
                zoomBooths.indexOf(address.emailAddress.address.toLowerCase()) >= 0);
            e.acceptedBooths = e.booths.filter(address =>
                address.status.response.toLowerCase().indexOf("accepted") >= 0);
            return e;
        })
}

export const enrichCalendarData = (calendarData, dates) => {
    const data = calendarData.map(e => {
        e = {...e}
        e.startTime = dayjs.tz(e.start.dateTime, e.start.timeZone).unix();
        e.endTime = dayjs.tz(e.end.dateTime, e.end.timeZone).unix();
        e.startIndex = Math.floor((e.startTime  - dates.startTime) / dates.interval);
        e.endIndex = Math.ceil((e.endTime  - dates.startTime) / dates.interval) - 1;
        return e;
    });
    data.intervals = data.reduce((arr, e) => {
        for (let i=e.startIndex;i<=e.endIndex;i++) {
            arr[i] = e.id;
        }
        return arr;
    }, [])
    return data;
}

