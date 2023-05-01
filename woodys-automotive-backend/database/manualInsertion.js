const {connection} =require('./connection')
const {locations, carData, serviceData}= require('../utils')
function createLocationsTableAndInsertData(locations) {
    const sql = `
      CREATE TABLE IF NOT EXISTS locations (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        location_name VARCHAR(255) NOT NULL
      )
    `;
    
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Location Table created successfully!');
      
      let insertSql = `INSERT INTO locations (location_name) VALUES `;
      locations.forEach((location, index) => {
        if (index !== 0) {
          insertSql += ', ';
        }
        insertSql += `('${location}')`;
      });
      
      connection.query(insertSql, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return;
        }
        console.log('Data inserted successfully!');
      });
    });
  }
  
  function createCarsTableAndInsertData(cars) {
    const sql = `
      CREATE TABLE IF NOT EXISTS cars (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL
      )
    `;
    
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Cars Table created successfully!');
      
      let insertSql = `INSERT INTO cars (make, model) VALUES `;
      cars.forEach((car, index) => {
        if (index !== 0) {
          insertSql += ', ';
        }
        insertSql += `('${car.make}', '${car.model}')`;
      });
      
      connection.query(insertSql, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return;
        }
        console.log('Data inserted successfully!');
      });
    });
  }
  
  function createServiceDataTableAndInsertData(serviceData) {
    const sql = `
      CREATE TABLE IF NOT EXISTS serviceData (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        cost INT NOT NULL
      )
    `;
    
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Service Data Table created successfully!');
      
      let insertSql = `INSERT INTO serviceData (type, cost) VALUES `;
      serviceData.forEach((data, index) => {
        if (index !== 0) {
          insertSql += ', ';
        }
        insertSql += `('${data.type}', '${data.cost}')`;
      });
      
      connection.query(insertSql, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return;
        }
        console.log('Data inserted successfully!');
      });
    });
  }
//   createServiceDataTableAndInsertData(serviceData)
//   createCarsTableAndInsertData(carData)
//   createLocationsTableAndInsertData(locations)
  exports.a=10;