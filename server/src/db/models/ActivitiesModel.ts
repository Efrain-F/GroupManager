import { Model, DataType, DataTypes} from "sequelize";

import dbConnection from "../connections";


class ActivitiesModel extends Model {}

ActivitiesModel.init({
  name:DataTypes.STRING,
  describ:DataTypes.STRING,
  status:DataTypes.STRING,

  // rol realcion
  },
  {sequelize:dbConnection,
  modelName:"Activities",
  timestamps:false
  }
)

export default ActivitiesModel





