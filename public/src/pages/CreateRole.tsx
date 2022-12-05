import "../styles/edit.css"
import { useNavigate} from "react-router-dom";


import apiController from "../api";


function CreateRole() {
  const navigate = useNavigate()

  const {rolesApiController} = apiController

  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target

    let name = formValue.name.value
    let describ = formValue.describ.value
    let color = formValue.color.value

    let body= {
      name,describ,color
    }
    if(Object.entries(body).length){
      rolesApiController.createRole(body).then(()=>{
       navigate("/roles")
      })
    }else(
      navigate("/roles")
    )

  }

  return (
    <section className="editUser">
      <h3 className="editUser-title">Create Role</h3>

      <form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" required type="text"   />
        </div>
        <div className="editUser-input">
          <label>Description</label>
          <input name="describ" required type="text"   />
        </div>
        <div  className="editUser-input">
          <label>Color</label>
          <input name="color" className="input-color" type="color" />
        </div>
        <button className="editUser-submit" type="submit">Create</button>
      </form>
    </section>
  );
}

export default CreateRole;