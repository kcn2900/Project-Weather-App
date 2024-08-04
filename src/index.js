import './styles.css';

// handles the DOM of the information

(() => {
    const content = document.getElementById('content');
    const main = document.createElement('div');
    const temp = document.createElement('div');

    main.className = 'main';
    temp.className = 'json';

    content.append(main);
    main.append(temp);
    
    
    callAPI().then((data) => {
        temp.textContent = JSON.stringify(data);
    })

})()

async function callAPI(location='us') {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=NTW39FSLBM4MASB6PYGKGGZMC`,
        { mode: 'cors' }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}