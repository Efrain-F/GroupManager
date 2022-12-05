import express from "express";


// model
import ActivitiesModel from "../db/models/ActivitiesModel"
import UsersModel from "../db/models/UserModel"
import RolesModel from "../db/models/RolesModel"
import GroupsModel from "../db/models/GroupsModel"
const { Op } = require("sequelize");
// types
import { Request,Response } from "express"

// por defecto en cada funcion del controllador retornara un error en caso de que no se pueda realizar el proceso
const ErrorUser = {
  error : true,
  message : "Lo sentimos su peticion en el apartado del usuario no pudo ser realizada correctamente"

}
interface createUserInterface{
    name:String,
    email:String,
    phoneNumber:String,
    location:String,
    backgroundImg:String,
    perfilImg:String,
    status:String,
    RoleId:Number,
    GroupId:Number,
}
interface filterUserInterface{
  name:String,
  email:String,
  status:String,
  RoleId:Number,
  GroupId:Number,
}

export const userController = {
  usersAll : (req:Request,res:Response)=>{
    UsersModel.findAll({
      attributes:["id","name","email","status","perfilImg"],
      include:[{
        model:RolesModel,
        attributes:["name","color"]
      },{
        model:GroupsModel,
        attributes:["name"]
      }]
    }).then(users => res.json(users))
  }, 
  userId : async (req:Request,res:Response)=>{
    const paramsForUrl = req.params
    const user = await UsersModel.findByPk(paramsForUrl.id,{
      include:[{
        model:RolesModel,
        attributes:["id","name"]
      },{
        model:GroupsModel,
        attributes:["id","name"]
      }]
    })
    if(user!=null) {res.json(user)}else{
      res.status(202).json(ErrorUser)
    }
  },
  createUser: async (req:Request,res:Response)=>{
    const userBody:createUserInterface = req.body
    const newUser = await UsersModel.create({...userBody,
    backgroundImg:"fondo.jpg",
    perfilImg:"default.png",})
    res.json(newUser)
  },
  modifyUser: async(req:Request,res:Response)=>{ 
    const body = req.body
    const userId = body.idUser
    let newUserBody = JSON.parse(body.newUserBody)
    
    // nueva imagen
    const imgFile = req.file
    if(imgFile){
      const fileName = imgFile.filename
      newUserBody.perfilImg = fileName
    }

    const userModify = await UsersModel.update(newUserBody,{
      where:{
        id:userId
      }
    })
    res.json(userModify)
  },
  filterUser: async (req:Request,res:Response)=>{
    const body = req.body
    const filters:filterUserInterface = body.filter

    

    const filteredUsers =  await UsersModel.findAll({
      where:{
        name:{[Op.substring]:`${filters.name}`},
        email:{[Op.substring]:`${filters.email}`},
        ...(filters.GroupId?{GroupId:filters.GroupId}:{}),
        ...(filters.RoleId?{RoleId:filters.RoleId}:{}),
      }
    })
    res.json(filteredUsers)
  },
  freeUser: async (req:Request,res:Response)=>{
    const body = req.body

    const filteredUsers =  await UsersModel.findAll({
      where:{
        GroupId:null
      }
    })
    res.json(filteredUsers)
  },
  deleteUser: async (req:Request,res:Response)=>{
    const body = req.body
    const userId = body.idUser
    console.log(userId)
    await UsersModel.destroy({
      where:{id:userId}
    })
    const userDelete = {
      message:"Usuario eliminado"
    }
    res.json(userDelete)

  },
  deleteListUsers: async (req:Request,res:Response)=>{
    const body = req.body
    const Ids = body.ids
    const whereIds = Ids.map((idUser:any)=>{
      return {id:idUser}
    })

    await UsersModel.destroy({
      where:{
        [Op.or]:[...whereIds]
      }
    })
    const userDelete = {
      message:"Usuario eliminado"
    }
    res.json(userDelete)

  }
}



