//Loading map
const myMap = L.map('mapid').setView([39, -80.5], 6);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>';
const tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

var state = [];
console.log(state);
//html button function - This was moved outside of getData(); as it needed to be read by the HTML @ index.html (line 33). Works if you comment out lines 14-18 and use uncomment console.log on line 19. Needs to access array called state from within the getData function
function displayMyData() {
    let testingThis = document.getElementsByName("ground");
    if (testingThis[0].checked) {
        for (let i = 0; i < state.length; i++) {
            if (state[i][8] === true) {
                console.log(state[i]);
            }
        }
        // console.log("hello this is a test")
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

        //mapData - everychaning array that filtered data get's pushed to. this array is used to load flights to map//
        let mapData = [];


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
        function selectChanged() {
            mapData = [];
            let countrySearch = document.getElementById("select").value;
            for (let i = 0; i < state.length; i++) {
                if (state[i][2] === countrySearch) {
                    mapData.push(state[i]);
                }
                //Add flights with matching country to map
            }
            for (let i = 0; i < mapData.length; i++) {
                if (mapData[i][5] != null || mapData[i][6] != null) {
                    let marker = L.marker([mapData[i][6], mapData[i][5]]).addTo(myMap);
                }
            }
        }

        displayMyData();
    });

}
getData();


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