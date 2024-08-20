import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Drizzle: Light intensity',
    53: 'Drizzle: Moderate intensity',
    55: 'Drizzle: Dense intensity',
    56: 'Freezing Drizzle: Light intensity',
    57: 'Freezing Drizzle: Dense intensity',
    61: 'Rain: Slight intensity',
    63: 'Rain: Moderate intensity',
    65: 'Rain: Heavy intensity',
    66: 'Freezing Rain: Light intensity',
    67: 'Freezing Rain: Heavy intensity',
    71: 'Snow fall: Slight intensity',
    73: 'Snow fall: Moderate intensity',
    75: 'Snow fall: Heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: Slight intensity',
    81: 'Rain showers: Moderate intensity',
    82: 'Rain showers: Violent intensity',
    85: 'Snow showers: Slight intensity',
    86: 'Snow showers: Heavy intensity',
    95: 'Thunderstorm: Slight intensity',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

const WeatherGraph = ({ data, variable }) => {
    let minTemperature = Math.min(...data.map((d) => d[variable]));
    let maxTemperature = Math.max(...data.map((d) => d[variable]));
    minTemperature = Math.floor(minTemperature);
    maxTemperature = Math.ceil(maxTemperature);

    const hours = [ ...Array(24).keys() ].filter((h) => h % 2 === 0);

    return (
        <LineChart width={800} height={300} data={data}>
            <XAxis data={hours} interval={1} tickFormatter={(hour) => `${hour}:00`} />
            <YAxis domain={[minTemperature-2, maxTemperature+2]} />
            <Tooltip 
                formatter={(value) => Math.round(value)}
                contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }}
                labelFormatter={(value) => `${value}:00 - ${weatherCodes[data[value].weatherCode]}`}
            />
            <Line type="monotone" dataKey={variable} stroke="#8884d8" />
        </LineChart>
    );
};

export default WeatherGraph;