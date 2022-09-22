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

function WeatherMeasurement(type, unit, time, place, value, precipitation_type, direction) {
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

// let x = WeatherMeasurement('precip','m/s','20220922','Horsens',12.5,'rain',undefined)
// let x = ForecastMeasurement('precip','m/s','20220922','Horsens',12.5,15,['rain','hail'],undefined)
// console.log(x.getPrecipTypes())
