const APIKey = "40360ebbfafb9db4e0cd8e687316fac5";


//clearing local storage on button click
var clearBtn = document.getElementById("clearHistoryBtn");
clearBtn.addEventListener("click", function() {
    localStorage.clear();
})


//saving into local storage on search button
var searchBtn = document.getElementById("searchLocBtn");
searchBtn.addEventListener("click", function() {
    var locationInput = document.getElementById("locationSearch");
    var cityElement = locationInput;
    saveCity(cityElement); 
    console.log("poop");
})





//function to display current weather and also 5 day forecast below








//saving in local storage
var saveCity = function(cityElement) {
    console.log("poop");

    if (localStorage.getItem("cityData") == null) {
        var newArray = []
        newArray.push(cityElement)
        localStorage.setItem("cityData", JSON.stringify(newArrary));
    } else {
        //array already exists in storage
        var currentCityData = JSON.parse(localStorage.getItem("cityData"))
        var cityExists = false;

        for( i = 0; i < currentCityData.length; i++) {
            if (currentCityData[i] == cityElement) {
                cityExists = true;
            }
        }
        if (cityName) {
            currentCityData.push(cityElement);
            localStorage.setItem("cityData", JSON.stringify(currentCityData));
        }
    }
};


