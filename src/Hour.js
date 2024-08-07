function Hour(obj) {
    const data = obj.data;
    const time = obj.time;
    const hour = {
        temperature: data.temp,
        precipitation: data.precipprob,
        humidity: data.humidity,
        windSpeed: data.windspeed,
        conditions: data.conditions
    }

    return {
        hour, time
    }
}

export { Hour };