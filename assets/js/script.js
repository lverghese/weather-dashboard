const APIKey = "40360ebbfafb9db4e0cd8e687316fac5";

locationInput = document.getElementById("locationSearch");
temperature = document.getElementById("temperature");
uvIndex = document.getElementById("uv");
windSpeed = document.getElementById("windSpeed");
humidity = document.getElementById("humidity");

//function to display current weather and also 5 day forecast below
window.addEventListener("load", function() {
    loadHistory();
})





//function to retrieve data from api and send to current weather in html

var getCityName = function() {
    

    //get a value from the input element
    var location = locationInput.value.trim();

    if (location) {
        getCurrentWeather(location)
        locationInput.value = '';
    } else {
        alert("Please enter a city");
    }
};

var getCurrentWeather = function(city) {
    //format the weather api url
    var apiURL = "https://openweathermap.org/api/one-call-api?q=" + city + "&appid=" + APIKey;
    var latitude;
    var longitude; 

    

    console.log(apiURL);
    //making the request to the url
    fetch(apiURL)
    .then(function(response) {

        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
               
                console.log(data.main);
                latitude = data.coord.lat
                longitude = data.coord.lon
                 queryURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=" + APIKey;
                
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Unable to get weather');
    });

    
};




var getOneCall = function(queryURL) {
    fetch(queryURL)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);

            })
        } else {
            alert('Error: ' + queryURL);
        }
    })
}














//removing historyrows on html
var removeChildren = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    
}

//clearing local storage on button click
var clearBtn = document.getElementById("clearHistoryBtn");
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    removeChildren(historyRows);
})




//saving into local storage on search button
var searchBtn = document.getElementById("searchLocBtn");
searchBtn.addEventListener("click", function() {
    var locationInput = document.getElementById("locationSearch");
    var cityElement = {
        cityName: locationInput.value
    };
    saveCity(cityElement); 
    getCityName();
    loadHistory();

});





//saving in local storage
var saveCity = function(cityElement) {

    if (localStorage.getItem("cityData") == null) {
        var newArray = [];
        newArray.push(cityElement);
        localStorage.setItem("cityData", JSON.stringify(newArray));
    } else {
        //array already exists in storage
        var currentCityData = JSON.parse(localStorage.getItem("cityData"))
        var cityExists = false;

        for( i = 0; i < currentCityData.length; i++) {
            if (currentCityData[i].cityName == cityElement.cityName) {
                cityExists = true;
            }
        }
        if (!cityExists) {
            currentCityData.push(cityElement);
            localStorage.setItem("cityData", JSON.stringify(currentCityData));
        }
    }
};

//get data from local storage
var getCityData = function(){

    var result

    if (localStorage.getItem("cityData") == null) {
        var newArray = [];
        localStorage.setItem("cityData", JSON.stringify(newArray));
        result = newArray;
    } else {
        //array already exists in storage
         result = JSON.parse(localStorage.getItem("cityData"))

    }

    return result;
};



var loadHistory = function() {
    var myCityData = getCityData();
    var historyRows = document.getElementById("historyRows")
    for( i = 0; i < myCityData.length; i++) {
        console.log(myCityData[i]);
       var nr = document.createElement('div');
       nr.classList.add("row");
       var col = document.createElement('div');
       col.classList.add("col");
       var myText = document.createTextNode(myCityData[i].cityName);
       col.appendChild(myText)
       nr.appendChild(col);
       historyRows.appendChild(nr);
    }
}




