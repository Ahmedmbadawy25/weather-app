import './App.css';
import React from 'react';
import Header from './components/Header';
import FetchParseData from './components/FetchParseData';

function App() {
  const [isFetchingData, setIsFetchingData] = React.useState(true);
  const [weatherData, setWeatherData] = React.useState(null);

  React.useEffect(() => {
    FetchParseData()
      .then((data) => {
        setWeatherData(data);
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

    </div>
  );
}

export default App;
