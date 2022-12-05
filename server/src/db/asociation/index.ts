
import UsersModel from "../models/UserModel";
import RolesModel from "../models/RolesModel";
import GroupsModel from "../models/GroupsModel";
import ActivitiesModel from "../models/ActivitiesModel"



// REALCION DEL EMPLEADO (USUARIO)

// usuario tiene que llevar un rol,
// por lo que el usuario llevarar el rolId
RolesModel.hasMany(UsersModel);
UsersModel.belongsTo(RolesModel)
// Un grupo puede tener varios usuario (empleado) y un empleado puede tener un grupo
GroupsModel.hasMany(UsersModel)
UsersModel.belongsTo(GroupsModel)



// REALCIONES DEL LAS ACTIVIDADES

UsersModel.hasMany(ActivitiesModel,{onDelete:"CASCADE"}) // un empleado tiene varias actividades
ActivitiesModel.belongsTo(UsersModel) // una actividad solo tiene un empleado

// actividad tiene un grupo, y este tiene varias actividades
GroupsModel.hasMany(ActivitiesModel,{onDelete:"CASCADE"})
ActivitiesModel.belongsTo(GroupsModel)




