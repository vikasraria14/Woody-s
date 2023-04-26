import React from 'react';
import './index.css'
const ServiceStats = ({ data }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Top Service Types</th>
          <th scope="col">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.serviceType}</td>
            <td>{item.total_revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServiceStats;
