import "../styles/users.css"
import "../styles/pages.css"

import Alert from "../components/Alert";

import { SlOptions } from 'react-icons/sl';
import { IoMdOptions,IoMdAdd} from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState , useRef} from "react";

import apiController from "../api";
import UserItemTable from "../components/UserItemTable";
import FilterUser from "../components/FilterUser";

function AllUsers() {
  const {userApiController,groupApiController,rolesApiController} = apiController
  const [users,setUsers] = useState([])
  const [nameFilter,setNameFilter] = useState("")

  const [showAlertDeleteUser,setShowAlertDeleteUser] = useState(false)
  const [idUserFocus,setIdUserFocus] = useState(null)
  const [usersSelected,setUsersSelected]= useState([])
  const textDeleteAlert = "Estas seguro de eliminar el usuario"

  const [showFilter,setShowFilter] = useState(false)
  


  function eventCheckUser(id,e){
    if(e.target.checked){
      setUsersSelected([...usersSelected,e.target.value])
    }else{
      setUsersSelected([...usersSelected.filter(idU=>idU!=id)])
    }
  }

  const [groups,setGroups] = useState([])
  const [roles,setRoles] = useState([])
  const obtainParamsFilter=()=>{
    groupApiController.obtainAll().then(groups=>{setGroups(groups)})
    rolesApiController.obtainAll().then(roles=>{setRoles(roles)})
  }
  const filterUsers=(params)=>{
    let role = params.role
    let status = params.status
    let group = params.group
    let usersFilter = users.filter(user=>{
      let roleFilter = role?user.Role.name==role:true
      let statusFilter = status?user.status==status:true
      let groupFilter = group?user.Group.name==group:true
      return roleFilter==statusFilter==groupFilter
    })
    setUsers(usersFilter)
    setShowFilter(false)
  }

  const obtainUserAll = ()=>{
    userApiController.obtainAll().then(usersList =>{
      setUsers(usersList)
    }).catch(err=>{})
  }
  useEffect(()=>{
    obtainUserAll()
    obtainParamsFilter()
  },[])


  function filterByName(evt){
    const value = evt.target.value
    setNameFilter(value)
  }
  function eventDeleteUser(id){
    setShowAlertDeleteUser(true)
    setIdUserFocus(id)
  }
  function hiddenAlert(){
    setShowAlertDeleteUser(false)
  }
  function deleteUser (){
    hiddenAlert()
    userApiController.deleteForId(idUserFocus).then(()=>{
      // actualizar la lista de usuarios una vez eliminado
      obtainUserAll()
    })
  }
  const [showOpt,setShowOpt] = useState(true)
  const refOpt = useRef(null)
  function options(){
    if(showOpt){
      refOpt.current.style.display="flex"
    }else{
      refOpt.current.style.display="none"
    }
    setShowOpt(!showOpt)
  }

  function seleccionar(){
    if(usersSelected.length){
      setUsers([...users.filter(user=>!usersSelected.indexOf(user.id.toString()))])
      }
  }
  function eliminar(){
    if(usersSelected.length){
      userApiController.deleteListIds(usersSelected).then(()=>{
        obtainUserAll()
      }).catch(()=>{})
    }

  }

  return (
    <section className=" page allUsers">
      {showAlertDeleteUser?<Alert acceptCollback={deleteUser} cancelCollback={hiddenAlert} text={textDeleteAlert}></Alert>:undefined}
      <div className="page-head">
        <div className="page-head-title">
          <h2>All Users</h2>
          <span>{users.length}</span>
        </div>
        <Link to={"/createUser"} className="option-allUser allUsers-head-option-newUser"><IoMdAdd/> Add New User</Link>
      </div>
      <div className="page-head-option">
        <div onClick={options} className="page-head-option-select">
          <h4>Select</h4>
          <SlOptions/>
          <div ref={refOpt} className="page-head-option-select-opt">
            <button onClick={seleccionar}>Seleccionar</button>
            <button onClick={eliminar}>Eliminar</button>
          </div>
        </div>
        <div className="page-head-option-filter">
          <div className="page-head-option-filter-input">
            <FiSearch/>
            <input onChange={filterByName} placeholder="Search by name..."></input>
          </div>
          <button onClick={()=>{setShowFilter(!showFilter)}} className="option-allUser allUsers-head-option-filter"><IoMdOptions/>Filters</button>
          {showFilter&&<FilterUser roles={roles} hiddenFilter={()=>{setShowFilter(false)}} filterUsers={filterUsers} groups={groups}/>}
          
        </div>

      </div>
      <table className="allUsers-table">
        <tr className="allUsers-table-head">
          <th>All</th>
          <th>NAME</th>
          <th>ROLE</th>
          <th>GROUPS</th>
          <th>STATUS</th>
          <th className="allUsers-table-head-action">ACTION</th>
        </tr>
        {users.map((user,id) =>{
          if(user.name.includes(nameFilter)){
            return (<UserItemTable eventCheckUser={eventCheckUser} eventDeleteUser={eventDeleteUser} key={id} user={user}></UserItemTable>)}
          }
          )
        }
      </table>
    </section>
  );
}

export default AllUsers;