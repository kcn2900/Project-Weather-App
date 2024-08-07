function Day(obj) {
    const data = obj.data;
    const dayName = obj.dayName;
    const hour = obj.hour;
    const hours = [];

    // hour with hottest condition
    const defaultHour = [...data.hours]
        .sort((a, b) => a.temp - b.temp)[23];

    const day = {
        maxTemp: data.tempmax,
        minTemp: data.tempmin,
        precipitation: data.precipprob,
        humidity: data.humidity,
        windSpeed: data.windspeed,
        conditions: data.conditions,
    };

    const populateHours = (nextDay = null) => {
        for (let i = hour; i <= (hour + 21); i += 3) {
            const hourData = i >= 24 ? nextDay.hours[i - 24] : data.hours[i];
            const hourDayName = i >= 24 ? nextDay.dayName : dayName;
            const hourTime = i >= 24 ? i - 24 : i;

            let timeChange;
            if (hourTime === 0)
                timeChange = `12:00 AM`;
            else if (hourTime < 12)
                timeChange = `${hourTime}:00 AM`;
            else if (hourTime === 12)
                timeChange = `12:00 PM`;
            else
                timeChange = `${hourTime - 12}:00 PM`;

            const hourObj = {
                data: hourData,
                dayName: hourDayName,
                time: timeChange,
            };
            hours.push(hourObj);
        }
    }

    return {
        day, dayName, hour, hours, defaultHour,
        populateHours
    }
}

export { Day };