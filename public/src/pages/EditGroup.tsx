import "../styles/edit.css"
import { AiFillCamera} from 'react-icons/ai';

import { useParams,useNavigate} from "react-router-dom";


import apiController from "../api";

import {useState,useEffect,useRef} from "react"




function EditGroup() {
  const navigate = useNavigate()

  const {groupApiController} = apiController

  let params = useParams();
  const id = params.idGroup

  const photoEdit = useRef(null)
  const [groupBody,setGroupBody] = useState<any>({})

  const [selectedFile,setSelectedFile] = useState(null)

  useEffect(()=>{
    try{
      groupApiController.obtainForId(id).then(group=>{
        setGroupBody(group)
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
    let area = formValue.area.value
    let status = formValue.status.value
    let info = formValue.info.value

    let body= {
      ...(name!=groupBody.name?{name}:undefined), 
      ...(area!=groupBody.area?{area}:undefined), 
      ...(status!=groupBody.status?{status}:undefined), 
      ...(info!=groupBody.info?{info}:undefined), 
    }
    console.log(body)
    if(Object.entries(body).length || selectedFile){
      groupApiController.editGroup(id,body,selectedFile).then((info)=>{
        navigate("/groups")
      })
    }else(
      navigate("/groups")
    )
  }

  return (
    <section className="editUser">
      
      <form onSubmit={onSubmit} className="editUser-contain" action="http://localhost:3001/modifyUser" encType="multipart/form-data" method="post">
        <div className="editUser-inputImg">
          <div className="editUser-inputImg-img">
            <img ref={photoEdit} src={`http://localhost:3001/group/${groupBody.logoImg}`} />
            <AiFillCamera className="editUser-inputImg-img-icon"/>
            <input className="editUser-inputImg-img-input" type="file" name="perfilImg" onChange={ChangeImage}></input>
          </div>
          <h5>Change Perfil</h5>
        </div>
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" type="text" defaultValue={groupBody.name}  />
        </div>
        <div className="editUser-input">
          <label>Area</label>
          <input name="area" type="text" defaultValue={groupBody.area} />
        </div>
        <div className="editUser-input">
          <label>Status</label>
          <select name="status" id="">
            <option selected={"Active"==groupBody.status} value={"Active"}>Active</option>
            <option value={"Inactive"}>Inactive</option>
          </select>
        </div>
        <div  className="editUser-input">
          <label>Info</label>
          <textarea name="info" autoComplete="on" defaultValue={groupBody.info}/>
        </div>
        <button className="editUser-submit" type="submit">Change</button>
      </form>
    </section>
  );
}

export default EditGroup;