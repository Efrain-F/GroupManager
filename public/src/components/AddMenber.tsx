import apiController from "../api";
import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";

function AddMenber({id,reset}) {
  const navigate = useNavigate()

  const {userApiController} = apiController
  const [freeUsers,setFreeUsers]=useState([])

  function obtainFreeMenbers(){
    userApiController.obtainFreeUser().then(users=>{
      setFreeUsers(users)
    })
  }

  function onSubmit(e){
    e.preventDefault()
    let addUser = e.target.menber.value
    let edit = {GroupId:id}
    userApiController.editUser(addUser,edit,false).then(()=>{
      reset()
      navigate("../menbers")
    })

  }

  useEffect(()=>{
    obtainFreeMenbers()
  },[])

  return (
    <>
    <h3 className="editUser-title">Add Menber</h3>

<form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
  
  <div className="editUser-input">
    <label>Users</label>
    {freeUsers.length==0&&<h5>No hay usuario libres</h5>}
    <select name="menber" id="">
      {freeUsers.map(user=><option value={user.id}>{user.name}</option>)}
    </select>
  </div>
  <button className="editUser-submit" type="submit">Add</button>
</form>
    </>
  );
}

export default AddMenber;