import "../styles/edit.css"
import { useParams,useNavigate} from "react-router-dom";


import apiController from "../api";

import {useState,useEffect} from "react"

function EditRole() {
  const navigate = useNavigate()

  const {rolesApiController}=apiController

  const [roleBody,setRoleBody] = useState<any>({})
  const [color,setColor] = useState<any>(false)

  let params = useParams();
  const id = params.idRole


  function changeColor(e){
    setColor(e.target.value)
  }

  useEffect(()=>{
    try{
      rolesApiController.roleId(id).then(role=>{
        setColor(role.color)
        setRoleBody(role)
      })
    }catch{err=>{
      console.log(err)
    }}
  },[])
  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target

    let name = formValue.name.value
    let describ = formValue.describ.value
    
    let body= {
      ...(name!=roleBody.name?{name}:undefined), 
      ...(describ!=roleBody.describ?{describ}:undefined), 
      ...(color?{color}:undefined)
    }
    if(Object.entries(body).length ){
      rolesApiController.editRole(id,body).then((info)=>{
        navigate("/roles")
      })
    }else(
      navigate("/roles")
    )
  }
  return (
    <section className="editUser">
      <h3 className="editUser-title">Edit Role</h3>

      <form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" required type="text" defaultValue={roleBody.name} />
        </div>
        <div className="editUser-input">
          <label>Description</label>
          <input name="describ" required type="text"  defaultValue={roleBody.describ} />
        </div>
        <div  className="editUser-input">
          <label>Color</label>
          <input name="color" onChange={changeColor} value={color} className="input-color" type="color" />
          
        </div>
        <button className="editUser-submit" type="submit">Change</button>
      </form>
    </section>
  );
}

export default EditRole;