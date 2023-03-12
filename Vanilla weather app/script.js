"use strict"

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="
const apikey = "3265874a2c77ae4a04bb96236a642d2f"
const form = document.querySelector("form")
const search = document.getElementById("search")
const dataPlace = document.getElementById("dataPlace")

function fetchUrl(city){
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
}

function appendData(data){
    // Clear html
    dataPlace.innerHTML = ""

    var newWeather = document.createElement("div")
    var icon = data.weather[0].icon
    var temp = data.main.temp - 273.15
    temp = Math.floor(temp)
    newWeather.classList.add("weather")
    newWeather.innerHTML =
    `
     <h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
        ${temp}°C
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
    </h2>
    `
    dataPlace.append(newWeather)

    console.log(data)
}

form.addEventListener("submit", function(e){
    e.preventDefault()
    
    var cityText = search.value
    if(cityText) {          
        fetchUrl(cityText)
        .then(response => response.json())
        .then(appendData)
        .catch(error => console.log(error))
    }

    // Clear input
    search.value = ""
})
