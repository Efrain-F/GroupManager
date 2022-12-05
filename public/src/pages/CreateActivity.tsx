import "../styles/edit.css"
import { AiFillCamera} from 'react-icons/ai';
import { useParams,useNavigate} from "react-router-dom";


import apiController from "../api";
import {useState,useEffect,useRef} from "react"

function CreateActivity({reset,menbers,id}) {
  const navigate = useNavigate()

  const {activitiesApiController} = apiController

  const onSubmit=(e)=>{
    e.preventDefault()
    const formValue = e.target

    let name = formValue.name.value
    let describ = formValue.describ.value
    let status = formValue.status.value
    let UserId = formValue.menber.value

    let body= {
      name,describ,status,UserId,GroupId:id
    }
    if(Object.entries(body).length){
      activitiesApiController.create(body).then(()=>{
      reset()
      navigate("../activity")
      })
    }else(
      navigate("../activity")
    )

  }

  return (
    <section className="editUser">
      <h3 className="editUser-title">Create Activity</h3>

      <form onSubmit={onSubmit} className="editUser-contain" encType="multipart/form-data" method="post">
        <div className="editUser-input">
          <label>Name</label>
          <input name="name" required type="text"   />
        </div>
        <div className="editUser-input">
          <label>Description</label>
          <textarea name="describ"required autoComplete="on" />
        </div>
        <div className="editUser-input">
          <label>Status</label>
          <select name="status" id="">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="editUser-input">
          <label>Menber</label>
          <select name="menber" id="">
            {menbers.map((menber,id)=><option key={id} value={menber.id}>{menber.name}</option>)}
          </select>
        </div>
        <button className="editUser-submit" type="submit">Create</button>
      </form>
    </section>
  );
}

export default CreateActivity;