//MAP LOAD//

const mymap = L.map('mapid').setView([39, -80.5], 6);
// const marker = L.marker([0, 0]).addTo(mymap);

const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>';

let tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
let tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//MAP MARKERS//

//api load//

const api_url = "https://opensky-network.org/api/states/all"


async function getData() {
    let response = await fetch(api_url);
    let data = await response.json();
    let state = data.states;
    let countryList = [];
    let mapData = [];

// Push countries and remove duplicates

    for (let i = 0; i < state.length; i++) {
        if (countryList.includes(state[i][2]) || state[i][2] === "") { }
        else {
            countryList.push(state[i][2]);
        }
    }
// Sort Alphabetically
    
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

//Search countries
    document.getElementById("select").addEventListener("change", selectChanged)
    function selectChanged() {
        let mapData = [];
        var countrySearch = document.getElementById("select").value;
            for(let i = 0; i < state.length; i++){
                for(let j = 0; j <= [i].length; j++){
                    if(state[i][2] === countrySearch){ 
                        mapData.push(state[i]);
            } 
    }
    }
    console.log(mapData);
}
}
getData();

// for(let i = 0; i < 10; i++){
//     L.polyline(([dataObject[i].latitude, dataObject[i].longitude]), {color: 'red'}).addTo(mymap);
//     // L.marker([dataObject[i].latitude, dataObject[i].longitude]).addTo(mymap);
//     // latitude: dataObject[i].latitude,
//     // longitude: dataObject[i].longitude
//     }


// document.getElementById("demo").innerHTML = "You sekected:" + xyz;
// console.log(xyz);
// setInterval(getData, 1000);




// var latLong = state

// for(let i=0; i < 10; i++){
//         state[i] = { 
//             long: i+1,
//             lat: i+1
//         };
//     }
// };
// console.log(latLong);

// Example

// function doSomething(country, something, else){
//     var whatToReturn = []
//     const response = await fetch(api_url);
//     const data = await response.json();

//     const state = data.states;
//     for data.states {
//         for agurments{
//             if arguements == data[field]{

//             }
//         }
//     }

// }

// document ready add listener to HTML input/select elements.

//API Map

//    // const dataObject = state.map(item => {
    //     return {
    //         icao24: item[0],
    //         callsign: item[1],
    //         origin_country: item[2],
    //         time_position: item[3],
    //         last_contact: item[4],
    //         longitude: item[5],
    //         latitude: item[6],
    //         baro_altitude: item[7],
    //         on_ground: item[8],
    //         velocity: item[9],
    //         true_track: item[10],
    //         vertical_rate: item[11],
    //         sensors: item[12],
    //         geo_altitude: item[13],
    //         squawk: item[14],
    //         spi: item[15],
    //         position_source: item[16]
    //     }
    // });