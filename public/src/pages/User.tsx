import { useParams } from "react-router-dom";

import "../styles/users.css"
import "../styles/pages.css"

import UserBody from "../components/UserBody";
import Loader from "../components/Loader";
import apiController from "../api";

import {useEffect,useState} from "react"



interface userBody{
  name?:String
  email?:String
  perfilImg?:String

  role?:String
  group?:String
  status?:String
  info?:String
  location?:String
  phoneNumber?:String

}

function User() {
  let params = useParams();
  const id = params.idUser

  const {userApiController} = apiController

  const [showUser,setShowUser] = useState(false)

  const [userBody,setUserBody] = useState<userBody>({})
  const [activities,setActivities] = useState([])

  useEffect(()=>{
    try{
      userApiController.obtainForId(id).then(user=>{
        let role = user.Role.name
        if(user.Group){
          let group = user.Group.name
          setUserBody({...user,role,group})
        }else{setUserBody({...user,role})}
        setShowUser(true)
      })
      userApiController.obtainActivities(id).then(activities=>{setActivities(activities)})
    }catch{err=>{
    }}
  },[])

  return (
    <section className="user">
      {showUser?<UserBody userBody={userBody} activities={activities}/>:<Loader/>}
      
    </section>
  );
}

export default User;