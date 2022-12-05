import { Model, DataType, DataTypes} from "sequelize";


import dbConnection from "../connections";




class RolesModel extends Model {}

RolesModel.init({
  name:DataTypes.STRING,
  describ:DataTypes.STRING,
  color:DataTypes.STRING,
  },
  {sequelize:dbConnection,
  modelName:"Roles",
  timestamps:false
  }
)

export default RolesModel
