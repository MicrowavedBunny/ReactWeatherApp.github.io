let zLocation;

function  buttonClicked(){
    zLocation = getLocation();
    //this log is going before the variable is propagated
    //settimeout is they only way I know how to fix this im sure there is a better way but idk one
    setTimeout(function(){
        //console.log(zLocation);
        getLocalWeather();
         }, 500);
}

function getLocation(){
    const url='https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=RDxZA4liGfAGEATWpa60K6bdQjCGhlLW&q=';
    fetch (url + document.getElementById("zCode").value)
        .then(data => data.json())
        .then(data=>{
            zLocation = data[0].Key
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
            console.log(data);
        })
}
