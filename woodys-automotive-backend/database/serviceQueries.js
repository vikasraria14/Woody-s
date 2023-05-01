const {a}= require('./manualInsertion')
const {connection} =require('./connection')
const createServiceTable =async () => {
  const createTableQuery = `
CREATE TABLE IF NOT EXISTS serviceData (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  username VARCHAR(50) ,
  make VARCHAR(50),
  model VARCHAR(50),
  year INT,
  licensePlate VARCHAR(50),
  mileage INT,
  serviceType VARCHAR(50),
  city VARCHAR(50),
  cost INT,
  lastServiceDate DATE,
  date DATE,
  currentStatus VARCHAR(50)

)`;

  // Create the table
   connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table created successfully");
  });
};



const insertIntoService =async (data)=>{
    const sql = `INSERT INTO serviceData (name, username, make,model,year, 
      licensePlate,mileage, serviceType,city, 
      cost, lastServiceDate, date, currentStatus) 
      VALUES (?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?)`;

    // Execute the SQL query with the values as parameters
    connection.query(sql, [data.name, 
      data.username, data.make, data.model, data.year, data.licensePlate,
    data.mileage,data.serviceType, data.city, data.cost,
  data.lastServiceDate, data.date, data.currentStatus], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err.message);
      } else {
        console.log('User inserted successfully');
      }
    });

}


const getServices = async(username) =>{
    const sql = `SELECT * FROM serviceData WHERE username = ?`;
    let res = await get(sql,username)
    return res
}


let get =(query,username)=>{
    return new Promise((resolve, reject) => {        
          connection.query(query,[username], (err, results) => {     
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      
}



const getAllServices = async() =>{
  const sql = `SELECT * FROM serviceData`;
  let res = await getAll(sql)
  return res
}


let getAll =(query)=>{
  return new Promise((resolve, reject) => {        
        connection.query(query, (err, results) => {     
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    
}

const updateServiceStatus=async (carId, newStatus) =>{
  // SQL query to update serviceStatus
  const query = `UPDATE serviceData SET currentStatus = ? WHERE id = ?`;
  
  // Values to be inserted in the placeholders in the query
  const values = [newStatus, carId];

  // Execute the query with values
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating serviceStatus:', error);
    } else {
      console.log(`ServiceStatus updated for carId ${carId}: ${newStatus}`);
    }
  });
}


const getServiceDetailsBetweenTimeRange = (startTime, endTime) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM serviceData WHERE date BETWEEN ? AND ?`;

    connection.query(query, [startTime, endTime], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getMaxRevenueByCity = (startTime,endTime) =>{
  return new Promise((resolve, reject) => {
    const query = `SELECT city, SUM(cost) AS total_revenue FROM serviceData WHERE date BETWEEN ? AND ?
    GROUP BY city
    ORDER BY total_revenue DESC
    LIMIT 3;`;
    
    
    connection.query(query, [startTime, endTime], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const getMaxRevenueByService =async (startTime,endTime) =>{
  return new Promise((resolve, reject) => {
    const query = `SELECT serviceType, SUM(cost) AS total_revenue FROM serviceData WHERE date BETWEEN ? AND ?
    GROUP BY serviceType
    ORDER BY total_revenue DESC
    LIMIT 3;`;
    
    
    connection.query(query, [startTime, endTime], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
//updateServiceStatus(1,"NG")
module.exports ={createServiceTable,
  insertIntoService, 
  getServices,
  getAllServices,
  updateServiceStatus,
  getServiceDetailsBetweenTimeRange,
  getMaxRevenueByCity,
  getMaxRevenueByService
}
