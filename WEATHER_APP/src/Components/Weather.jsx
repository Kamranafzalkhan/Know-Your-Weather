import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import rain_icon from '../assets/Rain.png'
import humidity_icon from '../assets/Humadity.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'
import clear_icon from '../assets/Clear.png'
import drizzle_icon from '../assets/Drizzle.png'

const Weather = () => {

    const inputRef=useRef()
    const[weatherData,setWeatherData]=useState({});
    const [city, setCity] = useState('');
    const [weatherType,setWeatherType]=useState(clear_icon);
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
    useEffect(()=>{
        const search =async () => {

            
            try {
                const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    
                //now using fetch API to get weather data from OpenWeather url
                const response = await fetch(url);
                const data =await response.json();
    
                if(!response.ok){
                    console.log(data.message);
                    return ;
                }
                console.log(data);
                const icon=allIcons[data.weather[0].icon] ||clear_icon ;
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: data.main.temp,
                    location:data.name,
                    icon:icon,
                    weather:data.weather[0].main
    
                })
                if (weatherData.weather === 'Clear'){
                    setWeatherType(clear_icon);
                }
                else if (weatherData.weather === 'Clouds'){
                    setWeatherType(cloud_icon);
                }
                else if (weatherData.weather === 'Rain'){
                    setWeatherType(rain_icon);
                }
                else if (weatherData.weather === 'Drizzle'){
                    setWeatherType(drizzle_icon);
                }
                else if (weatherData.weather === 'Snow'){
                    setWeatherType(snow_icon);
                }

            } catch (error) {
                setWeatherData({});
                console.error("Problem in fetching API");
            }
        }
        search();
    },[city])
    
  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef}type='text' placeholder='Search'/>
            <img src={search_icon} alt="search" onClick={()=>{setCity(inputRef.current.value)}}/>
        </div>
        {weatherData?<>
            <img src={weatherType} alt="Clear" className="weather-icon"/>
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="humadity" className="weather-icone"/>
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humadity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="windy" className="weather-icone"/>
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}
            
    </div>
  )
}

export default Weather