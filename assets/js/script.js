const APIKey = "40360ebbfafb9db4e0cd8e687316fac5";




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
    loadHistory();
})



//function to display current weather and also 5 day forecast below
window.addEventListener("load", function() {
    loadHistory();
})




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




