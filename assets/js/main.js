let map = L.map('mapid', { center: [51.505, -0.09], zoom: 6 }),
    markers = new L.LayerGroup().addTo(map);

L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png").addTo(map);

var refinedCountry = [];
var state = [];

var orangeIcon = L.icon({
    iconUrl: 'assets/images/circle.png',

    iconSize:     [10, 10], // size of the icon
    iconAnchor:   [0,0], // point of the icon which will correspond to marker's location
    popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
});

//html button function 
function displayMyData() {
    let testingThis = document.getElementsByName("ground");
    if (testingThis[0].checked) {
        for (let i = 0; i < refinedCountry.length; i++) {
            if (refinedCountry[i][8] != true) {
                refinedCountry.pop(refinedCountry[i]);
            }
        }
        console.log(refinedCountry);
        drawToMap();
    }
    else if (testingThis[1].checked) {
        for (let i = 0; i < refinedCountry.length; i++) {
            if (refinedCountry[i][8] == true) {
                refinedCountry.pop(refinedCountry[i]);
            }
        }
        console.log(refinedCountry);
        drawToMap();
    }
}


function drawToMap() {
    console.log(refinedCountry)
    markers.clearLayers();
    for (let i = 0; i < refinedCountry.length; i++) {
        if (refinedCountry[i][5] != null || refinedCountry[i][6] != null) {
            let flightsGeo = L.marker([refinedCountry[i][6], refinedCountry[i][5]], {icon: orangeIcon});
            flightsGeo.addTo(markers);
        }
    }
}


//api load//
const api_url = "https://opensky-network.org/api/states/all"

async function testGetData() {
    let response = await fetch(api_url);
    let data = await response.json();
    return data.states;
}

function getData() {
    //   let response = await fetch(api_url);
    // let data = await response.json();

    //drill down to array containing flights (console.log(state); returns all flights)//
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
getData();

function selectChanged() {
    refinedCountry = [];
    let countrySearch = document.getElementById("select").value;
    for (let i = 0; i < state.length; i++) {
        if (state[i][2] === countrySearch) {
            refinedCountry.push(state[i]);
        }
        //Add flights with matching country to map
    }

    console.log(refinedCountry)
}

var myVar;
function myFunction() {
    myVar = setInterval(every5sec, 5000);
}

function every5sec() {
    getData();
    selectChanged();
    displayMyData();
}
myFunction();


//----Slider Element----//

// let mySlider = new rSlider({
//     target: '#sampleSlider',
//     values: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
//     range: true,
//     tooltip: true,
//     scale: true,
//     labels: true,
//     set: [2010, 2013]
// });

//------ ⬇⬇⬇ ROUGH WORK - DON'T DEletE UNTIL FINAL COMMIT ⬇⬇⬇--------//


// Display flights based on in on ground or not

//     function displayMyData(){
//         let testingThis = document.getElementByName("ground");
//         for(let i = 0; i <= testingThis.length; i++){
//             if (testingThis[0].checked){
//                 console.log("hello")
//         for (let i = 0; i < state.length; i++) {
//             if (state[i][8] === true) {
//                 console.log(state[i])
//             }
//     }

//         else if (testingThis[1].checked){
//                 for (let i = 0; i < state.length; i++) {
//                     if (state[i][8] === false) {
//                         console.log(state[i])
//                     }
//     }
// }
// }

//Map Data//

// let dataObject = mapData.map(item => {
//         return {
//             icao24: item[0],
//             callsign: item[1],
//             origin_country: item[2],
//             time_position: item[3],
//             last_contact: item[4],
//             longitude: item[5],
//             latitude: item[6],
//             baro_altitude: item[7],
//             on_ground: item[8],
//             velocity: item[9],
//             true_track: item[10],
//             vertical_rate: item[11],
//             sensors: item[12],
//             geo_altitude: item[13],
//             squawk: item[14],
//             spi: item[15],
//             position_source: item[16]
//         }

// });