import { Router } from "express";
import { userController } from "../controllers/userController";
import multer from "multer";


const userRouter = Router();

const storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads/user")
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+"-"+Date.now()+"."+file.mimetype.split("/")[1])
  }
}) 

const upload = multer({storage:storage})
const uploadFile = upload.single("perfilImg")

userRouter.get("/usersAll",userController.usersAll)
userRouter.get("/userId/:id",userController.userId)
userRouter.get("/freeUsers",userController.freeUser)
userRouter.post("/filterUser",userController.filterUser)
userRouter.post("/createUser",userController.createUser)
userRouter.post("/modifyUser",uploadFile,userController.modifyUser)
userRouter.delete("/deleteUser",userController.deleteUser)
userRouter.delete("/deleteListUsers",userController.deleteListUsers)


export {userRouter}
