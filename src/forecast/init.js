import model from '../model.js'
import view from './view.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function display(theView, forecast = []) {
    const theModel = model(forecast)
    theView.update(theModel)
}

async function init() {
    getData('');
}

async function getData(url){
    const theView = view(window)
    try {
        const response = await fetch('http://localhost:8080/forecast/'+url)
        if (!response.ok) throw response.statusText
        const weather = await response.json()
        display(theView, weather)
        theView.displayError('')
    } catch (e) {
        theView.displayError(e)
    }
}

var radioSelection = document.placeSelection.placeRadio;
var prev = null;
for (var i = 0; i < radioSelection.length; i++) {
    radioSelection[i].addEventListener('change', function () {
        if (this !== prev) {
            prev = this;
        }
        getData(this.value)
    });
}

init()
