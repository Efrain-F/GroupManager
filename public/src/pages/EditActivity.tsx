import "../styles/edit.css"
import { useParams,useNavigate} from "react-router-dom";

import apiController from "../api";
import {useState,useEffect} from "react"

function EditActivity({menbers,obtain}) {
  const navigate = useNavigate()
  let params = useParams();
  const id = params.id
  const {activitiesApiController} = apiController

  const [activity,setActivity] = useState<any>({})

  function obtainActivities(){
    activitiesApiController.obtainForId(id).then(act=>{
      setActivity(act)
    }).catch(()=>{})
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target

    let name = formValue.name.value
    let describ = formValue.describ.value
    let status = formValue.status.value
    let UserId = formValue.menber.value

    let body= {
      idActivity:id,
      newActivityBody:{
        name,describ,status,UserId
      }
    }
    if(Object.entries(body).length){
      activitiesApiController.edit(body).then(()=>{
        obtain()
        navigate("../activity")
      })
    }else(
      navigate("../activity")
    )

  }
  useEffect(()=>{
    obtainActivities()
  },[])


  return (
    <section className="editUser">
      <h3 className="editUser-title">Edit Activity</h3>

      <form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" required type="text" defaultValue={activity.name}/>
        </div>
        <div className="editUser-input">
          <label>Description</label>
          <textarea name="describ"required autoComplete="on" defaultValue={activity.describ}/>

        </div>
        <div className="editUser-input">
          <label>Status</label>
          <select name="status" id="">
            <option selected={activity.status=="Active"} value="Active">Active</option>
            <option selected={activity.status=="Inactive"} value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="editUser-input">
          <label>Menber</label>
          <select name="menber" id="">
            {menbers.map((menber,id)=><option selected={activity.UserId==menber.id} key={id} value={menber.id}>{menber.name}</option>)}
          </select>
        </div>
        <button className="editUser-submit" type="submit">Change</button>
      </form>
    </section>
  );
}

export default EditActivity;