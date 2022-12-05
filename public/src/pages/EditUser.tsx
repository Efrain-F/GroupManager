import "../styles/edit.css"
import { AiFillCamera} from 'react-icons/ai';

import { useParams,useNavigate} from "react-router-dom";

import apiController from "../api";

import {useState,useEffect,useRef} from "react"

interface userBody{
  name?:string
  email?:string
  perfilImg?:string

  role?:any
  group?:any
  status?:String
  info?:string
  location?:string
  phoneNumber?:string

}

function EditUser() {
  const navigate = useNavigate()

  const {userApiController,groupApiController,rolesApiController} = apiController
  let params = useParams();
  const id = params.idUser
  const photoEdit = useRef(null)
  const [userBody,setUserBody] = useState<userBody>({})

  
  const [listGroup, setListGroup] = useState([])
  const [listRoles, setListRoles] = useState([])

  const [selectedFile,setSelectedFile] = useState(null)

  useEffect(()=>{
    try{
      userApiController.obtainForId(id).then(user=>{
        let role = user.Role
        let group = user.Group?user.Group:{name:"Libre"}
        setUserBody({...user,role,group})
      })
      groupApiController.obtainAll().then(groups=>{
        setListGroup(groups)
      })
      rolesApiController.obtainAll().then(roles=>{
        setListRoles(roles)
      })
    }catch{err=>{
    }}
  },[])
  const ChangeImage= (e)=>{
    const file = e.target.files[0]
    setSelectedFile(file)
    const fileRead = new FileReader()
    if(file.type == "image/png" || file.type == "image/jpeg"){
        fileRead.readAsDataURL(file)
        fileRead.addEventListener("load",(a)=>{
            photoEdit.current.setAttribute("src",a.target.result)
        })
    }
  }
  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target

    let name = formValue.name.value
    let email = formValue.email.value
    let RoleId = formValue.role.value!="none"?parseInt(formValue.role.value):undefined
    let GroupId =formValue.group.value!="Libre"?undefined:parseInt(formValue.group.value)
    let phoneNumber = formValue.phoneNumber.value
    let location = formValue.location.value
    let info = formValue.info.value
    let status = formValue.status.value
    let body= {
      ...(name!=userBody.name?{name}:undefined), 
      ...(email!=userBody.email?{email}:undefined), 
      RoleId,
      ...(status!=userBody.role.status?{status}:undefined), 
      GroupId, 
      ...(phoneNumber!=userBody.phoneNumber?{phoneNumber}:undefined), 
      ...(location!=userBody.location?{location}:undefined), 
      ...(info!=userBody.info?{info}:undefined)
    }
    if(Object.entries(body).length || selectedFile){
      userApiController.editUser(id,body,selectedFile).then((info)=>{
        navigate("/users")
      })
    }else(
      navigate("/users")
    )

  }

  return (
    <section className="editUser">
      <h3 className="editUser-title">Edit User</h3>
      <form onSubmit={onSubmit} className="editUser-contain" action="http://localhost:3001/modifyUser" encType="multipart/form-data" method="post">
        <div className="editUser-inputImg">
          <div className="editUser-inputImg-img">
            <img ref={photoEdit} src={`http://localhost:3001/user/${userBody.perfilImg}`} />
            <AiFillCamera className="editUser-inputImg-img-icon"/>
            <input className="editUser-inputImg-img-input" type="file" name="perfilImg" onChange={ChangeImage}></input>
          </div>
          <h5>Change Perfil</h5>
        </div>
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" type="text" defaultValue={userBody.name}  />
        </div>
        <div className="editUser-input">
          <label>Email</label>
          <input name="email" type="text" defaultValue={userBody.email} />
        </div>
        <div className="editUser-input">
          <label>Phone Number</label>
          <input name="phoneNumber" type="text" defaultValue={userBody.phoneNumber} />
        </div>
        <div className="editUser-input">
          <label>Location</label>
          <input name="location" type="text" defaultValue={userBody.location} />
        </div>
        <div className="editUser-input">
          <label>Roles</label>
          <select name="role" id="">
            <option value={"none"}>None</option>
            {listRoles.map((role,id)=><option selected={role.id==userBody.role.id} key={id} value={role.id}>{role.name}</option>)}
          </select>
        </div>
        <div className="editUser-input">
          <label>Group</label>
          <select name="group" id="">
            <option  value="libre">Libre</option>
            {listGroup.map((group,id)=><option selected={group.name==userBody.group.name} key={id} value={group.id}>{group.name}</option>)}
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
          <textarea name="info" autoComplete="on" defaultValue={userBody.info}/>
        </div>
        <button className="editUser-submit" type="submit">Change</button>
      </form>
    </section>
  );
}

export default EditUser;