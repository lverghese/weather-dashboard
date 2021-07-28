const APIKey = "40360ebbfafb9db4e0cd8e687316fac5";


//all variables to match html ids



//function to display current weather and also 5 day forecast below


//saving in local storage
var saveCity = function(cityElement) {

    if (localStorage.getItem("cityData") == null) {
        var newArray = []
        newArray.push(cityElement)
        localStorage.setItem("cityData", JSON.stringify(newArrary));
    } else {
        //array already exists in storage
        var currentCityData = JSON.parse(localStorage.getItem("cityData"))
        
        for (i = 0; i < currentCityData.length; i++) {
            if (currentCityData[i].)
        }
    }
}