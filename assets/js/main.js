var mymap = L.map('mapid').setView([51.505, -0.09], 13);

const api_url = "https://opensky-network.org/api/states/all"


async function getData() {
    let response = await fetch(api_url);
    let data = await response.json();
    let state = data.states;
    let longLat = [];

    let dataObject = state.map(item => {
        return {
            icao24: item[0],
            callsign: item[1],
            origin_country: item[2],
            time_position: item[3],
            last_contact: item[4],
            longitude: item[5],
            latitude: item[6],
            baro_altitude: item[7],
            on_ground: item[8],
            velocity: item[9],
            true_track: item[10],
            vertical_rate: item[11],
            sensors: item[12],
            geo_altitude: item[13],
            squawk: item[14],
            spi: item[15],
            position_source: item[16]
        }
    });

        for(let i = 0; i < 10; i++){
        longLat[i] = {
            long: dataObject[i].longitude,
            lat: dataObject[i].latitude
            }
        }
        console.log(longLat);
}

getData();

        // var longLat = state
        
        // for(let i=0; i < 10; i++){
        //         state[i] = { 
        //             long: i+1,
        //             lat: i+1
        //         };
        //     }
        // };
        // console.log(longLat);

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