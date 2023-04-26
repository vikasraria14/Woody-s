const {connection} =require('./connection')
const createUserTable =async () => {
  const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
 
  name VARCHAR(50),
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(255),
  userType VARCHAR(50)
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


//   // Insert data into the table
const insertIntoUser =async (name, username, password, userType)=>{
    const sql = 'INSERT INTO users (name, username, password, userType) VALUES (?, ?, ?, ?)';

    // Execute the SQL query with the values as parameters
    connection.query(sql, [name, username, password, userType], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err.message);
      } else {
        console.log('User inserted successfully');
      }
    });

}


const searchUser = async(username) =>{
    const sql = `SELECT * FROM users WHERE username = ?`;
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
module.exports ={createUserTable,insertIntoUser, searchUser}
