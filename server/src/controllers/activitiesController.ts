// model
import ActivitiesModel from "../db/models/ActivitiesModel"
import UsersModel from "../db/models/UserModel"
import RolesModel from "../db/models/RolesModel"
import GroupsModel from "../db/models/GroupsModel"
const { Op } = require("sequelize");

// types
import { Request,Response } from "express"

const ErrorActivityApi = {
  error : true,
  message : "Lo sentimos su peticion en el apartado del usuario no pudo ser realizada correctamente"
}



interface createActivityInterface{
  name:String,
  describ:String,
  status:String,
}
interface filterActivityInterface{
  name:String,
  status:String
}

export const activitiesController = {
  activitiesAll : (req:Request,res:Response)=>{
    ActivitiesModel.findAll({
      attributes:["name","describ"],
      include:[{
        model:UsersModel,
        attributes:["name"],
        include:[{
          model:RolesModel,
          attributes:["name"]
        }]
      },{
        model:GroupsModel,
        attributes:["name","area"]
      }]
    }).then(users => res.json(users))
  },
  activitieId : async (req:Request,res:Response)=>{
    const paramsUrl = req.params
    const actividad = await ActivitiesModel.findByPk(paramsUrl.id)
    if(actividad!=null) {res.json(actividad)}else{
      res.status(202).json(ErrorActivityApi)
    }
  },
  activitieUser : async (req:Request,res:Response)=>{
    const paramsUrl = req.params
    const role = await ActivitiesModel.findAll({
      where:{
        UserId:paramsUrl.id
      },
      include:[{
        model:GroupsModel,
        attributes:["name","area"]
      }]
    })
    if(role!=null) {res.json(role)}else{
      res.status(202).json(ErrorActivityApi)
    }
  },
  createActivities: async (req:Request,res:Response)=>{
    const activityBody:createActivityInterface = req.body
    const newActivity = await ActivitiesModel.create({...activityBody})
    res.json(newActivity)
  },
  modifyActivities: async (req:Request,res:Response)=>{
    const body = req.body

    const activityId = body.idActivity
    const newActivityBody = body.newActivityBody

    const activityModify = await ActivitiesModel.update(newActivityBody,{
      where:{
        id:activityId
      }
    })
    res.json(activityModify)
  },
  filterActivities: async (req:Request,res:Response)=>{
    const body = req.body
    const filters:filterActivityInterface = body.filter

    const filteredActivitys =  await ActivitiesModel.findAll({
      where:{
        name:{[Op.substring]:`${filters.name}`},
        ...(filters.status?{GroupId:filters.status}:{})
      }
    })
    res.json(filteredActivitys)
  },
  deleteActivitie: async (req:Request,res:Response)=>{
    const body = req.body
    const activityId = body.idActivity
    await ActivitiesModel.destroy({
      where:{id:activityId}
    })
    const activityDelete = {
      message:"Usuario eliminado"
    }
    res.json(activityDelete)
  }
}







