let api = 'https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=b672836d61ee3368ee263bc66529a500';
let tempDegree = document.querySelector('.temp-degree');
let locationWeather = document.querySelector('.location');
let windSpeed = document.querySelector('.wind-speed');
let feelLike = document.querySelector('.feel-like');
let humidity = document.querySelector('.humidity');
let weatherImage = document.querySelector('.weather-img');
function getWeather(api, callback) {
    return fetch(api)
        .then(response => response.json())
        .then(callback)
        .catch(err => console.log('Wrong city name'));
}

function defaultWeather(weathers) {
    tempDegree.textContent = `${Math.round(weathers.main.temp - 273.15)}℃`;
    locationWeather.textContent = `${weathers.name}, ${weathers.sys.country}`;
    windSpeed.textContent = `${(weathers.wind.speed * 3.6).toFixed(2)} km/h`;
    feelLike.textContent = `${Math.round(weathers.main['feels_like'] - 273.15)}℃`;
    humidity.textContent = `${weathers.main.humidity}%`;

    let id = weathers.weather[0].id;
    if (id >= 801 && id <= 804) {
        weatherImage.src = './assests/img/cloudy.png';
    }
    else if (id >= 500 && id <= 531) {
        weatherImage.src = './assests/img/rain.png';
    }
    else if (id >= 300 && id <= 321) {
        weatherImage.src = './assests/img/cloudyRain.png';
    }
}

function handleEvent() {
    let cityName = document.querySelector('#city-name');
    let btnCity = document.querySelector('.btn-city');
    btnCity.onclick = (e) => {
        e.preventDefault();
        if (cityName.value.trim() == '') {

        }
        else {
            let api = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName.value + '&appid=b672836d61ee3368ee263bc66529a500';
            getWeather(api, defaultWeather);
        }
    }
}
function start() {
    getWeather(api, defaultWeather);
    handleEvent();
}

start();