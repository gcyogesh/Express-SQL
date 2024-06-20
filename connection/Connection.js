import mysql2 from 'mysql2'

let mySqlConnection  = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employeedb'
})

mySqlConnection.connect((err)=>{
    if(err){
        console.log("db not connected");
    }
    else{
        console.log("Sucessfully connected to db")
    
    }
})

export default  mySqlConnection;