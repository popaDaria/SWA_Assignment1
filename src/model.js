const model = (weather, filter = () => true) => {
    const weatherData = () => weather
        .map(w => WeatherMeasurement(w.type, w.unit, w.time, w.place, w.value, w.precipitation_type, w.direction))
        .filter(filter)

    const forecastData = () => weather
        .map(w => ForecastMeasurement(w.type, w.unit, w.time, w.place, w.from, w.to, w.precipitation_types, w.directions))
        .filter(filter)

    const temperatureData = () => weather.map(p => p.value).filter(filter)
    const all = () => model(weather)

    return { weatherData, all, temperatureData, forecastData }
}

export default model


function SimpleMeasurement(type, unit, time, place) {
    function getTime() { return time }
    function getPlace() { return place }
    function getType() { return type }
    function getUnit() { return unit }

    return { getTime, getPlace, getType, getUnit }
}

export function WeatherMeasurement(type, unit, time, place, value, precipitation_type, direction) {
    let baseMeasurement = SimpleMeasurement(type, unit, time, place)
    function getValue() { return value }
    function getPrecipType() { return precipitation_type }
    function getDirection() { return direction }

    return { ...baseMeasurement, getValue, getPrecipType, getDirection }
}

function ForecastMeasurement(type, unit, time, place, from, to, precipitation_types, directions) {
    let baseMeasurement = SimpleMeasurement(type, unit, time, place)
    function getFromValue() { return from }
    function getToValue() { return to }
    function getPrecipTypes() { return precipitation_types }
    function getDirections() { return directions }

    return { ...baseMeasurement, getFromValue, getToValue, getPrecipTypes, getDirections }
}

export function getMinTemperature(weather){
    let min = weather[0].getValue();
    for (let i = 0; i < weather.length; i++) {
        const newDate = new Date(weather[i].getTime())

        if(weather[i].getType() === "temperature" && isDateYesterday(newDate.getUTCDate()) && weather[i].getValue() < min) {
            min=weather[i].getValue();
        }
    }
    return min;
}

export function getMaxTemperature(weather){
    let max = weather[0].getValue();
    for (let i = 0; i < weather.length; i++) {
        const newDate = new Date(weather[i].getTime())
        if(weather[i].getType() === "temperature" && isDateYesterday(newDate.getUTCDate()) && weather[i].getValue() > max) {
            max=weather[i].getValue();
        }
    }
    return max;
}

export function getTotalPrecipitation(weather) {
    let sum = 0;
    for (let i = 0; i < weather.length; i++) {
        const newDate = new Date(weather[i].getTime())
        if(weather[i].getType() === "precipitation" && isDateYesterday(newDate.getUTCDate())) {
            sum+=weather[i].getValue();
        }
    }
    return Math.round((sum + Number.EPSILON) * 100) / 100
}

export function getAverageWindSpeed(weather) {
    let sum = 0;
    let count = 0
    for (let i = 0; i < weather.length; i++) {
        const newDate = new Date(weather[i].getTime())

        if(weather[i].getType() === "wind speed" && isDateYesterday(newDate.getUTCDate())) {
            sum+=weather[i].getValue();
            count++;
        }
    }
    return Math.round((sum/count + Number.EPSILON) * 100) / 100

}

function isDateYesterday(dateToCheck) {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return dateToCheck === yesterday.getUTCDate();
}

// let x = WeatherMeasurement('precip','m/s','20220922','Horsens',12.5,'rain',undefined)
// let x = ForecastMeasurement('precip','m/s','20220922','Horsens',12.5,15,['rain','hail'],undefined)
// console.log(x.getPrecipTypes())
