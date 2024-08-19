import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const WeatherGraph = ({ data, variable }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey={variable} stroke="#8884d8" />
    </LineChart>
  );
};

export default WeatherGraph;