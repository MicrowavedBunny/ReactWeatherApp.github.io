
//TODO: 'add check if us and if valid zip code' 'limit amount of digits inputted' 'add enter functionality'
//implementation


//not sure how to make this work without using these global variables and couldn't use var not sure why
let zLocation;
let weatherJson;
let locDesc = [];
let zCode;
let infoGathered;
let zForm;

function  buttonClicked() {
    //get zCode after the page has loaded fully or it won't work.
    zCode =document.getElementById("zCode");
    //check if zip code is valid length
    if (zCode.value.length !== 5) {
        alert("Please enter a valid USA postal code!");
    } else {
        zLocation = getLocation();
        //this log is going before the variable is propagated
        //settimeout is they only way I know how to fix this im sure there is a better way but idk one
        setTimeout(function () {
            //console.log(zLocation);
            getLocalWeather();
        }, 500);
        setTimeout(function () {
            //console.log(zLocation);
            propagateData();
            zForm = document.getElementById("firstBox");
            infoGathered = document.getElementById("gatheredInfo");
            zForm.style.display = 'none';
            infoGathered.style.display = 'block';
        }, 1000);
    }
}

function getLocation(){
    const url='https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=RDxZA4liGfAGEATWpa60K6bdQjCGhlLW&q=';
    fetch (url + zCode.value)
        .then(data => data.json())
        .then(data=>{
            //get key for use with other api
            zLocation = data[0].Key;
            //get all other data
            locDesc[0] = data[0].LocalizedName;
            locDesc[1] = data[0].AdministrativeArea.ID;
            locDesc[2] = data[0].PrimaryPostalCode;
            locDesc[3] = data[0].Country.ID;
            locDesc[4] = data[0].SupplementalAdminAreas[0].LocalizedName;
            locDesc[5] = data[0].TimeZone.Code;
            locDesc[6] = data[0].GeoPosition.Longitude;
            locDesc[7] = data[0].GeoPosition.Latitude;
            locDesc[8] = data[0].GeoPosition.Elevation.Imperial.Value;
            locDesc[9] = data[0].GeoPosition.Elevation.Metric.Value;
            //console.log(zLocation);
        })
    return zLocation;
}

function getLocalWeather(){
    const url = "https://dataservice.accuweather.com/currentconditions/v1/";
    const apiKey ="?apikey=RDxZA4liGfAGEATWpa60K6bdQjCGhlLW";
    fetch (url + zLocation +apiKey)
        .then(data => data.json())
        .then(data=> {
            weatherJson = data[0];
            locDesc[10] = weatherJson.LocalObservationDateTime;
            console.log(weatherJson);
        })
}

function propagateData(){
    //location data
    document.getElementById("location").innerHTML = locDesc[0] + ", " + locDesc[1] + " " + locDesc[2] + ", " + locDesc[3];
    document.getElementById("locationData1").innerHTML = "County: " + locDesc[4] + " Current time: " + locDesc[10] + " " + locDesc[5];
    document.getElementById("locationData2").innerHTML = "Longitude: " + locDesc[6] + " Latitude: " + locDesc[7];
    document.getElementById("locationData3").innerHTML = locDesc[0] + " is " + locDesc[8] + " feet or " + locDesc[9] + " meters above sea level!";

    //weather data
    document.getElementById("weatherDesc").innerHTML = weatherJson.WeatherText;
    document.getElementById("tempC").innerHTML = weatherJson.Temperature.Metric.Value;
    document.getElementById("tempF").innerHTML = weatherJson.Temperature.Imperial.Value;

    //test data
/*    for (i in locDesc) {
        console.log(locDesc[i])
    }*/
}
