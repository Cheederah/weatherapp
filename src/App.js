import React, { useEffect, useState } from 'react';
import keys from './keys';
import { ReactComponent as Loader } from './loader.svg';
import './App.css';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
}

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [load, setLoad] = useState(false);
  const searchWeather = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then((result) => {
      setQuery("")
      setWeather(result)
      setLoad(false)
      console.log(result)
      
    })
  }

 
  const onHandleChange = (e) => {
    setQuery(e.target.value)

  };

  const dateBuilder = (d) => {
    let date = String((new window.Date));
    date = date.slice(3, 15)
    console.log(date)
    return date
  };

  const onButtonSubmit = () => {
    setLoad(true)
    searchWeather()
  }

  useEffect(() => console.log(load));
  

    return (
      
      <div className={
        typeof weather.main != "undefined" ? 
        weather.main.temp > 18 
        ? "Hot"
        : "Cold"
        : "App"
      }>
        <div className="title"><h1>Real time weather search app</h1></div>
        
        

        <div className="search-container">
        <input 
        className="search"
        type="text"
        placeholder="Enter your state"
        onChange={onHandleChange}
        value={query}
        />
        <button 
        className="button"
        onClick={onButtonSubmit}
        >Search</button>
      </div>
        {load ? (
          <div className="loading">
            <Loader />
          </div>
        ): (
          typeof weather.main != "undefined" ? (
          
            <div className="location-container">
            <div className="location">
            <h3>{weather.name}, {weather.sys.country} </h3>
            <p>{dateBuilder (new Date())}</p>
            </div>
            <div className="weather-container">
            <div className="temperature">
              {weather.main.temp}°C
            </div>
            <p>{weather.weather[0].main}</p>
            
            </div>
    
          </div>
            ) : (
              ""
            )
           
    
        )
      }
        



      </div>
      
    )
  
}

export default App;
