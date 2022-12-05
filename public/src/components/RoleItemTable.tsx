import { SlOptionsVertical } from 'react-icons/sl';

import { Link } from 'react-router-dom';
import { useRef,useState } from 'react';
import apiController from '../api';

function RoleItemTable({reset,role}) {
  const {rolesApiController} = apiController
  const optionRef = useRef<HTMLDivElement>(null)
  const [showOption,setShowOption] = useState(false)

  const efectShow =()=>{
    optionRef.current.style.width = " 130px"
    optionRef.current.style.opacity = "1"
  } 
  function efectHidden(){
    optionRef.current.style.width = " 0px"
    optionRef.current.style.opacity = "0"
  } 
  const showOptions = ()=>{
    showOption?efectHidden():efectShow()
    setShowOption(!showOption)
  }

  function eventDeleteRole(id){
    rolesApiController.deleteRole(id).then(()=>{reset()})
  }
  return (
    <tr className="roles-table-item">
      <td className="roles-table-item-job">
        <h4>{role.name}</h4>
        <span>{role.describ}</span>
      </td>
      <td className="roles-table-item-color">
        <h4 style={{backgroundColor:role.color}}>{role.color}</h4>
      </td>
      <td className="roles-table-item-edit">

        <button onClick={()=>showOptions()}><SlOptionsVertical/></button>

        <div ref={optionRef} className="roles-table-item-edit-options">
          <button onClick={()=>eventDeleteRole(role.id)} className='roles-table-item-edit-options-btn'>Delete Role</button>
          <Link className='roles-table-item-edit-options-btn' to={"/editRole/"+role.id}>Edit Role</Link>

        </div>
      </td>
    </tr>
  );
}

export default RoleItemTable;