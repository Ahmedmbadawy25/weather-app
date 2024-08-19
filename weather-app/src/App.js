import './App.css';
import React from 'react';
import Header from './components/Header';
import FetchParseData from './components/FetchParseData';
import WeatherGraph from './components/WeatherGraph';

function App() {
  const [isFetchingData, setIsFetchingData] = React.useState(true);
  const [weatherData, setWeatherData] = React.useState(null);

  React.useEffect(() => {
    FetchParseData()
      .then((data) => {
        setWeatherData(data);
        console.log(data['2024-08-19']);
        setIsFetchingData(false);
      })
      .catch((error) => {
        console.error(error);
        setIsFetchingData(false);
      });
  }, []);

  if (isFetchingData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <WeatherGraph data={weatherData['2024-08-19']} variable="temperature2m" />
    </div>
  );
}

export default App;
