var city = "";
var searchCity = $("search-city")
var searchButton = $("search-button")
var resetButton = $("reset-history")
var currentCity = $("current-city")
var currentTemp = $("current-temp")
var currentHumidity = $("current-humidity")
var currentWindSpeed = $("current-wind-speed")
var ws = response.wind.speed;
var windsMph = (ws * 2.237).toFixed(1);
var currentUV = $("current-uv")
var currentWeather = $("current-weather")
var searchCities = [];
var weatherIcon = response.weather[0].icon;
var iconUrl = "http://openweathermap.org/img.wn." + weatherIcon + "@2x.png";
var date = new Date(response.dt * 1000).toLocaleDateString();
var tempF = (response.main.temp - 273.15) * 1.80 + 32;
var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;


function get(c) {
    for (var i = 0; i < searchCities.length; i++) {
        if (c.toUpperCase() === searchCities[i]) {
            return -1;
        }

    }
    return 1;
}

var APIKey = "740ab5ca3f43248bd229138d016bc556";

function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}


$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response) {});

console.log(response);
$(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconUrl + ">");
$(currentTemp).html((tempF).toFixed(2) + "&#8457");
$(currentHumidity).html(response.main.currentHumidity + "%");
$(currentWindSpeed).html(windsMph + "mph");

currentUV(response.coord.lon, response.coord.lat);
forecast(response.id);
if (response.cod == 200) {
    searchCity = JSON.parse(localStorage.getItem("cityname"));
    console.log(searchCity);
    if (searchCity == null) {
        searchCity = [];
        searchCity.push(city.toUpperCase());
        localStorage.setItem("cityname", JSON.stringify(searchCity));
        addToList(city);
    } else {
        if (find(city) > 0) {
            searchCity.push(city.toUpperCase());
            localStorage.setItem("cityname", JSON.stringify(searchCity));
            addToList(city);
        }
    }
}

$.ajax({
    url: uvqURL,
    method: "GET"
}).then(function(response) {
    $(currentUV).html(response.value);
});