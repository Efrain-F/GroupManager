import { Route, Routes,NavLink,Link} from "react-router-dom";
import CreateActivity from "../pages/CreateActivity";
import EditActivity from "../pages/EditActivity";
import AddMenber from "./AddMenber";

import apiController from "../api";

function GroupBody({reset,group,obtain}) {
  
  const {activitiesApiController} = apiController

  function Info(){
    return(
        <div className="group-body-info">
          <div className="group-body-info-details">
            <h4>Details</h4>
            <ul className="group-body-info-details-list">
              <li className="group-body-info-details-list-item">
                <h5>Area:</h5>
                <span>{group.area}</span>
              </li>
              <li className="group-body-info-details-list-item">
                <h5>Status:</h5>
                <span>{group.status}</span>
              </li>
              <li className="group-body-info-details-list-item">
                <h5>Members:</h5>
                <span>{group.Users.length}</span>
              </li>
              <li className="group-body-info-details-list-item">
                  <h5>Activities:</h5>
                  <span>{group.Activities.length}</span>
              </li>
              
            </ul>
          </div>
          <div className="group-body-info-describ">
              <h4>Description</h4>
              <p>{group.info}</p>
          </div>
        </div>
    )
  }

  function Menbers(){
    const users = group.Users
    return(
      <>
        <Link to="addMenber" className="createActivity">Add Menber</Link>
        <ul className="group-body-listUsers">
          {users.map((user)=>{
            return(<li className="group-body-listUsers-user">
              <Link  to={"/users/"+user.id}>
                <img src={"http://localhost:3001/user/"+user.perfilImg} />
              </Link>
              <div className="group-body-listUsers-user-info">
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
              </div>
            </li>)
          })}
        </ul>
      </>
    )
  }

  function Activity(){
    const activities = group.Activities

    function deleteActivity(id){
      activitiesApiController.delete(id).then(()=>obtain()).catch(()=>{})
    }

    return(
      <>
        <Link to="createActivity" className="createActivity">Create Activity</Link>
        <ul className="group-body-listUsers">
          {activities.map((activity,id)=>{
            const user = activity.User
            return(
              <li key={id} className="group-body-listUsers-activity">
                <div className="group-body-listUsers-activity-info">
                  <div className="group-body-listUsers-activity-info-head">
                    <h3>{activity.name}</h3>
                    <div>
                      <span className="group-body-listUsers-activity-info-status">{activity.status}</span>
                    </div>
                  </div>
                  <h4>{activity.describ}</h4>
                </div>
                <div className="group-body-listUsers-activity-foo">
                  <div className="group-body-listUsers-activity-user">
                    <div></div>
                    <Link  to={"/users/"+user.id}>
                      <img src={"http://localhost:3001/user/"+user.perfilImg} alt="" />
                    </Link>
                    <h5>{user.name}</h5>
                  </div>
                  <div className="group-body-listUsers-activity-foo-opt">
                    <Link to={"modifyActivity/"+activity.id}>Modify</Link>
                    <button onClick={()=>deleteActivity(activity.id)}>Delete</button>
                  </div>
                </div>
                
              </li>
            )
          })}
        </ul>
      </>
    )
  }
  return (
    <>
      <div className="user-head">
        <img src={"http://localhost:3001/group/"+group.backgroundImg} className="user-head-fondo" />
        <div className="user-head-describ">
          <div className="user-head-describ-inf">
            <div className="group-head-describ-inf-name">
              <img src={"http://localhost:3001/group/"+group.logoImg}></img>
              <h3>{group.name}</h3>
            </div>
            <Link to={"/editGroup/"+group.id}>Edit group</Link>
          </div>
        </div>
      </div>
      <ul className="group-nav">
        <NavLink className={({isActive}) => (isActive ? "active" : "noActive")} to="info">Info</NavLink>
        <NavLink className={({isActive}) => (isActive ? "active" : "noActive")} to="menbers">Menbers</NavLink>
        <NavLink className={({isActive}) => (isActive ? "active" : "noActive")} to="activity">Activity</NavLink>
      </ul>
      <section className="group-body">
        <Routes>
          <Route path="menbers" element={<Menbers/>}/>
          <Route path="menbers/addMenber" element={<AddMenber reset={reset} id={group.id} />}/>

          <Route path="activity" element={<Activity/>}/>
          <Route path="activity/createActivity" element={<CreateActivity reset={reset} id={group.id} menbers={group.Users}/>}/>
          <Route path="activity/modifyActivity/:id" element={<EditActivity obtain={obtain} menbers={group.Users}/>}/>
          <Route path="info" element={<Info/>}/>
        </Routes>
      </section>
    </>
  );
}

export default GroupBody;