import model from './model.js'
import { WeatherMeasurement } from './model.js'
import view from './view.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function display(theView, weather = []) {
    const theModel = model(weather)
    theView.update(theModel)
}

async function init() {
    getData('Horsens');
    hideDirection();
    hidePrecipitation();
}

async function getData(url) {
    const theView = view(window)
    try {
        const response = await fetch('http://localhost:8080/data/' + url)
        if (!response.ok) throw response.statusText
        const weather = await response.json()
        display(theView, weather)
        theView.displayError('')
    } catch (e) {
        theView.displayError(e)
    }
}

var form = document.getElementById("addWeatherData");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

const formButton = document.getElementById('formButton');
formButton.addEventListener('click', postData)

async function postData() {
    const theView = view(window)
    const type = typeSelect.value;
    const city = document.getElementById('city').value;
    let precipitationType;
    let windDirection;
    let unit;
    if (type === 'precipitation') {
        precipitationType = document.getElementById('precipitation-type').value;
        unit = 'mm'
    }
    if (type === 'wind speed') {
        windDirection = document.getElementById('wind-direction').value;
        unit = 'm/s'
    }
    if (type === 'temperature') {
        unit = 'C'
    }
    if (type === 'cloud coverage') {
        unit = '%'
    }
    const value = document.getElementById('value').value;
    const weather = WeatherMeasurement(type, unit, new Date(), city, value, precipitationType, windDirection)
    let jsonString = '';
    if (windDirection) {
        jsonString = JSON.stringify({ value: weather.getValue(), direction: weather.getDirection(), type: weather.getType(), unit: weather.getUnit(), time: weather.getTime(), place: weather.getPlace() })
    } else if (precipitationType) {
        jsonString = JSON.stringify({ value: weather.getValue(), precipitation_type: weather.getPrecipType(), type: weather.getType(), unit: weather.getUnit(), time: weather.getTime(), place: weather.getPlace() })
    } else {
        jsonString = JSON.stringify({ value: weather.getValue(), type: weather.getType(), unit: weather.getUnit(), time: weather.getTime(), place: weather.getPlace() })
    }

    try {
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        const weatherResponse = await fetch('http://localhost:8080/data', { method: 'POST', body: jsonString, headers })
        if (!weatherResponse.ok) throw weatherResponse.statusText
        theView.displayError('')
        console.log(weatherResponse)
    } catch (e) {
        theView.displayError(e)
    }
}

var radioSelection = document.placeSelection.placeRadio;
for (var i = 0; i < radioSelection.length; i++) {
    radioSelection[i].addEventListener('change', function () {
        getData(this.value)
    });
}

const typeSelect = document.getElementById('type');

typeSelect.addEventListener('change', () => {
    if (typeSelect.value === 'temperature' || typeSelect.value === 'cloud coverage') {
        hidePrecipitation();
        hideDirection();
    } else if (typeSelect.value === 'wind speed') {
        showDirection();
        hidePrecipitation();
    } else {
        showPrecipitation();
        hideDirection();
    }
});

function hidePrecipitation() {
    const prec = document.getElementById('precipitation-type');
    prec.style.display = 'none';
}
function showPrecipitation() {
    const prec = document.getElementById('precipitation-type');
    prec.style.display = 'initial';
}
function hideDirection() {
    const dir = document.getElementById('wind-direction');
    dir.style.display = 'none';
}
function showDirection() {
    const dir = document.getElementById('wind-direction');
    dir.style.display = 'initial';
}

init()
