import "../styles/pages.css"
import "../styles/roles.css"
import "../styles/users.css"
import { FiSearch } from 'react-icons/fi';

import { IoMdAdd} from 'react-icons/io';
import { Link } from "react-router-dom";

import apiController from "../api";
import { useEffect, useState } from "react";

import RoleItemTable from "../components/RoleItemTable";

function AllRoles() {
  const {rolesApiController} = apiController
  const [roles,setRoles] = useState([])
  const [nameFilter,setNameFilter] = useState("")
  
  const obtainRolesAll = ()=>{
    rolesApiController.obtainAll().then(rolesList=>{
      setRoles(rolesList)
    }).catch(err=>{})
  }
  useEffect(()=>{obtainRolesAll()},[])

  function reset(){
    obtainRolesAll()
  }

  function filterByName(evt){
    const value = evt.target.value
    setNameFilter(value)
  }

  return (
    <section className="page allUsers">
      <div className="page-head">
        <div className="page-head-title">
          <h2>All Roles</h2>
          <span>{roles.length}</span>
        </div>
        <div className="page-head-option">
          <div className="page-head-option-filter-input">
            <FiSearch/>
            <input onChange={filterByName} placeholder="Search by name..."></input>
          </div>
          <Link to={"/createRole"} className="option-page page-head-option-new"><IoMdAdd/> Add New Role</Link>
        </div>
      </div>
      <section className="roles">
        <table className="roles-table">
          <tr className="roles-table-head">
            <th>JOB TITLE</th>
            <th>COLOR</th>
            <th className="roles-table-head-edit">EDIT</th>
          </tr>
          {roles.map((role,id) =>{
          if(role.name.includes(nameFilter)){
            return (<RoleItemTable reset={reset} role={role} key={id}/>)}
          }
          )
        }
        </table>
      </section>
      
    </section>
  );
}

export default AllRoles;