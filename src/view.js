export default window => {
    const document = window.document
    const table_body = document.getElementById('weather_data')
    const listeners = []

    const listen = l => listeners.push(l)

    const displayError = e => {
        const msg_board = document.getElementById('error_messages')
        msg_board.innerText = e
    }

    const addWeather = p => {
        const tr = table_body.appendChild(document.createElement('tr'))
        tr.insertCell().appendChild(document.createTextNode(p.getType()))
        tr.insertCell().appendChild(document.createTextNode(p.getTime()))
        tr.insertCell().appendChild(document.createTextNode(p.getPlace()))
        tr.insertCell().appendChild(document.createTextNode(p.getValue()))
        tr.insertCell().appendChild(document.createTextNode(p.getUnit()))
        if (p.getPrecipType()) {
            tr.insertCell().appendChild(document.createTextNode(p.getPrecipType()))
        } else {
            tr.insertCell()
        }

        if (p.getDirection()) {
            tr.insertCell().appendChild(document.createTextNode(p.getDirection()))
        } else {
            tr.insertCell()
        }
    }

    const update = model => {
        while (table_body.firstChild) table_body.removeChild(table_body.firstChild)
        model.weatherData().forEach(addWeather)
    }

    const prompt = window.prompt.bind(window)

    return { listen, displayError, prompt, update }
}
