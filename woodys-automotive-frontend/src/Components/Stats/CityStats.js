import React from 'react';

const CityStats = ({ data }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Top Cities By Revenue</th>
          <th scope="col">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.city}</td>
            <td>{item.total_revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CityStats;
