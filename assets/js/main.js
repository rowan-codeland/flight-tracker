//setting map and markers layer up
let map = L.map('mapid', { center: [53.35, -6.26], zoom: 6, minZoom: 4, maxZoom: 8 }),
    markers = new L.LayerGroup().addTo(map);

//adding tiles for design
L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png").addTo(map);

var refinedCountry = [];
var state = [];

var orangeIcon = L.icon({
    iconUrl: 'assets/images/circle.png',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, 0]
});

document.getElementById("airbutton").checked = true;

//html button function 
function displayMyData() {
    let testingThis = document.getElementsByName("ground");
    if (testingThis[0].checked) {
        for (let i = 0; i < refinedCountry.length; i++) {
            if (refinedCountry[i][8] != true) {
                refinedCountry.pop(refinedCountry[i]);
            }
        }
        drawToMap();
    }
    else if (testingThis[1].checked) {
        for (let i = 0; i < refinedCountry.length; i++) {
            if (refinedCountry[i][8] == true) {
                refinedCountry.pop(refinedCountry[i]);
            }
        }
        drawToMap();
    }
}


function drawToMap() {
    markers.clearLayers();
    for (let i = 0; i < refinedCountry.length; i++) {
        if (refinedCountry[i][5] != null || refinedCountry[i][6] != null) {
            let speed = (refinedCountry[i][9] * 3.6);
            let flightsGeo = L.marker(
                [refinedCountry[i][6], refinedCountry[i][5]],
                { icon: orangeIcon }).bindPopup(('Call Sign: ' + refinedCountry[i][1] + '<br> Speed: ' + Math.round(speed) + 'km/h')
                );
            flightsGeo.addTo(markers);
        }
    }
}


//api load
const api_url = "https://opensky-network.org/api/states/all"

async function testGetData() {
    let response = await fetch(api_url);
    let data = await response.json();
    return data.states;
}

function getData() {

    testGetData().then(function (data) {
        state = data;
        let countryList = [];

        // Remove duplicate countries from API and push to countryList array
        for (let i = 0; i < state.length; i++) {
            if (countryList.includes(state[i][2]) || state[i][2] === "") { }
            else {
                countryList.push(state[i][2]);
            }
        }
        // Sort countries alphabetically
        countryList.sort(function (country1, country2) {
            if (country1 > country2) {
                return 1;
            }
            else {
                return -1;
            }
        });

        // Add countries to dropdown
        let select = document.getElementById("select");
        for (let i = 0; i < countryList.length; i++) {
            let option = document.createElement("OPTION"),
                txt = document.createTextNode(countryList[i]);
            option.appendChild(txt);
            option.setAttribute("value", countryList[i]);
            select.insertBefore(option, select.lastChild);
        }

        // Search countries from dropdown
        document.getElementById("select").addEventListener("change", selectChanged);

    });
}


document.getElementById("select").addEventListener("change", selectChanged);

function selectChanged() {
    refinedCountry = [];
    let countrySearch = document.getElementById("select").value;
    for (let i = 0; i < state.length; i++) {
        if (state[i][2] === countrySearch) {
            refinedCountry.push(state[i]);
        }
    }
}

//refresh data every 5 seconds and calls functions neeccesary to display to map
let timing;
function timer() {
    timing = setInterval(every5sec, 5000);
}

function every5sec() {
    getData();
    selectChanged();
    displayMyData();
}
timer();

