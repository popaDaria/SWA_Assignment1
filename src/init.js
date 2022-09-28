import model from './model.js'
import presenter from './presenter.js'
import view from './view.js'

function display(theView, weather = []) {
    const theModel = model(weather)
    const thePresenter = presenter(theModel, theView)
    theView.listen(thePresenter.onAction)
    theView.update(theModel)
}

async function init() {
    getData('');
}

async function getData(url){
    const theView = view(window)
    try {
        const response = await fetch('http://localhost:8080/data/'+url)
        if (!response.ok) throw response.statusText
        const weather = await response.json()
        display(theView, weather)
        theView.displayError('')
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

init()
