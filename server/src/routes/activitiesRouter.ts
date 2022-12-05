import { Router } from "express";

import { activitiesController } from "../controllers/activitiesController";

const activitiesRouter = Router();

// obtener
activitiesRouter.get("/activitiesAll",activitiesController.activitiesAll)
activitiesRouter.get("/activitie/:id",activitiesController.activitieId)
activitiesRouter.get("/activitieUser/:id",activitiesController.activitieUser)
activitiesRouter.get("/filterActivitie",activitiesController.activitieId)

// crear
activitiesRouter.post("/createActivities",activitiesController.createActivities)

// modificar
activitiesRouter.put("/modifyActivitie",activitiesController.modifyActivities)

// eliminar
activitiesRouter.delete("/deleteActivities",activitiesController.deleteActivitie)

export {activitiesRouter}