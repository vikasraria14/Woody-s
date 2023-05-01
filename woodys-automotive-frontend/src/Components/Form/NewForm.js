import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { carData, years, cities, serviceData } from "../../Utils/utils";
import { bookService } from "../../Controllers/service";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOutUser } from "../../Reducers/loggedInUserReducer";

const NewForm = () => {
  const [allMakes, setAllMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [mileage, setMileage] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState(new Date());
  const [cost, setCost] = useState("");
  const [city, setCity] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle form submit
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let x = window.localStorage.getItem("loggedInUser");
    x = JSON.parse(x);
    let username = x.user[0].username;
    let name = x.user[0].name;
    const finalData = {
      name,
      username,
      city,
      make,
      model,
      year,
      serviceType,
      lastServiceDate: lastServiceDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      mileage,
      cost,
      licensePlate,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
      currentStatus: "Check-In",
    };
   // console.log(finalData)
    bookService(finalData);

    navigate("/userView");
  };

  const handleMake = (e) => {
    e.preventDefault();
    let make = e.target.value;
    setMake(make);
    let models = carData.filter((car) => car.make === make);
    models = models.map((model) => model.model);
    setAllModels(models);
  };

  const handleServiceType = (e) => {
    e.preventDefault();
    let serviceType = e.target.value;
    console.log(serviceType);
    setServiceType(serviceType);
    let cost = serviceData.find((service) => service.type === serviceType);
    cost = cost.cost;
    setCost(cost);
  };
  const logOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");

    dispatch(logOutUser());
    navigate("/login");
  };

  useEffect(() => {
    const distinctMakes = [...new Set(carData.map((car) => car.make))];
    setAllMakes(distinctMakes);
  }, []);
  return (
    <>
      <div className="headWrapper">
        <h1> welcome to Woody's Automotive </h1>
        <Button
          variant="primary"
          className="booking"
          onClick={() => navigate("/userView")}
        >
          View Bookings
        </Button>
        <Button variant="primary" className="logOut" onClick={logOut}>
          Logout
        </Button>
      </div>
      
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
        <label htmlFor="city">City</label>
        <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio1"
              value="New York City, NY"
              checked={selectedOption === "New York City, NY"}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="form-check-label" htmlFor="radio1">
              New York City, NY
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio2"
              value="New York City, NY"
              checked={selectedOption === "New York City, NY"}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="form-check-label" htmlFor="radio2">
            New York City, NY
            </label>
          </div>
          
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio3"
              value="Chicago, IL"
              checked={selectedOption === "Chicago, IL"}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="form-check-label" htmlFor="radio3">
            Chicago, IL
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio4"
              value="Houston, TX"
              checked={selectedOption === "Houston, TX"}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="form-check-label" htmlFor="radio3">
            "Houston, TX"
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="Phoenix, AZ"
              value="Phoenix, AZ"
              checked={selectedOption === "Phoenix, AZ"}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="form-check-label" htmlFor="radio3">
            "Phoenix, AZ"
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="make">Make</label>
            <select
              className="form-control"
              id="make"
              value={make}
              onChange={(e) => handleMake(e)}
            >
              <option value="">-- Select make --</option>
              {allMakes.map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <select
              className="form-control"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="">-- Select model --</option>
              {allModels.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year of Purchase</label>
            <select
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">-- Select year --</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lastService">Last Service Date</label>
            <DatePicker
              className="form-control"
              id="lastService"
              selected={lastServiceDate}
              onChange={(date) => setLastServiceDate(date)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="licensePlate">License Plate</label>
            <input
              type="text"
              className="form-control"
              id="licensePlate"
              placeholder="Enter Licence Plate Number"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mileage">Mileage</label>
            <input
              type="text"
              className="form-control"
              id="mileage"
              placeholder="Mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceType">Service Type</label>
            <select
              className="form-control"
              id="serviceType"
              value={serviceType}
              onChange={(e) => handleServiceType(e)}
            >
              <option value="">-- Select Service Type --</option>
              {serviceData.map((service, index) => (
                <option key={index} value={service.type}>
                  {service.type}
                </option>
              ))}
              ``
            </select>
          </div>
          <label htmlFor="city">Service Type</label>
          {/* { type: "Oil Change", cost: 50 },
    { type: "Tire Rotation", cost: 30 },
    { type: "Brake Replacement", cost: 150 },
    { type: "Battery Replacement", cost: 100 },
    { type: "Air Conditioning Service", cost: 80 }, */}
        <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio1"
              value="Oil Change"
              checked={selectedOption === "Oil Change"}
              onChange={(e) => handleServiceType(e)}
            />
            <label className="form-check-label" htmlFor="radio1">
              Oil Change
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio2"
              value="Tire Rotation"
              checked={selectedOption === "Tire Rotation"}
              onChange={(e) => handleServiceType(e)}
            />
            <label className="form-check-label" htmlFor="radio2">
            Tire Rotation
            </label>
          </div>
          
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio3"
              value="Brake Replacement"
              checked={selectedOption === "Brake Replacement"}
              onChange={(e) => handleServiceType(e)}
            />
            <label className="form-check-label" htmlFor="radio3">
            Brake Replacement
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="radio4"
              value="Air Conditioning Service"
              checked={selectedOption === "Air Conditioning Service"}
              onChange={(e) => handleServiceType(e)}
            />
            <label className="form-check-label" htmlFor="radio3">
            Air Conditioning Service            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio-group"
              id="Battery Replacement"
              value="Battery Replacement"
              checked={selectedOption === "Battery Replacement"}
              onChange={(e) => handleServiceType(e)}
            />
            <label className="form-check-label" htmlFor="radio3">
            "Battery Replacement"
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="Cost">Cost</label>
            <input
              type="text"
              className="form-control"
              id="cost"
              placeholder="0"
              value={cost}
              disabled
            />
          </div>
                   
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default NewForm;
