import React, { useState } from "react";
const api = {
  key: "c0c6026e840e9dfe0539b37f1c1ce02b",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [tempo, setTempo] = useState({});

  const pesquisa = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setTempo(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div className={(typeof tempo.main != "undefined") ? ((tempo.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="barra-pesquisa">
          <input
            type="text"
            className="barra-pesquisa"
            placeholder="Pesquise..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={pesquisa}
          />
        </div>
        {typeof tempo.main != "undefined" ? (
          <div>
            <div className="localizacao-box">
              <div className="localizacao">
                {tempo.name}, {tempo.sys.country}
              </div>
              <div className="data">{new Date().toLocaleDateString()}</div>
              <div className="data">
                {new Date().toLocaleDateString(window.navigator.language, {
                  weekday: "long",
                })}
              </div>
            </div>
            <div className="tempo-box">
              <div className="temp">{Math.round(tempo.main.temp)}°C</div>
              <div className="clima">{tempo.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
