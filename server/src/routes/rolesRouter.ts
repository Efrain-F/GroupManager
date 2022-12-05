import { Router } from "express";
import { roleController } from "../controllers/rolesController";

const rolesRouter = Router();

rolesRouter.get("/rolesAll",roleController.rolesAll)
rolesRouter.get("/roleId/:id",roleController.roleId)
rolesRouter.post("/filterRole",roleController.filterRoles)
rolesRouter.post("/createRole",roleController.createRole)
rolesRouter.post("/modifyRole",roleController.modifyRole)
rolesRouter.delete("/deleteRole",roleController.deleteRole)


export {rolesRouter}