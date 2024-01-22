import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import Humidity from "./assets/umidità.png";
import Wind from "./assets/vento1.png";
import getWeatherInfo from "./components/Info";
import GiorniDellaSettimana from './components/GiorniDellaSettimana';

import './App.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [giorniDellaSettimana, setGiorniDellaSettimana] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '1b796f69871ba45771730838e7c083a7';

  const fetchWeatherData = () => {
    setLoading(true);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Città non disponibile.. Riprovare');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
        return data.name;
      })
      .then(cityName => {
        // Chiamata API per i giorni della settimana solo dopo aver ottenuto le condizioni attuali
        fetchForecastWeatherData(cityName);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchForecastWeatherData = (cityName) => {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(forecastApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Città non disponibile.. Riprovare");
        }
        return response.json();
      })
      .then(forecastData => {
        setGiorniDellaSettimana(forecastData);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  //funzione per convertire i gradi da kelvin a gradi centigradi
  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  return (
    <>
      <div className="container row">
        <div className="weather col-8">
          <div className="search">
            <input
              type="text"
              placeholder="Città"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeatherData}>
              <CiSearch />
            </button>
          </div>

          {loading && <p>Caricamento...</p>}
          {error && <p>Errore: {error}</p>}

          {weatherData && (
            <div className="info">
              <img src={getWeatherInfo(weatherData.weather[0].main).image} alt="" />
              <h1>{kelvinToCelsius(weatherData.main.temp).toFixed(1)}°C</h1>
              <h2>{weatherData.name}</h2>
              <p>{getWeatherInfo(weatherData.weather[0].main).description}</p>
              <div className="dettagli row">
                <div className="col-6">
                  <img src={Humidity} alt="" />
                  <div className="umidità">
                    <div>{weatherData.main.humidity}%</div>
                    <div>Umidità</div>
                  </div>
                </div>

                <div className="col-6">
                  <img src={Wind} alt="" />
                  <div className="vento">
                    <div>{weatherData.wind.speed} km/h</div>
                    <div>Vento</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        
        </div>
        <div className='giorni col-4'>{giorniDellaSettimana && <GiorniDellaSettimana city={city} />}</div>
        
      </div>
    </>
  );
}

export default WeatherApp;
