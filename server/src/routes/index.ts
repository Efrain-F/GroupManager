import { Router } from "express";

import { userRouter } from "./userRouter";
import { rolesRouter } from "./rolesRouter";
import { activitiesRouter } from "./activitiesRouter";
import { groupRouter } from "./groupRouter";


const router = Router();


router.use(userRouter)
router.use(rolesRouter)
router.use(activitiesRouter)
router.use(groupRouter)



export {router}
