import "../styles/pages.css"
import "../styles/group.css"
import { SlOptionsVertical } from 'react-icons/sl';
import { useRef, useState } from "react";

import { Link } from "react-router-dom";

function GroupItemTable({group,eventDeleteGroup}) {
  const maxImgPerfil = 4
  const listUsers = group.Users

  const optionRef = useRef(null)
  const [showOptions,setShowOptions] = useState(false)
  
  function showMenuOptions(){
    optionRef.current.style.width="120px"
    optionRef.current.style.opacity="1"
  }
  function hiddenMenuOptions(){
    optionRef.current.style.width="0px"
    optionRef.current.style.opacity="0"
  }
  function menuOption (){
    !showOptions?showMenuOptions():hiddenMenuOptions()
    setShowOptions(!showOptions)
  }

  return (
    <div className="groups-card">
      <div className="groups-card-head">
        <h4>{group.name}</h4>
        <span className={"groups-card-head-"+group.status}>{group.status}</span>
      </div>
      <div className="groups-card-body">
        <div className="groups-card-body-lider">
          <img src={"http://localhost:3001/group/"+group.logoImg} alt="" />
          <div className="groups-card-body-lider-name">
            <h4>{group.name}</h4>
            <span>{group.area}  </span>
          </div>
        </div>
        <div className="groups-card-body-describ">
          <div>
            <h5>Activities</h5>
            <span>{group.numActivities}</span>
          </div>
          <div>
            <h5>Miebros</h5>
            <span>{group.numUsers}</span>
          </div>
        </div>
      </div>
      <div className="groups-card-footer">
        <div className="groups-card-footer-mienbros">
          {listUsers.slice(0,maxImgPerfil).map(user=><img src={"http://localhost:3001/user/"+user.perfilImg} alt="" />)}
          {listUsers.length>maxImgPerfil&&<span>+{listUsers.length-maxImgPerfil}</span>}
        </div>
        <div className="groups-card-footer-options">
          <SlOptionsVertical onClick={menuOption} />
          <div ref={optionRef} className="groups-card-footer-options-list">
            <Link to={"/groups/"+group.id+"/info"} className='groups-card-footer-options-list-btn'>Show Page</Link>
            <button onClick={()=>eventDeleteGroup(group.id)} className='groups-card-footer-options-list-btn'>Delete Group</button>
            <Link to={"/editGroup/"+group.id} className='groups-card-footer-options-list-btn'>Edit Group</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupItemTable;