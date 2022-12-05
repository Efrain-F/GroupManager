// model
import ActivitiesModel from "../db/models/ActivitiesModel"
import UsersModel from "../db/models/UserModel"
import RolesModel from "../db/models/RolesModel"
import GroupsModel from "../db/models/GroupsModel"
const { Op } = require("sequelize");
// types
import { Request,Response } from "express"

// por defecto en cada funcion del controllador retornara un error en caso de que no se pueda realizar el proceso
const ErrorRoleApi = {
  error : true,
  message : "Lo sentimos su peticion en el apartado del usuario no pudo ser realizada correctamente"

}
interface createRoleInterface{
  name:String,
  describ:String,
  statusRol:String,
  color:String,
}
interface filterRoleInterface{
  name:String,
  statusRol:String
}

export const roleController = {
  rolesAll : (req:Request,res:Response)=>{
    RolesModel.findAll().then(role => res.json(role))
  }, 
  roleId : async (req:Request,res:Response)=>{
    const paramsUrl = req.params
    const role = await RolesModel.findByPk(paramsUrl.id)
    if(role!=null) {res.json(role)}else{
      res.status(202).json(ErrorRoleApi)
    }
  },
  createRole: async (req:Request,res:Response)=>{
    const roleBody:createRoleInterface = req.body
    console.log(roleBody)
    const newRole = await RolesModel.create({...roleBody})
    res.json(newRole)
  },
  modifyRole: async(req:Request,res:Response)=>{
    const body = req.body
    const roleId = body.idRole
    const newRoleBody = body.newRoleBody

    const RoleModify = await RolesModel.update(newRoleBody,{
      where:{
        id:roleId
      }
    })
    res.json(RoleModify)
  },
  filterRoles: async (req:Request,res:Response)=>{
    const body = req.body
    const filters:filterRoleInterface = body.filter
    const filteredRoles =  await RolesModel.findAll({
      where:{
        name:{[Op.substring]:`${filters.name}`},
        ...(filters.statusRol?{statusRol:filters.statusRol}:{})
      }
    })
    res.json(filteredRoles)
  },
  deleteRole: async (req:Request,res:Response)=>{
    const body = req.body
    const roleId = body.idRole
    await RolesModel.destroy({
      where:{id:roleId}
    })
    const roleDelete = {
      message:"Group eliminado"
    }
    res.json(roleDelete)

  }
}

