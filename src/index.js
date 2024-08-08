import './styles.css';
import { WeatherInfo } from './WeatherInfo.js';
import { Display } from './DomHandler.js';
import { Form } from './FormHandler.js';
import tempJSON from './temp.json';
import key from './api_key.json';

// handles the DOM of the information

(() => {
    const content = document.getElementById('content');
    const form = Form().form;

    content.append(form);

    const submit = form.querySelector('.form-submit');
    submit.addEventListener('click', (e) => {
        e.preventDefault();

        const value = document.getElementById('location').value;
        const arg = value ? value : 'us';
        handleInfo(arg);
    })
    // temporary use static data to test code before using api calls
    // console.log(tempJSON);
    // const json = JSON.stringify(tempJSON);
    // const info = WeatherInfo(tempJSON);
    // const DomHandler = Display(info, content);

    // handleInfo();

})();

function handleInfo(location) {
    callAPI(location)
        .then((data) => {
            const info = WeatherInfo(data);
            // console.log(info.days);
            Display(info);
        })
        .catch((err) => {
            alert(err);
            console.log(err);
        });
}

async function callAPI(location = 'us') {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key['key']}`,
        { mode: 'cors' }
    );

    console.log(response);
    if (response.status !== 200)
        throw new Error(`${response.status}`);

    const data = await response.json();
    console.log(data);
    return data;
}