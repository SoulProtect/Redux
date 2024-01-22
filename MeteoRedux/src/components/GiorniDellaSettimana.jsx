import React, { useState, useEffect } from "react";
import { Card, CardGroup, ListGroup } from "react-bootstrap";
import getWeatherInfo from "./Info.jsx";

function GiorniDellaSettimana({ city }) {
  const [giorniDellaSettimana, setGiorniDellaSettimana] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "1b796f69871ba45771730838e7c083a7";

  useEffect(() => {
    const fetchForecastWeatherData = () => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

      setLoading(true);

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Città non disponibile.. Riprovare");
          }
          return response.json();
        })
        .then((forecastData) => {
          setGiorniDellaSettimana(setGiorniDellaSettimanaData(forecastData));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    //funzione per convertire la risposta della api in una lista di oggetti custom
    const setGiorniDellaSettimanaData = (forecastData) => {
      const giorniDellaSettimana = [];
      // Usiamo una mappa per tenere traccia del giorno corrente
      const daysMap = new Map();
      let giorniAggiunti = 0;

      // ciclo la lista di giorni filtrandoli e costruendo l'oggetto giorno da aggiungere a giorniDellaSettimana
      forecastData.list.forEach((forecastDay) => {
        //controllo i primi 4 giorni a seguire da oggi
        if (giorniAggiunti < 4) {
          const forecastDate = new Date(
            forecastDay.dt_txt
          ).toLocaleDateString();

          // Verifica se il giorno corrente è già stato aggiunto
          if (!daysMap.has(forecastDate)) {
            // Aggiungi solo il primo elemento di ogni giorno
            daysMap.set(forecastDate, true);

            // Creazione dell'oggetto giorno
            const giorno = {
              data: forecastDay.dt,
              icon: getWeatherInfo(forecastDay.weather[0].main).image,
              gradiMinMax: setMinMax(
                forecastDay.main.temp_min,
                forecastDay.main.temp_max
              ),
              iconaVento: "./assets/vento1.png",
              iconaUmidità: "./assets/umidità.png",
              velocitaVento: forecastDay.wind.speed + "km/h",
              umidita: forecastDay.main.humidity + "%",
            };

            giorniDellaSettimana.push(giorno);
            //incremento i giorniAggiunti
            giorniAggiunti++;
          }
        }
      });

      return giorniDellaSettimana;
    };

    //funzione per convertire i gradi da kelvin a gradi centigradi, inoltre riduco i decimali a 1
    const setMinMax = (min, max) => {
      const gradiMin = min - 273.15;
      const gradiMax = max - 273.15;
      return gradiMin.toFixed(1) + " / " + gradiMax.toFixed(1);
    };

    fetchForecastWeatherData();
  }, [city]);

  return (
    <CardGroup>
      <Card className="giorniCard">
        <Card.Header>Tempo in questi giorni...</Card.Header>
        <hr />
        <Card.Body>
          {loading && <p>Caricamento...</p>}
          {error && <p>Errore: {error}</p>}

          {giorniDellaSettimana && (
            <ListGroup variant="flush">
              {giorniDellaSettimana.map((giorno, index) => (
                <ListGroup.Item key={index}>
                  <p>
                    Data: {new Date(giorno.data * 1000).toLocaleDateString()}
                  </p>
                  <img
                    src={giorno.icon}
                    className="imageGiorni"
                    alt="Icona meteo"
                  />
                  <p>Gradi: {giorno.gradiMinMax}</p>
                  <p>Vento: {giorno.velocitaVento}</p>
                  <p>Umidità: {giorno.umidita}</p>
                  <hr />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default GiorniDellaSettimana;
