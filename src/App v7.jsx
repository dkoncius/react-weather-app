import { useState, useEffect } from 'react';
import useFetch from 'react-fetch-hook'
import './App.scss'

const App = () => {
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)

  const fetchData = (city) => {
     // Fetch
     const apikey = "3265874a2c77ae4a04bb96236a642d2f"
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
     .then(response => {
      // Validacija
      if(response.status === 200) {
        return response.json()
      } else {
        alert("Try again :)")
      }
     })
     .then(data => {
      setData(data)
     })
  }


  const handleChange = (event) => {
   setCity(event.target.value)
  }

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.target.value = ''

     fetchData(city)
    }
  }


   // Validacija
  if(data){
    var icon = data.weather[0].icon
    var temp = data.main.temp - 273.15
    temp = Math.floor(temp)
    console.log(data)
  }
 
 
  return (
    <>
      <form action="#">
        <input
        id="search"
        type="text"
        placeholder="Search by place"
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        />
      </form>
      {data ? 
        <h2>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
        {temp}°C
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
      </h2>

      : ""
      }
    
    </>
   
  )
};

export default App
