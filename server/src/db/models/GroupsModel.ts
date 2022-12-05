import { Model, DataType, DataTypes} from "sequelize";


import dbConnection from "../connections";




// lider:DataTypes.STRING,
// menber:DataTypes.STRING
class GroupsModel extends Model {}


GroupsModel.init({
  name:DataTypes.STRING,
  logoImg:DataTypes.STRING,
  backgroundImg:DataTypes.STRING,
  area:DataTypes.STRING,
  status:DataTypes.STRING,
  info:DataTypes.TEXT,
  },
  {sequelize:dbConnection,
  modelName:"Groups",
  timestamps:false
  }
)





export default GroupsModel


