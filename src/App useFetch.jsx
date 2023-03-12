import { useState, useEffect } from 'react';
import useFetch from 'react-fetch-hook'
import './App.scss'


const App = () => {
  const { isLoading, error, data } = useFetch('https://randomuser.me/api/')

  if (error) return <p>Error</p>
  if (isLoading) return <p>Loading...</p>
  return console.log(data)
};

export default App
