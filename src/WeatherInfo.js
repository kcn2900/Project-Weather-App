import { Day } from './DayOfWeek';

function WeatherInfo(data) {
    // get current day and hour based on location
    const curr = data.currentConditions;
    const currentDate = new Date(`${data.days[0].datetime}T${curr.datetime}`);
    const days = populateDays(data.days);
    const currentConditions = {
        temperature: curr.temp,
        precipitation: curr.precipprob,
        humidity: curr.humidity,
        windSpeed: curr.windspeed,
        dayName: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
        conditions: curr.conditions,
    }

    function populateDays(dayArray) {
        const tempArray = []
        const tempDate = new Date(currentDate)
        
        // fill in weather information for each day (and by the hour)
        for (let i = 0; i < 8; i++) {
            const tempDay = tempDate.toLocaleDateString('en-US', { weekday: 'long' });
            const tempHour =
                (i == 0 ?
                    (tempDate.getMinutes() <= 30 ?
                        tempDate.getHours() : tempDate.getHours() + 1)
                    : 0);

            tempArray.push(Day({
                data: dayArray[i],
                dayName: tempDay,
                hour: tempHour,
            }));
            
            tempDate.setDate(tempDate.getDate() + 1); // increment day

            // fill in each day's tri-hourly weather condition
            if (i !== 0) {
                tempArray[i].populateHours();
            }
        }

        // fill in current day's tri-hourly weather condition
        // (seperate as current day can go into next day's hours)
        tempArray[0].populateHours(tempArray[1]);

        // console.log(tempArray)
        return tempArray;
    }

    return {
        days, currentConditions
    };
}

export { WeatherInfo };