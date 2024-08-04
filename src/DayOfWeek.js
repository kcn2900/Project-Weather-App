function Day(obj) {
    const data = obj.data;
    const dayName = obj.dayName;
    const day = {
        maxTemp: data.tempmax,
        minTemp: data.tempmin,
        precipitation: data.precipprob,
        humidity: data.humidity,
        windSpeed: data.windspeed,
        conditions: data.conditions,
    };
    const hours = populateHours(data.hours)

    function populateHours(hourArray) {

    }

    return {  }
}

export { Day };