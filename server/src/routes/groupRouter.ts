import { Router } from "express";
import { groupController } from "../controllers/groupController";
import multer from "multer";


const groupRouter = Router();





const storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads/group")
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+"-"+Date.now()+"."+file.mimetype.split("/")[1])
  }
}) 

const upload = multer({storage:storage})
const uploadFile = upload.single("perfilImg")

groupRouter.get("/groupsAll",groupController.groupsAll)
groupRouter.get("/groupId/:id",groupController.groupId)
groupRouter.post("/filterGroup",groupController.filterGroups)
groupRouter.post("/createGroup",groupController.createGroup)
groupRouter.post("/modifyGroup",uploadFile,groupController.modifyGroup)
groupRouter.delete("/deleteGroup",groupController.deleteGroup)


export {groupRouter}