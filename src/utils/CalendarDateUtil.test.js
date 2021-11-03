import dayjs from "dayjs";
import {
    calendarTimeZone,
    enrichCalendarData,
    findBooths,
    getDatePeriod,
    getNextWorkingday,
    transformBoothData,
    transformCalendarData,
    zoomBooths
} from "./CalendarDataUtil";

test('next working day on normal weekday', () => {
    let date = getNextWorkingday(dayjs('2021-07-05'))
    expect(date.format("YYYY-MM-DD")).toEqual("2021-07-05")
});

test('next working day on normal saturday', () => {
    let date = getNextWorkingday(dayjs('2021-07-10'))
    expect(date.format("YYYY-MM-DD")).toEqual("2021-07-12")
});

test('next working day as DST starts', () => {
    let date = getNextWorkingday(dayjs('2021-03-27'))
    expect(date.format("YYYY-MM-DD")).toEqual("2021-03-29")

    date = getNextWorkingday(dayjs('2021-03-28'))
    expect(date.format("YYYY-MM-DD")).toEqual("2021-03-29")
});

test('next working day as DST ends', () => {
    let date = getNextWorkingday(dayjs('2021-10-30'))
    expect(date.format("YYYY-MM-DD")).toEqual("2021-11-01")

    date = getNextWorkingday(dayjs('2021-10-31'))
    expect(date.format("YYYY-MM-DD")).toEqual("2021-11-01")
});

test('test date period with no inputs', () => {
    const period = getDatePeriod()
    expect(period.dates).toHaveLength(1);
    expect(period.dates[0].date).toEqual(dayjs().format("YYYY-MM-DD"))
});

test('test date period with date input', () => {
    const period = getDatePeriod(new Date())
    expect(period.dates).toHaveLength(1);
    expect(period.dates[0].date).toEqual(dayjs().format("YYYY-MM-DD"))
});

test('test date period with string input', () => {
    const period = getDatePeriod("2021-07-05")
    expect(period.dates).toHaveLength(1);
    expect(period.dates[0].date).toEqual("2021-07-05")
});

test('Test multiple days', () => {
    const period = getDatePeriod("2021-07-05", 2)
    expect(period.dates).toHaveLength(2);
    expect(period.dates[0].date).toEqual("2021-07-05")
    expect(period.dates[1].date).toEqual("2021-07-06")
});

test('Test weekend span', () => {
    const period = getDatePeriod("2021-07-09", 2)
    expect(period.dates).toHaveLength(2);
    expect(period.dates[0].date).toEqual("2021-07-09")
    expect(period.dates[1].date).toEqual("2021-07-12")
});

test('Test day start/end', () => {
    const {dates, startTime, endTime} = getDatePeriod("2021-07-05")
    expect(dates[0].startTime).toEqual(startTime)
    expect(dates[0].endTime).toEqual(endTime)
    expect(dayjs.unix(startTime).tz(calendarTimeZone).format("YYYY-MM-DD HH:mm:ssZ")).toEqual("2021-07-05 08:00:00+01:00")
    expect(dayjs.unix(endTime).tz(calendarTimeZone).format("YYYY-MM-DD HH:mm:ssZ")).toEqual("2021-07-05 19:00:00+01:00")
});

test('Test day start GMT/end BST', () => {
    const {dates, startTime, endTime} = getDatePeriod("2021-03-25", 5)
    expect(dayjs.unix(startTime).tz(calendarTimeZone).format("YYYY-MM-DD HH:mm:ssZ")).toEqual("2021-03-25 08:00:00+00:00")
    expect(dayjs.unix(endTime).tz(calendarTimeZone).format("YYYY-MM-DD HH:mm:ssZ")).toEqual("2021-03-31 19:00:00+01:00")

    expect(dates.map(d => dayjs.unix(d.noon).tz(calendarTimeZone).format("YYMMDDHHmm")))
        .toEqual(["2103251200", "2103261200", "2103291200", "2103301200", "2103311200"])
    expect((dates[2].noon - dates[1].noon) / 3600).toEqual(24+24+24-1)
});

test('Test day start BST/end GMT', () => {
    const {dates, startTime, endTime} = getDatePeriod("2021-10-29", 2)
    expect(dayjs.unix(startTime).tz(calendarTimeZone).format("YYYY-MM-DD HH:mm:ssZ")).toEqual("2021-10-29 08:00:00+01:00")
    expect(dayjs.unix(endTime).tz(calendarTimeZone).format("YYYY-MM-DD HH:mm:ssZ")).toEqual("2021-11-01 19:00:00+00:00")
    expect((dates[1].noon - dates[0].noon) / 3600).toEqual(24+24+24+1)
});

test('Test intervals', () => {
    const period = getDatePeriod("2021-10-29", 5);
    expect(period.intervals[period.intervalCount-1] + (period.interval)).toEqual(period.endTime)

    // The first and last index for each date should correspond to the startTime and start of the last period.
    period.datesIndexes.forEach((arr, ix) => {
        expect(period.intervals[arr[0]]).toEqual(period.dates[ix].startTime);
        expect(period.intervals[arr[arr.length-1]] + period.interval).toEqual(period.dates[ix].endTime);
    })
});

test('Transform booth data by adding combined metrics', () => {
    const boothData = {
        value: [
            {availabilityView: "00111000"},
            {availabilityView: "00001100"},
            {availabilityView: "00011100"},
        ]
    };
    const output = transformBoothData(boothData);
    expect(output.occupied).toEqual([0, 0, 1, 2, 3, 2, 0, 0]);
    expect(output.available).toEqual([3, 3, 2, 1, 0, 1, 3, 3]);
    expect(output.value).toBe(boothData.value)
});

test('Find booth information', () => {
    const calendarData = [{
        attendees: [
            {emailAddress:{address:zoomBooths[0]}, status: {response: "accepted"}},
            {emailAddress:{address:zoomBooths[1]}, status: {response: "declined"}},
            {emailAddress:{address:"other@domain.com"}, status: {response: "accepted"}}
        ]
    }];
    const output = findBooths(calendarData);
    expect(output[0].booths).toEqual([
        {emailAddress:{address:zoomBooths[0]}, status: {response: "accepted"}},
        {emailAddress:{address:zoomBooths[1]}, status: {response: "declined"}},
    ])
    expect(output[0].acceptedBooths).toEqual([
        {emailAddress:{address:zoomBooths[0]}, status: {response: "accepted"}},
    ])
});

test('Enrich booth information', () => {
    const calendarData = [{
        id: "E1",
        start:{dateTime:"2021-07-01T10:00", timeZone: "Europe/London"},
        end:{dateTime:"2021-07-01T11:00", timeZone: "Europe/London"},
    },{
        id: "E2",
        start:{dateTime:"2021-07-01T13:05", timeZone: "Europe/London"},
        end:{dateTime:"2021-07-01T13:30", timeZone: "Europe/London"},
    },{
        id: "E3",
        start:{dateTime:"2021-07-01T14:05", timeZone: "Europe/London"},
        end:{dateTime:"2021-07-01T14:45", timeZone: "Europe/London"},
    }];
    const dates = getDatePeriod("2021-07-01");
    const output = enrichCalendarData(calendarData, dates);
    expect(output[0].startIndex).toEqual(4);
    expect(output[0].endIndex).toEqual(5);
    expect(output[1].startIndex).toEqual(10);
    expect(output[1].endIndex).toEqual(10);
    expect(output[2].startIndex).toEqual(12);
    expect(output[2].endIndex).toEqual(13);

    expect(output.intervals.join(".")).toEqual("....E1.E1.....E2..E3.E3")
});