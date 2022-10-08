import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Tempapp.css";
const Tempapp = () => {
  const [input, setInput] = useState("pune");
  const [weather, setWeather] = useState('');
  const [sky, setSky] = useState("");
  const [loading,setLoading]=useState(false)

  const fetchApi = async () => {
    setLoading(true)
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=f960c14fe804da302af90c9ae184bb25`
    );
     console.log(data)
    //  console.log(data.data.main.temp)
    //  console.log(data.data)
    setWeather(data.data.main);
    //  console.log(data.data.weather[0].main)
    setSky(data.data.weather[0].main);
    setLoading(false)
  };
  console.log(weather);
  
  useEffect(() => {
    fetchApi();
    setWeather('')
    // eslint-disable-next-line
  }, [input]);

  const handelChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };
  const debounce = (fun) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        return fun(...args);
      }, 800);
    };
  };
  const debouncadInput = debounce(handelChange);

  return (
    <div className="temp-container">
      <div className="container-wrapper">
        <div className="search">
          <input
            onChange={debouncadInput}
            type="text"
            name=""
            id=""
            placeholder="SEARCH CITY"
          />
        </div>
         
        <div className="weather-image">
          {sky.length === 5 ? (<>
          <div className="cloud-wrapper">
            <i
              className="fa-solid fa-sun"
              style={{ color: "yellow", fontSize: "2rem" }}
            
                
            ></i>
             <span>{sky}</span>
             </div>
            </>
          ) : (
            <>
            <div className="cloud-wrapper">
            <i
              class="fa-solid fa-cloud"
              style={{ color: "white", fontSize: "2rem" }}
            ></i>
             <span>{sky}</span>

            </div>
            </>
          )}
          {/* {
           input && loading && weather?<h1>Loading</h1>:  <h1></h1>
          } */}
          {/* <i class="fa-solid fa-sun"></i> */}
        </div>
        { 
      !input &&!weather? 
          <h2 className="popup" >search city</h2>
    : input && !weather  ?  <h2 className="popup">City Not Found </h2> :(
          <>
            <div className="city-content">
              <div className="street-icon">
                <i className="fa-solid fa-street-view"></i>
              </div>
              <div className="city-name">
                <span>{input}</span>
                
              </div>
            </div>
              
            <div className="temp">
              <div className="degree">
                <span>{weather.temp}⁰c</span>
              </div>
              <div className="max-min font-secondary">
                <span style={{ zIndex: "10" }}>
                  min:{weather.temp_min}⁰c | max:{weather.temp_max}⁰c{" "}
                </span>
              </div>
            </div>
            <div className="wave">
              <div className="wave1"></div>
              <div className="wave2"></div>
              <div className="wave3"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tempapp;
