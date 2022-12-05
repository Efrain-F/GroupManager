import "../styles/edit.css"
import { useNavigate} from "react-router-dom";

import apiController from "../api";
import {useState,useEffect} from "react"

function CreateUser() {
  const navigate = useNavigate()

  const {rolesApiController,userApiController,groupApiController} = apiController

  const [listGroup, setListGroup] = useState([])
  const [listRoles, setListRoles] = useState([])

  useEffect(()=>{
    try{
      groupApiController.obtainAll().then(groups=>{
        setListGroup(groups)
      })
      rolesApiController.obtainAll().then(roles=>{
        setListRoles(roles)
      })
    }catch{err=>{
    }}
  },[])
  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target

    let name = formValue.name.value
    let email = formValue.email.value
    let RoleId = formValue.role.value!="none"?parseInt(formValue.role.value):undefined
    let GroupId = formValue.group.value!="libre"?parseInt(formValue.group.value):undefined
    let phoneNumber = formValue.phoneNumber.value
    let location = formValue.location.value
    let status = formValue.status.value
    let info = formValue.info.value

    let body= {
      name,email,RoleId,GroupId,phoneNumber,location,info,status
    }
    if(Object.entries(body).length){
      userApiController.createUser(body).then(()=>{
       navigate("/users")
      })
    }else(
      navigate("/users")
    )

  }

  return (
    <section className="editUser">
      <h3 className="editUser-title">Create User</h3>

      <form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" required type="text"   />
        </div>
        <div className="editUser-input">
          <label>Email</label>
          <input name="email" required type="text"  />
        </div>
        <div className="editUser-input">
          <label>Location</label>
          <input name="location" required type="text"  />
        </div>
        <div className="editUser-input">
          <label>phone Number</label>
          <input name="phoneNumber" required type="text"  />
        </div>
        <div className="editUser-input">
          <label>Roles</label>
          <select name="role" id="">
            <option value={"none"}>None</option>
            {listRoles.map((role,id)=><option  key={id} value={role.id}>{role.name}</option>)}
          </select>
        </div>
        <div className="editUser-input">
          <label>Group</label>
          <select name="group" id="">
            <option  value="libre">Libre</option>
            {listGroup.map((group,id)=><option key={id} value={group.id}>{group.name}</option>)}
          </select>
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

export default CreateUser;