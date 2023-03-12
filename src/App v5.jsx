import { useState } from 'react';
import useFetch from 'react-fetch-hook'
import './App.scss'

const Form = () => {
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
   setMessage(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.target.value = ''
      console.log(message)
    }
  }

  return (
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
  )
}



const App = () => {
  const apikey = "3265874a2c77ae4a04bb96236a642d2f"
  const { isLoading, error, data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}`)

  if (error) return <p>Error</p>
  if (isLoading) return <p>Loading...</p>

  let icon = data.weather[0].icon
  let temp = data.main.temp - 273.15
  temp = Math.floor(temp)

  return (
    <>
      <Form/>
      <h2>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
        {temp}
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
      </h2>
    </>
  )
};

export default App
