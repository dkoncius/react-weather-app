import { useState, useEffect } from 'react';
// import useFetch from 'react-fetch-hook'
import './App.scss'


const App = () => {
  const [data, setData ] = useState(null)
  
  useEffect(() => {
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => setData(data))
  }, [])

  if (!data) return <p>Loading...</p>
  return (
    <>
      {data.results[0].email}
    </>
  )
};

export default App
