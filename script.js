const input = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const weatherImg = document.querySelector(".weatherImg");
const error = document.querySelector(".error");

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "5887aaeec6e1ab9f1339402ae5e566b0";

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    document.querySelector(".hide").style.display = "none";
  }
  const data = await response.json();
  //   console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "<sup>o</sup><span>C</span>";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".speed").innerHTML = data.wind.speed + "km/h";

  if (data.weather[0].main == "Clouds") {
    weatherImg.src = "/img/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherImg.src = "/img/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherImg.src = "/img/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherImg.src = "/img/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherImg.src = "/img/mist.png";
  }

  error.style.display = "none";
  document.querySelector(".hide").style.display = "flex";
}

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  const cityName = input.value;
  getWeather(cityName);
});
