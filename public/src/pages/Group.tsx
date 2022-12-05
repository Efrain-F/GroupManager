import { useParams } from "react-router-dom";

import "../styles/users.css"
import "../styles/pages.css"
import { useEffect,useState} from "react";

import apiController from "../api";

import Loader from "../components/Loader";
import GroupBody from "../components/GroupBody";



function Group() {

  let params = useParams();
  const {groupApiController} = apiController

  const [showGroup,setShowGroup] = useState(false)

  const [groupBody,setGroupBody] = useState({})

  function obtainGroup(){
    try{
      groupApiController.obtainForId(params.idGroup).then(group=>{
        setGroupBody(group)
        setShowGroup(true)
      })
    }catch{err=>{
    }}
  }
  function reset(){
    obtainGroup()
  }

  useEffect(()=>{
    obtainGroup()
  },[])
  return (
    <section className="group">
      {showGroup?<GroupBody reset={reset} group={groupBody} obtain={obtainGroup}/>:<Loader></Loader>}
    </section>
  );
}

export default Group;