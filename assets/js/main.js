function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://opensky-network.org/api/states/all");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);