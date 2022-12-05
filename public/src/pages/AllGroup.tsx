import "../styles/pages.css"
import "../styles/group.css"
import { FiSearch } from 'react-icons/fi';

import { IoMdAdd} from 'react-icons/io';
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

import { useEffect, useState } from "react";

import GroupItemTable from "../components/GroupItemTable";
import apiController from "../api";

function AllGroup() {
  const {groupApiController} = apiController
  const [groupsAll,setGroupsAll] = useState([])
  const [showAlert,setShowAlert] = useState(false)
  const [idGroupFocus,setIdGroupFocus] = useState(null)
  const [nameFilter,setNameFilter] = useState("")


  const textDeleteGroupAlert = "Estas seguro de eliminar el grupo."


  function obtainGroupAll(){
    groupApiController.obtainAll()
    .then(groups=>{
      setGroupsAll(groups)}).catch(err=>{})
  }

  useEffect(()=>{
    obtainGroupAll()
  },[])

  
  
  function eventDelete(id){
    setShowAlert(true)
    setIdGroupFocus(id)
  }

  function hiddenAlert(){
    setShowAlert(false)
  }
  function deleteGroup (){
    groupApiController.deleteForId(idGroupFocus).then(()=>{
      obtainGroupAll()
    })
    hiddenAlert()
  }

  function filterByName(evt){
    const value = evt.target.value
    setNameFilter(value)
  }

  return (
    <section className="page allUsers">
      {showAlert?<Alert text={textDeleteGroupAlert} acceptCollback={deleteGroup} cancelCollback={hiddenAlert}></Alert>:undefined}
      <div className="page-head">
        <div className="page-head-title">
          <h2>All Group</h2>
          <span>{groupsAll.length}</span>
        </div>
        <div className="page-head-option">
          <div className="page-head-option-filter-input">
            <FiSearch/>
            <input onChange={filterByName} placeholder="Search by name..."></input>
          </div>
          <Link to={"/createGroup"} className="option-allGroup allGroup-head-option-newGroup"><IoMdAdd/> Add New Group</Link>
        </div>
      </div>
      <section className="groups">
        {groupsAll.map((group,id)=>{
          if(group.name.includes(nameFilter)){
            return (<GroupItemTable eventDeleteGroup={eventDelete} key={id} group={group}/>)}
          })}
        
      </section>
      
    </section>
  );
}

export default AllGroup;