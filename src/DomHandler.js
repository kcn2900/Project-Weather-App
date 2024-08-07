import Chart from 'chart.js/auto';

const topSection = document.createElement('div');
const botSection = document.createElement('div');

function Display(info, content) {
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';

    topSection.className = 'top-section';
    botSection.className = 'bot-section';

    content.append(canvas);
    content.append(topSection);
    content.append(botSection);

    topSection.append(...handleTop(info));
    botSection.append(...createCard(info.days));
    
    handleChart();
}

function createCard(dayArray) {
    const result = [];
    for (let i = 0; i < dayArray.length; i++) {
        const day = dayArray[i].day;
        const tempDiv = document.createElement('div');
        const shortDayName = document.createElement('p');
        const dualTemp = document.createElement('p');
        const tempHour = createHourCard(dayArray[i].hours);

        tempDiv.id = 'bot-card';
        shortDayName.id = 'bot-card-day';
        dualTemp.id = 'bot-card-temp';

        // tempDiv.textContent = JSON.stringify(dayArray[i].day);

        tempDiv.append(shortDayName, dualTemp);
        tempDiv.append(tempHour);

        shortDayName.textContent = dayArray[i].dayName.slice(0, 3);
        dualTemp.textContent =
            `${day.maxTemp} / ${day.minTemp}`;

        tempDiv.addEventListener('click', (e) => {
            const target = e.target.id;
            if (target === 'bot-card-day' || target === 'bot-card-temp') {
                switchTop({ ...day, dayName: dayArray[i].dayName });
                hideHourCard();
                tempHour.classList.remove('hour-hidden');
            }
        });
        result.push(tempDiv);
    }
    return result;
}

function hideHourCard() {
    const botCards = botSection.children;
    for (let i = 0; i < botCards.length; i++) {
        const hourCard = botCards[i].lastChild;
        hourCard.classList.add('hour-hidden');
    }
}

function createHourCard(hourArray) {
    const result = []
    for (let i = 0; i < hourArray.length; i++) {
        const data = hourArray[i].data;
        const time = hourArray[i].time;

        const div = document.createElement('div');
        const timeElement = document.createElement('p');
        const tempElement = document.createElement('p');

        div.className = 'bot-card-hour-data';

        let timeChange;
        if (time === 0)
            timeChange = `12 AM`;
        else if (time < 12)
            timeChange = `${time} AM`;
        else if (time === 12)
            timeChange = `12 PM`;
        else
            timeChange = `${time - 12} PM`;

        timeElement.textContent = timeChange;
        tempElement.textContent = data.temp;

        div.append(timeElement, tempElement);

        div.addEventListener('click', () => {
            const info = {
                temperature: data.temp,
                precipitation: data.precipprob,
                humidity: data.humidity,
                time: time,
                windSpeed: data.windspeed,
                dayName: hourArray[i].dayName,
                conditions: data.conditions,
            };
            switchTop(info);
        })

        result.push(div);
    }
    const card = document.createElement('div');

    card.className = 'bot-card-hour'
    card.classList.add('hour-hidden');

    card.append(...result);

    return card;
}

function switchTop(info) {
    const [left, right] = topSection.children;
    const [temp, list] = left.children;
    const [_, dayAndTime, conditions] = right.children;

    temp.textContent = info.temperature ? info.temperature : info.maxTemp;
    list.children[0].textContent = `Precipitation: ${info.precipitation}%`;
    list.children[1].textContent = `Humidity: ${info.humidity}%`;
    list.children[2].textContent = `Wind: ${info.windSpeed} mph`;

    let timeChange;
    if (info.time) {
        if (info.time === 0)
            timeChange = `12:00 AM`;
        else if (info.time < 12)
            timeChange = `${info.time}:00 AM`;
        else if (info.time === 12)
            timeChange = `12:00 PM`;
        else
            timeChange = `${info.time - 12}:00 PM`;
    }

    dayAndTime.textContent = `${info.dayName}${info.time ?
        ` ${timeChange}`
        : ''}`;
    conditions.textContent = info.conditions;
}

function handleTop(info) {
    const curr = info.currentConditions;

    // handle left side of top section
    const left = document.createElement('div');
    const leftCol1 = document.createElement('p');
    const leftCol2 = document.createElement('ul');
    const item1 = document.createElement('li');
    const item2 = document.createElement('li');
    const item3 = document.createElement('li');

    left.className = 'top-left';
    leftCol1.className = 'top-left-col1';
    leftCol2.className = 'top-left-col2';

    left.append(leftCol1, leftCol2);
    leftCol2.append(item1, item2, item3);

    leftCol1.textContent = curr.temperature;
    item1.textContent = `Precipitation: ${curr.precipitation}%`;
    item2.textContent = `Humidity: ${curr.humidity}%`;
    item3.textContent = `Wind: ${curr.windSpeed} mph`;

    // handle right side of top section
    const right = document.createElement('ul');
    const rightTitle = document.createElement('h3')
    const day = document.createElement('li');
    const condition = document.createElement('li');

    right.className = 'top-right';

    right.append(rightTitle, day, condition);

    rightTitle.textContent = 'Weather';
    day.textContent = curr.dayName;
    condition.textContent = curr.conditions;

    return [left, right];
}

function handleChart(info) {
    const xValues = []
    for (let i = 0; i < 25; i++)
        xValues.push(i);

    const yValues = [0, 1, 2, 3, 4, 5, 6];

    new Chart('myChart', {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: null,
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    }
                }

            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: true,
                }
            }
        }
    });
}

export { Display };