

import RolesModel from "./models/RolesModel";
import ActivitiesModel from "./models/ActivitiesModel";
import UsersModel from "./models/UserModel";
import GroupsModel from "./models/GroupsModel";




async function createInstances() {
  const programmer = await RolesModel.create({
  
    name:"Programmer",
    describ:"Programdor encargado del desarrollo de la aplicacion",
    color:"#302b60",
  
  })
  const admin = await RolesModel.create({
  
    name:"Admin",
    describ:"Administrador del proyecto o de un grupo",
    color:"#212121",
  
  })
  const ChannelRG = await GroupsModel.create({
  
    name:"GoldLondress",
    logoImg:"logo.png",
    backgroundImg:"fondo.jpg",
    status:"Active",
    area:"Software",
    info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo dolore officia nulla delectus ipsum, praesentium, nisi, aliquam sint natus explicabo repellendus autem ea accusantium accusamus laborum. Corporis autem minus ullam?aliquam sint natus explicabo repellendus autem ea accusantium accusamus laborum. Corporis autem minus ullam?aliquam sint natus explicabo repellendus autem ea accusantium accusamus laborum. Corporis autem minus ullam?"
  })
  // users
  const jane = await UsersModel.create({
  
    name:"Jane Sanchez",
    email:"jane.sanchez@gmail.com",
    phoneNumber:"400020304",
    location:"Inglaterra Londres",
    backgroundImg:"fondo.jpg",
    perfilImg:"face.jpg",
    status:"Active",
    info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo dolore officia nulla delectus ipsum, praesentium, nisi, aliquam sint natus explicabo repellendus autem ea accusantium accusamus laborum. Corporis autem minus ullam?",
    RoleId:1,
    GroupId:1,
  
  })
  const jhon = await UsersModel.create({
  
    name:"Jhon Smith",
    email:"jhon.smith@gmail.com",
    phoneNumber:"434120804",
    location:"Inglaterra Londres",
    backgroundImg:"fondo.jpg",
    perfilImg:"face2.jpg",
    status:"Active",
    info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo dolore officia nulla delectus ipsum, praesentium, nisi, aliquam sint natus explicabo repellendus autem ea accusantium accusamus laborum. Corporis autem minus ullam?",
    RoleId:2,
    GroupId:1,
  
  })


}

export default createInstances