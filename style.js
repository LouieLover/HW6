var city = "";
var searchCity = $("search-city")
var searchButton = $("search-button")
var resetButton = $("reset-history")
var currentCity = $("current-city")
var currentTemp = $("current-temp")
var currentHumidity = $("current-humidity")
var currentWindSpeed = $("current-wind-speed")
var currentUV = $("current-uv")
var searchCities = [];

function get(c) {
    for (var i = 0; i < searchCities.length; i++) {
        if (c.toUpperCase() === searchCities[i]) {
            return -1;
        }

    }
    return 1;
}