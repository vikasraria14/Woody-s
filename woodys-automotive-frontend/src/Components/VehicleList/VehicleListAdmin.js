import React, { useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import ServiceInfoAdmin from "../ServiceInfo/ServiceInfoAdmin";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadBill } from "../../Utils/downloadBill";
const VehicleListAdmin = ({
  carData,
  setCarData,
  fetchData,
  startDate,
  endDate,
}) => {
  // const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);

  const [serviceForm, setServiceForm] = useState({});

  const handleClick = (row) => {
    let x = row;

    setShow(true);
    setServiceForm(x);
  };

  // useEffect(()=>{},[])
  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      id: "date",
      sortable: true,
    },
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
      selector: (row) => row.cost,
    },
    {
      name: "Current Status",
      id: "currentStatus",
      selector: (row) => row.currentStatus,
    },
    {
      name: "Action",
      id: "downtimePageAction",
      selector: (row) => (
        <EditIcon
          style={{ justifyContent: "center" }}
          onClick={() => {
            handleClick(row);
          }}
        />
      ),
    },
    {
      name: "Download Invoice",
      id: "downloadInvoice",

      selector: (row) => {
        if (row.currentStatus !== "Completed") {
          return "";
        }

        return (
          <DownloadIcon
            style={{ justifyContent: "center" }}
            onClick={() => {
              downloadBill(row);
            }}
          />
        );
      },
    },
  ];

  return (
    <>
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
        <ServiceInfoAdmin
          serviceForm={serviceForm}
          show={show}
          setShow={setShow}
          carData={carData}
          setCarData={setCarData}
          fetchData={fetchData}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </>
  );
};
export default VehicleListAdmin;
