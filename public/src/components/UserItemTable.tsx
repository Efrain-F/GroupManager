import { SlOptions } from 'react-icons/sl';

import { useRef,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const UserItemTable =({user,eventDeleteUser,eventCheckUser})=>{
  const optionRef = useRef<HTMLDivElement>(null)
  const [showOption,setShowOption] = useState(false)
  const color = user.Role.color
  const efectShow =()=>{
    optionRef.current.style.width = " 130px"
    optionRef.current.style.right = " 50%"
    optionRef.current.style.opacity = "1"
  } 
  function efectHidden(){
    optionRef.current.style.width = " 0px"
    optionRef.current.style.right = " 0%"
    optionRef.current.style.opacity = "0"
  } 
  const showOptions = ()=>{
    showOption?efectHidden():efectShow()
    setShowOption(!showOption)
  }
  function blur(){
    efectHidden()
    setShowOption(false)
  }

  function selectCheck(e){
    eventCheckUser(user.id,e)
  }

  return (
    <tr className="allUsers-table-item">
      <td className="allUsers-table-item-all">
        <input onChange={selectCheck} value={user.id} type="checkbox"></input>
      </td>
      <td className="allUsers-table-item-name">
        <img src={`http://localhost:3001/user/${user.perfilImg}`} />
        <div>
          <h4>{user.name}</h4>
          <span>{user.email}</span>
        </div>
      </td>
      <td className="allUsers-table-item-role">
        <span style={{"background":color}}>{user.Role.name}</span>
      </td>
      {
        user.Group?(
          <td className="allUsers-table-item-group">
            <span>{user.Group.name}</span>
          </td>
        ):(
          <td className="allUsers-table-item-group">
            <span>Libre</span>
          </td>
        )
      }
      
      <td className={"allUsers-table-item-status-"+user.status}>
        <span>+ {user.status}</span>
      </td>
      <td className="allUsers-table-item-action">
        <button onClick={()=>showOptions()}><SlOptions color="rgb(236, 228, 236)"/></button>
        <div ref={optionRef} className="allUsers-table-item-action-options">
          <Link className='allUsers-table-item-action-options-btn' to={"/users/"+user.id}>Show Perfil</Link>
          <button onClick={()=>eventDeleteUser(user.id)} className='allUsers-table-item-action-options-btn'>Delete User</button>
          <Link className='allUsers-table-item-action-options-btn' to={"/editUser/"+user.id}>Edit User</Link>

        </div>
      </td>
    </tr>
  );
}

export default UserItemTable;