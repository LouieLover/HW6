function initPage()


var cityName = $("city-name")
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
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appId=" + APIKey;
var dayOver = false;
var queryForecastURL = "http://apiopeanweathermap.org/data/2.5/forecast?id=" + cityId + "&appId=" + APIKey;



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

currentUV(response.cooRd.lon, response.cooRd.lat);
forecast(response.id);
if (response.cod == 200) {
    searchCity = JSON.parse(localStorage.getItem("city-name"));
    console.log(searchCity);
    if (searchCity == null) {
        searchCity = [];
        searchCity.push(city.toUpperCase());
        localStorage.setItem("city-name", JSON.stringify(searchCity));
        addToList(city);
    } else {
        if (find(city) > 0) {
            searchCity.push(city.toUpperCase());
            localStorage.setItem("city-name", JSON.stringify(searchCity));
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

$.ajax({
    url: queryForecastURL,
    method: "GET"
}).then(function(response) {
    for (i = 0; i < 5; i++) {
        var date = newDate((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
        var iConCode = response.list[((i + 1) * 8) - 1].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iConCode + ".png";
        var tempK = response.list[((i + 1) * 8) - 1].main.temp;
        var tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
        var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

        $("fDate" + i).html(date);
        $("fImg" + i).html("<img src=" + iconUrl + ">");
        $("fTemp" + i).html(tempF + "&8457");
        $("fHumidity" + i).html(humidity + "%");

    }
});

function addToList(c) {
    var listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
    }

}

function loadLastCity() {
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("city-name"));
    if (sCity !== null) {
        sCity = JSON.parse(localStorage.getItem("city-name"));
        for (i = 0; i < sCity.length; i++) {
            addToList(sCity[i]);
        }
        city = sCity[i - 1];
        currentWeather(city);
    }

}

function clearHistory(event) {
    event.preventDefault();
    sCity = [];
    localStorage.removeItem("city-name");
    document.location.reload();

}
$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadLastCity);
$("#clear-history").on("click", clearHistory);