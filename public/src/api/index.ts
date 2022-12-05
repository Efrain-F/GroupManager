import { UsuarioApi } from "./UsuarioApi";
import { RolesApi } from "./RolesApi";
import { GroupApi } from "./GroupApi";
import { ActivitiesApi } from "./ActivitiesApi";

const apiController = {
  userApiController:new UsuarioApi,
  rolesApiController:new RolesApi,
  groupApiController:new GroupApi,
  activitiesApiController:new ActivitiesApi,
}


export default apiController;
