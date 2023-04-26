import React, { useState } from 'react';
const DateRangeSelector = ({fromDate,toDate,setFromDate,setToDate,fetchData}) => {
  
  const [error, setError] = useState('');

  const handleFromDateChange = (event) => {
    const selectedDate = event.target.value;
    setFromDate(selectedDate);
    setError('');
  }

  const handleToDateChange = (event) => {
    const selectedDate = event.target.value;
    setToDate(selectedDate);
    setError('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform date validation
    if (!fromDate || !toDate) {
      setError('Please select both "from" and "to" dates');
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      setError('"From" date cannot be greater than "to" date');
      return;
    }
    let x=new Date(fromDate)//.toISOString().slice(0, 19).replace('T', ' ')
    let y=new Date(toDate)
    
   y=new Date((y.setDate(y.getDate()+1))).toISOString().slice(0, 19).replace('T', ' ')
    // Perform further processing with the selected dates
    //console.log(y.getDate())
    // setFromDate(x)
    // setToDate(y)
    fetchData(fromDate,toDate)
    console.log('From date:', x);
    console.log('To date:', y);
  }

  return (
    <div className="top-bar">
      <h2 className="logo">Date Range Selector</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group form1">
          <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} />
        </div>
        <div className="form-group form1">
          <input type="date" id="toDate" value={toDate} onChange={handleToDateChange} />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DateRangeSelector;
