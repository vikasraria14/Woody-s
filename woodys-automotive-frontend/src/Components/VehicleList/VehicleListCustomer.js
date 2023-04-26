import  { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
// import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { getServices } from "../../Controllers/service";
import {downloadBill} from "../../Utils/downloadBill"
import ServiceInfoUser from "../ServiceInfo/ServiceInfoUser";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Reducers/loggedInUserReducer";
const VehicleListCustomer = (props) => {
  
  const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);
  const [serviceForm, setServiceForm]= useState({})
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser')
    
    dispatch(logOutUser())
    navigate('/login')
}
  const handleClick = (row)=>{
    let x= row

    //downloadBill(row)
   setShow(true)
    setServiceForm(x)
  }
  useEffect(() => {
    const fetchData = async () => {
      let x = window.localStorage.getItem("loggedInUser");
      if(x)
      {
        x = JSON.parse(x);
        let username = x.user[0].username;
        console.log(username)
        let res = await getServices(username);
        //console.log("Hi from Admin", res);
        setCarData(res.data);
      }
      
    };
    fetchData();
  }, []);

  const columns = [
    {
        name: "Customer Name",
        selector: (row) => row.name,
        id: "name",
        sortable: true,
      },
    {
      name: "Make",
      selector: (row) => row.make,
      id: "make",
      sortable: true,
    },
    {
      name: "Model",
      id: "model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "License Plate",
      id: "licensePlate",
      selector: (row) => row.licensePlate,
      sortable: true,
    },
    {
      name: "Service Type",
      id: "serviceType",
      selector: (row) => row.serviceType,
      sortable: true,
    },
    {
      name: "Cost",
      id: "cost",
      selector: (row) => row.cost
    },
    {
      name: "Current Status",
      id: "currentStatus",
      selector: (row) => row.currentStatus,
    },
    {
        name: "View",
        id: "downtimePageAction",
        selector: (row)=><VisibilityOutlinedIcon
        style={{ justifyContent: "center" }}
        onClick ={()=>{
          handleClick(row)
        }}
        />,
     },
     {
        name: "Download Invoice",
        id: "downloadInvoice",
        
        selector: (row) =>{ 
        if(row.currentStatus!=="Completed")
        {
            return ""
        }
        
        return <DownloadIcon
        style={{ justifyContent: "center" }}
        onClick ={()=>{
            downloadBill(row)
          }}
        />}
      }
  ];

  return (
    <>
    <div className="headWrapper">
          <h1> welcome to Woody's Automotive </h1>
          <Button variant="primary" className="booking"  onClick={()=>navigate('/bookService')}>
            Book Service
          </Button>
          <Button variant="primary" className="logOut" onClick={logOut}>
            Logout
          </Button>
        </div>
      <div>
        <DataTable
          columns={columns}
          data={carData}
          pagination
          striped={true}
          className="table d-flex align-items-center"
          //fixedHeader
          fixedHeaderScrollHeight="450px"
          subHeader
        />
        <ServiceInfoUser 
          serviceForm={serviceForm}
          show = {show}
          setShow={setShow}
          carData={carData}
          setCarData={setCarData}
        />
      </div>
    </>
  );
};
export default VehicleListCustomer;
