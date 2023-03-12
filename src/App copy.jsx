import { useState} from 'react';
import './App.scss'

const Form = ({setCity, setData, city, setIsLoaded}) => {

  const fetchData = async (city) => {
    // Fetch
    const apikey = "3265874a2c77ae4a04bb96236a642d2f"
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)

    
    // Validacija
    if(response.status === 200) {
      const data = await response.json()
      setData(data)
    } else {
      alert("Try again :)")
    }
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

const Content = ({data , isLoaded}) => {
  if(data){
    var icon = data.weather[0].icon
    var temp = data.main.temp - 273.15
    temp = Math.floor(temp)
  }
  // if(isLoaded) return <h2>Loading...</h2>
  return data ? 
  <h2>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
    {temp}°C
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
  </h2> : ""
}


const App = () => {
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(true)

  return (
    <>
      <Form setCity={setCity} city={city} setData={setData} setIsLoaded={setIsLoaded}/>
      <Content data={data} isLoaded={isLoaded}/>
    </>
  )
};

export default App
