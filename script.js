const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "910e3585edf586af5dc9a059e290abd6"
}
const cities = {
    524894: "Moscow",
    498817: "St Petersburg",
    2013348: "Vladivostok",
    491422: "Sochi",
    323776: "Antalya"
}
function addSelect() {
    let main = document.querySelector('.main');
    let select = document.createElement('select');
    select.id = 'city';
    main.prepend(select);
    for (let key in cities) {
        let option = document.createElement('option');
        select.append(option);
        option.value = key;
        option.innerHTML = cities[key];

    }
}

function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    console.log(data);
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&deg;';
    document.querySelector('.air').textContent = data.weather[0]['description'];
    document.querySelector('.features').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.feels-value').innerHTML = Math.round(data.main.feels_like) + '&deg;';
    document.querySelector('.hum-value').innerHTML = (data.main.humidity) + '%';
    document.querySelector('.pr-value').innerHTML = (data.main.pressure) + ' mb';
    document.querySelector('.vis-value').innerHTML = data.visibility / 1600 + ' miles';
    document.querySelector('.time').innerHTML = data.dt;
    document.querySelector('.sunrise').innerHTML = data.sys.sunrise;
    document.querySelector('.sunset').innerHTML = data.sys.sunset;
    document.querySelector('.wind-value').innerHTML = data.wind.speed + ' mph';
    document.querySelector('.deg').innerHTML = data.wind.deg + ' deg';
    let trend = document.querySelector('.trend');
    let line = +data.wind.deg;
    if ((line > 0 && line < 60) || (line > 300 && line < 360)) {
        trend.innerHTML = '&rarr;'
    }

    else if (line > 120 && line < 240) {
        trend.innerHTML = '&larr;'
    }

    else if (line >= 60 && line <= 120) {
        trend.innerHTML = '&uarr;'
    }

    else if (line >= 240 && line <= 300) {
        trend.innerHTML = '&darr;'
    }
}
addSelect();
getWeather();
document.querySelector('#city').onchange = getWeather;








