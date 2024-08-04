import { Day } from './DayOfWeek';

function WeatherInfo(data) {
    const days = populateDays(data.days);
    // don't actually need below because we just retrieve them based on 
    // either max temp day hour, chosen temp, nvm we do

    // get day name and current hour here based on location
    const currentDate = new Date(`${data.days[0].datetime}T${data.datetime}`);
    const currentConditions = {
        temperature: "",
        precipitation: "",
        humidity: "",
        windSpeed: "",
        dayName: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
        conditions: data.conditions,
    }

    function populateDays(dayArray) {
        const tempArray = []
        for (let i = 0; i < 8; i++) {
            tempArray.push(Day(dayArray[i]));
        }

        return tempArray;
    }
}

export { WeatherInfo };