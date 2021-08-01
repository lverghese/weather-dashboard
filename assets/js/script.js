const APIKey = "40360ebbfafb9db4e0cd8e687316fac5";


var cityNameInput = document.getElementById("location")
var locationInput = document.getElementById("locationSearch");
var temperature = document.getElementById("temperature");
var uvIndex = document.getElementById("uv");
var windSpeed = document.getElementById("windSpeed");
var humidity = document.getElementById("humidity");
var forecastCard = document.getElementById("forecastContainer")



var getCurrentDate = function(){
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    return currentDay;

};


//function to display current weather and also 5 day forecast below
window.addEventListener("load", function() {
    loadCache();
})

//function to retrieve data from api and send to current weather in html

var getCityName = function() {

    //get a value from the input element
    var location = locationInput.value.trim();

    if (location) {

        getCurrentWeather(location);
        locationInput.value = '';
    } else {
        alert("Please enter a city");
    }
}


var getCurrentWeather = function(city) {
    //format the weather api url
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    cityNameInput.innerHTML = city + ' ' + getCurrentDate();

    console.log(apiURL);
    //making the request to the url
    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
            
            response.json().then(function(data) {

                temperature.innerHTML = data.main.temp + " F";
                humidity.innerHTML = data.main.humidity;
                windSpeed.innerHTML = data.wind.speed + " MPH";
                var uvData = getUv(data.coord.lat, data.coord.lon);
                
    
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Unable to get weather');
    });
    removeChildren(forecastCard);
    getForecast(city);
};

var getUv = function(latitude, longitude) {

    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=" + APIKey +
    "&lat=" +
    latitude +
    "&lon=" +
    longitude;
    
    fetch(queryURL2)
    .then(function(response) {
        if (response.ok) {
            
            response.json().then(function(data) {
                resultUv = data[0].value;
                uvIndex.innerHTML = resultUv;

                if (resultUv <= 4) {
                    uvIndex.classList.add("alert")
                    uvIndex.classList.add("alert-success")
                } else if (resultUv > 4 && resultUv <= 9) {
                    uvIndex.classList.add("alert")
                    uvIndex.classList.add("alert-warning")
                } else if (resultUv > 9) {
                    uvIndex.classList.add("alert")
                    uvIndex.classList.add("alert-danger")
                };
            })
        }
    })

    
    
};

var getForecast = function(city) {
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIKey + '&q=' + city;

    fetch(queryURL3)
    .then(function(response) {
        if (response.ok) {

            response.json().then(function(data) {
                console.log(data)
                var dayCount = 1
                for (var i = 6; i < data.list.length; i += 8) {
                    var col = document.createElement('div')
                    col.classList.add("col-2")
                    col.innerHTML = 'Hello'
                     var nc = document.createElement('div');
                     nc.classList.add("col-2");
                     var cardForecast = document.createElement("div")
                     cardForecast.classList.add("card");
                     var cardBody = document.createElement("div")
                     cardBody.classList.add("card-body")
                     var forecastDate = document.createElement("span")
                     forecastDate.classList.add("card-title")
                     forecastDate.innerHTML = moment().add(dayCount, "days").format("M/D/YYYY")
                     var icon = document.createElement("img")
                     icon.src = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"
                     var tempForecast = document.createElement("p")
                     tempForecast.classList.add("card-text")
                     tempForecast.innerHTML = data.list[i].main.temp + " F"
                     var humForecast = document.createElement("p")
                     humForecast.classList.add('card-text')
                     humForecast.innerHTML = "Humidity" + data.list[i].main.humidity
                     var windForecast = document.createElement("p")
                     windForecast.classList.add('card-title')
                     windForecast.innerHTML = data.list[i].wind.speed + " MPH";

                     
                     nc.appendChild(cardForecast);
                     cardForecast.appendChild(cardBody);
                     cardBody.appendChild(forecastDate);
                     cardBody.appendChild(icon);
                     cardBody.appendChild(tempForecast);
                     cardBody.appendChild(humForecast);
                     cardBody.appendChild(windForecast);
                    

                    forecastCard.appendChild(nc);
                    
                    dayCount++;
                }
            })
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert(error);
    });
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
    addHistory(cityElement.cityName);
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



var loadCache = function() {
    var myCityData = getCityData();
    for( i = 0; i < myCityData.length; i++) {
        displayHistory(myCityData[i].cityName);
    }
}

var addHistory = function(cityName) {
    displayHistory(cityName);
}

var displayHistory = function (cityName) {
    console.log(cityName);
    var nr = document.createElement('div');
    nr.classList.add("row");
    var col = document.createElement('div');
    col.classList.add("col");
    var historyBtn = document.createElement("button");
    historyBtn.classList.add("btn")
    historyBtn.classList.add("btn-primary")
    historyBtn.classList.add("btn-block")
    historyBtn.classList.add("btn-center")
    historyBtn.id = "btn" + cityName;
    historyBtn.setAttribute('content', 'test content');
     historyBtn.setAttribute('class', 'btn-primary');
    historyBtn.innerHTML = cityName;
    console.log(historyBtn);
   
    historyBtn.addEventListener("click", function(){
        console.log("hello");
        getCurrentWeather(cityName);
    })
 
    nr.appendChild(col);
    col.appendChild(historyBtn);
    historyRows.appendChild(nr);

}


