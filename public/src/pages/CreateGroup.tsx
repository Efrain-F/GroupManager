import "../styles/edit.css"
import { useNavigate} from "react-router-dom";

import apiController from "../api"
function CreateGroup() {
  const navigate = useNavigate()
  const {groupApiController} = apiController

  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target
    let name = formValue.name.value
    let area = formValue.area.value
    let status = formValue.status.value
    let info = formValue.info.value

    let body= {
      name,info,status,area
    }
    if(Object.entries(body).length){
      groupApiController.createGroup(body).then(()=>{
       navigate("/groups")
      })
    }else(
      navigate("/groups")
    )

  }

  return (
    <section className="editUser">
      <h3 className="editUser-title">Create Group</h3>

      <form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" required type="text"   />
        </div>
        <div className="editUser-input">
          <label>area</label>
          <input name="area" required type="text"   />
        </div>
        <div className="editUser-input">
          <label>Status</label>
          <select name="status" id="">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div  className="editUser-input">
          <label>Info</label>
          <textarea required name="info" autoComplete="on"/>
        </div>
        <button className="editUser-submit" type="submit">Create</button>
      </form>
    </section>
  );
}

export default CreateGroup;