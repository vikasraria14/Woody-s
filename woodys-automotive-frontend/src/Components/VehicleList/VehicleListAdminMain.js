import { useState, useEffect } from "react";
import { getServicesBetween } from "../../Controllers/service";
import DateRangeSelector from "../DateRangeSelector/DateRangeSelector";
import CityStats from "../Stats/CityStats";
import ServiceStats from "../Stats/ServiceStats";
import VehicleListAdmin from "./VehicleListAdmin";
//import { fetchData } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logOutUser } from "../../Reducers/loggedInUserReducer";
import { useDispatch } from "react-redux";

const ChartContainer = ({ children }) => {
  return (
    <div style={{ display: "inline-block", width: "50%" }}>{children}</div>
  );
};
const VehicleListAdminMain = () => {
  const [inProgress, setInProgress] = useState([]);
  const [notStarted, setNotStarted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [carData, setCarData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async (startDate, endDate) => {
    let res = await getServicesBetween(startDate, endDate);
    setStats(res);
    res = res.data;

    let progress = res.filter(
      (car) =>
        car.currentStatus !== "Check-In" && car.currentStatus !== "Completed"
    );
    let completed = res.filter((car) => car.currentStatus === "Completed");
    let notStarted = res.filter((car) => car.currentStatus === "Check-In");
    setCarData(res.data);

    setInProgress(progress);
    setCompleted(completed);
    setNotStarted(notStarted);
  };
  const logOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");

    dispatch(logOutUser());
    navigate("/login");
  };

  useEffect(() => {
    // fetchData();
  }, []);
  if (stats.revenueByCity === undefined) {
    console.log("stats", stats);
    return (
      <>
        <div className="headWrapper">
          <h1> welcome to Woody's Automotive </h1>

          <Button variant="primary" className="logOut" onClick={logOut}>
            Logout
          </Button>
        </div>
        <DateRangeSelector
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          fetchData={fetchData}
        />
      </>
    );
  } else {
    return (
      <>
        <div className="headWrapper">
          <h1> welcome to Woody's Automotive </h1>
          <Button variant="primary" className="logOut" onClick={logOut}>
            Logout
          </Button>
        </div>
        <DateRangeSelector
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          fetchData={fetchData}
        />
        <ChartContainer>
          <h1>Revenue By City</h1>
          <CityStats data={stats.revenueByCity} />
        </ChartContainer>
        <ChartContainer>
          <h1>Revenue By Service Type</h1>
          <ServiceStats data={stats.revenueByService} />
        </ChartContainer>
        <h1>In Progress</h1>

        <VehicleListAdmin
          carData={inProgress}
          setCarData={setCarData}
          fetchData={fetchData}
          startDate={fromDate}
          endDate={toDate}
        />
        <h1>Not Started</h1>
        <VehicleListAdmin
          carData={notStarted}
          setCarData={setCarData}
          fetchData={fetchData}
          startDate={fromDate}
          endDate={toDate}
        />
        <h1>Completed</h1>
        <VehicleListAdmin
          carData={completed}
          setCarData={setCarData}
          fetchData={fetchData}
          startDate={fromDate}
          endDate={toDate}
        />
      </>
    );
  }
};
export default VehicleListAdminMain;
