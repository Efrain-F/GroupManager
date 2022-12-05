import { Sequelize } from "sequelize";


const dbConnection = new Sequelize("db_managedusers","root","",{
  host:"localhost",
  dialect:"mysql"
})

export default dbConnection





