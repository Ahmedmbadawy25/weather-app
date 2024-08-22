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

  if (isFetchingData) {
    return (
      <div>
        <Header />
        <LoadingScreen />
      </div>
    )
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  console.log(weatherData);

  return (
    <div>
      <Header />
      <DateTabs dates={Object.keys(weatherData)} selectedDate={selectedDate} onSelectDate={handleDateChange} />
      <WeatherGraph data={weatherData[selectedDate]} variable="temperature2m" />
      <WeatherGraph data={weatherData[selectedDate]} variable="uvIndex" />
    </div>
  );
}

export default App;
