import { Model, DataType, DataTypes} from "sequelize";

import dbConnection from "../connections";


class UsersModel extends Model {}

UsersModel.init({
  name:DataTypes.STRING,
  email:DataTypes.STRING,
  phoneNumber:DataTypes.STRING,
  location:DataTypes.STRING,
  backgroundImg:DataTypes.STRING,
  perfilImg:DataTypes.STRING,
  status:DataTypes.STRING,
  info:DataTypes.TEXT
  // rol realcion
  },
  {sequelize:dbConnection,
  modelName:"Users",
  timestamps:false
  }
)


export default UsersModel





