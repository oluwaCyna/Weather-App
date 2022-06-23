let navTime = document.getElementById("nav_time");
let city = document.getElementById("city");
let country = document.getElementById("country");
let time = document.getElementById("time");
let date = document.getElementById("date");
let weather = document.getElementById("weather");
let pressure = document.getElementById("pressure");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let main = document.getElementById("main");
let desc = document.getElementById("desc");
let icon = document.getElementById("icon");

let form = document.getElementById('form');
let search = document.getElementById('search');

let url;
let searchCity;
let data;

const userDate = new Date();
let hour = userDate.getHours();
let minute = userDate.getMinutes();
let period;

minute = minute.toString().padStart(2, "0");
switch (hour) {
    case 12:
        period = "PM"
        break;
    case 0:
        hour = 12;
        period = "AM"
    default:
        if (hour > 12) {
            hour = (hour - 12).toString().padStart(2, "0");
            period = "PM";
        
        }else if (hour < 12){
            hour = hour.toString().padStart(2, "0");
            period = "AM"
        
        }else {}
        break;
}

navTime.innerHTML = hour + " " + ":" + " " + minute + " " + period;

function dontLoad (event) {
    event.preventDefault();

    searchFunc ();
    searchWeather();
}

function searchFunc () {
searchCity = search.value;
url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=d4ec09d6bfca2a260634b3571a00b2c5&units=metric`
}

function searchWeather () {
let inc = "fa-solid fa-location-dot"

    console.log(url)
    axios(url)
    .then(res => {
        let iconid = res.data.weather[0].icon;
        let imgUrl = `https://openweathermap.org/img/wn/${iconid}.png`;

        city.innerHTML = `<i class=" ${inc} "></i>` + " " + res.data.name + ", " + res.data.sys.country;;
        time.innerHTML = hour + " " + ":" + " " + minute + " " + period;
        date.innerHTML = userDate.toDateString();
        pressure.innerHTML = "Pressure: " + res.data.main.pressure + "hPa";
        temp.innerHTML = "Temperature: " + res.data.main.temp + "<sup>o</sup>C";
        humidity.innerHTML = "Humidity: " + res.data.main.humidity + "%";
        main.innerHTML = `<img src="${imgUrl}">` + " " + res.data.weather[0].main + ", " + res.data.weather[0].description;

    }).catch(err => alert(err))
    
}

form.addEventListener('submit', dontLoad);