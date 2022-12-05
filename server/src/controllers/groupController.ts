// model
import ActivitiesModel from "../db/models/ActivitiesModel"
import UsersModel from "../db/models/UserModel"
import GroupsModel from "../db/models/GroupsModel"
const { Op } = require("sequelize");
// types
import { Request,Response } from "express"


interface groupInterface{
  status:String
}

// por defecto en cada funcion del controllador retornara un error en caso de que no se pueda realizar el proceso
const ErrorGroupApi = {
  error : true,
  message : "Lo sentimos su peticion en el apartado del usuario no pudo ser realizada correctamente"

}
interface createGroupInterface{
  name:String,
  describ:String,
  logoImg:String,
  backgroundImg:String,
  area:String,
  status:String,
}
interface filterGroupInterface{
  name:String,
  area:String,
  status:String,
}

export const groupController = {
  groupsAll : async (req:Request,res:Response)=>{
    const groups = await GroupsModel.findAll({
      include:[{
        model:UsersModel,
      },{
        model:ActivitiesModel,
      }]
    })

    groups.map(group=>{
      group.setDataValue("numUsers",group.getDataValue("Users").length)
      group.setDataValue("numActivities",group.getDataValue("Activities").length)
    })

    res.json(groups)

  }, 
  groupId : async (req:Request,res:Response)=>{
    const paramsForUrl = req.params
    const group = await GroupsModel.findByPk(paramsForUrl.id,{
      include:[UsersModel,{
        model:ActivitiesModel,
        include:[UsersModel]
      }]
    })
    if(group!=null) {res.json(group)}else{
      res.status(202).json(ErrorGroupApi)
    }
  },
  createGroup: async (req:Request,res:Response)=>{
    const groupBody:createGroupInterface = req.body
    console.log(groupBody)
    const newGroup = await GroupsModel.create({...groupBody,
    logoImg:"fondo.jpg",
    backgroundImg:"fondo.jpg"})
    res.json(newGroup)
  },
  modifyGroup: async(req:Request,res:Response)=>{
    const body = req.body
    const groupId = body.idGroup

    const newGroupBody = JSON.parse(body.newGroupBody)

    // nueva imagen
    const imgFile = req.file
    if(imgFile){
      const fileName = imgFile.filename
      newGroupBody.logoImg = fileName
    }



    const groupModify = await GroupsModel.update(newGroupBody,{
      where:{
        id:groupId
      }
    })
    res.json(groupModify)
  },
  filterGroups: async (req:Request,res:Response)=>{
    const body = req.body
    console.log("filters")
    const filters:filterGroupInterface = body.filter
    const filteredGroups =  await GroupsModel.findAll({
      where:{
        name:{[Op.substring]:`${filters.name}`},
        ...(filters.area?{area:filters.area}:{}),
        ...(filters.status?{status:filters.status}:{}),
      }
    })
    res.json(filteredGroups)
  },
  deleteGroup: async (req:Request,res:Response)=>{
    const body = req.body
    const groupId = body.idGroup
    await GroupsModel.destroy({
      where:{id:groupId}
    })
    const userDelete = {
      message:"Group eliminado"
    }
    res.json(userDelete)

  }
}



