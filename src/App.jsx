import { useState} from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import './App.scss'

const Form = ({setCity, setData, city, setIsLoaded}) => {
  
  const [focused, setFocused] = useState(false)

  const fetchData = async (city) => {
    // Fetch
    const apikey = "3265874a2c77ae4a04bb96236a642d2f"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(response => {
      // Validacija
      if(response.status === 200) {
        setIsLoaded(false)
        setFocused(false)
        return response.json()
      } else {
        alert("Try again :)")
      }
    })
    .then(data => setData(data))
    .finally(() => {
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000)

      setTimeout(() => {
        setFocused(true)
      }, 1300)
    })
  }

  const handleChange = (event) => {
    setCity(event.target.value)
   }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.target.value = ''

     fetchData(city)
    }
  }

  const handleFocus = () => {
    setFocused(true)
  }

  return (
      <form action="#">
        <input
        onClick={handleFocus}
        className={focused ? 'focus' : ''}
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

const Content = ({data, isLoaded}) => {
  if(data){
    var icon = data.weather[0].icon
    var temp = data.main.temp - 273.15
    temp = Math.floor(temp)
  }
  
  if(!isLoaded) return <Loader/>
  return (
    <AnimatePresence transition={{ease: [0.6, 0.01, -0.05, 0.9], duration: 1}}>
      {data ? 
      <motion.h2 exit={{opacity: 0, scale: 0.5}} layoutId='module'>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
        {temp}°C
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon"/>
      </motion.h2> : ""}
  </AnimatePresence>
  )
}

const Loader = () => {
  return (
    <motion.div transition={{ease: [0.6, 0.01, -0.05, 0.9], duration: 0.6}} layoutId='module' className="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </motion.div>
  )
}

const App = () => {
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(true)

  return (
    <>
     <LayoutGroup>
      <Form setCity={setCity} city={city} setData={setData} setIsLoaded={setIsLoaded} isLoaded={isLoaded}/>
      <Content animate data={data} isLoaded={isLoaded}/>
     </LayoutGroup>
    </>
  )
};

export default App
