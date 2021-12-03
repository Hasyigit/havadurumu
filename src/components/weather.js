import {  useState, useEffect } from 'react';
// import cityJson from "./components/cities.json";
import cityJson from "./cities.json";
import axios from "axios";

function Weather() {
    
    const key = "17d0bd6b3e15f511805dc2b664935484";
    const [city, setCity] = useState("Ankara");
    

  const [weather, setWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const onselect = (e) => {
    setCity(e.target.value);
  };

  const [coords,setCoords] = useState (null); //useState verilerimizi burada depoladığımız alandır
  const [current, setCurrent] = useState({
    temp_c:'',
    icon:'',
    feelslike_c:'',

     });
    

  const [location,setLocation] = useState({
    name:'',
    country:'',
    region:'',
    localtime:''
  })


  const getLocation = () => {
    if (!navigator.geolocation){
      alert("Geolocation yok")
    }
    else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(`${position.coords.lon}, ${position.coords.lat}`)
        
      });
    }
  }

  


  //api 
  useEffect(() => {
    const getData = () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`
        )

        .then((resp) => setWeather(resp.data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };

    getData();
  },[city]);
  

  return (
    // getLocation'a onClick gerçekleştirildiğinde konum bilgisi açılacak
    <div className="weather-container">
        
      <form>
        <select name="cityName" className="selection" onChange={onselect}>
          {cityJson.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </form>
      <h2 className="cityName">{city}</h2>
      <div className="weather">
        {
          !isLoading && 
          <div>
          <h2>{Math.floor(weather.main.temp)} °C</h2>
          {console.log(weather)}
            <div>
                <h1>Hissedilen</h1>
                <h2>{(weather.main.feels_like)} </h2>
                <div className="location">
                    <span>{location.name}</span> - <span>{location.region}</span> - <span>{location.country}</span>
                </div>
                <div><span className="time">{location.localtime}</span></div>
             </div>
             <button className="button" onClick={getLocation}>Hava Durumunu Getir</button>
          </div>
        } 

      </div>
    </div>
  );
}

export default Weather;