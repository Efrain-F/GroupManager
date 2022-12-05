import express from "express";
import cors from "cors"
import multer from "multer";

// rutas
import { router } from "./routes";
// conexion db
import dbConnection from "./db/connections";
import "./db/asociation"


import createInstances from "./db/instances";


// variables 
const PORT = process.env.PORT || 3001




const app = express() // servidor
// midelware
app.use(express.json())
app.use(cors()) // seguridad

app.use("/user",express.static("uploads/user"))
app.use("/group",express.static("uploads/group"))

app.use(router) // controlador de todas las rutas


async function main(){
  try{
    // autenticacion a la db
    await dbConnection.authenticate();
    // iniciar el servidor
    app.listen(PORT, ()=>{
      // sicronizar db
      dbConnection.sync({force:true}).then(()=>{
        createInstances()
        console.log("servidor montado en "+ PORT)
        console.log("base de datos conectado")
      }).catch(err=>{
        console.log("error en la conexion a la db")
      })

    })
  }catch (err){
    console.log("error")
  }

}

main()



