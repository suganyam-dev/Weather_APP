import { useState, useEffect } from 'react'

import './App.css'

import sun from "./assets/sun.jpg";
import cloud from "./assets/cloud.jpg";
import humidityIcon from "./assets/humidity.png";
import rain from "./assets/rain.png";


import snow from "./assets/snow.png"
import drizzle from "./assets/drizzle.jpg";
import windIcon from "./assets/wind.png";

const WeatherDetails = ({icon, temp, city, country, lat, long, humidity, wind}) => {
 return(
   <>
  <div className="image" >
    <img src ={icon} alt = "img"/>
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="long">longitude</span>
      <span>{long}</span>
    </div>
  </div>
  <div className="data-container">
    <div className = "element">
      <img src={humidityIcon} alt = "humidity" className = "icon"/>
      <div className="humidity-percent">{humidity}%</div>
      <div className="text">Humidity</div>
    </div>

     <div className = "element">
      <img src={windIcon} alt = "wind" className = "icon"/>
      <div className="wind-percent">{wind} km/h</div>
      <div className="text">wind speed</div>
     </div>
  </div>
  </>
 )
} 



function App() {
  
  let api_key = "4f99b6d61955826685c81725b06b69dd";

  const [icon,setIcon] = useState(sun);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const[lat, setLat] = useState(0);
  const[long, setLong] = useState(0);
  const[humidity, setHumidity] = useState(0);
  const[wind, setWind] = useState(0);

  const[text, setText] = useState("madurai");

  const[cityNotFound, setCityNotFound] = useState(false);
  const[loading, setLoading] = useState(false);

  const weatherIconMap = {
    "01d" : sun,
    "01n" : sun,
    "02d" : cloud,
    "02n" : cloud,
    "03d" : drizzle,
    "03n" : drizzle,
    "04d" : drizzle,
    "04n" : drizzle,
    "09d" : rain,
    "09n" : rain,
    "10d" : rain,
    "10n" : rain,
    "13d" : snow,
    "13n" : snow,
  
  };


  const report = async () => {
  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
  

  try{
       let res = await fetch(url);
       let data = await res.json();
       if(data.cod === "404"){
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
       }

       setHumidity(data.main.humidity);
       setWind(Math.round(data.wind.speed*3.6));
       setTemp(Math.floor(data.main.temp));
       setCity(data.name);
       setCountry(data.sys.country);
       setLong(data.coord.lon);
       setLat(data.coord.lat);

       

const condition = data.weather[0].main;

if(condition.includes("Cloud")) setIcon(cloud);
else if(condition.includes("Rain")) setIcon(rain);
else if(condition.includes("Snow")) setIcon(snow);
else if(condition.includes("Drizzle")) setIcon(drizzle);
else setIcon(sun);

      //  const weatherIconCode = data.weather[0].icon;
      //  setIcon(weatherIconMap[weatherIconCode] || sun);
      //  setCityNotFound(false);
  }
  catch(error){
    console.error("An error Occurred: " + error.message);
  }finally{
    setLoading(false);
  }
  }

  const handleCity = (e) => {
    setText(e.target.value);
  }

   const handleKeyDown = (e) => {
    if(e.key ==="Enter") {
      report();
    }
   }

   useEffect(function() {
    report();
   },[]);

  return (
    <>
      <div className = "container">
        <div className="input-container">
          <input type="text"
           className="city" 
           placeholder='search city'  
           onChange={handleCity}
           value ={text}
           onKeyDown={handleKeyDown}/>
          <div className='search'  
            onClick = { () => report()}>
              🔍
          </div>
        </div>
        <WeatherDetails icon = {icon} 
                         temp = {temp}
                         city = {city}
                         country = {country}
                         lat = {lat}
                         long = {long}
                         humidity = {humidity}
                         wind = {wind}/>
    
    
    <p className="copyright">
      Designed by <span>Suganya</span></p>            

      </div>
        
       
    </>
  )
}

export default App
