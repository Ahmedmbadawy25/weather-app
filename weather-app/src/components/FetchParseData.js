import { fetchWeatherApi } from 'openmeteo';

async function FetchParseData() {
    const params = {
        "latitude": 30.03,
        "longitude": 31.47,
        "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "rain", "weather_code", "visibility", "uv_index"],
        "timezone": "Africa/Cairo"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {

        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            relativeHumidity2m: hourly.variables(1).valuesArray(),
            apparentTemperature: hourly.variables(2).valuesArray(),
            rain: hourly.variables(3).valuesArray(),
            weatherCode: hourly.variables(4).valuesArray(),
            visibility: hourly.variables(5).valuesArray(),
            uvIndex: hourly.variables(6).valuesArray(),
        },

    };

    const sortedData = weatherData.hourly.time.map((time, index) => ({
        time: time.toISOString(),
        temperature2m: weatherData.hourly.temperature2m[index],
        relativeHumidity2m: weatherData.hourly.relativeHumidity2m[index],
        apparentTemperature: weatherData.hourly.apparentTemperature[index],
        rain: weatherData.hourly.rain[index],
        weatherCode: weatherData.hourly.weatherCode[index],
        visibility: weatherData.hourly.visibility[index],
        uvIndex: weatherData.hourly.uvIndex[index],
    }));

    const groupedByDayData = sortedData.reduce((acc, curr) => {
        const date = curr.time.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
    }, {});

    return groupedByDayData;
}

export default FetchParseData;