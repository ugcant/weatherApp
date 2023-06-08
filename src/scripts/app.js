var apiKey = "7cf7dbb773b7141d0cfc10d8393c49a0";

const locationInput = document.querySelector("#city-input");
const btnSubmit = document.querySelector("#btn-submit");
const dateInfo = document.querySelector(".date-info");
const cityInfo = document.querySelector("#city-info");
const btnLocate = document.querySelector("#btn-locate");
const tempValue = document.querySelector("#weather-detail__value");
const weatherMainInfo = document.querySelector(".weather-today__condition");
const windSpeed = document.querySelector(".wind-speed");
const humidityValue = document.querySelector(".humidity-value");
const pressureValue = document.querySelector(".pressure-value");
const visibilityValue = document.querySelector(".visibility-value");
const sunriseValue = document.querySelector(".sunrise-value");
const sunsetValue = document.querySelector(".sunset-value");
const weatherIcon = document.querySelector(".weather-icon");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputCityName = locationInput.value;
  getWeatherData(inputCityName);
});

btnLocate.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherDailyData();
});

function getWeatherData(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function defaultCitySetup() {
  const defaultCity = "ankara";
  getWeatherData(defaultCity);
}

function getWeatherDailyData() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        fetch(api)
          .then((response) => response.json())
          .then((result) => weatherDetails(result));
      },
      (error) => {
        console.log("Konum bilgisi alınamadı:", error.message);
        defaultCitySetup();
      }
    );
  } else {
    console.log("Konum bilgisi mevcut değil");
    defaultCitySetup();
  }
}

function weatherDetails(info) {
  console.log(info);
  let temp = info.main.temp;
  let cityName = info.name;
  let weatherMain = info.weather[0].main;
  let windSpeedAvg = info.wind.speed;
  let humidity = info.main.humidity;
  let pressure = info.main.pressure;
  let visibility = info.visibility;
  let sunriseTime = info.sys.sunrise;
  let sunsetTime = info.sys.sunset;
  let weatherCode = info.weather[0].id;

  timeConverter(sunriseTime, sunriseValue);
  timeConverter(sunsetTime, sunsetValue);
  if (cityName == undefined) {
    alert("Please enter a valid place name!");
  } else {
    cityInfo.innerHTML = `${cityName}`;
  }

  // Change HTML Elements
  tempValue.innerHTML = `${Math.floor(temp)}`;
  weatherMainInfo.innerHTML = `${weatherMain}`;
  windSpeed.innerHTML = `${Math.floor(windSpeedAvg)} m/s`;
  humidityValue.innerHTML = `${Math.floor(humidity)} %`;
  pressureValue.innerHTML = `${Math.floor(pressure)} hPa`;
  visibilityValue.innerHTML = `${visibility / 1000} km`;

  /* Weather Condition Codes */
  const thunderStormWithLightRain = 199,
    thunderStormWithHeavyDrizzle = 233,
    weatherDrizzle = 232,
    weatherRaggedRain = 532,
    weatherLightSnow = 599,
    weatherHeavySnow = 603,
    weatherLightSleet = 610,
    weatherHeavySleet = 623,
    weatherMist = 700,
    weatherSmoke = 712,
    weatherHaze = 721,
    weatherSandDust = 731,
    weatherFog = 741,
    weatherSand = 751,
    weatherDust = 761,
    weatherTornado = 781,
    weatherSquall = 771,
    weatherVolcanicAsh = 762,
    weatherClear = 800,
    weatherFewClouds = 801,
    weatherScatteredClouds = 802,
    weatherOverCastClouds = 804;

  if (
    weatherCode > thunderStormWithLightRain &&
    weatherCode < thunderStormWithHeavyDrizzle
  ) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-storm-100.png' alt='weather-icon'></img>";
  } else if (weatherCode > weatherDrizzle && weatherCode < weatherRaggedRain) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-rain-100.png' alt='weather-icon'></img>";
  } else if (weatherCode > weatherLightSnow && weatherCode < weatherHeavySnow) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-snow-storm-100.png' alt='weather-icon'></img>";
  } else if (
    weatherCode > weatherLightSleet &&
    weatherCode < weatherHeavySleet
  ) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-sleet-100.png' alt='weather-icon'></img>";
  } else if (weatherCode > weatherMist && weatherCode < weatherSmoke) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-fog-100.png' alt='weather-icon'></img>";
  } else if (weatherCode === weatherHaze) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-haze-100.png' alt='weather-icon'></img>";
  } else if (
    weatherCode === weatherSandDust ||
    weatherCode === weatherFog ||
    weatherCode === weatherSand ||
    weatherCode === weatherDust ||
    weatherCode === weatherTornado ||
    weatherCode === weatherSquall
  ) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-tornado-100.png' alt='weather-icon'></img>";
  } else if (weatherCode === weatherVolcanicAsh) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-geyser-100.png' alt='weather-icon'></img>";
  } else if (weatherCode === weatherClear) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-sun-100.png' alt='weather-icon'></img>";
  } else if (
    weatherCode === weatherFewClouds ||
    weatherCode === weatherScatteredClouds ||
    weatherCode === weatherOverCastClouds
  ) {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-clouds-100.png' alt='weather-icon'></img>";
  } else {
    weatherIcon.innerHTML =
      "<img src='/src/img/icons8-partly-cloudy-day-100.png' alt='weather-icon'></img>";
  }
}

async function timeConverter(unixTimestamp, htmlElement) {
  let milliseconds = unixTimestamp * 1000;

  let date = new Date(milliseconds);

  let localHours = date.getHours();
  let localMinutes = date.getMinutes();
  if (localHours < 10) {
    localHours = "0" + localHours;
  }
  if (localMinutes < 10) {
    localMinutes = "0" + localMinutes;
  }
  let localTime = localHours + "." + localMinutes;
  htmlElement.innerHTML = `${localTime}`;
}

//Tarih bilgisini yerleştirme
let tarih = new Date();
let day = tarih.getDate();
let month = tarih.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden +1 ekliyoruz
let year = tarih.getFullYear();

if (month < 10 || day < 10) {
  dayMonthYear = `0${day}.0${month}.${year}`;
} else {
  dayMonthYear = `${day}.${month}.${year}`;
}
dateInfo.innerHTML = `${dayMonthYear}`;
