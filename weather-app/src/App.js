import './App.css';
import React from 'react';
import Header from './components/Header';
import FetchParseData from './components/FetchParseData';
import WeatherGraph from './components/WeatherGraph';
import DateTabs from './components/DateTabs';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isFetchingData, setIsFetchingData] = React.useState(true);
  const [weatherData, setWeatherData] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);

  React.useEffect(() => {
    FetchParseData()
      .then((data) => {
        setWeatherData(data);
        setSelectedDate(Object.keys(data)[0]);
        setIsFetchingData(false);
      })
      .catch((error) => {
        console.error(error);
        setIsFetchingData(false);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  console.log(weatherData);

  return (
    <div>
      <Header />
      {isFetchingData ? (
        <LoadingScreen />
      ) : (
        <div>
          <DateTabs dates={Object.keys(weatherData)} selectedDate={selectedDate} onSelectDate={handleDateChange} />
          <div className="content-container">
          </div>

          <div className="grid-container">

            <div className="content-container">
              <WeatherGraph data={weatherData[selectedDate]} variable="temperature2m" />
            </div>
            <div className="content-container">
              <WeatherGraph data={weatherData[selectedDate]} variable="uvIndex" />
            </div>

            <div className="content-container">
              <WeatherGraph data={weatherData[selectedDate]} variable="apparentTemperature" />
            </div>
            <div className="content-container">
              <WeatherGraph data={weatherData[selectedDate]} variable="rain" />
            </div>

            <div className="content-container">
              <WeatherGraph data={weatherData[selectedDate]} variable="relativeHumidity2m" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;