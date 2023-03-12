import useFetch from 'react-fetch-hook'
import './App.scss'

const App = () => {
  // const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="
  const apikey = "3265874a2c77ae4a04bb96236a642d2f" 
  const { isLoading, error, data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}`)

  if (error) return <p>Error</p>
  if (isLoading) return <p>Loading...</p>

  let icon = data.weather[0].icon
  let temp = data.main.temp - 273.15
  temp = Math.floor(temp)
  console.log(data)
  return (
    <>
      <h1>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
          {temp}
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
      </h1>
    </>
  )
};

export default App
