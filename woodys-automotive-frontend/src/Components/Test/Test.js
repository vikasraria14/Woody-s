import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar } from 'recharts';

const lineData = [
  { name: 'January', value: 50 },
  { name: 'February', value: 60 },
  { name: 'March', value: 70 },
  { name: 'April', value: 80 },
  { name: 'May', value: 90 },
];

const barData = [
  { name: 'January', value: 10 },
  { name: 'February', value: 20 },
  { name: 'March', value: 30 },
  { name: 'April', value: 40 },
  { name: 'May', value: 50 },
];

const ChartContainer = ({ children }) => {
  return <div style={{ display: 'inline-block', width: '50%' }}>{children}</div>;
};

const LineGraph = () => {
  return (
    <ChartContainer>
      <LineChart
        width={400}
        height={300}
        data={lineData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ChartContainer>
  );
};

const BarGraph = () => {
  return (
    <ChartContainer>
      <BarChart
        width={400}
        height={300}
        data={barData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#0088FE" />
      </BarChart>
    </ChartContainer>
  );
};

const App = () => {
  return (
    <div>
      <LineGraph />
      <BarGraph />
    </div>
  );
};

export default App;
